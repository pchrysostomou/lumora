import Link from "next/link";
import { ArrowRight, Upload, Palette, QrCode, Truck, CheckCircle } from "lucide-react";

const STEPS = [
  {
    step: "01",
    icon: Upload,
    title: "Choose Your Book",
    subtitle: "Browse & Customise",
    desc: "Start by selecting a photobook format — softcover, hardcover or premium leather. Pick your size: A5, A4, or Square. Decide how many pages you need (20 to 80). The live price calculator updates instantly.",
    tips: ["No account needed to start", "Save your design anytime", "Come back and edit later"],
  },
  {
    step: "02",
    icon: Palette,
    title: "Design Every Page",
    subtitle: "Our Editor Does the Heavy Lifting",
    desc: "Upload your photos from your computer, phone, or via QR code. Our intelligent editor arranges them beautifully — or take full creative control. Add text, stickers, backgrounds and shape masks. Every spread is yours to own.",
    tips: ["Drag & drop photos anywhere", "50+ curated templates", "Undo/redo everything"],
  },
  {
    step: "03",
    icon: QrCode,
    title: "Add a Living Memory",
    subtitle: "The Feature That Sets Us Apart",
    desc: "Link a video, voice message, or photo slideshow to your printed book via QR code. When someone scans the page, they experience the full story — not just the photo, but the moment. Update the linked content anytime, even after printing.",
    tips: ["Embed videos & audio", "Update content anytime", "Track how many scans"],
  },
  {
    step: "04",
    icon: Truck,
    title: "We Print & Deliver",
    subtitle: "Premium Quality, Fast",
    desc: "Place your order and our production team gets to work. 170gsm silk-coated paper. Vivid 4-colour offset printing. Flat-lay binding so pages open fully. Dispatched within 3–5 business days, delivered to your door.",
    tips: ["Free shipping over €50", "Tracked delivery", "Free reprint if any defect"],
  },
];

const FAQS = [
  { q: "How long does it take?", a: "Production takes 3–5 business days. Standard delivery is 5–8 days after dispatch. Express delivery is available at checkout." },
  { q: "What paper quality do you use?", a: "170gsm premium silk-coated paper with 4-colour offset printing. The result is vibrant, true-to-life photos that last decades." },
  { q: "Can I edit my book after ordering?", a: "You can edit your design up until the point you place your order. Once production begins, changes aren't possible — so take your time in the editor!" },
  { q: "What's the QR Memory feature?", a: "Every Lumora book can include a QR code that links to a digital memory page — embed videos, voice notes, or slideshows. Scan and experience the full story." },
  { q: "What if my book arrives damaged?", a: "We offer a 100% satisfaction guarantee. If your book arrives with a print defect or damage, we'll reprint and reship at no cost." },
  { q: "Do I need an account to order?", a: "No account needed to design! You can save your progress and place an order as a guest or create an account to access your designs later." },
];

