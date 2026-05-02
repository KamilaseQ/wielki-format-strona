"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import {
  ArrowRight,
  ArrowDown,
  Printer,
  Wrench,
  Camera,
  Paintbrush,
  FileCheck,
  Truck,
  Clock,
  CheckCircle,
} from "lucide-react";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { Reveal } from "@/components/Reveal";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const flowSteps = [
  {
    icon: Paintbrush,
    num: "01",
    title: "Projekt graficzny",
    desc: "Przygotowujemy projekt plakatu dopasowany do formatu nośnika. Dbamy o czytelność z dystansu i&nbsp;zgodność z&nbsp;Twoim brandem.",
    deliverable: "Plik gotowy do druku",
    eta: "2-3 dni",
    img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=900&auto=format&fit=crop&q=70",
  },
  {
    icon: Printer,
    num: "02",
    title: "Druk wielkoformatowy",
    desc: "Druk UV i&nbsp;solwentowy na materiałach odpornych na warunki atmosferyczne. Kolory wierne projektowi przez cały okres ekspozycji.",
    deliverable: "Wydrukowane plakaty",
    eta: "1-2 dni",
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=900&auto=format&fit=crop&q=70",
  },
  {
    icon: Truck,
    num: "03",
    title: "Logistyka i transport",
    desc: "Zajmiemy się dostarczeniem materiałów na miejsce montażu. Ty nie musisz koordynować nic, co jest poza Twoim biurem.",
    deliverable: "Plakaty na miejscu montażu",
    eta: "1 dzień",
    img: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=900&auto=format&fit=crop&q=70",
  },
  {
    icon: Wrench,
    num: "04",
    title: "Montaż na nośniku",
    desc: "Sprawny, profesjonalny montaż przez nasze ekipy w&nbsp;województwie mazowieckim. Realizujemy montaże terminowo i&nbsp;bez chaosu.",
    deliverable: "Aktywna kampania",
    eta: "1-3 dni",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=900&auto=format&fit=crop&q=70",
  },
  {
    icon: Camera,
    num: "05",
    title: "Dokumentacja fotograficzna",
    desc: "Po montażu wysyłamy automatycznie zdjęcia każdego nośnika z&nbsp;Twoją reklamą - potwierdzenie realizacji prosto do skrzynki.",
    deliverable: "Raport foto w mailu",
    eta: "auto",
    img: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=900&auto=format&fit=crop&q=70",
  },
  {
    icon: FileCheck,
    num: "06",
    title: "Demontaż i zaklejenie",
    desc: "Po zakończeniu kampanii demontujemy plakat i&nbsp;zaklejamy nośnik na czysto. Wszystko w&nbsp;ramach usługi - bez doliczanych opłat.",
    deliverable: "Czysty nośnik, zamknięta kampania",
    eta: "1-2 dni",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&auto=format&fit=crop&q=70",
  },
];

