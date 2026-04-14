"use client";

import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { LeadForm } from "@/components/LeadForm";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, Shield, Star, CheckCircle } from "lucide-react";
import { motion } from "motion/react";

export default function ContactPage() {
  return (
    <>
      {/* Hero with image */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&auto=format&fit=crop&q=60"
            alt="Biurowiec w centrum miasta - kontakt z firmą"
            fill
            sizes="100vw"
            className="object-cover opacity-10"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background" />
        </div>
        <div className="absolute inset-0 bg-noise" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Info */}
            <div>
              <Reveal>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-primary text-[11px] font-semibold tracking-[0.2em] uppercase mb-6">
                  Kontakt
                </span>
              </Reveal>
              <Reveal delay={0.08}>
                <h1 className="font-heading font-black text-4xl md:text-5xl text-foreground leading-tight mb-6">
                  Porozmawiajmy o <span className="text-gradient-brand-bright text-glow-red">Twojej kampanii</span>
                </h1>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                  Wyślij zapytanie przez formularz lub skontaktuj się bezpośrednio. Odpowiadamy na każde zapytanie w ciągu 24 godzin.
                </p>
              </Reveal>

              <div className="space-y-5">
                {[
                  { icon: Phone, label: "Telefon", value: "600 13 10 13", href: "tel:+48600131013" },
                  { icon: Mail, label: "E-mail", value: "info@wielkiformat.pl", href: "mailto:info@wielkiformat.pl" },
                  { icon: MapPin, label: "Adres", value: "Al. Józefa Piłsudskiego 55A, Marki" },
                  { icon: Clock, label: "Godziny pracy", value: "Pon-Pt: 8:00-17:00" },
                ].map((item, i) => (
                  <Reveal key={item.label} delay={i * 0.06} from="left">
                    <motion.div
                      className="flex items-start gap-4 group p-3 -ml-3 rounded-xl hover:bg-primary/[0.03] transition-colors duration-300"
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <div className="w-11 h-11 rounded-xl bg-primary/6 border border-primary/12 flex items-center justify-center shrink-0 group-hover:border-primary/25 group-hover:shadow-[0_0_15px_oklch(0.58_0.24_25/10%)] transition-all duration-500">
                        <item.icon className="w-5 h-5 text-primary/60" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground/50 mb-0.5">{item.label}</div>
                        {"href" in item && item.href ? (
                          <a href={item.href} className="text-foreground font-medium hover:text-primary transition-colors" aria-label={`${item.label}: ${item.value}`}>{item.value}</a>
                        ) : (
                          <div className="text-foreground font-medium">{item.value}</div>
                        )}
                      </div>
                    </motion.div>
                  </Reveal>
                ))}
              </div>

              {/* Trust badges */}
              <Reveal delay={0.3}>
                <div className="mt-8 flex flex-wrap gap-4 text-xs text-muted-foreground/50">
                  <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-primary/40" /> Bez zobowiązań</span>
                  <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-primary/40" /> Odpowiedź w 24h</span>
                  <span className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5 text-amber-400/50" /> 4.9/5 od klientów</span>
                </div>
              </Reveal>

              {/* Company info */}
              <Reveal delay={0.35} from="left">
                <div className="mt-8 p-5 rounded-xl glass-card">
                  <h3 className="font-heading font-bold text-foreground text-sm mb-2">Dane firmowe</h3>
                  <div className="text-sm text-muted-foreground/70 space-y-1">
                    <p className="font-medium text-muted-foreground">Billboard Sp. z o.o.</p>
                    <p>Al. Marszałka Józefa Piłsudskiego 55A, 05-270 Marki</p>
                    <p>NIP: 5322051052 | REGON: 361032049</p>
                    <p>KRS: 0000547439</p>
                    <p className="pt-2">Bank PKO BP S.A.:</p>
                    <p>17 1020 1127 0000 1102 0248 2073</p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Form */}
            <Reveal from="right" delay={0.1}>
              <LeadForm />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Map embed */}
      <section className="py-16 md:py-24 bg-surface border-t border-border/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <Reveal>
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-primary/70 font-heading block mb-3 text-center">Lokalizacja</span>
            <h2 className="font-heading font-black text-3xl md:text-4xl text-foreground text-center mb-10 leading-tight">Gdzie nas znajdziesz</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-2xl overflow-hidden border border-border/40 aspect-[16/7] relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2443.5!2d21.01!3d52.23!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTLCsDEzJzQ4LjAiTiAyMcKwMDAnMzYuMCJF!5e0!3m2!1spl!2spl!4v1"
                className="w-full h-full border-0 grayscale contrast-125 opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokalizacja biura Billboard Sp. z o.o. na mapie Google"
              />
              <div className="absolute inset-0 pointer-events-none border border-border/20 rounded-2xl" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA - different than homepage (point 18) */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-noise" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-primary/6 rounded-full blur-[150px] animate-glow-pulse" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="font-heading font-black text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 leading-tight">
              Wycena <span className="text-gradient-brand-bright text-glow-red">w 24 godziny</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg text-muted-foreground mb-8">
              Wyślij zapytanie - oddzwonimy lub odpiszemy jeszcze tego samego dnia.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <a href="tel:+48123456789" aria-label="Zadzwoń: +48 123 456 789">
              <Button variant="hero" size="xl" className="group glow-red relative overflow-hidden min-h-[44px]">
                <span className="relative z-10 flex items-center gap-2">
                  <Phone className="w-5 h-5" /> Zadzwoń teraz
                </span>
              </Button>
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
