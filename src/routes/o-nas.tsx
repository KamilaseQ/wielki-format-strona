import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Award, Users, Target, TrendingUp, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/o-nas")({
  head: () => ({
    meta: [
      { title: "O nas — wielkiformat.pl" },
      { name: "description", content: "Poznaj firmę Billboard Sp. z o.o. — ponad 25 lat doświadczenia w reklamie wielkoformatowej i billboardach." },
      { property: "og:title", content: "O nas — wielkiformat.pl" },
      { property: "og:description", content: "Ponad 25 lat doświadczenia w reklamie wielkoformatowej." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-padding bg-noise">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-3">O firmie</span>
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-6">
              Ponad <span className="text-gradient-brand">25 lat</span> w reklamie wielkoformatowej
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Jesteśmy jednym z najbardziej doświadczonych operatorów reklamy zewnętrznej w Polsce. Realizujemy kampanie billboardowe od projektu po montaż — profesjonalnie, terminowo i&nbsp;na dużą skalę.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-surface border-y border-border/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Wartości" title="Co nas wyróżnia" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Award, title: "Doświadczenie", desc: "25+ lat w branży reklamy wielkoformatowej. Znamy rynek, lokalizacje i skuteczne rozwiązania." },
              { icon: TrendingUp, title: "Skala", desc: "Około 2500 kampanii rocznie na terenie całej Polski. Zarówno lokalne, jak i ogólnokrajowe." },
              { icon: Target, title: "Kompleksowość", desc: "Od projektu graficznego przez druk po montaż i demontaż — obsługujemy cały proces." },
              { icon: Users, title: "Partnerstwo", desc: "Budujemy długoterminowe relacje z klientami. Wielu z nich wraca do nas od lat." },
            ].map((v) => (
              <div key={v.title} className="rounded-xl bg-card border border-border p-6 hover:border-primary/30 transition-all">
                <v.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-heading font-semibold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-noise">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading eyebrow="Historia" title="Nasza droga" center={false} />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Billboard Sp. z o.o. działa na polskim rynku reklamy zewnętrznej od ponad 25 lat. Zaczynaliśmy od kilku nośników w jednym mieście — dziś obsługujemy tysiące kampanii rocznie na terenie całego kraju.
                </p>
                <p>
                  Przez lata zbudowaliśmy sieć nośników reklamowych obejmującą kluczowe lokalizacje w największych polskich miastach i przy głównych trasach komunikacyjnych. Naszą przewagą jest nie tylko skala, ale przede wszystkim sprawna, kompleksowa obsługa na każdym etapie kampanii.
                </p>
                <p>
                  Współpracujemy z agencjami reklamowymi, domami mediowymi i bezpośrednio z klientami. Bez względu na wielkość kampanii — zawsze dostarczamy jakość i terminowość.
                </p>
              </div>
              <div className="mt-8">
                <Link to="/kontakt">
                  <Button variant="cta" size="lg">
                    Skontaktuj się z nami
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="rounded-2xl bg-card border border-border p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
              <div className="relative space-y-6">
                {[
                  { year: "1998", text: "Założenie firmy i pierwsze billboardy" },
                  { year: "2005", text: "Rozszerzenie sieci na główne miasta Polski" },
                  { year: "2012", text: "Uruchomienie druku wielkoformatowego" },
                  { year: "2020", text: "Przekroczenie 2000 kampanii rocznie" },
                  { year: "Dziś", text: "2500+ kampanii rocznie, zasięg ogólnopolski" },
                ].map((m) => (
                  <div key={m.year} className="flex gap-4">
                    <span className="font-heading font-bold text-primary text-sm w-12 shrink-0">{m.year}</span>
                    <span className="text-sm text-muted-foreground">{m.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
