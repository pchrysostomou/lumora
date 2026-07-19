"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { QrCode, Heart, Share2, Camera, Play, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { findOrderByMemoryHash } from "@/lib/storage";

interface Memory {
  title: string;
  author: string;
  date: string;
  coverGradient: string;
  photos: { src: string; caption: string }[];
  message: string;
}

const MOCK_MEMORIES: Record<string, Memory> = {
  default: {
    title: "Our Honeymoon in Santorini",
    author: "Sofia & Andreas",
    date: "June 2025",
    coverGradient: "linear-gradient(135deg, #f5ebe8 0%, #d4b5a8 50%, #c9a88c 100%)",
    photos: [
      { src: "", caption: "Sunset at Oia" },
      { src: "", caption: "Blue domes of Fira" },
      { src: "", caption: "Sailing the Aegean" },
      { src: "", caption: "Local taverna dinner" },
      { src: "", caption: "Caldera view at dawn" },
      { src: "", caption: "Fresh seafood & wine" },
    ],
    message: "Every page of this book holds a piece of our hearts. Thank you for being part of our story. 💕",
  },
};

function PhotoSlide({ photo, gradient }: { photo: { src: string; caption: string }; gradient: string }) {
  return (
    <div className="memory-slide" style={{ background: gradient }}>
      {photo.src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={photo.src} alt={photo.caption} className="memory-slide-img" />
      ) : (
        <div className="memory-slide-placeholder">
          <Camera size={48} className="opacity-30" />
          <span className="memory-slide-placeholder-text">{photo.caption}</span>
        </div>
      )}
      <div className="memory-slide-caption">{photo.caption}</div>
    </div>
  );
}

export default function MemoryPage() {
  const params = useParams();
  const hash = (params?.hash as string) || "default";

  const [memory, setMemory] = useState<Memory>(MOCK_MEMORIES[hash] || MOCK_MEMORIES.default);
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [shareUrl, setShareUrl] = useState(`https://lumora.app/memory/${hash}`);

  useEffect(() => {
    let alive = true;
    queueMicrotask(() => {
      if (!alive) return;
      setShareUrl(window.location.href);
      // If this hash belongs to a real order stored in this browser, show its photos.
      const order = findOrderByMemoryHash(hash);
      if (order) {
        setMemory({
          title: order.title,
          author: order.customer.name || "A Lumora traveller",
          date: new Date(order.createdAt).toLocaleDateString("en-GB", { month: "long", year: "numeric" }),
          coverGradient: "linear-gradient(135deg, #0B1629 0%, #1A3A6B 60%, #3B5EA6 100%)",
          photos: order.photos.length > 0
            ? order.photos.map((src, i) => ({ src, caption: `Memory ${i + 1}` }))
            : MOCK_MEMORIES.default.photos,
          message: "Every page of this book holds a piece of our story. Thank you for scanning!",
        });
        setCurrentPhoto(0);
      }
    });
    return () => { alive = false; };
  }, [hash]);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentPhoto(p => (p + 1) % memory.photos.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isPlaying, memory.photos.length]);

  return (
    <div className="memory-root">
      <div className="memory-hero" style={{ background: memory.coverGradient }}>
        <div className="memory-hero-inner">
          <div className="memory-badge"><QrCode size={14} /><span>QR Memory</span></div>
          <h1 className="memory-title">{memory.title}</h1>
          <p className="memory-meta">
            <span>{memory.author}</span>
            <span className="memory-meta-dot">·</span>
            <span>{memory.date}</span>
          </p>
          <div className="memory-stars">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
            ))}
          </div>
        </div>
      </div>

      <div className="memory-content">
        <section className="memory-gallery-section">
          <div className="memory-gallery-header">
            <h2>Photo Gallery</h2>
            <button
              className={`memory-play-btn ${isPlaying ? "memory-play-btn--active" : ""}`}
              onClick={() => setIsPlaying(p => !p)}
            >
              <Play size={14} />{isPlaying ? "Pause" : "Slideshow"}
            </button>
          </div>
          <div className="memory-slideshow">
            <button className="memory-nav memory-nav--left" onClick={() => setCurrentPhoto(p => (p - 1 + memory.photos.length) % memory.photos.length)}>
              <ChevronLeft size={22} />
            </button>
            <div className="memory-slide-area">
              <PhotoSlide photo={memory.photos[currentPhoto]} gradient={memory.coverGradient} />
              <div className="memory-slide-counter">{currentPhoto + 1} / {memory.photos.length}</div>
            </div>
            <button className="memory-nav memory-nav--right" onClick={() => setCurrentPhoto(p => (p + 1) % memory.photos.length)}>
              <ChevronRight size={22} />
            </button>
          </div>
          <div className="memory-dots">
            {memory.photos.map((_, i) => (
              <button key={i} className={`memory-dot ${i === currentPhoto ? "memory-dot--active" : ""}`} onClick={() => setCurrentPhoto(i)} />
            ))}
          </div>
        </section>

        <section className="memory-grid-section">
          <h2>All Photos</h2>
          <div className="memory-photo-grid">
            {memory.photos.map((p, i) => (
              <div key={i} className={`memory-grid-thumb ${i === currentPhoto ? "memory-grid-thumb--active" : ""}`} style={{ background: memory.coverGradient }} onClick={() => setCurrentPhoto(i)}>
                {p.src
                  // eslint-disable-next-line @next/next/no-img-element -- user photos are data URLs
                  ? <img src={p.src} alt={p.caption} className="w-full h-full object-cover" />
                  : <div className="memory-grid-thumb-placeholder"><Camera size={20} className="opacity-40" /><span>{p.caption}</span></div>
                }
              </div>
            ))}
          </div>
        </section>

        <section className="memory-message-section">
          <div className="memory-message-card">
            <Heart size={28} className="memory-message-heart" />
            <p className="memory-message-text">&ldquo;{memory.message}&rdquo;</p>
            <p className="memory-message-author">— {memory.author}</p>
          </div>
        </section>

        <section className="memory-share-section">
          <div className="memory-qr-card">
            <div className="memory-qr-left">
              <h3>Share this memory</h3>
              <p>Scan the QR code or share the link to let others view these photos.</p>
              <div className="memory-share-actions">
                <button className={`memory-like-btn ${liked ? "memory-like-btn--liked" : ""}`} onClick={() => setLiked(l => !l)}>
                  <Heart size={16} className={liked ? "fill-current" : ""} />{liked ? "Liked!" : "Like"}
                </button>
                <button className="memory-share-btn" onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: memory.title, url: shareUrl }).catch(() => {});
                  } else {
                    navigator.clipboard?.writeText(shareUrl);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }
                }}>
                  <Share2 size={16} /> {copied ? "Link copied!" : "Share"}
                </button>
              </div>
            </div>
            <div className="memory-qr-code-wrap">
              <QRCodeSVG value={shareUrl} size={140} bgColor="#fff" fgColor="#1a1a2e" level="M" />
              <p className="memory-qr-hint">Scan to open</p>
            </div>
          </div>
        </section>

        <section className="memory-cta-section">
          <div className="memory-cta-card">
            <h3>Create your own photobook</h3>
            <p>Turn your memories into a premium printed book with your own QR memory page.</p>
            <Link href="/collections/all" className="memory-cta-btn">Start Creating</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
