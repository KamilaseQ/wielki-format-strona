"use client";

import { Link, useLocation } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";

const navLinks = [
  { to: "/", label: "Strona główna" },
  { to: "/o-nas", label: "O nas" },
  { to: "/nosniki", label: "Nośniki i mapa" },
  { to: "/wynajem", label: "Wynajem" },
  { to: "/kontakt", label: "Kontakt" },
] as const;

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500 ${
        scrolled
          ? "header-scrolled border-border/30"
          : "bg-background/80 backdrop-blur-xl border-border/50"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`header-inner flex items-center justify-between transition-all duration-500 ${
            scrolled ? "" : "h-16 lg:h-20"
          }`}
        >
          <Link to="/" className="flex items-center gap-2 group" aria-label="wielkiformat.pl — Strona główna">
            <div className="w-8 h-8 rounded bg-gradient-brand flex items-center justify-center">
              <span className="text-primary-foreground font-heading font-bold text-sm">W</span>
            </div>
            <span className="font-heading font-bold text-lg text-foreground group-hover:text-primary transition-colors">
              wielkiformat<span className="text-primary">.pl</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Nawigacja główna">
            {navLinks.map((link) => {
              const isActive = link.to === "/" 
                ? location.pathname === "/" 
                : location.pathname.startsWith(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative px-3 py-2 text-sm transition-colors rounded-md hover:bg-secondary/50 ${
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-0.5 left-2 right-2 h-0.5 bg-gradient-brand rounded-full"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+48123456789"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Zadzwoń: +48 123 456 789"
            >
              <Phone className="w-4 h-4" />
              <span>+48 123 456 789</span>
            </a>
            <Link to="/kontakt">
              <Button variant="cta" size="sm">Otrzymaj wycenę</Button>
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-foreground"
            aria-label={mobileOpen ? "Zamknij menu" : "Otwórz menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu with animation */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:hidden overflow-hidden bg-background/95 backdrop-blur-xl border-b border-border"
          >
            <nav className="mx-auto max-w-7xl px-4 py-4 flex flex-col gap-1" aria-label="Nawigacja mobilna">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.25 }}
                >
                  <Link
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-md transition-colors"
                    activeProps={{ className: "block px-4 py-3 text-sm text-foreground bg-secondary/50 rounded-md" }}
                    activeOptions={{ exact: link.to === "/" }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 + 0.1 }}
                className="pt-3 mt-2 border-t border-border"
              >
                <Link to="/kontakt" onClick={() => setMobileOpen(false)}>
                  <Button variant="cta" className="w-full">Otrzymaj wycenę w 24h</Button>
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
