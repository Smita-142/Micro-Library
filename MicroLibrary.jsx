import { useState, useEffect, useRef } from "react";
// ─── Icons (inline SVG components) ───────────────────────────────────────────
const Icon = ({ d, size = 20, stroke = "currentColor", fill = "none", strokeWidth = 1.8 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    {Array.isArray(d) ? d.map((path, i) => <path key={i} d={path} />) : <path d={d} />}
  </svg>
);

 const handleRequest = (book) => {
  setRequestedBooks(prev => {
    // prevent duplicate
    if (prev.some(b => b.id === book.id)) return prev;

    return [...prev, book];
  });

  showNotif(`Request sent for "${book.title}" 📩`, "success");
};



const Icons = {
  book: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20",
  book2: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5v14z",
  search: "M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z",
  chat: ["M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"],
  users: ["M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2", "M23 21v-2a4 4 0 0 0-3-3.87", "M16 3.13a4 4 0 0 1 0 7.75", "M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"],
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  crown: "M2 20h20M5 20V9l7-7 7 7v11",
  bell: ["M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9", "M13.73 21a2 2 0 0 1-3.46 0"],
  home: ["M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z", "M9 22V12h6v10"],
  grid: ["M3 3h7v7H3z", "M14 3h7v7h-7z", "M14 14h7v7h-7z", "M3 14h7v7H3z"],
  heart: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z",
  send: "M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z",
  plus: "M12 5v14M5 12h14",
  x: "M18 6L6 18M6 6l12 12",
  menu: ["M3 12h18", "M3 6h18", "M3 18h18"],
  trending: ["M23 6l-9.5 9.5-5-5L1 18", "M17 6h6v6"],
  zap: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  award: ["M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12z", "M8.21 13.89L7 23l5-3 5 3-1.21-9.12"],
  clock: ["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z", "M12 6v6l4 2"],
  tag: ["M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z", "M7 7h.01"],
  eye: ["M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z", "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"],
  logout: ["M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", "M16 17l5-5-5-5", "M21 12H9"],
  info: ["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z", "M12 16v-4", "M12 8h.01"],
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const BOOKS = [
  { id: 1, title: "Atomic Habits", author: "James Clear", genre: "Self-Help", cover: "https://covers.openlibrary.org/b/id/10519469-L.jpg", price: 299, rent: 30, status: "available", owner: "Arjun_R", rating: 4.8, reviews: 124, type: "buy" },
  { id: 2, title: "The Alchemist", author: "Paulo Coelho", genre: "Fiction", cover: "https://covers.openlibrary.org/b/id/8172544-L.jpg", price: 199, rent: 20, status: "available", owner: "Priya_S", rating: 4.9, reviews: 210, type: "borrow" },
  { id: 3, title: "Deep Work", author: "Cal Newport", genre: "Productivity", cover: "https://covers.openlibrary.org/b/id/9255326-L.jpg", price: 349, rent: 35, status: "available", owner: "Ravi_K", rating: 4.7, reviews: 88, type: "rent" },
  { id: 4, title: "Ikigai", author: "Héctor García", genre: "Philosophy", cover: "https://covers.openlibrary.org/b/id/10110430-L.jpg", price: 250, rent: 25, status: "borrowed", owner: "Meera_T", rating: 4.6, reviews: 156, type: "buy" },
  { id: 5, title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", genre: "Finance", cover: "https://covers.openlibrary.org/b/id/9255697-L.jpg", price: 320, rent: 32, status: "available", owner: "Siddharth_P", rating: 4.5, reviews: 302, type: "borrow" },
  { id: 6, title: "Zero to One", author: "Peter Thiel", genre: "Business", cover: "https://covers.openlibrary.org/b/id/8290533-L.jpg", price: 399, rent: 40, status: "available", owner: "Neha_M", rating: 4.4, reviews: 97, type: "rent" },
];

const EBOOKS = [
  { id: 1, title: "The Psychology of Money", author: "Morgan Housel", genre: "Finance", pages: 242, cover: "https://covers.openlibrary.org/b/id/10519522-L.jpg", premium: false },
  { id: 2, title: "Sapiens", author: "Yuval Noah Harari", genre: "History", pages: 443, cover: "https://covers.openlibrary.org/b/id/8516187-L.jpg", premium: true },
  { id: 3, title: "1984", author: "George Orwell", genre: "Dystopia", pages: 328, cover: "https://covers.openlibrary.org/b/id/7222246-L.jpg", premium: false },
  { id: 4, title: "Thinking, Fast and Slow", author: "Daniel Kahneman", genre: "Psychology", pages: 499, cover: "https://covers.openlibrary.org/b/id/9255327-L.jpg", premium: true },
];

const GROUPS = [
  { id: 1, name: "Sci-Fi Readers Club", members: 47, books: 12, active: true, color: "#4ade80" },
  { id: 2, name: "Mumbai Bibliophiles", members: 89, books: 34, active: true, color: "#fb923c" },
  { id: 3, name: "Young Entrepreneurs", members: 32, books: 8, active: false, color: "#60a5fa" },
  { id: 4, name: "Philosophy Circle", members: 21, books: 15, active: true, color: "#c084fc" },
];

const CHAT_MESSAGES = [
  { id: 1, from: "Arjun_R", text: "Hi! Is Atomic Habits still available?", time: "10:32 AM", mine: false },
  { id: 2, from: "You", text: "Yes it is! Would you like to borrow or buy?", time: "10:33 AM", mine: true },
  { id: 3, from: "Arjun_R", text: "I'd like to borrow for 2 weeks please", time: "10:34 AM", mine: false },
  { id: 4, from: "You", text: "Perfect! I can drop it at the college library counter.", time: "10:35 AM", mine: true },
];

const LEADERBOARD = [
  { rank: 1, user: "Priya_S", books: 42, credits: 30, badge: "🏆" },
  { rank: 2, user: "Ravi_K", books: 38, credits: 28, badge: "🥈" },
  { rank: 3, user: "Meera_T", books: 31, credits: 25, badge: "🥉" },
  { rank: 4, user: "You", books: 18, credits: 16, badge: "⭐" },
  { rank: 5, user: "Neha_M", books: 15, credits: 14, badge: "📚" },
];

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function MicroLibrary() {
  

  const [requestedBooks, setRequestedBooks] = useState([]);

  const [page, setPage] = useState("login");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMsg, setChatMsg] = useState("");
  const [messages, setMessages] = useState(CHAT_MESSAGES);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterGenre, setFilterGenre] = useState("All");
  const [filterType, setFilterType] = useState("All");
  const [notification, setNotification] = useState(null);
  const [readingBook, setReadingBook] = useState(null);
  const [joinedGroups, setJoinedGroups] = useState([1]);
  const chatEndRef = useRef(null);

  const userCredits = 16;
  const userPlan = "Free";

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, chatOpen]);

  const showNotif = (msg, type = "success") => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };
  const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const renderLogin = () => (
  <div className="auth-wrapper">
    <div className="auth-card">
      <h2 className="auth-title">Login</h2>

      <input 
        className="form-input" 
        placeholder="Email" 
      />

      <input 
        className="form-input" 
        type="password" 
        placeholder="Password" 
      />

      <button 
        className="btn-primary"
        onClick={() => {
          showNotif("Logged in successfully 🎉");
          setPage("dashboard");
        }}
      >
        Login
      </button>

      {/* EXTRA (optional but looks pro) */}
      <p style={{ fontSize: "12px", textAlign: "center", color: "var(--text-muted)" }}>
        Don’t have an account?{" "}
        <span 
          style={{ color: "var(--sage-dark)", cursor: "pointer", fontWeight: "600" }}
          onClick={() => setPage("signup")}
        >
          Sign Up
        </span>
      </p>
    </div>
  </div>
);
const renderSignup = () => (
  <div className="auth-wrapper">
    <div className="auth-card">
      <h2 className="auth-title">Sign Up</h2>

      <input className="form-input" placeholder="Name" />
      <input className="form-input" placeholder="Email" />
      <input className="form-input" type="password" placeholder="Password" />

      <button 
        className="btn-primary"
        onClick={() => {
          showNotif("Account created 🎉");
          setPage("login");
        }}
      >
        Create Account
      </button>
    </div>
  </div>
);
   
  const sendChat = () => {
    if (!chatMsg.trim()) return;
    const blocked = /\d{5,}|@|\.(com|in|net|org)/i.test(chatMsg);
    if (blocked) {
      showNotif("⚠️ Personal contact info not allowed in chat!", "error");
      return;
    }
    setMessages(prev => [...prev, { id: Date.now(), from: "You", text: chatMsg, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), mine: true }]);
    setChatMsg("");
  };

  const genres = ["All", ...new Set(BOOKS.map(b => b.genre))];
  const types = ["All", "buy", "borrow", "rent"];
  const filteredBooks = BOOKS.filter(b =>
    (filterGenre === "All" || b.genre === filterGenre) &&
    (filterType === "All" || b.type === filterType) &&
    (b.title.toLowerCase().includes(searchQuery.toLowerCase()) || b.author.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // ── Styles ──────────────────────────────────────────────────────────────────
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&family=DM+Sans:wght@300;400;500;600&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    /* CENTER THE PAGE */
.auth-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}

/* CARD DESIGN */
.auth-card {
  background: var(--card);
  border: 1px solid var(--border);
  padding: 32px;
  border-radius: 16px;
  width: 320px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: var(--shadow);
}

/* TITLE */
.auth-title {
  font-size: 28px;
  font-family: var(--font-head);
  text-align: center;
  color: var(--text);
}

/* INPUT FIX (you already have form-input, just enhancing) */
.form-input {
  font-size: 14px;
  padding: 12px;
  border-radius: 10px;
}

/* BUTTON FIX */
.btn-primary {
  background: #7aaa7a;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  transition: 0.2s;
}

.btn-primary:hover {
  background: #5f8f5f;
}
    :root {
      --cream: #faf7f2;
      --beige: #f0ebe0;
      --sage: #8eecd4;
      --sage-light: #e8f5e8;
      --sage-dark: #64ddaf;
      --brown: #8b6f5c;
      --text: #2c2416;
      --text-muted: #7a6a58;
      --card: #fffef9;
      --border: #e8e0d0;k
      --shadow: 0 4px 24px rgba(44,36,22,0.08);
      --shadow-hover: 0 12px 40px rgba(44,36,22,0.14);
      --radius: 16px;
      --font-head: 'Playfair Display', serif;
      --font-body: 'DM Sans', sans-serif;
    }
    body { background: var(--cream); font-family: var(--font-body); color: var(--text); }
    .app { min-height: 100vh; display: flex; flex-direction: column; }
    /* BUTTON STYLES */


    
    /* NAV */
    .nav { background: var(--card); border-bottom: 1px solid var(--border); position: sticky; top: 0; z-index: 100; backdrop-filter: blur(12px); }
    .nav-inner { max-width: 1200px; margin: 0 auto; padding: 0 20px; height: 64px; display: flex; align-items: center; justify-content: space-between; }
    .nav-logo { font-family: var(--font-head); font-size: 22px; color: var(--sage-dark); cursor: pointer; display: flex; align-items: center; gap: 8px; }
    .nav-links { display: flex; gap: 4px; }
    .nav-link { padding: 8px 14px; border-radius: 10px; cursor: pointer; font-size: 14px; font-weight: 500; color: var(--text-muted); transition: all .2s; border: none; background: none; }
    .nav-link:hover, .nav-link.active { background: var(--sage-light); color: var(--sage-dark); }
    .nav-actions { display: flex; align-items: center; gap: 10px; }
    .btn-primary { background: var(--sage-dark); color: white; border: none; padding: 9px 18px; border-radius: 10px; font-size: 14px; font-weight: 600; cursor: pointer; transition: all .2s; font-family: var(--font-body); }
    .btn-primary:hover { background: var(--sage); transform: translateY(-1px); }
    .btn-outline { background: none; border: 1.5px solid var(--sage-dark); color: var(--sage-dark); padding: 8px 16px; border-radius: 10px; font-size: 13px; font-weight: 600; cursor: pointer; transition: all .2s; font-family: var(--font-body); }
    .btn-outline:hover { background: var(--sage-light); }
    .credits-badge { background: linear-gradient(135deg, #f5d76e, #f0a500); color: #5c3a00; padding: 6px 12px; border-radius: 20px; font-size: 13px; font-weight: 700; display: flex; align-items: center; gap: 5px; }
    
    /* MAIN */
    .main { flex: 1; max-width: 1200px; margin: 0 auto; padding: 32px 20px; width: 100%; }
    
    /* HERO */
    .hero { background: linear-gradient(135deg, var(--sage-dark) 0%, #3d6b3d 50%, #2a5230 100%); border-radius: 28px; padding: 72px 56px; color: white; position: relative; overflow: hidden; margin-bottom: 48px; }
    .hero::before { content: ''; position: absolute; top: -80px; right: -80px; width: 320px; height: 320px; background: rgba(255,255,255,0.06); border-radius: 50%; }
    .hero::after { content: ''; position: absolute; bottom: -40px; left: 30%; width: 200px; height: 200px; background: rgba(255,255,255,0.04); border-radius: 50%; }
    .hero-tag { display: inline-block; background: rgba(255,255,255,0.15); padding: 6px 16px; border-radius: 20px; font-size: 13px; font-weight: 500; margin-bottom: 20px; }
    .hero h1 { font-family: var(--font-head); font-size: clamp(36px, 5vw, 58px); font-weight: 700; line-height: 1.15; margin-bottom: 20px; }
    .hero p { font-size: 17px; opacity: .85; max-width: 480px; line-height: 1.7; margin-bottom: 32px; }
    .hero-btns { display: flex; gap: 14px; flex-wrap: wrap; }
    .hero-btn-white { background: white; color: var(--sage-dark); border: none; padding: 13px 26px; border-radius: 12px; font-size: 15px; font-weight: 700; cursor: pointer; transition: all .2s; font-family: var(--font-body); }
    .hero-btn-white:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.2); }
    .hero-btn-ghost { background: rgba(255,255,255,0.15); color: white; border: 1.5px solid rgba(255,255,255,0.3); padding: 12px 24px; border-radius: 12px; font-size: 15px; font-weight: 600; cursor: pointer; transition: all .2s; font-family: var(--font-body); }
    .hero-btn-ghost:hover { background: rgba(255,255,255,0.25); }
    .hero-stats { display: flex; gap: 40px; margin-top: 44px; }
    .hero-stat { text-align: center; }
    .hero-stat-num { font-family: var(--font-head); font-size: 32px; font-weight: 700; }
    .hero-stat-label { font-size: 13px; opacity: .75; margin-top: 2px; }
    
    /* SECTION TITLES */
    .section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; }
    .section-title { font-family: var(--font-head); font-size: 26px; color: var(--text); }
    .section-subtitle { font-size: 14px; color: var(--text-muted); margin-top: 4px; }
    
    /* FEATURE CARDS */
    .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; margin-bottom: 48px; }
    .feature-card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 28px 24px; transition: all .25s; cursor: pointer; }
    .feature-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-hover); border-color: var(--sage); }
    .feature-icon { width: 48px; height: 48px; border-radius: 14px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; }
    .feature-card h3 { font-size: 16px; font-weight: 600; margin-bottom: 8px; }
    .feature-card p { font-size: 13px; color: var(--text-muted); line-height: 1.6; }
    
    /* BOOKS GRID */
    .books-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px; }
    .book-card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; transition: all .25s; cursor: pointer; }
    .book-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-hover); }
    .book-cover { width: 100%; height: 220px; object-fit: cover; background: var(--beige); }
    .book-info { padding: 14px; }
    .book-title { font-weight: 600; font-size: 14px; margin-bottom: 3px; line-height: 1.3; }
    .book-author { font-size: 12px; color: var(--text-muted); margin-bottom: 8px; }
    .book-meta { display: flex; align-items: center; justify-content: space-between; }
    .book-price { font-weight: 700; color: var(--sage-dark); font-size: 14px; }
    .book-type { font-size: 11px; font-weight: 600; padding: 3px 8px; border-radius: 6px; text-transform: capitalize; }
    .type-buy { background: #dbeafe; color: #1d4ed8; }
    .type-borrow { background: var(--sage-light); color: var(--sage-dark); }
    .type-rent { background: #fef3c7; color: #b45309; }
    .book-status-badge { font-size: 11px; padding: 2px 8px; border-radius: 6px; font-weight: 600; }
    .status-available { background: var(--sage-light); color: var(--sage-dark); }
    .status-borrowed { background: #fee2e2; color: #dc2626; }
    .book-rating { display: flex; align-items: center; gap: 4px; font-size: 12px; color: var(--text-muted); margin-top: 6px; }
    .book-actions { padding: 0 14px 14px; display: flex; gap: 8px; }
    .btn-sm { flex: 1; padding: 8px; border-radius: 8px; font-size: 12px; font-weight: 600; cursor: pointer; border: none; transition: all .2s; font-family: var(--font-body); }
    .btn-sm-primary { background: var(--sage-dark); color: white; }
    .btn-sm-primary:hover { background: var(--sage); }
    .btn-sm-ghost { background: var(--beige); color: var(--text); }
    .btn-sm-ghost:hover { background: var(--border); }
    
    /* SEARCH & FILTERS */
    .search-bar { background: var(--card); border: 1.5px solid var(--border); border-radius: 12px; padding: 10px 16px; display: flex; align-items: center; gap: 10px; margin-bottom: 20px; transition: border-color .2s; }
    .search-bar:focus-within { border-color: var(--sage); }
    .search-bar input { border: none; background: none; flex: 1; font-size: 14px; font-family: var(--font-body); color: var(--text); outline: none; }
    .filter-row { display: flex; gap: 10px; margin-bottom: 24px; flex-wrap: wrap; }
    .filter-btn { padding: 7px 14px; border-radius: 20px; border: 1.5px solid var(--border); background: var(--card); font-size: 13px; font-weight: 500; cursor: pointer; transition: all .2s; font-family: var(--font-body); color: var(--text-muted); }
    .filter-btn.active { background: var(--sage-dark); color: white; border-color: var(--sage-dark); }
    
    /* EBOOK GRID */
    .ebook-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 20px; }
    .ebook-card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; transition: all .25s; cursor: pointer; position: relative; }
    .ebook-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-hover); }
    .ebook-cover { width: 100%; height: 200px; object-fit: cover; background: var(--beige); }
    .ebook-info { padding: 12px; }
    .premium-badge { position: absolute; top: 10px; right: 10px; background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 3px 10px; border-radius: 12px; font-size: 11px; font-weight: 700; display: flex; align-items: center; gap: 4px; }
    
    /* GROUPS */
    .groups-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 20px; }
    .group-card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 24px; transition: all .25s; }
    .group-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-hover); }
    .group-dot { width: 12px; height: 12px; border-radius: 50%; display: inline-block; margin-right: 8px; }
    
    /* CHAT */
    .chat-overlay { position: fixed; bottom: 24px; right: 24px; z-index: 999; }
    .chat-fab { width: 56px; height: 56px; background: var(--sage-dark); border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; color: white; box-shadow: 0 4px 20px rgba(77,124,77,0.4); border: none; transition: transform .2s; }
    .chat-fab:hover { transform: scale(1.1); }
    .chat-window { width: 340px; height: 480px; background: var(--card); border: 1px solid var(--border); border-radius: 20px; box-shadow: 0 20px 60px rgba(44,36,22,0.15); display: flex; flex-direction: column; overflow: hidden; margin-bottom: 12px; animation: slideUp .25s ease; }
    @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    .chat-header { background: var(--sage-dark); color: white; padding: 14px 16px; display: flex; align-items: center; justify-content: space-between; }
    .chat-header-info { display: flex; flex-direction: column; }
    .chat-user { font-weight: 600; font-size: 14px; }
    .chat-sub { font-size: 11px; opacity: .75; }
    .chat-messages { flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 10px; }
    .chat-bubble { max-width: 80%; padding: 10px 14px; border-radius: 14px; font-size: 13px; line-height: 1.5; }
    .chat-bubble.mine { background: var(--sage-dark); color: white; border-bottom-right-radius: 4px; align-self: flex-end; }
    .chat-bubble.theirs { background: var(--beige); color: var(--text); border-bottom-left-radius: 4px; align-self: flex-start; }
    .chat-time { font-size: 10px; opacity: .6; margin-top: 4px; }
    .chat-input-row { padding: 12px; border-top: 1px solid var(--border); display: flex; gap: 8px; align-items: center; }
    .chat-input { flex: 1; border: 1.5px solid var(--border); border-radius: 10px; padding: 8px 12px; font-size: 13px; font-family: var(--font-body); outline: none; background: var(--cream); color: var(--text); }
    .chat-input:focus { border-color: var(--sage); }
    .chat-send-btn { background: var(--sage-dark); border: none; color: white; width: 36px; height: 36px; border-radius: 10px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all .2s; }
    .chat-send-btn:hover { background: var(--sage); }
    .safety-note { font-size: 10px; color: var(--text-muted); padding: 4px 12px 8px; text-align: center; }
    
    /* DASHBOARD */
    .dash-grid { display: grid; grid-template-columns: 280px 1fr; gap: 24px; }
    .dash-sidebar { display: flex; flex-direction: column; gap: 16px; }
    .dash-card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 20px; }
    .dash-avatar { width: 64px; height: 64px; border-radius: 50%; background: linear-gradient(135deg, var(--sage), var(--sage-dark)); display: flex; align-items: center; justify-content: center; font-family: var(--font-head); font-size: 24px; color: white; margin-bottom: 12px; }
    .plan-badge { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 700; background: var(--beige); color: var(--brown); margin-top: 6px; }
    .credits-bar { background: var(--beige); border-radius: 8px; height: 8px; overflow: hidden; margin-top: 8px; }
    .credits-fill { background: linear-gradient(90deg, #f5d76e, #f0a500); height: 100%; border-radius: 8px; transition: width .5s; }
    .dash-stat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .dash-stat { background: var(--beige); border-radius: 12px; padding: 16px; text-align: center; }
    .dash-stat-num { font-family: var(--font-head); font-size: 28px; font-weight: 700; color: var(--sage-dark); }
    .dash-stat-label { font-size: 12px; color: var(--text-muted); margin-top: 2px; }
    
    /* PRICING */
    .pricing-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; margin-top: 32px; }
    .pricing-card { background: var(--card); border: 2px solid var(--border); border-radius: 20px; padding: 28px 24px; transition: all .25s; }
    .pricing-card.featured { border-color: var(--sage-dark); background: linear-gradient(160deg, var(--sage-light), var(--card)); }
    .pricing-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-hover); }
    .pricing-price { font-family: var(--font-head); font-size: 38px; font-weight: 700; color: var(--sage-dark); }
    .pricing-period { font-size: 14px; color: var(--text-muted); }
    .pricing-feature { display: flex; align-items: center; gap: 8px; font-size: 13px; padding: 6px 0; color: var(--text-muted); }
    .pricing-feature span { color: var(--sage-dark); }
    
    /* LEADERBOARD */
    .leaderboard-table { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; }
    .lb-row { display: flex; align-items: center; padding: 14px 20px; border-bottom: 1px solid var(--border); gap: 16px; transition: background .15s; }
    .lb-row:last-child { border-bottom: none; }
    .lb-row:hover { background: var(--beige); }
    .lb-row.highlight { background: var(--sage-light); }
    .lb-rank { font-family: var(--font-head); font-size: 20px; width: 32px; text-align: center; }
    .lb-user { flex: 1; font-weight: 600; font-size: 14px; }
    .lb-books { font-size: 13px; color: var(--text-muted); }
    .lb-credits { font-size: 13px; font-weight: 700; color: #b45309; background: #fef3c7; padding: 3px 10px; border-radius: 12px; }
    
    /* BOOK OF THE WEEK */
    .botw { background: linear-gradient(135deg, #2a5230, var(--sage-dark)); border-radius: 24px; padding: 36px; color: white; display: flex; gap: 32px; align-items: center; margin-bottom: 40px; }
    .botw-cover { width: 120px; height: 160px; border-radius: 10px; object-fit: cover; box-shadow: 0 12px 32px rgba(0,0,0,0.3); flex-shrink: 0; }
    .botw-badge { background: rgba(255,255,255,0.15); display: inline-block; padding: 4px 14px; border-radius: 20px; font-size: 12px; font-weight: 600; margin-bottom: 10px; }
    .botw h2 { font-family: var(--font-head); font-size: 28px; margin-bottom: 6px; }
    .botw p { font-size: 14px; opacity: .8; line-height: 1.6; max-width: 400px; }
    
    /* NOTIFICATION */
    .notif { position: fixed; top: 80px; right: 24px; z-index: 999; padding: 14px 20px; border-radius: 12px; font-size: 14px; font-weight: 500; box-shadow: var(--shadow); animation: notifIn .3s ease; max-width: 320px; }
    .notif.success { background: #dcfce7; color: #166534; border: 1px solid #bbf7d0; }
    .notif.error { background: #fee2e2; color: #991b1b; border: 1px solid #fecaca; }
    @keyframes notifIn { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }
    
    /* ABOUT */
    .about-hero { text-align: center; padding: 48px 0 40px; }
    .about-hero h1 { font-family: var(--font-head); font-size: 44px; color: var(--text); margin-bottom: 16px; }
    .about-hero p { font-size: 16px; color: var(--text-muted); max-width: 560px; margin: 0 auto; line-height: 1.8; }
    .values-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-top: 48px; }
    .value-card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 28px 20px; text-align: center; }
    .value-icon { font-size: 36px; margin-bottom: 12px; }
    .value-card h3 { font-size: 16px; font-weight: 600; margin-bottom: 8px; }
    .value-card p { font-size: 13px; color: var(--text-muted); line-height: 1.6; }
    
    /* CONTACT */
    .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; margin-top: 16px; }
    .contact-form { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 28px; }
    .form-group { margin-bottom: 18px; }
    .form-label { font-size: 13px; font-weight: 600; color: var(--text); margin-bottom: 6px; display: block; }
    .form-input { width: 100%; border: 1.5px solid var(--border); border-radius: 10px; padding: 10px 14px; font-size: 14px; font-family: var(--font-body); color: var(--text); background: var(--cream); outline: none; transition: border-color .2s; }
    .form-input:focus { border-color: var(--sage); }
    textarea.form-input { height: 120px; resize: vertical; }
    
    /* EREADER */
    .ereader { position: fixed; inset: 0; background: var(--cream); z-index: 200; display: flex; flex-direction: column; }
    .ereader-bar { background: var(--card); border-bottom: 1px solid var(--border); padding: 12px 24px; display: flex; align-items: center; justify-content: space-between; }
    .ereader-content { flex: 1; overflow-y: auto; max-width: 720px; margin: 0 auto; padding: 48px 32px; font-size: 17px; line-height: 1.9; color: var(--text); font-family: 'Palatino Linotype', 'Book Antiqua', Palatino, serif; }
    .ereader-content h2 { font-family: var(--font-head); font-size: 28px; margin-bottom: 24px; color: var(--sage-dark); }
    
    /* RESPONSIVE */
    @media (max-width: 768px) {
      .nav-links { display: none; }
      .hero { padding: 40px 28px; }
      .hero-stats { gap: 24px; }
      .dash-grid { grid-template-columns: 1fr; }
      .botw { flex-direction: column; text-align: center; }
      .contact-grid { grid-template-columns: 1fr; }
      .mobile-menu { display: block; }
    }
    
    /* MISC */
    .divider { height: 1px; background: var(--border); margin: 32px 0; }
    .tag { font-size: 12px; font-weight: 600; padding: 4px 10px; border-radius: 20px; background: var(--beige); color: var(--brown); display: inline-flex; align-items: center; gap: 4px; }
    .scroll-hint { color: var(--text-muted); font-size: 13px; margin-top: 16px; }
    .empty-state { text-align: center; padding: 48px; color: var(--text-muted); }
    .empty-state .emoji { font-size: 48px; margin-bottom: 12px; }
  `;

  // ── Pages ────────────────────────────────────────────────────────────────────
  const renderHome = () => (
    <div>
      {/* Book of the Week */}
      <div className="botw">
        <img src={BOOKS[0].cover} alt="Book of the Week" className="botw-cover" onError={e => e.target.style.background='#7aaa7a'} />
        <div>
          <div className="botw-badge">📚 Book of the Week</div>
          <h2>{BOOKS[0].title}</h2>
          <p style={{ marginBottom: 16 }}>by {BOOKS[0].author} · {BOOKS[0].genre}</p>
          <p>Building good habits and breaking bad ones through the science of tiny changes. A must-read for anyone looking to make lasting improvements in their life.</p>
          <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
            <button className="hero-btn-white" onClick={() => setPage("books")}>Browse Marketplace →</button>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="hero">
        <div className="hero-tag">🌿 Community-driven reading platform</div>
        <h1>Your Micro Library,<br />Your Community</h1>
        <p>Borrow, buy, rent, and discover books — safely and securely within your community. Read eBooks, join reading groups, and earn credits.</p>
        <div className="hero-btns">
          <button className="hero-btn-white" onClick={() => setPage("books")}>Explore Books</button>
          <button className="hero-btn-ghost" onClick={() => setPage("ebooks")}>Read eBooks</button>
        </div>
        <div className="hero-stats">
          {[["2,400+", "Books Listed"], ["1,200+", "Members"], ["340+", "Groups"], ["98%", "Safe Transactions"]].map(([n, l]) => (
            <div className="hero-stat" key={l}>
              <div className="hero-stat-num">{n}</div>
              <div className="hero-stat-label">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="section-header">
        <div>
          <div className="section-title">Everything You Need</div>
          <div className="section-subtitle">One platform for all your reading needs</div>
        </div>
      </div>
      <div className="features-grid">
        {[
          { icon: "📚", color: "#dcfce7", title: "Book Marketplace", desc: "Buy, borrow, or rent books from community members safely.", action: "books" },
          { icon: "📖", color: "#dbeafe", title: "eBook Library", desc: "Read eBooks in-app with no downloads needed.", action: "ebooks" },
          { icon: "👥", color: "#fef3c7", title: "Reading Groups", desc: "Join or create reading groups with like-minded readers.", action: "groups" },
          { icon: "💬", color: "#fce7f3", title: "Safe Chat", desc: "Chat with owners without sharing personal contact info.", action: null },
          { icon: "⭐", color: "#ede9fe", title: "Credits & Rewards", desc: "Earn credits for timely returns and invite friends.", action: "dashboard" },
          { icon: "🏆", color: "#ffedd5", title: "Leaderboard", desc: "See top readers and compete for the #1 spot.", action: "dashboard" },
        ].map(f => (
          <div key={f.title} className="feature-card" onClick={() => f.action && setPage(f.action)}>
            <div className="feature-icon" style={{ background: f.color }}><span style={{ fontSize: 24 }}>{f.icon}</span></div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Recent Books */}
      <div className="section-header">
        <div>
          <div className="section-title">Recently Listed</div>
        </div>
        <button className="btn-outline" onClick={() => setPage("books")}>View All</button>
      </div>
      <div className="books-grid">
        {BOOKS.slice(0, 4).map(book => (
          <BookCard 
           key={book.id}
            book={book} 
            onRequest={handleRequest} 
            onAction={showNotif}
            requestedBooks={requestedBooks}
          />
        ))}
      </div>
    </div>
  );

  const renderBooks = () => (
    <div>
      <div className="section-header">
        <div>
          <div className="section-title">Book Marketplace</div>
          <div className="section-subtitle">Borrow, buy, or rent books from the community</div>
        </div>
        <button className="btn-primary" onClick={() => showNotif("List a book feature coming soon!", "success")}>+ List a Book</button>
      </div>
      <div className="search-bar">
        <Icon d={Icons.search} size={16} stroke="var(--text-muted)" />
        <input placeholder="Search by title or author..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
      </div>
      <div className="filter-row">
        <span style={{ fontSize: 13, color: 'var(--text-muted)', alignSelf: 'center' }}>Genre:</span>
        {genres.map(g => <button key={g} className={`filter-btn ${filterGenre === g ? 'active' : ''}`} onClick={() => setFilterGenre(g)}>{g}</button>)}
      </div>
      <div className="filter-row">
        <span style={{ fontSize: 13, color: 'var(--text-muted)', alignSelf: 'center' }}>Type:</span>
        {types.map(t => <button key={t} className={`filter-btn ${filterType === t ? 'active' : ''}`} onClick={() => setFilterType(t)}>{t.charAt(0).toUpperCase() + t.slice(1)}</button>)}
      </div>
      {filteredBooks.length === 0 ? (
        <div className="empty-state"><div className="emoji">🔍</div><p>No books match your search.</p></div>
      ) : (
        <div className="books-grid">
          {filteredBooks.map(book => (
            <BookCard
             key={book}
              book={book} 
              onRequest={handleRequest} 
              onAction={showNotif}
              requestedBooks={requestedBooks}  />
          ))}
        </div>
      )}
    </div>
  );

  const renderEbooks = () => (
    <div>
      <div className="section-header">
        <div>
          <div className="section-title">eBook Library</div>
          <div className="section-subtitle">Read in-app · Free: 5–10 books, 30 min/day · Premium: Unlimited</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="tag">⏱ 22 min left today</span>
          <button className="btn-primary" onClick={() => setPage("about")}>Upgrade</button>
        </div>
      </div>
      <div style={{ background: 'linear-gradient(135deg, #fef3c7, #fde68a)', borderRadius: 14, padding: '14px 20px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }}>
        <span>💡</span>
        <span><strong>Free plan:</strong> 30 minutes of reading per day · 8 books available. <strong style={{ color: 'var(--sage-dark)', cursor: 'pointer' }} onClick={() => setPage("about")}>Upgrade to Premium</strong> for unlimited access, bookmarks & notes.</span>
      </div>
      <div className="ebook-grid">
        {EBOOKS.map(book => (
          <div key={book} className="ebook-card" onClick={() => { if (book.premium) { showNotif("This is a Premium eBook. Upgrade to unlock!", "error"); } else { setReadingBook(book); } }}>
            <img src={book.cover} alt={book.title} className="ebook-cover" onError={e => { e.target.style.background = '#e8f5e8'; e.target.style.display = 'flex'; }} />
            {book.premium && <div className="premium-badge">⭐ Premium</div>}
            <div className="ebook-info">
              <div className="book-title">{book.title}</div>
              <div className="book-author">{book.author}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 6 }}>{book.pages} pages · {book.genre}</div>
              <button className="btn-sm btn-sm-primary" style={{ width: '100%', marginTop: 10 }}>{book.premium ? '🔒 Premium' : '📖 Read Now'}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderGroups = () => (
    <div>
      <div className="section-header">
        <div>
          <div className="section-title">Reading Groups</div>
          <div className="section-subtitle">Join discussions, share recommendations</div>
        </div>
        <button className="btn-primary" onClick={() => showNotif("Free plan: 1 group creation. Upgrade for more!", "success")}>+ Create Group</button>
      </div>
      <div style={{ background: 'var(--sage-light)', borderRadius: 12, padding: '12px 18px', marginBottom: 24, fontSize: 13, color: 'var(--sage-dark)' }}>
        📋 <strong>Free plan:</strong> Join up to 3 groups, create 1 (max 10 members). Joined {joinedGroups.length}/3 groups.
      </div>
      <div className="groups-grid">
        {GROUPS.map(g => (
          <div key={g.id} className="group-card">
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
              <span className="group-dot" style={{ background: g.color }} />
              <span style={{ fontWeight: 700, fontSize: 15 }}>{g.name}</span>
              {g.active && <span style={{ marginLeft: 'auto', fontSize: 11, background: '#dcfce7', color: '#166534', padding: '2px 8px', borderRadius: 10, fontWeight: 600 }}>Active</span>}
            </div>
            <div style={{ display: 'flex', gap: 16, marginBottom: 16, fontSize: 13, color: 'var(--text-muted)' }}>
              <span>👥 {g.members} members</span>
              <span>📚 {g.books} books</span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {joinedGroups.includes(g.id) ? (
                <>
                  <button className="btn-sm btn-sm-primary" style={{ flex: 1 }} onClick={() => setChatOpen(true)}>💬 Group Chat</button>
                  <button className="btn-sm btn-sm-ghost" style={{ flex: 1 }} onClick={() => { setJoinedGroups(p => p.filter(x => x !== g.id)); showNotif(`Left ${g.name}`); }}>Leave</button>
                </>
              ) : (
                <button className="btn-sm btn-sm-primary" style={{ flex: 1 }} onClick={() => {
                  if (joinedGroups.length >= 3) { showNotif("Free plan limit: 3 groups. Upgrade for more!", "error"); return; }
                  setJoinedGroups(p => [...p, g.id]); showNotif(`Joined ${g.name}! 🎉`);
                }}>Join Group</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div>
      <div className="section-header" style={{ marginBottom: 28 }}>
        <div className="section-title">My Dashboard</div>
        <button className="btn-outline" onClick={() => showNotif("Logged out successfully!")}>Logout</button>
      </div>
      <div className="dash-grid">
        <div className="dash-sidebar">
          <div className="dash-card">
            <div className="dash-avatar">R</div>
            <div style={{ fontWeight: 700, fontSize: 17 }}>Reader_You</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Member since Jan 2025</div>
            <div className="plan-badge">📗 {userPlan} Plan</div>
            <div className="divider" style={{ margin: '16px 0' }} />
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>⭐ Credits: {userCredits}/30</div>
            <div className="credits-bar"><div className="credits-fill" style={{ width: `${(userCredits / 30) * 100}%` }} /></div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 6 }}>Earn more by returning books on time</div>
          </div>
          <div className="dash-card">
            <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 14 }}>📊 My Stats</div>
            <div className="dash-stat-grid">
              {[["18", "Books Read"], ["3", "Active Borrows"], ["1", "Groups"], ["16", "Credits"]].map(([n, l]) => (
                <div key={l} className="dash-stat">
                  <div className="dash-stat-num">{n}</div>
                  <div className="dash-stat-label">{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="dash-card">
            <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 14 }}>🏅 Badges Earned</div>
            {[["📚", "Bookworm", "Read 10+ books"], ["⏰", "Punctual", "On-time returns"], ["🤝", "Social", "Joined 1 group"]].map(([ic, t, d]) => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <span style={{ fontSize: 22 }}>{ic}</span>
                <div><div style={{ fontSize: 13, fontWeight: 600 }}>{t}</div><div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{d}</div></div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="dash-card" style={{ marginBottom: 20 }}>
            <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 16 }}>📋 Active Borrows</div>
            {BOOKS.slice(0, 2).map(b => (
              <div key={b.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                <img src={b.cover} alt={b.title} style={{ width: 44, height: 60, borderRadius: 6, objectFit: 'cover' }}onError={(e) => {
  e.target.onerror = null;
  e.target.src = "https://via.placeholder.com/200x300?text=No+Image";
}} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{b.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>by {b.author}</div>
                  <div style={{ fontSize: 12, color: '#dc2626', marginTop: 4 }}>⏰ Due in 5 days</div>
                </div>
                <button className="btn-sm btn-sm-ghost" style={{ width: 80 }} onClick={() => showNotif(`Returned "${b.title}" · +2 credits earned! ⭐`)}>Return</button>
              </div>
            ))}
          </div>
          <div className="dash-card" style={{ marginBottom: 20 }}>
            <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 16 }}>🏆 Leaderboard</div>
            <div className="leaderboard-table">
              {LEADERBOARD.map(l => (
                <div key={l.rank} className={`lb-row ${l.user === 'You' ? 'highlight' : ''}`}>
                  <div className="lb-rank">{l.badge}</div>
                  <div className="lb-user">{l.user} {l.user === 'You' && <span style={{ fontSize: 11, color: 'var(--sage-dark)', fontWeight: 400 }}>(You)</span>}</div>
                  <div className="lb-books">{l.books} books</div>
                  <div className="lb-credits">⭐ {l.credits}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="dash-card">
            <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 16 }}>💎 Use Credits</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[
                ["📚", "Extra Book", "10 credits"],
                ["⏰", "Extend Time", "5 credits"],
                ["🎯", "Priority Booking", "5 credits"],
                ["⭐", "Premium Trial", "20 credits"],
              ].map(([ic, t, c]) => (
                <div key={t} style={{ background: 'var(--beige)', borderRadius: 12, padding: 14, cursor: 'pointer' }} onClick={() => showNotif(`${t} redeemed! ${c} used.`)}>
                  <div style={{ fontSize: 22, marginBottom: 6 }}>{ic}</div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{t}</div>
                  <div style={{ fontSize: 12, color: 'var(--brown)', marginTop: 2 }}>{c}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAbout = () => (
    <div>
      <div className="about-hero">
        <div className="tag" style={{ marginBottom: 16 }}>🌿 Our Story</div>
        <h1>Built for Book Lovers,<br />by Book Lovers</h1>
        <p>Micro Library started as a college project to help students access books affordably. Today, we're a growing community of readers who believe every book deserves to be read.</p>
      </div>
      <div className="divider" />
      <div className="section-title" style={{ textAlign: 'center', marginBottom: 8 }}>💎 Membership Plans</div>
      <div style={{ textAlign: 'center', fontSize: 14, color: 'var(--text-muted)', marginBottom: 8 }}>Choose the plan that fits your reading life</div>
      <div className="pricing-grid">
        {[
          { name: "Free", price: "₹0", period: "/month", features: ["4 books/month", "1 active borrow", "Join 3 groups", "8 eBooks (30 min/day)", "Basic chat"], btn: "Current Plan", featured: false },
          { name: "Premium", price: "₹149", period: "/month", features: ["8 books/month", "3 active borrows", "More groups", "Unlimited eBooks", "Bookmarks & notes", "Priority support"], btn: "Upgrade Now", featured: true },
          { name: "Creator", price: "₹299", period: "/month", features: ["12 books/month", "5 active borrows", "Host events", "Sell eBooks/books", "Creator badge", "Revenue sharing"], btn: "Go Creator", featured: false },
        ].map(p => (
          <div key={p.name} className={`pricing-card ${p.featured ? 'featured' : ''}`}>
            {p.featured && <div style={{ marginBottom: 12 }}><span className="tag">⭐ Most Popular</span></div>}
            <div style={{ fontFamily: 'var(--font-head)', fontSize: 24, marginBottom: 4 }}>{p.name}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 20 }}>
              <span className="pricing-price">{p.price}</span>
              <span className="pricing-period">{p.period}</span>
            </div>
            {p.features.map(f => (
              <div key={f} className="pricing-feature"><span>✓</span>{f}</div>
            ))}
            <button className={`btn-primary`} style={{ width: '100%', marginTop: 20, opacity: p.name === 'Free' ? 0.5 : 1 }} onClick={() => p.name !== 'Free' && showNotif(`${p.name} plan selected! Redirecting to payment...`)}>
              {p.btn}
            </button>
          </div>
        ))}
      </div>
      <div className="values-grid">
        {[["🔒", "Privacy First", "We never share your contact info. Chat safely without revealing personal details."], ["📚", "Community Driven", "Every book listed, every group created — all by passionate readers like you."], ["♻️", "Sustainable Reading", "Sharing books reduces waste and makes reading affordable for everyone."], ["⭐", "Trust & Safety", "Reviews, ratings, and admin moderation keep our community safe."]].map(([ic, t, d]) => (
          <div key={t} className="value-card">
            <div className="value-icon">{ic}</div>
            <h3>{t}</h3>
            <p>{d}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContact = () => (
    <div>
      <div style={{ marginBottom: 32 }}>
        <div className="section-title">Get in Touch</div>
        <div className="section-subtitle">We'd love to hear from you — questions, feedback, or just to say hi 👋</div>
      </div>
      <div className="contact-grid">
        <div className="contact-form">
          <div style={{ fontFamily: 'var(--font-head)', fontSize: 20, marginBottom: 20 }}>Send us a Message</div>
          <div className="form-group">
            <label className="form-label">Your Name</label>
            <input className="form-input" placeholder="Enter your name" />
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input className="form-input" type="email" placeholder="your@email.com" />
          </div>
          <div className="form-group">
            <label className="form-label">Subject</label>
            <input className="form-input" placeholder="What's this about?" />
          </div>
          <div className="form-group">
            <label className="form-label">Message</label>
            <textarea className="form-input" placeholder="Tell us what's on your mind..." />
          </div>
          <button className="btn-primary" style={{ width: '100%' }} onClick={() => showNotif("Message sent! We'll reply within 24 hours. 📬")}>Send Message</button>
        </div>
        <div>
          <div className="dash-card" style={{ marginBottom: 16 }}>
            <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 16 }}>📬 Contact Info</div>
            {[["📧", "Email", "hello@microlibrary.in"], ["📍", "Location", "Mumbai, Maharashtra"], ["🕐", "Response Time", "Within 24 hours"], ["💬", "Live Chat", "Available 9AM–9PM IST"]].map(([ic, l, v]) => (
              <div key={l} style={{ display: 'flex', gap: 12, marginBottom: 14, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 20 }}>{ic}</span>
                <div><div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{l}</div><div style={{ fontSize: 14, fontWeight: 500 }}>{v}</div></div>
              </div>
            ))}
          </div>
          <div className="dash-card">
            <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 12 }}>🙋 FAQs</div>
            {[["How does borrowing work?", "Browse listings, click Borrow, and coordinate pick-up via in-app chat — no personal info shared."], ["Is my contact info safe?", "Yes! Our chat blocks phone numbers, emails, and @ handles automatically."], ["How do I earn credits?", "Return books on time (+2), early returns (+3), invite friends (+3)."]].map(([q, a]) => (
              <div key={q} style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{q}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6 }}>{a}</div>
              </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  );

  const pages = { home: renderHome, books: renderBooks, ebooks: renderEbooks, groups: renderGroups, dashboard: renderDashboard, about: renderAbout, contact: renderContact, login: renderLogin,
  signup: renderSignup };

  return (
    <>
      <style>{css}</style>
      <div className="app">
        {/* eBook Reader Overlay */}
     
        {readingBook && (
          <div className="ereader">
            <div className="ereader-bar">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <button className="btn-outline" style={{ padding: '6px 12px', fontSize: 13 }} onClick={() => setReadingBook(null)}>← Back</button>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{readingBook.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{readingBook.author}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span className="tag">⏱ 22 min left</span>
                <button className="btn-primary" style={{ fontSize: 12 }} onClick={() => showNotif("Bookmark saved! ⭐")}>🔖 Bookmark</button>
              </div>
            </div>
            <div className="ereader-content">
              <h2>Chapter 1: The Surprising Power of Atomic Habits</h2>
              <p>It is so easy to overestimate the importance of one defining moment and underestimate the value of making small improvements on a daily basis. Too often, we convince ourselves that massive success requires massive action.</p>
              <p>Whether it is losing weight, building a business, writing a book, winning a championship, or achieving any other goal, we put pressure on ourselves to make some earth-shattering improvement that everyone will talk about.</p>
              <p>Meanwhile, improving by 1 percent isn't particularly notable—sometimes it isn't even noticeable—but it can be far more meaningful, especially in the long run. The difference a tiny improvement can make over time is astounding. Here's how the math works out: if you can get 1 percent better each day for one year, you'll end up thirty-seven times better by the time you're done.</p>
              <p>Habits are the compound interest of self-improvement. The same way that money multiplies through compound interest, the effects of your habits multiply as you repeat them. They seem to make little difference on any given day and yet the impact they deliver over the months and years can be enormous.</p>
              <p>It doesn't matter how successful or unsuccessful you are right now. What matters is whether your habits are putting you on the path toward success. You should be far more concerned with your current trajectory than with your current results.</p>
              <div style={{ background: 'var(--sage-light)', border: '1px solid var(--sage)', borderRadius: 12, padding: 20, margin: '32px 0', textAlign: 'center', color: 'var(--sage-dark)' }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>⏰</div>
                <div style={{ fontWeight: 600 }}>Reading limit: 22 minutes remaining today</div>
                <div style={{ fontSize: 13, marginTop: 6 }}>Upgrade to Premium for unlimited reading + bookmarks + notes</div>
                <button className="btn-primary" style={{ marginTop: 14 }} onClick={() => { setReadingBook(null); setPage("about"); }}>Upgrade to Premium</button>
              </div>
            </div>
          </div>
        )}

        {/* Notification */}
        {notification && <div className={`notif ${notification.type}`}>{notification.msg}</div>}

        {/* NAV */}
        <nav className="nav">
          <div className="nav-inner">
            <div className="nav-logo" onClick={() => setPage("home")}>
              <span>📚</span> Micro Library
            </div>
            <div className="nav-links">
              {[["home", "Home"], ["books", "Books"], ["ebooks", "eBooks"], ["groups", "Groups"], ["dashboard", "Dashboard"], ["about", "About"], ["contact", "Contact"]].map(([p, l]) => (
                <button key={p} className={`nav-link ${page === p ? 'active' : ''}`} onClick={() => setPage(p)}>{l}</button>
              ))}
            </div>
            <div className="nav-actions">
              <div className="credits-badge">⭐ {userCredits}</div>
              <button className="btn-primary" onClick={() => setPage("dashboard")}>My Account</button>
              <button className="btn-outline" onClick={() => setPage("login")}>Login</button>
              <button className="btn-primary" onClick={() => setPage("signup")}>Sign Up</button>
            </div>
          </div>
        </nav>

        {/* MAIN */}
        <main className="main">
          {(pages[page] || renderHome)()}
        </main>

        {/* FOOTER */}
        <footer style={{ background: '#1a2e1a', color: 'rgba(255,255,255,0.7)', padding: '32px 20px', textAlign: 'center', fontSize: 13 }}>
          <div style={{ fontFamily: 'var(--font-head)', fontSize: 18, color: 'white', marginBottom: 8 }}>📚 Micro Library</div>
          <div>A community-driven reading platform · Built with 🌿 for book lovers in India</div>
          <div style={{ marginTop: 12, display: 'flex', justifyContent: 'center', gap: 24 }}>
            {["Home", "Books", "eBooks", "Groups", "About", "Contact"].map(l => (
              <span key={l} style={{ cursor: 'pointer', color: 'rgba(255,255,255,0.5)' }} onClick={() => setPage(l.toLowerCase())}>{l}</span>
            ))}
          </div>
          <div style={{ marginTop: 16, color: 'rgba(255,255,255,0.4)' }}>© 2025 Micro Library · Privacy Policy · Terms of Service</div>
        </footer>

        {/* CHAT */}
        <div className="chat-overlay">
          {chatOpen && (
            <div className="chat-window">
              <div className="chat-header">
                <div className="chat-header-info">
                  <span className="chat-user">💬 Chat with Arjun_R</span>
                  <span className="chat-sub">About: Atomic Habits · Online</span>
                </div>
                <button style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', width: 28, height: 28, borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setChatOpen(false)}>
                  <Icon d={Icons.x} size={14} />
                </button>
              </div>
              <div className="safety-note">🔒 Personal contact info (numbers, emails) is blocked for your safety</div>
              <div className="chat-messages">
                {messages.map(m => (
                  <div key={m.id}>
                    {!m.mine && <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 3 }}>{m.from}</div>}
                    <div className={`chat-bubble ${m.mine ? 'mine' : 'theirs'}`}>
                      {m.text}
                      <div className="chat-time">{m.time}</div>
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
              <div className="chat-input-row">
                <input className="chat-input" placeholder="Type a message..." value={chatMsg} onChange={e => setChatMsg(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendChat()} />
                <button className="chat-send-btn" onClick={sendChat}><Icon d={Icons.send} size={14} /></button>
              </div>
            </div>
          )}
          <button className="chat-fab" onClick={() => showNotif("Chat unlocks after request approval 🔒")}>
            <Icon d={chatOpen ? Icons.x : Icons.chat[0]} size={22} />
          </button>
        </div>
      </div>
    </>
  );
}

// ── BookCard Component ─────────────────────────────────────────────────────────
function BookCard({ book, onRequest, onAction, requestedBooks }) {

  // ✅ JS goes here (outside JSX)
  const isRequested = requestedBooks?.some(b => b.id === book.id);

  return (
    <div className="book-card">
      <img 
        src={book.cover} 
        alt={book.title} 
        className="book-cover" 
        onError={e => { 
          e.target.style.background = '#e8f5e8'; 
          e.target.src = ''; 
        }} 
      />

      <div className="book-info">
        <div className="book-title">{book.title}</div>
        <div className="book-author">by {book.author}</div>

        <div className="book-meta">
          <span className="book-price">₹{book.price}</span>
          <span className={`book-type type-${book.type}`}>{book.type}</span>
        </div>

        <div className="book-meta" style={{ marginTop: 6 }}>
          <div className="book-rating">
            <span style={{ color: '#f59e0b' }}>★</span> {book.rating} ({book.reviews})
          </div>
          <span className={`book-status-badge status-${book.status}`}>
            {book.status}
          </span>
        </div>

        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 6 }}>
          📗 {book.genre} · 🔑 {book.owner}
        </div>

        {book.type === 'rent' && (
          <div style={{ fontSize: 12, color: '#b45309', marginTop: 4 }}>
            🗓 Rent: ₹{book.rent}/week
          </div>
        )}
      </div>

      <div className="book-actions">
        <button 
          className="btn-sm btn-sm-primary"
          onClick={() => onAction(`"${book.title}" ${book.type === 'borrow' ? 'borrowed' : book.type === 'rent' ? 'rented' : 'purchase initiated'}! 🎉`)}
        >
          {book.type === 'borrow' ? 'Borrow' : book.type === 'rent' ? 'Rent' : 'Buy'}
        </button>

        <button 
          className="btn-sm btn-sm-ghost"
          disabled={isRequested}
          onClick={() => onRequest(book)}
        >
          {isRequested ? "✅ Requested" : "📩 Request"}
        </button>
      </div>
    </div>
  );
}