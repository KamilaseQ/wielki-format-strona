"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Camera, X, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";

export type GalleryItem = {
  src: string;
  title: string;
  location?: string;
};

interface GaleriaPageProps {
  items: GalleryItem[];
}

export default function GaleriaPage({ items }: GaleriaPageProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const close = () => setLightboxIndex(null);
  const next = () =>
    setLightboxIndex((current) =>
      current === null ? null : (current + 1) % items.length
    );
  const prev = () =>
    setLightboxIndex((current) =>
      current === null ? null : (current - 1 + items.length) % items.length
    );

  return (
    <>
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-noise" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-primary/6 rounded-full blur-[150px] animate-glow-pulse" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Reveal>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-primary text-[11px] font-semibold tracking-[0.2em] uppercase mb-6">
                <Camera className="w-3.5 h-3.5" /> Nasze realizacje
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-6 tracking-tight">
                Galeria{" "}
                <span className="text-gradient-brand-bright text-glow-red">realizacji</span>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                Wybór nośników z naszego portfolio - billboardy, citylighty
                i powierzchnie wielkoformatowe w województwie mazowieckim.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-24 relative overflow-hidden" aria-label="Galeria zrealizowanych nośników">
        <div className="absolute inset-0 bg-noise" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map((item, i) => (
              <Reveal key={item.src} delay={(i % 6) * 0.05} from="bottom">
                <button
                  type="button"
                  onClick={() => setLightboxIndex(i)}
                  className="group relative block w-full overflow-hidden rounded-2xl glass-card aspect-[4/3] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                  aria-label={`Powiększ zdjęcie: ${item.title}`}
                >
                  <Image
                    src={item.src}
                    alt={`Realizacja nośnika reklamowego: ${item.title}`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 inset-x-0 p-4">
                    <p className="font-heading font-bold text-sm md:text-base text-foreground leading-tight line-clamp-2">
                      {item.title}
                    </p>
                    {item.location && (
                      <p className="mt-1 text-xs text-muted-foreground line-clamp-1">
                        {item.location}
                      </p>
                    )}
                  </div>
                </button>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-16 text-center">
              <p className="text-muted-foreground mb-6">
                Chcesz zobaczyć nośnik z bliska albo sprawdzić dostępność?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/nosniki">
                  <Button variant="hero" size="lg" className="group glow-red min-h-[44px]">
                    Mapa nośników
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/kontakt">
                  <Button variant="heroOutline" size="lg" className="min-h-[44px]">
                    Zapytaj o wycenę
                  </Button>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/95 backdrop-blur-md p-4"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Podgląd zdjęcia"
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
              className="absolute top-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-card/95 text-foreground hover:text-primary"
              aria-label="Zamknij podgląd"
            >
              <X className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card/95 text-foreground hover:text-primary"
              aria-label="Poprzednie zdjęcie"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card/95 text-foreground hover:text-primary"
              aria-label="Następne zdjęcie"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-6xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-black">
                <Image
                  src={items[lightboxIndex].src}
                  alt={items[lightboxIndex].title}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </div>
              <div className="mt-3 text-center">
                <p className="font-heading font-bold text-base md:text-lg text-foreground">
                  {items[lightboxIndex].title}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {lightboxIndex + 1} / {items.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
