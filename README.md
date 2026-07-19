<div align="center">
  <img src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=1200" alt="Lumora Cover" width="100%" style="border-radius: 12px; margin-bottom: 20px;" />
  
  <h1 align="center">Lumora</h1>
  <p align="center">
    <strong>Premium Travel Photobook Studio 📸✈️</strong>
  </p>

  <p align="center">
    <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" alt="Next.js" /></a>
    <a href="https://reactjs.org/"><img src="https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react" alt="React" /></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" /></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript" alt="TypeScript" /></a>
  </p>
</div>

---

> [!NOTE]
> **Fully functional out of the box.** The complete flow — design → save → checkout → order → Living Memory QR page — works with zero configuration: drafts and orders persist in the browser (localStorage) and checkout runs in demo mode. Add a `STRIPE_SECRET_KEY` in `.env.local` to switch on real Stripe payments (see `.env.example`).

## 🌍 Welcome to Lumora
Lumora is a high-fidelity, design-first e-commerce platform and interactive canvas editor dedicated exclusively to **Travel Photobooks**. Built for modern explorers, Lumora transforms scattered digital memories from Paris, Kyoto, or the Maldives into stunning, professionally bound physical books.

Drawing inspiration from premium editorial magazines, Lumora features a state-of-the-art browser editor, dynamic layout generation, and a luxurious dark-themed aesthetic.

---

## ✨ Key Features

### 🎨 Advanced Browser Canvas Editor
- **20-Page Spreads:** Seamlessly navigate between the Cover and 19 internal pages, add or duplicate pages freely.
- **Drag-and-Drop Gallery:** Upload photos to the sidebar gallery, then click or drag them onto any photo slot on the canvas.
- **Smart Layout Engine:** Instantly swap between 1, 2, 3, 4, or 6-photo layouts — photos already on the page are re-flowed into the new slots.
- **Save, Autosave & Preview:** Drafts persist in the browser (with autosave), and a full-book preview shows every page at once.
- **Living Memory QR:** Drop a real, scannable QR element on any page — it links to the book's online memory gallery.
- **Undo/Redo & Keyboard Shortcuts:** Full history (including element moves) plus `Delete`/`Backspace` element removal.
- **Realistic Spine UI:** Experience the book exactly as it will print, featuring a dynamically rendered vertical spine on the cover preview.

### 🏖️ Exclusive Travel Aesthetics
- **Curated Collections:** Specialized formatting for *Europe Escapes*, *Island Getaways*, *Asian Adventures*, and *City Breaks*.
- **Premium UI/UX:** A stunning dark-navy and champagne-gold color palette with micro-animations and responsive mobile drawers.
- **Dynamic Previews:** Hover effects, high-res Unsplash placeholders, and luxury typography (`Cormorant Garamond` & `Playfair Display`).

### 📦 Commerce Ready
- **User Dashboard:** Dedicated portal (`/dashboard`) showing your real saved drafts and order history — no account needed.
- **Full Checkout Flow:** `/checkout` with shipping form, size/cover/page pricing, and order summary. Runs in demo mode by default; creates real Stripe Checkout Sessions when `STRIPE_SECRET_KEY` is configured.
- **Living Memory Pages:** Every order gets a unique `/memory/[hash]` gallery page with a shareable QR code, shown on the order confirmation.

---

## 🛠️ Tech Stack Architecture

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Frontend Framework** | `Next.js 16` | App Router, Server Components, Turbopack builds |
| **UI Library** | `React 19` | Client components for the canvas editor & dashboard |
| **Styling** | `Tailwind CSS 4` | Utility-first, heavily customized with CSS variables |
| **Persistence** | `localStorage` | Drafts & orders stored client-side (`lib/storage.ts`) |
| **Payments** | `Stripe` | Optional Checkout Sessions via `/api/checkout` |
| **QR Codes** | `qrcode.react` | Real scannable QR codes for Living Memory pages |
| **Testing** | `Vitest` | Unit tests for pricing, utils, and storage (`npm test`) |
| **Icons** | `Lucide React` | Beautiful, consistent SVG icons |
| **Typography** | `Google Fonts` | `Inter`, `Playfair Display`, `Cormorant Garamond` |

---

## 🚀 Getting Started

To run the Lumora platform locally:

```bash
# 1. Clone the repository
git clone https://github.com/pchrysostomou/lumora.git

# 2. Navigate to the project directory
cd lumora

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to start designing!

### Optional: real Stripe payments

```bash
cp .env.example .env.local   # then set STRIPE_SECRET_KEY=sk_...
```

Without a key, checkout completes in demo mode and orders are stored locally.

### Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Start the development server |
| `npm run build` | Production build (type-checked) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint over the whole project |
| `npm test` | Vitest unit tests |

---

## 🔮 Roadmap

- [x] **Draft Persistence:** Save, autosave, and resume designs (browser localStorage — Supabase sync planned next).
- [x] **Stripe Checkout:** Checkout Session API route, active when `STRIPE_SECRET_KEY` is set; demo mode otherwise.
- [x] **Living Memory QR:** Unique `/memory/[hash]` routes per order with photo galleries and shareable QR codes.
- [ ] **Supabase Backend:** Cross-device sync of drafts and orders.
- [ ] **Video & Audio Memories:** Embed video and audio galleries inside memory pages.
- [ ] **Admin Portal:** Headless CMS integration for updating destination collections.

---
