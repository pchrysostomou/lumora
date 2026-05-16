import Link from "next/link";
import { ArrowRight, Star, Upload, Palette, QrCode, Truck, CheckCircle, BookOpen, Zap, Shield } from "lucide-react";
import { PRODUCTS, CATEGORY_GRADIENTS, type ProductCategory } from "@/lib/data";

const FEATURES = [
  { icon: Upload,    title: "Upload Instantly",    desc: "From any device — phone, desktop, or cloud storage" },
  { icon: Palette,   title: "Design with Ease",    desc: "Intelligent editor that arranges photos beautifully" },
  { icon: QrCode,    title: "Living Memory QR",    desc: "Embed video, audio & galleries inside your printed book" },
  { icon: Truck,     title: "Delivered Fast",      desc: "Premium print & dispatch within 3–5 business days" },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Pick Your Style",   desc: "Choose from curated photobook formats designed for every occasion and story." },
  { step: "02", title: "Build Your Pages",  desc: "Upload your photos. Our editor places them beautifully — or take full creative control." },
  { step: "03", title: "We Bring It to Life", desc: "Premium print, bound with care, delivered straight to your door." },
];

const TESTIMONIALS = [
  { name: "Sophia M.", location: "Athens, GR", rating: 5, text: "The quality blew me away. Every photo looks stunning and the cover feels so premium. Already ordered a second one!", avatar: "SM" },
  { name: "James K.", location: "London, UK", rating: 5, text: "Gave this as a wedding gift — my sister cried! The editor is so easy to use and shipping was faster than expected.", avatar: "JK" },
  { name: "Elena T.", location: "Berlin, DE", rating: 5, text: "Turned my Japan trip photos into a magazine. Friends keep asking where I bought it. The QR feature is genius!", avatar: "ET" },
  { name: "Marco R.", location: "Milan, IT", rating: 5, text: "Third book I've ordered and each one is perfect. The paper quality and color accuracy are unmatched.", avatar: "MR" },
];

