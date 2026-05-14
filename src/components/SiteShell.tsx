"use client";

import type { PropsWithChildren } from "react";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ThemeProvider } from "@/components/ThemeProvider";
import { useLenis } from "@/hooks/useLenis";

/* ── Non-critical components loaded after initial paint ── */
const BackToTop = dynamic(
  () => import("@/components/BackToTop").then((m) => m.BackToTop),
  { ssr: false }
);
const CookieConsent = dynamic(
  () => import("@/components/CookieConsent").then((m) => m.CookieConsent),
  { ssr: false }
);
const CustomCursor = dynamic(
  () => import("@/components/CustomCursor").then((m) => m.CustomCursor),
  { ssr: false }
);
const KonamiEasterEgg = dynamic(
  () => import("@/components/KonamiEasterEgg").then((m) => m.KonamiEasterEgg),
  { ssr: false }
);
export function SiteShell({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  useLenis(true);

  return (
    <ThemeProvider>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-md focus:bg-primary focus:text-primary-foreground focus:shadow-lg"
      >
        Przejdź do treści
      </a>
      <ScrollProgress />
      <CustomCursor />
      <Header />
      <main id="main-content" className="min-h-screen pt-16 lg:pt-20">
        {shouldReduceMotion ? (
          <div key={pathname}>{children}</div>
        ) : (
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {children}
          </motion.div>
        )}
      </main>
      <Footer />
      <BackToTop />
      <CookieConsent />
      <KonamiEasterEgg />
    </ThemeProvider>
  );
}
