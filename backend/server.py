from fastapi import FastAPI, APIRouter, HTTPException, Depends, Header, Form, File, UploadFile
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import re
import base64
from pathlib import Path
from pydantic import BaseModel
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import hashlib

try:
    import resend
except ImportError:
    resend = None

try:
    from google import genai
except ImportError:
    genai = None


# =================== LOAD ENV ===================

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

# =================== LOGGING ===================

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

# =================== ENV ===================

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "").strip()
MONGO_URL = os.getenv("MONGO_URL", "").strip()
DB_NAME = os.getenv("DB_NAME", "").strip()
RESEND_API_KEY = os.getenv("RESEND_API_KEY", "").strip()
SENDER_EMAIL = os.getenv("SENDER_EMAIL", "").strip()
RECEIVER_EMAIL = os.getenv("RECEIVER_EMAIL", "").strip()
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "dfab@admin2026").strip()
CORS_ORIGINS = os.getenv("CORS_ORIGINS", "*").strip()

if not MONGO_URL:
    raise RuntimeError("MONGO_URL is missing in backend/.env")

if not DB_NAME:
    raise RuntimeError("DB_NAME is missing in backend/.env")

# =================== INIT CLIENTS ===================

client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

gemini_client = None
if GEMINI_API_KEY and genai:
    try:
        gemini_client = genai.Client(api_key=GEMINI_API_KEY)
        logger.info("Gemini client initialized successfully")
    except Exception as e:
        logger.warning(f"Gemini client initialization failed: {e}")
        gemini_client = None
else:
    logger.warning("Gemini not enabled. Missing package or API key.")

if resend and RESEND_API_KEY:
    try:
        resend.api_key = RESEND_API_KEY
        logger.info("Resend initialized successfully")
    except Exception as e:
        logger.warning(f"Resend initialization failed: {e}")
else:
    logger.warning("Resend not enabled. Missing package or API key.")

# =================== APP ===================

app = FastAPI()
api_router = APIRouter(prefix="/api")

DFAB_SYSTEM_MSG = """You are an expert AI assistant for DFAB Stainless System Pvt Ltd, an ISO 9001:2015 certified precision fabrication company in Bengaluru, India.

Company Overview:
- Established: 28 September 2018
- Location: No: 3B/415, No-8 KIADB Main Road, Peenya Industrial Area, Bengaluru – 560058
- Facility: 7000 sqft with 5-ton crane, 10+ TIG/MIG welding machines, CNC & conventional machines
- Certifications: ISO 9001:2015

Services:
1. Sheetmetal Fabrication (SS, Aluminum, CS – TIG, MIG, Arc welding)
2. Pressure Vessel fabrication (pharma, dairy, industrial)
3. Pipeline Fabrication (oil & gas, pharma, dairy – 6G position welding)
4. Stellite Welding (erosion and corrosion resistance)
5. Die Welding (die refurbishment and life extension)
6. Custom Fabrication & Architecture (decor, structures)
7. Jig & Fixture Development (precision production tooling)
8. Precision Machining (CNC & conventional)
9. New Product Development (NPD & engineering)

Industries: Energy, Pharmaceuticals, Locomotive, Aeronautical, Food & Dairy, Automotive

Contact: Phone: 8428866121 | Email: info@dfab.in | WhatsApp: +91 8428866121

Rules:
- Be professional, concise, and knowledgeable.
- Answer clearly about welding, fabrication, machining, materials, and industrial use cases.
- For pricing or quotations, direct users to contact DFAB directly via phone or WhatsApp.
- Keep responses concise and helpful.
- Use bullet points when useful.
"""

# =================== MODELS ===================

class BlogPostCreate(BaseModel):
    title: str
    content: str
    excerpt: str
    author: str = "DFAB Team"
    category: str
    image_url: Optional[str] = None
    tags: List[str] = []
    published: bool = True


class BlogPost(BaseModel):
    id: str
    title: str
    content: str
    excerpt: str
    author: str
    category: str
    image_url: Optional[str] = None
    tags: List[str] = []
    published: bool
    created_at: datetime
    updated_at: datetime


class AdminLogin(BaseModel):
    password: str


class ChatMessage(BaseModel):
    session_id: str
    message: str


# =================== HELPERS ===================

def get_admin_token_value() -> str:
    return hashlib.sha256(f"dfab-secret-{ADMIN_PASSWORD}".encode()).hexdigest()


