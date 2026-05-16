import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Lumora — Custom Photobooks", template: "%s | Lumora" },
  description: "Design and print stunning custom photobooks. Upload your photos, customize every page, and receive a beautifully printed book at your door.",
  keywords: ["photobook", "custom photobook", "photo printing", "wedding photobook", "travel book"],
  openGraph: {
    type: "website",
    siteName: "Lumora",
    title: "Lumora — Custom Photobooks",
    description: "Turn your memories into beautifully printed photobooks.",
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "theme-color": "#FAF9F7",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
