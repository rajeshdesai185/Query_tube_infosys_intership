import React, { useEffect, useState, useCallback } from 'react';

const customStyles = `
/* Premium user dashboard specific styling */
.dashboard-container {
  display: flex;
  min-height: calc(100vh - 88px);
  color: var(--text);
  font-family: 'Plus Jakarta Sans', sans-serif;
  background-color: var(--bg);
}

.dashboard-sidebar {
  width: 260px;
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: sticky;
  top: 88px;
  height: calc(100vh - 88px);
  z-index: 10;
  transition: all 0.3s ease;
}

.sidebar-menu {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.sidebar-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--text-muted);
  letter-spacing: 0.1em;
  padding: 12px 16px 6px;
}

.sidebar-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 12px;
  color: var(--text-muted);
  background: transparent;
  border: none;
  font-family: inherit;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  text-align: left;
}

.sidebar-btn:hover {
  color: var(--text);
  background: rgba(255, 255, 255, 0.03);
  transform: translateX(4px);
}

.sidebar-btn.active {
  color: #ffffff;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(236, 72, 153, 0.1));
  border: 1px solid rgba(99, 102, 241, 0.2);
  font-weight: 600;
  box-shadow: 0 4px 20px rgba(99, 102, 241, 0.1);
}

.sidebar-btn .ti {
  font-size: 18px;
}

.dashboard-content {
  flex: 1;
  padding: 32px 40px;
  overflow-y: auto;
  min-width: 0;
}

.welcome-header {
  margin-bottom: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.welcome-title {
  font-size: 32px;
  font-weight: 700;
  background: linear-gradient(135deg, #ffffff, #94a3b8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 6px;
}

.welcome-subtitle {
  color: var(--text-muted);
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.glow-card {
  background: rgba(30, 41, 59, 0.55);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 20px;
  padding: 24px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.glow-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, var(--primary), var(--accent));
  opacity: 0.8;
}

.glow-card-hover:hover {
  transform: translateY(-4px);
  border-color: rgba(255, 255, 255, 0.12);
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 30px rgba(99, 102, 241, 0.05);
}

.metric-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
}

.metric-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 120px;
}

.metric-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.metric-value {
  font-size: 36px;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.02em;
  line-height: 1;
}

.metric-meta {
  font-size: 12px;
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.quota-bar-container {
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 99px;
  margin-top: 12px;
  overflow: hidden;
}

.quota-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary), var(--accent));
  border-radius: 99px;
  transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.overview-layout {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: 24px;
  margin-bottom: 32px;
}

.dashboard-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding-bottom: 12px;
}

.dashboard-sec-title {
  font-size: 18px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
}

.recent-searches-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.recent-search-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 18px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.recent-search-item:hover {
  background: rgba(99, 102, 241, 0.05);
  border-color: rgba(99, 102, 241, 0.2);
  transform: translateX(2px);
}

.search-text {
  font-size: 14px;
  font-weight: 500;
  color: var(--text);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 70%;
}

.search-time {
  font-size: 12px;
  color: var(--text-muted);
}

.search-glow-input {
  position: relative;
  margin-bottom: 24px;
}

.search-glow-input input {
  width: 100%;
  padding: 16px 20px 16px 52px;
  background: rgba(15, 23, 42, 0.6);
  border: 1.5px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  color: #fff;
  font-size: 16px;
  font-family: inherit;
  outline: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
}

.search-glow-input input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15), 0 8px 30px rgba(99, 102, 241, 0.1);
  background: rgba(15, 23, 42, 0.85);
}

.search-glow-input .ti-search {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
  color: var(--text-muted);
  transition: color 0.3s;
}

.search-glow-input input:focus + .ti-search {
  color: var(--primary);
}

.video-detail-grid {
  display: grid;
  grid-template-columns: 1.8fr 1fr;
  gap: 28px;
  align-items: start;
}

.comments-panel {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: 480px;
  overflow-y: auto;
  padding-right: 8px;
}

.comment-card {
  padding: 14px 16px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 12px;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
  font-size: 12px;
}

.comment-author {
  font-weight: 600;
  color: var(--primary);
}

.comment-date {
  color: var(--text-muted);
}

.comment-body {
  font-size: 13.5px;
  line-height: 1.5;
  color: #e2e8f0;
}

.badge-indexed {
  padding: 4px 8px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  background: rgba(16, 185, 129, 0.1);
  border: 1.5px solid rgba(16, 185, 129, 0.3);
  color: var(--success);
}

.badge-processing {
  padding: 4px 8px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  background: rgba(245, 158, 11, 0.1);
  border: 1.5px solid rgba(245, 158, 11, 0.3);
  color: var(--warning);
}

.rating-star-btn {
  background: transparent;
  border: none;
  font-size: 26px;
  cursor: pointer;
  padding: 0 4px;
  transition: transform 0.15s ease;
}

.rating-star-btn:hover {
  transform: scale(1.2);
}

/* Animations */
.spin-anim {
  animation: spin 1s linear infinite;
}

@media (max-width: 992px) {
  .overview-layout {
    grid-template-columns: 1fr;
  }
  .video-detail-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .dashboard-container {
    flex-direction: column;
  }
  .dashboard-sidebar {
    width: 100%;
    height: auto;
    position: static;
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    padding: 16px;
  }
  .sidebar-menu {
    flex-direction: row;
    overflow-x: auto;
    padding-bottom: 8px;
  }
  .sidebar-label {
    display: none;
  }
  .sidebar-btn {
    white-space: nowrap;
    padding: 8px 14px;
  }
  .dashboard-content {
    padding: 24px 16px;
  }
  .welcome-title {
    font-size: 26px;
  }
}
`;

