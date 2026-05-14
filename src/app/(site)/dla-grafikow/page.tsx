import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileImage, Palette, Scissors, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Specyfikacja plików dla grafików",
  description:
    "Specyfikacja techniczna plików do druku wielkoformatowego: formaty 6×3 m, 12×3 m, wielkoformat. Rozdzielczość, profile kolorów CMYK, spady, czcionki - wszystko, co potrzebne do prawidłowego pliku.",
  alternates: {
    canonical: "https://wielkiformat.pl/dla-grafikow",
  },
  openGraph: {
    title: "Specyfikacja plików dla grafików | wielkiformat.pl",
    description:
      "Wymagania techniczne plików do druku billboardów i reklam wielkoformatowych.",
    url: "https://wielkiformat.pl/dla-grafikow",
  },
  keywords: [
    "specyfikacja plików billboard",
    "plik do druku wielkoformatowego",
    "rozdzielczość billboard",
    "spady billboard",
    "CMYK billboard",
    "preflight",
  ],
};

const specs = [
  {
    icon: FileImage,
    title: "Formaty plików",
    items: [
      "PDF/X-4 (preferowany) lub PDF/X-1a",
      "TIFF z kompresją LZW (alternatywnie)",
      "JPG w wysokiej jakości (tylko jeśli brak PDF)",
      "Pliki źródłowe Adobe Illustrator (AI) lub InDesign (INDD) z osadzonymi linkami",
    ],
  },
  {
    icon: Palette,
    title: "Kolory i profile",
    items: [
      "Tryb kolorów: CMYK (nie RGB)",
      "Profil kolorystyczny: ISO Coated v2 (ECI) lub FOGRA39",
      "Czerń kompozytowa: C30 M30 Y30 K100 dla dużych powierzchni",
      "Maks. TAC (total area coverage): 280%",
    ],
  },
  {
    icon: Scissors,
    title: "Spady i marginesy",
    items: [
      "Spady: min. 2 cm z każdej strony dla billboardów",
      "Bezpieczne marginesy: 3 cm od linii cięcia (ważne treści, logotypy, telefony)",
      "Linie cięcia i pasery niewymagane - wycinamy po formacie netto",
    ],
  },
  {
    icon: AlertTriangle,
    title: "Czcionki i grafika",
    items: [
      "Czcionki zamienione na krzywe (outlines) lub osadzone w PDF",
      "Rozdzielczość zdjęć: 25-50 dpi dla skali 1:1 (billboard 6×3 m)",
      "Dla małych formatów (citylight): 100-150 dpi w skali 1:1",
      "Minimalna grubość linii: 1 pt",
      "Minimalny rozmiar tekstu na billboardzie 6×3 m: 8 cm wysokości",
    ],
  },
];

const sizes = [
  { format: "Billboard 6×3 m", netto: "600 × 300 cm", brutto: "604 × 304 cm (ze spadem 2 cm)" },
  { format: "Billboard 12×3 m", netto: "1200 × 300 cm", brutto: "1204 × 304 cm (ze spadem 2 cm)" },
  { format: "Citylight 1,2×1,8 m", netto: "118,5 × 175 cm", brutto: "120 × 178 cm" },
  { format: "Wielkoformat (mesh)", netto: "wg konstrukcji", brutto: "+ 10 cm na obwód do zamocowania" },
];

export default function DlaGrafikowPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Strona główna", item: "https://wielkiformat.pl" },
      {
        "@type": "ListItem",
        position: 2,
        name: "Specyfikacja dla grafików",
        item: "https://wielkiformat.pl/dla-grafikow",
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
            Dla grafików
          </span>
          <h1 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-6 max-w-3xl">
            Specyfikacja plików <span className="text-gradient-brand-bright text-glow-red">do druku</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
            Poniżej znajdziesz wymagania techniczne dotyczące plików do druku wielkoformatowego.
            Przed drukiem każdy plik przechodzi automatyczny preflight - jeśli coś jest nie tak,
            wracamy z informacją w 24h.
          </p>
        </div>
      </section>

      <section className="relative py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-8">
            Wymiary najczęściej używanych formatów
          </h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-surface-elevated">
                <tr className="text-left text-muted-foreground">
                  <th className="px-4 py-3 font-semibold">Format</th>
                  <th className="px-4 py-3 font-semibold">Wymiary netto</th>
                  <th className="px-4 py-3 font-semibold">Wymiary brutto (z spadem)</th>
                </tr>
              </thead>
              <tbody>
                {sizes.map((s) => (
                  <tr key={s.format} className="border-t border-border">
                    <td className="px-4 py-3 text-foreground font-medium">{s.format}</td>
                    <td className="px-4 py-3 text-muted-foreground">{s.netto}</td>
                    <td className="px-4 py-3 text-muted-foreground">{s.brutto}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="relative py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-8">
            Wymagania techniczne plików
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {specs.map((s) => (
              <div key={s.title} className="p-6 rounded-xl bg-surface-elevated border border-border">
                <s.icon className="w-6 h-6 text-primary mb-4" />
                <h3 className="font-heading font-bold text-lg text-foreground mb-3">{s.title}</h3>
                <ul className="space-y-2">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-16 md:py-20 bg-surface-elevated/40">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-6">
            Wysyłka plików
          </h2>
          <p className="text-muted-foreground mb-4">
            Pliki o wadze do 25 MB możesz wysłać bezpośrednio mailem na adres{" "}
            <a href="mailto:info@wielkiformat.pl" className="text-primary hover:underline">
              info@wielkiformat.pl
            </a>
            . Dla większych plików polecamy WeTransfer, Google Drive lub Dropbox - wystarczy
            przesłać link.
          </p>
          <p className="text-muted-foreground mb-8">
            W tytule maila podaj numer kampanii lub nazwę firmy oraz format nośnika. Po
            otrzymaniu pliku przeprowadzamy preflight i potwierdzamy gotowość do druku.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
            >
              Skontaktuj się z działem druku <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/druk-i-montaz-reklamy"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground font-semibold text-sm hover:bg-surface-elevated transition-colors"
            >
              Zobacz proces produkcji
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
