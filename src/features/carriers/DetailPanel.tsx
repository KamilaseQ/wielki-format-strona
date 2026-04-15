"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  Car,
  ChevronLeft,
  Eye,
  ImageIcon,
  Layers,
  LocateFixed,
  MapPin,
  Phone,
  PersonStanding,
  Ruler,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Carrier } from "@/features/carriers/data";
import { TYPE_CFG } from "@/features/carriers/data";
import {
  COMPANY_PHONE_ARIA,
  COMPANY_PHONE_DISPLAY,
  COMPANY_PHONE_TEL,
} from "@/lib/contact";

interface DetailPanelProps {
  carrier: Carrier;
  onBack: () => void;
}

export function DetailPanel({ carrier, onBack }: DetailPanelProps) {
  const cfg = TYPE_CFG[carrier.type];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col h-full"
    >
      <div className="px-4 py-3 border-b border-border/30 flex items-center gap-3 shrink-0">
        <button
          type="button"
          onClick={onBack}
          className="min-w-[44px] min-h-[44px] rounded-lg bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          aria-label="Wróć do listy nośników"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="flex-1 min-w-0">
          <h3 className="font-heading font-bold text-sm text-foreground">
            {carrier.code}
          </h3>
          <p className="text-[10px] text-muted-foreground truncate">
            {carrier.city}, woj. {carrier.region.toLowerCase()}
          </p>
        </div>
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ring-1 ${cfg.pill}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
          {cfg.label}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="relative h-44 overflow-hidden bg-gradient-to-br from-primary/10 via-surface to-secondary/40 flex items-center justify-center">
          <ImageIcon className="w-10 h-10 text-primary/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
          <div className="absolute bottom-2 left-3 flex gap-1.5 flex-wrap">
            <span className="px-2 py-0.5 rounded glass text-[10px] font-heading font-bold text-primary">
              {cfg.label}
            </span>
            <span className="px-2 py-0.5 rounded glass text-[10px] text-muted-foreground">
              {carrier.format}
            </span>
            {carrier.zip && (
              <span className="px-2 py-0.5 rounded glass text-[10px] text-muted-foreground">
                {carrier.zip}
              </span>
            )}
          </div>
        </div>

        <div className="px-4 py-3 border-b border-border/20 flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary/8 border border-primary/15 flex items-center justify-center shrink-0 mt-0.5">
            <MapPin className="w-4 h-4 text-primary" />
          </div>
          <div>
            <div className="text-sm font-medium text-foreground">
              {carrier.address}
            </div>
            <div className="text-[11px] text-muted-foreground">
              {carrier.city}, woj. {carrier.region.toLowerCase()}
            </div>
          </div>
        </div>

        <div className="px-4 py-4 border-b border-border/20 space-y-3">
          <div className="text-[10px] tracking-wider uppercase text-muted-foreground/40 font-heading mb-2">
            Parametry
          </div>
          <ProgressRow
            icon={Car}
            label="Ruch dzienny (szac.)"
            value={`~${carrier.traffic.toLocaleString()} poj.`}
            pct={Math.min((carrier.traffic / 80000) * 100, 100)}
            color="from-primary/60 to-primary"
          />
          <ProgressRow
            icon={Eye}
            label="Widoczność"
            value={`${carrier.visibility}%`}
            pct={carrier.visibility}
            color="from-emerald-500/60 to-emerald-400"
          />
        </div>

        <div className="px-4 py-4 border-b border-border/20">
          <div className="text-[10px] tracking-wider uppercase text-muted-foreground/40 font-heading mb-2">
            Szczegóły
          </div>
          <div className="grid grid-cols-2 gap-2">
            <SpecBox icon={Ruler} value={carrier.format} label="Format" />
            <SpecBox icon={Layers} value={cfg.label} label="Segment" />
            <SpecBox
              icon={LocateFixed}
              value={`${((carrier.traffic * 30) / 1000).toFixed(0)}k`}
              label="Kontakty/mies."
            />
            <SpecBox icon={MapPin} value={carrier.zip || "—"} label="Kod poczt." />
          </div>
        </div>

        {carrier.description && (
          <div className="px-4 py-4 border-b border-border/20">
            <div className="text-[10px] tracking-wider uppercase text-muted-foreground/40 font-heading mb-2">
              Opis lokalizacji
            </div>
            <p className="text-[12px] leading-relaxed text-muted-foreground whitespace-pre-line">
              {carrier.description}
            </p>
          </div>
        )}

        <div className="px-4 pt-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/5 border border-primary/15 text-xs text-muted-foreground">
            <MapPin className="w-3.5 h-3.5 text-primary/50 shrink-0" />
            Ten panel pozostaje spięty z mapą, więc możesz porównywać lokalizacje bez przełączania ekranów.
          </div>
        </div>

        <div className="px-4 py-4">
          <Link href="/kontakt">
            <Button variant="cta" className="w-full group" size="default">
              Zapytaj o ten nośnik{" "}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <a
            href={`https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${carrier.lat},${carrier.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center justify-center gap-2 rounded-lg border border-border/40 bg-secondary/40 py-2 text-xs font-medium text-foreground hover:bg-secondary hover:text-primary transition-colors"
          >
            <PersonStanding className="w-4 h-4" />
            Zobacz w Street View
          </a>
          <a
            href={COMPANY_PHONE_TEL}
            aria-label={COMPANY_PHONE_ARIA}
            className="mt-3 flex items-center justify-center gap-2 rounded-lg border border-primary/20 bg-primary/5 py-2.5 text-base font-heading font-bold text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
          >
            <Phone className="w-4 h-4 text-primary" />
            {COMPANY_PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function ProgressRow({
  icon: Icon,
  label,
  value,
  pct,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  pct: number;
  color: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-[11px] text-muted-foreground flex items-center gap-1.5">
          <Icon className="w-3.5 h-3.5 text-primary/50" />
          {label}
        </span>
        <span className="text-[11px] font-heading font-bold text-foreground">
          {value}
        </span>
      </div>
      <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
        <motion.div
          className={`h-full bg-gradient-to-r ${color} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

function SpecBox({
  icon: Icon,
  value,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-lg bg-card/20 border border-border/20 p-2.5">
      <Icon className="w-3.5 h-3.5 text-primary/40 mb-1.5" />
      <div className="text-xs font-heading font-bold text-foreground">
        {value}
      </div>
      <div className="text-[9px] text-muted-foreground/50">{label}</div>
    </div>
  );
}
