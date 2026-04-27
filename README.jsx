import { useState, useEffect, useRef } from "react";

const MOODS = [
  { id: "love", label: "Love", emoji: "🌹", color: "#e8446a", bg: "#fff0f3", border: "#f9b8c8" },
  { id: "happy", label: "Happy", emoji: "✨", color: "#e6a817", bg: "#fffbf0", border: "#fde68a" },
  { id: "angry", label: "Angry", emoji: "🔥", color: "#d94f2b", bg: "#fff4f0", border: "#fbc9b8" },
  { id: "sad", label: "Sad", emoji: "🌧", color: "#5b7ec9", bg: "#f0f4ff", border: "#b8cbf9" },
  { id: "grateful", label: "Grateful", emoji: "🌸", color: "#b5547a", bg: "#fff0f8", border: "#f9c8e0" },
  { id: "missing", label: "Missing", emoji: "🌙", color: "#6b5ba6", bg: "#f4f0ff", border: "#d4c8f9" },
  { id: "excited", label: "Excited", emoji: "🎆", color: "#1da882", bg: "#f0fff9", border: "#b8f0e0" },
  { id: "peaceful", label: "Peaceful", emoji: "🕊", color: "#5896a6", bg: "#f0f9ff", border: "#b8e0f0" },
];

const STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Crimson+Pro:ital,wght@0,300;0,400;1,300;1,400&family=Dancing+Script:wght@400;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: #1a0d0e;
    min-height: 100vh;
    font-family: 'Crimson Pro', Georgia, serif;
    color: #3a1a1e;
    overflow-x: hidden;
  }

  .app-wrap {
    min-height: 100vh;
    background: radial-gradient(ellipse at 20% 0%, #3d1520 0%, #1a0d0e 50%),
                radial-gradient(ellipse at 80% 100%, #1a0d20 0%, transparent 60%);
    position: relative;
  }

  .petal {
    position: fixed;
    pointer-events: none;
    font-size: 18px;
    opacity: 0;
    animation: fall linear infinite;
    z-index: 0;
  }
  @keyframes fall {
    0% { transform: translateY(-40px) rotate(0deg); opacity: 0.6; }
    100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
  }

  .glass-card {
    background: rgba(255,248,245,0.96);
    backdrop-filter: blur(20px);
    border-radius: 24px;
    box-shadow: 0 8px 60px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.6) inset;
    border: 1px solid rgba(255,200,180,0.3);
  }

  .main-container {
    max-width: 760px;
    margin: 0 auto;
    padding: 40px 20px 80px;
    position: relative;
    z-index: 1;
  }

  /* HEADER */
  .header {
    text-align: center;
    margin-bottom: 48px;
  }
  .header-eyebrow {
    font-family: 'Dancing Script', cursive;
    font-size: 18px;
    color: #c9687a;
    letter-spacing: 0.05em;
    margin-bottom: 8px;
  }
  .header-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(48px, 8vw, 76px);
    font-weight: 300;
    color: #fff8f5;
    line-height: 1;
    letter-spacing: -0.02em;
    text-shadow: 0 2px 40px rgba(200,100,100,0.3);
  }
  .header-title em {
    font-style: italic;
    color: #f4a0b0;
  }
  .header-ampersand {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(28px, 5vw, 44px);
    color: #c9687a;
    display: block;
    margin: 4px 0;
  }
  .header-sub {
    font-family: 'Crimson Pro', serif;
    font-style: italic;
    font-size: 16px;
    color: rgba(255,220,210,0.6);
    margin-top: 12px;
    letter-spacing: 0.04em;
  }
  .heart-divider {
    display: flex;
    align-items: center;
    gap: 12px;
    justify-content: center;
    margin: 20px 0;
  }
  .heart-divider::before, .heart-divider::after {
    content: '';
    width: 60px;
    height: 1px;
    background: linear-gradient(to right, transparent, #c9687a);
  }
  .heart-divider::after { background: linear-gradient(to left, transparent, #c9687a); }

  /* TABS */
  .tabs {
    display: flex;
    gap: 8px;
    margin-bottom: 32px;
    padding: 6px;
    background: rgba(255,255,255,0.08);
    border-radius: 16px;
    border: 1px solid rgba(255,200,180,0.15);
  }
  .tab-btn {
    flex: 1;
    padding: 12px;
    border: none;
    border-radius: 12px;
    font-family: 'Cormorant Garamond', serif;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0.04em;
    cursor: pointer;
    transition: all 0.3s ease;
    background: transparent;
    color: rgba(255,220,210,0.5);
  }
  .tab-btn.active {
    background: rgba(255,248,245,0.96);
    color: #3a1a1e;
    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
  }

  /* WRITE FORM */
  .write-form {
    padding: 36px;
  }
  .form-label {
    font-family: 'Cormorant Garamond', serif;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #8a5060;
    margin-bottom: 10px;
    display: block;
  }
  .author-select {
    display: flex;
    gap: 10px;
    margin-bottom: 24px;
  }
  .author-btn {
    flex: 1;
    padding: 14px;
    border-radius: 14px;
    border: 2px solid #e8d0d4;
    background: white;
    font-family: 'Cormorant Garamond', serif;
    font-size: 17px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.25s;
    color: #8a5060;
  }
  .author-btn.selected {
    border-color: #e8446a;
    background: linear-gradient(135deg, #fff0f3, #ffe4ea);
    color: #c0304f;
    box-shadow: 0 4px 16px rgba(232,68,106,0.18);
  }
  .mood-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
    margin-bottom: 24px;
  }
  .mood-chip {
    padding: 10px 8px;
    border-radius: 12px;
    border: 2px solid transparent;
    background: #faf4f5;
    cursor: pointer;
    text-align: center;
    transition: all 0.2s;
    font-size: 11px;
    font-family: 'Crimson Pro', serif;
    font-weight: 400;
    letter-spacing: 0.04em;
    color: #6a3a44;
  }
  .mood-chip .mood-em { font-size: 20px; display: block; margin-bottom: 3px; }
  .mood-chip:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
  .mood-chip.selected {
    border-color: var(--mood-color);
    background: var(--mood-bg);
    color: var(--mood-color);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0,0,0,0.12);
  }
  .entry-textarea {
    width: 100%;
    min-height: 160px;
    padding: 18px;
    border-radius: 16px;
    border: 2px solid #e8d0d4;
    font-family: 'Crimson Pro', serif;
    font-size: 18px;
    line-height: 1.7;
    color: #3a1a1e;
    resize: vertical;
    outline: none;
    transition: border-color 0.2s;
    background: #fffcfc;
    margin-bottom: 20px;
  }
  .entry-textarea:focus { border-color: #e8446a; }
  .entry-textarea::placeholder { color: #c0a0a8; font-style: italic; }
  .submit-btn {
    width: 100%;
    padding: 16px;
    border-radius: 16px;
    border: none;
    background: linear-gradient(135deg, #e8446a, #c0304f);
    color: white;
    font-family: 'Cormorant Garamond', serif;
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 0.06em;
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: 0 6px 24px rgba(200,50,80,0.35);
  }
  .submit-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(200,50,80,0.45); }
  .submit-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

  /* SUCCESS TOAST */
  .toast {
    position: fixed;
    bottom: 32px;
    left: 50%;
    transform: translateX(-50%) translateY(80px);
    background: #3a1a1e;
    color: #fff0f3;
    padding: 14px 28px;
    border-radius: 50px;
    font-family: 'Crimson Pro', serif;
    font-size: 16px;
    font-style: italic;
    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    z-index: 999;
    white-space: nowrap;
  }
  .toast.show { transform: translateX(-50%) translateY(0); }

  /* ENTRIES FEED */
  .entries-wrap { padding: 8px 0; }
  .entries-filters {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 24px;
  }
  .filter-chip {
    padding: 6px 14px;
    border-radius: 50px;
    border: 1.5px solid rgba(255,200,180,0.25);
    background: rgba(255,255,255,0.07);
    color: rgba(255,220,210,0.6);
    font-family: 'Crimson Pro', serif;
    font-size: 13px;
    cursor: pointer;
    transition: all 0.2s;
  }
  .filter-chip:hover { background: rgba(255,255,255,0.12); }
  .filter-chip.active {
    background: rgba(255,248,245,0.15);
    border-color: rgba(255,200,180,0.6);
    color: rgba(255,240,230,0.9);
  }

  .entry-card {
    padding: 28px 32px;
    margin-bottom: 18px;
    position: relative;
    overflow: hidden;
    animation: slideUp 0.5s ease both;
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .entry-mood-bar {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    border-radius: 24px 0 0 24px;
    background: var(--mood-color);
  }
  .entry-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 14px;
    gap: 12px;
  }
  .entry-meta {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }
  .entry-author {
    font-family: 'Dancing Script', cursive;
    font-size: 22px;
    color: #c0304f;
  }
  .entry-mood-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 3px 10px;
    border-radius: 50px;
    font-size: 12px;
    font-family: 'Crimson Pro', serif;
    font-weight: 400;
    letter-spacing: 0.04em;
    background: var(--mood-bg);
    color: var(--mood-color);
    border: 1px solid var(--mood-border);
  }
  .entry-date {
    font-family: 'Crimson Pro', serif;
    font-size: 12px;
    color: #b08090;
    font-style: italic;
    white-space: nowrap;
  }
  .entry-body {
    font-family: 'Crimson Pro', serif;
    font-size: 19px;
    line-height: 1.75;
    color: #3a1a1e;
    white-space: pre-wrap;
    font-weight: 300;
  }
  .empty-state {
    text-align: center;
    padding: 60px 20px;
    color: rgba(255,220,210,0.4);
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px;
    font-style: italic;
  }
  .empty-state-emoji { font-size: 48px; display: block; margin-bottom: 16px; }
  .count-badge {
    font-family: 'Crimson Pro', serif;
    font-size: 13px;
    color: rgba(255,220,210,0.4);
    text-align: center;
    padding: 12px 0 0;
    font-style: italic;
  }
`;

function formatDate(ts) {
  const d = new Date(ts);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
    + " · " + d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
}

export default function App() {
  const [tab, setTab] = useState("write");
  const [author, setAuthor] = useState("Rudra");
  const [mood, setMood] = useState(null);
  const [text, setText] = useState("");
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(false);
  const [filterMood, setFilterMood] = useState("all");
  const [filterAuthor, setFilterAuthor] = useState("all");
  const petalsRef = useRef([]);

  // Load entries from shared storage
  useEffect(() => {
    (async () => {
      try {
        const r = await window.storage.get("journal_entries", true);
        if (r?.value) setEntries(JSON.parse(r.value));
      } catch (_) {}
      setLoading(false);
    })();
  }, []);

  // Petals
  useEffect(() => {
    const emojis = ["🌹", "🌸", "✨", "🌺", "💫"];
    petalsRef.current = Array.from({ length: 8 }).map((_, i) => ({
      id: i, emoji: emojis[i % emojis.length],
      left: `${10 + i * 12}%`,
      delay: `${i * 1.4}s`,
      duration: `${8 + i * 1.5}s`,
    }));
  }, []);

  const showToast = () => {
    setToast(true);
    setTimeout(() => setToast(false), 2500);
  };

  const handleSubmit = async () => {
    if (!text.trim() || !mood) return;
    setSaving(true);
    const entry = { id: Date.now(), author, mood, text: text.trim(), ts: Date.now() };
    const updated = [entry, ...entries];
    try {
      await window.storage.set("journal_entries", JSON.stringify(updated), true);
      setEntries(updated);
      setText("");
      setMood(null);
      showToast();
      setTab("read");
    } catch (_) {}
    setSaving(false);
  };

  const filtered = entries.filter(e => {
    if (filterMood !== "all" && e.mood !== filterMood) return false;
    if (filterAuthor !== "all" && e.author !== filterAuthor) return false;
    return true;
  });

  return (
    <>
      <style>{STYLE}</style>
      <div className="app-wrap">
        {/* Petals */}
        {petalsRef.current.map(p => (
          <span key={p.id} className="petal" style={{
            left: p.left, animationDelay: p.delay, animationDuration: p.duration
          }}>{p.emoji}</span>
        ))}

        <div className="main-container">
          {/* Header */}
          <div className="header">
            <div className="header-eyebrow">our little world 🌹</div>
            <div className="header-title">
              <em>Zahra</em>
              <span className="header-ampersand">& Rudra</span>
            </div>
            <div className="heart-divider">❤</div>
            <div className="header-sub">every feeling, every word, forever ours</div>
          </div>

          {/* Tabs */}
          <div className="tabs">
            <button className={`tab-btn ${tab === "write" ? "active" : ""}`} onClick={() => setTab("write")}>
              ✍️ Write
            </button>
            <button className={`tab-btn ${tab === "read" ? "active" : ""}`} onClick={() => setTab("read")}>
              📖 Read ({entries.length})
            </button>
          </div>

          {/* Write Tab */}
          {tab === "write" && (
            <div className="glass-card write-form">
              <label className="form-label">Who is writing?</label>
              <div className="author-select" style={{ marginBottom: 24 }}>
                {["Rudra", "Zahra"].map(a => (
                  <button key={a} className={`author-btn ${author === a ? "selected" : ""}`}
                    onClick={() => setAuthor(a)}>
                    {a === "Rudra" ? "🌿" : "🌹"} {a}
                  </button>
                ))}
              </div>

              <label className="form-label">What are you feeling?</label>
              <div className="mood-grid" style={{ marginBottom: 24 }}>
                {MOODS.map(m => (
                  <button key={m.id} className={`mood-chip ${mood === m.id ? "selected" : ""}`}
                    style={{ "--mood-color": m.color, "--mood-bg": m.bg, "--mood-border": m.border }}
                    onClick={() => setMood(m.id)}>
                    <span className="mood-em">{m.emoji}</span>
                    {m.label}
                  </button>
                ))}
              </div>

              <label className="form-label">Pour your heart out</label>
              <textarea className="entry-textarea"
                placeholder={author === "Rudra"
                  ? "Tell Zahra what's on your heart..."
                  : "Tell Rudra what's on your heart..."}
                value={text}
                onChange={e => setText(e.target.value)}
              />

              <button className="submit-btn" onClick={handleSubmit}
                disabled={!text.trim() || !mood || saving}>
                {saving ? "Saving..." : "Add to our journal 🌹"}
              </button>
            </div>
          )}

          {/* Read Tab */}
          {tab === "read" && (
            <div className="entries-wrap">
              {/* Filters */}
              <div className="entries-filters">
                <button className={`filter-chip ${filterAuthor === "all" ? "active" : ""}`}
                  onClick={() => setFilterAuthor("all")}>All</button>
                <button className={`filter-chip ${filterAuthor === "Rudra" ? "active" : ""}`}
                  onClick={() => setFilterAuthor("Rudra")}>🌿 Rudra</button>
                <button className={`filter-chip ${filterAuthor === "Zahra" ? "active" : ""}`}
                  onClick={() => setFilterAuthor("Zahra")}>🌹 Zahra</button>
                {MOODS.slice(0, 4).map(m => (
                  <button key={m.id} className={`filter-chip ${filterMood === m.id ? "active" : ""}`}
                    onClick={() => setFilterMood(filterMood === m.id ? "all" : m.id)}>
                    {m.emoji} {m.label}
                  </button>
                ))}
              </div>

              {loading ? (
                <div className="empty-state">Loading your memories...</div>
              ) : filtered.length === 0 ? (
                <div className="empty-state">
                  <span className="empty-state-emoji">🌹</span>
                  {entries.length === 0
                    ? "Your story hasn't been written yet.\nBe the first to pour your heart out."
                    : "No entries match this filter."}
                </div>
              ) : (
                <>
                  {filtered.map((e, i) => {
                    const m = MOODS.find(x => x.id === e.mood) || MOODS[0];
                    return (
                      <div key={e.id} className="glass-card entry-card"
                        style={{ "--mood-color": m.color, "--mood-bg": m.bg, "--mood-border": m.border,
                          animationDelay: `${i * 0.06}s` }}>
                        <div className="entry-mood-bar" />
                        <div className="entry-header">
                          <div className="entry-meta">
                            <span className="entry-author">{e.author === "Rudra" ? "🌿 " : "🌹 "}{e.author}</span>
                            <span className="entry-mood-badge">
                              {m.emoji} {m.label}
                            </span>
                          </div>
                          <div className="entry-date">{formatDate(e.ts)}</div>
                        </div>
                        <div className="entry-body">{e.text}</div>
                      </div>
                    );
                  })}
                  <div className="count-badge">{filtered.length} memories in this journal</div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Toast */}
        <div className={`toast ${toast ? "show" : ""}`}>
          🌹 Added to your story, my love
        </div>
      </div>
    </>
  );
}
