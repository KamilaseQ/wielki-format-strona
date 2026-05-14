"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  Car,
  CheckCircle2,
  ChevronLeft,
  Eye,
  ExternalLink,
  Layers,
  LocateFixed,
  MapPin,
  Phone,
  PersonStanding,
  Ruler,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CarrierImage } from "@/features/carriers/CarrierImage";
import type { Carrier } from "@/features/carriers/data";
import { AVAILABILITY_CFG, TYPE_CFG } from "@/features/carriers/data";
import {
  COMPANY_PHONE_ARIA,
  COMPANY_PHONE_DISPLAY,
  COMPANY_PHONE_TEL,
} from "@/lib/contact";

interface DetailPanelProps {
  carrier: Carrier;
  onBack: () => void;
  flow?: boolean;
}

export function DetailPanel({ carrier, onBack, flow = false }: DetailPanelProps) {
  const cfg = TYPE_CFG[carrier.type];
  const availability = AVAILABILITY_CFG[carrier.availability];
  const streetViewUrl = `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${carrier.lat},${carrier.lng}`;

  return (
    <motion.div
      initial={{ opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 18 }}
      transition={{ duration: 0.22 }}
      className={flow ? "flex flex-col bg-card" : "flex h-full min-h-0 flex-col bg-card"}
    >
      <div className="shrink-0 border-b border-border px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="flex h-10 w-10 min-w-[40px] min-h-[40px] items-center justify-center rounded-lg border border-border bg-secondary/65 text-foreground transition-colors cursor-pointer hover:border-primary/35 hover:text-primary"
            aria-label="Wróć do listy nośników"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="truncate font-heading text-base font-bold text-foreground">
                {carrier.code}
              </h3>
              <span className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ${availability.pill}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${availability.dot}`} />
                {availability.label}
              </span>
            </div>
            <p className="mt-0.5 truncate text-xs text-muted-foreground">
              {carrier.city}, woj. {carrier.region.toLowerCase()}
            </p>
          </div>
        </div>
      </div>

      <div className={flow ? "" : "min-h-0 flex-1 overflow-y-auto overscroll-contain"}>
        <CarrierImage
          carrier={carrier}
          priority
          className="h-48 border-b border-border sm:h-56 lg:h-52"
        />

        <div className="border-b border-border px-4 py-3">
          <div className="mb-2 flex flex-wrap items-center gap-1.5">
            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ${cfg.pill}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
              {cfg.label}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-secondary/70 px-2.5 py-1 text-[11px] font-medium text-muted-foreground ring-1 ring-border">
              <Ruler className="h-3 w-3" />
              {carrier.format}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-secondary/70 px-2.5 py-1 text-[11px] font-medium text-muted-foreground ring-1 ring-border">
              <CheckCircle2 className="h-3 w-3 text-emerald-500" />
              Import XML
            </span>
          </div>

          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10">
              <MapPin className="h-4 w-4 text-primary" />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-foreground">
                {carrier.address}
              </div>
              <div className="mt-0.5 text-xs text-muted-foreground">
                {carrier.city}
                {carrier.zip ? `, ${carrier.zip}` : ""}
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-border px-4 py-4">
          <div className="mb-3 font-heading text-[11px] uppercase tracking-label text-muted-foreground">
            Parametry robocze
          </div>
          <div className="space-y-3">
            <ProgressRow
              icon={Car}
              label="Ruch dzienny (szac.)"
              value={`~${carrier.traffic.toLocaleString("pl-PL")} poj.`}
              pct={Math.min((carrier.traffic / 80000) * 100, 100)}
            />
            <ProgressRow
              icon={Eye}
              label="Widoczność"
              value={`${carrier.visibility}%`}
              pct={carrier.visibility}
              tone="emerald"
            />
          </div>
        </div>

        <div className="border-b border-border px-4 py-4">
          <div className="mb-3 font-heading text-[11px] uppercase tracking-label text-muted-foreground">
            Szczegóły
          </div>
          <div className="grid grid-cols-2 gap-2">
            <SpecBox icon={Ruler} value={carrier.format} label="Format" />
            <SpecBox icon={Layers} value={cfg.label} label="Klasa" />
            <SpecBox
              icon={LocateFixed}
              value={`${((carrier.traffic * 30) / 1000).toFixed(0)}k`}
              label="Kontakty/mies."
            />
            <SpecBox icon={MapPin} value={carrier.zip || "-"} label="Kod poczt." />
          </div>
        </div>

        {carrier.description && (
          <div className="border-b border-border px-4 py-4">
            <div className="mb-2 font-heading text-[11px] uppercase tracking-label text-muted-foreground">
              Opis lokalizacji
            </div>
            <p className="text-sm leading-relaxed text-foreground/90">
              {carrier.description}
            </p>
          </div>
        )}
      </div>

      <div className="shrink-0 border-t border-border bg-card/95 px-4 py-3 shadow-[0_-12px_30px_rgba(0,0,0,0.12)]">
        <Link href={`/kontakt?nosnik=${encodeURIComponent(carrier.code)}`}>
          <Button variant="cta" className="w-full group" size="default">
            Zapytaj o ten nośnik
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>

        <div className="mt-2 grid grid-cols-2 gap-2">
          <a
            href={streetViewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-border bg-secondary/55 px-3 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/35 hover:text-primary"
          >
            <PersonStanding className="h-4 w-4" />
            Street View
            <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
          </a>
          <a
            href={COMPANY_PHONE_TEL}
            aria-label={COMPANY_PHONE_ARIA}
            className="flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-3 py-2 text-sm font-heading font-bold text-foreground transition-colors hover:bg-primary/15 hover:text-primary"
          >
            <Phone className="h-4 w-4 text-primary" />
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
  tone = "primary",
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  pct: number;
  tone?: "primary" | "emerald";
}) {
  const barClass =
    tone === "emerald"
      ? "bg-gradient-to-r from-emerald-500/70 to-emerald-400"
      : "bg-gradient-to-r from-primary/65 to-primary";

  return (
    <div>
      <div className="mb-1 flex items-center justify-between gap-3">
        <span className="flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground">
          <Icon className="h-3.5 w-3.5 shrink-0 text-primary" />
          <span className="truncate">{label}</span>
        </span>
        <span className="shrink-0 font-heading text-sm font-bold text-foreground">
          {value}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-secondary">
        <motion.div
          className={`h-full rounded-full ${barClass}`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
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
  icon: LucideIcon;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-secondary/45 p-3">
      <Icon className="mb-1.5 h-4 w-4 text-primary" />
      <div className="truncate font-heading text-sm font-bold text-foreground">
        {value}
      </div>
      <div className="mt-0.5 text-xs text-muted-foreground">{label}</div>
    </div>
  );
}
