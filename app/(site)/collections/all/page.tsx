"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { Star, ArrowUpDown, ChevronRight } from "lucide-react";
import { PRODUCTS, type Product } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

// ── Filter categories ─────────────────────────────────────────────────────────
const CATEGORIES = [
  { key: "all",        label: "Shop All" },
  { key: "travel",     label: "Travel" },
  { key: "wedding",    label: "Wedding" },
  { key: "baby",       label: "Baby & Family" },
  { key: "anniversary",label: "Anniversary" },
  { key: "graduation", label: "Graduation" },
];

const SORT_OPTIONS = [
  { key: "popular",   label: "Most Popular" },
  { key: "newest",    label: "Newest" },
  { key: "price_asc", label: "Price: Low to High" },
  { key: "price_desc",label: "Price: High to Low" },
];

// ── Travel series label ───────────────────────────────────────────────────────
const TRAVEL_IDS = new Set(["9","10","11","12","13","14","15","16"]);

// ── Star rating ───────────────────────────────────────────────────────────────
function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:"6px" }}>
      <div style={{ display:"flex", gap:"2px" }}>
        {[1,2,3,4,5].map(s => (
          <Star key={s} size={13} fill={s<=Math.round(rating)?"#C4973A":"none"} color={s<=Math.round(rating)?"#C4973A":"#ccc"} />
        ))}
      </div>
      <span style={{ fontSize:"12px", color:"#888" }}>({count})</span>
    </div>
  );
}

