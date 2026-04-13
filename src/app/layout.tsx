import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://wielkiformat.pl"),
  title: {
    default: "wielkiformat.pl | Reklama wielkoformatowa i billboardy",
    template: "%s | wielkiformat.pl",
  },
  description:
    "Billboardy i reklama wielkoformatowa na terenie calej Polski. Ponad 25 lat doswiadczenia, szybka wycena i kompleksowa obsluga kampanii.",
  applicationName: "wielkiformat.pl",
  keywords: [
    "billboardy",
    "reklama wielkoformatowa",
    "outdoor",
    "wynajem billboardow",
    "mapa nosnikow",
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
      "Billboardy i reklama wielkoformatowa na terenie calej Polski. Ponad 25 lat doswiadczenia i kompleksowa obsluga kampanii.",
  },
  twitter: {
    card: "summary_large_image",
    title: "wielkiformat.pl | Reklama wielkoformatowa i billboardy",
    description:
      "Billboardy i reklama wielkoformatowa na terenie calej Polski. Ponad 25 lat doswiadczenia i kompleksowa obsluga kampanii.",
  },
  alternates: {
    canonical: "https://wielkiformat.pl",
  },
};

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
    streetAddress: "ul. Przykladowa 10",
    addressLocality: "Warszawa",
    postalCode: "00-001",
    addressCountry: "PL",
  },
  areaServed: {
    "@type": "Country",
    name: "Polska",
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
        <link
          rel="preload"
          as="image"
          href="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&auto=format&fit=crop&q=80"
        />
      </head>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </body>
    </html>
  );
}
