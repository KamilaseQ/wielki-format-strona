import { Outlet, Link, createRootRoute, HeadContent, Scripts, useLocation } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { BackToTop } from "@/components/BackToTop";
import { CookieConsent } from "@/components/CookieConsent";
import { CustomCursor } from "@/components/CustomCursor";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { LoadingSplash } from "@/components/LoadingSplash";
import { KonamiEasterEgg } from "@/components/KonamiEasterEgg";
import { useLenis } from "@/hooks/useLenis";
import { motion, AnimatePresence } from "motion/react";
import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 pt-20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-noise" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-primary/5 rounded-full blur-[150px]" />

      <div className="max-w-md text-center relative z-10">
        <div className="font-heading font-black text-[120px] md:text-[160px] leading-none text-gradient-brand-bright text-glow-red mb-4">404</div>
        <h1 className="text-2xl font-heading font-bold text-foreground mb-3">Strona nie znaleziona</h1>
        <p className="text-sm text-muted-foreground mb-8 max-w-xs mx-auto leading-relaxed">
          Strona, której szukasz, nie istnieje lub została przeniesiona. Sprawdź adres URL lub wróć na stronę główną.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-brand px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all font-heading"
        >
          Wróć na stronę główną
        </Link>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "wielkiformat.pl — Reklama wielkoformatowa i billboardy" },
      { name: "description", content: "Billboardy i reklama wielkoformatowa na terenie całej Polski. Ponad 25 lat doświadczenia, 2500 kampanii rocznie. Zapytaj o dostępność nośników." },
      { name: "author", content: "Billboard Sp. z o.o." },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "wielkiformat.pl — Reklama wielkoformatowa i billboardy" },
      { property: "og:description", content: "Billboardy i reklama wielkoformatowa na terenie całej Polski. Ponad 25 lat doświadczenia." },
      { property: "og:url", content: "https://wielkiformat.pl" },
      { property: "og:site_name", content: "wielkiformat.pl" },
      { property: "og:locale", content: "pl_PL" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "wielkiformat.pl — Reklama wielkoformatowa" },
      { name: "twitter:description", content: "Billboardy i reklama wielkoformatowa na terenie całej Polski." },
      { name: "robots", content: "index, follow" },
      { name: "theme-color", content: "#0f0f0f" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "canonical", href: "https://wielkiformat.pl" },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <head>
        <HeadContent />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        {/* Hero image preload */}
        <link rel="preload" as="image" href="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&auto=format&fit=crop&q=80" />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Billboard Sp. z o.o.",
              "alternateName": "wielkiformat.pl",
              "url": "https://wielkiformat.pl",
              "telephone": "+48123456789",
              "email": "biuro@wielkiformat.pl",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "ul. Przykładowa 10",
                "addressLocality": "Warszawa",
                "postalCode": "00-001",
                "addressCountry": "PL"
              },
              "description": "Reklama wielkoformatowa i billboardy na terenie całej Polski. Ponad 25 lat doświadczenia.",
              "foundingDate": "1998",
              "numberOfEmployees": { "@type": "QuantitativeValue", "minValue": 10, "maxValue": 50 },
              "areaServed": { "@type": "Country", "name": "Polska" },
              "serviceType": ["Reklama wielkoformatowa", "Billboardy", "Druk wielkoformatowy", "Montaż reklam"]
            })
          }}
        />
      </head>
      <body>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[99999] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-primary focus:text-primary-foreground focus:font-heading focus:font-semibold focus:text-sm">
          Przejdź do treści
        </a>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const location = useLocation();
  const isMapPage = location.pathname === "/nosniki";

  // Lenis smooth scroll — must be called before any conditional return (React hooks rules)
  useLenis(!isMapPage);

  // Map page has its own full-screen layout with built-in header
  if (isMapPage) {
    return (
      <main className="min-h-screen">
        <Outlet />
      </main>
    );
  }

  return (
    <>
      <LoadingSplash />
      <ScrollProgress />
      <CustomCursor />
      <Header />
      <main id="main-content" className="min-h-screen pt-16 lg:pt-20">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Outlet />
        </motion.div>
      </main>
      <Footer />
      <BackToTop />
      <StickyMobileCTA />
      <CookieConsent />
      <KonamiEasterEgg />
    </>
  );
}
