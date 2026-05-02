import type { Metadata } from "next";
import RentalPage from "@/routes/wynajem";

export const metadata: Metadata = {
  title: "Wynajem billboardów",
  description:
    "Wynajmij billboard w województwie mazowieckim. Sprawdź dostępność spośród 1400+ nośników i zarezerwuj termin kampanii.",
  alternates: {
    canonical: "https://wielki-format-strona.vercel.app/wynajem",
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
