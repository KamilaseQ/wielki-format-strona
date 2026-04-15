"use client";

import { motion } from "motion/react";
import { ChevronRight, Search } from "lucide-react";
import type { Carrier } from "@/features/carriers/data";
import { TYPE_CFG } from "@/features/carriers/data";

interface ListPanelProps {
  carriers: Carrier[];
  totalCount: number;
  hasMore: boolean;
  onLoadMore: () => void;
  onSelect: (carrier: Carrier) => void;
  subtitle: string;
}

export function ListPanel({
  carriers,
  totalCount,
  hasMore,
  onLoadMore,
  onSelect,
  subtitle,
}: ListPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-full"
    >
      <div className="px-4 py-3 border-b border-border/30 shrink-0">
        <h2 className="font-heading font-bold text-sm text-foreground">
          Lista nośników
        </h2>
        <p className="text-[10px] text-muted-foreground/50 mt-0.5">
          {subtitle}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-2.5 space-y-1.5">
        {carriers.map((carrier, index) => {
          const cfg = TYPE_CFG[carrier.type];

          return (
            <motion.button
              key={carrier.id}
              type="button"
              onClick={() => onSelect(carrier)}
              className="w-full text-left p-3 rounded-xl border transition-all group cursor-pointer bg-card/20 border-border/20 hover:border-primary/15 hover:bg-card/40 min-h-[44px]"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(index * 0.025, 0.2) }}
              whileHover={{ x: 3 }}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <span className="font-heading font-bold text-xs text-foreground">
                      {carrier.code}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-semibold ring-1 ${cfg.pill}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                      {cfg.label}
                    </span>
                  </div>
                  <div className="text-[11px] text-muted-foreground truncate">
                    {carrier.city}, {carrier.address}
                  </div>
                  <div className="flex items-center gap-2.5 mt-1 text-[10px] text-muted-foreground/50 flex-wrap">
                    <span>{carrier.format}</span>
                    <span>{(carrier.traffic / 1000).toFixed(0)}k/dzień</span>
                    {carrier.lit && <span className="text-amber-400/70">podświetlenie</span>}
                  </div>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/20 group-hover:text-primary mt-1 transition-colors shrink-0" />
              </div>
            </motion.button>
          );
        })}

        {carriers.length === 0 && (
          <div className="py-10 text-center">
            <Search className="w-6 h-6 text-muted-foreground/20 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground font-heading font-semibold mb-1">
              Brak wyników
            </p>
            <p className="text-xs text-muted-foreground/40">
              Zmień kryteria wyszukiwania.
            </p>
          </div>
        )}

        {hasMore && (
          <button
            type="button"
            onClick={onLoadMore}
            className="w-full min-h-[44px] rounded-xl border border-border/30 bg-secondary/40 px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:border-primary/15 transition-colors cursor-pointer"
          >
            Pokaż więcej nośników ({carriers.length}/{totalCount})
          </button>
        )}
      </div>
    </motion.div>
  );
}