async def verify_admin(authorization: Optional[str] = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Unauthorized")

    token = authorization.split(" ", 1)[1].strip()
    if token != get_admin_token_value():
        raise HTTPException(status_code=401, detail="Invalid token")

    return token


def parse_post(post: dict):
    if isinstance(post.get("created_at"), str):
        post["created_at"] = datetime.fromisoformat(post["created_at"])
    if isinstance(post.get("updated_at"), str):
        post["updated_at"] = datetime.fromisoformat(post["updated_at"])
    return post


def build_chat_prompt(previous_messages, latest_message):
    history_text = ""
    for msg in previous_messages[-10:]:
        role = msg.get("role", "user").upper()
        content = msg.get("content", "")
        history_text += f"{role}: {content}\n"

    return f"""
{DFAB_SYSTEM_MSG}

Conversation history:
{history_text}

USER: {latest_message}

Answer as DFAB AI Assistant.
"""


def get_fallback_response(latest_message: str) -> str:
    lower_msg = latest_message.lower()

    if any(term in lower_msg for term in ["service", "services", "offer", "do you do", "capabilit", "capability", "capabilities"]):
        return (
            "DFAB offers sheet metal fabrication, pressure vessel fabrication, pipeline fabrication, "
            "stellite welding, die welding, custom fabrication, jig and fixture development, "
            "precision machining, and new product development. "
            "For project-specific details, call 8428866121 or email info@dfab.in."
        )

    if any(term in lower_msg for term in ["contact", "phone", "email", "address", "location", "whatsapp"]):
        return (
            "You can reach DFAB at 8428866121, info@dfab.in, or WhatsApp +91 8428866121. "
            "The facility is in Peenya Industrial Area, Bengaluru."
        )

    if any(term in lower_msg for term in ["quote", "pricing", "price", "cost", "estimate", "quotation"]):
        return (
            "For pricing or a quotation, please contact DFAB directly at 8428866121 or "
            "WhatsApp +91 8428866121 so the team can review your fabrication requirement."
        )

    if any(term in lower_msg for term in ["industry", "industries", "sector", "sectors"]):
        return (
            "DFAB serves energy, pharmaceuticals, locomotive, aeronautical, food and dairy, "
            "and automotive industries."
        )

    if any(term in lower_msg for term in ["material", "materials", "stainless steel", "aluminium", "aluminum", "carbon steel", "ss"]):
        return (
            "DFAB works with stainless steel, aluminum, and carbon steel for fabrication, "
            "machining, and welding applications."
        )

    if any(term in lower_msg for term in ["welding", "tig", "mig", "arc welding", "pipeline", "pressure vessel"]):
        return (
            "DFAB provides TIG, MIG, arc welding, pipeline fabrication, pressure vessel fabrication, "
            "and custom industrial welding solutions."
        )

    return (
        "DFAB specializes in stainless steel fabrication, machining, welding, pressure vessels, "
        "pipeline work, and custom industrial project support. "
        "Tell us your requirement, or contact DFAB directly at 8428866121 for a quotation."
    )


def get_gemini_response(previous_messages, latest_message):
    if not gemini_client:
        logger.warning("Gemini client unavailable. Using fallback.")
        return get_fallback_response(latest_message)

    try:
        prompt = build_chat_prompt(previous_messages, latest_message)

        response = gemini_client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
        )

        if not response or not getattr(response, "text", None):
            logger.warning("Empty Gemini response. Using fallback.")
            return get_fallback_response(latest_message)

        return response.text.strip()

    except Exception as e:
        error_text = str(e)
        logger.error(f"Gemini response failed: {e}", exc_info=True)

        if "429" in error_text or "RESOURCE_EXHAUSTED" in error_text or "quota" in error_text.lower():
            return (
                "Our AI assistant is temporarily busy. Here is a quick DFAB response:\n\n"
                + get_fallback_response(latest_message)
            )

        return get_fallback_response(latest_message)


def build_admin_email_html(name, email, phone, subject, message):
    safe_phone = phone if phone else "Not provided"
    safe_message = message.replace("\n", "<br>")
    return f"""
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px">
        <h2 style="color:#0A66C2;margin-bottom:16px;">New Contact Inquiry - DFAB Website</h2>
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Phone:</strong> {safe_phone}</p>
        <p><strong>Subject:</strong> {subject}</p>
        <p><strong>Message:</strong><br>{safe_message}</p>
        <hr style="margin:20px 0;">
        <p><strong>Reply directly to customer:</strong> {email}</p>
    </div>
    """


