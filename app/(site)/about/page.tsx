import type { Metadata } from "next";
import InfoPage from "@/components/InfoPage";

export const metadata: Metadata = { title: "About Us" };

export default function AboutPage() {
  return (
    <InfoPage
      eyebrow="Company"
      title="About Lumora"
      intro="We believe your best trips deserve better than a camera roll."
      sections={[
        { heading: "Our story", body: [
          "Lumora started with a simple frustration: thousands of travel photos trapped on phones, never looked at again. We built a design studio in the browser so anyone can turn scattered memories from Paris, Kyoto, or Santorini into a beautifully bound book — in minutes, not weekends.",
        ]},
        { heading: "What makes us different", body: [
          "Destination-first design: curated templates and palettes for the world's most-loved places.",
          "Living Memory QR: every book can include a QR code that opens an online gallery of the same trip — photos and, soon, video and audio.",
          "Premium materials: 170gsm silk-coated paper, flat-lay binding, and covers that feel as good as they look.",
        ]},
        { heading: "Where we are", body: [
          "We're based in Nicosia, Cyprus, and print with partner studios across Europe to keep delivery fast and carbon footprints small.",
        ]},
      ]}
    />
  );
}
