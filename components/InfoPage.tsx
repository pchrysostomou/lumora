import Link from "next/link";

export interface InfoSection {
  heading: string;
  body: string[];
}

export default function InfoPage({ eyebrow, title, intro, sections }: {
  eyebrow: string;
  title: string;
  intro: string;
  sections: InfoSection[];
}) {
  return (
    <div>
      <section style={{ background: "linear-gradient(135deg,#0B1629,#1A3A6B)", padding: "64px 0 56px", textAlign: "center" }}>
        <div className="container">
          <p style={{ fontSize: "11px", color: "#C4973A", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "12px" }}>{eyebrow}</p>
          <h1 className="font-serif" style={{ fontSize: "clamp(28px,4vw,44px)", color: "#fff", marginBottom: "12px" }}>{title}</h1>
          <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.6)", maxWidth: "560px", margin: "0 auto", lineHeight: 1.7 }}>{intro}</p>
        </div>
      </section>

      <section style={{ padding: "64px 0 80px" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          {sections.map(s => (
            <div key={s.heading} style={{ marginBottom: "36px" }}>
              <h2 className="font-serif" style={{ fontSize: "22px", color: "var(--color-fg)", marginBottom: "12px" }}>{s.heading}</h2>
              {s.body.map((p, i) => (
                <p key={i} style={{ fontSize: "15px", color: "#5B6B8A", lineHeight: 1.8, marginBottom: "12px" }}>{p}</p>
              ))}
            </div>
          ))}
          <div style={{ marginTop: "48px", padding: "28px", background: "#F7F9FC", borderRadius: "14px", textAlign: "center", border: "1px solid #EBF0FA" }}>
            <p style={{ fontSize: "15px", color: "var(--color-fg)", marginBottom: "16px", fontWeight: 600 }}>Still have questions?</p>
            <Link href="/contact" className="btn" style={{ background: "#1A3A6B", color: "#fff", fontWeight: 700 }}>Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