def build_admin_email_text(name, email, phone, subject, message):
    safe_phone = phone if phone else "Not provided"
    return (
        f"New Contact Inquiry - DFAB Website\n\n"
        f"Name: {name}\n"
        f"Email: {email}\n"
        f"Phone: {safe_phone}\n"
        f"Subject: {subject}\n\n"
        f"Message:\n{message}\n\n"
        f"Reply directly to customer: {email}"
    )


def build_user_email_html(name, subject):
    return f"""
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px">
        <h2 style="color:#0A66C2;margin-bottom:16px;">Thank you for contacting DFAB</h2>
        <p>Hi {name},</p>
        <p>We have successfully received your inquiry regarding <strong>{subject}</strong>.</p>
        <p>Our team is reviewing your message and will get back to you shortly.</p>
        <br>
        <p>Best Regards,</p>
        <p><strong>DFAB Stainless System Pvt Ltd</strong></p>
        <p>Email: {RECEIVER_EMAIL}</p>
    </div>
    """


def build_user_email_text(name, subject):
    return (
        f"Hi {name},\n\n"
        f"We have successfully received your inquiry regarding \"{subject}\".\n"
        f"Our team is reviewing your message and will get back to you shortly.\n\n"
        f"Best Regards,\n"
        f"DFAB Stainless System Pvt Ltd\n"
        f"Email: {RECEIVER_EMAIL}"
    )


def send_emails(name, email, phone, subject, message, attachment=None):
    try:
        if not resend:
            logger.warning("Resend package is not installed")
            return False

        if not RESEND_API_KEY:
            logger.warning("RESEND_API_KEY is missing")
            return False

        if not SENDER_EMAIL:
            logger.warning("SENDER_EMAIL is missing")
            return False

        if not RECEIVER_EMAIL:
            logger.warning("RECEIVER_EMAIL is missing")
            return False

        admin_payload = {
            "from": f"DFAB <{SENDER_EMAIL}>",
            "to": [RECEIVER_EMAIL],
            "subject": f"New Inquiry: {subject} - {name}",
            "reply_to": [email],
            "html": build_admin_email_html(name, email, phone, subject, message),
            "text": build_admin_email_text(name, email, phone, subject, message),
        }

        if attachment:
            admin_payload["attachments"] = [attachment]

        admin_result = resend.Emails.send(admin_payload)
        logger.info(f"Admin email sent successfully: {admin_result}")

        user_payload = {
            "from": f"DFAB <{SENDER_EMAIL}>",
            "to": [email],
            "subject": "Thank you for contacting DFAB",
            "reply_to": [RECEIVER_EMAIL],
            "html": build_user_email_html(name, subject),
            "text": build_user_email_text(name, subject),
        }

        user_result = resend.Emails.send(user_payload)
        logger.info(f"User confirmation email sent successfully: {user_result}")

        return True

    except Exception as e:
        logger.error(f"Email sending failed: {e}", exc_info=True)
        return False


# =================== ROUTES ===================

@api_router.get("/")
async def root():
    return {"message": "DFAB API Running"}


@api_router.get("/health")
async def health():
    return {
        "status": "ok",
        "mongo": bool(MONGO_URL),
        "db_name": DB_NAME,
        "gemini_enabled": bool(gemini_client),
        "resend_enabled": bool(resend and RESEND_API_KEY and SENDER_EMAIL and RECEIVER_EMAIL),
        "sender_email": SENDER_EMAIL,
        "receiver_email": RECEIVER_EMAIL,
        "cors_origins": CORS_ORIGINS,
    }


