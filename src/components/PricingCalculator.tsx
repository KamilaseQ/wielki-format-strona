"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Calculator, MapPin, Calendar, Maximize2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const formats = [
  { name: "Super 12", area: "12 m²", base: 700 },
  { name: "Super 18", area: "18 m²", base: 1000 },
  { name: "Super 36", area: "36 m²", base: 1900 },
  { name: "Monster XXL", area: "72 m²", base: 3800 },
];

// Województwo mazowieckie - kluczowe lokalizacje
const cities = [
  { name: "Warszawa", mult: 1.5 },
  { name: "Aglomeracja", mult: 1.2 },
  { name: "Płock", mult: 1.0 },
  { name: "Radom", mult: 1.0 },
  { name: "Siedlce", mult: 0.95 },
  { name: "Inne mazowieckie", mult: 0.9 },
];

const periods = [
  { name: "2 tygodnie", weeks: 2, discount: 1.0 },
  { name: "1 miesiąc", weeks: 4, discount: 0.9 },
  { name: "3 miesiące", weeks: 12, discount: 0.8 },
  { name: "6 miesięcy", weeks: 24, discount: 0.7 },
  { name: "12 miesięcy", weeks: 48, discount: 0.6 },
];

export function PricingCalculator() {
  const [formatIdx, setFormatIdx] = useState(1);
  const [cityIdx, setCityIdx] = useState(0);
  const [periodIdx, setPeriodIdx] = useState(1);
  const [count, setCount] = useState(1);

  const format = formats[formatIdx];
  const city = cities[cityIdx];
  const period = periods[periodIdx];

  const pricePerUnit = Math.round(format.base * city.mult * period.discount);
  const totalPrice = pricePerUnit * count * (period.weeks / 2);

  return (
    <div
      className="rounded-2xl glass-card p-6 md:p-8 relative overflow-hidden aurora-hover"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      }}
    >
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/8 rounded-full blur-[60px]" />
      <div className="relative">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Calculator className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-base text-foreground">Szacowanie ceny kampanii</h3>
            <p className="text-xs text-muted-foreground">Orientacyjnie, bez zobowiązań · Mazowsze</p>
          </div>
        </div>

        <div className="space-y-5">
          {/* Format */}
          <div>
            <label htmlFor="format-selector" className="text-[11px] font-heading font-semibold text-muted-foreground uppercase tracking-[0.18em] mb-2 flex items-center gap-1.5">
              <Maximize2 className="w-3 h-3" /> Format nośnika
            </label>
            <div id="format-selector" role="group" aria-label="Wybierz format nośnika" className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {formats.map((f, i) => (
                <button
                  key={f.name}
                  type="button"
                  onClick={() => setFormatIdx(i)}
                  aria-pressed={i === formatIdx}
                  className={`px-3 py-2.5 rounded-lg text-xs font-heading font-semibold transition-all cursor-pointer min-h-[44px] ${
                    i === formatIdx
                      ? "bg-primary/15 border border-primary/30 text-primary"
                      : "bg-card/30 border border-border/30 text-muted-foreground hover:border-border/50"
                  }`}
                >
                  <div>{f.name}</div>
                  <div className="text-[10px] opacity-60 mt-0.5">{f.area}</div>
                </button>
              ))}
            </div>
          </div>

          {/* City */}
          <div>
            <label htmlFor="city-selector" className="text-[11px] font-heading font-semibold text-muted-foreground uppercase tracking-[0.18em] mb-2 flex items-center gap-1.5">
              <MapPin className="w-3 h-3" /> Lokalizacja (woj. mazowieckie)
            </label>
            <div id="city-selector" role="group" aria-label="Wybierz lokalizację w mazowieckim" className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {cities.map((c, i) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setCityIdx(i)}
                  aria-pressed={i === cityIdx}
                  className={`px-3 py-2.5 rounded-lg text-sm font-heading font-medium transition-all cursor-pointer min-h-[44px] ${
                    i === cityIdx
                      ? "bg-primary/15 border border-primary/30 text-primary"
                      : "bg-card/30 border border-border/30 text-muted-foreground hover:border-border/50 hover:text-foreground"
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* Period */}
          <div>
            <label htmlFor="period-selector" className="text-[11px] font-heading font-semibold text-muted-foreground uppercase tracking-[0.18em] mb-2 flex items-center gap-1.5">
              <Calendar className="w-3 h-3" /> Okres wynajmu
            </label>
            <div id="period-selector" role="group" aria-label="Wybierz okres wynajmu" className="flex flex-wrap gap-2">
              {periods.map((p, i) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => setPeriodIdx(i)}
                  aria-pressed={i === periodIdx}
                  className={`px-3.5 py-2.5 rounded-lg text-sm font-heading font-medium transition-all cursor-pointer min-h-[44px] ${
                    i === periodIdx
                      ? "bg-primary/15 border border-primary/30 text-primary"
                      : "bg-card/30 border border-border/30 text-muted-foreground hover:border-border/50 hover:text-foreground"
                  }`}
                >
                  {p.name}
                  {p.discount < 1 && (
                    <span className="ml-1.5 text-[10px] text-emerald-400">-{Math.round((1 - p.discount) * 100)}%</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Count */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="carrier-count" className="text-[11px] font-heading font-semibold text-muted-foreground uppercase tracking-[0.18em]">
                Liczba nośników
              </label>
              <span className="text-[11px] text-muted-foreground">jeden wystarczy do startu</span>
            </div>
            <div className="flex items-center gap-3">
              <input
                id="carrier-count"
                type="range"
                min={1}
                max={50}
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className="flex-1 h-2 rounded-full appearance-none bg-border/40 accent-primary cursor-pointer"
                aria-valuemin={1}
                aria-valuemax={50}
                aria-valuenow={count}
              />
              <span className="font-heading font-bold text-foreground text-2xl w-12 text-right tabular-nums">{count}</span>
            </div>
          </div>
        </div>

        {/* Result */}
        <motion.div
          key={`${formatIdx}-${cityIdx}-${periodIdx}-${count}`}
          initial={{ opacity: 0.5, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 p-5 rounded-xl bg-card/40 border border-primary/15"
        >
          <div className="flex items-end justify-between mb-3 gap-3 flex-wrap">
            <div>
              <div className="text-xs text-muted-foreground mb-1">Szacunkowa cena całej kampanii</div>
              <div className="font-heading font-black text-3xl md:text-4xl text-gradient-brand-bright tabular-nums">
                {totalPrice.toLocaleString("pl")} zł
              </div>
            </div>
            <div className="text-right">
              <div className="text-[11px] text-muted-foreground">netto / cały okres</div>
              <div className="text-xs text-muted-foreground">
                {pricePerUnit.toLocaleString("pl")} zł / nośnik / 2 tyg.
              </div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mb-4">
            * Wycena orientacyjna - bez zobowiązań. Faktyczna cena zależy od konkretnej lokalizacji i&nbsp;dostępności w&nbsp;mazowieckim.
          </p>
          <Link href="/kontakt">
            <Button variant="cta" className="w-full group min-h-[44px]">
              Sprawdź dokładną cenę dla Twojej kampanii
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
