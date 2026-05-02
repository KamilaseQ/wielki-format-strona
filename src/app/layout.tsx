import type { Metadata } from "next";
import { Inter, Space_Grotesk, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import { COMPANY_PHONE_E164 } from "@/lib/contact";
import { GlobalFloatingActions } from "@/components/GlobalFloatingActions";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
});

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-accent",
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wielki-format-strona.vercel.app"),
  title: {
    default: "wielkiformat.pl | Reklama wielkoformatowa i billboardy",
    template: "%s | wielkiformat.pl",
  },
  description:
    "Billboardy i reklama wielkoformatowa na terenie województwa mazowieckiego. Działamy od 1998 roku, szybka wycena i kompleksowa obsługa kampanii.",
  applicationName: "wielkiformat.pl",
  keywords: [
    "billboardy",
    "reklama wielkoformatowa",
    "outdoor",
    "wynajem billboardów",
    "mapa nośników",
    "billboard Warszawa",
    "billboard mazowieckie",
    "billboard Otwock",
    "billboard Marki",
  ],
  authors: [{ name: "Billboard Sp. z o.o." }],
  creator: "Billboard Sp. z o.o.",
  publisher: "Billboard Sp. z o.o.",
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: "https://wielki-format-strona.vercel.app",
    siteName: "wielkiformat.pl",
    title: "wielkiformat.pl | Reklama wielkoformatowa i billboardy",
    description:
      "Billboardy i reklama wielkoformatowa w województwie mazowieckim. Działamy od 1998 roku i kompleksowo obsługujemy kampanie.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "wielkiformat.pl - Reklama wielkoformatowa i billboardy w województwie mazowieckim",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "wielkiformat.pl | Reklama wielkoformatowa i billboardy",
    description:
      "Billboardy i reklama wielkoformatowa w województwie mazowieckim. Działamy od 1998 roku i kompleksowo obsługujemy kampanie.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://wielki-format-strona.vercel.app",
  },
};

/* ── Schema.org: Organization ── */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Billboard Sp. z o.o.",
  alternateName: "wielkiformat.pl",
  url: "https://wielkiformat.pl",
  telephone: COMPANY_PHONE_E164,
  email: "info@wielkiformat.pl",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Al. Marszałka Józefa Piłsudskiego 55A",
    addressLocality: "Marki",
    postalCode: "05-270",
    addressCountry: "PL",
  },
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Województwo mazowieckie",
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
  telephone: COMPANY_PHONE_E164,
  email: "info@wielkiformat.pl",
  image: "https://wielki-format-strona.vercel.app/og-image.jpg",
  description:
    "Billboardy i reklama wielkoformatowa w województwie mazowieckim. Działamy od 1998 roku.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Al. Marszałka Józefa Piłsudskiego 55A",
    addressLocality: "Marki",
    postalCode: "05-270",
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
    "@type": "AdministrativeArea",
    name: "Województwo mazowieckie",
  },
  description:
    "Kompleksowa obsługa kampanii billboardowej: od projektu graficznego, przez druk i montaż, po demontaż i dokumentację fotograficzną.",
  serviceType: "Reklama wielkoformatowa",
  offers: {
    "@type": "AggregateOffer",
    lowPrice: "800",
    highPrice: "4500",
    priceCurrency: "PLN",
    offerCount: "1400",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" suppressHydrationWarning className={`${inter.variable} ${spaceGrotesk.variable} ${dmSerifDisplay.variable}`}>
      <head>
        {/* Point 12: Hero image preload removed from global layout - should be per-page */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('wf-theme');var d=document.documentElement;if(t==='light'){d.classList.add('light');d.style.colorScheme='light'}else{d.classList.add('dark');d.style.colorScheme='dark'}}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        {children}
        <GlobalFloatingActions />
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
