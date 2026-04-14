"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { ArrowRight, Printer, Wrench, Camera, Paintbrush, FileCheck, Truck, Star, Shield, Clock, CheckCircle } from "lucide-react";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { Reveal } from "@/components/Reveal";

const services = [
  { icon: Paintbrush, num: "01", title: "Projekt graficzny", desc: "Przygotujemy projekt plakatu dostosowany do formatu nośnika. Zadbamy o czytelność, kompozycję i zgodność z Twoim brandem.", img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&auto=format&fit=crop&q=60" },
  { icon: Printer, num: "02", title: "Druk wielkoformatowy", desc: "Profesjonalny druk na materiałach odpornych na warunki atmosferyczne. Najwyższa jakość kolorów i trwałość.", img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&auto=format&fit=crop&q=60" },
  { icon: Truck, num: "03", title: "Logistyka i transport", desc: "Zajmiemy się dostarczeniem materiałów na miejsce montażu - bez Twojego udziału.", img: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=500&auto=format&fit=crop&q=60" },
  { icon: Wrench, num: "04", title: "Montaż", desc: "Sprawny montaż plakatów na nośnikach. Realizujemy montaże terminowo, na terenie całej Polski.", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&auto=format&fit=crop&q=60" },
  { icon: FileCheck, num: "05", title: "Demontaż i zaklejenie", desc: "Po zakończeniu kampanii demontujemy plakat i zaklejamy nośnik. Wszystko w ramach usługi.", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&auto=format&fit=crop&q=60" },
  { icon: Camera, num: "06", title: "Dokumentacja fotograficzna", desc: "Po montażu otrzymasz zdjęcia każdego nośnika z Twoją reklamą - potwierdzenie realizacji.", img: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=500&auto=format&fit=crop&q=60" },
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

      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.06}>
                <motion.div
                  className="group rounded-2xl bg-card/30 border border-border/30 overflow-hidden hover:border-primary/20 transition-all duration-500 cursor-default h-full"
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={s.img}
                      alt={`${s.title} - etap obsługi kampanii reklamowej`}
                      width={500}
                      height={300}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                    <span className="absolute top-3 left-3 px-2 py-0.5 rounded glass text-[10px] font-heading font-bold text-primary uppercase tracking-wider">{s.num}</span>
                  </div>

                  <div className="p-5">
                    <div className="w-10 h-10 rounded-lg bg-primary/6 border border-primary/12 flex items-center justify-center mb-4 group-hover:border-primary/25 group-hover:shadow-[0_0_15px_oklch(0.58_0.24_25/10%)] transition-all duration-500">
                      <s.icon className="w-5 h-5 text-primary/60" />
                    </div>
                    <h3 className="font-heading font-bold text-foreground mb-2">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-surface border-y border-border/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { val: "2500+", label: "kampanii rocznie" },
              { val: "16", label: "województw" },
              { val: "24h", label: "czas odpowiedzi" },
              { val: "100%", label: "dokumentacja foto" },
            ].map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <div className="text-center">
                  <div className="font-heading font-black text-2xl md:text-3xl text-gradient-brand-bright">{s.val}</div>
                  <div className="text-xs text-muted-foreground/50 mt-1">{s.label}</div>
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
            <h2 className="font-heading font-black text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 leading-tight">
              Zleć nam <span className="text-gradient-brand-bright text-glow-red">całą kampanię</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg text-muted-foreground mb-8">
              Od projektu po dokumentację fotograficzną. Ty podejmiesz decyzję - my zajmiemy się resztą.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="flex items-center justify-center gap-6 mb-8 text-sm text-muted-foreground/60">
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-primary/40" /> Wszystko w cenie</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary/40" /> Terminowo</span>
              <span className="flex items-center gap-1.5"><Camera className="w-4 h-4 text-primary/40" /> Z dokumentacją</span>
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
