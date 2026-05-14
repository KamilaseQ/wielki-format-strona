import type { Metadata } from "next";
import ContactPage from "@/routes/kontakt";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Skontaktuj się z nami. Zapytaj o dostępność billboardów, poproś o wycenę lub umów rozmowę.",
  alternates: {
    canonical: "https://wielkiformat.pl/kontakt",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Strona główna", item: "https://wielkiformat.pl" },
    { "@type": "ListItem", position: 2, name: "Kontakt", item: "https://wielkiformat.pl/kontakt" },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ContactPage />
    </>
  );
}
