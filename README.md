# DFAB Website

This project contains:

- `frontend`: React website
- `backend`: FastAPI API for contact, blog admin, and chat

## Run locally

1. Install frontend dependencies:
```powershell
cd frontend
npm install
```

2. Make sure backend Python dependencies are installed in your environment:
```powershell
pip install -r backend/requirements.txt
```

3. Copy env templates if needed:
```powershell
Copy-Item frontend/.env.example frontend/.env
Copy-Item backend/.env.example backend/.env
```

4. Start both services:
```powershell
npm run start:live
```

Or start them separately:
```powershell
npm run start:backend
npm run start:frontend
```

## Default local URLs

- Frontend: `http://localhost:3000`
- Backend: `http://127.0.0.1:8000`
- API health: `http://127.0.0.1:8000/api/`

## Notes

- If `GEMINI_API_KEY` is not set, the chat endpoint still works with a built-in fallback response.
- If `RESEND_API_KEY` is not set, contact submissions are still saved, but outbound emails are skipped.
