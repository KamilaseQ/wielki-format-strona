import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle, Info } from "lucide-react";
import { LeadForm } from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Cennik billboardów - ile kosztuje wynajem nośnika",
  description:
    "Cennik wynajmu billboardów w województwie mazowieckim. Sprawdź orientacyjne stawki dla formatów 6×3 m, 12×3 m i citylight oraz czynniki wpływające na końcową cenę kampanii.",
  alternates: {
    canonical: "https://wielkiformat.pl/cennik",
  },
  openGraph: {
    title: "Cennik billboardów | Wielkiformat.pl",
    description:
      "Orientacyjne ceny wynajmu billboardów na Mazowszu i czynniki wpływające na koszt kampanii outdoorowej.",
    url: "https://wielkiformat.pl/cennik",
  },
  keywords: [
    "cennik billboardów",
    "ile kosztuje billboard",
    "billboard 6x3 cena",
    "billboard 12x3 cena",
    "wynajem billboardów cena",
    "cena reklamy wielkoformatowej",
  ],
};

const priceRows = [
  {
    format: "Billboard 6×3 m (osiedlowy)",
    biweekly: "od 800 zł",
    monthly: "od 1 400 zł",
    notes: "Lokalizacje osiedlowe i przy drogach lokalnych",
  },
  {
    format: "Billboard 6×3 m (premium)",
    biweekly: "1 400-2 000 zł",
    monthly: "2 400-3 400 zł",
    notes: "Główne arterie miejskie, wysoki ruch dobowy",
  },
  {
    format: "Billboard 12×3 m",
    biweekly: "2 200-3 200 zł",
    monthly: "3 800-5 400 zł",
    notes: "Trasy ekspresowe, wyloty z miast, frontlight",
  },
  {
    format: "Citylight 1,2×1,8 m",
    biweekly: "od 600 zł",
    monthly: "od 1 100 zł",
    notes: "Przystanki, ciągi piesze, centra handlowe",
  },
  {
    format: "Wielkoformat 30-100+ m²",
    biweekly: "wycena indywidualna",
    monthly: "wycena indywidualna",
    notes: "Frontony budynków, siatki reklamowe, mesh",
  },
];

const factors = [
  {
    title: "Lokalizacja",
    desc: "Cena nośnika rośnie wraz z ruchem dobowym i widocznością. Topowe lokalizacje przy S8, A2 czy Wisłostradzie kosztują nawet 3× więcej niż nośniki osiedlowe.",
  },
  {
    title: "Format i powierzchnia",
    desc: "Standard 6×3 m, format 12×3 m, citylight oraz wielkoformaty 30-100+ m² mają różne stawki. Im większa powierzchnia, tym wyższy koszt produkcji wydruku.",
  },
  {
    title: "Czas trwania kampanii",
    desc: "Standardowy okres wynajmu to 2 tygodnie. Przy dłuższych kampaniach (3-12 miesięcy) udzielamy rabatów do 40%.",
  },
  {
    title: "Liczba nośników",
    desc: "Przy rezerwacji pakietowej (np. 10+ nośników w jednej kampanii) ceny jednostkowe spadają nawet o 25%.",
  },
  {
    title: "Druk i montaż",
    desc: "W cenie wynajmu standardowo zawarty jest druk, montaż i demontaż billboardu (na format 6×3 m i 12×3 m). Wielkoformaty wyceniamy indywidualnie.",
  },
  {
    title: "Sezonowość",
    desc: "W szczytach kampanijnych (przed świętami, na koniec roku, w sezonie wakacyjnym) dostępność spada, a ceny topowych nośników mogą wzrosnąć.",
  },
];

export default function CennikPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Strona główna", item: "https://wielkiformat.pl" },
      { "@type": "ListItem", position: 2, name: "Cennik", item: "https://wielkiformat.pl/cennik" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background/80 to-background" />
        <div className="absolute inset-0 bg-noise" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-primary text-[11px] font-semibold tracking-[0.2em] uppercase mb-6">
            Cennik
          </span>
          <h1 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-6 max-w-3xl">
            Ile kosztuje <span className="text-gradient-brand-bright text-glow-red">billboard</span>?
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
            Cena wynajmu billboardu zależy od lokalizacji, formatu nośnika i długości kampanii.
            Poniżej publikujemy orientacyjne stawki dla Mazowsza - każdą kampanię wyceniamy
            jednak indywidualnie, biorąc pod uwagę realny ruch w danej lokalizacji i Twoje cele
            biznesowe.
          </p>
        </div>
      </section>

      <section className="relative py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-6">
            Orientacyjne stawki wynajmu
          </h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-surface-elevated">
                <tr className="text-left text-muted-foreground">
                  <th className="px-4 py-3 font-semibold">Format</th>
                  <th className="px-4 py-3 font-semibold">2 tygodnie</th>
                  <th className="px-4 py-3 font-semibold">Miesiąc</th>
                  <th className="px-4 py-3 font-semibold">Uwagi</th>
                </tr>
              </thead>
              <tbody>
                {priceRows.map((row) => (
                  <tr key={row.format} className="border-t border-border">
                    <td className="px-4 py-3 text-foreground font-medium">{row.format}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.biweekly}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.monthly}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
            <Info className="w-4 h-4 mt-0.5 shrink-0" />
            Ceny netto, bez VAT. Stawki orientacyjne - finalna wycena zależy od dostępności
            i konkretnej lokalizacji.
          </p>
        </div>
      </section>

      <section className="relative py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-8">
            Co wpływa na cenę kampanii?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {factors.map((f) => (
              <div
                key={f.title}
                className="p-6 rounded-xl bg-surface-elevated border border-border"
              >
                <h3 className="font-heading font-bold text-lg text-foreground mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-16 md:py-20 bg-surface-elevated/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-6">
              Otrzymaj indywidualną wycenę
            </h2>
            <p className="text-muted-foreground mb-6">
              Opisz krótko swój budżet i cel kampanii - przygotujemy dla Ciebie dopasowaną ofertę
              z konkretnymi lokalizacjami i terminami dostępności. Zazwyczaj wracamy z odpowiedzią
              w 24h.
            </p>
            <ul className="space-y-3 mb-6">
              {[
                "Druk, montaż i demontaż w cenie wynajmu standardowego nośnika",
                "Dokumentacja fotograficzna z każdej lokalizacji",
                "Rabaty 15-40% przy kampaniach dłuższych niż 3 miesiące",
                "Możliwość rezerwacji pakietowej (10+ nośników)",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
            >
              Poproś o wycenę kampanii <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div>
            <LeadForm compact />
          </div>
        </div>
      </section>
    </>
  );
}
