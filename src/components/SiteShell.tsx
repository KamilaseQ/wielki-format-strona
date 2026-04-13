"use client";

import type { PropsWithChildren } from "react";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { BackToTop } from "@/components/BackToTop";
import { CookieConsent } from "@/components/CookieConsent";
import { CustomCursor } from "@/components/CustomCursor";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { KonamiEasterEgg } from "@/components/KonamiEasterEgg";
import { LoadingSplash } from "@/components/LoadingSplash";
import { ScrollProgress } from "@/components/ScrollProgress";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { useLenis } from "@/hooks/useLenis";

export function SiteShell({ children }: PropsWithChildren) {
  const pathname = usePathname();
  useLenis(true);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[99999] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
      >
        Przejdz do tresci
      </a>
      <LoadingSplash />
      <ScrollProgress />
      <CustomCursor />
      <Header />
      <main id="main-content" className="min-h-screen pt-16 lg:pt-20">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {children}
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
