import type { Metadata } from "next";
import AboutPage from "@/routes/o-nas";

export const metadata: Metadata = {
  title: "O nas",
  description:
    "Poznaj Billboard Sp. z o.o. - działamy od 1998 roku w reklamie wielkoformatowej i billboardach.",
  alternates: {
    canonical: "https://wielkiformat.pl/o-nas",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Strona główna", item: "https://wielkiformat.pl" },
    { "@type": "ListItem", position: 2, name: "O nas", item: "https://wielkiformat.pl/o-nas" },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <AboutPage />
    </>
  );
}
