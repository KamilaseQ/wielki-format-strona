"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Camera, X, ArrowRight, ChevronLeft, ChevronRight, Plus } from "lucide-react";
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

const PAGE_SIZE = 12;

export default function GaleriaPage({ items }: GaleriaPageProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const visibleItems = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;

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

      <section className="pb-12 md:pb-16 relative overflow-hidden" aria-label="Galeria zrealizowanych nośników">
        <div className="absolute inset-0 bg-noise" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {visibleItems.map((item, i) => (
              <figure key={item.src} className="flex flex-col">
                <button
                  type="button"
                  onClick={() => setLightboxIndex(i)}
                  className="group relative block w-full overflow-hidden rounded-2xl bg-card/40 border border-border/40 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 hover:border-primary/30 transition-colors"
                  style={{ aspectRatio: "4 / 3" }}
                  aria-label={`Powiększ zdjęcie: ${item.title}`}
                >
                  {/* Plain <img> on purpose: iOS Chrome/Safari had issues with
                      next/image optimizer on URLs containing encoded spaces/commas
                      from the /public/Z filenames. Native lazy-loading + explicit
                      aspect-ratio is the most boring, reliable path. */}
                  <img
                    src={item.src}
                    alt={`Realizacja nośnika reklamowego: ${item.title}`}
                    loading={i < 3 ? "eager" : "lazy"}
                    decoding="async"
                    fetchPriority={i < 3 ? "high" : "auto"}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </button>
                <figcaption className="mt-3 px-1">
                  <p className="font-heading font-bold text-sm md:text-base text-foreground leading-snug">
                    {item.title}
                  </p>
                  {item.location && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      {item.location}
                    </p>
                  )}
                </figcaption>
              </figure>
            ))}
          </div>

          {hasMore && (
            <div className="mt-12 md:mt-16 flex flex-col items-center gap-3">
              <p className="text-xs text-muted-foreground">
                Pokazano {visibleItems.length} z {items.length} realizacji
              </p>
              <Button
                variant="heroOutline"
                size="lg"
                onClick={() => setVisibleCount((c) => Math.min(c + PAGE_SIZE, items.length))}
                className="group min-h-[44px]"
              >
                <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
                Załaduj więcej
              </Button>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 md:py-28 border-t border-border/30 relative overflow-hidden" aria-label="Zapytaj o nośnik">
        <div className="absolute inset-0 bg-noise" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center">
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
              <div
                className="relative w-full rounded-xl overflow-hidden bg-black"
                style={{ aspectRatio: "16 / 10" }}
              >
                <img
                  src={items[lightboxIndex].src}
                  alt={items[lightboxIndex].title}
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-contain"
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
