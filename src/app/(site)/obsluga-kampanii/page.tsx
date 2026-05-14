import type { Metadata } from "next";
import CampaignServicePage from "@/routes/obsluga-kampanii";

export const metadata: Metadata = {
  title: "Kompleksowa obsługa kampanii",
  description:
    "Pełna obsługa kampanii billboardowej: projekt, druk, montaż, demontaż i dokumentacja fotograficzna.",
  alternates: {
    canonical: "https://wielkiformat.pl/obsluga-kampanii",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Strona główna", item: "https://wielkiformat.pl" },
    { "@type": "ListItem", position: 2, name: "Obsługa kampanii", item: "https://wielkiformat.pl/obsluga-kampanii" },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <CampaignServicePage />
    </>
  );
}
