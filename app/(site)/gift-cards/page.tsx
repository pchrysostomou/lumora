import Link from "next/link";
import { ArrowRight, Gift, Mail } from "lucide-react";

const AMOUNTS = [25, 50, 75, 100, 150];

export default function GiftCardsPage() {
  return (
    <div>
      <section style={{ background:"linear-gradient(135deg,#0B1629,#1A3A6B)", padding:"80px 0 72px", textAlign:"center" }}>
        <div className="container">
          <Gift size={48} color="#C4973A" style={{ margin:"0 auto 20px" }}/>
          <h1 className="font-serif" style={{ fontSize:"clamp(32px,5vw,52px)", color:"#fff", marginBottom:"16px" }}>Give the Gift of Memories</h1>
          <p style={{ fontSize:"17px", color:"rgba(255,255,255,0.6)", maxWidth:"480px", margin:"0 auto" }}>
            A Lumora gift card — for anyone whose story deserves to be printed.
          </p>
        </div>
      </section>

      <section style={{ padding:"80px 0" }}>
        <div className="container" style={{ maxWidth:"720px" }}>
          <h2 className="font-serif" style={{ fontSize:"28px", color:"var(--color-fg)", marginBottom:"32px", textAlign:"center" }}>Choose an Amount</h2>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mb-10">
            {AMOUNTS.map(a=>(
              <button key={a} style={{ padding:"20px 12px", borderRadius:"12px", border:"2px solid var(--color-border)", background:"#fff", cursor:"pointer", fontFamily:"'Playfair Display',serif", fontSize:"22px", fontWeight:700, color:"var(--color-fg)", transition:"all 200ms" }}>
                €{a}
              </button>
            ))}
          </div>
          <div style={{ background:"#fff", borderRadius:"16px", padding:"36px", border:"1px solid var(--color-border)", boxShadow:"var(--shadow-card)" }}>
            <p style={{ fontSize:"14px", color:"var(--color-muted)", marginBottom:"24px", lineHeight:"1.7" }}>
              Gift cards are delivered instantly by email and never expire. The recipient can use them on any Lumora photobook.
            </p>
            <div className="flex items-center gap-3">
              <Mail size={20} color="var(--color-primary)"/>
              <input type="email" placeholder="Recipient's email address" style={{ flex:1, padding:"12px 16px", borderRadius:"8px", border:"1.5px solid var(--color-border)", fontSize:"14px", outline:"none", fontFamily:"'Inter',sans-serif" }}/>
            </div>
            <button className="btn btn-lg w-full mt-4" style={{ background:"var(--color-primary)", color:"#fff", fontWeight:700, justifyContent:"center" }}>
              Send Gift Card <ArrowRight size={18}/>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
