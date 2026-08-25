# CareerForge

A centralized platform for coding progress, career planning, interview
preparation, and job application tracking — with AI-powered resume analysis,
interview feedback, and a career coach, all backed by Gemini.

## Features

- **Auth** — register/login with hashed passwords (bcrypt) + JWT sessions
- **Profile** — target role, skills, education, used as context for the AI features
- **Applications tracker** — full CRUD, status pipeline (Applied → OA/Screening →
  Interviewing → Offer/Rejected)
- **Resume analyzer** — upload a PDF, get a structured AI score + strengths/gaps/suggestions
- **Interview prep** — role-specific question bank + AI-evaluated answers with feedback
- **AI career coach** — chat interface for open-ended career advice
- **Dashboard** — aggregated stats across all of the above

## Tech stack

- **Backend:** Node.js, Express, better-sqlite3 (SQLite), JWT, bcryptjs, multer, pdf-parse
- **AI:** Google Gemini (`gemini-1.5-flash`) via `@google/generative-ai`
- **Frontend:** Plain HTML/CSS/JS (no framework, no build step)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and fill in your values:
   ```bash
   cp .env.example .env
   ```
   - `GEMINI_API_KEY` — get a free key at https://aistudio.google.com/app/apikey
   - `JWT_SECRET` — any long random string
   - `PORT` — defaults to 3000

3. Run the app:
   ```bash
   npm start
   ```
   Or with auto-restart during development:
   ```bash
   npm run dev
   ```

4. Open **http://localhost:3000**

The SQLite database file (`careerforge.db`) is created automatically on first
run, including a seeded interview question bank (Software Engineer, Data
Analyst, Embedded Systems Engineer, and General/HR questions).

## Project structure

```
careerforge/
├── server/
│   ├── index.js              # Express app entry point
│   ├── db.js                 # SQLite schema + seed data
│   ├── middleware/auth.js    # JWT verification middleware
│   ├── utils/gemini.js       # Gemini API wrapper
│   └── routes/
│       ├── auth.js           # register/login
│       ├── profile.js
│       ├── applications.js
│       ├── resume.js
│       ├── coach.js
│       ├── interview.js
│       └── dashboard.js
├── client/
│   ├── index.html             # landing page
│   ├── login.html / login.js
│   ├── register.html / register.js
│   ├── dashboard.html / dashboard.js
│   ├── applications.html / applications.js
│   ├── resume.html / resume.js
│   ├── coach.html / coach.js
│   ├── interview.html / interview.js
│   ├── profile.html / profile.js
│   ├── auth.js                # shared client-side auth helpers + navbar
│   └── style.css
├── package.json
└── .env.example
```

## Notes for your report / viva

- **DBMS:** normalized schema across `users`, `profiles`, `applications`,
  `coach_logs`, `resume_analyses`, `interview_questions`, `interview_attempts`,
  with foreign keys and a dashboard endpoint that aggregates via `GROUP BY`/`AVG`.
- **DSA angle:** you can extend the applications tracker with a priority queue
  (e.g. surface the application with the nearest deadline first) or add a
  dependency-ordered prep checklist using topological sort if you want to add
  more of your own algorithm work on top of this base.
- **Security:** passwords are hashed with bcrypt (never stored in plain text),
  and all protected routes require a valid JWT.
- **AI integration:** every AI feature uses structured JSON prompts so the
  responses are reliably parseable and renderable, rather than free-form text.
