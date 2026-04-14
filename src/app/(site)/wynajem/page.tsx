import type { Metadata } from "next";
import RentalPage from "@/routes/wynajem";

export const metadata: Metadata = {
  title: "Wynajem billboardów",
  description:
    "Wynajmij billboard w dowolnym mieście w Polsce. Sprawdź dostępność nośników i zarezerwuj termin kampanii.",
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
        text: "Posiadamy nośniki w 16 województwach, z największą koncentracją w Warszawie, Krakowie, Wrocławiu, Poznaniu, Gdańsku i Katowicach. Sprawdź naszą interaktywną mapę nośników.",
      },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <RentalPage />
    </>
  );
}
