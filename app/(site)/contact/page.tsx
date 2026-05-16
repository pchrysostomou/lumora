"use client";
import { useState } from "react";
import { Mail, MessageSquare, Phone, MapPin, Check } from "lucide-react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name:"", email:"", subject:"", message:"" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  const INPUT_STYLE = {
    width:"100%", padding:"12px 16px", borderRadius:"8px",
    border:"1.5px solid var(--color-border)", fontSize:"15px",
    outline:"none", fontFamily:"'Inter',sans-serif",
    color:"var(--color-fg)", background:"#fff",
  } as const;

  return (
    <div>
      <section style={{ background:"linear-gradient(135deg,#0B1629,#1A3A6B)", padding:"72px 0 64px", textAlign:"center" }}>
        <div className="container">
          <p style={{ fontSize:"11px", color:"#C4973A", fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:"12px" }}>Get in Touch</p>
          <h1 className="font-serif" style={{ fontSize:"clamp(28px,4vw,48px)", color:"#fff", marginBottom:"12px" }}>We'd Love to Hear From You</h1>
          <p style={{ fontSize:"16px", color:"rgba(255,255,255,0.6)" }}>We reply to every message within 24 hours.</p>
        </div>
      </section>

      <section style={{ padding:"72px 0" }}>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12" style={{ maxWidth:"960px", margin:"0 auto", alignItems:"start" }}>
            
            {/* Info */}
            <div>
              <h2 className="font-serif" style={{ fontSize:"24px", color:"var(--color-fg)", marginBottom:"24px" }}>Contact Information</h2>
              {[
                { icon:Mail, label:"Email", value:"hello@lumora.app" },
                { icon:Phone, label:"Phone", value:"+357 22 000 000" },
                { icon:MapPin, label:"Address", value:"Nicosia, Cyprus" },
                { icon:MessageSquare, label:"Support Hours", value:"Mon–Fri, 9am–6pm EET" },
              ].map(({icon:Icon,label,value})=>(
                <div key={label} style={{ display:"flex", gap:"16px", marginBottom:"20px" }}>
                  <div style={{ width:"44px", height:"44px", borderRadius:"10px", background:"var(--color-primary-light)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <Icon size={20} color="var(--color-primary)"/>
                  </div>
                  <div>
                    <p style={{ fontSize:"12px", fontWeight:700, color:"var(--color-muted)", textTransform:"uppercase", letterSpacing:"0.08em" }}>{label}</p>
                    <p style={{ fontSize:"15px", color:"var(--color-fg)", marginTop:"2px" }}>{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div style={{ background:"#fff", borderRadius:"16px", padding:"36px", border:"1px solid var(--color-border)", boxShadow:"var(--shadow-card)" }}>
              {sent ? (
                <div style={{ textAlign:"center", padding:"32px 0" }}>
                  <div style={{ width:"56px", height:"56px", borderRadius:"50%", background:"#E8F4EA", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}>
                    <Check size={28} color="#5A8F6A"/>
                  </div>
                  <h3 className="font-serif" style={{ fontSize:"22px", color:"var(--color-fg)", marginBottom:"8px" }}>Message Sent!</h3>
                  <p style={{ color:"var(--color-muted)", fontSize:"14px" }}>We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label style={{ fontSize:"13px", fontWeight:600, color:"var(--color-fg)", display:"block", marginBottom:"6px" }}>Your Name</label>
                      <input required style={INPUT_STYLE} value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="Sofia"/>
                    </div>
                    <div>
                      <label style={{ fontSize:"13px", fontWeight:600, color:"var(--color-fg)", display:"block", marginBottom:"6px" }}>Email</label>
                      <input required type="email" style={INPUT_STYLE} value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} placeholder="you@email.com"/>
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize:"13px", fontWeight:600, color:"var(--color-fg)", display:"block", marginBottom:"6px" }}>Subject</label>
                    <select style={INPUT_STYLE} value={form.subject} onChange={e=>setForm(f=>({...f,subject:e.target.value}))}>
                      <option value="">Select a topic...</option>
                      <option>Order Issue</option><option>Print Quality</option>
                      <option>QR Memory Feature</option><option>Billing</option><option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize:"13px", fontWeight:600, color:"var(--color-fg)", display:"block", marginBottom:"6px" }}>Message</label>
                    <textarea required rows={5} style={{ ...INPUT_STYLE, resize:"vertical" }} value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))} placeholder="How can we help?"/>
                  </div>
                  <button type="submit" className="btn btn-lg" style={{ background:"var(--color-primary)", color:"#fff", fontWeight:700, justifyContent:"center" }}>
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
