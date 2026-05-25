import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle, MapPin, Maximize2 } from "lucide-react";
import { LeadForm } from "@/components/LeadForm";
import { cities, getCityBySlug } from "@/lib/cities";
import { COMPANY_PHONE_DISPLAY, COMPANY_PHONE_TEL } from "@/lib/contact";

export const dynamicParams = false;

export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const data = getCityBySlug(city);
  if (!data) return {};

  const title = `Billboardy ${data.name} - wynajem nośników reklamowych`;
  const description = `Wynajem billboardów i reklam wielkoformatowych w ${data.nameLocative}. Sprawdź dostępne lokalizacje, formaty (6×3 m, 12×3 m, citylight) i otrzymaj wycenę kampanii w 24h.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://wielkiformat.pl/${data.slug}`,
    },
    openGraph: {
      title: `${title} | Wielkiformat.pl`,
      description,
      url: `https://wielkiformat.pl/${data.slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    keywords: [
      `billboardy ${data.name}`,
      `billboard ${data.name}`,
      `wynajem billboardów ${data.name}`,
      `reklama wielkoformatowa ${data.name}`,
      `nośniki reklamowe ${data.name}`,
      `banery reklamowe ${data.name}`,
      `outdoor ${data.name}`,
    ],
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const data = getCityBySlug(city);
  if (!data) notFound();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Strona główna",
        item: "https://wielkiformat.pl",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Wynajem billboardów",
        item: "https://wielkiformat.pl/wynajem",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `Billboardy ${data.name}`,
        item: `https://wielkiformat.pl/${data.slug}`,
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Wynajem billboardów ${data.name}`,
    serviceType: "Reklama wielkoformatowa",
    provider: {
      "@type": "Organization",
      name: "Billboard Sp. z o.o.",
      url: "https://wielkiformat.pl",
    },
    areaServed: {
      "@type": "City",
      name: data.name,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Województwo mazowieckie",
      },
    },
    description: data.intro,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background/80 to-background" />
        <div className="absolute inset-0 bg-noise" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav
            aria-label="Ścieżka nawigacyjna"
            className="mb-8 text-xs text-muted-foreground"
          >
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-foreground transition-colors">
                  Strona główna
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href="/wynajem"
                  className="hover:text-foreground transition-colors"
                >
                  Wynajem
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-foreground" aria-current="page">
                Billboardy {data.name}
              </li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-primary text-[11px] font-semibold tracking-[0.2em] uppercase mb-6">
                <MapPin className="w-3.5 h-3.5" />
                {data.region}
              </span>
              <h1 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-6">
                Billboardy{" "}
                <span className="text-gradient-brand-bright text-glow-red">
                  {data.name}
                </span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {data.intro}
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                <Link
                  href="/kontakt"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
                >
                  Zapytaj o wycenę <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={COMPANY_PHONE_TEL}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground font-semibold text-sm hover:bg-surface-elevated transition-colors"
                >
                  Zadzwoń: {COMPANY_PHONE_DISPLAY}
                </a>
              </div>
            </div>

            <div>
              <LeadForm compact />
            </div>
          </div>
        </div>
      </section>

      {/* Routes & districts */}
      <section className="relative py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-6">
                Główne trasy i lokalizacje w {data.nameLocative}
              </h2>
              <ul className="space-y-3">
                {data.routes.map((route) => (
                  <li key={route} className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{route}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-6">
                Dzielnice i osiedla {data.name}
              </h2>
              <div className="flex flex-wrap gap-2">
                {data.districts.map((d) => (
                  <span
                    key={d}
                    className="px-3 py-1.5 rounded-full bg-surface-elevated border border-border text-sm text-muted-foreground"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="relative py-16 md:py-20 bg-surface-elevated/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-8">
            Dla kogo billboardy w {data.nameLocative}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {data.useCases.map((u) => (
              <div
                key={u}
                className="flex items-start gap-3 p-5 rounded-xl bg-surface-elevated border border-border"
              >
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <span className="text-foreground">{u}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formats */}
      <section className="relative py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-8">
            Dostępne formaty nośników
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.formats.map((f) => (
              <div
                key={f}
                className="p-5 rounded-xl bg-surface-elevated border border-border"
              >
                <Maximize2 className="w-6 h-6 text-primary mb-3" />
                <p className="text-foreground font-medium">{f}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-16 md:py-20 bg-surface-elevated/40">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-8">
            Najczęstsze pytania - billboard {data.name}
          </h2>
          <div className="space-y-4">
            {data.faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-xl bg-surface-elevated border border-border p-5"
              >
                <summary className="font-semibold text-foreground cursor-pointer list-none flex items-start justify-between gap-4">
                  <span>{faq.q}</span>
                  <span className="text-primary text-xl leading-none transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Other cities */}
      <section className="relative py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-8">
            Billboardy w innych miastach Mazowsza
          </h2>
          <div className="flex flex-wrap gap-3">
            {cities
              .filter((c) => c.slug !== data.slug)
              .map((c) => (
                <Link
                  key={c.slug}
                  href={`/${c.slug}`}
                  className="px-4 py-2 rounded-full bg-surface-elevated border border-border text-sm text-foreground hover:border-primary/50 hover:text-primary transition-colors"
                >
                  Billboardy {c.name}
                </Link>
              ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground font-semibold text-sm hover:bg-surface-elevated transition-colors"
            >
              Zapytaj o lokalizacje i wycenę <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/cennik"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground font-semibold text-sm hover:bg-surface-elevated transition-colors"
            >
              Cennik billboardów
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
