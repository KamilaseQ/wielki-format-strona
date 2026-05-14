import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle, Printer, Wrench, Camera, Truck } from "lucide-react";
import { LeadForm } from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Druk i montaż reklamy wielkoformatowej",
  description:
    "Druk wielkoformatowy i profesjonalny montaż billboardów, banerów i siatek mesh. Własna drukarnia solwentowa i UV, ekipa montażystów z uprawnieniami pracy na wysokości.",
  alternates: {
    canonical: "https://wielkiformat.pl/druk-i-montaz-reklamy",
  },
  openGraph: {
    title: "Druk i montaż reklamy wielkoformatowej | wielkiformat.pl",
    description:
      "Druk wielkoformatowy oraz montaż billboardów, banerów i mesh na Mazowszu.",
    url: "https://wielkiformat.pl/druk-i-montaz-reklamy",
  },
  keywords: [
    "druk billboardów Warszawa",
    "druk wielkoformatowy mazowieckie",
    "montaż billboardów",
    "druk banerów",
    "siatka mesh reklamowa",
    "druk solwentowy",
    "frontlit",
  ],
};

const steps = [
  {
    icon: Printer,
    title: "Druk wielkoformatowy",
    desc: "Drukujemy na frontlit, backlit, blueback, mesh i PCV. Rozdzielczość 720-1440 dpi, druk solwentowy ECO i UV. Standardowy realizacja w 3-5 dni roboczych.",
  },
  {
    icon: Truck,
    title: "Logistyka i transport",
    desc: "Dostarczamy wydruki bezpośrednio na lokalizacje montażu na terenie całego Mazowsza. Obsługa magazynowa dla kampanii sieciowych z wieloma terminami.",
  },
  {
    icon: Wrench,
    title: "Montaż na nośnikach",
    desc: "Ekipa z uprawnieniami pracy na wysokości montuje billboardy, banery i mesh - na własnych nośnikach oraz na konstrukcjach klienta. Ubezpieczenie OC.",
  },
  {
    icon: Camera,
    title: "Dokumentacja fotograficzna",
    desc: "Każdy zamontowany nośnik dokumentujemy zdjęciem z lokalizacji - klient otrzymuje raport z datą, godziną i geotagiem.",
  },
];

const formats = [
  { name: "Frontlit (PVC matowy)", desc: "Klasyczny billboard 6×3 m, 12×3 m. Doświetlenie zewnętrzne." },
  { name: "Backlit (PVC podświetlany)", desc: "Citylight, gabloty podświetlane od tyłu." },
  { name: "Mesh / siatka winylowa", desc: "Wielkoformaty 30-100+ m² na fasady budynków, niska parusność." },
  { name: "Blueback (papier)", desc: "Kampanie krótkoterminowe, klejone bezpośrednio na powierzchnię." },
];

export default function DrukMontazPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Strona główna", item: "https://wielkiformat.pl" },
      {
        "@type": "ListItem",
        position: 2,
        name: "Druk i montaż reklamy",
        item: "https://wielkiformat.pl/druk-i-montaz-reklamy",
      },
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
            Druk i montaż
          </span>
          <h1 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-6 max-w-3xl">
            Druk i montaż <span className="text-gradient-brand-bright text-glow-red">reklamy wielkoformatowej</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
            Realizujemy pełen łańcuch produkcji billboardów - od pliku graficznego, przez druk
            wielkoformatowy, po montaż i raport fotograficzny. Pracujemy zarówno na własnych
            nośnikach, jak i na konstrukcjach klienta.
          </p>
        </div>
      </section>

      <section className="relative py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-8">
            Proces produkcji - krok po kroku
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((s) => (
              <div
                key={s.title}
                className="p-6 rounded-xl bg-surface-elevated border border-border"
              >
                <s.icon className="w-6 h-6 text-primary mb-4" />
                <h3 className="font-heading font-bold text-lg text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-16 md:py-20 bg-surface-elevated/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-8">
            Materiały i podłoża
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {formats.map((f) => (
              <div key={f.name} className="p-5 rounded-xl bg-surface-elevated border border-border">
                <h3 className="font-semibold text-foreground mb-1">{f.name}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-6">
              Co wchodzi w standardowy pakiet?
            </h2>
            <ul className="space-y-3 mb-6">
              {[
                "Preflight pliku graficznego (automatyczna weryfikacja przed drukiem)",
                "Druk wielkoformatowy w wybranym formacie i podłożu",
                "Transport wydruku na lokalizację montażu",
                "Montaż przez ekipę z uprawnieniami pracy na wysokości",
                "Dokumentacja fotograficzna z geotagiem",
                "Demontaż po zakończeniu kampanii",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/dla-grafikow"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
            >
              Specyfikacja plików dla grafików <ArrowRight className="w-4 h-4" />
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
