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

> [!WARNING]
> **Work In Progress:** This platform is currently in active development. The frontend UI and interactive editor canvas are fully functional, but backend integrations (Supabase persistence, Stripe Checkout) are actively being built and are not 100% production-ready yet.

## 🌍 Welcome to Lumora
Lumora is a high-fidelity, design-first e-commerce platform and interactive canvas editor dedicated exclusively to **Travel Photobooks**. Built for modern explorers, Lumora transforms scattered digital memories from Paris, Kyoto, or the Maldives into stunning, professionally bound physical books.

Drawing inspiration from premium editorial magazines, Lumora features a state-of-the-art browser editor, dynamic layout generation, and a luxurious dark-themed aesthetic.

---

## ✨ Key Features

### 🎨 Advanced Browser Canvas Editor
- **20-Page Spreads:** Seamlessly navigate between the Cover and 19 internal pages.
- **Drag-and-Drop Gallery:** Upload photos directly to a session-persistent sidebar gallery and drag them onto any page canvas.
- **Smart Layout Engine:** Instantly swap between 1, 2, 3, 4, or 6-photo layouts. The engine automatically redistributes your photos without breaking the design.
- **Keyboard Shortcuts:** Native app feel with `Delete` and `Backspace` element removal.
- **Realistic Spine UI:** Experience the book exactly as it will print, featuring a dynamically rendered vertical spine on the cover preview.

### 🏖️ Exclusive Travel Aesthetics
- **Curated Collections:** Specialized formatting for *Europe Escapes*, *Island Getaways*, *Asian Adventures*, and *City Breaks*.
- **Premium UI/UX:** A stunning dark-navy and champagne-gold color palette with micro-animations and responsive mobile drawers.
- **Dynamic Previews:** Hover effects, high-res Unsplash placeholders, and luxury typography (`Cormorant Garamond` & `Playfair Display`).

### 📦 Commerce Ready
- **User Dashboard:** Dedicated portal (`/dashboard`) for tracking Drafts and Printed Order History.
- **Checkout Integration:** Dynamic pricing calculation based on base product cost and additional page fees.

---

## 🛠️ Tech Stack Architecture

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Frontend Framework** | `Next.js 14` | App Router, Server Components, optimized image loading |
| **Styling** | `Tailwind CSS` | Utility-first, heavily customized with CSS variables |
| **State Management** | `React Hooks` | `useState`, `useRef`, `useCallback` for canvas memory |
| **Icons** | `Lucide React` | Beautiful, consistent SVG icons |
| **Typography** | `Google Fonts` | `Inter`, `Playfair Display`, `Cormorant Garamond` |

---

## 🚀 Getting Started

To run the Lumora platform locally:

```bash
# 1. Clone the repository
git clone https://github.com/pchrysostomou/lumora-photobooks.git

# 2. Navigate to the project directory
cd lumora-photobooks

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to start designing!

---

## 🔮 Roadmap

- [ ] **Supabase Backend:** Sync `canvasState` JSON blobs for persistent cross-session saving.
- [ ] **Stripe Checkout:** End-to-end payment processing for physical prints.
- [ ] **Living Memory QR:** Generate unique `/memory/[hash]` routes that embed video and audio galleries inside the printed book.
- [ ] **Admin Portal:** Headless CMS integration for updating destination collections.

---
