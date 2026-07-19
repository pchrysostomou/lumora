"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Star, ArrowUpDown, ArrowLeft } from "lucide-react";
import { PRODUCTS, CATEGORY_GRADIENTS, type Product, type ProductCategory } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

const CATEGORY_LABELS: Record<string, string> = {
  wedding: "Wedding Photobooks",
  travel: "Travel Photobooks",
  baby: "Baby & Family",
  anniversary: "Anniversary Books",
  family: "Family Chronicles",
  graduation: "Graduation Books",
  europe: "Europe Escapes",
  islands: "Island Getaways",
  asia: "Asian Adventures",
  cities: "City Breaks",
};
const CATEGORY_DESC: Record<string, string> = {
  wedding: "Preserve your perfect day in a beautifully printed keepsake.",
  travel: "Turn your adventures into a stunning magazine-style photobook.",
  baby: "Capture every milestone of your little one's precious first years.",
  anniversary: "Celebrate years of love with a personalised story book.",
  family: "Document your family's story for generations to come.",
  graduation: "Mark this incredible milestone with a premium photo memory.",
  europe: "Paris, Santorini, the Amalfi Coast — Europe's icons, bound in print.",
  islands: "Sun, salt, and turquoise water. Books for island souls.",
  asia: "From Kyoto's temples to Bali's rice terraces — the East, beautifully printed.",
  cities: "Skylines, streets, and city lights that never sleep.",
};

// Destination collections group specific travel books by product slug.
const DESTINATION_SLUGS: Record<string, string[]> = {
  europe: ["paris-book", "greece-book", "italy-book", "spain-book", "paris-je-taime"],
  islands: ["greece-book", "bali-book", "maldives-book"],
  asia: ["japan-book", "bali-book"],
  cities: ["nyc-book", "paris-book", "spain-book"],
};

const SORT_OPTIONS = [
  { key: "popular", label: "Most Popular" },
  { key: "newest", label: "Newest" },
  { key: "price_asc", label: "Price: Low to High" },
  { key: "price_desc", label: "Price: High to Low" },
];

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex gap-0.5">
        {[1,2,3,4,5].map(s => (
          <Star key={s} size={12} fill={s <= Math.round(rating) ? "#C4973A" : "none"} color={s <= Math.round(rating) ? "#C4973A" : "var(--color-border)"} />
        ))}
      </div>
      <span style={{ fontSize: "12px", color: "var(--color-muted)" }}>{rating.toFixed(1)} ({count})</span>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const gradient = CATEGORY_GRADIENTS[product.category as ProductCategory];
  return (
    <div className="card group overflow-hidden" style={{ cursor: "pointer", position: "relative" }}>
      <Link href={`/products/${product.slug}`} className="absolute inset-0 z-10" aria-label={product.title} />
      <div className="img-zoom-wrap relative" style={{ aspectRatio: "4/5" }}>
        {product.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.coverImage} alt={product.title} className="w-full h-full" style={{ objectFit: "cover", minHeight: "240px", display: "block" }} />
        ) : (
          <div className="w-full h-full" style={{ background: gradient, minHeight: "240px" }} />
        )}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isBestseller && <span className="badge badge-primary" style={{ fontSize: "10px" }}>Bestseller</span>}
          {product.isNew && <span className="badge" style={{ fontSize: "10px", background: "var(--color-fg)", color: "#fff" }}>New</span>}
        </div>
        <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.35), transparent)", zIndex: 20 }}>
          <Link href={`/editor/${product.id}`} className="btn btn-primary w-full" style={{ fontSize: "14px", position: "relative", zIndex: 30, background: "#C4973A", color: "#0B1629", fontWeight: 700 }}>
            Start My Design
          </Link>
        </div>
      </div>
      <div className="p-4" style={{ position: "relative", zIndex: 20 }}>
        <h3 className="font-serif mb-2" style={{ fontSize: "17px", color: "var(--color-fg)", lineHeight: "1.3" }}>{product.title}</h3>
        <StarRating rating={product.rating} count={product.reviewCount} />
        <div className="flex items-center justify-between mt-3">
          <div>
            <span style={{ fontSize: "12px", color: "var(--color-muted)" }}>From </span>
            <span style={{ fontSize: "18px", fontWeight: 700, color: "var(--color-fg)" }}>{formatPrice(product.basePrice)}</span>
          </div>
          <Link href={`/products/${product.slug}`} style={{ fontSize: "13px", color: "var(--color-primary)", fontWeight: 500, position: "relative", zIndex: 30 }} className="hover:underline">
            Details →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CategoryPage() {
  const params = useParams();
  const category = params?.category as string;
  const [sortBy, setSortBy] = useState("popular");

  const products = useMemo(() => {
    const destSlugs = DESTINATION_SLUGS[category];
    const list = destSlugs
      ? PRODUCTS.filter(p => destSlugs.includes(p.slug))
      : PRODUCTS.filter(p => p.category === category);
    switch (sortBy) {
      case "price_asc":  list.sort((a, b) => a.basePrice - b.basePrice); break;
      case "price_desc": list.sort((a, b) => b.basePrice - a.basePrice); break;
      case "newest":     list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
      default:           list.sort((a, b) => b.reviewCount - a.reviewCount);
    }
    return list;
  }, [category, sortBy]);

  const title = CATEGORY_LABELS[category] || "Photobooks";
  const desc = CATEGORY_DESC[category] || "";

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #0B1629 0%, #1A3A6B 100%)", padding: "52px 0 44px" }}>
        <div className="container">
          <Link href="/collections/all" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "rgba(255,255,255,0.55)", fontSize: "13px", marginBottom: "16px" }}>
            <ArrowLeft size={14} /> All Collections
          </Link>
          <h1 className="font-serif" style={{ fontSize: "clamp(28px, 4vw, 44px)", color: "#fff", marginBottom: "8px" }}>{title}</h1>
          {desc && <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "15px", maxWidth: "440px" }}>{desc}</p>}
        </div>
      </div>

      <div className="container" style={{ padding: "32px 24px 80px" }}>
        {/* Sort bar */}
        <div className="flex items-center justify-between mb-8 pb-5" style={{ borderBottom: "1px solid var(--color-border)" }}>
          <p style={{ fontSize: "14px", color: "var(--color-muted)" }}>{products.length} design{products.length !== 1 ? "s" : ""}</p>
          <div className="flex items-center gap-2">
            <ArrowUpDown size={14} color="var(--color-muted)" />
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ border: "1px solid var(--color-border)", borderRadius: "8px", padding: "6px 12px", background: "#fff", color: "var(--color-fg)", cursor: "pointer", fontSize: "13px", outline: "none" }}>
              {SORT_OPTIONS.map(o => <option key={o.key} value={o.key}>{o.label}</option>)}
            </select>
          </div>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "80px 24px" }}>
            <p style={{ fontSize: "18px", color: "var(--color-muted)", marginBottom: "20px" }}>No products in this category yet.</p>
            <Link href="/collections/all" className="btn btn-primary">View All Photobooks</Link>
          </div>
        )}

        {/* Browse others CTA */}
        <div style={{ marginTop: "60px", textAlign: "center" }}>
          <p style={{ color: "var(--color-muted)", marginBottom: "14px" }}>Looking for something different?</p>
          <Link href="/collections/all" className="btn" style={{ background: "var(--color-primary)", color: "#fff" }}>Browse All Styles</Link>
        </div>
      </div>
    </div>
  );
}
