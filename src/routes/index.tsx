import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/LeadForm";
import { SectionHeading } from "@/components/SectionHeading";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { ArrowRight, Eye, Zap, Shield, MapPin, CheckCircle, ChevronRight, TrendingUp, Award, Clock } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "wielkiformat.pl — Billboardy i reklama wielkoformatowa w Polsce" },
      { name: "description", content: "Billboardy i reklama wielkoformatowa na terenie całej Polski. Ponad 25 lat doświadczenia, 2500+ kampanii rocznie. Zapytaj o dostępność." },
      { property: "og:title", content: "wielkiformat.pl — Billboardy i reklama wielkoformatowa" },
      { property: "og:description", content: "Ponad 25 lat doświadczenia w reklamie zewnętrznej. Kompleksowa obsługa kampanii billboardowych w całej Polsce." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <HeroSection />
      <BrandCarousel />
      <TrustSection />
      <WhatWeDoSection />
      <CarrierTypesSection />
      <ProcessSection />
      <BenefitsSection />
      <CTASection />
    </>
  );
}

/* ───────── HERO ───────── */
function HeroSection() {
  return (
    <section className="relative overflow-hidden section-padding bg-noise">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-wide mb-6">
              <Eye className="w-3.5 h-3.5" />
              REKLAMA, KTÓRA SIĘ WYRÓŻNIA
            </span>
            <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-foreground leading-[1.05] mb-6">
              Twoja marka{" "}
              <span className="text-gradient-brand">na wielkim formacie</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
              Billboardy, banery i kampanie outdoorowe w całej Polsce. Sprawdź dostępność nośników i&nbsp;zacznij być widoczny tam, gdzie liczy się skala.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/kontakt">
                <Button variant="hero" size="xl">
                  Zapytaj o dostępność
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/nosniki">
                <Button variant="heroOutline" size="xl">
                  <MapPin className="w-5 h-5" />
                  Sprawdź nośniki
                </Button>
              </Link>
            </div>
          </div>
          <div className="lg:pl-8">
            <LeadForm />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── BRAND CAROUSEL ───────── */
const brandNames = [
  "Media Expert", "Żabka", "PKN Orlen", "Kaufland", "Lidl",
  "Biedronka", "Play", "T-Mobile", "Allegro", "InPost",
  "Pepco", "CCC", "Reserved", "Leroy Merlin", "OBI",
];

function BrandCarousel() {
  return (
    <section className="py-8 bg-surface border-y border-border/50 overflow-hidden">
      <p className="text-center text-xs font-semibold tracking-widest uppercase text-muted-foreground/60 mb-6">
        Zaufali nam m.in.
      </p>
      <div className="relative">
        {/* Gradient masks */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none" />

        <div className="flex animate-scroll-x gap-12 items-center">
          {[...brandNames, ...brandNames].map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="shrink-0 text-sm font-heading font-semibold tracking-wide text-muted-foreground/30 uppercase whitespace-nowrap select-none"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── TRUST ───────── */
function TrustSection() {
  const stats = [
    { value: "25+", label: "lat doświadczenia", icon: Award },
    { value: "2500", label: "kampanii rocznie", icon: TrendingUp },
    { value: "100%", label: "obsługa kampanii", icon: Shield },
    { value: "24h", label: "czas odpowiedzi", icon: Clock },
  ];

  return (
    <section className="section-padding bg-noise">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center group">
              <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── WHAT WE DO ───────── */
function WhatWeDoSection() {
  const services = [
    { icon: Eye, title: "Billboardy reklamowe", desc: "Nośniki Super 12, Super 18, Super 36 i Monster XXL w kluczowych lokalizacjach w całej Polsce." },
    { icon: Zap, title: "Druk wielkoformatowy", desc: "Profesjonalny druk plakatów i banerów w najwyższej jakości, gotowy do montażu." },
    { icon: Shield, title: "Montaż i serwis", desc: "Kompleksowy montaż, demontaż, zaklejenie po kampanii i dokumentacja fotograficzna." },
    { icon: MapPin, title: "Kampanie outdoorowe", desc: "Planowanie i realizacja kampanii reklamowych na terenie miast i dróg krajowych." },
  ];

  return (
    <section className="section-padding bg-surface border-y border-border/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Usługi"
          title="Co robimy"
          description="Od pojedynczego billboardu po ogólnopolską kampanię outdoorową — zajmiemy się wszystkim."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <div key={s.title} className="group rounded-xl bg-card border border-border p-6 hover:border-primary/30 hover:bg-card/80 transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <s.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── CARRIER TYPES ───────── */
function CarrierTypesSection() {
  const carriersList = [
    { name: "Super 12", size: "4 × 3 m", desc: "Klasyczny format billboardu miejskiego. Doskonała widoczność w centrach miast." },
    { name: "Super 18", size: "6 × 3 m", desc: "Większy format dla zwiększonego zasięgu. Idealny przy głównych arteriach." },
    { name: "Super 36", size: "12 × 3 m", desc: "Podwójny billboard o maksymalnym impakcie. Dominuje w przestrzeni miejskiej." },
    { name: "Monster XXL", size: "18 × 3+ m", desc: "Największy format outdoorowy. Niepowtarzalna skala i widoczność." },
  ];

  return (
    <section className="section-padding bg-noise">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Formaty"
          title="Nośniki reklamowe"
          description="Dopasuj format do swoich potrzeb — od standardowych billboardów po wielkoformatowe konstrukcje."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {carriersList.map((c) => (
            <div key={c.name} className="group rounded-xl border border-border bg-card p-6 hover:border-primary/30 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-[40px] group-hover:bg-primary/10 transition-colors" />
              <span className="text-xs font-semibold tracking-wider text-primary uppercase">{c.size}</span>
              <h3 className="font-heading font-bold text-xl text-foreground mt-2 mb-3">{c.name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              <Link to="/nosniki" className="mt-4 inline-flex items-center gap-1 text-sm text-primary font-medium hover:gap-2 transition-all">
                Szczegóły <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── PROCESS ───────── */
function ProcessSection() {
  const steps = [
    { num: "01", title: "Zapytanie", desc: "Wyślij zapytanie przez formularz lub zadzwoń. Powiedz nam, czego szukasz." },
    { num: "02", title: "Dobór lokalizacji", desc: "Sprawdzamy dostępność i proponujemy najlepsze nośniki w wybranym regionie." },
    { num: "03", title: "Oferta i rezerwacja", desc: "Otrzymujesz ofertę cenową. Po akceptacji rezerwujemy nośniki dla Twojej kampanii." },
    { num: "04", title: "Realizacja", desc: "Drukujemy, montujemy, dokumentujemy. Po kampanii demontujemy i zaklejamy nośnik." },
  ];

  return (
    <section className="section-padding bg-surface border-y border-border/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Proces"
          title="Jak wygląda współpraca"
          description="Prosty, uporządkowany proces — od zapytania do gotowej kampanii w 4 krokach."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div key={step.num} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-border/50 -translate-x-1/2 z-0" />
              )}
              <div className="relative rounded-xl bg-card border border-border p-6 hover:border-primary/20 transition-all group">
                <span className="font-heading font-bold text-3xl text-primary/20 group-hover:text-primary/40 transition-colors">{step.num}</span>
                <h3 className="font-heading font-semibold text-foreground mt-2 mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── BENEFITS ───────── */
function BenefitsSection() {
  const benefits = [
    "Ponad 25 lat doświadczenia w reklamie zewnętrznej",
    "Około 2500 kampanii reklamowych rocznie",
    "Nośniki w całej Polsce — miasta i drogi krajowe",
    "Kompleksowa obsługa: projekt, druk, montaż, demontaż",
    "Serwis fotograficzny po każdej realizacji",
    "Szybka wycena i sprawna rezerwacja",
  ];

  return (
    <section className="section-padding bg-noise">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading
              eyebrow="Dlaczego my"
              title="Korzyści dla Twojej marki"
              center={false}
            />
            <ul className="space-y-4">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link to="/o-nas">
                <Button variant="outline" size="lg">
                  Poznaj nas bliżej
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="rounded-2xl bg-card border border-border p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
            <div className="relative">
              <div className="font-heading font-bold text-6xl md:text-7xl text-gradient-brand mb-4">2500+</div>
              <p className="text-xl text-foreground font-heading font-semibold mb-2">kampanii rocznie</p>
              <p className="text-muted-foreground">Zaufanie klientów z całej Polski to nasz największy kapitał. Każdą kampanię traktujemy z takim samym zaangażowaniem.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── CTA ───────── */
function CTASection() {
  return (
    <section className="section-padding bg-surface border-t border-border/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
          Gotowy, by być <span className="text-gradient-brand">widocznym?</span>
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
          Sprawdź dostępność nośników w Twoim regionie i otrzymaj wycenę w ciągu 24 godzin.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/kontakt">
            <Button variant="hero" size="xl">
              Poproś o wycenę
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <Link to="/nosniki">
            <Button variant="heroOutline" size="xl">
              <MapPin className="w-5 h-5" />
              Sprawdź nośniki
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