@api_router.post("/contact")
async def submit_contact(
    name: str = Form(...),
    email: str = Form(...),
    subject: str = Form(...),
    message: str = Form(...),
    phone: Optional[str] = Form(None),
    file: Optional[UploadFile] = File(None),
):
    try:
        if not re.match(r"^[^@\s]+@[^@\s]+\.[^@\s]+$", email):
            raise HTTPException(status_code=422, detail="Invalid email address")

        attachment = None
        filename = None

        if file and file.filename:
            file_bytes = await file.read()
            filename = file.filename

            attachment = {
                "filename": filename,
                "content": base64.b64encode(file_bytes).decode("utf-8"),
            }

        doc = {
            "id": str(uuid.uuid4()),
            "name": name,
            "email": email,
            "phone": phone,
            "subject": subject,
            "message": message,
            "has_attachment": bool(attachment),
            "filename": filename,
            "created_at": datetime.now(timezone.utc).isoformat(),
        }

        await db.contacts.insert_one(doc)

        email_sent = send_emails(
            name=name,
            email=email,
            phone=phone,
            subject=subject,
            message=message,
            attachment=attachment,
        )

        if not email_sent:
            logger.warning("Contact saved in DB, but email sending failed")

        return {
            "status": "success",
            "message": "Your inquiry has been submitted. We'll be in touch soon!",
            "email_sent": email_sent,
        }

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Contact submission failed: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail="Failed to submit contact form")


@api_router.post("/chat")
async def chat_endpoint(msg: ChatMessage):
    try:
        session_doc = await db.chat_sessions.find_one(
            {"session_id": msg.session_id},
            {"_id": 0}
        )
        previous_messages = session_doc.get("messages", []) if session_doc else []

        assistant_text = get_gemini_response(previous_messages, msg.message)

        updated_messages = [
            *previous_messages,
            {"role": "user", "content": msg.message},
            {"role": "assistant", "content": assistant_text},
        ]

        await db.chat_sessions.update_one(
            {"session_id": msg.session_id},
            {
                "$set": {
                    "messages": updated_messages,
                    "updated_at": datetime.now(timezone.utc).isoformat(),
                }
            },
            upsert=True,
        )

        return {
            "response": assistant_text,
            "session_id": msg.session_id,
        }

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Chat error: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail="Chat service failed")


@api_router.get("/blog/posts", response_model=List[BlogPost])
async def get_blog_posts():
    posts = await db.blog_posts.find(
        {"published": True},
        {"_id": 0}
    ).sort("created_at", -1).to_list(100)
    return [parse_post(p) for p in posts]


@api_router.get("/blog/posts/{post_id}", response_model=BlogPost)
async def get_blog_post(post_id: str):
    post = await db.blog_posts.find_one(
        {"id": post_id, "published": True},
        {"_id": 0}
    )
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return parse_post(post)


@api_router.post("/admin/login")
async def admin_login(credentials: AdminLogin):
    if credentials.password != ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="Invalid password")
    return {"token": get_admin_token_value()}


@api_router.get("/admin/blog/posts")
async def admin_get_posts(token: str = Depends(verify_admin)):
    posts = await db.blog_posts.find({}, {"_id": 0}).sort("created_at", -1).to_list(100)
    return [parse_post(p) for p in posts]


@api_router.post("/admin/blog/posts", response_model=BlogPost)
async def create_blog_post(post: BlogPostCreate, token: str = Depends(verify_admin)):
    now = datetime.now(timezone.utc)
    blog_post = {
        "id": str(uuid.uuid4()),
        **post.model_dump(),
        "created_at": now.isoformat(),
        "updated_at": now.isoformat(),
    }
    await db.blog_posts.insert_one(blog_post)
    blog_post["created_at"] = now
    blog_post["updated_at"] = now
    return blog_post


@api_router.put("/admin/blog/posts/{post_id}", response_model=BlogPost)
async def update_blog_post(post_id: str, post: BlogPostCreate, token: str = Depends(verify_admin)):
    now = datetime.now(timezone.utc)
    updated = {**post.model_dump(), "updated_at": now.isoformat()}
    result = await db.blog_posts.update_one({"id": post_id}, {"$set": updated})

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Post not found")

    updated_post = await db.blog_posts.find_one({"id": post_id}, {"_id": 0})
    return parse_post(updated_post)


@api_router.delete("/admin/blog/posts/{post_id}")
async def delete_blog_post(post_id: str, token: str = Depends(verify_admin)):
    result = await db.blog_posts.delete_one({"id": post_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Post not found")
    return {"status": "deleted"}


# =================== APP SETUP ===================

app.include_router(api_router)

if CORS_ORIGINS == "*":
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=False,
        allow_methods=["*"],
        allow_headers=["*"],
    )
else:
        allowed_origins = [origin.strip() for origin in CORS_ORIGINS.split(",") if origin.strip()]
        app.add_middleware(
            CORSMiddleware,
            allow_origins=allowed_origins,
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()