// ── Product card — Pixory-style upright book ──────────────────────────────────
function ProductCard({ product, idx }: { product: Product; idx: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const isTravelDest = TRAVEL_IDS.has(product.id);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="lumora-card group"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.5s ease ${idx * 0.07}s, transform 0.5s ease ${idx * 0.07}s`,
      }}
    >
      {/* Book image — standing upright like Pixory */}
      <div className="lumora-card-img" style={{ position:"relative" }}>
        <Link href={`/products/${product.slug}`} className="absolute inset-0 z-10" aria-label={product.title}/>
        
        {product.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.coverImage}
            alt={product.title}
            style={{
              width:"100%", height:"100%", objectFit:"cover", display:"block",
              transition:"transform 0.4s ease",
            }}
            className="group-hover:scale-[1.03]"
          />
        ) : (
          <div style={{ width:"100%", height:"100%", background:"#e8e0f0" }} />
        )}

        {/* Overlay badges */}
        <div style={{ position:"absolute", top:"10px", left:"10px", zIndex:20, display:"flex", flexDirection:"column", gap:"5px" }}>
          {product.isBestseller && (
            <span className="lumora-badge-gold">Bestseller</span>
          )}
          {product.isNew && (
            <span className="lumora-badge-navy">New</span>
          )}
          {isTravelDest && (
            <span className="lumora-badge-travel">✈ Travel Series</span>
          )}
        </div>

        {/* Hover CTA */}
        <div className="lumora-card-hover-cta">
          <Link
            href={`/editor/${product.id}`}
            className="lumora-cta-btn"
            style={{ position:"relative", zIndex:30 }}
          >
            Start My Design
          </Link>
        </div>
      </div>

      {/* Info below */}
      <div className="lumora-card-info">
        <p className="lumora-card-cat">{product.category}</p>
        <h3 className="lumora-card-title">{product.title}</h3>
        <p className="lumora-card-desc">{product.description.split(".")[0]}.</p>
        <StarRating rating={product.rating} count={product.reviewCount} />
        <div className="lumora-card-footer">
          <div>
            <span className="lumora-card-from">from </span>
            <span className="lumora-card-price">{formatPrice(product.basePrice)}</span>
          </div>
          <Link href={`/products/${product.slug}`} className="lumora-card-details" style={{ position:"relative", zIndex:20 }}>
            Details <ChevronRight size={13} style={{ display:"inline" }}/>
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Featured travel banner ────────────────────────────────────────────────────
function TravelBanner({ onBrowse }: { onBrowse: () => void }) {
  const travels = PRODUCTS.filter(p => TRAVEL_IDS.has(p.id)).slice(0, 4);
  return (
    <div className="travel-banner">
      <div className="travel-banner-text">
        <span className="travel-series-tag">✈ Travel Series</span>
        <h2>Destination Photobooks</h2>
        <p>Turn your trips into premium keepsakes. Covers for every corner of the world.</p>
        <button onClick={onBrowse} className="travel-banner-link">Browse all destinations →</button>
      </div>
      <div className="travel-banner-books">
        {travels.map((p, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={p.id}
            src={p.coverImage}
            alt={p.title}
            className="travel-book-thumb"
            style={{
              transform: `rotate(${(i - 1.5) * 6}deg) translateY(${i % 2 === 0 ? -8 : 8}px)`,
              zIndex: i,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function CollectionsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");

  const filtered = useMemo(() => {
    const list = activeCategory === "all"
      ? [...PRODUCTS]
      : PRODUCTS.filter(p => p.category === activeCategory);
    switch (sortBy) {
      case "price_asc":  list.sort((a,b)=>a.basePrice-b.basePrice); break;
      case "price_desc": list.sort((a,b)=>b.basePrice-a.basePrice); break;
      case "newest":     list.sort((a,b)=>(b.isNew?1:0)-(a.isNew?1:0)); break;
      default:           list.sort((a,b)=>b.reviewCount-a.reviewCount);
    }
    return list;
  }, [activeCategory, sortBy]);

  const showTravelBanner = (activeCategory === "all" || activeCategory === "travel");

  return (
    <>
      {/* ── Inline styles ── */}
      <style>{`
        /* ── Card ── */
        .lumora-card { background:#fff; border-radius:12px; overflow:hidden; border:1px solid #eee; box-shadow:0 2px 12px rgba(0,0,0,0.06); display:flex; flex-direction:column; }
        .lumora-card:hover { box-shadow:0 8px 32px rgba(0,0,0,0.13); transform:translateY(-4px) !important; }
        .lumora-card-img { position:relative; aspect-ratio:2/3; overflow:hidden; background:#f5f5f5; }
        .lumora-card-info { padding:16px; display:flex; flex-direction:column; gap:6px; flex:1; }
        .lumora-card-cat { font-size:10px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:#C4973A; }
        .lumora-card-title { font-family:'Playfair Display',serif; font-size:16px; font-weight:700; color:#0B1629; line-height:1.3; }
        .lumora-card-desc { font-size:12px; color:#888; line-height:1.6; margin:2px 0 4px; }
        .lumora-card-footer { display:flex; align-items:center; justify-content:space-between; margin-top:8px; padding-top:8px; border-top:1px solid #f0f0f0; }
        .lumora-card-from { font-size:11px; color:#999; }
        .lumora-card-price { font-size:17px; font-weight:800; color:#0B1629; }
        .lumora-card-details { font-size:12px; font-weight:600; color:#1A3A6B; text-decoration:none; display:flex; align-items:center; gap:2px; }
        .lumora-card-details:hover { text-decoration:underline; }

        /* ── Hover CTA ── */
        .lumora-card-hover-cta { position:absolute; inset:0; display:flex; align-items:flex-end; padding:16px; opacity:0; transition:opacity .3s; background:linear-gradient(to top, rgba(11,22,41,.7) 0%, transparent 55%); z-index:20; }
        .lumora-card:hover .lumora-card-hover-cta { opacity:1; }
        .lumora-cta-btn { display:block; width:100%; text-align:center; padding:10px; background:#C4973A; color:#0B1629; font-weight:700; font-size:13px; border-radius:8px; text-decoration:none; transition:background .2s; }
        .lumora-cta-btn:hover { background:#D4A74A; }

        /* ── Badges ── */
        .lumora-badge-gold { background:#C4973A; color:#0B1629; padding:3px 10px; border-radius:999px; font-size:9px; font-weight:700; letter-spacing:.07em; text-transform:uppercase; display:inline-block; }
        .lumora-badge-navy { background:#1A3A6B; color:#fff; padding:3px 10px; border-radius:999px; font-size:9px; font-weight:700; letter-spacing:.07em; text-transform:uppercase; display:inline-block; }
        .lumora-badge-travel { background:rgba(255,255,255,.9); color:#1A3A6B; padding:3px 10px; border-radius:999px; font-size:9px; font-weight:700; letter-spacing:.05em; display:inline-block; backdrop-filter:blur(4px); }

        /* ── Filter tabs (Pixory-style) ── */
        .lumora-tabs { display:flex; gap:0; border-bottom:2px solid #e8e8e8; margin-bottom:32px; overflow-x:auto; -webkit-overflow-scrolling:touch; }
        .lumora-tab { padding:12px 20px; font-size:14px; font-weight:500; color:#666; cursor:pointer; white-space:nowrap; border:none; background:transparent; border-bottom:2px solid transparent; margin-bottom:-2px; transition:all .2s; }
        .lumora-tab--active { color:#0B1629; font-weight:700; border-bottom-color:#C4973A; }
        .lumora-tab:hover:not(.lumora-tab--active) { color:#1A3A6B; }

        /* ── Travel banner ── */
        .travel-banner { display:flex; align-items:center; justify-content:space-between; gap:24px; background:linear-gradient(135deg,#0B1629 0%,#1A3A6B 100%); border-radius:16px; padding:36px 40px; margin-bottom:48px; overflow:hidden; position:relative; }
        .travel-banner::before { content:''; position:absolute; inset:0; background:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='20'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"); }
        .travel-banner-text { position:relative; z-index:1; flex:1; }
        .travel-series-tag { background:#C4973A; color:#0B1629; padding:4px 12px; border-radius:999px; font-size:11px; font-weight:700; letter-spacing:.08em; text-transform:uppercase; display:inline-block; margin-bottom:12px; }
        .travel-banner-text h2 { font-family:'Playfair Display',serif; font-size:clamp(22px,3vw,32px); color:#fff; margin-bottom:8px; }
        .travel-banner-text p { font-size:14px; color:rgba(255,255,255,.65); margin-bottom:16px; max-width:360px; line-height:1.6; }
        .travel-banner-link { background:transparent; border:1.5px solid rgba(255,255,255,.4); color:#fff; padding:10px 20px; border-radius:8px; font-size:13px; font-weight:600; cursor:pointer; transition:all .2s; }
        .travel-banner-link:hover { background:rgba(255,255,255,.1); border-color:#C4973A; }
        .travel-banner-books { display:flex; align-items:center; gap:-8px; position:relative; z-index:1; padding:8px; }
        .travel-book-thumb { width:75px; height:105px; object-fit:cover; border-radius:4px; box-shadow:0 8px 24px rgba(0,0,0,.4); transition:transform .3s; margin-left:-12px; }
        .travel-book-thumb:first-child { margin-left:0; }
        .travel-book-thumb:hover { transform:translateY(-8px) rotate(0deg) !important; z-index:10 !important; }

        /* ── Section header ── */
        .lumora-section-head { display:flex; align-items:center; justify-content:space-between; margin-bottom:20px; }
        .lumora-section-label { font-family:'Playfair Display',serif; font-size:20px; font-weight:700; color:#0B1629; }
        .lumora-section-sub { font-size:13px; color:#888; margin-left:8px; }

        @media(max-width:640px) {
          .travel-banner { flex-direction:column; padding:24px; }
          .travel-banner-books { display:none; }
        }
      `}</style>

      <div style={{ minHeight:"100vh", background:"#F7F9FC" }}>
        {/* ── Page hero ── */}
        <div style={{ background:"linear-gradient(135deg,#0B1629 0%,#1A3A6B 100%)", padding:"52px 0 44px" }}>
          <div className="container">
            <p style={{ fontSize:"11px", color:"#C4973A", fontWeight:700, letterSpacing:".14em", textTransform:"uppercase", marginBottom:"10px" }}>Shop</p>
            <h1 className="font-serif" style={{ fontSize:"clamp(32px,5vw,52px)", color:"#fff", marginBottom:"8px" }}>
              All Photobooks
            </h1>
            <p style={{ color:"rgba(255,255,255,.55)", fontSize:"15px" }}>
              {PRODUCTS.length} premium designs — free to create, pay when you order
            </p>
          </div>
        </div>

        <div className="container" style={{ padding:"40px 24px 80px" }}>

          {/* ── Travel banner ── */}
          {showTravelBanner && <TravelBanner onBrowse={() => setActiveCategory("travel")} />}

          {/* ── Pixory-style tab filters ── */}
          <div className="lumora-tabs">
            {CATEGORIES.map(cat => (
              <button
                key={cat.key}
                className={`lumora-tab${activeCategory === cat.key ? " lumora-tab--active" : ""}`}
                onClick={() => setActiveCategory(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* ── Sort + count row ── */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"24px" }}>
            <div className="lumora-section-head" style={{ marginBottom:0 }}>
              <span className="lumora-section-label">
                {CATEGORIES.find(c=>c.key===activeCategory)?.label}
              </span>
              <span className="lumora-section-sub">— {filtered.length} designs</span>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
              <ArrowUpDown size={14} color="#999" />
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                style={{ border:"1px solid #ddd", borderRadius:"8px", padding:"6px 12px", background:"#fff", fontSize:"13px", outline:"none", cursor:"pointer", color:"#333" }}
              >
                {SORT_OPTIONS.map(o => <option key={o.key} value={o.key}>{o.label}</option>)}
              </select>
            </div>
          </div>

          {/* ── Destination Travel sub-header (only on travel filter) ── */}
          {activeCategory === "travel" && (
            <div style={{ marginBottom:"16px", padding:"12px 16px", background:"#fff", borderRadius:"10px", border:"1px solid #eee", display:"flex", alignItems:"center", gap:"10px" }}>
              <span style={{ fontSize:"18px" }}>✈️</span>
              <div>
                <p style={{ fontSize:"13px", fontWeight:700, color:"#0B1629" }}>Destination Photobooks — Travel Series</p>
                <p style={{ fontSize:"12px", color:"#888" }}>Colourful, country-specific cover designs. Custom photobooks for every trip.</p>
              </div>
            </div>
          )}

          {/* ── Product grid ── */}
          {filtered.length > 0 ? (
            <div
              style={{
                display:"grid",
                gridTemplateColumns:"repeat(auto-fill, minmax(220px, 1fr))",
                gap:"20px",
              }}
            >
              {filtered.map((p, i) => <ProductCard key={p.id} product={p} idx={i} />)}
            </div>
          ) : (
            <div style={{ textAlign:"center", padding:"80px 24px" }}>
              <p style={{ fontSize:"18px", color:"#888", marginBottom:"20px" }}>No products in this category yet.</p>
              <button onClick={() => setActiveCategory("all")} className="btn btn-primary">View All</button>
            </div>
          )}

          {/* ── Bottom trust bar ── */}
          <div style={{ display:"flex", flexWrap:"wrap", gap:"16px", justifyContent:"center", marginTop:"60px", padding:"28px 24px", background:"#fff", borderRadius:"12px", border:"1px solid #eee" }}>
            {[
              "🚚  Free shipping over €50",
              "⭐  4.9/5 from 50,000+ customers",
              "🖨️  Premium offset printing",
              "🔄  Free reprint guarantee",
              "📦  Delivered in 5–8 days",
            ].map(t => (
              <span key={t} style={{ fontSize:"13px", fontWeight:600, color:"#1A3A6B" }}>{t}</span>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}
