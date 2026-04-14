"use client";

import type { PropsWithChildren } from "react";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ScrollProgress } from "@/components/ScrollProgress";
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
const LoadingSplash = dynamic(
  () => import("@/components/LoadingSplash").then((m) => m.LoadingSplash),
  { ssr: false }
);
const StickyMobileCTA = dynamic(
  () => import("@/components/StickyMobileCTA").then((m) => m.StickyMobileCTA),
  { ssr: false }
);

export function SiteShell({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  useLenis(true);

  return (
    <>
      {/* Point 36: Fixed skip-nav with Polish diacritics */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[99999] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
      >
        Przejdź do treści
      </a>
      <LoadingSplash />
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
      <StickyMobileCTA />
      <CookieConsent />
      <KonamiEasterEgg />
    </>
  );
}
