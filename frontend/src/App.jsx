import React, { useState, useEffect, useCallback } from "react";
import UserDashboard from "./UserDashboard";


const adminStyles = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --accent:       #1D9E75;
    --accent-lt:    #E1F5EE;
    --accent-dk:    #0F6E56;
    --accent-mid:   #5DCAA5;
    --danger:       #E24B4A;
    --danger-lt:    #FCEBEB;
    --warn:         #EF9F27;
    --warn-lt:      #FAEEDA;
    --info:         #378ADD;
    --info-lt:      #E6F1FB;
    --bg:           #F4F4F1;
    --surface:      #FFFFFF;
    --surface2:     #F7F7F5;
    --border:       rgba(0,0,0,0.08);
    --border2:      rgba(0,0,0,0.13);
    --text:         #1A1A18;
    --text2:        #5A5A56;
    --text3:        #9A9A96;
    --sidebar-w:    228px;
    --radius:       8px;
    --radius-lg:    12px;
  }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
    display: flex;
    font-size: 14px;
    line-height: 1.5;
  }

  .admin-wrapper {
    display: flex;
    width: 100%;
    min-height: 100vh;
    background: var(--bg);
  }

  .sidebar {
    width: var(--sidebar-w);
    background: var(--surface);
    border-right: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0; left: 0; bottom: 0;
    z-index: 100;
    overflow-y: auto;
  }

  .logo {
    padding: 20px 16px 16px;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
  }
  .logo-icon {
    width: 36px; height: 36px;
    background: var(--accent-lt);
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    color: var(--accent-dk);
    font-size: 20px;
    flex-shrink: 0;
  }
  .logo-name  { font-size: 14px; font-weight: 600; color: var(--text); }
  .logo-badge { font-size: 10px; color: var(--text3); }

  .nav-section { padding: 12px 8px 4px; }
  .nav-label   { font-size: 10px; color: var(--text3); letter-spacing: .08em; text-transform: uppercase; padding: 0 8px 6px; }

  .nav-item {
    display: flex; align-items: center; gap: 9px;
    padding: 7px 10px;
    border-radius: var(--radius);
    cursor: pointer;
    font-size: 13px; color: var(--text2);
    transition: background .12s, color .12s;
    text-decoration: none;
    background: none;
    border: none;
    width: 100%;
    text-align: left;
    font-family: inherit;
  }
  .nav-item:hover  { background: var(--surface2); color: var(--text); }
  .nav-item.active { background: var(--accent-lt); color: var(--accent-dk); font-weight: 500; }
  .nav-item .ti    { font-size: 17px; }
  .nav-badge {
    margin-left: auto;
    font-size: 10px; padding: 1px 7px;
    border-radius: 20px;
    background: var(--accent-lt); color: var(--accent-dk);
  }
  .nav-badge.red   { background: var(--danger-lt); color: var(--danger); }
  .nav-badge.amber { background: var(--warn-lt); color: #7A4A00; }

  .sidebar-footer {
    margin-top: auto;
    padding: 10px 8px;
    border-top: 1px solid var(--border);
  }

  .main {
    margin-left: var(--sidebar-w);
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .topbar {
    background: var(--surface);
    border-bottom: 1px solid var(--border);
    padding: 12px 24px;
    display: flex;
    align-items: center;
    gap: 10px;
    position: sticky; top: 0; z-index: 50;
  }
  .topbar-info { flex: 1; }
  .topbar-title { font-size: 16px; font-weight: 600; }
  .topbar-sub   { font-size: 11px; color: var(--text3); }

  .btn {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 7px 14px;
    border-radius: var(--radius);
    border: 1px solid var(--border2);
    background: transparent;
    font-family: 'DM Sans', sans-serif;
    font-size: 12px; font-weight: 500;
    cursor: pointer; color: var(--text);
    transition: background .12s;
  }
  .btn:hover        { background: var(--surface2); }
  .btn .ti          { font-size: 15px; }
  .btn.primary      { background: var(--accent); border-color: var(--accent); color: #fff; }
  .btn.primary:hover{ background: var(--accent-dk); }
  .btn.danger       { background: var(--danger-lt); border-color: transparent; color: var(--danger); }
  .btn.danger:hover { background: #f5d0d0; }

  .content { padding: 20px 24px; }

  .stats-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 12px;
    margin-bottom: 20px;
  }
  .stat-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 14px 16px;
    transition: box-shadow .15s;
  }
  .stat-card:hover { box-shadow: 0 2px 12px rgba(0,0,0,.07); }
  .stat-label {
    font-size: 11px; color: var(--text3);
    display: flex; align-items: center; gap: 5px;
    margin-bottom: 8px;
  }
  .stat-val   { font-size: 26px; font-weight: 600; letter-spacing: -.5px; }
  .stat-delta { font-size: 11px; margin-top: 4px; }
  .up   { color: var(--accent); }
  .down { color: var(--danger); }

  .grid-2   { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px; }
  .grid-3   { display: grid; grid-template-columns: 1.4fr 1fr 1fr; gap: 16px; margin-bottom: 20px; }
  .col-span2{ grid-column: span 2; }

  .card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 16px 18px;
  }
  .card-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 14px;
    flex-wrap: wrap;
    gap: 10px;
  }
  .card-title  { font-size: 13px; font-weight: 600; display: flex; align-items: center; gap: 7px; }
  .card-action { font-size: 11px; color: var(--accent); cursor: pointer; }
  .card-action:hover { text-decoration: underline; }

  .import-tabs { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 14px; }
  .itab {
    display: flex; align-items: center; gap: 5px;
    padding: 5px 11px;
    border-radius: 20px;
    border: 1px solid var(--border);
    background: var(--surface2);
    font-size: 11px; font-weight: 500;
    cursor: pointer; color: var(--text2);
    transition: all .12s;
  }
  .itab:hover { border-color: var(--accent-mid); color: var(--accent-dk); }
  .itab.sel   { background: var(--accent-lt); border-color: var(--accent-mid); color: var(--accent-dk); }
  .itab .ti   { font-size: 13px; }

  .drop-zone {
    border: 1.5px dashed var(--border2);
    border-radius: var(--radius-lg);
    padding: 18px 16px;
    text-align: center;
    cursor: pointer;
    transition: background .15s, border-color .15s;
  }
  .drop-zone:hover { background: var(--surface2); border-color: var(--accent-mid); }
  .drop-zone.dragover { background: var(--accent-lt); border-color: var(--accent); }
  .dz-icon  { font-size: 30px; color: var(--accent-mid); margin-bottom: 6px; }
  .dz-title { font-size: 13px; font-weight: 600; margin-bottom: 4px; }
  .dz-sub   { font-size: 11px; color: var(--text3); margin-bottom: 12px; }

  .field-row { display: flex; gap: 8px; margin-bottom: 8px; align-items: center; }
  .field-row input, .field-row select {
    flex: 1; padding: 7px 10px;
    border: 1px solid var(--border2);
    border-radius: var(--radius);
    background: var(--surface2);
    font-family: 'DM Sans', sans-serif;
    font-size: 12px; color: var(--text);
    outline: none; transition: border-color .12s;
  }
  .field-row input:focus, .field-row select:focus { border-color: var(--accent); }
  textarea.bulk-input {
    width: 100%; height: 80px; resize: none;
    padding: 8px 10px;
    border: 1px solid var(--border2);
    border-radius: var(--radius);
    background: var(--surface2);
    font-family: 'DM Mono', monospace;
    font-size: 11px; color: var(--text);
    outline: none; transition: border-color .12s;
    line-height: 1.6;
  }
  textarea.bulk-input:focus { border-color: var(--accent); }

  .progress-wrap { margin-top: 10px; display: none; }
  .progress-label { font-size: 11px; color: var(--text2); margin-bottom: 4px; display: flex; justify-content: space-between; }
  .progress-track { height: 5px; background: var(--surface2); border-radius: 3px; overflow: hidden; }
  .progress-fill  { height: 100%; width: 0; background: var(--accent); border-radius: 3px; transition: width .3s ease; }

  .import-success {
    display: none;
    background: var(--accent-lt);
    border: 1px solid var(--accent-mid);
    border-radius: var(--radius);
    padding: 10px 12px;
    margin-top: 10px;
    font-size: 12px;
  }
  .import-success .si-title { font-weight: 600; color: var(--accent-dk); display: flex; align-items: center; gap: 6px; margin-bottom: 4px; }
  .import-success .si-meta  { color: var(--text2); font-size: 11px; }

  .video-list { display: flex; flex-direction: column; gap: 0; }
  .video-row  {
    display: flex; align-items: center; gap: 10px;
    padding: 8px 0;
    border-bottom: 1px solid var(--border);
  }
  .video-row:last-child { border-bottom: none; }
  .vthumb {
    width: 42px; height: 28px;
    background: var(--surface2);
    border-radius: 5px;
    display: flex; align-items: center; justify-content: center;
    color: var(--text3); font-size: 13px;
    flex-shrink: 0;
    border: 1px solid var(--border);
  }
  .vtitle { font-size: 12px; font-weight: 500; flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .vmeta  { font-size: 10px; color: var(--text3); }

  .pill {
    display: inline-flex; align-items: center; gap: 3px;
    font-size: 10px; font-weight: 500;
    padding: 2px 8px; border-radius: 20px;
    white-space: nowrap; flex-shrink: 0;
  }
  .pill-green  { background: #EAF3DE; color: #3B6D11; }
  .pill-amber  { background: var(--warn-lt); color: #7A4A00; }
  .pill-red    { background: var(--danger-lt); color: #7A2020; }
  .pill-blue   { background: var(--info-lt); color: #1A4F8A; }
  .pill-gray   { background: var(--surface2); color: var(--text3); border: 1px solid var(--border); }

  .bar-row   { display: flex; align-items: center; gap: 8px; margin-bottom: 9px; }
  .bar-label { font-size: 11px; color: var(--text2); width: 64px; flex-shrink: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .bar-track { flex: 1; height: 7px; background: var(--surface2); border-radius: 4px; overflow: hidden; }
  .bar-fill  { height: 100%; border-radius: 4px; transition: width .6s ease; }
  .bar-count { font-size: 11px; color: var(--text3); width: 24px; text-align: right; }

  .actions-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .action-btn {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 12px;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    cursor: pointer; text-align: left;
    transition: background .12s, border-color .12s;
    font-family: 'DM Sans', sans-serif;
    width: 100%;
  }
  .action-btn:hover       { background: var(--surface); border-color: var(--border2); }
  .action-btn .ab-icon    { font-size: 20px; flex-shrink: 0; }
  .action-btn .ab-name    { font-size: 12px; font-weight: 600; color: var(--text); display: block; }
  .action-btn .ab-desc    { font-size: 10px; color: var(--text3); display: block; }
  .action-btn.a-danger:hover { background: var(--danger-lt); border-color: #f5a0a0; }
  .action-btn.a-danger .ab-name { color: var(--danger); }

  .feedback-item  { padding: 9px 0; border-bottom: 1px solid var(--border); }
  .feedback-item:last-child { border-bottom: none; }
  .fb-top    { display: flex; align-items: center; gap: 8px; margin-bottom: 3px; }
  .stars     { color: var(--warn); font-size: 12px; letter-spacing: 1px; }
  .fb-query  { font-size: 11px; color: var(--text3); font-style: italic; margin-bottom: 2px; }
  .fb-text   { font-size: 12px; color: var(--text2); }

  .activity-item { display: flex; align-items: flex-start; gap: 10px; padding: 7px 0; border-bottom: 1px solid var(--border); }
  .activity-item:last-child { border-bottom: none; }
  .act-dot  { width: 8px; height: 8px; border-radius: 50%; margin-top: 5px; flex-shrink: 0; }
  .act-body { flex: 1; font-size: 12px; color: var(--text2); }
  .act-time { font-size: 10px; color: var(--text3); flex-shrink: 0; }

  .divider { height: 1px; background: var(--border); margin: 14px 0; }

  #toast {
    position: fixed; bottom: 24px; right: 24px;
    background: var(--text); color: #fff;
    font-size: 12px; font-weight: 500;
    padding: 10px 16px;
    border-radius: var(--radius-lg);
    box-shadow: 0 4px 20px rgba(0,0,0,.18);
    transform: translateY(60px); opacity: 0;
    transition: all .25s ease;
    z-index: 999;
    display: flex; align-items: center; gap: 8px;
  }
  #toast.show { transform: translateY(0); opacity: 1; }

  .page { display: none; }
  .page.active { display: block; }

  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,.45);
    z-index: 200;
    display: none;
    align-items: center;
    justify-content: center;
  }
  .modal-overlay.show { display: flex; }

  .modal-content {
    background: var(--surface);
    border-radius: var(--radius-lg);
    padding: 24px;
    max-width: 360px;
    width: 90%;
    box-shadow: 0 8px 40px rgba(0,0,0,.2);
  }
  .modal-content .modal-title { font-size: 15px; font-weight: 600; margin-bottom: 8px; color: var(--danger); }
  .modal-content .modal-body { font-size: 13px; color: var(--text2); margin-bottom: 18px; line-height: 1.6; }
  .modal-actions { display: flex; gap: 8px; justify-content: flex-end; }

  @media (max-width: 900px) {
    .grid-3 { grid-template-columns: 1fr; }
    .col-span2 { grid-column: auto; }
  }
  @media (max-width: 700px) {
    .sidebar { transform: translateX(-100%); transition: transform .2s; }
    .sidebar.open { transform: translateX(0); }
    .main { margin-left: 0; }
    .grid-2 { grid-template-columns: 1fr; }
    .actions-grid { grid-template-columns: 1fr; }
  }
`;

function App() {
  const [currentView, setCurrentView] = useState("home");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [authError, setAuthError] = useState("");
  const [authSuccess, setAuthSuccess] = useState("");
  const [searched, setSearched] = useState(false);

  const parseJson = async (response) => {
    try {
      return await response.json();
    } catch {
      return null;
    }
  };
  const [adminMessage, setAdminMessage] = useState("");
  const [adminStats, setAdminStats] = useState(null);
  const [adminVideos, setAdminVideos] = useState([]);
  const [adminActionLoading, setAdminActionLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [feedbackRating, setFeedbackRating] = useState(5);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [adminFeedback, setAdminFeedback] = useState([]);
  const [adminUsers, setAdminUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [userForm, setUserForm] = useState({ username: "", password: "", full_name: "", email: "", first_name: "", last_name: "", mob: "", gender: "" });
  const [adminAnalytics, setAdminAnalytics] = useState(null);
  const [adminProfile, setAdminProfile] = useState(null);
  const [adminNav, setAdminNav] = useState("Dashboard");
  const [importTab, setImportTab] = useState("YouTube URL");
  const [importUrl, setImportUrl] = useState("");
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [csvJsonInput, setCsvJsonInput] = useState("");
  const [bulkUrls, setBulkUrls] = useState("");
  const [channelSync, setChannelSync] = useState("");
  const [importLoading, setImportLoading] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [systemActivity] = useState([
    { title: "Embeddings rebuilt", detail: "9,841 chunks", time: "2m ago" },
    { title: "Channel sync completed", detail: "AI Explained", time: "14m ago" },
    { title: "Export generated", detail: "CSV / JSON", time: "1h ago" },
    { title: "New feedback received", detail: "User rating 4.8", time: "3h ago" },
  ]);
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [resetUsername, setResetUsername] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [resetNewPassword, setResetNewPassword] = useState("");
  const [resetSuccess, setResetSuccess] = useState("");
  const [resetError, setResetError] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [authFormType, setAuthFormType] = useState("login");
  const [activeDocTab, setActiveDocTab] = useState("overview");
  const [selectedCodeLang, setSelectedCodeLang] = useState("javascript");

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .fade-in {
        animation: fadeIn 0.6s ease-out;
      }
    `;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      setAuthError("Please enter both username and password.");
      setAuthSuccess("");
      return;
    }
    setAuthError("");
    setAuthSuccess("");
    try {
      const response = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.trim(), password: password.trim() }),
      });
      const errData = await parseJson(response);
      if (!response.ok) {
        throw new Error(errData?.detail || errData?.message || "Login failed. Please try again.");
      }
      const data = errData;
      setToken(data.access_token);
      setRole(data.role);
      setLoggedIn(true);
      setAuthError("");
      setUsername("");
      setPassword("");
      setResults([]);
      setSearched(false);
      setError("");
      setCurrentView(data.role === "admin" ? "admin" : "search");
    } catch (err) {
      const message = err.message || "Login failed. Please try again.";
      const friendlyMessage = message.includes("Failed to fetch") || message.includes("Failed to establish") || message.includes("Connection refused")
        ? "Unable to connect to backend API at http://127.0.0.1:8000. Make sure the backend server is running."
        : message;
      setAuthError(friendlyMessage);
    }
  };

  const handleRegister = async () => {
    if (!username.trim() || !password.trim()) {
      setAuthError("Please enter both username and password.");
      setAuthSuccess("");
      return;
    }
    if (password.length < 6) {
      setAuthError("Password must be at least 6 characters.");
      setAuthSuccess("");
      return;
    }
    if (username.length < 3) {
      setAuthError("Username must be at least 3 characters.");
      setAuthSuccess("");
      return;
    }
    setAuthError("");
    setAuthSuccess("");
    try {
      const response = await fetch("http://127.0.0.1:8000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          username: username.trim(), 
          password: password.trim(), 
          role: "user",
          first_name: userForm.first_name,
          last_name: userForm.last_name,
          email: userForm.email,
          mob: userForm.mob,
          gender: userForm.gender
        }),
      });
      const data = await parseJson(response);
      if (!response.ok) {
        throw new Error(data?.detail || data?.message || "Registration failed. Please try again.");
      }
      setAuthFormType("login");
      setAuthError("");
      setAuthSuccess(data.message || "Registration successful! Please log in.");
      setUsername("");
      setPassword("");
      setUserForm({ username: "", password: "", full_name: "", email: "", first_name: "", last_name: "", mob: "", gender: "" });
    } catch (err) {
      const message = err.message || "Registration failed. Please try again.";
      const friendlyMessage = message.includes("Failed to fetch") || message.includes("Failed to establish") || message.includes("Connection refused")
        ? "Unable to connect to backend API at http://127.0.0.1:8000. Make sure the backend server is running."
        : message;
      setAuthError(friendlyMessage);
    }
  };

  const handleResetPassword = async () => {
    if (!resetUsername.trim() || !resetEmail.trim() || !resetNewPassword.trim()) {
      setResetError("Please fill out all fields.");
      setResetSuccess("");
      return;
    }
    setResetLoading(true);
    setResetError("");
    setResetSuccess("");
    try {
      const response = await fetch("http://127.0.0.1:8000/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: resetUsername.trim(),
          email: resetEmail.trim(),
          new_password: resetNewPassword.trim()
        })
      });
      const data = await parseJson(response);
      if (!response.ok) {
        throw new Error(data?.detail || data?.message || "Failed to reset password.");
      }
      setResetSuccess(data.message || "Password reset successfully! You can now log in.");
      setTimeout(() => {
        setShowPasswordReset(false);
        setResetUsername("");
        setResetEmail("");
        setResetNewPassword("");
        setResetSuccess("");
        setResetError("");
      }, 3000);
    } catch (err) {
      setResetError(err.message || "An error occurred. Please try again.");
    } finally {
      setResetLoading(false);
    }
  };

  const handleLogout = () => {
    setUsername("");
    setPassword("");
    setToken("");
    setRole("");
    setLoggedIn(false);
    setResults([]);
    setSearched(false);
    setAdminMessage("");
    setAdminProfile(null);
    setAdminVideos([]);
    setAdminFeedback([]);
    setAdminStats(null);
    setAuthFormType("login");
    setCurrentView("home");
  };

  const handleGetStats = useCallback(async () => {
    setAdminActionLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/admin/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to get stats");
      const data = await response.json();
      setAdminStats(data);
    } catch (err) {
      setAdminMessage(err.message);
    } finally {
      setAdminActionLoading(false);
    }
  }, [token]);

  const handleGetVideos = useCallback(async (limit = 50, offset = 0) => {
    setAdminActionLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:8000/admin/videos?limit=${limit}&offset=${offset}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to load videos");
      const data = await response.json();
      setAdminVideos(data.videos || []);
    } catch (err) {
      setAdminMessage(err.message || "Failed to load videos");
    } finally {
      setAdminActionLoading(false);
    }
  }, [token]);

  const handleGetAdminFeedback = useCallback(async () => {
    setAdminActionLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/admin/feedback", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to load feedback");
      const data = await response.json();
      setAdminFeedback(data || []);
    } catch (err) {
      setAdminMessage(err.message || "Failed to load feedback");
    } finally {
      setAdminActionLoading(false);
    }
  }, [token]);

  const handleGetUsers = useCallback(async () => {
    setUsersLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to load users");
      const data = await response.json();
      setAdminUsers(data.users || []);
    } catch (err) {
      setAdminMessage(err.message || "Failed to load users");
    } finally {
      setUsersLoading(false);
    }
  }, [token]);

  const handleGetAnalytics = useCallback(async () => {
    setAdminActionLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/admin/analytics", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to load analytics");
      const data = await response.json();
      setAdminAnalytics(data);
    } catch (err) {
      setAdminMessage(err.message || "Failed to load analytics");
    } finally {
      setAdminActionLoading(false);
    }
  }, [token]);

  const handleCreateUser = async () => {
    if (!userForm.username.trim() || !userForm.password.trim()) {
      setAdminMessage("Please enter a username and password for the new user.");
      return;
    }
    setAdminActionLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: userForm.username.trim(),
          password: userForm.password,
          first_name: userForm.full_name,
          email: userForm.email,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || data.message || "Failed to create user");
      setAdminMessage(`✅ ${data.message}`);
      setUserForm({ username: "", password: "", full_name: "", email: "" });
      await handleGetUsers();
    } catch (err) {
      setAdminMessage(err.message);
    } finally {
      setAdminActionLoading(false);
    }
  };

  const handleToggleUserStatus = async (username, enable) => {
    setAdminActionLoading(true);
    try {
      const endpoint = enable ? "/admin/enable-user/" : "/admin/disable-user/";
      const response = await fetch(`http://127.0.0.1:8000${endpoint}${encodeURIComponent(username)}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || data.message || "Failed to update user status");
      setAdminMessage(`✅ ${data.message}`);
      await handleGetUsers();
    } catch (err) {
      setAdminMessage(err.message);
    } finally {
      setAdminActionLoading(false);
    }
  };

  const handleDeleteUser = async (username) => {
    if (!window.confirm(`Delete user ${username}? This action cannot be undone.`)) return;
    setAdminActionLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:8000/admin/delete-user/${encodeURIComponent(username)}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || data.message || "Failed to delete user");
      setAdminMessage(`✅ ${data.message}`);
      await handleGetUsers();
    } catch (err) {
      setAdminMessage(err.message);
    } finally {
      setAdminActionLoading(false);
    }
  };

  useEffect(() => {
    const loadAdminProfile = async () => {
      if (!token) return;
      try {
        const response = await fetch("http://127.0.0.1:8000/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) return;
        const data = await response.json();
        setAdminProfile(data);
      } catch (err) {
        console.error("Failed to load admin profile:", err);
      }
    };
    if (loggedIn && role === "admin" && token) {
      loadAdminProfile();
    }
  }, [loggedIn, role, token, handleGetStats, handleGetVideos, handleGetAdminFeedback]);

  // Load admin dashboard data when admin opens the dashboard
  useEffect(() => {
    const loadAdminData = async () => {
      if (!token || role !== "admin") return;
      try {
        await handleGetStats();
      } catch (e) {
        console.error('failed stats', e);
      }
      try {
        await handleGetVideos();
      } catch (e) {
        console.error('failed videos', e);
      }
      try {
        await handleGetAdminFeedback();
      } catch (e) {
        console.error('failed feedback', e);
      }
      try {
        await handleGetUsers();
      } catch (e) {
        console.error('failed users', e);
      }
      try {
        await handleGetAnalytics();
      } catch (e) {
        console.error('failed analytics', e);
      }
    };

    if (loggedIn && role === "admin") {
      loadAdminData();
    }
    // Intentionally only watch login/role/token to refresh when admin signs in
  }, [loggedIn, role, token, handleGetStats, handleGetVideos, handleGetAdminFeedback, handleGetUsers, handleGetAnalytics]);

  // Fetch relevant admin data when navigation changes
  useEffect(() => {
    if (!token || role !== 'admin') return;
    if (adminNav === 'All Videos') {
      handleGetVideos();
    }
    if (adminNav === 'Feedback') {
      handleGetAdminFeedback();
    }
    if (adminNav === 'Dashboard') {
      handleGetStats();
    }
    if (adminNav === 'Analytics') {
      handleGetAnalytics();
    }
    if (adminNav === 'Users') {
      handleGetUsers();
    }
  }, [adminNav, token, role, handleGetStats, handleGetVideos, handleGetAdminFeedback, handleGetAnalytics, handleGetUsers]);

  // Client-side Route Guard
  useEffect(() => {
    if (!loggedIn) {
      if (currentView === "search" || currentView === "admin") {
        setCurrentView("login");
      }
    } else {
      if (currentView === "login" || currentView === "register") {
        setCurrentView(role === "admin" ? "admin" : "search");
      }
    }
  }, [loggedIn, currentView, role]);

  const handleSearch = async () => {
    if (!query.trim()) {
      setError("Please enter a search query");
      return;
    }
    setLoading(true);
    setError("");
    setSearched(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ query: query.trim(), top_k: 5, min_similarity: 0.1 }),
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || "Search failed. Please try again.");
      }
      const data = await response.json();
      setResults(data.results || []);
    } catch (err) {
      setError(err.message);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };



  const handleRebuildEmbeddings = async () => {
    setAdminMessage("");
    setAdminVideos([]);
    setAdminFeedback([]);
    setAdminStats(null);
    if (!window.confirm("This will rebuild all embeddings. This may take several minutes. Continue?")) return;
    setAdminActionLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/admin/rebuild-embeddings", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        setAdminMessage(`✅ ${data.message}`);
        handleGetStats();
      } else {
        setAdminMessage(`❌ ${data.error}`);
      }
    } catch (err) {
      setAdminMessage(`❌ Error: ${err.message}`);
    } finally {
      setAdminActionLoading(false);
    }
  };

  const handleClearDatabase = async () => {
    setAdminMessage("");
    setAdminVideos([]);
    setAdminFeedback([]);
    setAdminStats(null);
    if (!window.confirm("Are you sure you want to remove data?")) return;
    const pwd = window.prompt("Please enter your admin password to confirm:");
    if (!pwd) return;
    setAdminActionLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/admin/clear-database", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password: pwd }),
      });
      const data = await response.json();
      if (data.success) {
        setAdminMessage(`✅ ${data.message}`);
        handleGetStats();
        setAdminVideos([]);
      } else {
        setAdminMessage(`❌ ${data.error}`);
      }
    } catch (err) {
      setAdminMessage(`❌ Error: ${err.message}`);
    } finally {
      setAdminActionLoading(false);
    }
  };

  const handleExportData = async () => {
    setAdminMessage("");
    setAdminVideos([]);
    setAdminFeedback([]);
    setAdminStats(null);
    setAdminActionLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/admin/export-data", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        setAdminMessage(`✅ ${data.message}`);
      } else {
        setAdminMessage(`❌ ${data.error}`);
      }
    } catch (err) {
      setAdminMessage(`❌ Error: ${err.message}`);
    } finally {
      setAdminActionLoading(false);
    }
  };

  const handleVideoSelect = async (video) => {
    setSelectedVideo(video);
    setComments([]);
    setNewComment("");
    setCommentsLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:8000/comments/${video.video_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const commentsData = await response.json();
        setComments(commentsData);
      }
    } catch (err) {
      console.error("Failed to load comments:", err);
    } finally {
      setCommentsLoading(false);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      const response = await fetch("http://127.0.0.1:8000/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ video_id: selectedVideo.video_id, comment: newComment.trim() }),
      });
      if (response.ok) {
        const newCommentData = await response.json();
        setComments([newCommentData, ...comments]);
        setNewComment("");
      } else {
        alert("Failed to add comment");
      }
    } catch (err) {
      alert("Failed to add comment");
    }
  };

  const handleSubmitFeedback = async () => {
    if (!feedback.trim()) {
      setFeedbackMessage("Please enter your feedback");
      return;
    }
    setFeedbackLoading(true);
    setFeedbackMessage("");
    try {
      const response = await fetch("http://127.0.0.1:8000/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ feedback: feedback.trim(), rating: feedbackRating }),
      });
      if (response.ok) {
        setFeedbackMessage("Thank you for your feedback!");
        setFeedback("");
        setFeedbackRating(5);
        setFeedbackSubmitted(true);
      } else {
        setFeedbackMessage("Failed to submit feedback");
      }
    } catch (err) {
      setFeedbackMessage("Failed to submit feedback");
    } finally {
      setFeedbackLoading(false);
    }
  };

  const handleScheduleImport = () => {
    setAdminMessage("✅ Schedule Import is coming soon.");
  };

  const handleImportAndEmbed = async () => {
    if (importLoading) return;
    setImportLoading(true);
    setImportProgress(0);
    setAdminMessage("");

    const requiredValue = {
      "YouTube URL": importUrl,
      Playlist: playlistUrl,
      "CSV/JSON": csvJsonInput,
      "Bulk URL": bulkUrls,
      "Channel Sync": channelSync,
    }[importTab];

    if (!requiredValue || !requiredValue.trim()) {
      setAdminMessage(`Please fill the ${importTab} field before importing.`);
      setImportLoading(false);
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/admin/import", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ import_type: importTab, value: requiredValue.trim() }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || data.message || "Import failed");
      }
      setAdminMessage(`✅ ${data.message}`);
      await handleGetVideos();
      await handleGetStats();
      setImportProgress(100);
    } catch (err) {
      setAdminMessage(err.message);
    } finally {
      setImportLoading(false);
    }
  };

  const handleBackToResults = () => {
    setSelectedVideo(null);
    setComments([]);
    setNewComment("");
  };

  const showToast = (message, icon) => {
    // Simple toast notification - you can enhance this with a toast library later
    alert(message);
  };

  const handleScrollToFeatures = () => {
    if (currentView !== "home") {
      setCurrentView("home");
      setTimeout(() => {
        const featuresEl = document.querySelector(".features");
        if (featuresEl) {
          featuresEl.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const featuresEl = document.querySelector(".features");
      if (featuresEl) {
        featuresEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const showLandingNav = !loggedIn || currentView === "home" || currentView === "auth" || currentView === "docs";

  return (
    <div style={{
      minHeight: "100vh",
      color: "var(--text)",
      fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif"
    }}>
      {/* NAVBAR */}
      {showLandingNav ? (
        <nav className="navbar">
          <div className="nav-logo" onClick={() => setCurrentView("home")}>
            <div className="nav-logo-icon">
              <i className="ti ti-brain"></i>
            </div>
            <span>AI Query Tube</span>
          </div>
          <div className="nav-menu">
            <span className={`nav-link ${currentView === "home" ? "active" : ""}`} onClick={() => setCurrentView("home")}>Home</span>
            <span className="nav-link" onClick={handleScrollToFeatures}>Features</span>
            <span className={`nav-link ${currentView === "docs" ? "active" : ""}`} onClick={() => setCurrentView("docs")}>Docs</span>
            {loggedIn ? (
              <>
                <span className="nav-link" onClick={() => setCurrentView(role === "admin" ? "admin" : "search")}>
                  Dashboard
                </span>
                <button className="btn-outline-nav" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <button className="btn-outline-nav" onClick={() => { setAuthFormType("login"); setCurrentView("auth"); }}>Sign In</button>
                <button className="btn-primary-nav" onClick={() => { setAuthFormType("register"); setCurrentView("auth"); }}>Get Started</button>
              </>
            )}
          </div>
        </nav>
      ) : (
        <nav className="navbar">
          <div className="nav-logo" onClick={() => setCurrentView(role === "admin" ? "admin" : "search") }>
            <div className="nav-logo-icon">
              <i className="ti ti-brain"></i>
            </div>
            <span>AI Query Tube</span>
          </div>
        </nav>
      )}

      <main style={{ paddingTop: "88px" }}>
        
        {/* ── 1. HOME / LANDING VIEW ── */}
        {currentView === "home" && (
          <div>
            {/* HERO SECTION */}
            <section className="hero">
              <div className="hero-content">
                <h1>Ask Questions About Any Video</h1>
                <p>AI Query Tube uses advanced embeddings and real-time search to find answers from your entire video library instantly. Powered by semantic search and AI.</p>
                <div className="hero-buttons">
                  <button className="btn-primary-nav" onClick={() => { setAuthFormType("register"); setCurrentView("auth"); }}>Start Free Trial</button>
                  <button className="btn-outline-nav" onClick={() => document.querySelector('.demo-search')?.scrollIntoView({behavior: 'smooth'})}>See Demo</button>
                </div>
              </div>
            </section>

            {/* DEMO SECTION */}
            <section className="demo-search">
              <div className="hero-demo">
                <div className="demo-header">
                  <span style={{background: "#EF4444"}}></span>
                  <span style={{background: "#F59E0B"}}></span>
                  <span style={{background: "#10B981"}}></span>
                </div>
                <div style={{padding: "24px"}}>
                  <div className="search-box-demo">
                    <i className="ti ti-search" style={{color: "var(--text-muted)"}}></i>
                    <input type="text" placeholder="Ask: How to build a RAG system? Or: Best practices for vector embeddings?" readOnly />
                  </div>
                  <div style={{marginBottom: "16px", fontSize: "12px", color: "var(--text-muted)"}}>Results from 142 videos • AI powered search</div>
                  <div className="demo-results">
                    <div className="demo-card">
                      <div style={{fontSize: "24px", marginBottom: "8px"}}>🎥</div>
                      <div className="demo-card-title">RAG Architecture</div>
                      <div style={{fontSize: "11px", color: "var(--text-muted)", marginTop: "6px"}}>18:42</div>
                    </div>
                    <div className="demo-card">
                      <div style={{fontSize: "24px", marginBottom: "8px"}}>🔍</div>
                      <div className="demo-card-title">Vector Search 101</div>
                      <div style={{fontSize: "11px", color: "var(--text-muted)", marginTop: "6px"}}>24:15</div>
                    </div>
                    <div className="demo-card">
                      <div style={{fontSize: "24px", marginBottom: "8px"}}>⚡</div>
                      <div className="demo-card-title">Fast Embeddings</div>
                      <div style={{fontSize: "11px", color: "var(--text-muted)", marginTop: "6px"}}>12:33</div>
                    </div>
                    <div className="demo-card">
                      <div style={{fontSize: "24px", marginBottom: "8px"}}>💾</div>
                      <div className="demo-card-title">ChromaDB Setup</div>
                      <div style={{fontSize: "11px", color: "var(--text-muted)", marginTop: "6px"}}>16:48</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* FEATURES SECTION */}
            <section className="features">
              <h2 className="section-title">Why Choose AI Query Tube?</h2>
              <div className="features-grid">
                <div className="feature-card">
                  <div className="feature-icon"><i className="ti ti-bolt"></i></div>
                  <h3>Instant Results</h3>
                  <p>Find relevant video moments in milliseconds using semantic search</p>
                </div>
                <div className="feature-card">
                  <div className="feature-icon"><i className="ti ti-brain"></i></div>
                  <h3>AI Powered</h3>
                  <p>Advanced embeddings understand the meaning, not just keywords</p>
                </div>
                <div className="feature-card">
                  <div className="feature-icon"><i className="ti ti-lock"></i></div>
                  <h3>Private & Secure</h3>
                  <p>Your data stays in your account. No third-party sharing.</p>
                </div>
                <div className="feature-card">
                  <div className="feature-icon"><i className="ti ti-upload"></i></div>
                  <h3>Easy Import</h3>
                  <p>Upload YouTube URLs, playlists, or channel content in seconds</p>
                </div>
                <div className="feature-card">
                  <div className="feature-icon"><i className="ti ti-chart-bar"></i></div>
                  <h3>Analytics</h3>
                  <p>Track search patterns and discover trending topics in your library</p>
                </div>
                <div className="feature-card">
                  <div className="feature-icon"><i className="ti ti-api"></i></div>
                  <h3>API Access</h3>
                  <p>Integrate AI Query Tube into your applications with our REST API</p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ── DOCS VIEW ── */}
        {currentView === "docs" && (
          <div className="docs-container fade-in" style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "40px 24px",
            display: "grid",
            gridTemplateColumns: "280px 1fr",
            gap: "40px",
            minHeight: "calc(100vh - 88px)"
          }}>
            {/* Docs Sidebar */}
            <aside className="docs-sidebar" style={{
              position: "sticky",
              top: "128px",
              height: "fit-content",
              display: "flex",
              flexDirection: "column",
              gap: "8px"
            }}>
              <div style={{
                fontSize: "11px",
                fontWeight: 600,
                textTransform: "uppercase",
                color: "var(--text-muted)",
                letterSpacing: "0.1em",
                marginBottom: "8px",
                paddingLeft: "8px"
              }}>Documentation</div>
              {[
                { id: "overview", label: "Overview & RAG", icon: "ti-components" },
                { id: "search", label: "Semantic Search", icon: "ti-search" },
                { id: "import", label: "Video Management", icon: "ti-video" },
                { id: "api", label: "Developer API", icon: "ti-api" },
                { id: "faq", label: "FAQ & Help", icon: "ti-help" }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveDocTab(item.id)}
                  className="glass-panel"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px 16px",
                    borderRadius: "12px",
                    border: activeDocTab === item.id ? "1.5px solid var(--primary)" : "1px solid var(--glass-border)",
                    background: activeDocTab === item.id ? "rgba(99, 102, 241, 0.12)" : "var(--glass-bg)",
                    color: activeDocTab === item.id ? "#fff" : "var(--text-muted)",
                    cursor: "pointer",
                    textAlign: "left",
                    fontFamily: "inherit",
                    fontSize: "14px",
                    fontWeight: activeDocTab === item.id ? 600 : 500,
                    transition: "all 0.2s ease"
                  }}
                >
                  <i className={`ti ${item.icon}`} style={{ fontSize: "16px", color: activeDocTab === item.id ? "var(--primary)" : "inherit" }}></i>
                  {item.label}
                </button>
              ))}

              <div style={{ marginTop: "24px", padding: "16px", borderRadius: "12px", background: "rgba(99, 102, 241, 0.05)", border: "1px solid rgba(99, 102, 241, 0.1)" }}>
                <h4 style={{ fontSize: "13px", fontWeight: 600, color: "#fff", marginBottom: "4px" }}>Need extra help?</h4>
                <p style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: 1.5, marginBottom: "12px" }}>Get in touch with support or submit your feedback directly.</p>
                <button 
                  onClick={() => {
                    if (loggedIn) {
                      if (role === "admin") {
                        setCurrentView("admin");
                        setAdminNav("Feedback");
                      } else {
                        setCurrentView("search");
                      }
                    } else {
                      setCurrentView("auth");
                      setAuthFormType("login");
                    }
                  }}
                  className="btn-primary-nav" 
                  style={{ width: "100%", padding: "8px 12px", fontSize: "12px" }}
                >
                  {loggedIn ? "Submit Feedback" : "Sign In for Support"}
                </button>
              </div>
            </aside>

            {/* Docs Content */}
            <section className="docs-content" style={{
              background: "var(--glass-bg)",
              backdropFilter: "blur(12px)",
              border: "1px solid var(--glass-border)",
              borderRadius: "20px",
              padding: "40px",
              color: "var(--text)"
            }}>
              {activeDocTab === "overview" && (
                <div className="fade-in">
                  <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Architecture Guide</span>
                  <h2 style={{ fontSize: "32px", fontWeight: 700, marginTop: "8px", marginBottom: "20px" }}>System Overview & RAG</h2>
                  <p style={{ fontSize: "15px", color: "var(--text-muted)", lineHeight: 1.8, marginBottom: "24px" }}>
                    AI Query Tube is a state-of-the-art video intelligence search platform. It uses <strong>Retrieval-Augmented Generation (RAG)</strong> to parse video content, indexing transcript segments into high-dimensional vector spaces, allowing you to search and ask questions directly about any video in your collection.
                  </p>

                  <h3 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "16px", color: "#fff" }}>How the Pipeline Works</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "32px" }}>
                    {[
                      { step: "1", title: "Content Ingestion", desc: "YouTube URLs, entire channels, playlists, or custom metadata lists are imported via the admin interface." },
                      { step: "2", title: "Audio Transcription", desc: "The backend fetches video subtitles or transcribes speech into highly accurate, time-stamped text chunks." },
                      { step: "3", title: "Semantic Embedding", desc: "Text segments are mapped to high-dimensional vectors using modern sentence-transformer models." },
                      { step: "4", title: "Vector Storage", desc: "Embeddings are stored in ChromaDB, an open-source AI vector database built for lightning-fast similarity search." },
                      { step: "5", title: "Real-time Retrieval", desc: "When you type a query, the model embeds it, searches ChromaDB for matching moments, and lets you play the video at that exact millisecond." }
                    ].map(item => (
                      <div key={item.step} style={{ display: "flex", gap: "16px", padding: "16px", borderRadius: "12px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                        <div style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          background: "linear-gradient(135deg, var(--primary), var(--accent))",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#fff",
                          fontWeight: 700,
                          fontSize: "14px",
                          flexShrink: 0
                        }}>{item.step}</div>
                        <div>
                          <h4 style={{ fontSize: "15px", fontWeight: 600, color: "#fff", marginBottom: "4px" }}>{item.title}</h4>
                          <p style={{ fontSize: "13.5px", color: "var(--text-muted)", lineHeight: 1.6 }}>{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeDocTab === "search" && (
                <div className="fade-in">
                  <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Search Technologies</span>
                  <h2 style={{ fontSize: "32px", fontWeight: 700, marginTop: "8px", marginBottom: "20px" }}>Semantic vs Keyword Search</h2>
                  <p style={{ fontSize: "15px", color: "var(--text-muted)", lineHeight: 1.8, marginBottom: "24px" }}>
                    Standard searches look for exact characters (e.g. searching "database" only returns segments containing the literal letters d-a-t-a-b-a-s-e). AI Query Tube uses <strong>semantic vector search</strong> to read the *meaning* of your questions.
                  </p>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "32px" }}>
                    <div style={{ padding: "24px", borderRadius: "16px", background: "rgba(239, 68, 68, 0.05)", border: "1px solid rgba(239, 68, 68, 0.15)" }}>
                      <h4 style={{ color: "var(--danger)", fontSize: "16px", fontWeight: 600, marginBottom: "12px" }}>❌ Traditional Keyword Search</h4>
                      <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.6 }}>
                        Looks for word matches. Misses synonyms, context, and structural definitions.
                      </p>
                      <div style={{ marginTop: "16px", padding: "12px", borderRadius: "8px", background: "rgba(0,0,0,0.2)", fontSize: "12px", fontFamily: "monospace" }}>
                        Query: "AI models"<br/>
                        Result: 0 matches (if video only says "machine learning system")
                      </div>
                    </div>
                    <div style={{ padding: "24px", borderRadius: "16px", background: "rgba(16, 185, 129, 0.05)", border: "1px solid rgba(16, 185, 129, 0.15)" }}>
                      <h4 style={{ color: "var(--success)", fontSize: "16px", fontWeight: 600, marginBottom: "12px" }}>✨ AI Semantic Search</h4>
                      <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.6 }}>
                        Embeds meaning into math coordinates. Matches conceptually related words and full ideas.
                      </p>
                      <div style={{ marginTop: "16px", padding: "12px", borderRadius: "8px", background: "rgba(0,0,0,0.2)", fontSize: "12px", fontFamily: "monospace" }}>
                        Query: "AI models"<br/>
                        Result: Matches "LLMs", "deep learning", "neural networks", etc.
                      </div>
                    </div>
                  </div>

                  <h3 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "12px", color: "#fff" }}>Search Tips</h3>
                  <ul style={{ paddingLeft: "20px", color: "var(--text-muted)", fontSize: "14px", lineHeight: 1.8, display: "grid", gap: "10px" }}>
                    <li><strong>Ask full questions:</strong> Rather than just "SQL", ask "How do I optimize SQL index queries?" to get specific moment matches.</li>
                    <li><strong>Concept search:</strong> Search for abstract things like "debugging web servers" to find videos explaining server crashes.</li>
                    <li><strong>Direct Moment Play:</strong> Click on any search card to instantly jump to the exact timeline second where the speaker explains the answer.</li>
                  </ul>
                </div>
              )}

              {activeDocTab === "import" && (
                <div className="fade-in">
                  <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Admin Tutorial</span>
                  <h2 style={{ fontSize: "32px", fontWeight: 700, marginTop: "8px", marginBottom: "20px" }}>Video Library Management</h2>
                  <p style={{ fontSize: "15px", color: "var(--text-muted)", lineHeight: 1.8, marginBottom: "24px" }}>
                    Admins can manage and curate the database directly from the control panel. Build customized video collections, sync channels, and configure transcription schemas.
                  </p>

                  <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "12px", color: "#fff" }}>Supported Ingestion Options</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "32px" }}>
                    <div style={{ padding: "20px", borderRadius: "12px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                      <div style={{ fontSize: "24px", marginBottom: "10px" }}>🎥</div>
                      <h4 style={{ fontSize: "15px", fontWeight: 600, color: "#fff", marginBottom: "6px" }}>YouTube Single URLs</h4>
                      <p style={{ fontSize: "12.5px", color: "var(--text-muted)", lineHeight: 1.5 }}>
                        Paste any YouTube link. The system extracts transcripts and indexes the audio segments immediately.
                      </p>
                    </div>
                    <div style={{ padding: "20px", borderRadius: "12px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                      <div style={{ fontSize: "24px", marginBottom: "10px" }}>📜</div>
                      <h4 style={{ fontSize: "15px", fontWeight: 600, color: "#fff", marginBottom: "6px" }}>YouTube Playlists</h4>
                      <p style={{ fontSize: "12.5px", color: "var(--text-muted)", lineHeight: 1.5 }}>
                        Submit a playlist URL to parse and bulk-index every video in that collection at once.
                      </p>
                    </div>
                    <div style={{ padding: "20px", borderRadius: "12px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                      <div style={{ fontSize: "24px", marginBottom: "10px" }}>📂</div>
                      <h4 style={{ fontSize: "15px", fontWeight: 600, color: "#fff", marginBottom: "6px" }}>CSV / JSON Upload</h4>
                      <p style={{ fontSize: "12.5px", color: "var(--text-muted)", lineHeight: 1.5 }}>
                        Import custom lists containing titles, video IDs, tags, or manual transcript lines.
                      </p>
                    </div>
                  </div>

                  <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "12px", color: "#fff" }}>Database Recalibration</h3>
                  <p style={{ fontSize: "14px", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "20px" }}>
                    If you change your embedding models (e.g. upgrading to a higher dimensional OpenAI model) or modify chunking sizes, click on the **Embeddings** tab in the admin panel and select **Rebuild Embeddings** to regenerate index vectors.
                  </p>
                </div>
              )}

              {activeDocTab === "api" && (
                <div className="fade-in">
                  <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Developer Reference</span>
                  <h2 style={{ fontSize: "32px", fontWeight: 700, marginTop: "8px", marginBottom: "20px" }}>REST API Documentation</h2>
                  <p style={{ fontSize: "15px", color: "var(--text-muted)", lineHeight: 1.8, marginBottom: "24px" }}>
                    Integrate AI Query Tube search and library tools directly into your own software using our secure and lightning-fast developer API endpoints.
                  </p>

                  <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "12px", color: "#fff" }}>Endpoint Summary</h3>
                  <div style={{ overflowX: "auto" }}>
                    <table className="custom-table" style={{ marginBottom: "32px" }}>
                      <thead>
                        <tr>
                          <th>Method</th>
                          <th>Path</th>
                          <th>Description</th>
                          <th>Auth</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><span className="pill pill-green">POST</span></td>
                          <td className="mono-font" style={{ fontSize: "12.5px" }}>/login</td>
                          <td>Authenticate user & retrieve JWT access token</td>
                          <td>No</td>
                        </tr>
                        <tr>
                          <td><span className="pill pill-green">POST</span></td>
                          <td className="mono-font" style={{ fontSize: "12.5px" }}>/register</td>
                          <td>Create a new user account</td>
                          <td>No</td>
                        </tr>
                        <tr>
                          <td><span className="pill pill-green">POST</span></td>
                          <td className="mono-font" style={{ fontSize: "12.5px" }}>/search</td>
                          <td>Perform semantic similarity search over video vector database</td>
                          <td>Yes (JWT)</td>
                        </tr>
                        <tr>
                          <td><span className="pill pill-blue">GET</span></td>
                          <td className="mono-font" style={{ fontSize: "12.5px" }}>/me</td>
                          <td>Retrieve the active profile information</td>
                          <td>Yes (JWT)</td>
                        </tr>
                        <tr>
                          <td><span className="pill pill-blue">GET</span></td>
                          <td className="mono-font" style={{ fontSize: "12.5px" }}>/comments/{"{video_id}"}</td>
                          <td>Fetch community discussion/notes for a specific video</td>
                          <td>No</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* API Code Snippets */}
                  <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "16px", color: "#fff" }}>Interactive Integration Example</h3>
                  
                  <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
                    {["javascript", "python"].map(lang => (
                      <button
                        key={lang}
                        onClick={() => setSelectedCodeLang(lang)}
                        style={{
                          padding: "6px 14px",
                          borderRadius: "20px",
                          border: "1px solid var(--border)",
                          background: selectedCodeLang === lang ? "var(--primary)" : "rgba(255,255,255,0.02)",
                          color: "#fff",
                          fontSize: "12px",
                          fontWeight: 600,
                          cursor: "pointer",
                          textTransform: "capitalize"
                        }}
                      >
                        {lang === "javascript" ? "JavaScript (Fetch)" : "Python (Requests)"}
                      </button>
                    ))}
                  </div>

                  <div style={{
                    position: "relative",
                    background: "rgba(15, 23, 42, 0.6)",
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                    padding: "20px",
                    fontFamily: "monospace",
                    fontSize: "13px",
                    lineHeight: 1.6,
                    color: "#e2e8f0",
                    overflowX: "auto"
                  }}>
                    {selectedCodeLang === "javascript" ? (
                      <pre style={{ margin: 0 }}>
{`// 1. Semantic search query request
const executeSemanticSearch = async (userQuery, jwtToken) => {
  const response = await fetch("http://127.0.0.1:8000/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": \`Bearer \${jwtToken}\`
    },
    body: JSON.stringify({
      query: userQuery,
      top_k: 5,
      min_similarity: 0.4
    })
  });

  const results = await response.json();
  console.log("Found matches:", results);
};`}
                      </pre>
                    ) : (
                      <pre style={{ margin: 0 }}>
{`# 1. Semantic search query request
import requests

def execute_semantic_search(user_query, jwt_token):
    url = "http://127.0.0.1:8000/search"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {jwt_token}"
    }
    payload = {
        "query": user_query,
        "top_k": 5,
        "min_similarity": 0.4
    }
    
    response = requests.post(url, json=payload, headers=headers)
    results = response.json()
    print("Found matches:", results)`}
                      </pre>
                    )}
                  </div>
                </div>
              )}

              {activeDocTab === "faq" && (
                <div className="fade-in">
                  <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.08em" }}>FAQ</span>
                  <h2 style={{ fontSize: "32px", fontWeight: 700, marginTop: "8px", marginBottom: "20px" }}>Frequently Asked Questions</h2>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    {[
                      {
                        q: "How long does it take to index a new video?",
                        a: "Usually under a minute! The system grabs video metadata and subtitles directly. If audio needs high-precision manual speech-to-text, it could take up to a few minutes depending on server queues."
                      },
                      {
                        q: "What embedding model is used by default?",
                        a: "By default, we utilize state-of-the-art transformer models (like text-embedding-3-small or sentence-transformers). Admins can switch models dynamically in the Admin Settings panel."
                      },
                      {
                        q: "Is there a limit to how many videos I can search?",
                        a: "Free tier accounts can search and query up to 100 library videos, making up to 10,000 requests monthly. Admin accounts have no limits."
                      },
                      {
                        q: "Can I host this video intelligence system on my own server?",
                        a: "Absolutely! The backend is a standard FastAPI implementation using SQLite/PostgreSQL and ChromaDB. You can build the production docker image and self-host the stack seamlessly."
                      }
                    ].map((faq, idx) => (
                      <div key={idx} style={{ padding: "20px", borderRadius: "12px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                        <h4 style={{ fontSize: "15px", fontWeight: 600, color: "#fff", marginBottom: "8px", display: "flex", gap: "8px" }}>
                          <span style={{ color: "var(--primary)" }}>Q:</span> {faq.q}
                        </h4>
                        <p style={{ fontSize: "13.5px", color: "var(--text-muted)", lineHeight: 1.6 }}>{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          </div>
        )}

        {/* ── 2. LOGIN / REGISTER VIEW ── */}
        {currentView === "auth" && !loggedIn && (
          <div className="auth-container">
            {/* Left Side - Branding */}
            <div className="auth-left">
              <div style={{maxWidth: "300px"}}>
                <div style={{fontSize: "48px", marginBottom: "20px"}}><i className="ti ti-brain"></i></div>
                <h2>Welcome to AI Query Tube</h2>
                <p>Unlock the power of semantic search over your video library. Join thousands of users discovering insights instantly.</p>
                <div style={{marginTop: "40px", paddingTop: "40px", borderTop: "1px solid rgba(255,255,255,0.2)"}}>
                  <div style={{fontSize: "13px", marginBottom: "20px"}}>✓ 10,000 free queries per month</div>
                  <div style={{fontSize: "13px", marginBottom: "20px"}}>✓ Import up to 100 videos</div>
                  <div style={{fontSize: "13px"}}>✓ Full-featured search & analytics</div>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="auth-right">
              <div className="auth-form">
                <div className="toggle-form">
                  <button 
                    className={`toggle-btn ${authFormType === "login" ? "active" : ""}`} 
                    onClick={() => { setAuthFormType("login"); setAuthError(""); setAuthSuccess(""); }}
                  >
                    Sign In
                  </button>
                  <button 
                    className={`toggle-btn ${authFormType === "register" ? "active" : ""}`} 
                    onClick={() => { setAuthFormType("register"); setAuthError(""); setAuthSuccess(""); }}
                  >
                    Create Account
                  </button>
                </div>

                {/* LOGIN FORM */}
                {authFormType === "login" && (
                  <div className="form-content active">
                    <h3 className="form-title">Welcome back</h3>
                    <p className="form-subtitle">Sign in to your account to continue</p>
                    <div className={`error-msg ${authError ? "show" : ""}`}>{authError}</div>
                    <div className={`success-msg ${authSuccess ? "show" : ""}`}>{authSuccess}</div>
                    <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                      <div className="form-group">
                        <label>Username</label>
                        <input 
                          type="text" 
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder="Enter your username"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Password</label>
                        <div className="password-toggle">
                          <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                          />
                          <span className="toggle-icon" onClick={() => {
                            const input = document.querySelector('input[type="password"]');
                            if (input) input.type = input.type === "password" ? "text" : "password";
                          }}><i className="ti ti-eye"></i></span>
                        </div>
                      </div>
                      <div className="checkbox-group">
                        <input type="checkbox" id="remember-me" />
                        <label htmlFor="remember-me">Remember me</label>
                      </div>
                      <button type="submit" className="form-submit">Sign In</button>
                      <div className="form-link">
                        <span onClick={() => setShowPasswordReset(true)} style={{cursor: "pointer"}}>Forgot password?</span>
                      </div>
                    </form>
                  </div>
                )}

                {/* REGISTER FORM */}
                {authFormType === "register" && (
                  <div className="form-content active">
                    <h3 className="form-title">Create account</h3>
                    <p className="form-subtitle">Join AI Query Tube in 2 minutes</p>
                    <div className={`error-msg ${authError ? "show" : ""}`}>{authError}</div>
                    <div className={`success-msg ${authSuccess ? "show" : ""}`}>{authSuccess}</div>
                    <form onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>
                      <div className="form-row">
                        <div className="form-group">
                          <label>First name</label>
                          <input 
                            type="text" 
                            value={userForm.first_name}
                            onChange={(e) => setUserForm({...userForm, first_name: e.target.value})}
                            placeholder="John"
                          />
                        </div>
                        <div className="form-group">
                          <label>Last name</label>
                          <input 
                            type="text" 
                            value={userForm.last_name}
                            onChange={(e) => setUserForm({...userForm, last_name: e.target.value})}
                            placeholder="Doe"
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Username</label>
                        <input 
                          type="text" 
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder="johndoe"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Email address</label>
                        <input 
                          type="email" 
                          value={userForm.email}
                          onChange={(e) => setUserForm({...userForm, email: e.target.value})}
                          placeholder="john@example.com"
                        />
                      </div>
                      <div className="form-group">
                        <label>Mobile number</label>
                        <input 
                          type="tel" 
                          value={userForm.mob}
                          onChange={(e) => setUserForm({...userForm, mob: e.target.value})}
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                      <div className="form-group">
                        <label>Gender</label>
                        <select 
                          value={userForm.gender}
                          onChange={(e) => setUserForm({...userForm, gender: e.target.value})}
                        >
                          <option value="">Select gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Password</label>
                        <div className="password-toggle">
                          <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                          />
                          <span className="toggle-icon" onClick={() => {
                            const inputs = document.querySelectorAll('input[type="password"]');
                            inputs.forEach(input => input.type = input.type === "password" ? "text" : "password");
                          }}><i className="ti ti-eye"></i></span>
                        </div>
                        <div style={{fontSize: "11px", color: "var(--text-muted)", marginTop: "6px"}}>Min 6 characters</div>
                      </div>
                      <div className="checkbox-group">
                        <input type="checkbox" id="terms" required />
                        <label htmlFor="terms">I agree to Terms of Service and Privacy Policy</label>
                      </div>
                      <button type="submit" className="form-submit">Create Account</button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* PASSWORD RESET MODAL */}
        {showPasswordReset && (
          <div 
            className="modal-overlay show" 
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(15, 23, 42, 0.75)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              zIndex: 99999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px"
            }}
          >
            <div 
              style={{
                background: "rgba(30, 41, 59, 0.7)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "24px",
                padding: "36px",
                maxWidth: "460px",
                width: "100%",
                boxShadow: "0 24px 50px rgba(0, 0, 0, 0.4)",
                position: "relative",
                animation: "fadeIn 0.3s ease-out"
              }}
            >
              {/* Header Close button */}
              <button 
                className="modal-close" 
                onClick={() => {
                  setShowPasswordReset(false);
                  setResetUsername("");
                  setResetEmail("");
                  setResetNewPassword("");
                  setResetSuccess("");
                  setResetError("");
                }}
                style={{
                  position: "absolute",
                  top: "24px",
                  right: "24px",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "none",
                  borderRadius: "50%",
                  width: "36px",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "rgba(255, 255, 255, 0.6)",
                  fontSize: "18px",
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                  e.currentTarget.style.color = "rgba(255, 255, 255, 0.6)";
                }}
              >
                <i className="ti ti-x"></i>
              </button>

              {/* Security Icon */}
              <div 
                style={{ 
                  width: "48px", 
                  height: "48px", 
                  borderRadius: "12px", 
                  background: "linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(236, 72, 153, 0.2))", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  color: "#6366F1", 
                  fontSize: "24px", 
                  marginBottom: "20px" 
                }}
              >
                <i className="ti ti-shield-lock"></i>
              </div>

              <h3 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "8px", color: "#fff", letterSpacing: "-0.01em" }}>Reset password</h3>
              <p style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: "24px", lineHeight: "1.5", paddingRight: "30px" }}>
                Enter your registered username and email to securely set a new password.
              </p>
              
              {resetSuccess && (
                <div style={{ padding: "12px 16px", background: "rgba(16, 185, 129, 0.1)", border: "1px solid var(--success)", borderRadius: "12px", color: "var(--success)", fontSize: "13.5px", marginBottom: "18px" }}>
                  {resetSuccess}
                </div>
              )}
              {resetError && (
                <div style={{ padding: "12px 16px", background: "rgba(239, 68, 68, 0.1)", border: "1px solid var(--danger)", borderRadius: "12px", color: "var(--danger)", fontSize: "13.5px", marginBottom: "18px" }}>
                  {resetError}
                </div>
              )}

              <div className="form-group" style={{ marginBottom: "16px" }}>
                <label style={{ fontSize: "11px", fontWeight: "600", color: "rgba(255, 255, 255, 0.5)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "6px", display: "block" }}>Username</label>
                <input 
                  type="text" 
                  value={resetUsername}
                  onChange={(e) => setResetUsername(e.target.value)}
                  placeholder="e.g. johndoe"
                  style={{ 
                    width: "100%", 
                    padding: "12px 16px", 
                    borderRadius: "12px", 
                    border: "1px solid rgba(255,255,255,0.08)", 
                    background: "rgba(15,23,42,0.4)", 
                    color: "#fff",
                    fontSize: "14px",
                    outline: "none"
                  }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: "16px" }}>
                <label style={{ fontSize: "11px", fontWeight: "600", color: "rgba(255, 255, 255, 0.5)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "6px", display: "block" }}>Registered Email Address</label>
                <input 
                  type="email" 
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="name@example.com"
                  style={{ 
                    width: "100%", 
                    padding: "12px 16px", 
                    borderRadius: "12px", 
                    border: "1px solid rgba(255,255,255,0.08)", 
                    background: "rgba(15,23,42,0.4)", 
                    color: "#fff",
                    fontSize: "14px",
                    outline: "none"
                  }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: "24px" }}>
                <label style={{ fontSize: "11px", fontWeight: "600", color: "rgba(255, 255, 255, 0.5)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "6px", display: "block" }}>New Password</label>
                <input 
                  type="password" 
                  value={resetNewPassword}
                  onChange={(e) => setResetNewPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{ 
                    width: "100%", 
                    padding: "12px 16px", 
                    borderRadius: "12px", 
                    border: "1px solid rgba(255,255,255,0.08)", 
                    background: "rgba(15,23,42,0.4)", 
                    color: "#fff",
                    fontSize: "14px",
                    outline: "none"
                  }}
                />
              </div>

              <button 
                className="form-submit" 
                onClick={handleResetPassword}
                disabled={resetLoading}
                style={{ 
                  width: "100%", 
                  padding: "14px", 
                  borderRadius: "12px", 
                  border: "none", 
                  background: "linear-gradient(135deg, var(--primary), var(--accent))", 
                  color: "#ffffff", 
                  fontWeight: "700", 
                  fontSize: "15px",
                  letterSpacing: "0.02em",
                  cursor: resetLoading ? "not-allowed" : "pointer", 
                  transition: "all 0.2s",
                  boxShadow: "0 8px 24px rgba(99, 102, 241, 0.25)"
                }}
              >
                {resetLoading ? "Updating..." : "Reset Password"}
              </button>
              
              <div style={{ marginTop: "20px", textAlign: "center" }}>
                <span 
                  onClick={() => {
                    setShowPasswordReset(false);
                    setResetUsername("");
                    setResetEmail("");
                    setResetNewPassword("");
                    setResetSuccess("");
                    setResetError("");
                  }} 
                  style={{ cursor: "pointer", color: "var(--primary)", fontSize: "13.5px", fontWeight: "600" }}
                >
                  Back to login
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ── LOGGED IN VIEWS ── */}
        {loggedIn && (
          <>
            {/* User Dashboard */}
            {role !== "admin" && currentView === "search" && (
              <UserDashboard token={token} handleLogout={handleLogout} />
            )}

            {/* Admin Dashboard */}
            {role === "admin" && currentView === "admin" && (
              <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "24px 20px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "24px", marginTop: "32px" }}>
                <aside style={{ backgroundColor: "#ffffff", borderRadius: "24px", boxShadow: "0 18px 50px rgba(15,23,42,0.08)", padding: "28px 24px", height: "fit-content" }}>
                  <div style={{ marginBottom: "32px" }}>
                    <div style={{ width: "44px", height: "44px", borderRadius: "14px", backgroundColor: "#1d9e75", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff", fontWeight: 700, fontSize: "18px" }}>AI</div>
                    <h3 style={{ margin: "20px 0 8px 0", fontSize: "20px", fontWeight: 700, color: "#0f172a" }}>AI QueryTube</h3>
                    <p style={{ margin: 0, color: "#64748b", fontSize: "14px", lineHeight: 1.6 }}>Admin dashboard for dataset management, imports, and analytics.</p>
                    {adminProfile && (
                      <div style={{ marginTop: "18px", padding: "18px", backgroundColor: "#f8fafc", borderRadius: "18px", border: "1px solid #e2e8f0" }}>
                        <p style={{ margin: 0, color: "#0f172a", fontWeight: 700, fontSize: "14px" }}>{adminProfile.full_name || adminProfile.username}</p>
                        <p style={{ margin: "8px 0 0 0", color: "#64748b", fontSize: "13px" }}>{adminProfile.email || "Admin account"}</p>
                        <p style={{ margin: "10px 0 0 0", color: "#0f172a", fontSize: "12px" }}>Role: {adminProfile.role || "admin"}</p>
                      </div>
                    )}
                  </div>

                  <div style={{ display: "grid", gap: "10px" }}>
                    {["Dashboard", "Analytics", "All Videos", "Users", "Import", "Feedback", "Embeddings", "Export", "Settings"].map((item) => (
                      <button
                        key={item}
                        onClick={() => setAdminNav(item)}
                        style={{
                          width: "100%",
                          textAlign: "left",
                          padding: "14px 18px",
                          borderRadius: "14px",
                          border: adminNav === item ? "1px solid #1d9e75" : "1px solid transparent",
                          backgroundColor: adminNav === item ? "#ecfdf5" : "transparent",
                          color: adminNav === item ? "#0f172a" : "#475569",
                          fontWeight: adminNav === item ? 700 : 500,
                          cursor: "pointer",
                          transition: "all 0.2s ease"
                        }}
                      >
                        {item}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handleLogout}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "14px 18px",
                      borderRadius: "14px",
                      border: "1px solid transparent",
                      backgroundColor: "transparent",
                      color: "#ef4444",
                      fontWeight: 700,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      marginTop: "24px",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px"
                    }}
                  >
                    <i className="ti ti-logout" style={{ fontSize: "18px" }}></i>
                    Log Out
                  </button>
                </aside>

                <section style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  <div style={{ backgroundColor: "#ffffff", borderRadius: "24px", padding: "28px 32px", boxShadow: "0 18px 50px rgba(15,23,42,0.08)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
                      <div>
                        <p style={{ margin: 0, color: "#1d9e75", fontWeight: 700, letterSpacing: "0.08em", fontSize: "12px" }}>ADMIN DASHBOARD</p>
                        <h2 style={{ margin: "10px 0 0 0", fontSize: "32px", fontWeight: 700, color: "#0f172a" }}>Control center</h2>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px" }}>
                        <span style={{ fontSize: "14px", color: "#334155", fontWeight: 600 }}>{adminProfile?.full_name || adminProfile?.username || "Administrator"}</span>
                        <span style={{ fontSize: "13px", color: "#64748b" }}>{adminProfile?.email || "admin@querytube.local"}</span>
                      </div>
                    </div>
                    {adminMessage && (
                      <div style={{ marginTop: "20px", padding: "18px 22px", borderRadius: "18px", backgroundColor: adminMessage.startsWith("✅") ? "#ecfdf5" : "#fef2f2", border: `1px solid ${adminMessage.startsWith("✅") ? "#bbf7d0" : "#fecaca"}`, color: adminMessage.startsWith("✅") ? "#166534" : "#b91c1c" }}>
                        {adminMessage}
                      </div>
                    )}
                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: adminMessage ? "18px" : "0" }}>
                        <button onClick={handleExportData} disabled={adminActionLoading} style={{ border: "1px solid #1d9e75", background: "transparent", color: "#1d9e75", padding: "12px 18px", borderRadius: "14px", cursor: "pointer", fontWeight: 700 }}>Export</button>
                        <button onClick={handleRebuildEmbeddings} disabled={adminActionLoading} style={{ border: "none", background: "#1d9e75", color: "#ffffff", padding: "12px 18px", borderRadius: "14px", cursor: "pointer", fontWeight: 700 }}>{adminActionLoading ? "Working..." : "Rebuild"}</button>
                        <button onClick={handleScheduleImport} style={{ border: "1px solid #1d9e75", background: "transparent", color: "#1d9e75", padding: "12px 18px", borderRadius: "14px", cursor: "pointer", fontWeight: 700 }}>Import</button>
                      </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px,1fr))", gap: "18px", marginTop: "28px" }}>
                      {[
                        { label: "Total Videos", value: adminStats?.dataset?.total_videos ?? "—", accent: "#1d9e75" },
                        { label: "Embeddings", value: adminStats?.database?.embedding_count ?? "—", accent: "#0fbcf9" },
                        { label: "Total Searches", value: adminAnalytics?.total_searches ?? "—", accent: "#f97316" },
                        { label: "Avg Latency", value: adminAnalytics?.response_time ?? "N/A", accent: "#facc15" },
                        { label: "Avg Rating", value: adminAnalytics?.average_rating != null ? adminAnalytics.average_rating.toFixed(1) : "—", accent: "#fb7185" },
                      ].map((card) => (
                        <div key={card.label} style={{ padding: "24px", borderRadius: "20px", border: "1px solid #e5e7eb", backgroundColor: "#f8fafc" }}>
                          <p style={{ margin: 0, color: card.accent, fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>{card.label}</p>
                          <p style={{ margin: "14px 0 0 0", fontSize: "32px", fontWeight: 700, color: "#0f172a" }}>{card.value}</p>
                          <p style={{ margin: "10px 0 0 0", color: "#64748b", fontSize: "13px" }}>Updated just now</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: adminNav === 'Dashboard' || adminNav === 'Import' ? "grid" : "none", gridTemplateColumns: "1.8fr 1fr", gap: "24px" }}>
                    <div style={{ backgroundColor: "#ffffff", borderRadius: "24px", padding: "28px", boxShadow: "0 18px 50px rgba(15,23,42,0.08)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: "16px", alignItems: "center", marginBottom: "24px", flexWrap: "wrap" }}>
                        <div>
                          <p style={{ margin: 0, color: "#0f172a", fontWeight: 700, fontSize: "13px", letterSpacing: "0.08em" }}>IMPORT CONTENT</p>
                          <h3 style={{ margin: "10px 0 0 0", fontSize: "22px", fontWeight: 700, color: "#0f172a" }}>Import & embed content</h3>
                        </div>
                        <span style={{ color: "#64748b", fontSize: "14px" }}>Active tab: {importTab}</span>
                      </div>

                      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "24px" }}>
                        {["YouTube URL", "Playlist", "CSV/JSON", "Bulk URL", "Channel Sync"].map((tab) => (
                          <button
                            key={tab}
                            onClick={() => setImportTab(tab)}
                            style={{
                              padding: "12px 18px",
                              borderRadius: "14px",
                              border: importTab === tab ? "1px solid #1d9e75" : "1px solid #e5e7eb",
                              backgroundColor: importTab === tab ? "#ecfdf5" : "#ffffff",
                              color: importTab === tab ? "#0f172a" : "#64748b",
                              cursor: "pointer",
                              fontWeight: importTab === tab ? 700 : 500,
                              transition: "all 0.15s ease"
                            }}
                          >
                            {tab}
                          </button>
                        ))}
                      </div>

                      <div style={{ display: "grid", gap: "18px" }}>
                        {importTab === "YouTube URL" && (
                          <input
                            type="text"
                            value={importUrl}
                            onChange={(e) => setImportUrl(e.target.value)}
                            placeholder="Paste YouTube video URL"
                            style={{ width: "100%", padding: "18px 20px", borderRadius: "18px", border: "1px solid #e5e7eb", fontSize: "15px" }}
                          />
                        )}
                        {importTab === "Playlist" && (
                          <input
                            type="text"
                            value={playlistUrl}
                            onChange={(e) => setPlaylistUrl(e.target.value)}
                            placeholder="Paste playlist URL"
                            style={{ width: "100%", padding: "18px 20px", borderRadius: "18px", border: "1px solid #e5e7eb", fontSize: "15px" }}
                          />
                        )}
                        {importTab === "CSV/JSON" && (
                          <textarea
                            value={csvJsonInput}
                            onChange={(e) => setCsvJsonInput(e.target.value)}
                            rows={4}
                            placeholder="Paste CSV / JSON payload or URL"
                            style={{ width: "100%", padding: "18px 20px", borderRadius: "18px", border: "1px solid #e5e7eb", fontSize: "15px", resize: "vertical" }}
                          />
                        )}
                        {importTab === "Bulk URL" && (
                          <textarea
                            value={bulkUrls}
                            onChange={(e) => setBulkUrls(e.target.value)}
                            rows={4}
                            placeholder="Paste one video URL per line"
                            style={{ width: "100%", padding: "18px 20px", borderRadius: "18px", border: "1px solid #e5e7eb", fontSize: "15px", resize: "vertical" }}
                          />
                        )}
                        {importTab === "Channel Sync" && (
                          <input
                            type="text"
                            value={channelSync}
                            onChange={(e) => setChannelSync(e.target.value)}
                            placeholder="Paste channel URL or channel ID"
                            style={{ width: "100%", padding: "18px 20px", borderRadius: "18px", border: "1px solid #e5e7eb", fontSize: "15px" }}
                          />
                        )}

                        <button
                          onClick={handleImportAndEmbed}
                          disabled={importLoading}
                          style={{ width: "fit-content", padding: "14px 24px", borderRadius: "16px", border: "none", backgroundColor: "#1d9e75", color: "#ffffff", fontWeight: 700, cursor: importLoading ? "not-allowed" : "pointer", transition: "all 0.2s ease" }}
                        >
                          {importLoading ? `Importing ${importTab}...` : "Import & Embed"}
                        </button>

                        {importLoading && (
                          <div style={{ marginTop: "10px" }}>
                            <div style={{ height: "10px", width: "100%", backgroundColor: "#e5e7eb", borderRadius: "999px", overflow: "hidden" }}>
                              <div style={{ width: `${importProgress}%`, height: "100%", backgroundColor: "#1d9e75", transition: "width 0.2s ease" }} />
                            </div>
                            <p style={{ margin: "10px 0 0 0", fontSize: "13px", color: "#64748b" }}>{importProgress}% complete</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div style={{ marginTop: "28px" }}>
                      <h4 style={{ margin: 0, fontSize: "18px", fontWeight: 700, color: "#0f172a" }}>Overview</h4>
                      <p style={{ margin: "12px 0 0 0", color: "#64748b", fontSize: "14px", lineHeight: 1.7 }}>Use the import panel to add new video content to your semantic index. Choose the source, paste the content, and let the AI QueryTube engine embed transcripts automatically.</p>
                    </div>
                  </div>

                  <div style={{ display: adminNav === 'Dashboard' ? "grid" : "none", gap: "24px" }}>
                    <div style={{ backgroundColor: "#ffffff", borderRadius: "24px", padding: "28px", boxShadow: "0 18px 50px rgba(15,23,42,0.08)" }}>
                      <h3 style={{ margin: "0 0 20px 0", fontSize: "20px", fontWeight: 700, color: "#0f172a" }}>Quick Actions</h3>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: "16px" }}>
                        <button onClick={handleRebuildEmbeddings} disabled={adminActionLoading} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between", minHeight: "120px", padding: "20px", borderRadius: "20px", border: "1px solid #e5e7eb", backgroundColor: "#f8fafc", cursor: adminActionLoading ? "not-allowed" : "pointer" }}>
                          <span style={{ color: "#0f172a", fontSize: "16px", fontWeight: 700 }}>Rebuild embeddings</span>
                          <span style={{ color: "#64748b", fontSize: "13px" }}>Re-index all videos</span>
                        </button>
                        <button onClick={handleExportData} disabled={adminActionLoading} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between", minHeight: "120px", padding: "20px", borderRadius: "20px", border: "1px solid #e5e7eb", backgroundColor: "#f8fafc", cursor: adminActionLoading ? "not-allowed" : "pointer" }}>
                          <span style={{ color: "#0f172a", fontSize: "16px", fontWeight: 700 }}>Export data</span>
                          <span style={{ color: "#64748b", fontSize: "13px" }}>JSON / CSV format</span>
                        </button>
                        <button onClick={handleScheduleImport} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between", minHeight: "120px", padding: "20px", borderRadius: "20px", border: "1px solid #e5e7eb", backgroundColor: "#f8fafc", cursor: "pointer" }}>
                          <span style={{ color: "#0f172a", fontSize: "16px", fontWeight: 700 }}>Schedule import</span>
                          <span style={{ color: "#64748b", fontSize: "13px" }}>Auto-sync channels</span>
                        </button>
                        <button onClick={handleClearDatabase} disabled={adminActionLoading} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between", minHeight: "120px", padding: "20px", borderRadius: "20px", border: "1px solid #e5e7eb", backgroundColor: "#f8fafc", cursor: adminActionLoading ? "not-allowed" : "pointer" }}>
                          <span style={{ color: "#0f172a", fontSize: "16px", fontWeight: 700 }}>Clear database</span>
                          <span style={{ color: "#64748b", fontSize: "13px" }}>Wipe all content</span>
                        </button>
                      </div>
                    </div>

                    <div style={{ backgroundColor: "#ffffff", borderRadius: "24px", padding: "28px", boxShadow: "0 18px 50px rgba(15,23,42,0.08)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
                        <div>
                          <h3 style={{ margin: 0, fontSize: "20px", fontWeight: 700, color: "#0f172a" }}>User Management</h3>
                          <p style={{ margin: "8px 0 0 0", color: "#64748b", fontSize: "14px" }}>Create users, manage account status, and remove outdated users.</p>
                        </div>
                        <button
                          onClick={handleGetUsers}
                          disabled={usersLoading}
                          style={{ padding: "12px 20px", borderRadius: "14px", border: "1px solid #1d9e75", backgroundColor: "transparent", color: "#1d9e75", cursor: usersLoading ? "not-allowed" : "pointer", fontWeight: 700 }}
                        >
                          {usersLoading ? "Refreshing…" : "Refresh users"}
                        </button>
                      </div>
                      <div style={{ display: "grid", gap: "18px" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))", gap: "16px" }}>
                          <input
                            type="text"
                            value={userForm.username}
                            onChange={(e) => setUserForm({ ...userForm, username: e.target.value })}
                            placeholder="Username"
                            style={{ width: "100%", padding: "16px 18px", borderRadius: "16px", border: "1px solid #e5e7eb", fontSize: "14px" }}
                          />
                          <input
                            type="password"
                            value={userForm.password}
                            onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
                            placeholder="Password"
                            style={{ width: "100%", padding: "16px 18px", borderRadius: "16px", border: "1px solid #e5e7eb", fontSize: "14px" }}
                          />
                          <input
                            type="text"
                            value={userForm.full_name}
                            onChange={(e) => setUserForm({ ...userForm, full_name: e.target.value })}
                            placeholder="Full name (optional)"
                            style={{ width: "100%", padding: "16px 18px", borderRadius: "16px", border: "1px solid #e5e7eb", fontSize: "14px" }}
                          />
                          <input
                            type="email"
                            value={userForm.email}
                            onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                            placeholder="Email (optional)"
                            style={{ width: "100%", padding: "16px 18px", borderRadius: "16px", border: "1px solid #e5e7eb", fontSize: "14px" }}
                          />
                        </div>
                        <button
                          onClick={handleCreateUser}
                          disabled={adminActionLoading}
                          style={{ width: "fit-content", padding: "14px 24px", borderRadius: "16px", border: "none", backgroundColor: "#1d9e75", color: "#ffffff", fontWeight: 700, cursor: adminActionLoading ? "not-allowed" : "pointer" }}
                        >
                          {adminActionLoading ? "Creating user…" : "Create new user"}
                        </button>
                        <div style={{ overflowX: "auto" }}>
                          <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                              <tr style={{ textAlign: "left", borderBottom: "1px solid #e5e7eb" }}>
                                {['Username', 'Role', 'Status', 'Actions'].map((heading) => (
                                  <th key={heading} style={{ padding: "14px 12px", color: "#475569", fontSize: "13px", fontWeight: 700 }}>{heading}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {adminUsers.length ? adminUsers.map((user) => (
                                <tr key={user.username} style={{ borderBottom: "1px solid #f1f5f9" }}>
                                  <td style={{ padding: "14px 12px", color: "#0f172a", fontWeight: 600 }}>{user.username}</td>
                                  <td style={{ padding: "14px 12px", color: "#64748b" }}>{user.role}</td>
                                  <td style={{ padding: "14px 12px" }}>
                                    <span style={{ display: "inline-flex", alignItems: "center", padding: "6px 12px", borderRadius: "999px", backgroundColor: user.disabled ? "#fee2e2" : "#ecfdf5", color: user.disabled ? "#991b1b" : "#166534", fontSize: "12px", fontWeight: 700 }}>
                                      {user.disabled ? 'Disabled' : 'Active'}
                                    </span>
                                  </td>
                                  <td style={{ padding: "14px 12px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
                                    {user.role !== 'admin' && (
                                      <button
                                        onClick={() => handleToggleUserStatus(user.username, user.disabled)}
                                        style={{ padding: "10px 14px", borderRadius: "12px", border: "1px solid #e5e7eb", backgroundColor: "#f8fafc", color: "#0f172a", cursor: "pointer", fontSize: "13px" }}
                                      >
                                        {user.disabled ? 'Enable' : 'Disable'}
                                      </button>
                                    )}
                                    {user.role !== 'admin' && (
                                      <button
                                        onClick={() => handleDeleteUser(user.username)}
                                        style={{ padding: "10px 14px", borderRadius: "12px", border: "1px solid #fecaca", backgroundColor: "#fef2f2", color: "#991b1b", cursor: "pointer", fontSize: "13px" }}
                                      >
                                        Delete
                                      </button>
                                    )}
                                  </td>
                                </tr>
                              )) : (
                                <tr>
                                  <td colSpan={4} style={{ padding: "20px 12px", color: "#64748b", textAlign: "center" }}>
                                    No users loaded yet. Click refresh to view current users.
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    <div style={{ backgroundColor: "#ffffff", borderRadius: "24px", padding: "28px", boxShadow: "0 18px 50px rgba(15,23,42,0.08)" }}>
                      <h3 style={{ margin: "0 0 20px 0", fontSize: "20px", fontWeight: 700, color: "#0f172a" }}>System Activity</h3>
                      <div style={{ display: "grid", gap: "18px" }}>
                        {systemActivity.map((item, index) => (
                          <div key={index} style={{ display: "flex", justifyContent: "space-between", gap: "12px", padding: "18px", borderRadius: "18px", backgroundColor: "#f8fafc", border: "1px solid #e5e7eb" }}>
                            <div>
                              <p style={{ margin: 0, fontSize: "15px", fontWeight: 700, color: "#0f172a" }}>{item.title}</p>
                              <p style={{ margin: "8px 0 0 0", fontSize: "13px", color: "#64748b" }}>{item.detail}</p>
                            </div>
                            <span style={{ color: "#94a3b8", fontSize: "13px", whiteSpace: "nowrap" }}>{item.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1.35fr 0.65fr", gap: "24px" }}>
                      <div style={{ backgroundColor: "#ffffff", borderRadius: "24px", padding: "28px", boxShadow: "0 18px 50px rgba(15,23,42,0.08)" }}>
                        <h3 style={{ margin: "0 0 20px 0", fontSize: "20px", fontWeight: 700, color: "#0f172a" }}>Recent Videos</h3>
                        <div style={{ display: "grid", gap: "14px" }}>
                          {(adminVideos.length ? adminVideos.slice(0, 5) : []).map((video) => (
                            <div key={video.id} style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "12px", padding: "18px", borderRadius: "18px", backgroundColor: "#f8fafc", border: "1px solid #e5e7eb" }}>
                              <div>
                                <p style={{ margin: 0, fontSize: "15px", fontWeight: 700, color: "#0f172a" }}>{video.title.length > 70 ? video.title.slice(0, 70) + "..." : video.title}</p>
                                <p style={{ margin: "8px 0 0 0", fontSize: "13px", color: "#64748b" }}>{video.channel_title || video.channel || "Unknown channel"}</p>
                              </div>
                              <span style={{ alignSelf: "center", padding: "8px 12px", borderRadius: "999px", backgroundColor: video.transcript_length ? "#d1fae5" : "#fef3c7", color: video.transcript_length ? "#166534" : "#92400e", fontSize: "12px", fontWeight: 700 }}>{video.transcript_length ? "Embedded" : "Processing"}</span>
                            </div>
                          ))}
                          {!adminVideos.length && (
                            <div style={{ padding: "20px", borderRadius: "18px", backgroundColor: "#f8fafc", border: "1px solid #e5e7eb", color: "#64748b" }}>
                              Load videos to view the recent uploaded list.
                            </div>
                          )}
                        </div>
                      </div>

                      <div style={{ backgroundColor: "#ffffff", borderRadius: "24px", padding: "28px", boxShadow: "0 18px 50px rgba(15,23,42,0.08)" }}>
                        <h3 style={{ margin: "0 0 20px 0", fontSize: "20px", fontWeight: 700, color: "#0f172a" }}>Recent Feedback</h3>
                        <div style={{ display: "grid", gap: "14px" }}>
                          {(adminFeedback.length ? adminFeedback.slice(0, 5) : []).map((item) => (
                            <div key={item.id} style={{ padding: "18px", borderRadius: "18px", backgroundColor: "#f8fafc", border: "1px solid #e5e7eb" }}>
                              <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", marginBottom: "10px" }}>
                                <p style={{ margin: 0, fontWeight: 700, color: "#0f172a" }}>{item.username}</p>
                                <span style={{ color: "#94a3b8", fontSize: "12px" }}>{new Date(item.created_at).toLocaleDateString()}</span>
                              </div>
                              <p style={{ margin: "0 0 10px 0", fontSize: "13px", color: "#64748b" }}>{"★".repeat(item.rating || 0)}{"☆".repeat(5 - (item.rating || 0))}</p>
                              <p style={{ margin: 0, color: "#374151", fontSize: "14px", lineHeight: 1.7 }}>{item.feedback}</p>
                            </div>
                          ))}
                          {!adminFeedback.length && (
                            <div style={{ padding: "20px", borderRadius: "18px", backgroundColor: "#f8fafc", border: "1px solid #e5e7eb", color: "#64748b" }}>
                              Load feedback to see recent user messages.
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: adminNav === 'Analytics' ? 'block' : 'none' }}>
                    <div style={{ backgroundColor: '#ffffff', borderRadius: '24px', padding: '28px', boxShadow: '0 18px 50px rgba(15,23,42,0.08)' }}>
                      <h3 style={{ margin: '0 0 20px 0', fontSize: '20px', fontWeight: 700, color: '#0f172a' }}>Analytics Dashboard</h3>
                      <div style={{ display: 'grid', gap: '18px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '18px' }}>
                          {[
                            { label: 'Total Searches', value: adminAnalytics?.total_searches ?? 0 },
                            { label: 'Average Latency', value: adminAnalytics?.response_time ?? 'N/A' },
                            { label: 'Average Rating', value: adminAnalytics?.average_rating != null ? adminAnalytics.average_rating.toFixed(1) : 'N/A' },
                            { label: 'Total Feedback', value: adminAnalytics?.total_feedback ?? 0 },
                          ].map((stat) => (
                            <div key={stat.label} style={{ padding: '22px', borderRadius: '20px', border: '1px solid #e5e7eb', backgroundColor: '#f8fafc' }}>
                              <p style={{ margin: 0, color: '#64748b', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{stat.label}</p>
                              <p style={{ margin: '12px 0 0 0', fontSize: '28px', fontWeight: 700, color: '#0f172a' }}>{stat.value}</p>
                            </div>
                          ))}
                        </div>
                        <div>
                          <h4 style={{ margin: '0 0 12px 0', fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>Top Queries</h4>
                          <div style={{ display: 'grid', gap: '12px' }}>
                            {(adminAnalytics?.top_queries || []).map((query, index) => (
                              <div key={index} style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', padding: '16px', borderRadius: '18px', backgroundColor: '#f8fafc', border: '1px solid #e5e7eb' }}>
                                <span style={{ color: '#0f172a', fontWeight: 600 }}>{query.query}</span>
                                <span style={{ color: '#64748b' }}>{query.count}</span>
                              </div>
                            ))}
                            {!adminAnalytics?.top_queries?.length && (
                              <div style={{ padding: '18px', borderRadius: '18px', backgroundColor: '#f8fafc', border: '1px solid #e5e7eb', color: '#64748b' }}>
                                No analytics data is available yet.
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: adminNav === 'All Videos' ? 'block' : 'none' }}>
                    <div style={{ backgroundColor: '#ffffff', borderRadius: '24px', padding: '28px', boxShadow: '0 18px 50px rgba(15,23,42,0.08)' }}>
                      <h3 style={{ margin: '0 0 20px 0', fontSize: '20px', fontWeight: 700, color: '#0f172a' }}>All Videos</h3>
                      <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                          <thead>
                            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                              {['Title', 'Channel', 'Status', 'Actions'].map((heading) => (
                                <th key={heading} style={{ padding: '14px 12px', textAlign: 'left', color: '#475569', fontSize: '13px' }}>{heading}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {(adminVideos.length ? adminVideos : []).map((video) => (
                              <tr key={video.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                <td style={{ padding: '14px 12px', color: '#0f172a', fontWeight: 600 }}>{video.title}</td>
                                <td style={{ padding: '14px 12px', color: '#64748b' }}>{video.channel_title || video.channel || 'Unknown'}</td>
                                <td style={{ padding: '14px 12px' }}><span style={{ padding: '6px 12px', borderRadius: '999px', backgroundColor: video.transcript_length ? '#ecfdf5' : '#fef3c7', color: video.transcript_length ? '#166534' : '#92400e', fontSize: '12px', fontWeight: 700 }}>{video.transcript_length ? 'Embedded' : 'Processing'}</span></td>
                                <td style={{ padding: '14px 12px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                  <button onClick={() => showToast('Open video details', 'ti-external-link')} style={{ padding: '10px 14px', borderRadius: '12px', border: '1px solid #e5e7eb', backgroundColor: '#f8fafc', color: '#0f172a', cursor: 'pointer', fontSize: '13px' }}>View</button>
                                  <button onClick={() => showToast('Delete video (admin)', 'ti-trash')} style={{ padding: '10px 14px', borderRadius: '12px', border: '1px solid #fecaca', backgroundColor: '#fef2f2', color: '#991b1b', cursor: 'pointer', fontSize: '13px' }}>Delete</button>
                                </td>
                              </tr>
                            ))}
                            {!adminVideos.length && (
                              <tr>
                                <td colSpan={4} style={{ padding: '20px 12px', color: '#64748b', textAlign: 'center' }}>No videos loaded yet.</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: adminNav === 'Feedback' ? 'block' : 'none' }}>
                    <div style={{ backgroundColor: '#ffffff', borderRadius: '24px', padding: '28px', boxShadow: '0 18px 50px rgba(15,23,42,0.08)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
                        <div>
                          <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: '#0f172a' }}>User Feedback</h3>
                          <p style={{ margin: '8px 0 0 0', color: '#64748b', fontSize: '14px' }}>Review recent feedback submitted by users.</p>
                        </div>
                        <button onClick={handleGetAdminFeedback} disabled={adminActionLoading} style={{ padding: '12px 20px', borderRadius: '14px', border: '1px solid #1d9e75', backgroundColor: 'transparent', color: '#1d9e75', cursor: adminActionLoading ? 'not-allowed' : 'pointer', fontWeight: 700 }}>{adminActionLoading ? 'Refreshing…' : 'Refresh feedback'}</button>
                      </div>
                      <div style={{ display: 'grid', gap: '18px' }}>
                        {adminFeedback.length > 0 ? adminFeedback.map((item) => (
                          <div key={item.id || `${item.username}-${item.created_at}`} style={{ padding: '20px', borderRadius: '18px', backgroundColor: '#f8fafc', border: '1px solid #e5e7eb' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                              <p style={{ margin: 0, fontWeight: 700, color: '#0f172a' }}>{item.username}</p>
                              <span style={{ color: '#94a3b8', fontSize: '12px', whiteSpace: 'nowrap' }}>{new Date(item.created_at).toLocaleString()}</span>
                            </div>
                            <p style={{ margin: '0 0 10px 0', fontSize: '13px', color: '#64748b' }}>{'★'.repeat(item.rating || 0)}{'☆'.repeat(5 - (item.rating || 0))}</p>
                            <p style={{ margin: 0, color: '#374151', fontSize: '14px', lineHeight: 1.7 }}>{item.feedback}</p>
                          </div>
                        )) : (
                          <div style={{ padding: '20px', borderRadius: '18px', backgroundColor: '#f8fafc', border: '1px solid #e5e7eb', color: '#64748b' }}>
                            No feedback found yet. Click refresh to load it.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: adminNav === 'Users' ? 'block' : 'none' }}>
                    <div style={{ backgroundColor: '#ffffff', borderRadius: '24px', padding: '28px', boxShadow: '0 18px 50px rgba(15,23,42,0.08)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
                        <div>
                          <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: '#0f172a' }}>User Management</h3>
                          <p style={{ margin: '8px 0 0 0', color: '#64748b', fontSize: '14px' }}>Create users, toggle account access, or remove users.</p>
                        </div>
                        <button onClick={handleGetUsers} disabled={usersLoading} style={{ padding: '12px 20px', borderRadius: '14px', border: '1px solid #1d9e75', backgroundColor: 'transparent', color: '#1d9e75', cursor: usersLoading ? 'not-allowed' : 'pointer', fontWeight: 700 }}>{usersLoading ? 'Refreshing…' : 'Refresh users'}</button>
                      </div>
                      <div style={{ display: 'grid', gap: '18px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: '16px' }}>
                          <input type='text' value={userForm.username} onChange={(e) => setUserForm({ ...userForm, username: e.target.value })} placeholder='Username' style={{ width: '100%', padding: '16px 18px', borderRadius: '16px', border: '1px solid #e5e7eb', fontSize: '14px' }} />
                          <input type='password' value={userForm.password} onChange={(e) => setUserForm({ ...userForm, password: e.target.value })} placeholder='Password' style={{ width: '100%', padding: '16px 18px', borderRadius: '16px', border: '1px solid #e5e7eb', fontSize: '14px' }} />
                          <input type='text' value={userForm.full_name} onChange={(e) => setUserForm({ ...userForm, full_name: e.target.value })} placeholder='Full name (optional)' style={{ width: '100%', padding: '16px 18px', borderRadius: '16px', border: '1px solid #e5e7eb', fontSize: '14px' }} />
                          <input type='email' value={userForm.email} onChange={(e) => setUserForm({ ...userForm, email: e.target.value })} placeholder='Email (optional)' style={{ width: '100%', padding: '16px 18px', borderRadius: '16px', border: '1px solid #e5e7eb', fontSize: '14px' }} />
                        </div>
                        <button onClick={handleCreateUser} disabled={adminActionLoading} style={{ width: 'fit-content', padding: '14px 24px', borderRadius: '16px', border: 'none', backgroundColor: '#1d9e75', color: '#ffffff', fontWeight: 700, cursor: adminActionLoading ? 'not-allowed' : 'pointer' }}>{adminActionLoading ? 'Creating user…' : 'Create new user'}</button>
                        <div style={{ overflowX: 'auto' }}>
                          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                                {['Username', 'Role', 'Status', 'Actions'].map((heading) => (
                                  <th key={heading} style={{ padding: '14px 12px', textAlign: 'left', color: '#475569', fontSize: '13px' }}>{heading}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {(adminUsers.length ? adminUsers : []).map((user) => (
                                <tr key={user.username} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                  <td style={{ padding: '14px 12px', color: '#0f172a', fontWeight: 600 }}>{user.username}</td>
                                  <td style={{ padding: '14px 12px', color: '#64748b' }}>{user.role}</td>
                                  <td style={{ padding: '14px 12px' }}><span style={{ display: 'inline-flex', alignItems: 'center', padding: '6px 12px', borderRadius: '999px', backgroundColor: user.disabled ? '#fee2e2' : '#ecfdf5', color: user.disabled ? '#991b1b' : '#166534', fontSize: '12px', fontWeight: 700 }}>{user.disabled ? 'Disabled' : 'Active'}</span></td>
                                  <td style={{ padding: '14px 12px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                    {user.role !== 'admin' && <button onClick={() => handleToggleUserStatus(user.username, user.disabled)} style={{ padding: '10px 14px', borderRadius: '12px', border: '1px solid #e5e7eb', backgroundColor: '#f8fafc', color: '#0f172a', cursor: 'pointer', fontSize: '13px' }}>{user.disabled ? 'Enable' : 'Disable'}</button>}
                                    {user.role !== 'admin' && <button onClick={() => handleDeleteUser(user.username)} style={{ padding: '10px 14px', borderRadius: '12px', border: '1px solid #fecaca', backgroundColor: '#fef2f2', color: '#991b1b', cursor: 'pointer', fontSize: '13px' }}>Delete</button>}
                                  </td>
                                </tr>
                              ))}
                              {!adminUsers.length && (
                                <tr>
                                  <td colSpan={4} style={{ padding: '20px 12px', color: '#64748b', textAlign: 'center' }}>No users loaded yet.</td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: adminNav === 'Embeddings' ? 'block' : 'none' }}>
                    <div style={{ backgroundColor: '#ffffff', borderRadius: '24px', padding: '28px', boxShadow: '0 18px 50px rgba(15,23,42,0.08)' }}>
                      <h3 style={{ margin: '0 0 20px 0', fontSize: '20px', fontWeight: 700, color: '#0f172a' }}>Embeddings</h3>
                      <div style={{ display: 'grid', gap: '18px' }}>
                        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                          <button onClick={handleRebuildEmbeddings} disabled={adminActionLoading} style={{ padding: '16px 24px', borderRadius: '16px', border: 'none', backgroundColor: '#1d9e75', color: '#ffffff', fontWeight: 700, cursor: adminActionLoading ? 'not-allowed' : 'pointer' }}>Rebuild Embeddings</button>
                          <button onClick={handleClearDatabase} disabled={adminActionLoading} style={{ padding: '16px 24px', borderRadius: '16px', border: '1px solid #fecaca', backgroundColor: '#fef2f2', color: '#991b1b', fontWeight: 700, cursor: adminActionLoading ? 'not-allowed' : 'pointer' }}>Clear Database</button>
                        </div>
                        <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>Regenerate embeddings after model or chunking changes, or clear data completely.</p>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: adminNav === 'Export' ? 'block' : 'none' }}>
                    <div style={{ backgroundColor: '#ffffff', borderRadius: '24px', padding: '28px', boxShadow: '0 18px 50px rgba(15,23,42,0.08)' }}>
                      <h3 style={{ margin: '0 0 20px 0', fontSize: '20px', fontWeight: 700, color: '#0f172a' }}>Export Data</h3>
                      <div style={{ display: 'grid', gap: '18px' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                          {['JSON', 'CSV', 'SQLite'].map((format) => (
                            <button key={format} style={{ padding: '14px 20px', borderRadius: '14px', border: '1px solid #e5e7eb', backgroundColor: '#f8fafc', color: '#0f172a', cursor: 'pointer', fontWeight: 700 }}>{format}</button>
                          ))}
                        </div>
                        <button onClick={handleExportData} disabled={adminActionLoading} style={{ padding: '16px 24px', borderRadius: '16px', border: 'none', backgroundColor: '#1d9e75', color: '#ffffff', fontWeight: 700, cursor: adminActionLoading ? 'not-allowed' : 'pointer' }}>Download Export</button>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: adminNav === 'Settings' ? 'block' : 'none' }}>
                    <div style={{ backgroundColor: '#ffffff', borderRadius: '24px', padding: '28px', boxShadow: '0 18px 50px rgba(15,23,42,0.08)' }}>
                      <h3 style={{ margin: '0 0 20px 0', fontSize: '20px', fontWeight: 700, color: '#0f172a' }}>Settings</h3>
                      <div style={{ display: 'grid', gap: '18px' }}>
                        <div style={{ display: 'grid', gap: '12px' }}>
                          <label style={{ color: '#475569', fontSize: '14px', fontWeight: 600 }}>Project Name</label>
                          <input type='text' value='AI Query Tube' readOnly style={{ width: '100%', padding: '16px 18px', borderRadius: '16px', border: '1px solid #e5e7eb', fontSize: '14px', backgroundColor: '#f8fafc' }} />
                        </div>
                        <div style={{ display: 'grid', gap: '12px' }}>
                          <label style={{ color: '#475569', fontSize: '14px', fontWeight: 600 }}>Embedding Model</label>
                          <select style={{ width: '100%', padding: '16px 18px', borderRadius: '16px', border: '1px solid #e5e7eb', fontSize: '14px' }}>
                            <option>text-embedding-3-small</option>
                            <option>text-embedding-3-large</option>
                            <option>text-embedding-ada-002</option>
                          </select>
                        </div>
                        <div style={{ display: 'grid', gap: '12px' }}>
                          <label style={{ color: '#475569', fontSize: '14px', fontWeight: 600 }}>Chunk Size (tokens)</label>
                          <input type='number' value='500' readOnly style={{ width: '100%', padding: '16px 18px', borderRadius: '16px', border: '1px solid #e5e7eb', fontSize: '14px', backgroundColor: '#f8fafc' }} />
                        </div>
                        <button onClick={() => showToast('Settings saved', 'ti-check')} style={{ padding: '16px 24px', borderRadius: '16px', border: 'none', backgroundColor: '#1d9e75', color: '#ffffff', fontWeight: 700, cursor: 'pointer' }}>Save Settings</button>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          )}
        </>
      )}
      </main>
    </div>
  );
}

export default App;
