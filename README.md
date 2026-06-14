# 🎬 AI-QueryTube

A full-stack **semantic video search application** built during an internship at **Infosys Springboard**. Users can search YouTube video content using natural language queries powered by vector embeddings and ChromaDB — going far beyond traditional keyword matching.

---

## 🚀 Features

### 🔍 Core Search
- **Semantic Search** — Natural language queries matched against video transcripts using cosine similarity
- **Similarity Scoring** — Each result ranked with a relevance score (Excellent / Good / Weak)
- **Query Preprocessing** — Automatic query cleaning and enhancement for better results

### 🔐 Authentication & Access Control
- **JWT-based Auth** — Secure login and registration with token expiry
- **Role-Based Access** — Separate `user` and `admin` roles with protected routes
- **Password Reset** — Forgot password flow with email verification
- **Account Management** — Admin can enable/disable/delete user accounts

### 👤 User Dashboard
- Personal search history with latency tracking
- Weekly activity chart (last 7 days)
- Match quality breakdown (Excellent / Good / Weak %)
- Watch history tracking
- Video comments and feedback submission

### 🛠️ Admin Panel
- Full user management (view, disable, enable, delete)
- System statistics and database metrics
- Video database management (view, remove, rebuild embeddings)
- Content import (YouTube URL, Playlist, Channel Sync)
- Data export (CSV / JSON)
- View all user feedback

### ⚡ Performance
- Sub-millisecond database queries with indexed SQLite tables
- Search latency logged per query per user
- Paginated video listing endpoints

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Backend | Python, FastAPI, Uvicorn |
| Frontend | React, Vite, CSS |
| Vector Database | ChromaDB |
| Embeddings | Sentence Transformers (`all-MiniLM-L6-v2`) |
| Authentication | JWT (`python-jose`), Passlib (`pbkdf2_sha256`) |
| User Database | SQLite |
| Data Processing | Pandas, NumPy, PyArrow |

---

## 📁 Project Structure

```
AI-QueryTube/
├── app.py                    # FastAPI main app — all API routes & auth logic
├── search_engine.py          # Semantic search — embedding generation & similarity
├── chromadb_manager.py       # ChromaDB vector store operations
├── embedding.py              # Sentence Transformer embedding wrapper
├── admin_manager.py          # Admin endpoints — stats, import, export, rebuild
├── parse_app.js              # Utility script for data parsing
├── test_api.py               # API tests
├── requirements.txt          # Python dependencies
├── frontend/                 # React frontend (Vite)
│   ├── src/
│   │   ├── App.jsx           # Main app with routing & auth state
│   │   ├── UserDashboard.jsx # User search dashboard
│   │   └── components/
│   │       └── LandingPage.jsx
│   ├── package.json
│   └── vite.config.js
└── .gitignore
```

---

## ⚙️ Local Setup

### Prerequisites
- Python 3.9+
- Node.js 16+

### Backend

```bash
# 1. Create and activate virtual environment
python -m venv .venv
.\.venv\Scripts\activate        # Windows
source .venv/bin/activate       # Mac/Linux

# 2. Install dependencies
pip install -r requirements.txt

# 3. Start the backend server
uvicorn app:app --reload
```

Backend runs at: `http://localhost:8000`
API docs available at: `http://localhost:8000/docs`

### Frontend

```bash
# 1. Navigate to frontend folder
cd frontend

# 2. Install dependencies
npm install

# 3. Start the React app
npm start
```

Frontend runs at: `http://localhost:3000`

---

## 🔑 Default Accounts

| Role | Username | Password |
|---|---|---|
| User | `user` | `userpassword` |
| Admin | `admin` | `adminpassword` |

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/register` | Register a new user |
| POST | `/login` | Login and receive JWT token |
| POST | `/forgot-password` | Reset password via email verification |
| GET | `/me` | Get current user profile |
| POST | `/admin/update-profile` | Update user profile details |

### Search
| Method | Endpoint | Description |
|---|---|---|
| POST | `/search` | Semantic search over video transcripts |

### User
| Method | Endpoint | Description |
|---|---|---|
| GET | `/user/videos` | Paginated list of all videos |
| GET | `/user/dashboard-stats` | Personal stats, search history, activity chart |
| GET | `/comments/{video_id}` | Get comments for a video |
| POST | `/comments` | Post a comment on a video |
| POST | `/feedback` | Submit app feedback with optional rating |

### Admin
| Method | Endpoint | Description |
|---|---|---|
| GET | `/admin/panel` | Admin welcome endpoint |
| GET | `/admin/users` | List all users |
| POST | `/admin/disable-user/{username}` | Disable a user |
| POST | `/admin/enable-user/{username}` | Enable a user |
| DELETE | `/admin/delete-user/{username}` | Permanently delete a user |
| GET | `/admin/stats` | System and database statistics |
| GET | `/admin/videos` | Paginated video list |
| POST | `/admin/rebuild-embeddings` | Rebuild all ChromaDB embeddings |
| POST | `/admin/clear-database` | Clear ChromaDB collection (password required) |
| DELETE | `/admin/videos/{video_id}` | Remove a specific video |
| POST | `/admin/export-data` | Export data as CSV or JSON |
| POST | `/admin/import` | Import content via URL, Playlist, or Channel |
| GET | `/admin/feedback` | View all user feedback |

---

## 💡 How It Works

```
User types a natural language query
         ↓
Query preprocessed (lowercased, cleaned, enhanced)
         ↓
Sentence Transformer generates a vector embedding
         ↓
ChromaDB finds top-K most similar transcript embeddings
         ↓
Results ranked by cosine similarity score
         ↓
Response includes video title, channel, URL, thumbnail, similarity score
         ↓
Search logged with latency for user dashboard analytics
```

---

## 📦 Key Dependencies

```
fastapi
uvicorn[standard]
sentence-transformers
chromadb
python-jose[cryptography]
passlib
pydantic
pandas
numpy
pyarrow
psutil
```

---

## 🗄️ Database Schema

SQLite (`users.db`) contains the following tables:

- `users` — username, hashed password, role, profile info
- `comments` — per-video user comments
- `feedback` — app feedback with optional rating
- `search_logs` — every search query with latency tracking
- `watch_history` — videos watched per user

---

## 👨‍💻 Author

**Rajesh Desai**  
MCA Final Year | Data Science & AI Developer  
Internship: Infosys Springboard  
[GitHub](https://github.com/rajeshdesai185)

---

## 📄 License

This project was developed as part of an internship at Infosys Springboard. For educational and portfolio purposes.