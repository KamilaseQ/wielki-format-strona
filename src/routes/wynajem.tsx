"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/LeadForm";
import { PricingCalculator } from "@/components/PricingCalculator";
import { motion } from "motion/react";
import { ArrowRight, Calendar, CheckCircle, MapPin, Maximize2, Star, Shield, Clock, ChevronDown } from "lucide-react";
import { useState } from "react";

import { Reveal } from "@/components/Reveal";

export default function RentalPage() {
  return (
    <>
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/generated/rental-billboard-hero.png"
            alt="Billboard w centrum miasta - wynajem reklamy wielkoformatowej"
            fill
            sizes="100vw"
            priority
            className="object-cover opacity-12"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background" />
        </div>
        <div className="absolute inset-0 bg-noise" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <Reveal>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-primary text-[11px] font-semibold tracking-[0.2em] uppercase mb-6">
                  Wynajem
                </span>
              </Reveal>
              <Reveal delay={0.08}>
                <h1 className="font-heading font-black text-4xl md:text-5xl text-foreground leading-tight mb-6">
                  Zarezerwuj <span className="text-gradient-brand-bright text-glow-red">billboard</span>
                </h1>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  Sprawdź dostępność nośników w interesującym Cię regionie. Wystarczy jedno zapytanie - resztą zajmiemy się my.
                </p>
              </Reveal>

              <div className="space-y-3 mb-8">
                {[
                  "Wynajem na dowolny okres - od 2 tygodni wzwyż",
                  "Elastyczne warunki i rabaty przy dłuższych kampaniach",
                  "Możliwość rezerwacji wielu nośników jednocześnie",
                  "Dostępność w największych miastach i przy trasach",
                  "Szybka oferta cenowa - odpowiedź w 24h",
                ].map((item, i) => (
                  <Reveal key={item} delay={i * 0.05} from="left">
                    <div className="flex items-start gap-3 group">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground group-hover:text-foreground transition-colors">{item}</span>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.3}>
                <Link href="/nosniki">
                  <Button variant="outline" size="lg" className="border-glow-hover group min-h-[44px]">
                    <MapPin className="w-4 h-4" /> Sprawdź nośniki na mapie
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </Reveal>
            </div>

            <Reveal from="right" delay={0.1}>
              <LeadForm />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Format comparison */}
      <section className="py-16 md:py-24 bg-surface border-y border-border/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <Reveal>
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-primary/70 font-heading block mb-3 text-center">Formaty</span>
            <h2 className="font-heading font-black text-3xl md:text-4xl text-foreground text-center mb-4 leading-tight">Porównaj formaty nośników</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              Cztery formaty - od kompaktowych Super 12 po wielkoformatowe Monster XXL. Wszystkie dostępne w&nbsp;województwie mazowieckim.
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <FormatTable />
          </Reveal>
        </div>
      </section>

      {/* Pricing info */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <Reveal>
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-primary/70 font-heading block mb-3 text-center">Cennik</span>
            <h2 className="font-heading font-black text-3xl md:text-4xl text-foreground text-center mb-14 leading-tight">Transparentne warunki</h2>
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { icon: Calendar, title: "Okres wynajmu", desc: "Minimalny okres to 2 tygodnie. Dłuższe kampanie = lepsze stawki." },
              { icon: MapPin, title: "Lokalizacja", desc: "Cena zależy od miasta i konkretnej lokalizacji nośnika." },
              { icon: Maximize2, title: "Format nośnika", desc: "Im większy format, tym silniejszy wpływ - i nieco wyższa stawka." },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <motion.div
                  className="rounded-xl bg-card/30 border border-border/30 p-6 hover:border-primary/15 transition-all duration-500 group cursor-default"
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/6 border border-primary/12 flex items-center justify-center mb-4">
                    <item.icon className="w-5 h-5 text-primary/60" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Calculator */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise" />
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 relative">
          <Reveal>
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-primary/70 font-heading block mb-3 text-center">Kalkulator</span>
            <h2 className="font-heading font-black text-3xl md:text-4xl text-foreground text-center mb-4 leading-tight">Oszacuj budżet kampanii</h2>
            <p className="text-center text-muted-foreground mb-10 max-w-md mx-auto">Dobierz format, miasto i okres - otrzymasz orientacyjną cenę w kilka sekund.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <PricingCalculator />
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-surface border-y border-border/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise" />
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 relative">
          <Reveal>
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-primary/70 font-heading block mb-3 text-center">FAQ</span>
            <h2 className="font-heading font-black text-3xl md:text-4xl text-foreground text-center mb-12 leading-tight">Najczęstsze pytania</h2>
          </Reveal>
          <div className="space-y-3">
            {[
              { q: "Jaki jest minimalny okres wynajmu billboardu?", a: "Minimalny okres wynajmu to 2 tygodnie. Oferujemy korzystniejsze stawki przy dłuższych kampaniach - od 1 miesiąca wzwyż." },
              { q: "Czy mogę wynająć billboard w dowolnym mieście Mazowsza?", a: "Tak, dysponujemy ponad 1400 nośnikami w województwie mazowieckim. Największa koncentracja nośników to Warszawa i jej obwarzanek, Otwock, Józefów, Marki, Pruszków, Płock, Radom, Siedlce i Ostrołęka." },
              { q: "Co obejmuje cena wynajmu?", a: "Cena wynajmu obejmuje ekspozycję na nośniku. Druk, montaż, demontaż i dokumentację fotograficzną wyceniamy w ramach kompleksowej oferty - często w pakiecie." },
              { q: "Jak szybko mogę uruchomić kampanię?", a: "Od momentu akceptacji oferty do montażu potrzebujemy zazwyczaj 5-7 dni roboczych. W trybie ekspresowym - nawet 3 dni." },
              { q: "Czy otrzymam potwierdzenie montażu?", a: "Tak. Po zamontowaniu plakatu wysyłamy dokumentację fotograficzną każdego nośnika - to nasz standard przy każdej kampanii." },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <FAQItem question={item.q} answer={item.a} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-noise" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-primary/6 rounded-full blur-[150px] animate-glow-pulse" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="font-heading font-black text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 leading-[1.18] tracking-tight px-2">
              Gotowy do <span className="text-gradient-brand-bright text-glow-red inline-block pr-2 pb-1">rezerwacji?</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex items-center justify-center gap-6 mb-8 text-sm text-muted-foreground/60">
              <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-primary/40" /> Bez zobowiązań</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary/40" /> Wycena w 24h</span>
              <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-amber-400/60" /> 4.9/5</span>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <Link href="/kontakt">
              <Button variant="hero" size="xl" className="group glow-red relative overflow-hidden min-h-[44px]">
                <span className="relative z-10 flex items-center gap-2">
                  Chcę otrzymać wycenę
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Button>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

const FORMATS = [
  {
    name: "Super 12",
    size: "5,04 × 2,38 m",
    area: "12 m²",
    minPeriod: "2 tyg.",
    bestFor: "Lokalne kampanie, osiedla",
    available: "Cała sieć mazowiecka",
    popular: false,
  },
  {
    name: "Super 18",
    size: "6 × 3 m",
    area: "18 m²",
    minPeriod: "2 tyg.",
    bestFor: "Kampanie miejskie",
    available: "Warszawa i obwarzanek",
    popular: true,
  },
  {
    name: "Super 36",
    size: "12 × 3 m",
    area: "36 m²",
    minPeriod: "2 tyg.",
    bestFor: "Trasy wylotowe, drogi krajowe",
    available: "Wybrane lokalizacje",
    popular: false,
  },
  {
    name: "Monster XXL",
    size: "niestandardowy",
    area: "30 – 100+ m²",
    minPeriod: "1 mies.",
    bestFor: "Maksymalny impact, eventy",
    available: "Na zapytanie",
    popular: false,
  },
];

function FormatTable() {
  return (
    <>
      {/* Desktop: real table */}
      <div className="hidden md:block rounded-2xl glass-card overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-secondary/40 border-b border-border">
              <th className="px-5 py-4 text-[11px] font-heading font-bold tracking-[0.2em] uppercase text-muted-foreground">Format</th>
              <th className="px-5 py-4 text-[11px] font-heading font-bold tracking-[0.2em] uppercase text-muted-foreground">Wymiar</th>
              <th className="px-5 py-4 text-[11px] font-heading font-bold tracking-[0.2em] uppercase text-muted-foreground">Powierzchnia</th>
              <th className="px-5 py-4 text-[11px] font-heading font-bold tracking-[0.2em] uppercase text-muted-foreground">Min. okres</th>
              <th className="px-5 py-4 text-[11px] font-heading font-bold tracking-[0.2em] uppercase text-muted-foreground">Dla kogo</th>
              <th className="px-5 py-4 text-[11px] font-heading font-bold tracking-[0.2em] uppercase text-muted-foreground">Dostępność</th>
            </tr>
          </thead>
          <tbody>
            {FORMATS.map((f) => (
              <tr key={f.name} className="border-b border-border/50 last:border-b-0 hover:bg-primary/[0.04] transition-colors">
                <td className="px-5 py-5 align-top">
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-bold text-base text-foreground">{f.name}</span>
                    {f.popular && (
                      <span className="px-2 py-0.5 rounded text-[9px] font-heading font-bold text-primary bg-primary/10 border border-primary/30 uppercase tracking-wider">
                        Popularny
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-5 py-5 align-top text-sm text-muted-foreground">{f.size}</td>
                <td className="px-5 py-5 align-top">
                  <span className="font-heading font-black text-lg text-gradient-brand-bright">{f.area}</span>
                </td>
                <td className="px-5 py-5 align-top text-sm text-foreground">{f.minPeriod}</td>
                <td className="px-5 py-5 align-top text-sm text-muted-foreground">{f.bestFor}</td>
                <td className="px-5 py-5 align-top text-sm text-muted-foreground">{f.available}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: stacked cards */}
      <div className="md:hidden space-y-3">
        {FORMATS.map((f) => (
          <div
            key={f.name}
            className={`rounded-2xl glass-card p-5 ${f.popular ? "ring-2 ring-primary/30" : ""}`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-bold text-lg text-foreground">{f.name}</h3>
                {f.popular && (
                  <span className="px-2 py-0.5 rounded text-[9px] font-heading font-bold text-primary bg-primary/10 border border-primary/30 uppercase tracking-wider">
                    Popularny
                  </span>
                )}
              </div>
              <span className="font-heading font-black text-xl text-gradient-brand-bright">{f.area}</span>
            </div>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <dt className="text-muted-foreground">Wymiar</dt>
              <dd className="text-foreground font-medium">{f.size}</dd>
              <dt className="text-muted-foreground">Min. okres</dt>
              <dd className="text-foreground font-medium">{f.minPeriod}</dd>
              <dt className="text-muted-foreground">Dla kogo</dt>
              <dd className="text-foreground font-medium">{f.bestFor}</dd>
              <dt className="text-muted-foreground">Dostępność</dt>
              <dd className="text-foreground font-medium">{f.available}</dd>
            </dl>
          </div>
        ))}
      </div>
    </>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      className={`rounded-xl border transition-all duration-300 overflow-hidden ${
        open ? "bg-card/50 border-primary/15" : "bg-card/20 border-border/30 hover:border-border/50"
      }`}
      layout
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-5 text-left cursor-pointer min-h-[44px]"
        aria-expanded={open}
      >
        <span className="font-heading font-semibold text-sm text-foreground">{question}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }} className="shrink-0">
          <ChevronDown className="w-4 h-4 text-muted-foreground/50" />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="overflow-hidden"
      >
        <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{answer}</p>
      </motion.div>
    </motion.div>
  );
}
