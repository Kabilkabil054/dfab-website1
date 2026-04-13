from fastapi import FastAPI, APIRouter, HTTPException, Depends, Header, Form, File, UploadFile
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import re
from pathlib import Path
from pydantic import BaseModel, field_validator
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

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

# =================== ENV / CLIENTS ===================

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
MONGO_URL = os.environ.get("MONGO_URL")
DB_NAME = os.environ.get("DB_NAME")
RESEND_API_KEY = os.environ.get("RESEND_API_KEY")

if not MONGO_URL:
    raise RuntimeError("MONGO_URL is missing in backend/.env")

if not DB_NAME:
    raise RuntimeError("DB_NAME is missing in backend/.env")

client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

gemini_client = genai.Client(api_key=GEMINI_API_KEY) if GEMINI_API_KEY and genai else None
if resend and RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY

app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

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
# Note: ContactForm is removed because FastAPI handles multipart forms directly via function arguments.

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

def get_admin_token_value():
    password = os.environ.get("ADMIN_PASSWORD", "dfab@admin2026")
    return hashlib.sha256(f"dfab-secret-{password}".encode()).hexdigest()

async def verify_admin(authorization: Optional[str] = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Unauthorized")
    token = authorization.split(" ")[1]
    if token != get_admin_token_value():
        raise HTTPException(status_code=401, detail="Invalid token")
    return token

def parse_post(p):
    if isinstance(p.get("created_at"), str):
        p["created_at"] = datetime.fromisoformat(p["created_at"])
    if isinstance(p.get("updated_at"), str):
        p["updated_at"] = datetime.fromisoformat(p["updated_at"])
    return p

# Updated to accept an optional attachment parameter
def send_emails(name, email, phone, subject, message, attachment=None):
    try:
        sender_email = os.environ.get("SENDER_EMAIL")       # Must be verified in Resend (e.g., no-reply@dfab.in)
        receiver_email = os.environ.get("RECEIVER_EMAIL")   # Company email (e.g., info@dfab.in)

        if not resend or not RESEND_API_KEY or not sender_email or not receiver_email:
            logger.warning("Missing Resend config. Skipping emails.")
            return False

        # ==========================================
        # EMAIL 1: TO THE COMPANY (DFAB ADMIN)
        # ==========================================
        admin_payload = {
            "from": sender_email,
            "to": [receiver_email],
            "subject": f"New Inquiry: {subject} - {name}",
            "reply_to": email, 
            "html": f"""
            <div style="font-family:Arial,sans-serif;max-width:600px">
                <h2 style="color:#0A66C2">New Contact Inquiry - DFAB Website</h2>
                <p><strong>Name:</strong> {name}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Phone:</strong> {phone or 'Not provided'}</p>
                <p><strong>Subject:</strong> {subject}</p>
                <p><strong>Message:</strong><br>{message}</p>
            </div>
            """
        }

        # If a file is uploaded, attach it to the email going to the company
        if attachment:
            admin_payload["attachments"] = [attachment]

        resend.Emails.send(admin_payload)

        # ==========================================
        # EMAIL 2: CONFIRMATION TO THE USER
        # ==========================================
        resend.Emails.send({
            "from": sender_email, 
            "to": [email], 
            "subject": "Thank you for contacting DFAB",
            "html": f"""
            <div style="font-family:Arial,sans-serif;max-width:600px">
                <h2 style="color:#0A66C2">Thank you for reaching out to DFAB!</h2>
                <p>Hi {name},</p>
                <p>We have successfully received your inquiry regarding <strong>"{subject}"</strong>.</p>
                <p>Our team is reviewing your message and will get back to you shortly.</p>
                <br>
                <p>Best Regards,</p>
                <p><strong>DFAB Stainless System Pvt Ltd</strong></p>
            </div>
            """,
        })

        logger.info(f"Emails successfully sent to Company and User ({email})")
        return True

    except Exception as e:
        logger.error(f"Email sending failed: {e}")
        return False


def build_chat_prompt(previous_messages, latest_message):
    history_text = ""
    for msg in previous_messages[-10:]:
        role = msg.get("role", "user").upper()
        content = msg.get("content", "")
        history_text += f"{role}: {content}\n"

    prompt = f"""
{DFAB_SYSTEM_MSG}

Conversation history:
{history_text}

USER: {latest_message}

Answer as DFAB AI Assistant.
"""
    return prompt


def get_fallback_response(latest_message):
    lower_msg = latest_message.lower()

    if any(term in lower_msg for term in ["service", "offer", "do you do", "capabilit"]):
        return (
            "DFAB offers sheet metal fabrication, pressure vessels, pipeline fabrication, "
            "stellite welding, die welding, custom fabrication, jigs and fixtures, precision "
            "machining, and new product development. For project-specific details, call "
            "8428866121 or email info@dfab.in."
        )

    if any(term in lower_msg for term in ["contact", "phone", "email", "address", "location", "whatsapp"]):
        return (
            "You can reach DFAB at 8428866121, info@dfab.in, or WhatsApp +91 8428866121. "
            "The facility is in Peenya Industrial Area, Bengaluru."
        )

    if any(term in lower_msg for term in ["quote", "pricing", "price", "cost", "estimate"]):
        return (
            "For pricing or a quotation, please contact DFAB directly at 8428866121 or "
            "WhatsApp +91 8428866121 so the team can review your fabrication requirement."
        )

    if any(term in lower_msg for term in ["industry", "industries", "sector"]):
        return (
            "DFAB serves energy, pharmaceuticals, locomotive, aeronautical, food and dairy, "
            "and automotive industries."
        )

    return (
        "DFAB specializes in stainless steel fabrication, machining, welding, and industrial "
        "project support. Tell me what you need help with, or contact DFAB directly at "
        "8428866121 for a quotation."
    )


def get_gemini_response(previous_messages, latest_message):
    if not gemini_client:
        logger.warning("GEMINI_API_KEY is missing, using fallback chat response")
        return get_fallback_response(latest_message)

    prompt = build_chat_prompt(previous_messages, latest_message)

    response = gemini_client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
    )

    if not response or not getattr(response, "text", None):
        return "I'm sorry, I couldn't generate a response right now. Please contact DFAB at 8428866121."

    return response.text.strip()

