import type { Metadata } from "next";
import RentalPage from "@/routes/wynajem";
import { cities } from "@/lib/cities";

export const metadata: Metadata = {
  title: "Wynajem billboardów",
  description:
    "Wynajmij billboard w województwie mazowieckim. Sprawdź dostępność spośród 1400+ nośników i zarezerwuj termin kampanii.",
  alternates: {
    canonical: "https://wielkiformat.pl/wynajem",
  },
};

/* ── Schema.org: FAQ (point 29) ── */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Jak długo trwa montaż reklamy na billboardzie?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Standardowy montaż reklamy wielkoformatowej trwa od 1 do 3 dni roboczych, w zależności od lokalizacji i formatu nośnika.",
      },
    },
    {
      "@type": "Question",
      name: "Jaki jest minimalny okres wynajmu billboardu?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Minimalny okres wynajmu to 2 tygodnie. Oferujemy również rabaty przy dłuższych kampaniach - do 40% zniżki przy wynajmie rocznym.",
      },
    },
    {
      "@type": "Question",
      name: "Czy cena obejmuje druk i montaż?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tak, oferujemy pełną obsługę kampanii w cenie: od projektu graficznego, przez druk wielkoformatowy, po montaż i demontaż z dokumentacją fotograficzną.",
      },
    },
    {
      "@type": "Question",
      name: "W jakich miastach dostępne są nośniki?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Posiadamy ponad 1400 nośników w województwie mazowieckim, z największą koncentracją w Warszawie i okolicach (Otwock, Józefów, Marki, Pruszków) oraz w Płocku, Radomiu, Siedlcach i Ostrołęce. Sprawdź naszą interaktywną mapę nośników.",
      },
    },
  ],
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Strona główna", item: "https://wielkiformat.pl" },
    { "@type": "ListItem", position: 2, name: "Wynajem billboardów", item: "https://wielkiformat.pl/wynajem" },
  ],
};

const cityListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Wynajem billboardów w miastach Mazowsza",
  itemListElement: cities.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `https://wielkiformat.pl/${c.slug}`,
    name: `Billboardy ${c.name}`,
  })),
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cityListJsonLd) }}
      />
      <RentalPage />
    </>
  );
}
