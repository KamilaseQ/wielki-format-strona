import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { MapPin, Eye, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/realizacje")({
  head: () => ({
    meta: [
      { title: "Realizacje — wielkiformat.pl" },
      { name: "description", content: "Zobacz nasze realizacje kampanii billboardowych. Portfolio reklamy wielkoformatowej w całej Polsce." },
      { property: "og:title", content: "Realizacje — wielkiformat.pl" },
      { property: "og:description", content: "Portfolio kampanii billboardowych w całej Polsce." },
    ],
  }),
  component: RealizationsPage,
});

const projects = [
  { title: "Kampania ogólnopolska — sieć handlowa", location: "12 miast, 48 nośników", type: "Super 12, Super 18", desc: "Kompleksowa kampania outdoorowa obejmująca kluczowe miasta w Polsce. Pełna obsługa od projektu po dokumentację fotograficzną." },
  { title: "Billboardy autostradowe — deweloper", location: "A2, A4 — 16 nośników", type: "Super 36", desc: "Kampania wizerunkowa na nośnikach przy autostradach. Maksymalna widoczność dla kierowców." },
  { title: "Kampania miejska — marka FMCG", location: "Warszawa, Kraków, Wrocław", type: "Super 12", desc: "Intensywna kampania produktowa w trzech największych miastach. Wysoka częstotliwość kontaktu z przekazem." },
  { title: "Launch produktu — branża tech", location: "Warszawa — 24 nośniki", type: "Super 18, Monster XXL", desc: "Kampania launchu produktu z wykorzystaniem Monster XXL w kluczowych lokalizacjach Warszawy." },
  { title: "Kampania eventowa — festiwal muzyczny", location: "Trójmiasto, 20 nośników", type: "Super 12, Super 18", desc: "Kampania promocyjna festiwalu muzycznego. Krótki, intensywny okres ekspozycji z mocnym przekazem." },
  { title: "Billboardy drogowe — sieć stacji paliw", location: "Cała Polska, 60+ nośników", type: "Super 36", desc: "Długoterminowa kampania drogowa przy głównych trasach krajowych. Stała rotacja kreacji." },
];

function RealizationsPage() {
  return (
    <>
      <section className="section-padding bg-noise">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-3">Portfolio</span>
            <h1 className="font-heading font-bold text-4xl md:text-5xl text-foreground leading-tight mb-6">
              Nasze <span className="text-gradient-brand">realizacje</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Wybrane kampanie billboardowe, które zrealizowaliśmy dla naszych klientów. Każda z pełną obsługą — od projektu po dokumentację.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <div key={p.title} className="group rounded-xl bg-card border border-border overflow-hidden hover:border-primary/30 transition-all duration-300">
                <div className="aspect-[16/10] bg-secondary flex items-center justify-center relative overflow-hidden">
                  <Eye className="w-10 h-10 text-muted-foreground/20" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-5">
                  <span className="text-xs text-primary font-semibold">{p.type}</span>
                  <h3 className="font-heading font-semibold text-foreground mt-1 mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">{p.desc}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {p.location}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/kontakt">
              <Button variant="cta" size="xl">
                Zaplanuj swoją kampanię
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
