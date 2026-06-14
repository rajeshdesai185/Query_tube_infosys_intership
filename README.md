# AI QueryTube

AI QueryTube is a semantic YouTube video search app built with FastAPI, React, and ChromaDB.

## Features

- User login and registration with JWT auth
- Admin login and admin-only panel
- SQLite user database for persistent auth
- Semantic search with video similarity scoring
- Clean single-page React dashboard

## Local setup

### Backend

1. Create a Python environment and activate it:
   ```bash
   python -m venv .venv
   .\.venv\Scripts\activate
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the backend:
   ```bash
   uvicorn app:app --reload
   ```

### Frontend

1. Go to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React app:
   ```bash
   npm start
   ```

## Default accounts

- User: `user` / `userpassword`
- Admin: `admin` / `adminpassword`

## Notes

- The `users.db` file is created automatically on startup.
- Admin-only endpoints include `/admin/panel`, `/admin/users`, `/admin/disable-user/{username}`, and `/admin/enable-user/{username}`.
