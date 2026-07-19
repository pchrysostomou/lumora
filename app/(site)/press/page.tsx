import type { Metadata } from "next";
import InfoPage from "@/components/InfoPage";

export const metadata: Metadata = { title: "Press" };

export default function PressPage() {
  return (
    <InfoPage
      eyebrow="Company"
      title="Press & Media"
      intro="Writing about Lumora? Here's everything you need."
      sections={[
        { heading: "Press enquiries", body: [
          "For interviews, review copies, or media assets, email hello@lumora.app with the subject line “Press”. We usually respond within one business day.",
        ]},
        { heading: "About Lumora — boilerplate", body: [
          "Lumora is a design-first studio for travel photobooks. Its browser-based editor, destination templates, and Living Memory QR pages turn digital photos into premium printed keepsakes. Lumora is headquartered in Nicosia, Cyprus.",
        ]},
        { heading: "Brand assets", body: [
          "Logo files, product photography, and founder portraits are available on request. Please don't alter the logo, recolour it, or set it on low-contrast backgrounds.",
        ]},
      ]}
    />
  );
}
