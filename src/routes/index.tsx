"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/MagneticButton";
import { TiltCard } from "@/components/TiltCard";
import { Reveal } from "@/components/Reveal";
import { motion, useScroll, useTransform, useInView, animate, useReducedMotion } from "motion/react";
import { useRef, useEffect, useState } from "react";
import {
  ArrowRight, Zap, MapPin, CheckCircle,
  TrendingUp, Award, Clock, Maximize2, BarChart3, Target, Phone, Layers,
  Camera, Truck, Globe, ArrowUpRight, EyeOff, AlertTriangle, Flame,
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

/** Floating ambient glow orbs - pure CSS, no JS overhead */
function AmbientGlow() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
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
          src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&auto=format&fit=crop&q=80"
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
              WIELKI FORMAT · OD 2001
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
              Billboardy i kampanie outdoorowe w&nbsp;całej Polsce.
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
              {[{ val: "25+", label: "lat na rynku" }, { val: "2 500+", label: "kampanii / rok" }, { val: "500+", label: "nośników" }].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.2, duration: 0.5, ease }}
                >
                  <div className="font-heading font-black text-2xl md:text-3xl text-foreground">{s.val}</div>
                  <div className="text-xs text-muted-foreground/50 mt-0.5">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </Reveal>
          {/* Point 42: Urgency trigger */}
          <Reveal delay={0.36}>
            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs">
              <span className="relative w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping-slow" />
                <span className="relative block w-2 h-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-muted-foreground">
                W tej chwili <span className="text-foreground font-semibold">47 nośników</span> dostępnych
              </span>
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
              <span className="text-xs text-muted-foreground/50">
                <span className="text-foreground/60 font-medium">4.9 / 5</span> - opinie klientów
              </span>
            </div>
          </Reveal>
        </div>
      </div>

      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
        <span className="text-[10px] text-muted-foreground/30 tracking-[0.2em] uppercase font-heading">Poznaj nas</span>
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
const brands = ["Media Expert", "Żabka", "PKN Orlen", "Kaufland", "Lidl", "Biedronka", "Play", "T-Mobile", "Allegro", "InPost", "Pepco", "CCC", "Reserved", "Leroy Merlin", "OBI"];
function BrandTicker() {
  return (
    <section className="py-6 relative overflow-hidden" aria-label="Zaufali nam">
      <div className="absolute inset-0 bg-noise" />
      <div className="flex items-center gap-3 mb-3 justify-center relative">
        <div className="h-px w-10 bg-gradient-to-r from-transparent to-primary/20" />
        <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-muted-foreground/30 font-heading">Zaufali nam</p>
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
            <span key={`${n}-${i}`} className="shrink-0 text-base md:text-lg font-heading font-bold tracking-[0.12em] text-muted-foreground/30 uppercase whitespace-nowrap select-none hover:text-muted-foreground/60 transition-colors duration-500 cursor-default">{n}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════ EDITORIAL STATS ═══════ */
function EditorialStats() {
  const c1 = useCountUp(2500, 2.5);
  const c2 = useCountUp(25);
  const c3 = useCountUp(500);
  const statsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: statsScroll } = useScroll({ target: statsRef, offset: ["start end", "end start"] });
  const rightColY = useTransform(statsScroll, [0, 1], [30, -30]);

  // Masking text reveal - clip-path driven by scroll
  const maskRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: maskScroll } = useScroll({ target: maskRef, offset: ["start 0.9", "start 0.4"] });
  const clipRight = useTransform(maskScroll, [0, 1], [100, 0]);

  return (
    <section ref={statsRef} className="py-16 md:py-24 relative overflow-hidden" aria-label="Statystyki firmy">
      <div className="absolute inset-0 bg-noise" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-6 items-end">
          <div className="lg:col-span-5">
            <Reveal from="left">
              <div ref={c1.ref}>
                <motion.div
                  ref={maskRef}
                  className="font-heading font-black text-[80px] md:text-[110px] lg:text-[130px] leading-none text-gradient-brand-bright text-glow-red tabular-nums"
                  style={{ clipPath: useTransform(clipRight, (v) => `inset(0 ${v}% 0 0)`) }}
                >{c1.count}+</motion.div>
                <div className="mt-2 text-lg font-heading font-semibold text-foreground">kampanii rocznie</div>
                <p className="mt-2 text-sm text-muted-foreground/60 max-w-sm leading-relaxed">Każda zakończona dokumentacją fotograficzną. Każda zrealizowana na czas.</p>
              </div>
            </Reveal>
          </div>
          <motion.div className="lg:col-span-3 lg:col-start-8" style={{ y: rightColY }}>
            <Reveal delay={0.1}>
              <div ref={c2.ref} className="mb-10 lg:mb-12">
                <div className="font-heading font-black text-5xl md:text-6xl text-foreground tabular-nums">{c2.count}+</div>
                <div className="text-sm text-muted-foreground/50 mt-1">lat doświadczenia</div>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div ref={c3.ref}>
                <div className="font-heading font-black text-5xl md:text-6xl text-foreground tabular-nums">{c3.count}+</div>
                <div className="text-sm text-muted-foreground/50 mt-1">nośników w 16 województwach</div>
              </div>
            </Reveal>
          </motion.div>
          <div className="lg:col-span-3 lg:col-start-11 hidden lg:block">
            <Reveal delay={0.15} from="right">
              <div className="relative rounded-2xl overflow-hidden aspect-[3/4] border-glow">
                <Image
                  src="https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=400&auto=format&fit=crop&q=70"
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
              <h2 className="font-heading font-black text-3xl md:text-4xl lg:text-[2.75rem] text-foreground leading-[1.05] mb-6">
                Reklama, której<br /><span className="text-gradient-brand-bright">nie da się zignorować.</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                W świecie, w&nbsp;którym reklamy online są scrollowane w ułamku sekundy, billboard pozostaje niezmienny.
                Stoi 24/7, buduje rozpoznawalność marki jak żadne inne medium.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 space-y-4">
            {[
              { icon: EyeOff, title: "Nieblokowana ekspozycja", desc: "Adblock nie istnieje w outdoorze. Twoja reklama jest widoczna - zawsze, dla każdego." },
              { icon: Flame, title: "Budowanie prestiżu", desc: "Obecność w przestrzeni miejskiej to sygnał siły marki. Firmy na billboardach są postrzegane jako liderzy." },
              { icon: AlertTriangle, title: "Kompleksowość bez chaosu", desc: "Druk, logistyka, montaż, dokumentacja - wszystko po naszej stronie. Ty skupiasz się na biznesie." },
            ].map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1} from="right">
                <TiltCard className="group relative rounded-xl glass-card p-5 cursor-default" intensity={4}>
                  <div className="relative z-20 flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-lg bg-primary/6 border border-primary/12 flex items-center justify-center shrink-0 mt-0.5">
                      <p.icon className="w-5 h-5 text-primary/60" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-sm text-foreground mb-1">{p.title}</h3>
                      <p className="text-sm text-muted-foreground/70 leading-relaxed">{p.desc}</p>
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
    { icon: Maximize2, title: "Billboardy\nreklamowe", hoverAnim: "group-hover:rotate-12 group-hover:scale-110 transition-transform duration-500 ease-out", desc: "Nośniki od 12 do ponad 100 m² w precyzyjnie dobranych lokalizacjach. Arterie komunikacyjne, centra miast, drogi krajowe.", tag: "12-100+ m²", img: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=700&auto=format&fit=crop&q=70" },
    { icon: Layers, title: "Druk\nwielkoformatowy", hoverAnim: "group-hover:scale-y-[1.3] group-hover:scale-x-[1.1] transition-transform duration-500 ease-out", desc: "Druk UV i solwentowy na materiałach odpornych na warunki pogodowe. Kolory wierne projektowi przez cały okres ekspozycji.", tag: "pełna gama", img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=700&auto=format&fit=crop&q=70" },
    { icon: Truck, title: "Montaż\ni serwis", hoverAnim: "group-hover:-translate-y-1 group-hover:scale-[1.20] group-hover:-rotate-6 transition-transform duration-500 ease-out", desc: "Własne ekipy w 16 województwach. Montaż, demontaż, zaklejenie po kampanii. Dokumentacja fotograficzna w standardzie.", tag: "cała Polska", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=700&auto=format&fit=crop&q=70" },
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
      text: "Współpracujemy z wielkiformat.pl od 5 lat. Profesjonalizm, terminowość i jakość druku na najwyższym poziomie. Kampania ogólnopolska na 120 nośnikach została zrealizowana bez jednego opóźnienia.",
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
                  <div className="text-xs text-muted-foreground/50">Średnia ocena klientów</div>
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
                    <p className="text-sm text-muted-foreground/80 leading-relaxed mb-6">„{t.text}"</p>
                    <div className="flex items-center gap-3 pt-4 border-t border-border/15">
                      <div className="w-10 h-10 rounded-full bg-primary/8 border border-primary/15 flex items-center justify-center shrink-0">
                        <span className="text-sm font-heading font-bold text-primary/60">
                          {t.name.split(" ").map((n) => n[0]).join("")}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-heading font-semibold text-foreground">{t.name}</div>
                        <div className="text-[11px] text-muted-foreground/50">{t.role}, {t.company}</div>
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
    { name: "KFC", category: "Kampania reklamowa", scope: "Najpopularniejsza sieć restauracji założona przez Harlanda Sandersa.", img: "https://logo.clearbit.com/kfc.com" },
    { name: "McDonald's", category: "Kampania reklamowa", scope: "Największa sieć restauracji szybkiej obsługi o globalnym zasięgu.", img: "https://logo.clearbit.com/mcdonalds.com" },
    { name: "Leroy Merlin", category: "Kampania reklamowa", scope: "Francuska sieć hipermarketów z branży budowlanej i dekoracyjnej.", img: "https://logo.clearbit.com/leroymerlin.fr" },
    { name: "Renault", category: "Kampania reklamowa", scope: "Prestiżowy francuski producent innowacyjnych aut miejskich i użytkowych.", img: "https://logo.clearbit.com/renault.com" },
    { name: "Toyota", category: "Kampania reklamowa", scope: "Japoński lider motoryzacji słynący z niezawodności i technologii.", img: "https://logo.clearbit.com/toyota.com" },
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
          <div className="grid grid-cols-2 gap-3">
            {clients.slice(0, 4).map((c, i) => (
              <Reveal key={c.name} delay={i * 0.08}>
                <motion.div className="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer"
                  whileHover={{ scale: 1.008 }} transition={{ type: "spring", stiffness: 300, damping: 25 }}>
                  <div className="absolute inset-0 bg-white/95 p-6 flex flex-col items-center justify-center">
                    <Image src={c.img} alt={`Logo marki: ${c.name}`} width={200} height={120} className="object-contain w-full h-[60%] transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-95 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-3 left-3">
                    <span className="px-2 py-0.5 rounded glass text-[9px] font-heading font-bold text-primary uppercase tracking-wider mb-1 inline-block">{c.category}</span>
                    <h3 className="font-heading font-bold text-xs text-foreground">{c.name}</h3>
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
                {clients.map((c) => (
                  <motion.div
                    key={c.name}
                    className="group relative rounded-2xl overflow-hidden cursor-pointer shrink-0 w-[480px] aspect-[4/3]"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    <div className="absolute inset-0 bg-white/95 flex items-center justify-center p-12">
                      <Image
                        src={c.img}
                        alt={`Logo marki: ${c.name}`}
                        width={400}
                        height={240}
                        className="object-contain w-full h-[60%] transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    {/* Shadow overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-95 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-primary/15 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="absolute bottom-6 left-6 right-6 z-10 transition-transform duration-500 group-hover:-translate-y-2">
                      <span className="px-2 py-0.5 rounded glass-strong text-[10px] font-heading font-bold text-primary uppercase tracking-wider mb-2 inline-block">
                        {c.category}
                      </span>
                      <h3 className="font-heading font-bold text-xl text-foreground mb-1">{c.name}</h3>
                      <p className="text-sm text-foreground/80 leading-relaxed">{c.scope}</p>
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

/* ═══════ PROCESS TIMELINE ═══════ */
function MobileTimelineDot({ index }: { index: number }) {
  return (
    <div className="absolute left-0 -translate-x-[calc(50%+7px)] top-3">
      <motion.div className="w-6 h-6 rounded-full border-2 border-primary/25 bg-background flex items-center justify-center"
        initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
        transition={{ delay: index * 0.1 + 0.2, type: "spring", stiffness: 300 }}>
        <CheckCircle className="w-3 h-3 text-primary" />
      </motion.div>
    </div>
  );
}

function ProcessTimeline() {
  const steps = [
    { num: "01", title: "Briefing & analiza", desc: "Poznajemy cele kampanii, grupę docelową i budżet. Proponujemy optymalne lokalizacje i formaty.", icon: Target },
    { num: "02", title: "Wybór lokalizacji", desc: "Interaktywna mapa z dostępnymi nośnikami. Rekomendacje oparte na danych o ruchu i demografii.", icon: MapPin },
    { num: "03", title: "Projekt & druk", desc: "Własne studio graficzne i drukarnia wielkoformatowa. Materiały odporne na warunki atmosferyczne.", icon: BarChart3 },
    { num: "04", title: "Montaż & kampania", desc: "Profesjonalny montaż przez nasze ekipy w całej Polsce. Dokumentacja fotograficzna w standardzie.", icon: CheckCircle },
  ];

  return (
    <section className="py-16 md:py-24 relative overflow-hidden" aria-label="Proces współpracy">
      <div className="absolute inset-0 bg-noise" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <Reveal>
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-primary/70 font-heading block text-center mb-3">Jak działamy</span>
          <h2 className="font-heading font-black text-3xl md:text-4xl lg:text-5xl text-foreground text-center mb-16 leading-tight">
            4 kroki do<br /><span className="text-gradient-brand-bright text-glow-red">skutecznej kampanii</span>
          </h2>
        </Reveal>

        {/* Desktop: Horizontal timeline */}
        <div className="hidden lg:block relative pb-10">
          
          <div className="grid grid-cols-4 gap-6 relative z-10 mb-8">
            {steps.map((s, i) => (
              <Reveal key={s.num} delay={i * 0.1}>
                {/* Content glass card */}
                <TiltCard 
                  className="rounded-2xl glass-card p-6 h-full flex flex-col relative group hover:border-primary/30 transition-colors duration-500 cursor-default bg-surface/80 backdrop-blur-md overflow-hidden block"
                  intensity={6}
                >
                  <div className="absolute top-4 right-5 font-heading font-black text-6xl text-primary/[0.04] select-none pointer-events-none transition-all duration-500 group-hover:text-primary/[0.08] group-hover:translate-x-1 group-hover:-translate-y-1">{s.num}</div>
                  <div className="flex flex-col mb-4 relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mb-4 group-hover:shadow-[0_0_20px_oklch(0.58_0.24_25/15%)] group-hover:scale-105 transition-all duration-300" style={{ transform: "translateZ(12px)" }}>
                      <s.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-heading font-black text-xs tracking-wider uppercase text-primary/60 mb-1" style={{ transform: "translateZ(8px)" }}>Krok {parseInt(s.num)}</span>
                    <h3 className="font-heading font-bold text-lg text-foreground leading-tight">{s.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1 relative z-10">{s.desc}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>

          {/* Timeline bottom line */}
          <div className="absolute bottom-4 left-2 right-2 h-0.5 bg-border/20 rounded-full overflow-hidden">
            <motion.div className="h-full bg-gradient-to-r from-primary/40 via-primary to-primary/40 rounded-full"
              initial={{ width: 0 }} whileInView={{ width: "100%" }} viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.3, ease }} />
          </div>
        </div>

        {/* Mobile/tablet: vertical timeline */}
        <div className="lg:hidden">
          <div className="relative pl-10">
            <div className="absolute top-0 bottom-0 left-3 w-px bg-border/20">
              <motion.div className="w-full bg-gradient-to-b from-primary/40 via-primary/60 to-primary/40"
                initial={{ height: 0 }} whileInView={{ height: "100%" }} viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.2, ease }} />
            </div>
            <div className="space-y-8">
              {steps.map((s, i) => (
                <Reveal key={s.num} delay={i * 0.1}>
                  <div className="relative">
                    <MobileTimelineDot index={i} />
                    <div className="rounded-xl glass-card p-5 relative overflow-hidden">
                      <div className="absolute -top-2 -right-1 font-heading font-black text-[60px] leading-none text-primary/[0.04] select-none pointer-events-none">{s.num}</div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-lg bg-primary/8 border border-primary/15 flex items-center justify-center">
                          <s.icon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <span className="font-heading font-black text-sm text-primary/30">{s.num}</span>
                          <h3 className="font-heading font-bold text-foreground leading-tight">{s.title}</h3>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════ BENEFITS ═══════ */
function BenefitsSection() {
  const benefits = [
    { icon: Award, text: "25+ lat doświadczenia w reklamie zewnętrznej" },
    { icon: TrendingUp, text: "2500 kampanii reklamowych rocznie" },
    { icon: Globe, text: "Nośniki w całej Polsce - 16 województw" },
    { icon: Layers, text: "Kompleksowa obsługa: projekt → druk → montaż → demontaż" },
    { icon: Camera, text: "Dokumentacja fotograficzna każdej realizacji" },
    { icon: Zap, text: "Wycena i rezerwacja w ciągu 24 godzin" },
  ];
  const { count, ref: cRef } = useCountUp(2500, 2.5);

  return (
    <section className="py-16 md:py-24 relative overflow-hidden" aria-label="Korzyści dla Twojej marki">
      <div className="absolute inset-0 bg-noise" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-6">
            <Reveal from="left">
              <span className="text-xs font-semibold tracking-[0.25em] uppercase text-primary/70 font-heading block mb-3">Dlaczego my</span>
              <h2 className="font-heading font-black text-3xl md:text-4xl text-foreground leading-tight mb-8">Korzyści dla<br />Twojej marki</h2>
            </Reveal>
            <ul className="space-y-2">
              {benefits.map((b, i) => (
                <Reveal key={b.text} delay={i * 0.05} from="left">
                  <motion.li className="flex items-start gap-3 group p-2.5 -ml-2.5 rounded-xl hover:bg-primary/[0.03] transition-colors duration-300 cursor-default"
                    whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}>
                    <div className="w-7 h-7 rounded-md bg-primary/6 border border-primary/12 flex items-center justify-center shrink-0 mt-0.5 group-hover:border-primary/20 group-hover:shadow-[0_0_12px_oklch(0.58_0.24_25/12%)] transition-all duration-300">
                      <b.icon className="w-3.5 h-3.5 text-primary/60" />
                    </div>
                    <span className="text-[15px] text-muted-foreground group-hover:text-foreground transition-colors">{b.text}</span>
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
                  <div className="font-heading font-black text-6xl md:text-7xl text-gradient-brand-bright mb-3 tabular-nums text-glow-red relative" style={{ transform: "translateZ(20px)" }}>{count}+</div>
                  <p className="text-lg text-foreground font-heading font-bold mb-2" style={{ transform: "translateZ(12px)" }}>kampanii rocznie</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6" style={{ transform: "translateZ(8px)" }}>Zaufanie klientów z całej Polski to nasz największy kapitał.</p>
                  <div className="pt-5 border-t border-border/15 grid grid-cols-3 gap-4 text-center">
                    {[{ v: "16", l: "województw" }, { v: "500+", l: "nośników" }, { v: "4", l: "formaty" }].map((s) => (
                      <motion.div key={s.l} whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400 }} style={{ transform: "translateZ(10px)" }}>
                        <div className="font-heading font-bold text-xl text-foreground">{s.v}</div>
                        <div className="text-xs text-muted-foreground">{s.l}</div>
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
          <h2 className="font-heading font-black text-3xl md:text-5xl lg:text-6xl text-foreground mb-6 leading-tight">
            Gotowy na{" "}
            <span className="text-gradient-brand-bright text-glow-red relative inline-block">
              wielki format?
              <motion.span className="absolute -bottom-1.5 left-0 h-0.5 bg-gradient-brand-warm rounded-full"
                initial={{ width: 0 }} whileInView={{ width: "100%" }} viewport={{ once: true }}
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
          <div className="flex items-center justify-center gap-6 mb-8 text-sm text-muted-foreground/60">
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
          <div className="mt-8 text-sm text-muted-foreground/40 flex items-center justify-center gap-2">
            <Phone className="w-4 h-4" /> lub zadzwoń:{" "}
            <a href="tel:+48123456789" className="text-foreground/60 hover:text-primary transition-colors font-medium">+48 123 456 789</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
