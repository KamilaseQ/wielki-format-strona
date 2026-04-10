import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { ArrowRight, Ruler, Eye, MapPin } from "lucide-react";

export const Route = createFileRoute("/nosniki")({
  head: () => ({
    meta: [
      { title: "Nośniki reklamowe — wielkiformat.pl" },
      { name: "description", content: "Billboardy Super 12, Super 18, Super 36 i Monster XXL. Poznaj nasze formaty reklamy wielkoformatowej." },
      { property: "og:title", content: "Nośniki reklamowe — wielkiformat.pl" },
      { property: "og:description", content: "Formaty billboardów od standardowych po Monster XXL." },
    ],
  }),
  component: CarriersPage,
});

const carriers = [
  {
    name: "Super 12",
    size: "4 × 3 m (12 m²)",
    desc: "Klasyczny format billboardu miejskiego. Najczęściej spotykany w centrach miast, przy głównych ulicach i skrzyżowaniach. Doskonały stosunek ceny do widoczności.",
    features: ["Centra miast", "Przy skrzyżowaniach", "Duża rotacja", "Koszty optymalne"],
  },
  {
    name: "Super 18",
    size: "6 × 3 m (18 m²)",
    desc: "Większy format zapewniający lepszą czytelność przekazu z większej odległości. Idealny przy głównych arteriach komunikacyjnych i wjazdach do miast.",
    features: ["Arterie komunikacyjne", "Wjazdy do miast", "Lepsza czytelność", "Większy zasięg"],
  },
  {
    name: "Super 36",
    size: "12 × 3 m (36 m²)",
    desc: "Podwójny billboard o imponujących rozmiarach. Dominuje w przestrzeni miejskiej i gwarantuje maksymalny wpływ wizualny na odbiorców.",
    features: ["Maksymalny wpływ", "Dominacja wizualna", "Trasy szybkiego ruchu", "Kampanie premium"],
  },
  {
    name: "Monster XXL",
    size: "18+ × 3+ m",
    desc: "Największy dostępny format reklamy wielkoformatowej. Dedykowany do kampanii o najwyższym priorytecie widoczności. Niepowtarzalna skala ekspozycji.",
    features: ["Niespotykana skala", "Lokalizacje premium", "Kampanie wizerunkowe", "Unikalna ekspozycja"],
  },
];

function CarriersPage() {
  return (
    <>
      <section className="section-padding bg-noise">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-3">Nośniki</span>
            <h1 className="font-heading font-bold text-4xl md:text-5xl text-foreground leading-tight mb-6">
              Formaty <span className="text-gradient-brand">billboardów</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Dobierz format nośnika do swojej kampanii. Od standardowych billboardów miejskich po wielkoformatowe konstrukcje o wyjątkowej widoczności.
            </p>
          </div>

          <div className="space-y-8">
            {carriers.map((c, i) => (
              <div key={c.name} className="rounded-xl bg-card border border-border p-6 md:p-8 hover:border-primary/20 transition-all">
                <div className="grid md:grid-cols-[1fr_auto] gap-6">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <Ruler className="w-5 h-5 text-primary" />
                      <span className="text-sm text-primary font-semibold">{c.size}</span>
                    </div>
                    <h2 className="font-heading font-bold text-2xl text-foreground mb-3">{c.name}</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">{c.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {c.features.map((f) => (
                        <span key={f} className="px-3 py-1 rounded-full bg-secondary text-xs text-secondary-foreground font-medium">{f}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col justify-center gap-3">
                    <Link to="/mapa">
                      <Button variant="outline" size="default" className="w-full md:w-auto">
                        <MapPin className="w-4 h-4" /> Lokalizacje
                      </Button>
                    </Link>
                    <Link to="/kontakt">
                      <Button variant="cta" size="default" className="w-full md:w-auto">
                        Zapytaj o cenę <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
