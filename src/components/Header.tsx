import { Link, useLocation } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { to: "/", label: "Strona główna" },
  { to: "/o-nas", label: "O nas" },
  { to: "/nosniki", label: "Nośniki" },
  { to: "/wynajem", label: "Wynajem" },
  { to: "/obsluga-kampanii", label: "Obsługa kampanii" },
  { to: "/mapa", label: "Mapa nośników" },
  { to: "/realizacje", label: "Realizacje" },
  { to: "/kontakt", label: "Kontakt" },
] as const;

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded bg-gradient-brand flex items-center justify-center">
              <span className="text-primary-foreground font-heading font-bold text-sm">W</span>
            </div>
            <span className="font-heading font-bold text-lg text-foreground group-hover:text-primary transition-colors">
              wielkiformat<span className="text-primary">.pl</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                activeOptions={{ exact: link.to === "/" }}
                className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary/50"
                activeProps={{ className: "px-3 py-2 text-sm text-foreground bg-secondary/50 rounded-md" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="tel:+48123456789" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Phone className="w-4 h-4" />
              <span>+48 123 456 789</span>
            </a>
            <Link to="/kontakt">
              <Button variant="cta" size="sm">Zapytaj o wycenę</Button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-foreground"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-background/95 backdrop-blur-xl border-b border-border">
          <nav className="mx-auto max-w-7xl px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-md transition-colors"
                activeProps={{ className: "px-4 py-3 text-sm text-foreground bg-secondary/50 rounded-md" }}
                activeOptions={{ exact: link.to === "/" }}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 mt-2 border-t border-border">
              <Link to="/kontakt" onClick={() => setMobileOpen(false)}>
                <Button variant="cta" className="w-full">Zapytaj o wycenę</Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
