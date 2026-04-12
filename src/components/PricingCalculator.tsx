import { useState } from "react";
import { motion } from "motion/react";
import { Calculator, MapPin, Calendar, Maximize2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

const formats = [
  { name: "Super 12", area: "12 m²", base: 800 },
  { name: "Super 18", area: "18 m²", base: 1200 },
  { name: "Super 36", area: "36 m²", base: 2200 },
  { name: "Monster XXL", area: "72 m²", base: 4500 },
];

const cities = [
  { name: "Warszawa", mult: 1.5 },
  { name: "Kraków", mult: 1.3 },
  { name: "Wrocław", mult: 1.2 },
  { name: "Poznań", mult: 1.15 },
  { name: "Gdańsk", mult: 1.2 },
  { name: "Katowice", mult: 1.1 },
  { name: "Łódź", mult: 1.0 },
  { name: "Inne", mult: 0.9 },
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
          <div className="w-10 h-10 rounded-xl bg-primary/8 border border-primary/15 flex items-center justify-center">
            <Calculator className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-foreground">Kalkulator wyceny</h3>
            <p className="text-xs text-muted-foreground/50">Orientacyjna cena kampanii</p>
          </div>
        </div>

        <div className="space-y-5">
          {/* Format */}
          <div>
            <label className="text-xs font-heading font-semibold text-muted-foreground/70 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Maximize2 className="w-3 h-3" /> Format nośnika
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {formats.map((f, i) => (
                <button
                  key={f.name}
                  onClick={() => setFormatIdx(i)}
                  className={`px-3 py-2.5 rounded-lg text-xs font-heading font-semibold transition-all cursor-pointer ${
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
            <label className="text-xs font-heading font-semibold text-muted-foreground/70 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <MapPin className="w-3 h-3" /> Miasto
            </label>
            <div className="grid grid-cols-4 gap-2">
              {cities.map((c, i) => (
                <button
                  key={c.name}
                  onClick={() => setCityIdx(i)}
                  className={`px-2 py-2 rounded-lg text-xs font-heading font-medium transition-all cursor-pointer ${
                    i === cityIdx
                      ? "bg-primary/15 border border-primary/30 text-primary"
                      : "bg-card/30 border border-border/30 text-muted-foreground hover:border-border/50"
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* Period */}
          <div>
            <label className="text-xs font-heading font-semibold text-muted-foreground/70 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Calendar className="w-3 h-3" /> Okres wynajmu
            </label>
            <div className="flex flex-wrap gap-2">
              {periods.map((p, i) => (
                <button
                  key={p.name}
                  onClick={() => setPeriodIdx(i)}
                  className={`px-3 py-2 rounded-lg text-xs font-heading font-medium transition-all cursor-pointer ${
                    i === periodIdx
                      ? "bg-primary/15 border border-primary/30 text-primary"
                      : "bg-card/30 border border-border/30 text-muted-foreground hover:border-border/50"
                  }`}
                >
                  {p.name}
                  {p.discount < 1 && (
                    <span className="ml-1 text-[9px] text-emerald-400">-{Math.round((1 - p.discount) * 100)}%</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Count */}
          <div>
            <label className="text-xs font-heading font-semibold text-muted-foreground/70 uppercase tracking-wider mb-2 block">
              Liczba nośników
            </label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={1}
                max={50}
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className="flex-1 h-1.5 rounded-full appearance-none bg-border/30 accent-primary cursor-pointer"
              />
              <span className="font-heading font-bold text-foreground text-lg w-10 text-right tabular-nums">{count}</span>
            </div>
          </div>
        </div>

        {/* Result */}
        <motion.div
          key={`${formatIdx}-${cityIdx}-${periodIdx}-${count}`}
          initial={{ opacity: 0.5, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 p-5 rounded-xl bg-card/40 border border-primary/10"
        >
          <div className="flex items-end justify-between mb-3">
            <div>
              <div className="text-xs text-muted-foreground/50 mb-1">Orientacyjna cena</div>
              <div className="font-heading font-black text-3xl md:text-4xl text-gradient-brand-bright tabular-nums">
                {totalPrice.toLocaleString("pl")} zł
              </div>
            </div>
            <div className="text-right">
              <div className="text-[11px] text-muted-foreground/40">netto / okres</div>
              <div className="text-xs text-muted-foreground/50">
                {pricePerUnit.toLocaleString("pl")} zł / nośnik / 2 tyg.
              </div>
            </div>
          </div>
          <p className="text-[11px] text-muted-foreground/30 mb-4">
            * Ceny orientacyjne. Ostateczna wycena zależy od konkretnej lokalizacji i dostępności.
          </p>
          <Link to="/kontakt">
            <Button variant="cta" className="w-full group">
              Poproś o dokładną wycenę
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
