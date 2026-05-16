import Link from "next/link";
import { ArrowRight, Check, Star } from "lucide-react";
import { SIZE_LABELS, COVER_LABELS, SIZE_UPGRADES, COVER_UPGRADES, PRICE_PER_EXTRA_PAGE } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

const BASE_PRICE = 24.99;

const PLANS = [
  {
    name: "Softcover",
    price: 24.99,
    description: "Perfect for everyday memories and gift-giving.",
    features: [
      "170gsm silk-coated paper",
      "Vibrant 4-colour printing",
      "Flat-lay binding",
      "Sizes: A5, A4, Square",
      "20–60 pages",
      "QR Memory Link included",
    ],
    cta: "Start with Softcover",
    highlight: false,
  },
  {
    name: "Hardcover",
    price: 34.98,
    description: "The most popular choice — durable, premium feel.",
    features: [
      "Everything in Softcover",
      "Rigid hardcover boards",
      "Linen-texture wrap",
      "Gold foil title option",
      "20–80 pages",
      "Priority production",
    ],
    cta: "Start with Hardcover",
    highlight: true,
    badge: "Most Popular",
  },
  {
    name: "Premium Leather",
    price: 49.98,
    description: "A true heirloom — for moments that deserve the best.",
    features: [
      "Everything in Hardcover",
      "Genuine vegan leather cover",
      "Gold embossed name/date",
      "Lay-flat binding guaranteed",
      "Up to 80 pages",
      "Gift box packaging",
    ],
    cta: "Start with Leather",
    highlight: false,
  },
];

const SIZE_OPTIONS = Object.entries(SIZE_LABELS).map(([key, label]) => ({
  key,
  label,
  upgrade: SIZE_UPGRADES[key as keyof typeof SIZE_UPGRADES],
}));

