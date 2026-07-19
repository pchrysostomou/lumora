import type { Metadata } from "next";
import InfoPage from "@/components/InfoPage";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <InfoPage
      eyebrow="Legal"
      title="Terms of Service"
      intro="The short, human-readable version of how Lumora works."
      sections={[
        { heading: "Your content", body: [
          "You keep full ownership of every photo you upload. By ordering, you grant Lumora a limited licence to print your photos in your book and display them on your private Living Memory page. You confirm you have the right to use the photos you upload.",
        ]},
        { heading: "Orders & pricing", body: [
          "Prices shown at checkout include VAT. An order becomes binding when payment is confirmed. Because books are custom-printed, orders can be cancelled only before production begins — contact us as soon as possible.",
        ]},
        { heading: "Quality promise", body: [
          "Defective or damaged books are reprinted and reshipped free of charge under our satisfaction guarantee. See Returns & Refunds for details.",
        ]},
        { heading: "Acceptable use", body: [
          "Don't upload content that is illegal, infringes someone else's rights, or depicts anyone without their consent. We may decline to print such orders and will refund them in full.",
        ]},
        { heading: "Liability", body: [
          "Lumora's liability for any order is limited to the amount you paid for it. These terms are governed by the laws of the Republic of Cyprus.",
        ]},
      ]}
    />
  );
}