export default function CampaignServicePage() {
  return (
    <>
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920&auto=format&fit=crop&q=60"
            alt="Profesjonalny druk wielkoformatowy - obsługa kampanii"
            fill
            sizes="100vw"
            priority
            className="object-cover opacity-12"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background" />
        </div>
        <div className="absolute inset-0 bg-noise" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Reveal>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-primary text-[11px] font-semibold tracking-[0.2em] uppercase mb-6">
                Kompleksowa obsługa
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="font-heading font-black text-4xl md:text-5xl text-foreground leading-tight mb-6">
                Cały proces <span className="text-gradient-brand-bright text-glow-red">po naszej stronie</span>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                Nie musisz koordynować projektu, druku, transportu i montażu osobno.
                Obsłużymy Twoją kampanię od A do Z - szybko, sprawnie i bez komplikacji.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Process flow - rich, alternating, with arrows */}
      <section className="py-16 md:py-24 relative overflow-hidden" aria-label="Cały proces krok po kroku">
        <div className="absolute inset-0 bg-noise" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <Reveal>
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-primary/70 font-heading block text-center mb-3">
              Cały proces
            </span>
            <h2 className="font-heading font-black text-3xl md:text-4xl lg:text-5xl text-foreground text-center mb-4 leading-[1.1] tracking-tight">
              6 etapów -<br />
              <span className="text-gradient-brand-bright text-glow-red inline-block pr-2 pb-1">jeden partner.</span>
            </h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-16">
              Od pierwszego briefa po zaklejony nośnik - prowadzimy Cię przez każdy etap.
              Bez koordynacji wielu wykonawców, bez gubienia się w&nbsp;mailach.
            </p>
          </Reveal>

          {/* Vertical pipeline with horizontal arrows on desktop */}
          <div className="relative">
            {/* Center vertical line */}
            <div
              className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-px w-0.5 bg-border/30"
              aria-hidden="true"
            >
              <motion.div
                className="w-full bg-gradient-to-b from-primary/60 via-primary to-primary/60 rounded-full"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 2.5, ease, delay: 0.1 }}
                style={{ transformOrigin: "top" }}
              />
            </div>

            <div className="space-y-12 md:space-y-20">
              {flowSteps.map((s, i) => {
                const isRight = i % 2 === 1;
                return (
                  <FlowRow
                    key={s.num}
                    step={s}
                    index={i}
                    isRight={isRight}
                    isLast={i === flowSteps.length - 1}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-surface border-y border-border/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { val: "2500+", label: "kampanii rocznie" },
              { val: "1400+", label: "nośników w mazowieckim" },
              { val: "24h", label: "czas odpowiedzi" },
              { val: "100%", label: "dokumentacja foto" },
            ].map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <div className="text-center">
                  <div className="font-heading font-black text-2xl md:text-3xl text-gradient-brand-bright">{s.val}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative">
          <Reveal>
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-primary/70 font-heading block mb-3 text-center">Efekt</span>
            <h2 className="font-heading font-black text-3xl md:text-4xl text-foreground text-center mb-4 leading-tight">Przed i po montażu</h2>
            <p className="text-center text-muted-foreground mb-10 max-w-md mx-auto">Przeciągnij suwak, aby zobaczyć różnicę.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <BeforeAfterSlider
              beforeImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&auto=format&fit=crop&q=70&sat=-100"
              afterImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&auto=format&fit=crop&q=70"
              beforeLabel="Pusty nośnik"
              afterLabel="Z reklamą"
              beforeAlt="Nośnik reklamowy przed montażem plakatu"
              afterAlt="Nośnik reklamowy po montażu plakatu z reklamą"
            />
          </Reveal>
        </div>
      </section>

      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-noise" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-primary/6 rounded-full blur-[150px] animate-glow-pulse" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="font-heading font-black text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 leading-[1.18] tracking-tight">
              Zleć nam <span className="text-gradient-brand-bright text-glow-red inline-block pr-2 pb-1">całą kampanię</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg text-muted-foreground mb-8">
              Od projektu po dokumentację fotograficzną. Ty podejmiesz decyzję - my zajmiemy się resztą.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="flex items-center justify-center gap-6 mb-8 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-primary" /> Wszystko w cenie</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary" /> Terminowo</span>
              <span className="flex items-center gap-1.5"><Camera className="w-4 h-4 text-primary" /> Z dokumentacją</span>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <Link href="/kontakt">
              <Button variant="hero" size="xl" className="group glow-red relative overflow-hidden min-h-[44px]">
                <span className="relative z-10 flex items-center gap-2">
                  Zapytaj o kompleksową obsługę
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

type FlowStep = (typeof flowSteps)[number];

function FlowRow({
  step,
  index,
  isRight,
  isLast,
}: {
  step: FlowStep;
  index: number;
  isRight: boolean;
  isLast: boolean;
}) {
  const Icon = step.icon;
  return (
    <div className="relative">
      {/* Center node (visible on md+) */}
      <motion.div
        className="hidden md:flex absolute left-1/2 top-8 -translate-x-1/2 z-20 items-center justify-center"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.45, delay: 0.1, type: "spring", stiffness: 280, damping: 22 }}
      >
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-primary/20 blur-md scale-125 animate-glow-pulse" />
          <div className="relative w-16 h-16 rounded-full bg-card border-2 border-primary flex items-center justify-center shadow-[0_0_28px_oklch(0.58_0.24_25/35%)]">
            <span className="font-heading font-black text-lg text-primary tabular-nums">{step.num}</span>
          </div>
        </div>
      </motion.div>

      <div className={`md:grid md:grid-cols-2 md:gap-12 lg:gap-16 items-center ${isRight ? "" : ""}`}>
        {/* Image side */}
        <motion.div
          className={`relative rounded-2xl overflow-hidden aspect-[16/10] glass-card group ${
            isRight ? "md:order-2" : ""
          }`}
          initial={{ opacity: 0, x: isRight ? 30 : -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, delay: 0.05, ease }}
        >
          <Image
            src={step.img}
            alt={`${step.title} - etap obsługi kampanii reklamowej`}
            width={900}
            height={563}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/20 to-transparent" />
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <span className="px-3 py-1.5 rounded-lg bg-card/95 backdrop-blur-md border border-border text-[11px] font-heading font-bold text-primary uppercase tracking-[0.18em] flex items-center gap-1.5">
              <Icon className="w-3.5 h-3.5" />
              Krok {step.num}
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-card/95 backdrop-blur-md border border-border text-[11px] font-heading font-bold text-foreground flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-primary" />
              {step.eta}
            </span>
          </div>
        </motion.div>

        {/* Content side */}
        <motion.div
          className={`mt-5 md:mt-0 ${isRight ? "md:order-1 md:text-right md:pr-8 lg:pr-16" : "md:pl-8 lg:pl-16"}`}
          initial={{ opacity: 0, x: isRight ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, delay: 0.15, ease }}
        >
          <h3 className="font-heading font-black text-2xl md:text-3xl text-foreground mb-3 leading-tight tracking-tight">
            {step.title}
          </h3>
          <p
            className="text-base md:text-lg text-muted-foreground leading-relaxed mb-5"
            dangerouslySetInnerHTML={{ __html: step.desc }}
          />
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 ${
              isRight ? "md:flex-row-reverse" : ""
            }`}
          >
            <CheckCircle className="w-4 h-4 text-primary shrink-0" />
            <span className="text-sm font-heading font-semibold text-foreground">
              {step.deliverable}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Connector arrow to next step */}
      {!isLast && (
        <div className="flex justify-center mt-8 md:mt-10" aria-hidden="true">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
            className="w-10 h-10 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center"
          >
            <ArrowDown className="w-4 h-4 text-primary" />
          </motion.div>
        </div>
      )}
    </div>
  );
}