# =================== ROUTES ===================

@api_router.get("/")
async def root():
    return {"message": "DFAB API Running"}

# Updated to use Form and File for multipart data
@api_router.post("/contact")
async def submit_contact(
    name: str = Form(...),
    email: str = Form(...),
    subject: str = Form(...),
    message: str = Form(...),
    phone: Optional[str] = Form(None),
    file: Optional[UploadFile] = File(None)
):
    try:
        # Validate email manually
        if not re.match(r"^[^@\s]+@[^@\s]+\.[^@\s]+$", email):
            raise HTTPException(status_code=422, detail="Invalid email address")

        attachment = None
        filename = None

        # Check if a file was uploaded and read its bytes
        if file and file.filename:
            file_bytes = await file.read()
            filename = file.filename
            
            # Format the attachment specifically for the Resend Python SDK
            attachment = {
                "filename": filename,
                "content": list(file_bytes) 
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
            "created_at": datetime.now(timezone.utc).isoformat()
        }

        await db.contacts.insert_one(doc)
        
        # Pass the attachment variable to the email function
        send_emails(name, email, phone, subject, message, attachment=attachment)

        return {
            "status": "success",
            "message": "Your inquiry has been submitted. We'll be in touch soon!"
        }

    except HTTPException as he:
        raise he
    except Exception as e:
        logger.error(f"Contact submission failed: {e}")
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
        logger.error(f"Chat error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


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
    expected = os.environ.get("ADMIN_PASSWORD", "dfab@admin2026")
    if credentials.password != expected:
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
        "updated_at": now.isoformat()
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


app.include_router(api_router)

cors_origins_env = os.environ.get("CORS_ORIGINS", "*").strip()

if cors_origins_env == "*":
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=False,
        allow_methods=["*"],
        allow_headers=["*"],
    )
else:
    allowed_origins = [origin.strip() for origin in cors_origins_env.split(",") if origin.strip()]
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