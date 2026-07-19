import type { Metadata } from "next";
import InfoPage from "@/components/InfoPage";

export const metadata: Metadata = { title: "Shipping & Delivery" };

export default function ShippingPage() {
  return (
    <InfoPage
      eyebrow="Help"
      title="Shipping & Delivery"
      intro="From our print studio to your doorstep — here's how your photobook travels."
      sections={[
        { heading: "Production time", body: [
          "Every book is printed on demand. Production takes 3–5 business days from the moment your order is confirmed, including binding and quality checks.",
        ]},
        { heading: "Delivery options", body: [
          "Standard delivery takes 5–8 business days after production and is free on orders over €50 (otherwise €4.99).",
          "Express delivery (2–3 business days) is available at checkout for selected destinations.",
        ]},
        { heading: "Where we ship", body: [
          "We currently ship across Europe, including Cyprus, Greece, and the United Kingdom. For other destinations, contact us before ordering and we'll do our best to arrange it.",
        ]},
        { heading: "Tracking", body: [
          "As soon as your book leaves the studio you'll receive a tracking link by email. You can also check the status of any order in your Dashboard under Order History.",
        ]},
      ]}
    />
  );
}
