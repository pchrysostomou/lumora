const FAQS = [
  { cat:"Orders", q:"How long does production take?", a:"3–5 business days. Standard delivery 5–8 days after dispatch. Express options available at checkout." },
  { cat:"Orders", q:"Can I track my order?", a:"Yes — you'll receive a tracking link by email as soon as your order is dispatched." },
  { cat:"Orders", q:"Can I edit after ordering?", a:"You can edit your design up until you place your order. Once production starts, changes aren't possible." },
  { cat:"Quality", q:"What paper do you use?", a:"170gsm premium silk-coated paper with 4-colour offset printing. Vivid, accurate colours that last decades." },
  { cat:"Quality", q:"What if my book arrives damaged?", a:"We'll reprint and reship at no cost. Contact us within 14 days of delivery with a photo of the issue." },
  { cat:"Features", q:"What is the QR Memory feature?", a:"A QR code embedded in your book that links to a digital memory page — videos, voice notes, slideshows. Scan anytime." },
  { cat:"Features", q:"Can I update the QR content later?", a:"Yes — the linked digital page can be updated anytime from your account, even after the book is printed." },
  { cat:"Account", q:"Do I need an account to order?", a:"No account needed to design or order. Create an account to save designs and reorder easily." },
  { cat:"Payments", q:"What payment methods do you accept?", a:"Visa, Mastercard, PayPal, and Stripe. All payments are secured with 256-bit SSL encryption." },
];

const categories = [...new Set(FAQS.map(f=>f.cat))];

export default function FAQPage() {
  return (
    <div>
      <section style={{ background:"linear-gradient(135deg,#0B1629,#1A3A6B)", padding:"72px 0 64px", textAlign:"center" }}>
        <div className="container">
          <p style={{ fontSize:"11px", color:"#C4973A", fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:"12px" }}>Help Centre</p>
          <h1 className="font-serif" style={{ fontSize:"clamp(28px,4vw,48px)", color:"#fff" }}>Frequently Asked Questions</h1>
        </div>
      </section>

      <section style={{ padding:"72px 0" }}>
        <div className="container" style={{ maxWidth:"820px" }}>
          {categories.map(cat=>(
            <div key={cat} style={{ marginBottom:"52px" }}>
              <h2 className="font-serif" style={{ fontSize:"22px", color:"var(--color-fg)", marginBottom:"20px", paddingBottom:"12px", borderBottom:"2px solid var(--color-primary-light)" }}>{cat}</h2>
              <div style={{ display:"flex", flexDirection:"column", gap:"0" }}>
                {FAQS.filter(f=>f.cat===cat).map(({q,a},i,arr)=>(
                  <div key={q} style={{ padding:"20px 0", borderBottom: i<arr.length-1?"1px solid var(--color-border)":"none" }}>
                    <p style={{ fontWeight:700, fontSize:"15px", color:"var(--color-fg)", marginBottom:"8px" }}>{q}</p>
                    <p style={{ fontSize:"14px", color:"var(--color-muted)", lineHeight:"1.75" }}>{a}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div style={{ background:"var(--color-primary-light)", borderRadius:"12px", padding:"28px 32px", textAlign:"center" }}>
            <p style={{ fontWeight:700, color:"var(--color-fg)", marginBottom:"6px" }}>Still have questions?</p>
            <p style={{ fontSize:"14px", color:"var(--color-muted)", marginBottom:"16px" }}>We reply to every message within 24 hours.</p>
            <a href="/contact" className="btn" style={{ background:"var(--color-primary)", color:"#fff" }}>Contact Us</a>
          </div>
        </div>
      </section>
    </div>
  );
}
