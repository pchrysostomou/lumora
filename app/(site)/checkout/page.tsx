"use client";

import { useEffect, useMemo, useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { nanoid } from "nanoid";
import { ShoppingBag, Lock, Truck, ChevronLeft, BookOpen } from "lucide-react";
import { PRODUCTS, SIZE_LABELS, COVER_LABELS, SIZE_UPGRADES, COVER_UPGRADES, calculatePrice, type Size, type CoverType } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { loadDraft, saveOrder, draftPhotos, type Draft } from "@/lib/storage";

const FREE_SHIPPING_OVER = 50;
const SHIPPING_COST = 4.99;
const COUNTRIES = ["Cyprus", "Greece", "United Kingdom", "Germany", "France", "Italy", "Spain", "Netherlands", "Other"];

const INPUT: React.CSSProperties = {
  width: "100%", padding: "11px 14px", borderRadius: "8px",
  border: "1.5px solid var(--color-border)", fontSize: "14px",
  outline: "none", background: "#fff", color: "var(--color-fg)",
};
const LABEL: React.CSSProperties = { fontSize: "13px", fontWeight: 600, color: "var(--color-fg)", display: "block", marginBottom: "6px" };

function CheckoutInner() {
  const sp = useSearchParams();
  const router = useRouter();
  const [draft, setDraft] = useState<Draft | null>(null);
  const [ready, setReady] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", address: "", city: "", postalCode: "", country: "Cyprus" });

  const draftId = sp?.get("draft") ?? null;
  const productParam = sp?.get("product") ?? null;

  useEffect(() => {
    let alive = true;
    queueMicrotask(() => {
      if (!alive) return;
      if (draftId) setDraft(loadDraft(draftId) ?? null);
      setReady(true);
    });
    return () => { alive = false; };
  }, [draftId]);

  const product = useMemo(() => {
    if (draft) return PRODUCTS.find(p => p.id === draft.productId) ?? null;
    if (productParam) return PRODUCTS.find(p => p.id === productParam) ?? null;
    return null;
  }, [draft, productParam]);

  const [size, setSize] = useState<Size | null>(null);
  const [cover, setCover] = useState<CoverType | null>(null);
  const selSize: Size = size ?? product?.availableSizes[0] ?? "A5";
  const selCover: CoverType = cover ?? product?.availableCovers[0] ?? "softcover";

  const pageCount = product ? Math.max(product.minPages, draft ? (draft.pages.length - 1) * 2 : product.minPages) : 20;
  const subtotal = product ? calculatePrice(product.basePrice, product.minPages, pageCount, selSize, selCover) : 0;
  const shipping = subtotal >= FREE_SHIPPING_OVER ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!product || submitting) return;
    setSubmitting(true);
    setError(null);

    const orderId = nanoid(8);
    const order = {
      id: orderId,
      draftId: draft?.id ?? "",
      productId: product.id,
      title: draft?.title ?? product.title,
      total,
      currency: "EUR",
      pageCount,
      customer: form,
      memoryHash: nanoid(12),
      photos: draft ? draftPhotos(draft).slice(0, 12) : [],
      status: "processing" as const,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: order.title,
          amount: total,
          successPath: `/checkout/success?order=${orderId}`,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Checkout failed");

      const saved = saveOrder(order);
      if (!saved.ok) throw new Error("Couldn't store your order locally — browser storage is full.");

      if (data.url) {
        window.location.href = data.url; // Stripe-hosted payment page
      } else {
        router.push(`/checkout/success?order=${orderId}`); // demo mode
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  if (!ready) return <div style={{ padding: "120px 24px", textAlign: "center", color: "var(--color-muted)" }}>Loading checkout…</div>;

  if (!product) {
    return (
      <div className="container" style={{ padding: "100px 24px", textAlign: "center" }}>
        <ShoppingBag size={44} color="var(--color-muted)" style={{ margin: "0 auto 16px" }} />
        <h1 className="font-serif" style={{ fontSize: "28px", color: "var(--color-fg)", marginBottom: "10px" }}>Your cart is empty</h1>
        <p style={{ color: "var(--color-muted)", marginBottom: "24px" }}>Design a photobook first — it only takes a few minutes.</p>
        <Link href="/collections/all" className="btn btn-lg" style={{ background: "#1A3A6B", color: "#fff", fontWeight: 700 }}>Browse Photobooks</Link>
      </div>
    );
  }

  return (
    <div style={{ background: "#F7F9FC", minHeight: "100vh" }}>
      <div className="container" style={{ maxWidth: "1080px", padding: "32px 24px 80px" }}>
        <Link href={draft ? `/editor/${product.id}?draft=${draft.id}` : `/editor/${product.id}`} style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "var(--color-muted)", marginBottom: "20px" }}>
          <ChevronLeft size={15} /> Back to editor
        </Link>
        <h1 className="font-serif" style={{ fontSize: "clamp(26px,3.5vw,36px)", color: "#0B1629", marginBottom: "28px" }}>Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8" style={{ alignItems: "start" }}>
          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-3" style={{ background: "#fff", borderRadius: "16px", border: "1px solid #EBF0FA", padding: "28px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#0B1629", marginBottom: "18px" }}>Shipping details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ marginBottom: "16px" }}>
              <div>
                <label style={LABEL}>Full name</label>
                <input required style={INPUT} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Sofia Georgiou" autoComplete="name" />
              </div>
              <div>
                <label style={LABEL}>Email</label>
                <input required type="email" style={INPUT} value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="you@email.com" autoComplete="email" />
              </div>
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label style={LABEL}>Address</label>
              <input required style={INPUT} value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} placeholder="Street and number" autoComplete="street-address" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ marginBottom: "24px" }}>
              <div>
                <label style={LABEL}>City</label>
                <input required style={INPUT} value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} autoComplete="address-level2" />
              </div>
              <div>
                <label style={LABEL}>Postal code</label>
                <input required style={INPUT} value={form.postalCode} onChange={e => setForm(f => ({ ...f, postalCode: e.target.value }))} autoComplete="postal-code" />
              </div>
              <div>
                <label style={LABEL}>Country</label>
                <select style={{ ...INPUT, cursor: "pointer" }} value={form.country} onChange={e => setForm(f => ({ ...f, country: e.target.value }))}>
                  {COUNTRIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#0B1629", marginBottom: "14px" }}>Book options</h2>
            <div style={{ marginBottom: "14px" }}>
              <label style={LABEL}>Size</label>
              <div className="flex flex-wrap gap-2">
                {product.availableSizes.map(s => (
                  <button type="button" key={s} onClick={() => setSize(s)}
                    style={{ padding: "8px 13px", borderRadius: "8px", fontSize: "13px", cursor: "pointer",
                      background: selSize === s ? "#1A3A6B" : "#fff", color: selSize === s ? "#fff" : "var(--color-fg)",
                      border: `1.5px solid ${selSize === s ? "#1A3A6B" : "var(--color-border)"}` }}>
                    {SIZE_LABELS[s]}{SIZE_UPGRADES[s] > 0 && ` (+€${SIZE_UPGRADES[s]})`}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: "24px" }}>
              <label style={LABEL}>Cover</label>
              <div className="flex flex-wrap gap-2">
                {product.availableCovers.map(c => (
                  <button type="button" key={c} onClick={() => setCover(c)}
                    style={{ padding: "8px 13px", borderRadius: "8px", fontSize: "13px", cursor: "pointer",
                      background: selCover === c ? "#1A3A6B" : "#fff", color: selCover === c ? "#fff" : "var(--color-fg)",
                      border: `1.5px solid ${selCover === c ? "#1A3A6B" : "var(--color-border)"}` }}>
                    {COVER_LABELS[c]}{COVER_UPGRADES[c] > 0 && ` (+€${COVER_UPGRADES[c]})`}
                  </button>
                ))}
              </div>
            </div>

            {error && <p style={{ color: "#c62828", fontSize: "14px", marginBottom: "14px" }}>{error}</p>}

            <button type="submit" disabled={submitting} className="btn btn-lg w-full"
              style={{ background: "#C4973A", color: "#0B1629", fontWeight: 700, justifyContent: "center", opacity: submitting ? 0.6 : 1 }}>
              <Lock size={16} /> {submitting ? "Processing…" : `Place Order — ${formatPrice(total)}`}
            </button>
            <p style={{ textAlign: "center", fontSize: "12px", color: "var(--color-muted)", marginTop: "10px" }}>
              Payments are processed securely. No card details are stored on Lumora.
            </p>
          </form>

          {/* Summary */}
          <aside className="lg:col-span-2" style={{ background: "#fff", borderRadius: "16px", border: "1px solid #EBF0FA", padding: "28px", position: "sticky", top: "90px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#0B1629", marginBottom: "18px" }}>Order summary</h2>
            <div style={{ display: "flex", gap: "14px", marginBottom: "18px" }}>
              <div style={{ width: "64px", height: "88px", borderRadius: "8px", overflow: "hidden", flexShrink: 0, background: "#EBF0FA" }}>
                {product.coverImage && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={product.coverImage} alt={product.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                )}
              </div>
              <div>
                <p style={{ fontWeight: 700, color: "#0B1629", fontSize: "14px" }}>{draft?.title ?? product.title}</p>
                <p style={{ fontSize: "12px", color: "var(--color-muted)", marginTop: "4px", display: "flex", alignItems: "center", gap: "5px" }}>
                  <BookOpen size={13} /> {pageCount} pages · {SIZE_LABELS[selSize]} · {COVER_LABELS[selCover]}
                </p>
                {draft && <p style={{ fontSize: "12px", color: "var(--color-accent)", marginTop: "4px" }}>Includes your saved design</p>}
              </div>
            </div>
            <div style={{ borderTop: "1px solid #EBF0FA", paddingTop: "14px", fontSize: "14px", color: "var(--color-fg)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span>Subtotal</span><span>{formatPrice(subtotal)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "5px" }}><Truck size={14} /> Shipping</span>
                <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: "17px", borderTop: "1px solid #EBF0FA", paddingTop: "12px", marginTop: "12px" }}>
                <span>Total</span><span>{formatPrice(total)}</span>
              </div>
            </div>
            <p style={{ fontSize: "12px", color: "var(--color-muted)", marginTop: "14px", lineHeight: 1.6 }}>
              Free shipping on orders over €{FREE_SHIPPING_OVER}. Printed and dispatched in 3–5 business days.
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div style={{ padding: "120px 24px", textAlign: "center", color: "var(--color-muted)" }}>Loading checkout…</div>}>
      <CheckoutInner />
    </Suspense>
  );
}
