"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/MagneticButton";
import { TiltCard } from "@/components/TiltCard";
import { Reveal } from "@/components/Reveal";
import { motion, useScroll, useTransform, useInView, animate } from "motion/react";
import { useRef, useEffect, useState } from "react";
import {
  COMPANY_PHONE_ARIA,
  COMPANY_PHONE_DISPLAY,
  COMPANY_PHONE_TEL,
} from "@/lib/contact";
import {
  ArrowRight, Zap, MapPin,
  Clock, Maximize2, BarChart3, Target, Phone, Layers,
  Camera, Truck,
  Star, Quote, Shield,
} from "lucide-react";

/* ═══════ CORE UTILS ═══════ */
const ease = [0.25, 0.46, 0.45, 0.94] as const;

function useCountUp(target: number, dur = 2) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, target, { duration: dur, ease, onUpdate: (v) => setCount(Math.round(v)) });
    return () => c.stop();
  }, [inView, target, dur]);
  return { count, ref };
}

function LightDivider() {
  return <div className="light-leak-divider" />;
}

/** Floating ambient glow orbs - hidden on mobile to save GPU */
function AmbientGlow() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden hidden md:block" aria-hidden="true">
      <div className="absolute w-[500px] h-[350px] rounded-full blur-[160px] bg-primary/[0.04] animate-float-slow" style={{ top: "15%", left: "10%" }} />
      <div className="absolute w-[400px] h-[300px] rounded-full blur-[140px] bg-primary/[0.03] animate-float" style={{ top: "45%", right: "8%", animationDelay: "2s" }} />
      <div className="absolute w-[500px] h-[350px] rounded-full blur-[180px] bg-primary/[0.03] animate-float-subtle" style={{ top: "75%", left: "25%", animationDelay: "4s" }} />
    </div>
  );
}

/* ═══════ PAGE ═══════ */
export default function HomePage() {
  return (
    <>
      <AmbientGlow />
      <div className="relative z-10">
        <HeroSection />
        <LightDivider />
        <BrandTicker />
        <LightDivider />
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.015] to-transparent pointer-events-none" />
          <EditorialStats />
        </div>
        <LightDivider />
        <WhyOutdoor />
        <LightDivider />
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[oklch(0.58_0.04_25/3%)] to-transparent pointer-events-none" />
          <ServicesSection />
        </div>
        <LightDivider />
        <TestimonialsSection />
        <LightDivider />
        <ClientShowcase />
        <LightDivider />
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.01] to-transparent pointer-events-none" />
          <ProcessTimeline />
        </div>
        <LightDivider />
        <BenefitsSection />
        <LightDivider />
        <CTASection />
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════ */
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const bgOp = useTransform(scrollYProgress, [0, 0.6], [0.3, 0.05]);

  return (
    <section ref={ref} className="relative min-h-[100vh] flex items-center overflow-hidden -mt-16 lg:-mt-20">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <motion.img
          src="/images/generated/hero-city-billboards.png"
          alt="Panorama miasta nocą z oświetlonymi billboardami reklamowymi"
          className="w-full h-full object-cover"
          style={{ opacity: bgOp, filter: "grayscale(100%) contrast(1.2)" }}
          loading="eager"
          fetchPriority="high"
          width={1920}
          height={1080}
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/6 rounded-full blur-[150px] animate-glow-pulse animate-gradient-morph" />
      <div className="absolute inset-0 bg-noise" />

      <div className="relative z-10 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        <div className="max-w-3xl">
          <Reveal>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-primary text-[11px] font-semibold tracking-[0.2em] uppercase mb-8">
              <span className="relative w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-primary animate-ping-slow" />
                <span className="relative block w-2 h-2 rounded-full bg-primary" />
              </span>
              WIELKI FORMAT · OD 1998
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-heading font-black text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] text-foreground leading-[1.15] mb-8 tracking-tight">
              Reklama,<br />która{" "}
              <span className="text-gradient-brand-bright text-glow-red inline pr-3 pb-3" style={{ fontFamily: "var(--font-accent)", fontStyle: "italic" }}>zostaje</span>
              <br /><span className="text-muted-foreground/40">w pamięci.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl">
              Billboardy i kampanie outdoorowe w&nbsp;województwie mazowieckim.
              Jeden partner od A do Z - projekt, druk, montaż, raportowanie.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="flex flex-col sm:flex-row gap-4">
              <MagneticButton>
                {/* Point 41: CTA leads to /nosniki (map) - matches "Sprawdź dostępność" */}
                <Link href="/nosniki">
                  <Button variant="hero" size="xl" className="group glow-red relative overflow-hidden">
                    <span className="relative z-10 flex items-center gap-2">
                      Sprawdź dostępność nośników
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  </Button>
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link href="/kontakt">
                  <Button variant="heroOutline" size="xl" className="group">
                    <Phone className="w-5 h-5" />
                    Wyślij zapytanie
                  </Button>
                </Link>
              </MagneticButton>
            </div>
          </Reveal>
          <Reveal delay={0.32}>
            <div className="flex flex-wrap gap-8 md:gap-12 mt-14">
              {[{ val: "od 1998", label: "lat na rynku" }, { val: "2 500+", label: "kampanii / rok" }, { val: "1400+", label: "nośników na Mazowszu" }].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.2, duration: 0.5, ease }}
                >
                  <div className="font-heading font-black text-2xl md:text-3xl text-foreground">{s.val}</div>
                  <div className="text-sm text-muted-foreground mt-0.5">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </Reveal>
          {/* Social proof under stats */}
          <Reveal delay={0.4}>
            <div className="mt-8 flex items-center gap-3">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                <span className="text-foreground font-semibold">4.9 / 5</span> - opinie klientów
              </span>
            </div>
          </Reveal>
        </div>
      </div>

      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
        <span className="text-[11px] text-muted-foreground/70 tracking-[0.2em] uppercase font-heading">Poznaj nas</span>
        <div className="w-px h-8 bg-gradient-to-b from-primary/30 to-transparent overflow-hidden">
          <motion.div className="w-full h-2 bg-primary/50" animate={{ y: ["-100%", "400%"] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} />
        </div>
      </motion.div>
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}

