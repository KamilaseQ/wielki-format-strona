import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-surface border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded bg-gradient-brand flex items-center justify-center">
                <span className="text-primary-foreground font-heading font-bold text-sm">W</span>
              </div>
              <span className="font-heading font-bold text-lg text-foreground">
                wielkiformat<span className="text-primary">.pl</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Reklama wielkoformatowa i billboardy na terenie całej Polski. Ponad 25 lat doświadczenia.
            </p>
            <p className="text-xs text-muted-foreground/60">
              Billboard Sp. z o.o.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-sm text-foreground mb-4">Nawigacja</h4>
            <ul className="space-y-2">
              {[
                { to: "/o-nas", label: "O nas" },
                { to: "/nosniki", label: "Nośniki i mapa" },
                { to: "/wynajem", label: "Wynajem" },
                { to: "/obsluga-kampanii", label: "Obsługa kampanii" },
                { to: "/kontakt", label: "Kontakt" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-muted-foreground hover:text-primary transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-sm text-foreground mb-4">Kontakt</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                <span>ul. Przykładowa 10, 00-001 Warszawa</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <a href="tel:+48123456789" className="hover:text-foreground transition-colors">+48 123 456 789</a>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <a href="mailto:biuro@wielkiformat.pl" className="hover:text-foreground transition-colors">biuro@wielkiformat.pl</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-sm text-foreground mb-4">Informacje</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Ponad 25 lat na rynku reklamy zewnętrznej. Około 2500 kampanii rocznie na terenie całej Polski.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground/60">
            © {new Date().getFullYear()} Billboard Sp. z o.o. Wszelkie prawa zastrzeżone.
          </p>
          <p className="text-xs text-muted-foreground/60">
            wielkiformat.pl — reklama wielkoformatowa
          </p>
        </div>
      </div>
    </footer>
  );
}
