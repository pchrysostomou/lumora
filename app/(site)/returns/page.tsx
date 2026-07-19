import type { Metadata } from "next";
import InfoPage from "@/components/InfoPage";

export const metadata: Metadata = { title: "Returns & Refunds" };

export default function ReturnsPage() {
  return (
    <InfoPage
      eyebrow="Help"
      title="Returns & Refunds"
      intro="Your book should be perfect. If it isn't, we'll make it right."
      sections={[
        { heading: "100% satisfaction guarantee", body: [
          "If your photobook arrives damaged, misprinted, or with a binding defect, we'll reprint and reship it free of charge — no questions asked.",
        ]},
        { heading: "How to report a problem", body: [
          "Email us at hello@lumora.app within 30 days of delivery with your order number and a photo of the issue. We reply within 24 hours with a solution.",
        ]},
        { heading: "Personalised products", body: [
          "Because every book is custom-printed with your photos, we can't accept returns for change of mind. Please review your design carefully in the editor's Preview before ordering.",
        ]},
        { heading: "Refunds", body: [
          "If a reprint isn't possible, we refund the full amount to your original payment method within 5–10 business days.",
        ]},
      ]}
    />
  );
}
