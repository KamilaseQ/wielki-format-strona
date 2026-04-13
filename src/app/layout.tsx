import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://wielkiformat.pl"),
  title: {
    default: "wielkiformat.pl | Reklama wielkoformatowa i billboardy",
    template: "%s | wielkiformat.pl",
  },
  description:
    "Billboardy i reklama wielkoformatowa na terenie całej Polski. Ponad 25 lat doświadczenia, szybka wycena i kompleksowa obsługa kampanii.",
  applicationName: "wielkiformat.pl",
  keywords: [
    "billboardy",
    "reklama wielkoformatowa",
    "outdoor",
    "wynajem billboardów",
    "mapa nośników",
    "billboard Warszawa",
    "billboard Kraków",
  ],
  authors: [{ name: "Billboard Sp. z o.o." }],
  creator: "Billboard Sp. z o.o.",
  publisher: "Billboard Sp. z o.o.",
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: "https://wielkiformat.pl",
    siteName: "wielkiformat.pl",
    title: "wielkiformat.pl | Reklama wielkoformatowa i billboardy",
    description:
      "Billboardy i reklama wielkoformatowa na terenie całej Polski. Ponad 25 lat doświadczenia i kompleksowa obsługa kampanii.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "wielkiformat.pl — Reklama wielkoformatowa i billboardy w całej Polsce",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "wielkiformat.pl | Reklama wielkoformatowa i billboardy",
    description:
      "Billboardy i reklama wielkoformatowa na terenie całej Polski. Ponad 25 lat doświadczenia i kompleksowa obsługa kampanii.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://wielkiformat.pl",
  },
};

/* ── Schema.org: Organization ── */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Billboard Sp. z o.o.",
  alternateName: "wielkiformat.pl",
  url: "https://wielkiformat.pl",
  telephone: "+48123456789",
  email: "biuro@wielkiformat.pl",
  address: {
    "@type": "PostalAddress",
    streetAddress: "ul. Przykładowa 10",
    addressLocality: "Warszawa",
    postalCode: "00-001",
    addressCountry: "PL",
  },
  areaServed: {
    "@type": "Country",
    name: "Polska",
  },
};

/* ── Schema.org: LocalBusiness (point 28) ── */
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://wielkiformat.pl/#business",
  name: "Billboard Sp. z o.o.",
  alternateName: "wielkiformat.pl",
  url: "https://wielkiformat.pl",
  telephone: "+48123456789",
  email: "biuro@wielkiformat.pl",
  image: "https://wielkiformat.pl/og-image.png",
  description:
    "Billboardy i reklama wielkoformatowa na terenie całej Polski. Ponad 25 lat doświadczenia.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "ul. Przykładowa 10",
    addressLocality: "Warszawa",
    postalCode: "00-001",
    addressCountry: "PL",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "52.2297",
    longitude: "21.0122",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
  ],
  priceRange: "$$",
  sameAs: [],
};

/* ── Schema.org: Service (point 28) ── */
const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Wynajem billboardów i reklama wielkoformatowa",
  provider: {
    "@type": "Organization",
    name: "Billboard Sp. z o.o.",
  },
  areaServed: {
    "@type": "Country",
    name: "Polska",
  },
  description:
    "Kompleksowa obsługa kampanii billboardowej: od projektu graficznego, przez druk i montaż, po demontaż i dokumentację fotograficzną.",
  serviceType: "Reklama wielkoformatowa",
  offers: {
    "@type": "AggregateOffer",
    lowPrice: "800",
    highPrice: "4500",
    priceCurrency: "PLN",
    offerCount: "500",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        {/* Point 12: Hero image preload removed from global layout — should be per-page */}
      </head>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(serviceJsonLd),
          }}
        />
      </body>
    </html>
  );
}
