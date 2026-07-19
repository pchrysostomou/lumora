"use client";

import Link from "next/link";
import { useState } from "react";

function InstagramIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}
function FacebookIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}
function YoutubeIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#1a1a1a"/>
    </svg>
  );
}

const FOOTER_LINKS = {
  Destinations: [
    { label: "All Destinations", href: "/collections/all" },
    { label: "Europe Escapes", href: "/collections/europe" },
    { label: "Island Getaways", href: "/collections/islands" },
    { label: "Asian Adventures", href: "/collections/asia" },
    { label: "City Breaks", href: "/collections/cities" },
  ],
  Help: [
    { label: "How It Works", href: "/how-it-works" },
    { label: "Shipping & Delivery", href: "/shipping" },
    { label: "Returns & Refunds", href: "/returns" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact Us", href: "/contact" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Pricing", href: "/pricing" },
    { label: "Gift Cards", href: "/gift-cards" },
    { label: "Press", href: "/press" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <footer style={{ backgroundColor: "#1A1A1A", color: "#FAF9F7" }}>

      {/* Newsletter */}
      <div className="footer-newsletter">
        <div className="footer-newsletter-inner">
          <div className="footer-newsletter-text">
            <h3>Stay inspired</h3>
            <p>Design tips, new templates, and exclusive offers.</p>
          </div>
          {subscribed ? (
            <p style={{ color: "#C9806A", fontWeight: 600, fontSize: "15px" }}>
              ✓ You&apos;re in! Check your inbox soon.
            </p>
          ) : (
            <form className="footer-newsletter-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email address"
                className="footer-newsletter-input"
                required
              />
              <button type="submit" className="footer-subscribe-btn">
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Links grid */}
      <div className="footer-links-grid">

        {/* Brand */}
        <div className="footer-brand">
          <Link href="/" className="footer-logo">
            <div className="footer-logo-icon">
              <span style={{ color: "#fff", fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: "16px" }}>L</span>
            </div>
            <span className="footer-logo-name">Lumora</span>
          </Link>
          <p className="footer-brand-desc">
            Turn your memories into beautiful, professionally printed photobooks.
          </p>
          <div className="footer-social">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Instagram">
              <InstagramIcon />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Facebook">
              <FacebookIcon />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="YouTube">
              <YoutubeIcon />
            </a>
          </div>
        </div>

        {/* Nav columns */}
        {Object.entries(FOOTER_LINKS).map(([title, links]) => (
          <div key={title} className="footer-col">
            <h4>{title}</h4>
            <ul>
              {links.map(link => (
                <li key={link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p className="footer-copyright">
            © {new Date().getFullYear()} Lumora. All rights reserved.
          </p>
          <div className="footer-payment-badges">
            {["VISA", "MC", "PayPal", "Stripe"].map(m => (
              <span key={m} className="footer-payment-badge">{m}</span>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
}
