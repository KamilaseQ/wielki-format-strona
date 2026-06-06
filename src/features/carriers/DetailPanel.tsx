"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  Car,
  CheckCircle2,
  ChevronLeft,
  ExternalLink,
  Info,
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
import type { Carrier, CarrierTrafficEstimate } from "@/features/carriers/data";
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
  const trafficValue = carrier.trafficEstimate?.dailyVehicles ?? carrier.traffic;

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

        {carrier.trafficEstimate && (
          <div className="border-b border-border px-4 py-4">
            <TrafficEstimatePanel estimate={carrier.trafficEstimate} />
          </div>
        )}

        <div className="border-b border-border px-4 py-4">
          <div className="mb-3 font-heading text-[11px] uppercase tracking-label text-muted-foreground">
            Szczegóły
          </div>
          <div className="grid grid-cols-2 gap-2">
            <SpecBox icon={Ruler} value={carrier.format} label="Format" />
            <SpecBox icon={Layers} value={cfg.label} label="Klasa" />
            <SpecBox
              icon={LocateFixed}
              value={`${((trafficValue * 30) / 1000).toFixed(0)}k`}
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

function TrafficEstimatePanel({
  estimate,
}: {
  estimate: CarrierTrafficEstimate;
}) {
  return (
    <div className="rounded-lg border border-primary/25 bg-card p-3 shadow-sm">
      <div className="flex items-start gap-2.5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-primary/20 bg-primary/10">
          <Car className="h-4 w-4 text-primary" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <span className="truncate">Potencjał ruchu</span>
            <TrafficInfoButton estimate={estimate} />
          </div>
          <div className="mt-0.5 flex min-w-0 items-end gap-1.5">
            <span className="font-heading text-xl font-black leading-none text-foreground">
              ~{estimate.dailyVehicles.toLocaleString("pl-PL")}
            </span>
            <span className="pb-0.5 text-xs font-semibold text-muted-foreground">
              poj./dobę
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function TrafficInfoButton({
  estimate,
}: {
  estimate: CarrierTrafficEstimate;
}) {
  const tooltipId = useId();
  const [open, setOpen] = useState(false);

  return (
    <span className="group/info relative inline-flex shrink-0">
      <button
        type="button"
        aria-label="Jak policzono szacowany ruch"
        aria-describedby={tooltipId}
        aria-expanded={open}
        onClick={(event) => {
          event.preventDefault();
          setOpen((current) => !current);
        }}
        onBlur={() => {
          window.setTimeout(() => setOpen(false), 120);
        }}
        className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-primary/45 hover:text-primary focus-visible:text-primary"
      >
        <Info className="h-3.5 w-3.5" />
      </button>
      <span
        id={tooltipId}
        role="tooltip"
        className={`pointer-events-none fixed left-4 top-20 z-[1500] max-h-[min(70dvh,24rem)] w-[min(24rem,calc(100vw-2rem))] overflow-y-auto rounded-lg border border-border bg-card px-3 py-2 text-left font-body text-[11px] font-medium leading-relaxed text-foreground shadow-xl transition-all duration-150 group-hover/info:pointer-events-auto group-hover/info:translate-y-0 group-hover/info:opacity-100 group-focus-within/info:pointer-events-auto group-focus-within/info:translate-y-0 group-focus-within/info:opacity-100 lg:left-6 lg:top-24 ${
          open ? "pointer-events-auto translate-y-0 opacity-100" : "translate-y-1 opacity-0"
        }`}
      >
        <span className="block font-heading text-[10px] font-bold uppercase tracking-label text-muted-foreground">
          Metoda i źródło
        </span>
        <span className="mt-1 block">{estimate.methodDescription}</span>
        <span className="mt-2 block border-t border-border pt-2 text-muted-foreground">
          <span className="font-semibold text-foreground">Źródło:</span>{" "}
          {estimate.sourceUrl ? (
            <a
              href={estimate.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-foreground underline-offset-4 hover:text-primary hover:underline"
            >
              {estimate.sourceLabel}
            </a>
          ) : (
            <span className="font-semibold text-foreground">
              {estimate.sourceLabel}
            </span>
          )}
          {estimate.sourceYear ? `, ${estimate.sourceYear}` : ""}.{" "}
          {estimate.methodLabel}
          {estimate.matchedDistanceMeters
            ? ` Punkt referencyjny: ok. ${estimate.matchedDistanceMeters.toLocaleString("pl-PL")} m od nośnika.`
            : ""}
        </span>
        <span className="mt-2 block text-muted-foreground">
          Typ danych: {getTrafficEvidence(estimate).label}. Pewność:{" "}
          {getConfidenceLabel(estimate.confidence)}. Liczba opisuje ruch
          pojazdów w korytarzu, nie gwarantowaną liczbę kontaktów z reklamą.
        </span>
      </span>
    </span>
  );
}

function getTrafficEvidence(estimate: CarrierTrafficEstimate): {
  label: string;
  note: string;
} {
  if (estimate.basis === "direct-measurement") {
    return {
      label: "Pomiar publiczny",
      note: "najwyższa pewność",
    };
  }
  if (estimate.basis === "measured-corridor") {
    return {
      label: "Korytarz z raportu",
      note: "GPR/ZDM + korekta",
    };
  }
  return {
    label: "Model lokalny",
    note: "kalibracja ZDM/GPR",
  };
}

function getConfidenceLabel(confidence: CarrierTrafficEstimate["confidence"]): string {
  if (confidence === "high") return "wysoka";
  if (confidence === "medium") return "średnia";
  return "niska";
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