/* ═══════ BRAND TICKER ═══════ */
const brands = [
  "AVON",
  "Euro 2012 - Stadion Narodowy",
  "Madonna - Stadion Narodowy",
  "Maraton Warszawski",
  "Cyfrowy Polsat",
  "Farby Śnieżka",
  "Piotr i Paweł",
  "Baumat",
  "KFC",
  "McDonald's",
  "Subaru Polska",
  "Renault Polska",
  "Potis & Verso",
  "Lexus",
  "Holiday Inn",
  "MediaMarkt",
  "PSB Mrówka",
  "Uzdrowisko Konstancin",
  "Saturn",
  "Euro RTV AGD",
  "Drogerie Jawa",
  "Intersport",
];
function BrandTicker() {
  return (
    <section className="py-6 relative overflow-hidden" aria-label="Zaufali nam">
      <div className="absolute inset-0 bg-noise" />
      <div className="flex items-center gap-3 mb-3 justify-center relative">
        <div className="h-px w-10 bg-gradient-to-r from-transparent to-primary/20" />
        <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-muted-foreground/80 font-heading">Zaufali nam</p>
        <div className="h-px w-10 bg-gradient-to-l from-transparent to-primary/20" />
      </div>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        {/* Point 32: accessible hidden brand list for screen readers */}
        <ul className="sr-only" aria-label="Lista klientów">
          {brands.map((n) => <li key={n}>{n}</li>)}
        </ul>
        <div className="flex animate-ticker gap-16 items-center" aria-hidden="true">
          {[...brands, ...brands].map((n, i) => (
            <span key={`${n}-${i}`} className="shrink-0 text-base md:text-lg font-heading font-bold tracking-[0.12em] text-muted-foreground/70 uppercase whitespace-nowrap select-none hover:text-foreground transition-colors duration-500 cursor-default">{n}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════ EDITORIAL STATS ═══════ */
function EditorialStats() {
  const c1 = useCountUp(2500, 2.5);
  const c2 = useCountUp(new Date().getFullYear() - 1998);
  const c3 = useCountUp(1400);
  const statsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: statsScroll } = useScroll({ target: statsRef, offset: ["start end", "end start"] });
  const rightColY = useTransform(statsScroll, [0, 1], [30, -30]);

  // Masking text reveal - clip-path driven by scroll
  const maskRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: maskScroll } = useScroll({ target: maskRef, offset: ["start 0.9", "start 0.4"] });
  const clipRight = useTransform(maskScroll, [0, 1], [100, 0]);
  const clipPath = useTransform(clipRight, (v) => `inset(-80px ${v}% -80px -80px)`);
  // Expanded clip for blur glow - allows blur to extend beyond tight bounding box
  // on the right side too, so the glow isn't sharply cut when fully revealed.
  const blurClipPath = useTransform(
    clipRight,
    (v) => `inset(-80px calc(${v}% - ${(100 - v) * 0.8}px) -80px -80px)`
  );

  return (
    <section ref={statsRef} className="py-16 md:py-24 relative overflow-visible" aria-label="Statystyki firmy">
      <div className="absolute inset-0 bg-noise" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-6 items-end">
          <div className="lg:col-span-5">
            <Reveal from="left">
              <div ref={c1.ref} className="pb-4 md:pb-6">
                <div
                  ref={maskRef}
                  className="relative inline-block overflow-visible pr-2 pb-[0.14em] md:pb-[0.18em]"
                >
                  <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-0 top-0 whitespace-nowrap font-heading font-black text-[80px] md:text-[110px] lg:text-[130px] leading-[0.92] tabular-nums text-primary/85 blur-[18px] md:blur-[22px]"
                    style={{ clipPath: blurClipPath, transform: "translateY(0.06em)" }}
                  >
                    {c1.count}+
                  </motion.div>
                  <motion.div
                    className="relative whitespace-nowrap font-heading font-black text-[80px] md:text-[110px] lg:text-[130px] leading-[0.92] text-gradient-brand-bright tabular-nums"
                    style={{ clipPath }}
                  >
                    {c1.count}+
                  </motion.div>
                </div>
                <div className="mt-2 text-lg font-heading font-semibold text-foreground">kampanii rocznie</div>
                <p className="mt-2 text-base text-muted-foreground max-w-sm leading-relaxed">Każda zakończona dokumentacją fotograficzną. Każda zrealizowana na czas.</p>
              </div>
            </Reveal>
          </div>
          <motion.div className="lg:col-span-3 lg:col-start-8" style={{ y: rightColY }}>
            <Reveal delay={0.1}>
              <div ref={c2.ref} className="mb-10 lg:mb-12">
                <div className="font-heading font-black text-5xl md:text-6xl text-foreground tabular-nums">{c2.count}</div>
                <div className="text-sm text-muted-foreground mt-1">lat doświadczenia (od 1998)</div>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div ref={c3.ref}>
                <div className="font-heading font-black text-5xl md:text-6xl text-foreground tabular-nums">{c3.count}+</div>
                <div className="text-sm text-muted-foreground mt-1">nośników w województwie mazowieckim</div>
              </div>
            </Reveal>
          </motion.div>
          <div className="lg:col-span-3 lg:col-start-11 hidden lg:block">
            <Reveal delay={0.15} from="right">
              <div className="relative rounded-2xl overflow-hidden aspect-[3/4] border-glow">
                <Image
                  src="/images/generated/night-billboard-portrait.png"
                  alt="Nocne miasto z oświetlonymi ulicami i reklamami"
                  width={400}
                  height={533}
                  className="w-full h-full object-cover opacity-50"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════ WHY OUTDOOR ═══════ */
function WhyOutdoor() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-problem-dark" aria-label="Dlaczego reklama outdoorowa">
      <div className="absolute inset-0 bg-noise" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-5">
            <Reveal from="left">
              <span className="text-xs font-semibold tracking-[0.25em] uppercase text-primary/70 font-heading block mb-4">Dlaczego outdoor</span>
              <h2 className="font-heading font-black text-4xl md:text-5xl lg:text-[3rem] text-foreground leading-[1.04] mb-6 tracking-tight">
                Medium, które<br /><span className="text-gradient-brand-bright">żyje w mieście.</span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
                Outdoor działa tam, gdzie powstają decyzje zakupowe - na ulicach, przy drogach,
                w drodze do pracy i sklepu. Twoi klienci mijają go każdego dnia.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 space-y-4">
            {[
              {
                icon: MapPin,
                title: "Geografia decyzji",
                desc: "Billboardy stoją w punktach, które ludzie codziennie pokonują w drodze do pracy, sklepu czy szkoły. Reklama trafia tam, gdzie zapadają decyzje zakupowe.",
              },
              {
                icon: Clock,
                title: "Ekspozycja 24/7",
                desc: 'Nośnik nie ma „off”. Pracuje 365 dni w roku - w słońcu, deszczu, dzień i noc. Każdy dzień to setki tysięcy kontaktów wzrokowych.',
              },
              {
                icon: BarChart3,
                title: "Mierzalny zasięg",
                desc: "Znamy ruch dzienny każdej lokalizacji. Wiesz, ile osób zobaczy Twoją kampanię, zanim ona ruszy - bez algorytmów, bez zgadywania.",
              },
            ].map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1} from="right">
                <TiltCard className="group relative rounded-xl glass-card p-5 md:p-6 cursor-default" intensity={4}>
                  <div className="relative z-20 flex gap-4 items-start">
                    <div className="w-11 h-11 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                      <p.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-bold text-base md:text-lg text-foreground mb-1.5 leading-tight">{p.title}</h3>
                      <p className="text-sm md:text-[15px] text-muted-foreground leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════ SERVICES - Alternating magazine rows ═══════ */
function ServicesSection() {
  const services = [
    { icon: Maximize2, title: "Billboardy\nreklamowe", hoverAnim: "group-hover:rotate-12 group-hover:scale-110 transition-transform duration-500 ease-out", desc: "Nośniki od 12 do ponad 100 m² w precyzyjnie dobranych lokalizacjach. Arterie komunikacyjne, centra miast, drogi krajowe.", tag: "12-100+ m²", img: "/images/generated/billboard-operator-card.png" },
    { icon: Layers, title: "Druk\nwielkoformatowy", hoverAnim: "group-hover:scale-y-[1.3] group-hover:scale-x-[1.1] transition-transform duration-500 ease-out", desc: "Druk UV i solwentowy na materiałach odpornych na warunki pogodowe. Kolory wierne projektowi przez cały okres ekspozycji.", tag: "pełna gama", img: "/images/generated/print-workshop-card.png" },
    { icon: Truck, title: "Montaż\ni serwis", hoverAnim: "group-hover:-translate-y-1 group-hover:scale-[1.20] group-hover:-rotate-6 transition-transform duration-500 ease-out", desc: "Własne ekipy na terenie województwa mazowieckiego. Montaż, demontaż, zaklejenie po kampanii. Dokumentacja fotograficzna w standardzie.", tag: "Mazowsze", img: "/images/generated/billboard-installation-card.png" },
  ];
  return (
    <section className="py-16 md:py-24 relative overflow-hidden" aria-label="Nasze usługi">
      <div className="absolute inset-0 bg-noise" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <Reveal>
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-primary/70 font-heading block mb-3 text-center">Usługi</span>
          <h2 className="font-heading font-black text-3xl md:text-4xl lg:text-5xl text-foreground text-center mb-16 leading-tight">Wszystko pod jednym dachem</h2>
        </Reveal>
        <div className="space-y-12 md:space-y-20">
          {services.map((s, i) => {
            const rev = i % 2 === 1;
            return (
              <div key={s.title} className="grid md:grid-cols-12 gap-6 md:gap-8 items-center">
                <Reveal from={rev ? "right" : "left"} delay={0.05}
                  className={`md:col-span-7 ${rev ? "md:col-start-6 md:order-2" : ""}`}>
                  <motion.div 
                    className="relative rounded-2xl overflow-hidden aspect-[16/10] group cursor-pointer"
                    whileHover={{ scale: 1.015, y: -2 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Image
                      src={s.img}
                      alt={`Usługa: ${s.title.replace('\n', ' ')} - reklama wielkoformatowa`}
                      width={700}
                      height={438}
                      className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg glass text-[11px] font-heading font-bold text-primary uppercase tracking-wider">{s.tag}</div>
                  </motion.div>
                </Reveal>
                <Reveal from={rev ? "left" : "right"} delay={0.15}
                  className={`md:col-span-5 ${rev ? "md:col-start-1 md:order-1 md:row-start-1" : ""}`}>
                  <motion.div whileHover={{ scale: 1.015 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
                    <TiltCard className="group rounded-2xl glass-card p-5 cursor-default relative" intensity={4}>
                      <div className="relative z-20">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-11 h-11 rounded-xl bg-primary/6 border border-primary/15 flex items-center justify-center" style={{ transform: "translateZ(12px)" }}>
                            <s.icon className={`w-5 h-5 text-primary ${s.hoverAnim || "icon-spin-hover"}`} />
                          </div>
                          <span className="font-heading font-black text-4xl text-primary/8" style={{ transform: "translateZ(8px)" }}>0{i + 1}</span>
                        </div>
                        <h3 className="font-heading font-black text-2xl md:text-3xl text-foreground mb-3 whitespace-pre-line leading-tight">{s.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
                      </div>
                    </TiltCard>
                  </motion.div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   TESTIMONIALS - Social proof section
   ═══════════════════════════════════════════════ */
function TestimonialParallaxCard({ children, offset }: { children: React.ReactNode; offset: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      name: "Anna Kowalska",
      role: "Marketing Director",
      company: "Sieć handlowa",
      text: "Współpracujemy z wielkiformat.pl od 5 lat. Profesjonalizm, terminowość i jakość druku na najwyższym poziomie. Kampania na 120 nośnikach na Mazowszu została zrealizowana bez jednego opóźnienia.",
      rating: 5,
    },
    {
      name: "Marcin Nowak",
      role: "Brand Manager",
      company: "Operator telekomunikacyjny",
      text: "Wybraliśmy wielkiformat.pl ze względu na zasięg i kompleksowość obsługi. Jeden partner do druku, montażu i dokumentacji - to oszczędność czasu i nerwów. Polecam każdemu, kto planuje kampanię outdoor.",
      rating: 5,
    },
    {
      name: "Katarzyna Wiśniewska",
      role: "CEO",
      company: "Agencja reklamowa",
      text: "Jako agencja potrzebujemy partnera, na którym możemy polegać. Wielkiformat.pl to niezawodny wykonawca - szybka wycena, elastyczne terminy i zawsze czysta dokumentacja fotograficzna dla naszych klientów.",
      rating: 5,
    },
  ];

  const parallaxOffsets = [-15, 0, 15];

  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-problem-dark" aria-label="Opinie klientów">
      <div className="absolute inset-0 bg-noise" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mb-14">
          <div className="lg:col-span-6">
            <Reveal from="left">
              <span className="text-xs font-semibold tracking-[0.25em] uppercase text-primary/70 font-heading block mb-3">Opinie</span>
              <h2 className="font-heading font-black text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight">
                Co mówią<br /><span className="text-muted-foreground/40">nasi klienci.</span>
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 flex items-end">
            <Reveal from="right" delay={0.1}>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <div>
                  <div className="font-heading font-bold text-lg text-foreground">4.9 / 5</div>
                  <div className="text-xs text-muted-foreground">Średnia ocena klientów</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <TestimonialParallaxCard key={t.name} offset={parallaxOffsets[i]}>
              <Reveal delay={i * 0.1} from="bottom">
                <TiltCard className="group relative rounded-2xl glass-card p-6 md:p-7 cursor-default h-full" intensity={3}>
                  <div className="relative z-20">
                    <div className="w-9 h-9 rounded-lg bg-primary/6 border border-primary/12 flex items-center justify-center mb-5">
                      <Quote className="w-4 h-4 text-primary/50" />
                    </div>
                    <div className="flex items-center gap-0.5 mb-4">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star key={j} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-[15px] text-foreground/85 leading-relaxed mb-6">„{t.text}"</p>
                    <div className="flex items-center gap-3 pt-4 border-t border-border/15">
                      <div className="w-10 h-10 rounded-full bg-primary/8 border border-primary/15 flex items-center justify-center shrink-0">
                        <span className="text-sm font-heading font-bold text-primary/60">
                          {t.name.split(" ").map((n) => n[0]).join("")}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-heading font-semibold text-foreground">{t.name}</div>
                        <div className="text-xs text-muted-foreground">{t.role}, {t.company}</div>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            </TestimonialParallaxCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   CLIENT SHOWCASE - Horizontal scroll on desktop
   ═══════════════════════════════════════════════ */
function ClientShowcase() {
  const clients = [
    { name: "KFC", category: "Kampania reklamowa", scope: "Najpopularniejsza sieć restauracji założona przez Harlanda Sandersa.", img: "/clients/new_kfc.png" },
    { name: "McDonald's", category: "Kampania reklamowa", scope: "Największa sieć restauracji szybkiej obsługi o globalnym zasięgu.", img: "/clients/new_mc.png" },
    { name: "Leroy Merlin", category: "Kampania reklamowa", scope: "Francuska sieć hipermarketów z branży budowlanej i dekoracyjnej.", img: "/clients/new_leroymerlin.png" },
    { name: "Renault", category: "Kampania reklamowa", scope: "Francuski producent innowacyjnych aut miejskich i użytkowych.", img: "/clients/new_renault.png" },
    { name: "Toyota", category: "Kampania reklamowa", scope: "Japoński lider motoryzacji słynący z niezawodności i technologii.", img: "/clients/new_toyota.png" },
  ];

  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0.05, 0.95], ["0%", "-65%"]);
  const sectionY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <>
      {/* Mobile: Standard cards grid */}
      <section className="lg:hidden relative overflow-hidden py-16 md:py-24" aria-label="Realizacje dla klientów">
        <div className="absolute inset-0 bg-surface/20" />
        <div className="absolute inset-0 bg-noise" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 relative">
          <Reveal from="left">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-primary/70 font-heading block mb-3">Klienci</span>
            <h2 className="font-heading font-black text-3xl md:text-4xl text-foreground leading-tight mb-10">
              Realizujemy kampanie<br />
              <span className="text-muted-foreground/40">dla największych marek.</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {clients.map((c, i) => (
              <Reveal key={c.name} delay={i * 0.08}>
                <motion.div
                  className={`group relative rounded-2xl glass-card overflow-hidden aspect-[4/3] cursor-pointer ${
                    i === clients.length - 1 ? "col-span-2 sm:col-span-1" : ""
                  }`}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  {/* Logo plate - jasna podkładka pod logo (czytelność niezależnie od koloru loga) */}
                  <div className="absolute inset-3 bottom-10 rounded-xl client-logo-plate z-10" aria-hidden="true" />
                  {/* Hover brand-toned overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.06] via-transparent to-primary/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-15" />
                  {/* Logo */}
                  <div className="absolute inset-x-0 top-0 bottom-10 flex items-center justify-center px-5 py-5 z-20 pointer-events-none">
                    <Image
                      src={c.img}
                      alt={`Logo marki: ${c.name}`}
                      width={240}
                      height={140}
                      className="object-contain max-w-[80%] max-h-[80%] transition-all duration-700 group-hover:scale-[1.06] grayscale group-hover:grayscale-0"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between">
                    <h3 className="font-heading font-bold text-xs text-foreground/85 tracking-wide">{c.name}</h3>
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div className="mt-10 text-center">
              <Link href="/kontakt">
                <Button variant="outline" size="lg" className="border-glow-hover group min-h-[44px]">
                  Porozmawiajmy o Twojej kampanii <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Desktop: Horizontal scroll with slow vertical drift */}
      <div ref={sectionRef} className="hidden lg:block relative" style={{ height: "400vh" }} aria-label="Realizacje dla klientów">
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="absolute inset-0 bg-background" />
          <div className="absolute inset-0 bg-surface/20" />
          <div className="absolute inset-0 bg-noise" />
          <motion.div className="relative z-10" style={{ y: sectionY }}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16">
              <div className="grid grid-cols-12 gap-6 mb-10">
                <div className="col-span-7">
                  <Reveal from="left">
                    <span className="text-xs font-semibold tracking-[0.25em] uppercase text-primary/70 font-heading block mb-3">Klienci</span>
                    <h2 className="font-heading font-black text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight">
                      Realizujemy kampanie<br />
                      <span className="text-muted-foreground/40">dla największych marek.</span>
                    </h2>
                  </Reveal>
                </div>
                <div className="col-span-4 col-start-9 flex items-end">
                  <Reveal from="right" delay={0.1}>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Od sieci handlowych po deweloperów - obsługujemy kampanie od kilkunastu do kilkuset nośników jednocześnie.
                    </p>
                  </Reveal>
                </div>
              </div>
            </div>
            {/* Scrolling cards row - pushed up to leave more space at bottom */}
            <div className="flex items-start pt-16" style={{ height: "calc(100vh - 280px)" }}>
              <motion.div className="flex gap-6 pl-[5vw]" style={{ x }}>
                {clients.map((c, i) => (
                  <motion.div
                    key={c.name}
                    className="group relative rounded-3xl glass-card overflow-hidden cursor-pointer shrink-0 w-[460px] aspect-[4/3]"
                    whileHover={{ y: -8, scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 280, damping: 26 }}
                  >
                    {/* Index marker */}
                    <div className="absolute top-5 right-6 z-30 font-heading font-black text-3xl text-primary/15 tabular-nums tracking-tight pointer-events-none select-none">
                      0{i + 1}
                    </div>

                    {/* Logo plate - jasna podkładka pod logo */}
                    <div className="absolute inset-5 bottom-24 rounded-2xl client-logo-plate z-10" aria-hidden="true" />

                    {/* Brand glow on hover */}
                    <div className="absolute -top-12 -left-12 w-64 h-64 bg-primary/10 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0" />
                    <div className="absolute -bottom-10 -right-10 w-56 h-56 bg-primary/[0.07] rounded-full blur-[70px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0" />

                    {/* Logo */}
                    <div className="absolute inset-x-0 top-0 bottom-24 flex items-center justify-center p-12 z-20 pointer-events-none">
                      <Image
                        src={c.img}
                        alt={`Logo marki: ${c.name}`}
                        width={400}
                        height={240}
                        className="object-contain max-w-[80%] max-h-[78%] transition-all duration-700 group-hover:scale-[1.05] grayscale group-hover:grayscale-0"
                        loading="lazy"
                      />
                    </div>

                    {/* Top accent line */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-30" />

                    {/* Footer */}
                    <div className="absolute inset-x-0 bottom-0 z-20 px-7 py-5 border-t border-border/40 bg-gradient-to-t from-background/80 via-background/40 to-transparent">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse-dot" />
                        <span className="text-[10px] font-heading font-semibold tracking-[0.18em] uppercase text-primary/80">Klient</span>
                      </div>
                      <h3 className="font-heading font-bold text-xl text-foreground mb-1 transition-transform duration-500 group-hover:translate-x-1">{c.name}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 max-w-[88%]">{c.scope}</p>
                    </div>
                  </motion.div>
                ))}
                {/* End CTA card */}
                <div className="shrink-0 w-[480px] aspect-[4/3] rounded-2xl glass-card flex flex-col items-center justify-center text-center p-8">
                  <div className="w-14 h-14 rounded-2xl bg-primary/8 border border-primary/15 flex items-center justify-center mb-5">
                    <ArrowRight className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-foreground mb-2">Twoja kampania?</h3>
                  <p className="text-sm text-muted-foreground mb-6">Porozmawiajmy o Twoich celach.</p>
                  <Link href="/kontakt">
                    <Button variant="cta" className="group min-h-[44px]">
                      Wyślij zapytanie <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
                <div className="shrink-0 w-[5vw]" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

/* ═══════ PROCESS — compact horizontal/vertical pipeline ═══════ */
function ProcessTimeline() {
  const steps = [
    { icon: Target, title: "Briefing", desc: "Cele, grupa, budżet." },
    { icon: MapPin, title: "Lokalizacje", desc: "Wybór na mapie i rezerwacja w 30 sek." },
    { icon: Layers, title: "Projekt i druk", desc: "Studio graficzne, preflight, druk." },
    { icon: Camera, title: "Montaż i raport", desc: "Ekipy w terenie + raport foto." },
  ];

  return (
    <section className="py-16 md:py-24 relative overflow-hidden" aria-label="Proces współpracy">
      <div className="absolute inset-0 bg-noise" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative">
        <Reveal>
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-primary/70 font-heading block text-center mb-3">Cały proces</span>
          <h2 className="font-heading font-black text-3xl md:text-4xl lg:text-5xl text-foreground text-center mb-4 leading-[1.1] tracking-tight">
            Od pomysłu do montażu<br /><span className="text-gradient-brand-bright text-glow-red inline-block pr-2 pb-1">krok po kroku.</span>
          </h2>
          <p className="text-center text-muted-foreground max-w-xl mx-auto mb-14">
            Cztery proste etapy. Pełen rozkład w&nbsp;
            <Link href="/obsluga-kampanii" className="text-primary hover:underline font-medium">obsłudze kampanii</Link>.
          </p>
        </Reveal>

        {/* Desktop: horizontal pipeline */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Animated background line */}
            <div className="absolute top-7 left-[6%] right-[6%] h-px bg-border/40 -z-0" aria-hidden="true">
              <motion.div
                className="h-full bg-gradient-to-r from-primary/50 via-primary to-primary/50"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease, delay: 0.2 }}
                style={{ transformOrigin: "left" }}
              />
            </div>

            <div className="grid grid-cols-4 gap-4 lg:gap-6 relative">
              {steps.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.12, ease }}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Numbered circle */}
                  <div className="relative z-10 mb-5">
                    <div className="w-14 h-14 rounded-full bg-card border-2 border-primary/40 flex items-center justify-center shadow-[0_0_24px_oklch(0.58_0.24_25/15%)] group-hover:shadow-[0_0_32px_oklch(0.58_0.24_25/30%)] transition-shadow">
                      <s.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-heading font-black flex items-center justify-center tabular-nums">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-base lg:text-lg text-foreground mb-1 leading-tight">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-[14rem]">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: vertical pipeline */}
        <div className="md:hidden">
          <div className="relative pl-12">
            <div className="absolute left-5 top-3 bottom-3 w-px bg-border/40" aria-hidden="true">
              <motion.div
                className="w-full bg-gradient-to-b from-primary/50 via-primary to-primary/50"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease, delay: 0.2 }}
                style={{ transformOrigin: "top" }}
              />
            </div>
            <div className="space-y-7">
              {steps.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease }}
                  className="relative"
                >
                  <div className="absolute -left-[2.5rem] top-0">
                    <div className="relative w-10 h-10 rounded-full bg-card border-2 border-primary/40 flex items-center justify-center">
                      <s.icon className="w-4 h-4 text-primary" />
                      <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[9px] font-heading font-black flex items-center justify-center tabular-nums">
                        {i + 1}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-heading font-bold text-base text-foreground mb-0.5 leading-tight">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <Reveal delay={0.4}>
          <div className="text-center mt-12">
            <Link href="/obsluga-kampanii" className="inline-flex items-center gap-2 text-sm font-heading font-semibold text-primary hover:text-primary/80 transition-colors">
              Zobacz pełny proces krok po kroku
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════ BENEFITS ═══════ */
function BenefitsSection() {
  const benefits = [
    { icon: Zap, text: "Rezerwacja billboardu w 30 sekund - zautomatyzowany system online." },
    { icon: Shield, text: "Automatyczny preflight zatrzymuje błędne pliki, zanim trafią do druku." },
    { icon: Layers, text: "System Kaizen w codziennej pracy - każdy proces ciągle udoskonalany." },
    { icon: Camera, text: "Raporty fotograficzne z montażu wysyłane automatycznie do skrzynki klienta." },
    { icon: BarChart3, text: "Każdy nośnik opisany precyzyjnie - format, wykończenie, dane techniczne." },
    { icon: Target, text: "Ułatwienia dla klienta i dla nas - mniej maili, mniej telefonów, więcej kampanii." },
  ];
  const { count, ref: cRef } = useCountUp(30, 1.6);

  return (
    <section className="py-16 md:py-24 relative overflow-hidden" aria-label="Dlaczego my - nowoczesne procesy">
      <div className="absolute inset-0 bg-noise" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-6">
            <Reveal from="left">
              <span className="text-xs font-semibold tracking-[0.25em] uppercase text-primary/70 font-heading block mb-3">Dlaczego my</span>
              <h2 className="font-heading font-black text-3xl md:text-4xl lg:text-5xl text-foreground leading-[1.1] mb-6 tracking-tight">Procesy, które działają<br /><span className="text-gradient-brand-bright">za Ciebie.</span></h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
                Nie sprzedajemy doświadczenia ani liczb. Sprzedajemy gotowość operacyjną - automatyzację, która ułatwia życie i nam, i naszym klientom.
              </p>
            </Reveal>
            <ul className="space-y-2">
              {benefits.map((b, i) => (
                <Reveal key={b.text} delay={i * 0.05} from="left">
                  <motion.li className="flex items-start gap-3 group p-2.5 -ml-2.5 rounded-xl hover:bg-primary/[0.04] transition-colors duration-300 cursor-default"
                    whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}>
                    <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:border-primary/40 group-hover:shadow-[0_0_14px_oklch(0.58_0.24_25/15%)] transition-all duration-300">
                      <b.icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-[15px] text-foreground/85 group-hover:text-foreground transition-colors">{b.text}</span>
                  </motion.li>
                </Reveal>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal from="right">
              <TiltCard className="group relative rounded-2xl glass-card p-8 md:p-10 cursor-default" intensity={5}>
                <div className="relative z-20" ref={cRef}>
                  <div className="absolute -top-6 -left-4 w-36 h-28 rounded-full blur-[50px] bg-primary/8 animate-glow-pulse" />
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-heading font-bold tracking-[0.2em] uppercase mb-5" style={{ transform: "translateZ(14px)" }}>Automatyzacja</span>
                  <div className="font-heading font-black text-6xl md:text-7xl leading-[0.94] pb-4 text-gradient-brand-bright mb-1 tabular-nums text-glow-red relative" style={{ transform: "translateZ(20px)" }}>{count}<span className="text-3xl md:text-4xl ml-1 align-top">sek.</span></div>
                  <p className="text-lg text-foreground font-heading font-bold mb-2" style={{ transform: "translateZ(12px)" }}>na rezerwację billboardu</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6" style={{ transform: "translateZ(8px)" }}>Bez maili, bez telefonów, bez czekania. Zautomatyzowany system online działa 24/7.</p>
                  <div className="pt-5 border-t border-border/30 grid grid-cols-3 gap-4 text-center">
                    {[{ v: "Kaizen", l: "od 2018" }, { v: "Preflight", l: "od 2022" }, { v: "100%", l: "dokumentacja" }].map((s) => (
                      <motion.div key={s.l} whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400 }} style={{ transform: "translateZ(10px)" }}>
                        <div className="font-heading font-bold text-base lg:text-lg text-foreground leading-tight">{s.v}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{s.l}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════ CTA ═══════ */
function CTASection() {
  const ctaRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ctaRef, offset: ["start end", "end start"] });
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5], [0.04, 0.12]);
  const glowScale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1.2]);
  return (
    <section ref={ctaRef} className="relative py-24 md:py-32 overflow-hidden" aria-label="Zacznij współpracę">
      <div className="absolute inset-0 bg-noise" />
      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary rounded-full blur-[150px]"
        style={{ opacity: glowOpacity, scale: glowScale }}
      />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[200px] bg-primary/4 rounded-full blur-[120px] animate-glow-pulse" style={{ animationDelay: "1.5s" }} />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass text-primary text-xs font-semibold tracking-[0.2em] uppercase mb-8">
            <Zap className="w-3.5 h-3.5" /> Zacznij teraz
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-heading font-black text-3xl md:text-5xl lg:text-6xl text-foreground mb-6 leading-[1.15] tracking-tight px-2">
            Gotowy na{" "}
            <span className="text-gradient-brand-bright text-glow-red relative inline-block pr-2 pb-2 align-baseline">
              wielki format?
              <motion.span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-brand-warm rounded-full"
                initial={{ width: 0 }} whileInView={{ width: "calc(100% - 1rem)" }} viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease }} />
            </span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Sprawdź dostępność nośników i otrzymaj wycenę w&nbsp;ciągu <span className="text-foreground font-semibold">24 godzin</span>. Bez zobowiązań.
          </p>
        </Reveal>

        {/* Point 42: Urgency + social proof */}
        <Reveal delay={0.25}>
          <div className="flex items-center justify-center gap-6 mb-8 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-primary/40" /> Bez zobowiązań</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary/40" /> Odpowiedź w 24h</span>
            <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-amber-400/60" /> 4.9/5 ocena</span>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <Link href="/kontakt">
            <Button variant="hero" size="xl" className="group glow-red-intense cta-proximity-glow relative overflow-hidden min-h-[44px]">
              <span className="relative z-10 flex items-center gap-2">
                Chcę otrzymać wycenę <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </Button>
          </Link>
        </Reveal>
        <Reveal delay={0.4}>
          <div className="mt-8 text-sm text-muted-foreground/80 flex items-center justify-center gap-2">
            <Phone className="w-4 h-4" /> lub zadzwoń:{" "}
            <a href={COMPANY_PHONE_TEL} aria-label={COMPANY_PHONE_ARIA} className="text-foreground/60 hover:text-primary transition-colors font-medium">{COMPANY_PHONE_DISPLAY}</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
