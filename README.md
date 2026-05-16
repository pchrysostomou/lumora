# Lumora — Custom Travel Photobooks

Lumora is a premium, design-first platform for creating exquisite travel photobooks directly in the browser. Focused exclusively on high-end travel memories (Europe Escapes, Island Getaways, Asian Adventures, City Breaks), Lumora allows users to quickly build 20-page spreads with smart layouts, beautiful templates, and dynamic QR code integrations.

## Features

- **Smart Canvas Editor:** A highly interactive Drag-and-Drop canvas (Next.js 14) that feels like a native application.
- **Destination Templates:** Pre-designed templates with specific color palettes and typographic styling (Paris, Santorini, Kyoto, etc.).
- **Dynamic Layout Engine:** Easily replace page content with 1-to-6 photo layouts instantly.
- **Image Upload Gallery:** Drag photos straight from your device, save them to the session gallery, and place them across multiple spreads.
- **Mobile-Responsive UI:** Fully fluid mobile navigation with animated off-canvas drawers and dark-luxury aesthetics.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + Vanilla CSS Modules
- **State Management:** React Hooks (`useState`, `useRef`, `useCallback`)
- **Icons:** Lucide React

## Development

```bash
# Install dependencies
npm install

# Start the local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Next Steps
- Supabase integration for persisting `canvasState` and `uploads`.
- Stripe Checkout for the `Order` flow.
- Admin portal for content management.
