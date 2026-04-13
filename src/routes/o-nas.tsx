"use client";

import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { motion, useInView, animate } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { Award, Users, Target, TrendingUp, ArrowRight, Zap, Calendar, MapPin, Shield } from "lucide-react";

import { TiltCard } from "@/components/TiltCard";

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

const ease = [0.25, 0.46, 0.45, 0.94] as const;

function Reveal({ children, className = "", delay = 0, from = "bottom" }: {
  children: React.ReactNode; className?: string; delay?: number;
  from?: "bottom" | "left" | "right" | "scale";
}) {
  const variants: Record<string, any> = {
    bottom: { opacity: 0, y: 24 },
    left: { opacity: 0, x: -30 },
    right: { opacity: 0, x: 30 },
    scale: { opacity: 0, scale: 0.95 },
  };
  return (
    <motion.div initial={variants[from]} whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.6, delay, ease }} className={className}>
      {children}
    </motion.div>
  );
}

export default function AboutPage() {
  return (
    <>
      {/* Hero with image */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&auto=format&fit=crop&q=60"
            alt="Biuro firmy Billboard — profesjonalne środowisko pracy"
            className="w-full h-full object-cover opacity-15"
            loading="eager"
            width={1920} height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background" />
        </div>
        <div className="absolute inset-0 bg-noise" />


        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Reveal>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-primary text-[11px] font-semibold tracking-[0.2em] uppercase mb-6">
                O firmie
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-6">
                Ponad <span className="text-gradient-brand-bright text-glow-red">25 lat</span> w reklamie wielkoformatowej
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                Jesteśmy jednym z najbardziej doświadczonych operatorów reklamy zewnętrznej w Polsce. Realizujemy kampanie billboardowe od projektu po montaż — profesjonalnie, terminowo i&nbsp;na dużą skalę.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-surface border-y border-border/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <Reveal>
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-primary/70 font-heading block mb-3 text-center">Wartości</span>
            <h2 className="font-heading font-black text-3xl md:text-4xl text-foreground text-center mb-14 leading-tight">Co nas wyróżnia</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Award, title: "Doświadczenie", desc: "25+ lat w branży reklamy wielkoformatowej. Znamy rynek, lokalizacje i skuteczne rozwiązania." },
              { icon: TrendingUp, title: "Skala", desc: "Około 2500 kampanii rocznie na terenie całej Polski. Zarówno lokalne, jak i ogólnokrajowe." },
              { icon: Target, title: "Kompleksowość", desc: "Od projektu graficznego przez druk po montaż i demontaż — obsługujemy cały proces." },
              { icon: Users, title: "Partnerstwo", desc: "Budujemy długoterminowe relacje z klientami. Wielu z nich wraca do nas od lat." },
            ].map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <motion.div
                  className="rounded-xl bg-card/50 border border-border/40 p-6 hover:border-primary/25 transition-all duration-500 group cursor-default h-full"
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/6 border border-primary/15 flex items-center justify-center mb-5 group-hover:border-primary/25 group-hover:shadow-[0_0_20px_oklch(0.58_0.24_25/10%)] transition-all duration-500">
                    <v.icon className="w-5 h-5 text-primary/60" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Story + Timeline */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Reveal from="left">
                <span className="text-xs font-semibold tracking-[0.25em] uppercase text-primary/70 font-heading block mb-3">Historia</span>
                <h2 className="font-heading font-black text-3xl md:text-4xl text-foreground leading-tight mb-8">Nasza droga</h2>
              </Reveal>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <Reveal delay={0.1} from="left">
                  <p>
                    Billboard Sp. z o.o. działa na polskim rynku reklamy zewnętrznej od ponad 25 lat. Zaczynaliśmy od kilku nośników w jednym mieście — dziś obsługujemy tysiące kampanii rocznie na terenie całego kraju.
                  </p>
                </Reveal>
                <Reveal delay={0.15} from="left">
                  <p>
                    Przez lata zbudowaliśmy sieć nośników reklamowych obejmującą kluczowe lokalizacje w największych polskich miastach i przy głównych trasach komunikacyjnych. Naszą przewagą jest nie tylko skala, ale przede wszystkim sprawna, kompleksowa obsługa na każdym etapie kampanii.
                  </p>
                </Reveal>
                <Reveal delay={0.2} from="left">
                  <p>
                    Współpracujemy z agencjami reklamowymi, domami mediowymi i bezpośrednio z klientami. Bez względu na wielkość kampanii — zawsze dostarczamy jakość i terminowość.
                  </p>
                </Reveal>
              </div>
            </div>

            <Reveal from="right" delay={0.1}>
              <div className="rounded-2xl glass-card p-6 md:p-8 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/8 rounded-full blur-[60px]" />
                <div className="relative space-y-0">
                  {[
                    { year: "1998", text: "Założenie firmy i pierwsze billboardy" },
                    { year: "2005", text: "Rozszerzenie sieci na główne miasta Polski" },
                    { year: "2012", text: "Uruchomienie druku wielkoformatowego" },
                    { year: "2020", text: "Przekroczenie 2000 kampanii rocznie" },
                    { year: "Dziś", text: "2500+ kampanii rocznie, zasięg ogólnopolski" },
                  ].map((m, i) => (
                    <motion.div
                      key={m.year}
                      className="flex gap-4 relative py-4"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5, ease }}
                    >
                      {/* Timeline line */}
                      {i < 4 && <div className="absolute left-[22px] top-[52px] bottom-0 w-px bg-gradient-to-b from-primary/20 to-transparent" />}
                      <div className="relative z-10 w-11 h-11 rounded-lg bg-primary/8 border border-primary/15 flex items-center justify-center shrink-0">
                        <Calendar className="w-4 h-4 text-primary/60" />
                      </div>
                      <div className="pt-1">
                        <span className="font-heading font-bold text-primary text-sm">{m.year}</span>
                        <p className="text-sm text-muted-foreground mt-0.5">{m.text}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* W liczbach — animated counters */}
      <section className="py-16 md:py-24 bg-surface border-y border-border/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <Reveal>
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-primary/70 font-heading block mb-3 text-center">W liczbach</span>
            <h2 className="font-heading font-black text-3xl md:text-4xl text-foreground text-center mb-14 leading-tight">Firma w liczbach</h2>
          </Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { target: 25, suffix: "+", label: "lat na rynku", unit: "lat" },
              { target: 2500, suffix: "+", label: "kampanii rocznie", unit: "" },
              { target: 500, suffix: "+", label: "nośników w sieci", unit: "" },
              { target: 16, suffix: "", label: "województw", unit: "" },
            ].map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.1}>
                <CounterCard target={stat.target} suffix={stat.suffix} label={stat.label} />
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
            <h2 className="font-heading font-black text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 leading-tight">
              Poznajmy się <span className="text-gradient-brand-bright text-glow-red">bliżej</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg text-muted-foreground mb-8">
              Porozmawiaj z nami o Twojej kampanii. Doradzimy najlepsze lokalizacje i formaty.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <Link to="/kontakt">
              <Button variant="hero" size="xl" className="group glow-red relative overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  Skontaktuj się z nami
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

function CounterCard({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const c = animate(0, target, {
      duration: 2,
      ease: [0.25, 0.46, 0.45, 0.94],
      onUpdate: (v) => setCount(Math.round(v)),
    });
    return () => c.stop();
  }, [inView, target]);

  return (
    <TiltCard className="group text-center p-6 rounded-xl bg-card/30 border border-border/30 hover:border-primary/15 transition-all duration-500 cursor-default relative overflow-hidden" intensity={4}>
      <div className="relative z-20" ref={ref}>
        <div className="font-heading font-black text-4xl md:text-5xl text-gradient-brand-bright tabular-nums mb-2" style={{ transform: "translateZ(15px)" }}>
          {count}{suffix}
        </div>
        <div className="text-sm text-muted-foreground" style={{ transform: "translateZ(8px)" }}>{label}</div>
      </div>
    </TiltCard>
  );
}
