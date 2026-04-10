import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/LeadForm";
import { ArrowRight, Calendar, CheckCircle, MapPin } from "lucide-react";

export const Route = createFileRoute("/wynajem")({
  head: () => ({
    meta: [
      { title: "Wynajem billboardów — wielkiformat.pl" },
      { name: "description", content: "Wynajmij billboard w dowolnym mieście w Polsce. Sprawdź dostępność nośników i zarezerwuj termin kampanii." },
      { property: "og:title", content: "Wynajem billboardów — wielkiformat.pl" },
      { property: "og:description", content: "Wynajmij billboard w dowolnym mieście w Polsce." },
    ],
  }),
  component: RentalPage,
});

function RentalPage() {
  return (
    <>
      <section className="section-padding bg-noise">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-3">Wynajem</span>
              <h1 className="font-heading font-bold text-4xl md:text-5xl text-foreground leading-tight mb-6">
                Zarezerwuj <span className="text-gradient-brand">billboard</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Sprawdź dostępność nośników w interesującym Cię regionie. Wystarczy jedno zapytanie — resztą zajmiemy się my.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  "Wynajem na dowolny okres — od 2 tygodni wzwyż",
                  "Elastyczne warunki i rabaty przy dłuższych kampaniach",
                  "Możliwość rezerwacji wielu nośników jednocześnie",
                  "Dostępność w największych miastach i przy trasach",
                  "Szybka oferta cenowa — odpowiedź w 24h",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <Link to="/nosniki">
                  <Button variant="outline" size="lg">
                    <MapPin className="w-4 h-4" /> Sprawdź nośniki
                  </Button>
                </Link>
              </div>
            </div>

            <LeadForm />
          </div>
        </div>
      </section>

      {/* Pricing info */}
      <section className="section-padding bg-surface border-t border-border/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Cennik"
            title="Transparentne warunki"
            description="Cena wynajmu zależy od formatu, lokalizacji i okresu kampanii. Każdą wycenę przygotowujemy indywidualnie."
          />
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: Calendar, title: "Okres wynajmu", desc: "Minimalny okres to 2 tygodnie. Dłuższe kampanie = lepsze stawki." },
              { icon: MapPin, title: "Lokalizacja", desc: "Cena zależy od miasta i konkretnej lokalizacji nośnika." },
              { title: "Format nośnika", desc: "Im większy format, tym silniejszy wpływ — i nieco wyższa stawka." },
            ].map((item) => (
              <div key={item.title} className="rounded-xl bg-card border border-border p-6">
                <h3 className="font-heading font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