const FEATURED_CATEGORIES = [
  { key: "europe",      label: "Europe Escapes",      tagline: "Paris, Rome, Santorini", image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=800" },
  { key: "islands",       label: "Island Getaways",       tagline: "Maldives, Bali", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800" },
  { key: "asia",         label: "Asian Adventures",         tagline: "Japan, Thailand", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800" },
  { key: "cities",  label: "City Breaks",  tagline: "New York, London", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=800" },
];

const LUMORA_CATEGORY_GRADIENTS: Record<string, string> = {
  europe:      "linear-gradient(140deg, #2D3E6B 0%, #4A6FA5 100%)",
  islands:     "linear-gradient(140deg, #1B4D3E 0%, #3A7D5A 100%)",
  asia:        "linear-gradient(140deg, #5C3D7A 0%, #9B6BBD 100%)",
  cities:      "linear-gradient(140deg, #7A3D2E 0%, #C46A3A 100%)",
};

export default function HomePage() {
  return (
    <div>

      {/* ── HERO — Dark Navy Full-Bleed ── */}
      <section style={{
        background: "linear-gradient(135deg, #0B1629 0%, #162444 60%, #1A3A6B 100%)",
        padding: "96px 0 80px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Subtle grid pattern overlay */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(circle, rgba(196,151,58,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }} />
        {/* Gold accent line */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0,
          height: "3px",
          background: "linear-gradient(90deg, transparent, #C4973A, transparent)",
        }} />

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="flex flex-col items-center text-center" style={{ maxWidth: "680px", margin: "0 auto" }}>
            {/* Badge */}
            <span className="animate-fade-in" style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              padding: "5px 14px", borderRadius: "999px",
              background: "rgba(196,151,58,0.15)",
              border: "1px solid rgba(196,151,58,0.35)",
              color: "#C4973A", fontSize: "12px", fontWeight: 600,
              letterSpacing: "0.1em", textTransform: "uppercase",
              marginBottom: "28px",
            }}>
              ✦ Living Memory Technology
            </span>

            <h1 className="font-serif animate-fade-up" style={{
              fontSize: "clamp(38px, 6vw, 68px)", lineHeight: "1.08",
              color: "#FFFFFF", marginBottom: "8px",
              fontWeight: 700,
            }}>
              Your Story,
            </h1>
            <h1 className="font-serif animate-fade-up" style={{
              fontSize: "clamp(38px, 6vw, 68px)", lineHeight: "1.08",
              color: "#C4973A", marginBottom: "28px",
              fontWeight: 700, fontStyle: "italic",
            }}>
              Bound in Gold.
            </h1>

            <p className="animate-fade-up delay-100" style={{
              fontSize: "17px", color: "rgba(255,255,255,0.65)",
              lineHeight: "1.75", maxWidth: "500px", marginBottom: "44px",
            }}>
              Design a premium photobook in minutes. Each page tells a story —
              and the built-in QR code makes it come alive.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up delay-200">
              <Link href="/collections/all" className="btn btn-lg" style={{
                background: "#C4973A", color: "#0B1629", fontWeight: 700,
                boxShadow: "0 4px 24px rgba(196,151,58,0.35)",
              }}>
                Browse Collections <ArrowRight size={18} />
              </Link>
              <Link href="/collections/all" className="btn btn-lg" style={{
                background: "rgba(255,255,255,0.08)",
                border: "1.5px solid rgba(255,255,255,0.2)",
                color: "#fff",
              }}>
                Start Designing
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-4 animate-fade-up delay-300" style={{ marginTop: "48px" }}>
              <div className="flex" style={{ gap: "-8px" }}>
                {["S","J","E","M"].map((l, i) => (
                  <div key={l} style={{
                    width: "36px", height: "36px", borderRadius: "50%",
                    border: "2px solid #162444",
                    background: ["#1A3A6B","#1B4D3E","#5C3D7A","#C4973A"][i],
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#fff", fontSize: "12px", fontWeight: 700,
                    marginLeft: i === 0 ? 0 : "-8px",
                  }}>{l}</div>
                ))}
              </div>
              <div style={{ textAlign: "left" }}>
                <div style={{ display: "flex", gap: "2px", marginBottom: "3px" }}>
                  {[1,2,3,4,5].map(s => <Star key={s} size={13} fill="#C4973A" color="#C4973A" />)}
                </div>
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)" }}>
                  <strong style={{ color: "#fff" }}>4.9/5</strong> from 1,200+ customers
                </p>
              </div>
            </div>
          </div>

          {/* Hero book previews */}
          <div className="grid grid-cols-3 gap-5 mt-20" style={{ maxWidth: "760px", margin: "80px auto 0" }}>
            {FEATURED_CATEGORIES.slice(0, 3).map((cat, i) => (
              <Link
                key={cat.key}
                href="/collections/all"
                className="group relative rounded-xl overflow-hidden"
                style={{
                  aspectRatio: "3/4",
                  backgroundImage: `url(${cat.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  boxShadow: "0 16px 48px rgba(0,0,0,0.4)",
                  animationDelay: `${i * 0.1}s`,
                }}
              >
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 55%)",
                  display: "flex", flexDirection: "column", justifyContent: "flex-end",
                  padding: "18px",
                }}>
                  <p style={{ color: "#fff", fontFamily: "'Playfair Display', serif", fontSize: "17px", fontWeight: 600 }}>{cat.label}</p>
                  <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "12px", marginTop: "2px" }}>{cat.tagline}</p>
                </div>
                {/* Gold corner accent */}
                <div style={{
                  position: "absolute", top: 0, right: 0,
                  width: "3px", height: "40px",
                  background: "#C4973A",
                }} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES STRIP ── */}
      <section style={{
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
        padding: "52px 0",
        backgroundColor: "#FFFFFF",
      }}>
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center text-center gap-3">
                <div style={{
                  width: "48px", height: "48px", borderRadius: "10px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "var(--color-primary-light)",
                  border: "1px solid rgba(26,58,107,0.12)",
                }}>
                  <Icon size={22} color="var(--color-primary)" />
                </div>
                <div>
                  <p style={{ fontWeight: 600, fontSize: "14px", color: "var(--color-fg)" }}>{title}</p>
                  <p style={{ fontSize: "13px", color: "var(--color-muted)", marginTop: "4px" }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COLLECTIONS ── */}
      <section className="section">
        <div className="container">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p style={{
                fontSize: "11px", color: "var(--color-accent)", fontWeight: 700,
                letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "10px",
              }}>Collections</p>
              <h2 className="font-serif" style={{ fontSize: "clamp(26px, 4vw, 40px)", color: "var(--color-fg)" }}>
                Every Story Deserves<br />a Perfect Format
              </h2>
            </div>
            <Link href="/collections/all" style={{
              display: "flex", alignItems: "center", gap: "6px",
              fontSize: "14px", fontWeight: 600, color: "var(--color-primary)",
            }} className="hidden md:flex">
              View all <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {FEATURED_CATEGORIES.map((cat, i) => (
              <Link
                key={cat.key}
                href="/collections/all"
                className="group relative rounded-xl overflow-hidden"
                style={{
                  aspectRatio: "1",
                  backgroundImage: `url(${cat.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  animationDelay: `${i * 0.08}s`,
                }}
              >
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 55%)",
                  display: "flex", flexDirection: "column", justifyContent: "flex-end",
                  padding: "18px", transition: "all 300ms",
                }}>
                  <p className="font-serif" style={{
                    color: "#fff", fontSize: "19px", fontWeight: 600,
                    transition: "transform 300ms",
                  }}>{cat.label}</p>
                  <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "12px", marginTop: "3px" }}>{cat.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS — Deep Navy BG ── */}
      <section className="section" style={{ background: "#0B1629" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <p style={{
              fontSize: "11px", color: "#C4973A", fontWeight: 700,
              letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "10px",
            }}>Simple Process</p>
            <h2 className="font-serif" style={{ fontSize: "clamp(26px, 4vw, 40px)", color: "#FFFFFF" }}>
              From Photos to Pages<br />in Three Steps
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8" style={{ maxWidth: "900px", margin: "0 auto" }}>
            {HOW_IT_WORKS.map(({ step, title, desc }, i) => (
              <div key={step} style={{ textAlign: "center" }}>
                <div style={{
                  width: "60px", height: "60px", borderRadius: "12px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 20px",
                  background: "rgba(196,151,58,0.12)",
                  border: "1.5px solid rgba(196,151,58,0.3)",
                }}>
                  <span style={{
                    fontFamily: "'Playfair Display', serif", fontSize: "22px",
                    fontWeight: 700, color: "#C4973A",
                  }}>{step}</span>
                </div>
                <h3 className="font-serif" style={{ fontSize: "20px", color: "#FFFFFF", marginBottom: "10px" }}>{title}</h3>
                <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", lineHeight: "1.75" }}>{desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "52px" }}>
            <Link href="/collections/all" className="btn btn-lg" style={{
              background: "#C4973A", color: "#0B1629", fontWeight: 700,
              boxShadow: "0 4px 24px rgba(196,151,58,0.3)",
            }}>
              Start Your Book <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── TRUST BARS — 3 stats ── */}
      <section style={{ background: "#EBF0FA", padding: "56px 0" }}>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: BookOpen, stat: "50,000+", label: "Books Printed" },
              { icon: Shield,   stat: "100%",    label: "Satisfaction Guarantee" },
              { icon: Zap,      stat: "3–5 days", label: "Production & Dispatch" },
            ].map(({ icon: Icon, stat, label }) => (
              <div key={label} style={{
                display: "flex", alignItems: "center", gap: "16px",
                background: "#fff", borderRadius: "12px",
                padding: "20px 24px",
                border: "1px solid var(--color-border)",
                boxShadow: "var(--shadow-card)",
              }}>
                <div style={{
                  width: "44px", height: "44px", borderRadius: "10px",
                  background: "var(--color-primary-light)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <Icon size={20} color="var(--color-primary)" />
                </div>
                <div>
                  <p style={{ fontSize: "22px", fontWeight: 700, color: "var(--color-fg)", lineHeight: 1 }}>{stat}</p>
                  <p style={{ fontSize: "13px", color: "var(--color-muted)", marginTop: "4px" }}>{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p style={{
              fontSize: "11px", color: "var(--color-accent)", fontWeight: 700,
              letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "10px",
            }}>Reviews</p>
            <h2 className="font-serif" style={{ fontSize: "clamp(26px, 4vw, 40px)", color: "var(--color-fg)" }}>
              Trusted by Thousands
            </h2>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "12px" }}>
              <div style={{ display: "flex", gap: "2px" }}>
                {[1,2,3,4,5].map(s => <Star key={s} size={17} fill="#C4973A" color="#C4973A" />)}
              </div>
              <span style={{ fontSize: "14px", color: "var(--color-muted)" }}>4.9 average · 1,200+ reviews</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {TESTIMONIALS.map(({ name, location, rating, text, avatar }) => (
              <div key={name} className="card" style={{ padding: "24px" }}>
                {/* Gold quote mark */}
                <div style={{ fontSize: "32px", color: "#C4973A", lineHeight: 1, marginBottom: "12px", fontFamily: "serif" }}>"</div>
                <div style={{ display: "flex", gap: "3px", marginBottom: "12px" }}>
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} size={13} fill="#C4973A" color="#C4973A" />
                  ))}
                </div>
                <p style={{ fontSize: "14px", color: "var(--color-fg)", lineHeight: "1.7", marginBottom: "20px" }}>
                  {text}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", borderTop: "1px solid var(--color-border)", paddingTop: "14px" }}>
                  <div style={{
                    width: "36px", height: "36px", borderRadius: "50%",
                    background: "var(--color-primary)", color: "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "12px", fontWeight: 700, flexShrink: 0,
                  }}>{avatar}</div>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: "13px", color: "var(--color-fg)" }}>{name}</p>
                    <p style={{ fontSize: "12px", color: "var(--color-muted)" }}>{location}</p>
                  </div>
                  <CheckCircle size={15} color="#1B4D3E" style={{ marginLeft: "auto" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QR FEATURE — Diagonal split layout ── */}
      <section className="section" style={{
        background: "linear-gradient(135deg, #0F2447 0%, #1A3A6B 100%)",
        position: "relative", overflow: "hidden",
      }}>
        {/* Decorative gold circles */}
        <div style={{
          position: "absolute", right: "-80px", top: "-80px",
          width: "360px", height: "360px", borderRadius: "50%",
          border: "1px solid rgba(196,151,58,0.12)", pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", right: "-40px", top: "-40px",
          width: "240px", height: "240px", borderRadius: "50%",
          border: "1px solid rgba(196,151,58,0.18)", pointerEvents: "none",
        }} />

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="flex flex-col md:flex-row items-center gap-16" style={{ maxWidth: "960px", margin: "0 auto" }}>
            <div style={{ flex: 1 }}>
              <span style={{
                display: "inline-block", padding: "4px 12px", borderRadius: "6px",
                background: "rgba(196,151,58,0.15)", border: "1px solid rgba(196,151,58,0.3)",
                color: "#C4973A", fontSize: "11px", fontWeight: 700,
                letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "20px",
              }}>Exclusive Feature</span>

              <h2 className="font-serif" style={{
                fontSize: "clamp(26px, 4vw, 44px)", color: "#FFFFFF", marginBottom: "16px",
              }}>
                Your Book Comes<br />to Life with a QR Code
              </h2>

              <p style={{ color: "rgba(255,255,255,0.55)", lineHeight: "1.8", marginBottom: "28px", fontSize: "15px" }}>
                Link a video, voice message, or digital gallery to your printed book.
                Scan the QR code and experience the full story — sights, sounds, and all.
              </p>

              <ul style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "36px" }}>
                {[
                  "Embed videos, audio messages or photo slideshows",
                  "QR code printed directly on your book",
                  "Update the linked content anytime",
                  "Track how many times it's been scanned",
                ].map(item => (
                  <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                    <div style={{
                      width: "20px", height: "20px", borderRadius: "50%",
                      background: "rgba(196,151,58,0.2)", border: "1px solid rgba(196,151,58,0.4)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0, marginTop: "2px",
                    }}>
                      <CheckCircle size={12} color="#C4973A" />
                    </div>
                    <span style={{ fontSize: "15px", color: "rgba(255,255,255,0.65)" }}>{item}</span>
                  </li>
                ))}
              </ul>

              <Link href="/collections/all" className="btn btn-lg" style={{
                background: "#C4973A", color: "#0B1629", fontWeight: 700,
              }}>
                Create Your Book <ArrowRight size={18} />
              </Link>
            </div>

            {/* QR visual */}
            <div style={{ flex: "0 0 auto" }}>
              <div style={{
                width: "260px", height: "260px", borderRadius: "20px",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(196,151,58,0.25)",
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", gap: "16px",
                boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
              }}>
                {/* Stylised QR pattern */}
                <QrCode size={96} color="#C4973A" />
                <div style={{ textAlign: "center" }}>
                  <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "12px" }}>Scan to experience</p>
                  <p style={{ color: "#C4973A", fontSize: "12px", fontWeight: 600 }}>a living memory</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="section" style={{ textAlign: "center", background: "var(--color-bg)" }}>
        <div className="container">
          <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            {/* Gold divider line */}
            <div style={{
              width: "48px", height: "3px", background: "#C4973A",
              margin: "0 auto 32px", borderRadius: "2px",
            }} />
            <h2 className="font-serif" style={{
              fontSize: "clamp(30px, 5vw, 50px)", color: "var(--color-fg)", marginBottom: "16px",
            }}>
              Ready to Create?
            </h2>
            <p style={{ color: "var(--color-muted)", fontSize: "17px", marginBottom: "40px" }}>
              Join 50,000+ customers who have turned their photos into something extraordinary.
            </p>
            <Link href="/collections/all" className="btn btn-lg" style={{
              background: "var(--color-primary)", color: "#fff", fontWeight: 600,
            }}>
              Browse All Collections <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
