"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import { CheckCircle, QrCode, LayoutDashboard, BookOpen } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { loadOrder, type Order } from "@/lib/storage";

function SuccessInner() {
  const sp = useSearchParams();
  const orderId = sp?.get("order") ?? null;
  const [order, setOrder] = useState<Order | null>(null);
  const [ready, setReady] = useState(false);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    let alive = true;
    queueMicrotask(() => {
      if (!alive) return;
      if (orderId) setOrder(loadOrder(orderId) ?? null);
      setOrigin(window.location.origin);
      setReady(true);
    });
    return () => { alive = false; };
  }, [orderId]);

  if (!ready) return <div style={{ padding: "120px 24px", textAlign: "center", color: "var(--color-muted)" }}>Loading…</div>;

  const memoryUrl = order ? `${origin}/memory/${order.memoryHash}` : "";

  return (
    <div style={{ background: "#F7F9FC", minHeight: "100vh" }}>
      <div className="container" style={{ maxWidth: "720px", padding: "64px 24px 96px", textAlign: "center" }}>
        <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "#E8F4EA", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
          <CheckCircle size={36} color="#2E7D32" />
        </div>
        <h1 className="font-serif" style={{ fontSize: "clamp(28px,4vw,40px)", color: "#0B1629", marginBottom: "10px" }}>Order confirmed!</h1>
        <p style={{ color: "var(--color-muted)", fontSize: "15px", marginBottom: "36px", lineHeight: 1.7 }}>
          {order
            ? <>Thank you, {order.customer.name.split(" ")[0] || "friend"}! Your photobook is heading to print. A confirmation was sent to <strong>{order.customer.email}</strong>.</>
            : "Thank you! Your photobook is heading to print."}
        </p>

        {order && (
          <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #EBF0FA", padding: "28px", marginBottom: "28px", textAlign: "left" }}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
              <div>
                <p style={{ fontSize: "12px", color: "var(--color-muted)", textTransform: "uppercase", letterSpacing: ".08em", fontWeight: 700 }}>Order</p>
                <p style={{ fontWeight: 700, color: "#0B1629" }}>#{order.id.toUpperCase()}</p>
              </div>
              <div>
                <p style={{ fontSize: "12px", color: "var(--color-muted)", textTransform: "uppercase", letterSpacing: ".08em", fontWeight: 700 }}>Total</p>
                <p style={{ fontWeight: 700, color: "#0B1629" }}>{formatPrice(order.total)}</p>
              </div>
              <div>
                <p style={{ fontSize: "12px", color: "var(--color-muted)", textTransform: "uppercase", letterSpacing: ".08em", fontWeight: 700 }}>Status</p>
                <p style={{ fontWeight: 700, color: "#C4973A" }}>Processing</p>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px 14px", background: "#F7F9FC", borderRadius: "10px", fontSize: "14px", color: "var(--color-fg)" }}>
              <BookOpen size={16} color="#1A3A6B" />
              <span><strong>{order.title}</strong> · {order.pageCount} pages</span>
            </div>

            {/* QR Memory */}
            <div style={{ display: "flex", gap: "20px", alignItems: "center", marginTop: "20px", padding: "20px", border: "1.5px dashed #C4973A", borderRadius: "12px", flexWrap: "wrap" }}>
              <div style={{ background: "#fff", padding: "10px", borderRadius: "10px", border: "1px solid #EBF0FA" }}>
                <QRCodeSVG value={memoryUrl} size={104} bgColor="#fff" fgColor="#0B1629" level="M" />
              </div>
              <div style={{ flex: 1, minWidth: "200px" }}>
                <p style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: 700, color: "#0B1629", marginBottom: "6px" }}>
                  <QrCode size={16} color="#C4973A" /> Your Living Memory page
                </p>
                <p style={{ fontSize: "13px", color: "var(--color-muted)", lineHeight: 1.6, marginBottom: "10px" }}>
                  This QR code will be printed inside your book. Anyone who scans it sees your photo gallery online.
                </p>
                <Link href={`/memory/${order.memoryHash}`} style={{ fontSize: "13px", fontWeight: 700, color: "#1A3A6B" }}>
                  Preview your memory page →
                </Link>
              </div>
            </div>
          </div>
        )}

        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/dashboard" className="btn btn-lg" style={{ background: "#1A3A6B", color: "#fff", fontWeight: 700 }}>
            <LayoutDashboard size={17} /> Go to Dashboard
          </Link>
          <Link href="/collections/all" className="btn btn-lg" style={{ background: "#fff", color: "#1A3A6B", border: "1.5px solid #DDE3EF", fontWeight: 700 }}>
            Create Another Book
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div style={{ padding: "120px 24px", textAlign: "center", color: "var(--color-muted)" }}>Loading…</div>}>
      <SuccessInner />
    </Suspense>
  );
}
