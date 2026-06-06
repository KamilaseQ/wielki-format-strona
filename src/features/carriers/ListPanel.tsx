"use client";

import { motion } from "motion/react";
import { Car, ChevronRight, MapPin, Ruler, Search } from "lucide-react";
import { CarrierImage } from "@/features/carriers/CarrierImage";
import type { Carrier } from "@/features/carriers/data";
import { AVAILABILITY_CFG, TYPE_CFG } from "@/features/carriers/data";

interface ListPanelProps {
  carriers: Carrier[];
  totalCount: number;
  hasMore: boolean;
  onLoadMore: () => void;
  onSelect: (carrier: Carrier) => void;
  subtitle: string;
  selectedId?: string | null;
  compact?: boolean;
  flow?: boolean;
  showHeader?: boolean;
}

export function ListPanel({
  carriers,
  totalCount,
  hasMore,
  onLoadMore,
  onSelect,
  subtitle,
  selectedId,
  compact = false,
  flow = false,
  showHeader = true,
}: ListPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={flow ? "flex min-h-0 flex-col" : "flex h-full min-h-0 flex-col"}
    >
      {showHeader && (
        <div className="shrink-0 border-b border-border px-4 py-3">
          <h2 className="font-heading text-base font-bold text-foreground">
            Lista nośników
          </h2>
          <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>
        </div>
      )}

      <div className={`${flow ? "space-y-2 p-3 pb-[calc(1rem+env(safe-area-inset-bottom))]" : "min-h-0 flex-1 space-y-2 overflow-y-auto overscroll-contain p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]"}`}>
        {carriers.map((carrier, index) => {
          const cfg = TYPE_CFG[carrier.type];
          const availability = AVAILABILITY_CFG[carrier.availability];
          const selected = selectedId === carrier.id;

          return (
            <motion.button
              key={carrier.id}
              type="button"
              onClick={() => onSelect(carrier)}
              aria-pressed={selected}
              className={`group relative grid w-full min-h-[44px] gap-3 rounded-lg border text-left transition-all cursor-pointer ${
                compact ? "grid-cols-[74px_minmax(0,1fr)] p-2 pr-8" : "grid-cols-[92px_minmax(0,1fr)] p-2.5 pr-8"
              } ${
                selected
                  ? "border-primary/55 bg-primary/10 shadow-[0_0_0_1px_var(--brand-glow)]"
                  : "border-border bg-card hover:border-primary/35 hover:bg-secondary/35"
              }`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(index * 0.025, 0.2) }}
            >
              <CarrierImage
                carrier={carrier}
                compact
                className={`h-full rounded-md border border-border/70 ${compact ? "min-h-[72px]" : "min-h-[82px]"}`}
              />

              <div className="min-w-0 self-center">
                <div className="mb-1 flex min-w-0 items-center gap-2">
                  <span className="truncate font-heading text-sm font-bold text-foreground">
                    {carrier.code}
                  </span>
                  <span className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ${availability.pill}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${availability.dot}`} />
                    {availability.label}
                  </span>
                </div>

                <div className="flex min-w-0 items-center gap-1.5 text-sm font-semibold text-foreground">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" />
                  <span className="truncate">{carrier.city}</span>
                </div>
                <div className="mt-0.5 truncate text-xs text-muted-foreground">
                  {carrier.address}
                </div>

                <div className="mt-2 flex items-end justify-between gap-2">
                  <div className="flex min-w-0 flex-wrap items-center gap-1.5">
                  <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ${cfg.pill}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
                    {cfg.label}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-secondary/70 px-2 py-0.5 text-[10px] font-medium text-muted-foreground ring-1 ring-border">
                    <Ruler className="h-3 w-3" />
                    {carrier.format}
                  </span>
                  {carrier.trafficEstimate && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-foreground ring-1 ring-primary/20">
                      <Car className="h-3 w-3 text-primary" />
                      ~{formatTrafficValue(carrier.trafficEstimate.dailyVehicles)}
                    </span>
                  )}
                  </div>
                  {!compact && (
                    <span className="inline-flex shrink-0 items-center justify-center rounded-md bg-primary px-3 py-2 text-xs font-bold text-primary-foreground shadow-sm">
                      Zapytaj
                    </span>
                  )}
                </div>
              </div>

              <ChevronRight className="absolute right-2 top-3 h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
            </motion.button>
          );
        })}

        {carriers.length === 0 && (
          <div className="py-10 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg border border-primary/20 bg-primary/10">
              <Search className="h-5 w-5 text-primary" />
            </div>
            <p className="mb-1 font-heading text-base font-semibold text-foreground">
              Brak wyników
            </p>
            <p className="text-sm text-muted-foreground">
              Zmień kryteria wyszukiwania.
            </p>
          </div>
        )}

        {hasMore && (
          <button
            type="button"
            onClick={onLoadMore}
            className="w-full min-h-[44px] whitespace-normal rounded-lg border border-border bg-secondary/50 px-3 py-3 text-sm font-medium leading-snug text-foreground transition-colors cursor-pointer hover:border-primary/40 hover:text-primary"
          >
            {compact ? "Pokaż więcej" : "Pokaż więcej nośników"} ({carriers.length} / {totalCount})
          </button>
        )}
      </div>
    </motion.div>
  );
}

function formatTrafficValue(value: number): string {
  return `${value.toLocaleString("pl-PL")} poj./dobę`;
}
