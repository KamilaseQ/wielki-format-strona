"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end start"],
  });
  const logoY = useTransform(scrollYProgress, [0, 1], [20, -10]);
  const col1Y = useTransform(scrollYProgress, [0, 1], [15, -8]);
  const col2Y = useTransform(scrollYProgress, [0, 1], [12, -6]);
  const col3Y = useTransform(scrollYProgress, [0, 1], [18, -12]);

  return (
    <footer
      ref={footerRef}
      className="relative bg-surface border-t border-border overflow-hidden"
    >
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[1px] blur-[8px] bg-primary/10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand column */}
          <motion.div className="lg:col-span-4" style={{ y: logoY }}>
            <Link href="/" className="flex items-center gap-2 mb-5 group">
              <div className="w-9 h-9 rounded-lg bg-gradient-brand flex items-center justify-center">
                <span className="text-primary-foreground font-heading font-bold text-sm">
                  W
                </span>
              </div>
              <span className="font-heading font-bold text-xl text-foreground group-hover:text-primary transition-colors">
                wielkiformat<span className="text-primary">.pl</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5 max-w-xs">
              Reklama wielkoformatowa i billboardy na terenie całej Polski.
              Ponad 25 lat doświadczenia, 2500+ kampanii rocznie.
            </p>
            {/* Coverage mini visual */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-card/30 border border-border/30 max-w-xs">
              <div className="w-10 h-10 rounded-lg bg-primary/8 border border-primary/15 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-primary" />
              </div>
              <div>
                <div className="text-sm font-heading font-bold text-foreground">
                  16 województw
                </div>
                <div className="text-[11px] text-muted-foreground/50">
                  Zasięg ogólnopolski
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            className="lg:col-span-2 lg:col-start-6"
            style={{ y: col1Y }}
          >
            <h4 className="font-heading font-semibold text-sm text-foreground mb-5">
              Nawigacja
            </h4>
            <ul className="space-y-2.5">
              {[
                { href: "/o-nas", label: "O nas" },
                { href: "/nosniki", label: "Nośniki i mapa" },
                { href: "/wynajem", label: "Wynajem" },
                { href: "/obsluga-kampanii", label: "Obsługa kampanii" },
                { href: "/kontakt", label: "Kontakt" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
                  >
                    {l.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            className="lg:col-span-3 lg:col-start-8"
            style={{ y: col2Y }}
          >
            <h4 className="font-heading font-semibold text-sm text-foreground mb-5">
              Kontakt
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <div className="w-8 h-8 rounded-lg bg-primary/6 border border-primary/12 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-primary/60" />
                </div>
                <span>
                  Al. Marszałka Józefa Piłsudskiego 55A,
                  <br />
                  05-270 Marki
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="w-8 h-8 rounded-lg bg-primary/6 border border-primary/12 flex items-center justify-center shrink-0">
                  <Phone className="w-3.5 h-3.5 text-primary/60" />
                </div>
                <a
                  href="tel:+48600131013"
                  className="hover:text-foreground transition-colors"
                >
                  Wdrożenia: 600 13 10 13
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="w-8 h-8 rounded-lg bg-primary/6 border border-primary/12 flex items-center justify-center shrink-0">
                  <Mail className="w-3.5 h-3.5 text-primary/60" />
                </div>
                <a
                  href="mailto:info@wielkiformat.pl"
                  className="hover:text-foreground transition-colors"
                >
                  Obsługa: info@wielkiformat.pl
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Company info */}
          <motion.div
            className="lg:col-span-3 lg:col-start-11"
            style={{ y: col3Y }}
          >
            <h4 className="font-heading font-semibold text-sm text-foreground mb-5">
              Dane firmowe
            </h4>
            <div className="text-sm text-muted-foreground/70 space-y-1.5 leading-relaxed">
              <p className="font-medium text-muted-foreground">
                Billboard Sp. z o.o.
              </p>
              <p>NIP: 5322051052 | REGON: 361032049</p>
              <p>KRS: 0000547439</p>
              <p className="pt-1 text-xs">Bank PKO BP S.A.:</p>
              <p className="text-xs">17 1020 1127 0000 1102 0248 2073</p>
            </div>
            {/* Social - hidden until real URLs are available (point 17) */}
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground/40">
            © {new Date().getFullYear()} Billboard Sp. z o.o. Wszelkie prawa
            zastrzeżone.
          </p>
          <div className="flex items-center gap-6 text-xs text-muted-foreground/40">
            <Link
              href="/polityka-prywatnosci"
              className="hover:text-muted-foreground transition-colors"
            >
              Polityka prywatności
            </Link>
            <Link
              href="/regulamin"
              className="hover:text-muted-foreground transition-colors"
            >
              Regulamin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
