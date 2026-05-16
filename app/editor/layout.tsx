import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Photobook Editor | Lumora",
  description: "Design your custom photobook in our powerful in-browser editor.",
};

// The editor is a full-screen app — no site header/footer
export default function EditorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
