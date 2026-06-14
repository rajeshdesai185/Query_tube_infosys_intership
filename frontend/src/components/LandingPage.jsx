import React from 'react';

const LandingPage = ({ setAuthFormType, setCurrentView }) => {
  return (
    <div>
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <h1>Ask Questions About Any Video</h1>
          <p>AI Query Tube uses advanced embeddings and real-time search to find answers from your entire video library instantly. Powered by semantic search and AI.</p>
          <div className="hero-buttons">
            <button className="btn-primary-nav" onClick={() => { setAuthFormType("register"); setCurrentView("auth"); }}>Start Free Trial</button>
            <button className="btn-outline-nav" onClick={() => document.querySelector('.demo-search')?.scrollIntoView({ behavior: 'smooth' })}>See Demo</button>
          </div>
        </div>
      </section>
      {/* DEMO SECTION */}
      <section className="demo-search">
        <div className="hero-demo">
          <div className="demo-header">
            <span style={{ background: "#EF4444" }}></span>
            <span style={{ background: "#F59E0B" }}></span>
            <span style={{ background: "#10B981" }}></span>
          </div>
          <div style={{ padding: "24px" }}>
            <div className="search-box-demo">
              <i className="ti ti-search" style={{ color: "var(--text-muted)" }}></i>
              <input type="text" placeholder="Ask: How to build a RAG system? Or: Best practices for vector embeddings?" readOnly />
            </div>
            <div style={{ marginBottom: "16px", fontSize: "12px", color: "var(--text-muted)" }}>Results from 142 videos • AI powered search</div>
            <div className="demo-results">
              {/* Demo cards */}
              <div className="demo-card">
                <div style={{ fontSize: "24px", marginBottom: "8px" }}>🎥</div>
                <div className="demo-card-title">RAG Architecture</div>
                <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "6px" }}>18:42</div>
              </div>
              <div className="demo-card">
                <div style={{ fontSize: "24px", marginBottom: "8px" }}>🔍</div>
                <div className="demo-card-title">Vector Search 101</div>
                <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "6px" }}>24:15</div>
              </div>
              <div className="demo-card">
                <div style={{ fontSize: "24px", marginBottom: "8px" }}>⚡</div>
                <div className="demo-card-title">Fast Embeddings</div>
                <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "6px" }}>12:33</div>
              </div>
              <div className="demo-card">
                <div style={{ fontSize: "24px", marginBottom: "8px" }}>💾</div>
                <div className="demo-card-title">ChromaDB Setup</div>
                <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "6px" }}>16:48</div>
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
  );
};

export default LandingPage;
