import React, { useEffect, useRef, useState } from "react";
import "./HomePage.css";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

const features = [
  {
    icon: "📅",
    title: "Events & Announcements",
    desc: "Stay ahead with real-time campus events, fests, and official notices — all in one feed.",
    tag: "Live",
  },
  {
    icon: "💬",
    title: "Discussion Forums",
    desc: "Engage in meaningful conversations with peers across departments and years.",
    tag: "Community",
  },
  {
    icon: "📚",
    title: "Study Resources",
    desc: "Access and share notes, PYQs, and study material curated by your seniors.",
    tag: "Academic",
  },
  {
    icon: "⚡",
    title: "Real-Time Chat",
    desc: "Connect instantly with classmates, project groups, and club teams.",
    tag: "Instant",
  },
  {
    icon: "🔍",
    title: "Lost & Found",
    desc: "Report and recover lost items across campus with location-based tracking.",
    tag: "Campus",
  },
  {
    icon: "🏛️",
    title: "Club Activities",
    desc: "Discover, join, and manage clubs — from tech to arts to sports.",
    tag: "Explore",
  },
];

const stats = [
  { value: "12K+", label: "Active Students" },
  { value: "200+", label: "Campus Events" },
  { value: "50+", label: "Clubs & Societies" },
  { value: "98%", label: "Satisfaction Rate" },
];

export default function HomePage() {
  const { user, logout } = useApp();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="cc-root">
      <nav className={`cc-nav ${scrolled ? "cc-nav--scrolled" : ""}`}>
        <div className="cc-nav__logo">
          <span className="cc-nav__logo-mark">CC</span>
          <span className="cc-nav__logo-text">CampusConnect</span>
        </div>
        <ul className="cc-nav__links">
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#features">Features</a>
          </li>
          {user && (
            <li>
              <a href="/dashboard">Dashboard</a>
            </li>
          )}
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
        <div className="cc-nav__actions">
          {user && Object.keys(user).length > 0 ? (
            <button onClick={handleLogout} className="btn-ghost">
              Log Out
            </button>
          ) : (
            <div>
              <Link to="/login" className="btn-ghost">
                Log In
              </Link>
              <Link to="/register" className="btn-gold">
                Join{" "}
              </Link>
            </div>
          )}
        </div>
      </nav>

      <section className="cc-hero" ref={heroRef}>
        <div className="cc-hero__eyebrow reveal">
          <span className="pulse-dot" />
          Your Campus. Connected.
        </div>
        <h1 className="cc-hero__title reveal">
          Where Campus Life
          <br />
          <em>Comes Alive</em>
        </h1>
        <p className="cc-hero__sub reveal">
          CampusConnect is the all-in-one platform bringing students together —
          through events, forums, shared notes, real-time chat, and more.
        </p>
        <div className="cc-hero__cta reveal">
          <button className="btn-gold btn-lg">Get Started →</button>
          <button className="btn-outline">Watch Demo</button>
        </div>
        <div className="cc-hero__chips">
          <span className="chip chip--1">📅 Events</span>
          <span className="chip chip--2">💬 Forums</span>
          <span className="chip chip--3">📚 Notes</span>
          <span className="chip chip--4">⚡ Chat</span>
        </div>

        <div className="cc-hero__card reveal">
          <div className="hero-card-inner">
            <div className="hero-card-row">
              <div className="hero-card-avatar">R</div>
              <div>
                <div className="hero-card-name">
                  Ronak joined <strong>TechClub</strong>
                </div>
                <div className="hero-card-time">Just now</div>
              </div>
              <span className="hero-card-badge">New</span>
            </div>
            <div className="hero-card-row">
              <div
                className="hero-card-avatar"
                style={{ background: "#2a6049" }}
              >
                P
              </div>
              <div>
                <div className="hero-card-name">
                  Priya shared <strong>DSA Notes</strong>
                </div>
                <div className="hero-card-time">2 min ago</div>
              </div>
            </div>
            <div className="hero-card-row">
              <div
                className="hero-card-avatar"
                style={{ background: "#4a2a6a" }}
              >
                S
              </div>
              <div>
                <div className="hero-card-name">
                  Saurabh posted in <strong>Lost & Found</strong>
                </div>
                <div className="hero-card-time">5 min ago</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="cc-stats">
        {stats.map((s, i) => (
          <div className="cc-stat reveal" key={i}>
            <span className="cc-stat__value">{s.value}</span>
            <span className="cc-stat__label">{s.label}</span>
          </div>
        ))}
      </section>

      {/* ── ABOUT ── */}
      <section className="cc-about" id="about">
        <div className="cc-about__left reveal">
          <p className="section-eyebrow">What is CampusConnect?</p>
          <h2 className="section-title">
            Built for students,
            <br />
            <em>by students.</em>
          </h2>
          <p className="section-body">
            CampusConnect is a platform designed to break down silos in campus
            life. Whether you're looking for study partners, club announcements,
            or just want to know what's happening on campus today — it's all
            here, in one place.
          </p>
          <button className="btn-gold">Explore Platform →</button>
        </div>
        <div className="cc-about__right reveal">
          <div className="about-visual">
            <div className="about-ring about-ring--1" />
            <div className="about-ring about-ring--2" />
            <div className="about-center">🎓</div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="cc-features" id="features">
        <div className="cc-features__header reveal">
          <p className="section-eyebrow">What's Inside</p>
          <h2 className="section-title">
            Everything your campus needs,
            <br />
            <em>unified.</em>
          </h2>
        </div>
        <div className="cc-features__grid">
          {features.map((f, i) => (
            <div
              className="feature-card reveal"
              key={i}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="feature-card__top">
                <span className="feature-card__icon">{f.icon}</span>
                <span className="feature-card__tag">{f.tag}</span>
              </div>
              <h3 className="feature-card__title">{f.title}</h3>
              <p className="feature-card__desc">{f.desc}</p>
              <div className="feature-card__hover-line" />
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="cc-cta reveal">
        <div className="cc-cta__inner">
          <h2 className="cc-cta__title">Ready to plug in?</h2>
          <p className="cc-cta__sub">
            Join thousands of students already connected on campus.
          </p>
          <button className="btn-gold btn-lg">Create Your Account →</button>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="cc-contact" id="contact">
        <div className="cc-contact__left reveal">
          <p className="section-eyebrow">Contact</p>
          <h2 className="section-title">Let's talk.</h2>
          <p className="section-body">
            Have a question, feedback, or want to partner with us? Drop us a
            message.
          </p>
          <div className="cc-contact__info">
            <span>📧 hello@campusconnect.in</span>
            <span>📍 Campus Hub, Block C</span>
          </div>
        </div>
        <div className="cc-contact__form reveal">
          <input className="cc-input" type="text" placeholder="Your Name" />
          <input
            className="cc-input"
            type="email"
            placeholder="Email Address"
          />
          <textarea
            className="cc-input cc-textarea"
            placeholder="Your Message"
            rows={4}
          />
          <button className="btn-gold">Send Message →</button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="cc-footer">
        <div className="cc-footer__logo">
          <span className="cc-nav__logo-mark">CC</span>
          <span>CampusConnect</span>
        </div>
        <p className="cc-footer__copy">
          © 2025 CampusConnect. Made with ❤️ for students.
        </p>
        <div className="cc-footer__links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Support</a>
        </div>
      </footer>
    </div>
  );
}
