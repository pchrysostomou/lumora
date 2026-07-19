"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, User, Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { loadDrafts } from "@/lib/storage";

const NAV_LINKS = [
  {
    label: "Destinations",
    href: "/collections/all",
    dropdown: [
      { label: "All Photobooks", href: "/collections/all" },
      { label: "Europe Escapes", href: "/collections/europe" },
      { label: "Island Getaways", href: "/collections/islands" },
      { label: "Asian Adventures", href: "/collections/asia" },
      { label: "City Breaks", href: "/collections/cities" },
    ],
  },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "Gift Cards", href: "/gift-cards" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    // Cart badge = drafts in progress; refresh when another tab saves one.
    const refresh = () => setCartCount(loadDrafts().length);
    refresh();
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  return (
    <>
      {/* Announcement bar */}
      <div className="announcement-bar" style={{ background: "#0B1629", color: "rgba(255,255,255,0.85)", letterSpacing: "0.04em" }}>
        ✦ Free shipping on orders over €50  ·  Use code <strong style={{ color: "#C4973A" }}>LUMORA15</strong> for 15% off your first order
      </div>

      {/* Main header */}
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/98 backdrop-blur-md shadow-[0_2px_20px_rgba(11,22,41,0.1)]"
            : "bg-[#F7F9FC]"
        )}
      >
        <div className="container">
          <div className="flex items-center justify-between h-16 md:h-[70px]">
            {/* Logo — geometric diamond mark */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div style={{
                width: "32px", height: "32px",
                background: "linear-gradient(135deg, #1A3A6B 0%, #0F2447 100%)",
                borderRadius: "6px",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 2px 8px rgba(26,58,107,0.3)",
              }}>
                <span style={{
                  color: "#C4973A",
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700, fontSize: "15px", lineHeight: 1,
                }}>L</span>
              </div>
              <span style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "22px", fontWeight: 700,
                color: "#0B1629", letterSpacing: "-0.02em",
                transition: "color 200ms",
              }} className="group-hover:text-[#1A3A6B]">
                Lumora
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-[#0B1629] hover:text-[#1A3A6B] hover:bg-[#EBF0FA] transition-all"
                  >
                    {link.label}
                    {link.dropdown && (
                      <ChevronDown
                        size={14}
                        className={cn(
                          "transition-transform",
                          activeDropdown === link.label && "rotate-180"
                        )}
                      />
                    )}
                  </Link>

                  {/* Dropdown */}
                  {link.dropdown && activeDropdown === link.label && (
                    <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-[0_8px_32px_rgba(11,22,41,0.12)] border border-[#DDE3EF] py-2 animate-fade-in">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="block px-4 py-2.5 text-sm text-[#0B1629] hover:text-[#1A3A6B] hover:bg-[#EBF0FA] transition-colors"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-1">
              <Link
                href="/dashboard"
                className="hidden md:flex btn btn-ghost btn-sm gap-2"
                aria-label="Dashboard"
              >
                <User size={18} />
                <span className="text-sm">Dashboard</span>
              </Link>

              <Link
                href="/dashboard"
                className="relative btn btn-ghost btn-sm"
                aria-label="Saved projects"
              >
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#C9806A] text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>

              <Link
                href="/collections/all"
                className="hidden md:flex btn btn-sm ml-2"
                style={{ background: "#1A3A6B", color: "#fff", fontWeight: 600 }}
              >
                Start Designing
              </Link>

              {/* Mobile / hamburger menu toggle */}
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
                style={{ display:"flex", alignItems:"center", justifyContent:"center", width:"40px", height:"40px", borderRadius:"8px", border:"1px solid #DDE3EF" }}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile nav overlay ── */}
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <div
              onClick={() => setMobileOpen(false)}
              style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.4)", zIndex:40 }}
            />
            {/* Drawer */}
            <div style={{
              position:"fixed", top:0, right:0, bottom:0, width:"min(320px,90vw)",
              background:"#fff", zIndex:50, overflowY:"auto",
              boxShadow:"-8px 0 32px rgba(0,0,0,0.15)",
              animation:"slideInRight .25s ease",
            }}>
              {/* Drawer header */}
              <div style={{ padding:"20px 24px", borderBottom:"1px solid #EBF0FA", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <span style={{ fontFamily:"'Playfair Display',serif", fontSize:"20px", fontWeight:700, color:"#0B1629" }}>Lumora</span>
                <button onClick={() => setMobileOpen(false)} style={{ background:"none", border:"none", cursor:"pointer", padding:"4px" }}><X size={22} color="#666"/></button>
              </div>
              {/* Nav links */}
              <div style={{ padding:"16px 0" }}>
                {NAV_LINKS.map((link) => (
                  <div key={link.label}>
                    <Link
                      href={link.href}
                      style={{ display:"block", padding:"14px 24px", fontWeight:600, fontSize:"15px", color:"#0B1629", textDecoration:"none", borderBottom:"1px solid #f5f5f5" }}
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                    {link.dropdown && (
                      <div style={{ background:"#F7F9FC" }}>
                        {link.dropdown.slice(1).map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            style={{ display:"block", padding:"10px 36px", fontSize:"14px", color:"#5B6B8A", textDecoration:"none", borderBottom:"1px solid #eee" }}
                            onClick={() => setMobileOpen(false)}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {/* Actions */}
              <div style={{ padding:"20px 24px", display:"flex", flexDirection:"column", gap:"12px", borderTop:"1px solid #EBF0FA" }}>
                <Link href="/dashboard" style={{ display:"block", textAlign:"center", padding:"12px", border:"1.5px solid #DDE3EF", borderRadius:"10px", color:"#0B1629", fontWeight:600, textDecoration:"none" }} onClick={() => setMobileOpen(false)}>
                  Dashboard
                </Link>
                <Link href="/collections/all" style={{ display:"block", textAlign:"center", padding:"12px", background:"#1A3A6B", borderRadius:"10px", color:"#fff", fontWeight:700, textDecoration:"none" }} onClick={() => setMobileOpen(false)}>
                  Start Designing
                </Link>
                <Link href="/pricing" style={{ display:"block", textAlign:"center", padding:"12px", background:"#C4973A", borderRadius:"10px", color:"#0B1629", fontWeight:700, textDecoration:"none" }} onClick={() => setMobileOpen(false)}>
                  View Pricing
                </Link>
              </div>
            </div>
          </>
        )}
        <style>{`@keyframes slideInRight { from { transform:translateX(100%) } to { transform:translateX(0) } }`}</style>
      </header>
    </>
  );
}
