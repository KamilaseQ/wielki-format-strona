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
      <div className="px-4 py-3 border-b border-border shrink-0">
        <h2 className="font-heading font-bold text-base text-foreground">
          Lista nośników
        </h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          {subtitle}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {carriers.map((carrier, index) => {
          const cfg = TYPE_CFG[carrier.type];

          return (
            <motion.button
              key={carrier.id}
              type="button"
              onClick={() => onSelect(carrier)}
              className="w-full text-left p-3.5 rounded-xl border transition-all group cursor-pointer bg-card border-border hover:border-primary/40 hover:shadow-md min-h-[44px]"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(index * 0.025, 0.2) }}
              whileHover={{ x: 3 }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-heading font-bold text-sm text-foreground">
                      {carrier.code}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ring-1 ${cfg.pill}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                      {cfg.label}
                    </span>
                  </div>
                  <div className="text-sm text-foreground truncate">
                    {carrier.city}
                  </div>
                  <div className="text-xs text-muted-foreground truncate mt-0.5">
                    {carrier.address}
                  </div>
                  <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground flex-wrap">
                    <span className="font-medium">{carrier.format}</span>
                    <span>·</span>
                    <span>~{(carrier.traffic / 1000).toFixed(0)}k/dzień</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary mt-1 transition-colors shrink-0" />
              </div>
            </motion.button>
          );
        })}

        {carriers.length === 0 && (
          <div className="py-10 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-3">
              <Search className="w-5 h-5 text-primary" />
            </div>
            <p className="text-base text-foreground font-heading font-semibold mb-1">
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
            className="w-full min-h-[44px] rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm font-medium text-foreground hover:text-primary hover:border-primary/40 transition-colors cursor-pointer"
          >
            Pokaż więcej nośników ({carriers.length} / {totalCount})
          </button>
        )}
      </div>
    </motion.div>
  );
}
