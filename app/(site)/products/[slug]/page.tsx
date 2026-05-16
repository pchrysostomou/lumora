"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Star, ChevronRight, Shield, Truck, RefreshCw, Package, CheckCircle, Minus, Plus } from "lucide-react";
import { PRODUCTS, SIZE_LABELS, COVER_LABELS, SIZE_UPGRADES, COVER_UPGRADES, PRICE_PER_EXTRA_PAGE, CATEGORY_GRADIENTS, calculatePrice, type Size, type CoverType } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {[1,2,3,4,5].map(s => (
          <Star key={s} size={16} fill={s <= Math.round(rating) ? "#C4973A" : "none"} color={s <= Math.round(rating) ? "#C4973A" : "var(--color-border)"} />
        ))}
      </div>
      <span style={{ fontSize: "14px", color: "var(--color-muted)" }}>{rating.toFixed(1)} ({count} reviews)</span>
    </div>
  );
}

export default function ProductPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const product = PRODUCTS.find(p => p.slug === slug);

  const [selectedSize, setSelectedSize] = useState<Size>(product?.availableSizes[0] ?? "A5");
  const [selectedCover, setSelectedCover] = useState<CoverType>(product?.availableCovers[0] ?? "softcover");
  const [pageCount, setPageCount] = useState(product?.minPages ?? 20);
  const [openSection, setOpenSection] = useState<string | null>("details");

  if (!product) {
    return (
      <div className="container" style={{ padding: "80px 24px", textAlign: "center" }}>
        <h1 className="font-serif" style={{ fontSize: "2rem", marginBottom: "16px" }}>Product not found</h1>
        <Link href="/collections/all" className="btn btn-primary">Back to Collections</Link>
      </div>
    );
  }

  const gradient = CATEGORY_GRADIENTS[product.category];
  const price = calculatePrice(product.basePrice, product.minPages, pageCount, selectedSize, selectedCover);
  const extraPages = Math.max(0, pageCount - product.minPages);

  const INFO_SECTIONS = [
    {
      id: "details",
      title: "Product Details",
      content: `${product.description} Available in ${product.availableSizes.length} sizes and ${product.availableCovers.length} cover types. Minimum ${product.minPages} pages, up to ${product.maxPages} pages.`,
    },
    {
      id: "quality",
      title: "Print Quality",
      content: "Premium 170gsm silk-coated paper. Vivid, true-to-life color reproduction using 4-color offset printing. Each spread is flat-lay bound for full open display.",
    },
    {
      id: "shipping",
      title: "Shipping & Delivery",
      content: "Produced and dispatched within 3–5 business days. Standard delivery 5–8 days. Express delivery available at checkout. Free shipping on orders over €50.",
    },
    {
      id: "returns",
      title: "Returns & Guarantee",
      content: "100% satisfaction guarantee. If your book arrives damaged or with a print defect, we'll reprint and reship at no cost. Personalised items cannot be returned unless faulty.",
    },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-bg)" }}>
      {/* Breadcrumb */}
      <div className="container" style={{ padding: "16px 24px" }}>
        <div className="flex items-center gap-2" style={{ fontSize: "13px", color: "var(--color-muted)" }}>
          <Link href="/" style={{ color: "var(--color-muted)" }} className="hover:text-[#1A3A6B]">Home</Link>
          <ChevronRight size={14} />
          <Link href="/collections/all" style={{ color: "var(--color-muted)" }} className="hover:text-[#1A3A6B]">Collections</Link>
          <ChevronRight size={14} />
          <span style={{ color: "var(--color-fg)" }}>{product.title}</span>
        </div>
      </div>

      {/* Main */}
      <div className="container" style={{ padding: "0 24px 80px" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left — image */}
          <div>
            <div
              className="rounded-2xl overflow-hidden"
              style={{ aspectRatio: "3/4", boxShadow: "0 24px 64px rgba(11,22,41,0.18)" }}
            >
              {product.coverImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={product.coverImage} alt={product.title} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
              ) : (
                <div style={{ width:"100%", height:"100%", background: gradient }} />
              )}
            </div>
            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3 mt-4">
              {[product.coverImage, product.coverImage, product.coverImage, product.coverImage].map((img, i) => (
                <div key={i} className="rounded-lg overflow-hidden" style={{ aspectRatio: "3/4", border: i === 0 ? "2px solid #C4973A" : "2px solid var(--color-border)", opacity: i === 0 ? 1 : 0.6 }}>
                  {img ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={img} alt="" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
                  ) : (
                    <div style={{ width:"100%", height:"100%", background: gradient }} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right — info */}
          <div style={{ paddingTop: "8px" }}>
            <p style={{ fontSize: "11px", color: "var(--color-accent)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>
              {product.category}
            </p>
            <h1 className="font-serif" style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: "#1A1A1A", lineHeight: 1.15, marginBottom: "12px" }}>
              {product.title}
            </h1>
            <StarRating rating={product.rating} count={product.reviewCount} />

            <div style={{ margin: "24px 0", padding: "20px", background: "#fff", borderRadius: "12px", border: "1px solid var(--color-border)" }}>
              <div className="flex items-baseline gap-2">
                <span style={{ fontSize: "32px", fontWeight: 800, color: "var(--color-fg)", fontFamily:"'Playfair Display',serif" }}>{formatPrice(price)}</span>
                <span style={{ fontSize: "14px", color: "var(--color-muted)" }}>incl. VAT</span>
              </div>
              {extraPages > 0 && (
                <p style={{ fontSize: "12px", color: "var(--color-accent)", marginTop: "4px" }}>+{extraPages} extra pages @ €{PRICE_PER_EXTRA_PAGE}/page</p>
              )}
            </div>

            {/* Size */}
            <div style={{ marginBottom: "20px" }}>
              <p style={{ fontSize: "13px", fontWeight: 600, color: "#1A1A1A", marginBottom: "10px" }}>Size</p>
              <div className="flex flex-wrap gap-2">
                {product.availableSizes.map(s => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    style={{
                      padding: "8px 14px", borderRadius: "8px", fontSize: "13px",
                      background: selectedSize === s ? "#1A3A6B" : "#fff",
                      color: selectedSize === s ? "#fff" : "var(--color-fg)",
                      border: `1.5px solid ${selectedSize === s ? "#1A3A6B" : "var(--color-border)"}`,
                      cursor: "pointer", transition: "all 200ms",
                    }}
                  >
                    {SIZE_LABELS[s]}
                    {SIZE_UPGRADES[s] > 0 && <span style={{ color: selectedSize === s ? "rgba(255,255,255,0.7)" : "#C9806A", marginLeft: "4px", fontSize: "11px" }}>+€{SIZE_UPGRADES[s]}</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Cover */}
            <div style={{ marginBottom: "20px" }}>
              <p style={{ fontSize: "13px", fontWeight: 600, color: "#1A1A1A", marginBottom: "10px" }}>Cover Type</p>
              <div className="flex flex-wrap gap-2">
                {product.availableCovers.map(c => (
                  <button
                    key={c}
                    onClick={() => setSelectedCover(c)}
                    style={{
                      padding: "8px 14px", borderRadius: "8px", fontSize: "13px",
                      background: selectedCover === c ? "#1A3A6B" : "#fff",
                      color: selectedCover === c ? "#fff" : "var(--color-fg)",
                      border: `1.5px solid ${selectedCover === c ? "#1A3A6B" : "var(--color-border)"}`,
                      cursor: "pointer", transition: "all 200ms",
                    }}
                  >
                    {COVER_LABELS[c]}
                    {COVER_UPGRADES[c] > 0 && <span style={{ color: selectedCover === c ? "rgba(255,255,255,0.7)" : "#C9806A", marginLeft: "4px", fontSize: "11px" }}>+€{COVER_UPGRADES[c]}</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Pages */}
            <div style={{ marginBottom: "28px" }}>
              <p style={{ fontSize: "13px", fontWeight: 600, color: "#1A1A1A", marginBottom: "10px" }}>
                Pages: <span style={{ color: "#C9806A" }}>{pageCount}</span>
                <span style={{ fontSize: "12px", color: "#9E8E82", fontWeight: 400, marginLeft: "8px" }}>({product.minPages}–{product.maxPages})</span>
              </p>
              <div className="flex items-center gap-3">
                <button onClick={() => setPageCount(p => Math.max(product.minPages, p - 4))} className="flex items-center justify-center" style={{ width: 36, height: 36, borderRadius: "8px", border: "1.5px solid #E8E4DF", background: "#fff", cursor: "pointer" }}>
                  <Minus size={14} />
                </button>
                <div style={{ flex: 1, height: "6px", background: "#E8E4DF", borderRadius: "3px", position: "relative" }}>
                  <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, borderRadius: "3px", background: "#C9806A", width: `${((pageCount - product.minPages) / (product.maxPages - product.minPages)) * 100}%` }} />
                </div>
                <button onClick={() => setPageCount(p => Math.min(product.maxPages, p + 4))} className="flex items-center justify-center" style={{ width: 36, height: 36, borderRadius: "8px", border: "1.5px solid #E8E4DF", background: "#fff", cursor: "pointer" }}>
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* CTA */}
            <Link href={`/editor/${product.id}`} className="btn btn-lg w-full" style={{ justifyContent: "center", marginBottom: "12px", background:"#1A3A6B", color:"#fff", fontWeight:700 }}>
              Start Designing — {formatPrice(price)}
            </Link>
            <p style={{ textAlign: "center", fontSize: "12px", color: "var(--color-muted)" }}>No account needed · Free to design · Pay at checkout</p>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              {[
                { icon: Truck,     text: "Free shipping over €50" },
                { icon: Shield,    text: "100% satisfaction guarantee" },
                { icon: RefreshCw, text: "Free reprint if faulty" },
                { icon: Package,   text: "Delivered in 5–8 days" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2" style={{ fontSize: "12px", color: "var(--color-muted)" }}>
                  <Icon size={14} color="var(--color-primary)" />
                  {text}
                </div>
              ))}
            </div>

            {/* Accordion */}
            <div style={{ marginTop: "32px", borderTop: "1px solid #E8E4DF" }}>
              {INFO_SECTIONS.map(s => (
                <div key={s.id} style={{ borderBottom: "1px solid #E8E4DF" }}>
                  <button
                    onClick={() => setOpenSection(openSection === s.id ? null : s.id)}
                    className="flex items-center justify-between w-full"
                    style={{ padding: "16px 0", fontSize: "14px", fontWeight: 600, color: "#1A1A1A", background: "transparent", border: "none", cursor: "pointer" }}
                  >
                    {s.title}
                    <ChevronRight size={16} style={{ transform: openSection === s.id ? "rotate(90deg)" : "none", transition: "transform 200ms", color: "#9E8E82" }} />
                  </button>
                  {openSection === s.id && (
                    <p style={{ fontSize: "14px", color: "#6B6B6B", lineHeight: 1.7, paddingBottom: "16px" }}>{s.content}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