export default function HowItWorksPage() {
  return (
    <div style={{ background: "var(--color-bg)" }}>

      {/* Hero */}
      <section style={{
        background: "linear-gradient(135deg, #0B1629 0%, #1A3A6B 100%)",
        padding: "80px 0 72px",
        textAlign: "center",
      }}>
        <div className="container">
          <p style={{ fontSize: "11px", color: "#C4973A", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "16px" }}>How It Works</p>
          <h1 className="font-serif" style={{ fontSize: "clamp(32px, 5vw, 56px)", color: "#fff", marginBottom: "18px" }}>
            From Photos to Pages<br />in Four Simple Steps
          </h1>
          <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.6)", maxWidth: "520px", margin: "0 auto 36px", lineHeight: "1.75" }}>
            Everything you need to create a premium, personalised photobook —
            no design experience required.
          </p>
          <Link href="/collections/all" className="btn btn-lg" style={{ background: "#C4973A", color: "#0B1629", fontWeight: 700 }}>
            Start Designing <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Steps */}
      <section style={{ padding: "80px 0" }}>
        <div className="container">
          <div style={{ display: "flex", flexDirection: "column", gap: "80px" }}>
            {STEPS.map(({ step, icon: Icon, title, subtitle, desc, tips }, i) => (
              <div key={step} style={{
                display: "grid",
                gridTemplateColumns: i % 2 === 0 ? "1fr 1fr" : "1fr 1fr",
                gap: "64px",
                alignItems: "center",
                direction: i % 2 === 1 ? "rtl" : "ltr",
              }} className="how-it-works-row">
                {/* Visual */}
                <div style={{ direction: "ltr" }}>
                  <div style={{
                    background: "#fff",
                    borderRadius: "20px",
                    padding: "52px 40px",
                    boxShadow: "var(--shadow-hover)",
                    border: "1px solid var(--color-border)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "20px",
                    textAlign: "center",
                  }}>
                    <div style={{
                      width: "80px", height: "80px", borderRadius: "16px",
                      background: "var(--color-primary-light)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <Icon size={36} color="var(--color-primary)" />
                    </div>
                    <span style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "64px", fontWeight: 800,
                      color: "var(--color-border)",
                      lineHeight: 1,
                    }}>{step}</span>
                    <p style={{ fontSize: "14px", color: "var(--color-muted)", fontWeight: 500 }}>{subtitle}</p>
                  </div>
                </div>

                {/* Text */}
                <div style={{ direction: "ltr" }}>
                  <p style={{ fontSize: "11px", color: "var(--color-accent)", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "10px" }}>Step {step}</p>
                  <h2 className="font-serif" style={{ fontSize: "clamp(24px, 3vw, 36px)", color: "var(--color-fg)", marginBottom: "16px" }}>{title}</h2>
                  <p style={{ fontSize: "16px", color: "var(--color-muted)", lineHeight: "1.8", marginBottom: "24px" }}>{desc}</p>
                  <ul style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {tips.map(tip => (
                      <li key={tip} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <CheckCircle size={16} color="var(--color-primary)" style={{ flexShrink: 0 }} />
                        <span style={{ fontSize: "15px", color: "var(--color-fg)", fontWeight: 500 }}>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section style={{ background: "#0B1629", padding: "60px 0" }}>
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8" style={{ textAlign: "center" }}>
            {[
              { stat: "50,000+", label: "Books Delivered" },
              { stat: "4.9★", label: "Average Rating" },
              { stat: "3–5 days", label: "Production Time" },
              { stat: "100%", label: "Satisfaction Guarantee" },
            ].map(({ stat, label }) => (
              <div key={label}>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "32px", fontWeight: 700, color: "#C4973A" }}>{stat}</p>
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", marginTop: "6px" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "80px 0" }}>
        <div className="container" style={{ maxWidth: "780px" }}>
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <p style={{ fontSize: "11px", color: "var(--color-accent)", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "10px" }}>FAQ</p>
            <h2 className="font-serif" style={{ fontSize: "clamp(26px, 4vw, 40px)", color: "var(--color-fg)" }}>Common Questions</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {FAQS.map(({ q, a }, i) => (
              <div key={q} style={{ padding: "24px 0", borderBottom: i < FAQS.length - 1 ? "1px solid var(--color-border)" : "none" }}>
                <p style={{ fontWeight: 700, fontSize: "16px", color: "var(--color-fg)", marginBottom: "8px" }}>{q}</p>
                <p style={{ fontSize: "15px", color: "var(--color-muted)", lineHeight: "1.75" }}>{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "var(--color-primary-light)", padding: "72px 0", textAlign: "center" }}>
        <div className="container">
          <h2 className="font-serif" style={{ fontSize: "clamp(28px, 4vw, 44px)", color: "var(--color-fg)", marginBottom: "14px" }}>Ready to Start?</h2>
          <p style={{ fontSize: "16px", color: "var(--color-muted)", marginBottom: "32px" }}>No account needed. Free to design. Pay only when you order.</p>
          <Link href="/collections/all" className="btn btn-lg" style={{ background: "var(--color-primary)", color: "#fff", fontWeight: 600 }}>
            Browse Collections <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .how-it-works-row {
            grid-template-columns: 1fr !important;
            direction: ltr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </div>
  );
}
