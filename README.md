# Job Application Tracker

A full-stack web application for tracking job applications — company, role, status, and notes — built to practice and demonstrate a production-grade full-stack workflow: React frontend, Express REST API, PostgreSQL database, Docker containerization, CI/CD, and multi-platform cloud deployment.

**Live demo:** https://job-tracker-iota-three.vercel.app/
**API:** https://job-tracker-lgbi.onrender.com/applications

> Note: the backend is hosted on Render's free tier, which spins down after ~15 minutes of inactivity. The first request after a period of inactivity may take 30–60 seconds to respond while the server wakes up — this is expected behavior, not a bug.

## Features

- Add, view, and delete job applications
- Track company, role, application status, date applied, resume version, job URL, and notes
- Filter applications by status (applied, interview, offer, rejected, withdrawn)
- Dashboard summary showing application counts by status
- Fully responsive REST API with proper error handling

## Tech Stack

**Frontend**
- React (Vite)
- Vanilla fetch API for HTTP requests
- ESLint for code quality

**Backend**
- Node.js + Express
- PostgreSQL (via `pg`)
- RESTful API design (GET, POST, PUT, DELETE)
- CORS-enabled for cross-origin requests

**Infrastructure**
- Docker (backend containerization)
- GitHub Actions (CI — lint and build checks on every push)
- Deployment: Vercel (frontend), Render (backend), Supabase (managed PostgreSQL)

## Architecture
┌─────────────┐ HTTPS ┌──────────────┐ SQL ┌─────────────┐
│ React │ ───────────────▶│ Express │ ───────────────▶│ PostgreSQL │
│ (Vercel) │ ◀─────────────── │ (Render) │ ◀─────────────── │ (Supabase) │
└─────────────┘ JSON/REST └──────────────┘ Connection └─────────────┘

Pooling

## API Endpoints

| Method | Endpoint            | Description                |
|--------|----------------------|----------------------------|
| GET    | `/applications`       | List all applications      |
| POST   | `/applications`       | Create a new application   |
| PUT    | `/applications/:id`   | Update an application      |
| DELETE | `/applications/:id`   | Delete an application      |

## Local Setup

### Prerequisites
- Node.js 20+
- Docker (for local PostgreSQL)

### Backend

```bash
cd backend
npm install

# Start a local PostgreSQL instance
docker run --name job-tracker-db \
  -e POSTGRES_USER=jobtracker \
  -e POSTGRES_PASSWORD=devpassword \
  -e POSTGRES_DB=job_tracker \
  -p 5432:5432 \
  -d postgres:16

# Load the schema
psql -h localhost -U jobtracker -d job_tracker -f db/schema.sql

# Configure environment variables (see .env.example)
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`, with the API running at `http://localhost:3001`.

## Environment Variables

**Backend** (`.env`)

DB_USER=
DB_PASSWORD=
DB_NAME=
DB_HOST=
DB_PORT=
PORT=3001
**Frontend** (`.env`)