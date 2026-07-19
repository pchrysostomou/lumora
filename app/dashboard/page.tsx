"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, ShoppingBag, Settings, ChevronRight, Trash2, Plus, QrCode, ArrowLeft } from "lucide-react";
import { PRODUCTS } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { loadDrafts, loadOrders, deleteDraft, clearAllData, type Draft, type Order } from "@/lib/storage";

type Tab = "projects" | "orders" | "settings";

function fmtDate(iso: string): string {
  const d = new Date(iso);
  return isNaN(d.getTime()) ? "" : d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function DraftThumb({ draft }: { draft: Draft }) {
  const cover = draft.pages[0];
  const firstPhoto = draft.pages.flatMap(p => p.elements).find(e => e.type === "image" && e.src)?.src;
  return (
    <div className="aspect-[4/3] relative" style={{ background: cover?.bg || "#EBF0FA" }}>
      {firstPhoto ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={firstPhoto} alt="" className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <BookOpen size={32} style={{ color: "rgba(0,0,0,0.25)" }} />
        </div>
      )}
    </div>
  );
}

const STATUS_COLORS: Record<Order["status"], string> = {
  processing: "#C4973A",
  printed: "#1A3A6B",
  shipped: "#2E7D32",
};

export default function DashboardPage() {
  const [tab, setTab] = useState<Tab>("projects");
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let alive = true;
    queueMicrotask(() => {
      if (!alive) return;
      setDrafts(loadDrafts());
      setOrders(loadOrders());
      setReady(true);
    });
    return () => { alive = false; };
  }, []);

  const removeDraft = (id: string) => {
    deleteDraft(id);
    setDrafts(loadDrafts());
  };

  const NAV = [
    { key: "projects" as Tab, label: "My Projects", icon: BookOpen },
    { key: "orders" as Tab, label: "Order History", icon: ShoppingBag },
    { key: "settings" as Tab, label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F7F9FC] py-12">
      <div className="container max-w-6xl">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#1A3A6B] mb-6">
          <ArrowLeft size={15} /> Back to store
        </Link>
        <div className="flex flex-col md:flex-row gap-8">

          {/* Sidebar */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-[#EBF0FA] p-6 mb-6">
              <div className="w-16 h-16 rounded-full bg-[#1A3A6B] text-white flex items-center justify-center text-xl font-serif font-bold mb-4">
                L
              </div>
              <h2 className="text-lg font-bold text-[#0B1629]">My Lumora</h2>
              <p className="text-sm text-gray-500 mb-6">{drafts.length} project{drafts.length !== 1 && "s"} · {orders.length} order{orders.length !== 1 && "s"}</p>

              <nav className="flex flex-col gap-2">
                {NAV.map(({ key, label, icon: Icon }) => (
                  <button key={key} onClick={() => setTab(key)}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-left ${tab === key ? "bg-[#EFF3FF] text-[#1A3A6B] font-semibold" : "text-gray-600 hover:bg-gray-50"}`}>
                    <Icon size={18} /> {label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="bg-white rounded-xl shadow-sm border border-[#EBF0FA] p-8">

              {tab === "projects" && (
                <>
                  <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-serif font-bold text-[#0B1629]">My Projects</h1>
                    <Link href="/collections/all" className="btn btn-sm" style={{ background: "#C4973A", color: "#0B1629" }}>
                      <Plus size={15} /> Create New Book
                    </Link>
                  </div>

                  {!ready ? null : drafts.length === 0 ? (
                    <div className="text-center py-16">
                      <BookOpen size={40} className="mx-auto mb-4 text-gray-300" />
                      <p className="font-semibold text-[#0B1629] mb-1">No projects yet</p>
                      <p className="text-sm text-gray-500 mb-6">Start designing a photobook — your drafts are saved automatically in this browser.</p>
                      <Link href="/collections/all" className="btn" style={{ background: "#1A3A6B", color: "#fff" }}>Browse Photobooks</Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {drafts.map(d => {
                        const product = PRODUCTS.find(p => p.id === d.productId);
                        return (
                          <div key={d.id} className="group border border-[#EBF0FA] rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                            <div className="relative">
                              <DraftThumb draft={d} />
                              <div className="absolute top-3 right-3 px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-bold uppercase tracking-wider rounded-full text-[#1A3A6B]">
                                Draft
                              </div>
                              <button onClick={() => removeDraft(d.id)} aria-label="Delete draft"
                                className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-red-600 transition-colors">
                                <Trash2 size={15} />
                              </button>
                            </div>
                            <div className="p-5 flex items-center justify-between">
                              <div>
                                <h3 className="font-bold text-[#0B1629] mb-1">{d.title}</h3>
                                <p className="text-sm text-gray-500">Last edited: {fmtDate(d.updatedAt)}{product ? ` · from ${formatPrice(product.basePrice)}` : ""}</p>
                              </div>
                              <Link href={`/editor/${d.productId}?draft=${d.id}`} aria-label={`Edit ${d.title}`}
                                className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#1A3A6B] group-hover:text-white transition-colors">
                                <ChevronRight size={20} />
                              </Link>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              )}

              {tab === "orders" && (
                <>
                  <h1 className="text-2xl font-serif font-bold text-[#0B1629] mb-8">Order History</h1>
                  {!ready ? null : orders.length === 0 ? (
                    <div className="text-center py-16">
                      <ShoppingBag size={40} className="mx-auto mb-4 text-gray-300" />
                      <p className="font-semibold text-[#0B1629] mb-1">No orders yet</p>
                      <p className="text-sm text-gray-500 mb-6">When you order a photobook it will appear here with its tracking status.</p>
                      <Link href="/collections/all" className="btn" style={{ background: "#1A3A6B", color: "#fff" }}>Start Designing</Link>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      {orders.map(o => (
                        <div key={o.id} className="border border-[#EBF0FA] rounded-xl p-5 flex flex-wrap items-center gap-4 justify-between">
                          <div>
                            <p className="font-bold text-[#0B1629]">{o.title}</p>
                            <p className="text-sm text-gray-500">#{o.id.toUpperCase()} · {fmtDate(o.createdAt)} · {o.pageCount} pages</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white" style={{ background: STATUS_COLORS[o.status] }}>
                              {o.status}
                            </span>
                            <span className="font-bold text-[#0B1629]">{formatPrice(o.total)}</span>
                            <Link href={`/memory/${o.memoryHash}`} className="flex items-center gap-1.5 text-sm font-semibold text-[#1A3A6B] hover:underline">
                              <QrCode size={15} /> Memory page
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {tab === "settings" && (
                <>
                  <h1 className="text-2xl font-serif font-bold text-[#0B1629] mb-8">Settings</h1>
                  <div className="border border-[#EBF0FA] rounded-xl p-6 mb-6">
                    <h3 className="font-bold text-[#0B1629] mb-2">Where is my data stored?</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      Your drafts and orders are stored locally in this browser — no account needed.
                      Clearing your browser data will remove them, so order your favourites before switching devices.
                    </p>
                  </div>
                  <div className="border border-red-100 rounded-xl p-6">
                    <h3 className="font-bold text-red-700 mb-2">Clear all local data</h3>
                    <p className="text-sm text-gray-500 mb-4">Removes every draft and order stored in this browser. This cannot be undone.</p>
                    <button
                      onClick={() => { if (window.confirm("Delete all drafts and orders stored in this browser?")) { clearAllData(); setDrafts([]); setOrders([]); } }}
                      className="btn btn-sm" style={{ background: "#FFF0F0", color: "#c62828", border: "1px solid #ffcdd2" }}>
                      <Trash2 size={15} /> Clear data
                    </button>
                  </div>
                </>
              )}

            </div>
          </main>

        </div>
      </div>
    </div>
  );
}
