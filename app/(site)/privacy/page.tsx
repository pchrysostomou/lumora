import type { Metadata } from "next";
import InfoPage from "@/components/InfoPage";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <InfoPage
      eyebrow="Legal"
      title="Privacy Policy"
      intro="Your memories are yours. Here's exactly what we do — and don't do — with your data."
      sections={[
        { heading: "Photos and designs", body: [
          "Photobook designs you create are stored locally in your browser until you place an order. Your photos are used solely to print your book and generate your Living Memory page — never for advertising, AI training, or resale.",
        ]},
        { heading: "Personal information", body: [
          "When you order, we collect your name, email, and shipping address to produce and deliver your book. Payment details are handled entirely by our payment provider (Stripe) and never touch Lumora's servers.",
        ]},
        { heading: "Cookies & analytics", body: [
          "We use only the technical storage needed for the editor and your cart to function. We do not run third-party advertising trackers.",
        ]},
        { heading: "Your rights", body: [
          "You can request a copy or deletion of your data at any time by emailing hello@lumora.app. Local drafts can be removed instantly from Dashboard → Settings → Clear data.",
        ]},
      ]}
    />
  );
}