export default function PricingPage() {
  return (
    <div style={{ background: "var(--color-bg)" }}>

      {/* Hero */}
      <section style={{
        background: "linear-gradient(135deg, #0B1629 0%, #1A3A6B 100%)",
        padding: "80px 0 72px",
        textAlign: "center",
      }}>
        <div className="container">
          <p style={{ fontSize: "11px", color: "#C4973A", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "16px" }}>Pricing</p>
          <h1 className="font-serif" style={{ fontSize: "clamp(32px, 5vw, 56px)", color: "#fff", marginBottom: "18px" }}>
            Simple, Transparent Pricing
          </h1>
          <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.6)", maxWidth: "480px", margin: "0 auto", lineHeight: "1.75" }}>
            Start from €{BASE_PRICE}. No hidden fees. Free to design — pay only when you order.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section style={{ padding: "80px 0" }}>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ maxWidth: "1000px", margin: "0 auto", alignItems: "start" }}>
            {PLANS.map(plan => (
              <div key={plan.name} style={{
                background: plan.highlight ? "var(--color-primary)" : "#fff",
                borderRadius: "16px",
                padding: "36px 32px",
                border: plan.highlight ? "none" : "1px solid var(--color-border)",
                boxShadow: plan.highlight ? "0 20px 60px rgba(26,58,107,0.3)" : "var(--shadow-card)",
                position: "relative",
              }}>
                {plan.badge && (
                  <span style={{
                    position: "absolute", top: "-14px", left: "50%", transform: "translateX(-50%)",
                    background: "#C4973A", color: "#0B1629",
                    padding: "4px 16px", borderRadius: "999px",
                    fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
                    whiteSpace: "nowrap",
                  }}>{plan.badge}</span>
                )}

                <h3 className="font-serif" style={{ fontSize: "24px", color: plan.highlight ? "#fff" : "var(--color-fg)", marginBottom: "6px" }}>
                  {plan.name}
                </h3>
                <p style={{ fontSize: "13px", color: plan.highlight ? "rgba(255,255,255,0.7)" : "var(--color-muted)", marginBottom: "20px" }}>
                  {plan.description}
                </p>

                <div style={{ marginBottom: "24px" }}>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "40px", fontWeight: 700, color: plan.highlight ? "#C4973A" : "var(--color-fg)" }}>
                    {formatPrice(plan.price)}
                  </span>
                  <span style={{ fontSize: "13px", color: plan.highlight ? "rgba(255,255,255,0.6)" : "var(--color-muted)", marginLeft: "6px" }}>from / 20 pages</span>
                </div>

                <ul style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "32px" }}>
                  {plan.features.map(f => (
                    <li key={f} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: plan.highlight ? "rgba(255,255,255,0.85)" : "var(--color-fg)" }}>
                      <Check size={15} color={plan.highlight ? "#C4973A" : "var(--color-primary)"} style={{ flexShrink: 0 }} />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link href="/collections/all" className="btn w-full" style={{
                  justifyContent: "center",
                  background: plan.highlight ? "#C4973A" : "var(--color-primary)",
                  color: plan.highlight ? "#0B1629" : "#fff",
                  fontWeight: 700,
                }}>
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Size upgrades */}
      <section style={{ background: "#fff", padding: "72px 0" }}>
        <div className="container" style={{ maxWidth: "860px" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p style={{ fontSize: "11px", color: "var(--color-accent)", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "10px" }}>Size Options</p>
            <h2 className="font-serif" style={{ fontSize: "clamp(24px, 3vw, 36px)", color: "var(--color-fg)" }}>Choose Your Size</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {SIZE_OPTIONS.map(({ key, label, upgrade }) => (
              <div key={key} style={{
                background: "var(--color-bg)",
                border: "1.5px solid var(--color-border)",
                borderRadius: "12px",
                padding: "20px 16px",
                textAlign: "center",
              }}>
                <p style={{ fontWeight: 700, fontSize: "14px", color: "var(--color-fg)", marginBottom: "6px" }}>{label}</p>
                <p style={{ fontSize: "20px", fontWeight: 700, color: upgrade === 0 ? "var(--color-primary)" : "var(--color-accent)" }}>
                  {upgrade === 0 ? "Included" : `+${formatPrice(upgrade)}`}
                </p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "48px", padding: "28px 32px", background: "var(--color-primary-light)", borderRadius: "12px", border: "1px solid var(--color-border)" }}>
            <p style={{ fontWeight: 700, fontSize: "15px", color: "var(--color-fg)", marginBottom: "8px" }}>Extra Pages</p>
            <p style={{ fontSize: "14px", color: "var(--color-muted)", lineHeight: "1.7" }}>
              All books start with 20 pages. Add more pages for just <strong style={{ color: "var(--color-primary)" }}>{formatPrice(PRICE_PER_EXTRA_PAGE)} per page</strong>.
              Maximum 80 pages. The live price calculator in the editor updates as you add pages.
            </p>
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section style={{ padding: "72px 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2 className="font-serif" style={{ fontSize: "clamp(24px, 3vw, 36px)", color: "var(--color-fg)" }}>Our Guarantees</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ maxWidth: "900px", margin: "0 auto" }}>
            {[
              { title: "Free Reprints", desc: "If your book arrives damaged or with a print defect, we'll reprint and reship it free of charge." },
              { title: "Free Shipping", desc: "Free standard shipping on all orders over €50. Express shipping available at checkout." },
              { title: "Quality Promise", desc: "Every book goes through a quality check before dispatch. We stand behind every page we print." },
            ].map(g => (
              <div key={g.title} style={{ background: "#fff", borderRadius: "12px", padding: "28px 24px", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-card)" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "8px", background: "var(--color-primary-light)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                  <Check size={20} color="var(--color-primary)" />
                </div>
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-fg)", marginBottom: "8px" }}>{g.title}</h3>
                <p style={{ fontSize: "14px", color: "var(--color-muted)", lineHeight: "1.7" }}>{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#0B1629", padding: "72px 0", textAlign: "center" }}>
        <div className="container">
          <div style={{ display: "flex", gap: "4px", justifyContent: "center", marginBottom: "20px" }}>
            {[1,2,3,4,5].map(s => <Star key={s} size={20} fill="#C4973A" color="#C4973A" />)}
          </div>
          <h2 className="font-serif" style={{ fontSize: "clamp(26px, 4vw, 40px)", color: "#fff", marginBottom: "14px" }}>
            Trusted by 50,000+ Customers
          </h2>
          <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.55)", marginBottom: "32px" }}>Free to design. Pay only when you order.</p>
          <Link href="/collections/all" className="btn btn-lg" style={{ background: "#C4973A", color: "#0B1629", fontWeight: 700 }}>
            Start Designing Free <ArrowRight size={18} />
          </Link>
        </div>
      </section>

    </div>
  );
}
