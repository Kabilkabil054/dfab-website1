# DFAB Stainless System Pvt Ltd Website

## Original Problem Statement
Redesign the existing DFAB Stainless Steels website (https://www.dfab.in/) into a modern, clean, and professional fabrication company website while keeping its core business identity. Blue (#0A66C2) and white theme, clean industrial design, fully responsive.

## User Choices
- Blue (#0A66C2) and White color theme
- Contact form: saved to DB + email notifications (SendGrid)
- Instagram: placeholder embed slots
- Google Maps: actual Peenya, Bengaluru location
- Blog: fully functional with admin CMS
- Chatbot: AI-powered using Claude claude-sonnet-4-5

## Architecture

### Tech Stack
- Frontend: React.js + Tailwind CSS + Embla Carousel + lucide-react
- Backend: FastAPI Python
- Database: MongoDB
- AI: Claude claude-sonnet-4-5 via emergentintegrations (EMERGENT_LLM_KEY)
- Email: SendGrid

### Pages Implemented
1. **Home** - Hero carousel (3 slides, updated taglines), Stats bar, About preview, 9 Services, Why Choose Us, Work Process (4 steps), 6 Projects preview, **Industries Served (9 sectors)**, Testimonials slider (5 clients), Infrastructure preview, Instagram placeholder (6 slots), **Export Readiness Banner**, CTA banner
2. **About** - Company story, Vision/Mission/Quality Policy, Facilities (6 items), Leadership Team (3 leaders), **Updated Certifications (ISO + ZED + ADNOC)**
3. **Capabilities** *(NEW)* - 6 detailed capabilities: Laser Cutting, CNC Bending, Welding (TIG/MIG/Laser/Orbital/Arc), CNC Machining, Heavy Fabrication, Assembly & Testing
4. **Quality & Certifications** *(NEW)* - ISO 9001:2015, ZED, ADNOC Approval, Welding Qualifications, Quality approach (4-step), Export Readiness CTA
5. **Careers** *(NEW)* - 4 job openings (TIG Welder, Fabricator, CNC Operator, QC Inspector), Why Work at DFAB, Apply via email
6. **Services** - 9 detailed service cards with sectors (retained at /services)
7. **Projects** - 6 industry sector cards
8. **Infrastructure** - Machines grid (8), Capabilities (8), In-house Talent (3)
9. **Blog** - Grid with category filter, full article view
10. **Blog Admin** - Login (password: dfab@admin2026), CRUD panel for posts
11. **Contact** - Form with DB save + email, Google Maps embed, WhatsApp CTA

### Components
- Navbar (sticky, mobile responsive, active link highlight)
- Footer (dark theme, social links, sitemap)
- WhatsApp floating button (bottom-left)
- ChatBot floating widget (bottom-right) - AI powered
- Global scroll reveal animations (IntersectionObserver)

### Backend APIs
- POST /api/contact - Save + email notification
- POST /api/chat - AI chatbot (Claude)
- GET /api/blog/posts - Public blog listing
- GET /api/blog/posts/{id} - Single post
- POST /api/admin/login - Admin auth
- GET/POST/PUT/DELETE /api/admin/blog/posts - Blog CRUD

## What's Been Implemented
- 2026-02-XX: Full website MVP built from scratch
  - Complete 9-page website with all sections
  - Testimonials section with 5 client testimonials (auto-sliding Embla carousel)
  - Leadership team (3 leaders with photo, bio, expertise tags)
  - Blog system with public listing + admin CMS (password: dfab@admin2026)
  - AI chatbot for fabrication industry inquiries (Claude via Emergent LLM Key)
  - "Inquire Now" WhatsApp modal (Date, Email, Phone, Message → wa.me link)
  - Floating WhatsApp button restricted to /contact page only
  - Contact form with email via SendGrid + Google Maps embed
  - Scroll reveal animations (IntersectionObserver + CSS keyframes)
  - Mobile-responsive design
  - Animated Robot SVG chatbot trigger button (floating, blinking, chest pulse)

- 2026-02-XX: Website Update per client document
  - Hero carousel taglines updated to new taglines from doc
  - Industries Served section (9 industries) added to Home
  - Export Readiness Banner added to Home
  - NEW /capabilities page with 6 detailed capabilities
  - NEW /quality page with ISO 9001, ZED, ADNOC, Welding Qualifications
  - NEW /careers page with 4 openings
  - About page updated with ZED + ADNOC cert badges
  - Navbar: added Capabilities, Quality, Careers; compact spacing

## Admin Credentials
- Blog Admin URL: /blog/admin
- Password: dfab@admin2026

## Environment Variables
- SENDGRID_API_KEY: configured
- EMERGENT_LLM_KEY: configured
- ADMIN_PASSWORD: dfab@admin2026
- RECEIVER_EMAIL: kabilkabil054@gmail.com

## Backlog

### P0 (Critical)
- None - all core features working

### P1 (High)
- Real Instagram API integration (replace placeholders with actual posts)
- Connect actual company photos for leadership team
- Real company stats in stats bar

### P2 (Medium)
- Blog post rich text editor (WYSIWYG) in admin panel
- Blog post cover image upload
- Testimonials admin management
- Contact inquiry management in admin panel
- Annual reports/downloads section

### Future/Backlog
- WhatsApp chat widget integration
- Customer inquiry tracking dashboard
- Multi-language support (Kannada/Hindi)
- SEO optimization with meta tags per page
- Sitemap.xml generation
