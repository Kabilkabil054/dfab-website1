from fastapi import FastAPI, APIRouter, HTTPException, Depends, Header, BackgroundTasks
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import hashlib
from openai import OpenAI

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

# =================== ENV / CLIENTS ===================

OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")
MONGO_URL = os.environ.get("MONGO_URL")
DB_NAME = os.environ.get("DB_NAME")

if not MONGO_URL:
    raise RuntimeError("MONGO_URL is missing in backend/.env")

if not DB_NAME:
    raise RuntimeError("DB_NAME is missing in backend/.env")

openai_client = OpenAI(api_key=OPENAI_API_KEY) if OPENAI_API_KEY else None

client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

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

Contact: Phone: 080 43748186 | Email: info@dfab.in | WhatsApp: +91 8043748186

Be professional, concise, and knowledgeable about:
- Welding processes (TIG, MIG, Arc, Laser, Stellite)
- Fabrication materials (stainless steel, carbon steel, aluminum, inconel)
- Industry standards (ASME, AWS, ISO, ASTM)
- Pressure vessel and pipeline codes
- Industrial applications and sector-specific requirements

For pricing and quotes, always direct users to contact DFAB directly via phone or WhatsApp.
Keep responses concise and helpful. Use bullet points for clarity.
"""

# =================== MODELS ===================

class ContactForm(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    subject: str
    message: str

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

def send_emails(name, email, phone, subject, message):
    try:
        sg_key = os.environ.get("SENDGRID_API_KEY")
        sender_email = os.environ.get("SENDER_EMAIL")
        receiver_email = os.environ.get("RECEIVER_EMAIL")

        if not sg_key or not sender_email or not receiver_email:
            logger.warning("SendGrid not configured fully, skipping email")
            return

        sg = sendgrid.SendGridAPIClient(api_key=sg_key)

        admin_html = f"""
        <div style="font-family:Arial,sans-serif;max-width:600px">
        <h2 style="color:#0A66C2">New Contact Inquiry - DFAB Website</h2>
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Phone:</strong> {phone or 'Not provided'}</p>
        <p><strong>Subject:</strong> {subject}</p>
        <p><strong>Message:</strong></p><p>{message}</p>
        </div>
        """

        sg.send(
            Mail(
                from_email=sender_email,
                to_emails=receiver_email,
                subject=f"New Inquiry: {subject} - {name}",
                html_content=admin_html
            )
        )

        client_html = f"""
        <div style="font-family:Arial,sans-serif;max-width:600px">
        <h2 style="color:#0A66C2">Thank you for contacting DFAB!</h2>
        <p>Dear {name},</p>
        <p>We have received your inquiry and our team will get back to you within 24 hours.</p>
        <p><strong>Your message:</strong> {message}</p>
        <br><p>Best regards,<br><strong>DFAB Stainless System Pvt Ltd</strong></p>
        <p>Phone: 080 43748186 | Email: info@dfab.in</p>
        </div>
        """

        sg.send(
            Mail(
                from_email=sender_email,
                to_emails=email,
                subject="We received your inquiry - DFAB Stainless System",
                html_content=client_html
            )
        )

        logger.info(f"Emails sent for inquiry from {name}")

    except Exception as e:
        logger.error(f"Email sending failed: {e}")

# =================== ROUTES ===================

@api_router.get("/")
async def root():
    return {"message": "DFAB API Running"}

@api_router.post("/contact")
async def submit_contact(form: ContactForm, background_tasks: BackgroundTasks):
    doc = {
        "id": str(uuid.uuid4()),
        **form.model_dump(),
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    await db.contacts.insert_one(doc)
    background_tasks.add_task(
        send_emails,
        form.name,
        form.email,
        form.phone,
        form.subject,
        form.message
    )
    return {
        "status": "success",
        "message": "Your inquiry has been submitted. We'll be in touch soon!"
    }

@api_router.post("/chat")
async def chat_endpoint(msg: ChatMessage):
    try:
        if not openai_client:
            raise HTTPException(
                status_code=500,
                detail="OPENAI_API_KEY is missing in backend/.env"
            )

        session_doc = await db.chat_sessions.find_one(
            {"session_id": msg.session_id},
            {"_id": 0}
        )
        previous_messages = session_doc.get("messages", []) if session_doc else []

        messages = [
            {"role": "system", "content": DFAB_SYSTEM_MSG},
            *previous_messages,
            {"role": "user", "content": msg.message},
        ]

        response = openai_client.responses.create(
            model="gpt-4o-mini",
            input=messages,
        )

        assistant_text = response.output_text

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

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()