export default function UserDashboard({ token, handleLogout }) {
  const [tab, setTab] = useState('overview');
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    total_videos: 0,
    total_queries: 0,
    quota_used: 0,
    quota_total: 1000,
    recent_searches: [],
    average_latency: "0.00s",
    weekly_activity: [],
    match_quality: { excellent: 0, good: 0, weak: 0 }
  });
  const [videos, setVideos] = useState([]);
  const [videosLoading, setVideosLoading] = useState(false);
  const [statsLoading, setStatsLoading] = useState(false);

  // Search
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [searchError, setSearchError] = useState('');

  // Selected Video Player & Comments
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [commentsLoading, setCommentsLoading] = useState(false);

  // Profile Edit
  const [profileForm, setProfileForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    mob: '',
    gender: '',
    bio: '',
    avatar_url: '',
    password: ''
  });
  const [profileSuccess, setProfileSuccess] = useState('');
  const [profileError, setProfileError] = useState('');
  const [profileLoading, setProfileLoading] = useState(false);

  // Feedback
  const [feedback, setFeedback] = useState('');
  const [feedbackRating, setFeedbackRating] = useState(5);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [feedbackSuccess, setFeedbackSuccess] = useState('');

  // Toast
  const [toastMessage, setToastMessage] = useState('');
  const [toastIcon, setToastIcon] = useState('');

  const triggerToast = (msg, icon = 'ti-check') => {
    setToastMessage(msg);
    setToastIcon(icon);
    const toast = document.getElementById('dashboard-toast');
    if (toast) {
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 3000);
    }
  };

  // Fetch Current User Profile
  const fetchProfile = useCallback(async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/me", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data);
        setProfileForm({
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          email: data.email || '',
          mob: data.mob || '',
          gender: data.gender || '',
          bio: data.bio || '',
          avatar_url: data.avatar_url || '',
          password: ''
        });
      }
    } catch (err) {
      console.error("Failed to load user profile", err);
    }
  }, [token]);

  // Fetch User Dashboard Stats
  const fetchDashboardStats = useCallback(async () => {
    setStatsLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/user/dashboard-stats", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (err) {
      console.error("Failed to load user stats", err);
    } finally {
      setStatsLoading(false);
    }
  }, [token]);

  // Fetch Videos
  const fetchVideos = useCallback(async () => {
    setVideosLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/user/videos?limit=100", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setVideos(data.videos || []);
      }
    } catch (err) {
      console.error("Failed to load videos", err);
    } finally {
      setVideosLoading(false);
    }
  }, [token]);

  // Setup Styles and Initial Loads
  useEffect(() => {
    const s = document.createElement('style');
    s.textContent = customStyles;
    document.head.appendChild(s);

    fetchProfile();
    fetchDashboardStats();
    fetchVideos();

    return () => {
      document.head.removeChild(s);
    };
  }, [fetchProfile, fetchDashboardStats, fetchVideos]);

  // Execute Semantic Search
  const executeSearch = async () => {
    if (!query.trim()) return;
    setSearchResults('loading');
    setSearchError('');
    setSelectedVideo(null); // Back out of open video

    try {
      const response = await fetch("http://127.0.0.1:8000/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ query: query.trim(), top_k: 6, min_similarity: 0.4 })
      });
      
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || "Search failed");
      }
      
      const data = await response.json();
      setSearchResults(data);
      // Re-fetch dashboard stats so the total queries count increments live!
      fetchDashboardStats();
    } catch (err) {
      setSearchResults(null);
      setSearchError(err.message || "An error occurred during search. Please check that the API is running.");
    }
  };

  // Video Click & Load Comments
  const handleSelectVideo = async (video) => {
    setSelectedVideo(video);
    setNewComment('');
    setComments([]);
    setCommentsLoading(true);

    try {
      const response = await fetch(`http://127.0.0.1:8000/comments/${video.video_id}`);
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      }
    } catch (err) {
      console.error("Failed to fetch comments", err);
    } finally {
      setCommentsLoading(false);
    }
  };

  // Add Comment
  const handleAddComment = async () => {
    if (!newComment.trim() || !selectedVideo) return;
    try {
      const response = await fetch("http://127.0.0.1:8000/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ video_id: selectedVideo.video_id, comment: newComment.trim() })
      });
      
      if (response.ok) {
        const createdComment = await response.json();
        setComments(prev => [createdComment, ...prev]);
        setNewComment('');
        triggerToast('Comment added successfully!');
      }
    } catch (err) {
      console.error("Failed to add comment", err);
      triggerToast('Failed to post comment', 'ti-alert');
    }
  };

  // Update Profile Info
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setProfileSuccess('');
    setProfileError('');
    setProfileLoading(true);

    try {
      const payload = {
        first_name: profileForm.first_name.trim(),
        last_name: profileForm.last_name.trim(),
        email: profileForm.email.trim(),
        mob: profileForm.mob.trim(),
        gender: profileForm.gender,
        bio: profileForm.bio.trim(),
        avatar_url: profileForm.avatar_url.trim()
      };

      if (profileForm.password.trim()) {
        if (profileForm.password.trim().length < 6) {
          throw new Error("Password must be at least 6 characters long.");
        }
        payload.password = profileForm.password.trim();
      }

      const response = await fetch("http://127.0.0.1:8000/admin/update-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || "Failed to update profile");
      }

      const res = await response.json();
      setProfileSuccess(res.message || "Profile updated successfully!");
      setProfileForm(prev => ({ ...prev, password: '' }));
      // Reload profile
      await fetchProfile();
      triggerToast('Profile updated!');
    } catch (err) {
      setProfileError(err.message || "Failed to update profile settings.");
      triggerToast('Update failed', 'ti-alert');
    } finally {
      setProfileLoading(false);
    }
  };

  // Submit Feedback
  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    if (!feedback.trim()) return;
    setFeedbackLoading(true);
    setFeedbackSuccess('');

    try {
      const response = await fetch("http://127.0.0.1:8000/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ feedback: feedback.trim(), rating: feedbackRating })
      });

      if (response.ok) {
        setFeedbackSuccess("Thank you! Your feedback has been received.");
        setFeedback('');
        setFeedbackRating(5);
        triggerToast('Feedback submitted!');
      }
    } catch (err) {
      console.error("Failed to submit feedback", err);
      triggerToast('Submission failed', 'ti-alert');
    } finally {
      setFeedbackLoading(false);
    }
  };

  const getInitials = () => {
    if (!user) return 'U';
    const first = user.first_name ? user.first_name[0] : '';
    const last = user.last_name ? user.last_name[0] : '';
    return (first + last).toUpperCase() || user.username[0].toUpperCase();
  };

  return (
    <div className="dashboard-container">
      {/* SIDEBAR */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-menu">
          <div className="sidebar-label">Navigation</div>
          
          <button 
            className={`sidebar-btn ${tab === 'overview' ? 'active' : ''}`}
            onClick={() => { setTab('overview'); setSelectedVideo(null); }}
          >
            <i className="ti ti-layout-dashboard"></i>
            <span>Overview</span>
          </button>
          
          <button 
            className={`sidebar-btn ${tab === 'search' ? 'active' : ''}`}
            onClick={() => { setTab('search'); setSelectedVideo(null); }}
          >
            <i className="ti ti-search"></i>
            <span>Semantic Search</span>
          </button>
          
          <button 
            className={`sidebar-btn ${tab === 'videos' ? 'active' : ''}`}
            onClick={() => { setTab('videos'); setSelectedVideo(null); fetchVideos(); }}
          >
            <i className="ti ti-video"></i>
            <span>Library ({videos.length})</span>
          </button>
          
          <button 
            className={`sidebar-btn ${tab === 'analytics' ? 'active' : ''}`}
            onClick={() => { setTab('analytics'); setSelectedVideo(null); }}
          >
            <i className="ti ti-chart-bar"></i>
            <span>Analytics</span>
          </button>

          <div className="sidebar-label">Settings</div>
          
          <button 
            className={`sidebar-btn ${tab === 'settings' ? 'active' : ''}`}
            onClick={() => { setTab('settings'); setSelectedVideo(null); }}
          >
            <i className="ti ti-settings"></i>
            <span>My Profile</span>
          </button>
          
          <button 
            className={`sidebar-btn ${tab === 'feedback' ? 'active' : ''}`}
            onClick={() => { setTab('feedback'); setSelectedVideo(null); }}
          >
            <i className="ti ti-message-star"></i>
            <span>Give Feedback</span>
          </button>
        </div>

        <div className="sidebar-footer-sec" style={{ marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px' }}>
          <button 
            className="sidebar-btn" 
            style={{ width: '100%', color: 'var(--danger)' }}
            onClick={handleLogout}
          >
            <i className="ti ti-logout"></i>
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="dashboard-content">
        
        {/* TAB 1: OVERVIEW */}
        {tab === 'overview' && (
          <div className="fade-in">
            <div className="welcome-header">
              <div>
                <h1 className="welcome-title">
                  Welcome back, {user?.full_name || user?.first_name || user?.username || 'User'}!
                </h1>
                <p className="welcome-subtitle">
                  <i className="ti ti-shield-check" style={{ color: 'var(--success)' }}></i> 
                  Normal Account • Semantic Video Search Engine
                </p>
              </div>
              <div className="glass-panel" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                <span className="status-dot" style={{ display: 'inline-block', width: '8px', height: '8px', background: 'var(--success)', borderRadius: '50%' }}></span>
                <span>API Status: Online</span>
              </div>
            </div>

            {/* METRICS */}
            <div className="metric-grid">
              <div className="glow-card metric-card glow-card-hover">
                <div>
                  <span className="metric-label">
                    <i className="ti ti-video" style={{ color: 'var(--primary)' }}></i> Total Videos
                  </span>
                  <div className="metric-value">{stats.total_videos}</div>
                </div>
                <div className="metric-meta" style={{ color: 'var(--text-muted)' }}>
                  <i className="ti ti-info-circle"></i> In Chroma Collection
                </div>
              </div>

              <div className="glow-card metric-card glow-card-hover">
                <div>
                  <span className="metric-label">
                    <i className="ti ti-search" style={{ color: 'var(--accent)' }}></i> Total Queries
                  </span>
                  <div className="metric-value">{stats.total_queries}</div>
                </div>
                <div className="metric-meta" style={{ color: 'var(--success)' }}>
                  <i className="ti ti-arrow-up"></i> Personal search logs
                </div>
              </div>

              <div className="glow-card metric-card glow-card-hover">
                <div>
                  <span className="metric-label">
                    <i className="ti ti-bolt" style={{ color: 'var(--warning)' }}></i> API Latency
                  </span>
                  <div className="metric-value">{stats.average_latency || "0.00s"}</div>
                </div>
                <div className="metric-meta" style={{ color: 'var(--text-muted)' }}>
                  Average response time
                </div>
              </div>

              <div className="glow-card metric-card glow-card-hover">
                <div>
                  <span className="metric-label">
                    <i className="ti ti-chart-pie" style={{ color: '#10B981' }}></i> Query Limit
                  </span>
                  <div className="metric-value">
                    {Math.round((stats.quota_used / stats.quota_total) * 100)}%
                  </div>
                </div>
                <div style={{ width: '100%' }}>
                  <div className="quota-bar-container">
                    <div className="quota-bar-fill" style={{ width: `${Math.min(100, (stats.quota_used / stats.quota_total) * 100)}%` }}></div>
                  </div>
                  <div className="metric-meta" style={{ justifyContent: 'space-between', color: 'var(--text-dim)', fontSize: '11px', marginTop: '6px' }}>
                    <span>{stats.quota_used} / {stats.quota_total} searches</span>
                    <span>Monthly Quota</span>
                  </div>
                </div>
              </div>
            </div>

            {/* LOWER CONTENT */}
            <div className="overview-layout">
              {/* Recent Searches */}
              <div className="glow-card" style={{ padding: '24px' }}>
                <div className="dashboard-title-row">
                  <h3 className="dashboard-sec-title">
                    <i className="ti ti-history" style={{ color: 'var(--primary)' }}></i>
                    Recent Searches
                  </h3>
                  <button 
                    onClick={() => { setTab('search'); setQuery('rag tutorial'); setTimeout(executeSearch, 100); }}
                    className="card-action"
                    style={{ background: 'none', border: 'none', font: 'inherit', color: 'var(--primary)', cursor: 'pointer' }}
                  >
                    Quick Search
                  </button>
                </div>

                {stats.recent_searches.length > 0 ? (
                  <div className="recent-searches-list">
                    {stats.recent_searches.map((s, idx) => (
                      <div 
                        key={idx} 
                        className="recent-search-item"
                        onClick={() => { setTab('search'); setQuery(s.query); setTimeout(executeSearch, 100); }}
                      >
                        <span className="search-text">"{s.query}"</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <span style={{ fontSize: '12px', background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: '8px', color: 'var(--text-muted)' }}>
                            {s.latency_ms}ms
                          </span>
                          <span className="search-time">{new Date(s.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
                    <i className="ti ti-search" style={{ fontSize: '32px', opacity: 0.3, marginBottom: '8px', display: 'block' }}></i>
                    <p>No queries logged yet. Try out the semantic search!</p>
                  </div>
                )}
              </div>

              {/* Sidebar Quick tips & Premium Info */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="glow-card" style={{ padding: '24px', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(236, 72, 153, 0.05))' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <i className="ti ti-bulb" style={{ color: 'var(--warning)' }}></i> Pro Tips
                  </h3>
                  <ul style={{ fontSize: '13px', color: 'var(--text-muted)', paddingLeft: '16px', lineHeight: '1.8' }}>
                    <li>Use <strong>natural language questions</strong> like "How does LLM chunking work?"</li>
                    <li>Results are ranked by <strong>semantic similarity score</strong>.</li>
                    <li>Click on any result card to watch the video and write comments.</li>
                  </ul>
                </div>

                <div className="glow-card" style={{ padding: '24px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <i className="ti ti-shield" style={{ color: 'var(--success)' }}></i> System Status
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', marginTop: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '8px' }}>
                      <span>Search Engine</span>
                      <span style={{ color: 'var(--success)', fontWeight: '600' }}>Operational</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '8px' }}>
                      <span>ChromaDB Vector Store</span>
                      <span style={{ color: 'var(--success)', fontWeight: '600' }}>Connected ({stats.total_videos} items)</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Model Host (Local)</span>
                      <span style={{ color: 'var(--success)', fontWeight: '600' }}>Active (MiniLM-L6)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SEMANTIC SEARCH */}
        {tab === 'search' && (
          <div className="fade-in">
            <div className="welcome-header" style={{ marginBottom: '24px' }}>
              <div>
                <h1 className="welcome-title">Semantic Search</h1>
                <p className="welcome-subtitle">Ask questions inside your video library using AI and retrieve exact timestamps</p>
              </div>
            </div>

            {/* Search Box */}
            <div className="glow-card" style={{ padding: '28px', marginBottom: '24px' }}>
              <div className="search-glow-input">
                <input 
                  type="text" 
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') executeSearch(); }}
                  placeholder="Type what you want to find, e.g., 'explain transformers' or 'vector databases vs relational'..." 
                />
                <i className="ti ti-search"></i>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <span style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>
                  ✓ Natural Language Supported | ✓ Real-time Semantic Index | ✓ Results Ranked by Relevance
                </span>
                <button 
                  onClick={executeSearch}
                  disabled={!query.trim() || searchResults === 'loading'}
                  className="btn-primary-nav" 
                  style={{ padding: '12px 28px', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  {searchResults === 'loading' ? (
                    <>
                      <i className="ti ti-loader spin-anim"></i>
                      <span>Searching...</span>
                    </>
                  ) : (
                    <>
                      <i className="ti ti-sparkles"></i>
                      <span>Ask AI</span>
                    </>
                  )}
                </button>
              </div>

              {searchError && (
                <div style={{ marginTop: '20px', padding: '12px 16px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--danger)', borderRadius: '12px', color: 'var(--danger)', fontSize: '13.5px' }}>
                  <i className="ti ti-alert-triangle" style={{ marginRight: '8px' }}></i>
                  {searchError}
                </div>
              )}
            </div>

            {/* Results or Loading */}
            {searchResults === 'loading' && (
              <div className="glow-card" style={{ padding: '60px 0', textAlign: 'center' }}>
                <i className="ti ti-loader spin-anim" style={{ fontSize: '40px', color: 'var(--primary)', marginBottom: '16px', display: 'inline-block' }}></i>
                <h3 style={{ fontSize: '18px', fontWeight: '600' }}>Scanning Embedding Vectors</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '6px' }}>Searching across transcripts in ChromaDB collection...</p>
              </div>
            )}

            {searchResults && searchResults !== 'loading' && !selectedVideo && (
              <div>
                {/* Search Header Info */}
                <div className="glass-panel" style={{ padding: '16px 24px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', background: 'rgba(99, 102, 241, 0.05)' }}>
                  <div>
                    <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Search query: </span>
                    <strong style={{ color: '#fff', fontSize: '14px' }}>"{searchResults.query}"</strong>
                  </div>
                  <div style={{ display: 'flex', gap: '16px', fontSize: '13px' }}>
                    <span>Avg Relevance: <strong style={{ color: 'var(--primary)' }}>{Math.round(searchResults.average_similarity * 100)}%</strong></span>
                    <span>Match Grade: <span className="badge-indexed" style={{ display: 'inline-block', verticalAlign: 'middle', padding: '2px 8px', fontSize: '10px' }}>{searchResults.relevance}</span></span>
                  </div>
                </div>

                {/* Grid of Video Cards */}
                {searchResults.results.length > 0 ? (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
                    {searchResults.results.map((r, idx) => (
                      <div 
                        key={idx}
                        className="glow-card glow-card-hover"
                        style={{ padding: '0', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
                        onClick={() => handleSelectVideo(r)}
                      >
                        {/* Thumbnail overlay */}
                        <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', background: '#000' }}>
                          <img 
                            src={r.thumbnail_url} 
                            alt={r.title} 
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} 
                          />
                          <div style={{ position: 'absolute', top: '12px', right: '12px', padding: '4px 8px', background: 'rgba(15, 23, 42, 0.85)', borderRadius: '6px', fontSize: '11px', fontWeight: '700', border: '1px solid rgba(255,255,255,0.1)' }}>
                            Rank #{r.rank}
                          </div>
                          <div style={{ position: 'absolute', bottom: '12px', left: '12px', padding: '4px 8px', background: 'rgba(99, 102, 241, 0.9)', borderRadius: '6px', fontSize: '11.5px', fontWeight: '700', color: '#fff', boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)' }}>
                            Relevance: {Math.round(r.similarity * 100)}%
                          </div>
                        </div>
                        
                        <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                          <div>
                            <h4 style={{ fontSize: '15px', fontWeight: '600', color: '#fff', marginBottom: '8px', lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                              {r.title}
                            </h4>
                            <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
                              <i className="ti ti-brand-youtube" style={{ color: 'var(--danger)' }}></i>
                              {r.channel}
                            </p>
                          </div>

                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '12px', marginTop: '12px' }}>
                            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                              Video ID: <code>{r.video_id}</code>
                            </span>
                            <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              Watch & Discuss <i className="ti ti-arrow-right"></i>
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="glow-card" style={{ padding: '40px 0', textAlign: 'center' }}>
                    <i className="ti ti-search-off" style={{ fontSize: '32px', opacity: 0.3, marginBottom: '8px', display: 'block' }}></i>
                    <p>No videos matched your search criteria. Try a different query phrase.</p>
                  </div>
                )}
              </div>
            )}

            {/* Video Detail Interactive view inside tab */}
            {selectedVideo && (
              <div className="glow-card fade-in" style={{ padding: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '16px', flexWrap: 'wrap' }}>
                  <button 
                    onClick={() => setSelectedVideo(null)} 
                    style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#fff', padding: '10px 18px', borderRadius: '12px', cursor: 'pointer', fontSize: '13.5px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    <i className="ti ti-arrow-left"></i> Back to Grid
                  </button>
                  <a
                    href={`https://www.youtube.com/watch?v=${selectedVideo.video_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid var(--danger)', color: '#fff', textDecoration: 'none', padding: '10px 18px', borderRadius: '12px', cursor: 'pointer', fontSize: '13.5px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.25)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)'; }}
                  >
                    <i className="ti ti-brand-youtube" style={{ color: 'var(--danger)', fontSize: '16px' }}></i> Watch on YouTube
                  </a>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#fff' }}>{selectedVideo.title}</h3>
                    <p style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>{selectedVideo.channel} • Relevance Score: <strong>{Math.round(selectedVideo.similarity * 100)}%</strong></p>
                  </div>
                </div>

                <div className="video-detail-grid">
                  {/* Left Column: Embed Player */}
                  <div>
                    <div style={{ position: 'relative', paddingBottom: '56.25%', height: '0', overflow: 'hidden', borderRadius: '16px', background: '#000', boxShadow: '0 8px 30px rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '20px' }}>
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${selectedVideo.video_id}?autoplay=1`}
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={selectedVideo.title}
                      />
                    </div>
                  </div>

                  {/* Right Column: Dynamic Comments thread */}
                  <div className="glass-panel" style={{ padding: '20px', borderRadius: '16px', display: 'flex', flexDirection: 'column', height: '100%', maxBreak: '100%' }}>
                    <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <i className="ti ti-messages" style={{ color: 'var(--primary)' }}></i>
                      Discussion Thread ({comments.length})
                    </h4>

                    {/* Add Comment */}
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                      <input 
                        type="text" 
                        value={newComment}
                        onChange={e => setNewComment(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter') handleAddComment(); }}
                        placeholder="Add a public comment..." 
                        style={{ flex: 1, padding: '10px 14px', background: 'rgba(15,23,42,0.4)', border: '1.5px solid rgba(255,255,255,0.06)', borderRadius: '10px', color: '#fff', fontSize: '13px' }}
                      />
                      <button 
                        onClick={handleAddComment} 
                        disabled={!newComment.trim()}
                        className="btn-primary-nav" 
                        style={{ padding: '8px 16px', borderRadius: '10px', fontSize: '13px' }}
                      >
                        Send
                      </button>
                    </div>

                    {/* Comments list */}
                    <div className="comments-panel">
                      {commentsLoading ? (
                        <div style={{ textAlign: 'center', padding: '24px 0', color: 'var(--text-muted)', fontSize: '13px' }}>
                          <i className="ti ti-loader spin-anim" style={{ marginRight: '6px' }}></i> Loading comments...
                        </div>
                      ) : comments.length > 0 ? (
                        comments.map(c => (
                          <div key={c.id} className="comment-card" style={{ marginBottom: '8px' }}>
                            <div className="comment-header">
                              <span className="comment-author">{c.username}</span>
                              <span className="comment-date">{new Date(c.created_at).toLocaleDateString()}</span>
                            </div>
                            <p className="comment-body">{c.comment}</p>
                          </div>
                        ))
                      ) : (
                        <div style={{ textAlign: 'center', padding: '30px 0', color: 'var(--text-muted)', fontSize: '13px' }}>
                          <i className="ti ti-message" style={{ fontSize: '24px', opacity: 0.2, marginBottom: '6px', display: 'block' }}></i>
                          No comments on this video yet. Share your thoughts!
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: MY VIDEOS LIBRARY */}
        {tab === 'videos' && (
          <div className="fade-in">
            <div className="welcome-header">
              <div>
                <h1 className="welcome-title">My Video Library</h1>
                <p className="welcome-subtitle">Browse and manage indexed videos in your active dataset</p>
              </div>
            </div>

            <div className="glow-card" style={{ padding: '0', overflow: 'hidden' }}>
              <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '15px', fontWeight: '600' }}>
                  <i className="ti ti-video" style={{ color: 'var(--primary)', marginRight: '6px' }}></i> Available Videos
                </span>
                <span style={{ fontSize: '12px', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', padding: '4px 10px', borderRadius: '20px', fontWeight: '600' }}>
                  {videos.length} videos indexed
                </span>
              </div>

              {videosLoading ? (
                <div style={{ textAlign: 'center', padding: '60px 0' }}>
                  <i className="ti ti-loader spin-anim" style={{ fontSize: '32px', color: 'var(--primary)', marginBottom: '12px', display: 'inline-block' }}></i>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Loading library dataset...</p>
                </div>
              ) : videos.length > 0 ? (
                <div style={{ overflowX: 'auto' }}>
                  <table className="custom-table">
                    <thead>
                      <tr>
                        <th>Video Title</th>
                        <th>Channel</th>
                        <th>Chroma ID</th>
                        <th>Transcript Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {videos.map((v, idx) => (
                        <tr key={idx}>
                          <td style={{ fontWeight: '500', color: '#fff', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {v.title}
                          </td>
                          <td style={{ color: 'var(--text-muted)' }}>{v.channel_title || 'Local import'}</td>
                          <td className="mono-font" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{v.video_id || v.id}</td>
                          <td>
                            <span className={v.transcript_length > 0 ? "badge-indexed" : "badge-processing"}>
                              {v.transcript_length > 0 ? `Indexed (${v.transcript_length} chars)` : 'Processing'}
                            </span>
                          </td>
                          <td>
                            <button 
                              onClick={() => {
                                // Simulate relevance for direct library clicks
                                const mappedVideo = {
                                  rank: 1,
                                  title: v.title,
                                  channel: v.channel_title || 'Local import',
                                  similarity: 1.0,
                                  video_id: v.video_id || v.id,
                                  thumbnail_url: `https://img.youtube.com/vi/${v.video_id || v.id}/hqdefault.jpg`
                                };
                                setTab('search');
                                handleSelectVideo(mappedVideo);
                              }}
                              className="btn-outline-nav"
                              style={{ padding: '6px 12px', fontSize: '12px' }}
                            >
                              <i className="ti ti-player-play"></i> Watch
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
                  <i className="ti ti-video-off" style={{ fontSize: '40px', opacity: 0.2, marginBottom: '12px', display: 'block' }}></i>
                  <p>No videos found in library database.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: ANALYTICS (SVG Graph) */}
        {tab === 'analytics' && (
          <div className="fade-in">
            <div className="welcome-header">
              <div>
                <h1 className="welcome-title">User Search Analytics</h1>
                <p className="welcome-subtitle">A dynamic display of search activity metrics on your account</p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px', marginBottom: '32px' }}>
              {/* Daily Activity Chart */}
              <div className="glow-card" style={{ padding: '28px' }}>
                <h3 className="dashboard-sec-title" style={{ marginBottom: '24px' }}>
                  <i className="ti ti-trending-up" style={{ color: 'var(--primary)' }}></i> Weekly Activity
                </h3>
                
                {/* Stunning custom SVG Column Chart */}
                <div style={{ position: 'relative', width: '100%', height: '220px', background: 'rgba(0,0,0,0.15)', borderRadius: '12px', padding: '16px 8px 8px 8px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', gap: '8px', borderBottom: '1.5px solid rgba(255,255,255,0.08)', paddingBottom: '4px' }}>
                    {(stats.weekly_activity && stats.weekly_activity.length > 0 ? stats.weekly_activity : [
                      { day: 'Mon', queries: 0 },
                      { day: 'Tue', queries: 0 },
                      { day: 'Wed', queries: 0 },
                      { day: 'Thu', queries: 0 },
                      { day: 'Fri', queries: 0 },
                      { day: 'Sat', queries: 0 },
                      { day: 'Sun', queries: 0 }
                    ]).map((d, index) => {
                      const maxVal = Math.max(10, ...((stats.weekly_activity || []).map(x => x.queries || 0)));
                      const heightPct = Math.min(100, Math.max(10, ((d.queries || 0) / maxVal) * 100));
                      return (
                        <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                          <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--primary)', marginBottom: '4px' }}>{d.queries || 0}</span>
                          <div 
                            style={{ 
                              width: '100%', 
                              height: `${heightPct}%`, 
                              background: index === 6 ? 'linear-gradient(180deg, var(--accent), var(--primary))' : 'linear-gradient(180deg, var(--primary), rgba(99, 102, 241, 0.15))', 
                              borderRadius: '6px 6px 0 0',
                              boxShadow: index === 6 ? '0 0 12px rgba(236, 72, 153, 0.4)' : 'none',
                              transition: 'height 0.8s ease'
                            }}
                          ></div>
                        </div>
                      );
                    })}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '6px', fontSize: '11px', color: 'var(--text-muted)' }}>
                    {(stats.weekly_activity && stats.weekly_activity.length > 0 ? stats.weekly_activity.map(x => x.day) : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']).map((dayName, idx) => (
                      <span key={idx} style={{ color: idx === 6 ? '#fff' : 'inherit', fontWeight: idx === 6 ? '600' : 'normal' }}>{dayName}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Relevance Performance */}
              <div className="glow-card" style={{ padding: '28px' }}>
                <h3 className="dashboard-sec-title" style={{ marginBottom: '24px' }}>
                  <i className="ti ti-award" style={{ color: 'var(--accent)' }}></i> Match Quality Index
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                      <span>Excellent Matches (Similarity &gt; 0.75)</span>
                      <strong>{stats.match_quality?.excellent ?? 0}%</strong>
                    </div>
                    <div style={{ height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '99px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${stats.match_quality?.excellent ?? 0}%`, background: 'var(--success)', transition: 'width 0.8s ease' }}></div>
                    </div>
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                      <span>Good Matches (Similarity 0.5 - 0.75)</span>
                      <strong>{stats.match_quality?.good ?? 0}%</strong>
                    </div>
                    <div style={{ height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '99px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${stats.match_quality?.good ?? 0}%`, background: 'var(--primary)', transition: 'width 0.8s ease' }}></div>
                    </div>
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                      <span>Weak Matches (Similarity &lt; 0.50)</span>
                      <strong>{stats.match_quality?.weak ?? 0}%</strong>
                    </div>
                    <div style={{ height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '99px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${stats.match_quality?.weak ?? 0}%`, background: 'var(--warning)', transition: 'width 0.8s ease' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: MY PROFILE SETTINGS */}
        {tab === 'settings' && (
          <div className="fade-in">
            <div className="welcome-header">
              <div>
                <h1 className="welcome-title">My Profile Preferences</h1>
                <p className="welcome-subtitle">Manage first name, last name, contact settings, biography, and credentials</p>
              </div>
            </div>

            <div className="glow-card" style={{ maxWidth: '800px' }}>
              <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '16px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, var(--primary), var(--accent))', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: '700', color: '#fff', border: '2px solid rgba(255,255,255,0.1)' }}>
                  {getInitials()}
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#fff' }}>
                    {user?.full_name || `${profileForm.first_name} ${profileForm.last_name}`.trim() || user?.username}
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Username: <code>{user?.username}</code> • Role: {user?.role}</p>
                </div>
              </div>

              {profileSuccess && (
                <div style={{ marginBottom: '20px', padding: '12px 16px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid var(--success)', borderRadius: '12px', color: 'var(--success)', fontSize: '13.5px' }}>
                  <i className="ti ti-circle-check" style={{ marginRight: '8px' }}></i>
                  {profileSuccess}
                </div>
              )}

              {profileError && (
                <div style={{ marginBottom: '20px', padding: '12px 16px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--danger)', borderRadius: '12px', color: 'var(--danger)', fontSize: '13.5px' }}>
                  <i className="ti ti-alert-triangle" style={{ marginRight: '8px' }}></i>
                  {profileError}
                </div>
              )}

              <form onSubmit={handleUpdateProfile} style={{ display: 'grid', gap: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div style={{ display: 'grid', gap: '8px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: '#fff' }}>First Name</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={profileForm.first_name}
                      onChange={e => setProfileForm(prev => ({ ...prev, first_name: e.target.value }))}
                      placeholder="e.g. John" 
                    />
                  </div>
                  <div style={{ display: 'grid', gap: '8px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: '#fff' }}>Last Name</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={profileForm.last_name}
                      onChange={e => setProfileForm(prev => ({ ...prev, last_name: e.target.value }))}
                      placeholder="e.g. Doe" 
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '16px' }}>
                  <div style={{ display: 'grid', gap: '8px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: '#fff' }}>Email Address</label>
                    <input 
                      type="email" 
                      className="form-input" 
                      value={profileForm.email}
                      onChange={e => setProfileForm(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="john.doe@example.com" 
                    />
                  </div>
                  <div style={{ display: 'grid', gap: '8px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: '#fff' }}>Mobile Number</label>
                    <input 
                      type="tel" 
                      className="form-input" 
                      value={profileForm.mob}
                      onChange={e => setProfileForm(prev => ({ ...prev, mob: e.target.value }))}
                      placeholder="+1 (555) 0199" 
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div style={{ display: 'grid', gap: '8px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: '#fff' }}>Gender</label>
                    <select 
                      className="form-input"
                      value={profileForm.gender}
                      onChange={e => setProfileForm(prev => ({ ...prev, gender: e.target.value }))}
                    >
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other / Decline to state</option>
                    </select>
                  </div>
                  <div style={{ display: 'grid', gap: '8px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: '#fff' }}>Avatar Image URL (Unsplash/Imgur)</label>
                    <input 
                      type="url" 
                      className="form-input" 
                      value={profileForm.avatar_url}
                      onChange={e => setProfileForm(prev => ({ ...prev, avatar_url: e.target.value }))}
                      placeholder="https://..." 
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gap: '8px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#fff' }}>Biography / Profile Note</label>
                  <textarea 
                    rows="3" 
                    className="form-input" 
                    style={{ resize: 'vertical' }}
                    value={profileForm.bio}
                    onChange={e => setProfileForm(prev => ({ ...prev, bio: e.target.value }))}
                    placeholder="Tell us about yourself or your video search activities..."
                  />
                </div>

                <div style={{ display: 'grid', gap: '8px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--accent)' }}>Change Password (Leave blank to keep current)</label>
                  <input 
                    type="password" 
                    className="form-input" 
                    value={profileForm.password}
                    onChange={e => setProfileForm(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="Enter a new password (min. 6 chars)" 
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={profileLoading}
                  className="btn-primary-nav" 
                  style={{ width: '100%', padding: '14px', marginTop: '10px' }}
                >
                  {profileLoading ? 'Updating credentials...' : 'Save Profile Changes'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TAB 6: GIVE FEEDBACK */}
        {tab === 'feedback' && (
          <div className="fade-in">
            <div className="welcome-header">
              <div>
                <h1 className="welcome-title">Submit Feedback</h1>
                <p className="welcome-subtitle">Help our engineering team improve the semantic retrieval algorithm and dashboard UI</p>
              </div>
            </div>

            <div className="glow-card" style={{ maxWidth: '600px' }}>
              {feedbackSuccess && (
                <div style={{ marginBottom: '20px', padding: '12px 16px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid var(--success)', borderRadius: '12px', color: 'var(--success)', fontSize: '13.5px' }}>
                  <i className="ti ti-circle-check" style={{ marginRight: '8px' }}></i>
                  {feedbackSuccess}
                </div>
              )}

              <form onSubmit={handleSubmitFeedback} style={{ display: 'grid', gap: '20px' }}>
                <div style={{ display: 'grid', gap: '8px' }}>
                  <label style={{ fontSize: '14px', fontWeight: '600', color: '#fff' }}>Star Rating</label>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        className="rating-star-btn"
                        onClick={() => setFeedbackRating(star)}
                        style={{ color: star <= feedbackRating ? 'var(--warning)' : 'rgba(255,255,255,0.15)' }}
                      >
                        ★
                      </button>
                    ))}
                    <span style={{ marginLeft: '12px', fontSize: '14px', color: 'var(--text-muted)' }}>({feedbackRating} / 5 stars)</span>
                  </div>
                </div>

                <div style={{ display: 'grid', gap: '8px' }}>
                  <label style={{ fontSize: '14px', fontWeight: '600', color: '#fff' }}>What are your thoughts or bug reports?</label>
                  <textarea
                    rows="6"
                    className="form-input"
                    value={feedback}
                    onChange={e => setFeedback(e.target.value)}
                    placeholder="We'd love to hear how we can improve. Share any bugs, queries that failed, or design ideas..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={feedbackLoading || !feedback.trim()}
                  className="btn-primary-nav"
                  style={{ width: '100%', padding: '14px' }}
                >
                  {feedbackLoading ? 'Submitting details...' : 'Submit Feedback Response'}
                </button>
              </form>
            </div>
          </div>
        )}

      </main>

      {/* DASHBOARD TOAST NOTIFICATION */}
      <div 
        id="dashboard-toast" 
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: 'rgba(30, 41, 59, 0.9)',
          backdropFilter: 'blur(10px)',
          border: '1.5px solid rgba(99, 102, 241, 0.3)',
          color: '#fff',
          fontSize: '13px',
          fontWeight: '500',
          padding: '12px 20px',
          borderRadius: '12px',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
          transform: 'translateY(100px)',
          opacity: 0,
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <i className={`ti ${toastIcon}`} style={{ color: 'var(--primary)', fontSize: '16px' }}></i>
        <span>{toastMessage}</span>
      </div>
    </div>
  );
}
