"use client";

import { useState, useMemo, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";
import type { MapMarker } from "@/components/LeafletMap";
import { COMPANY_PHONE_DISPLAY, COMPANY_PHONE_TEL } from "@/lib/contact";
import {
  ArrowRight,
  Ruler,
  Eye,
  MapPin,
  X,
  Search,
  Layers,
  Navigation,
  Maximize2,
  Car,
  ChevronRight,
  ChevronLeft,
  Phone,
  Zap,
  SlidersHorizontal,
  LocateFixed,
  List,
  Map as MapIcon,
} from "lucide-react";

/* ── Dynamic import: Leaflet (no SSR) ── */
const LeafletMap = dynamic(
  () => import("@/components/LeafletMap").then((mod) => mod.LeafletMap),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <motion.div
            className="w-10 h-10 border-2 border-primary/30 border-t-primary rounded-full"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
          />
          <span className="text-xs text-muted-foreground/50 font-heading">
            Ładowanie mapy…
          </span>
        </div>
      </div>
    ),
  }
);

/* ───── Data ───── */
type Status = "dostępny" | "zarezerwowany" | "zajęty";

interface Carrier {
  id: string;
  code: string;
  city: string;
  address: string;
  region: string;
  type: string;
  format: string;
  status: Status;
  lat: number;
  lng: number;
  traffic: number;
  visibility: number;
  lit: boolean;
  image: string;
}

const CARRIERS: Carrier[] = [
  { id: "1", code: "WAW-S12-001", city: "Warszawa", address: "al. Jerozolimskie 120", region: "Mazowieckie", type: "Super 12", format: "4×3 m", status: "dostępny", lat: 52.229, lng: 21.003, traffic: 45000, visibility: 92, lit: true, image: "/images/generated/hero-city-billboards.png" },
  { id: "2", code: "WAW-S18-002", city: "Warszawa", address: "ul. Marszałkowska 85", region: "Mazowieckie", type: "Super 18", format: "6×3 m", status: "zarezerwowany", lat: 52.235, lng: 20.985, traffic: 62000, visibility: 97, lit: true, image: "/images/generated/rental-billboard-hero.png" },
  { id: "3", code: "WAW-S36-003", city: "Warszawa", address: "ul. Puławska 300", region: "Mazowieckie", type: "Super 36", format: "12×3 m", status: "dostępny", lat: 52.17, lng: 21.02, traffic: 51000, visibility: 94, lit: true, image: "/images/generated/billboard-operator-card.png" },
  { id: "4", code: "KRK-S12-004", city: "Kraków", address: "al. Krasińskiego 22", region: "Małopolskie", type: "Super 12", format: "4×3 m", status: "dostępny", lat: 50.065, lng: 19.937, traffic: 38000, visibility: 88, lit: true, image: "/images/generated/night-billboard-portrait.png" },
  { id: "5", code: "KRK-S36-005", city: "Kraków", address: "Rondo Mogilskie", region: "Małopolskie", type: "Super 36", format: "12×3 m", status: "dostępny", lat: 50.072, lng: 19.955, traffic: 55000, visibility: 95, lit: true, image: "/images/generated/before-empty-billboard.png" },
  { id: "6", code: "WRO-S18-006", city: "Wrocław", address: "pl. Grunwaldzki 1", region: "Dolnośląskie", type: "Super 18", format: "6×3 m", status: "zajęty", lat: 51.11, lng: 17.04, traffic: 41000, visibility: 90, lit: false, image: "/images/generated/after-mounted-billboard.png" },
  { id: "7", code: "POZ-MXL-007", city: "Poznań", address: "ul. Królowej Jadwigi 5", region: "Wielkopolskie", type: "Monster XXL", format: "18×4 m", status: "dostępny", lat: 52.41, lng: 16.93, traffic: 72000, visibility: 99, lit: true, image: "/images/generated/hero-city-billboards.png" },
  { id: "8", code: "GDA-S12-008", city: "Gdańsk", address: "al. Grunwaldzka 411", region: "Pomorskie", type: "Super 12", format: "4×3 m", status: "dostępny", lat: 54.372, lng: 18.618, traffic: 35000, visibility: 85, lit: true, image: "/images/generated/rental-billboard-hero.png" },
  { id: "9", code: "KAT-S18-009", city: "Katowice", address: "al. Roździeńskiego 1", region: "Śląskie", type: "Super 18", format: "6×3 m", status: "zarezerwowany", lat: 50.265, lng: 19.023, traffic: 48000, visibility: 91, lit: true, image: "/images/generated/billboard-operator-card.png" },
  { id: "10", code: "LOD-S36-010", city: "Łódź", address: "al. Piłsudskiego 135", region: "Łódzkie", type: "Super 36", format: "12×3 m", status: "dostępny", lat: 51.76, lng: 19.46, traffic: 52000, visibility: 93, lit: true, image: "/images/generated/night-billboard-portrait.png" },
  { id: "11", code: "SZC-S12-011", city: "Szczecin", address: "al. Wojska Polskiego 64", region: "Zachodniopomorskie", type: "Super 12", format: "4×3 m", status: "dostępny", lat: 53.43, lng: 14.55, traffic: 29000, visibility: 82, lit: false, image: "/images/generated/before-empty-billboard.png" },
  { id: "12", code: "LUB-S18-012", city: "Lublin", address: "al. Racławickie 20", region: "Lubelskie", type: "Super 18", format: "6×3 m", status: "dostępny", lat: 51.25, lng: 22.57, traffic: 31000, visibility: 86, lit: true, image: "/images/generated/after-mounted-billboard.png" },
  { id: "13", code: "BIA-MXL-013", city: "Białystok", address: "ul. Lipowa 1", region: "Podlaskie", type: "Monster XXL", format: "18×4 m", status: "zajęty", lat: 53.13, lng: 23.16, traffic: 67000, visibility: 98, lit: true, image: "/images/generated/hero-city-billboards.png" },
  { id: "14", code: "RZE-S12-014", city: "Rzeszów", address: "al. Piłsudskiego 32", region: "Podkarpackie", type: "Super 12", format: "4×3 m", status: "dostępny", lat: 50.04, lng: 21.99, traffic: 27000, visibility: 84, lit: true, image: "/images/generated/rental-billboard-hero.png" },
  { id: "15", code: "BYD-S18-015", city: "Bydgoszcz", address: "ul. Gdańska 10", region: "Kujawsko-Pomorskie", type: "Super 18", format: "6×3 m", status: "dostępny", lat: 53.12, lng: 18.01, traffic: 33000, visibility: 87, lit: true, image: "/images/generated/billboard-operator-card.png" },
];

const CITIES = [...new Set(CARRIERS.map((c) => c.city))].sort();
const TYPES = [...new Set(CARRIERS.map((c) => c.type))].sort();
const STATUS_CFG: Record<Status, { dot: string; pill: string; label: string; color: string }> = {
  dostępny: { dot: "bg-emerald-400", pill: "bg-emerald-400/10 text-emerald-400 ring-emerald-400/20", label: "Dostępny", color: "#34d399" },
  zarezerwowany: { dot: "bg-amber-400", pill: "bg-amber-400/10 text-amber-400 ring-amber-400/20", label: "Zarezerwowany", color: "#fbbf24" },
  zajęty: { dot: "bg-red-400", pill: "bg-red-400/10 text-red-400 ring-red-400/20", label: "Zajęty", color: "#f87171" },
};

type SortKey = "city" | "type" | "status";

/* ═══════════ PAGE ═══════════ */
export default function CarriersPage() {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [selected, setSelected] = useState<Carrier | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortKey>("city");
  const [mobileView, setMobileView] = useState<"list" | "map">("list");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const handleSearch = useCallback((val: string) => {
    setQuery(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setDebouncedQuery(val), 300);
  }, []);

  const filtered = useMemo(() => {
    let result = CARRIERS.filter((c) => {
      if (city && c.city !== city) return false;
      if (type && c.type !== type) return false;
      if (status && c.status !== status) return false;
      if (debouncedQuery) {
        const q = debouncedQuery.toLowerCase();
        return (
          c.city.toLowerCase().includes(q) ||
          c.code.toLowerCase().includes(q) ||
          c.address.toLowerCase().includes(q)
        );
      }
      return true;
    });
    result = [...result].sort((a, b) => {
      if (sortBy === "city") return a.city.localeCompare(b.city);
      if (sortBy === "type") return a.type.localeCompare(b.type);
      return a.status.localeCompare(b.status);
    });
    return result;
  }, [city, type, status, debouncedQuery, sortBy]);

  const clearAll = () => {
    setCity("");
    setType("");
    setStatus("");
    setQuery("");
    setDebouncedQuery("");
  };
  const hasFilters = city || type || status || query;
  const available = filtered.filter((c) => c.status === "dostępny").length;

  // Build map markers from filtered carriers
  const mapMarkers: MapMarker[] = useMemo(
    () =>
      filtered.map((c) => ({
        id: c.id,
        lat: c.lat,
        lng: c.lng,
        color: STATUS_CFG[c.status].color,
        label: `<strong>${c.code}</strong><br/>${c.city}, ${c.address}<br/><em>${STATUS_CFG[c.status].label}</em>`,
        selected: selected?.id === c.id,
      })),
    [filtered, selected]
  );

  const handleMarkerClick = useCallback(
    (id: string) => {
      const carrier = CARRIERS.find((c) => c.id === id);
      if (carrier) {
        setSelected(carrier);
        setMobileView("map");
      }
    },
    []
  );

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* ── TOOLBAR ── */}
      <header className="h-14 lg:h-16 bg-surface/95 backdrop-blur-xl border-b border-border/40 flex items-center px-4 lg:px-5 gap-3 shrink-0 z-50">
        <Link
          href="/"
          className="flex items-center shrink-0 mr-2"
          aria-label="wielkiformat.pl - Strona główna"
        >
          <span className="font-heading font-bold text-sm text-foreground hidden md:block">
            Mapa nośników
          </span>
        </Link>

        <div className="w-px h-6 bg-border/40 hidden md:block" />

        {/* Search */}
        <div className="flex-1 max-w-md relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
          <label htmlFor="carrier-search" className="sr-only">
            Wyszukaj nośnik
          </label>
          <input
            id="carrier-search"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Szukaj miasta, adresu lub kodu…"
            className="w-full h-9 pl-9 pr-8 rounded-lg bg-input/50 border border-border/40 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
          />
          {query && (
            <button
              type="button"
              onClick={() => handleSearch("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center -mr-2"
              aria-label="Wyczyść wyszukiwanie"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter toggle */}
        <button
          type="button"
          onClick={() => setFiltersOpen(!filtersOpen)}
          className={`flex items-center gap-1.5 px-3 min-h-[44px] rounded-lg text-xs font-medium border transition-all cursor-pointer ${
            filtersOpen
              ? "bg-primary/10 text-primary border-primary/20"
              : "bg-secondary/50 text-secondary-foreground border-border/40 hover:bg-secondary"
          }`}
          aria-label="Pokaż filtry"
          aria-expanded={filtersOpen}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Filtry</span>
          {hasFilters && (
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          )}
        </button>

        {/* Stats - desktop */}
        <div className="hidden lg:flex items-center gap-2 px-3 h-9 rounded-lg glass text-xs">
          <span className="font-bold text-foreground">{filtered.length}</span>
          <span className="text-muted-foreground/60">nośników</span>
          <span className="text-muted-foreground/30">·</span>
          <span className="font-bold text-emerald-400">{available}</span>
          <span className="text-muted-foreground/60">wolnych</span>
        </div>

        {/* Mobile toggle: list / map */}
        <button
          type="button"
          onClick={() => setMobileView(mobileView === "map" ? "list" : "map")}
          className="lg:hidden flex items-center gap-1.5 px-3 min-h-[44px] rounded-lg text-xs font-medium bg-secondary/50 border border-border/40 cursor-pointer"
          aria-label={
            mobileView === "map" ? "Pokaż listę nośników" : "Pokaż mapę"
          }
        >
          {mobileView === "map" ? (
            <>
              <List className="w-3.5 h-3.5" /> Lista
            </>
          ) : (
            <>
              <MapIcon className="w-3.5 h-3.5" /> Mapa
            </>
          )}
        </button>

        <Link
          href="/"
          className="hidden lg:flex items-center gap-1 px-3 h-9 rounded-lg text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Strona główna
        </Link>
      </header>

      {/* ── FILTERS ── */}
      <AnimatePresence>
        {filtersOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-b border-border/40 bg-surface/90 backdrop-blur-xl z-40"
          >
            <div className="px-4 lg:px-5 py-3 flex flex-wrap gap-3 items-end">
              <FilterSelect
                id="filter-city"
                label="Miasto"
                value={city}
                onChange={setCity}
                options={CITIES}
              />
              <FilterSelect
                id="filter-type"
                label="Typ nośnika"
                value={type}
                onChange={setType}
                options={TYPES}
              />
              <FilterSelect
                id="filter-status"
                label="Dostępność"
                value={status}
                onChange={setStatus}
                options={["dostępny", "zarezerwowany", "zajęty"]}
              />
              {hasFilters && (
                <button
                  type="button"
                  onClick={clearAll}
                  className="h-8 px-3 text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 rounded-lg hover:bg-secondary/50 transition-all cursor-pointer min-h-[44px]"
                  aria-label="Wyczyść wszystkie filtry"
                >
                  <X className="w-3 h-3" /> Wyczyść filtry
                </button>
              )}
              <div className="ml-auto hidden lg:block">
                <FilterSelect
                  id="filter-sort"
                  label="Sortuj wg"
                  value={sortBy}
                  onChange={(v) => setSortBy(v as SortKey)}
                  options={["city", "type", "status"]}
                  labels={["Miasta", "Formatu", "Statusu"]}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MAIN: Sidebar + Map ── */}
      <div className="flex-1 flex overflow-hidden">
        {/* SIDEBAR */}
        <div
          className={`w-full lg:w-[380px] shrink-0 border-r border-border/40 bg-surface/95 backdrop-blur-xl flex flex-col overflow-hidden ${
            mobileView === "map" ? "hidden lg:flex" : "flex lg:flex"
          }`}
        >
          {/* Mobile stats bar */}
          <div className="lg:hidden px-4 py-2 border-b border-border/30 flex items-center gap-2 text-xs shrink-0">
            <span className="font-bold text-foreground">
              {filtered.length}
            </span>
            <span className="text-muted-foreground/60">nośników</span>
            <span className="text-muted-foreground/30">·</span>
            <span className="font-bold text-emerald-400">{available}</span>
            <span className="text-muted-foreground/60">wolnych</span>
          </div>

          <AnimatePresence mode="wait">
            {selected ? (
              <DetailPanel
                key="detail"
                carrier={selected}
                onBack={() => setSelected(null)}
              />
            ) : (
              <ListPanel
                key="list"
                carriers={filtered}
                onSelect={(c) => {
                  setSelected(c);
                  setMobileView("map");
                }}
              />
            )}
          </AnimatePresence>
        </div>

        {/* MAP */}
        <div
          className={`flex-1 relative bg-background overflow-hidden ${
            mobileView === "list" ? "hidden lg:block" : "block"
          }`}
        >
          <LeafletMap
            markers={mapMarkers}
            selectedId={selected?.id}
            onMarkerClick={handleMarkerClick}
          />

          {/* Map overlay: legend */}
          <div
            className="absolute bottom-3 left-3 glass rounded-lg px-3 py-2 flex gap-4 z-20 text-[11px]"
            aria-label="Legenda mapy"
          >
            {(["dostępny", "zarezerwowany", "zajęty"] as Status[]).map(
              (s) => (
                <div
                  key={s}
                  className="flex items-center gap-1.5 text-muted-foreground"
                >
                  <span className={`w-2 h-2 rounded-full ${STATUS_CFG[s].dot}`} />
                  {s}
                </div>
              )
            )}
          </div>

          {/* Map overlay: label */}
          <div className="absolute top-3 left-3 glass rounded-lg px-3 py-2 z-20 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-xs font-heading font-bold text-foreground">
              Mapa nośników
            </span>
            <span className="text-[10px] text-muted-foreground/50">
              {filtered.length} wyników
            </span>
          </div>

          {/* Map overlay: Geolocation button */}
          <button
            type="button"
            className="absolute bottom-3 right-14 glass rounded-lg min-w-[44px] min-h-[44px] flex items-center justify-center z-20 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
            title="Moja lokalizacja"
            aria-label="Pokaż moją lokalizację na mapie"
            onClick={() => {
              if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(() => {
                  // placeholder: center map on user location
                });
              }
            }}
          >
            <Navigation className="w-4 h-4" />
          </button>

          {/* Empty state overlay */}
          {filtered.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center z-30 bg-background/60 backdrop-blur-sm">
              <div className="text-center p-6">
                <Search className="w-8 h-8 text-muted-foreground/20 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground font-heading font-semibold mb-1">
                  Brak nośników w tym obszarze
                </p>
                <p className="text-xs text-muted-foreground/50 mb-3">
                  Spróbuj zmienić filtry lub wyszukaj inne miasto.
                </p>
                <button
                  type="button"
                  onClick={clearAll}
                  className="text-xs text-primary hover:text-primary/80 font-medium cursor-pointer"
                >
                  Wyczyść filtry
                </button>
              </div>
            </div>
          )}

          {/* Mobile bottom-sheet for selected carrier */}
          <AnimatePresence>
            {selected && mobileView === "map" && (
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface border-t border-border rounded-t-2xl max-h-[70vh] overflow-y-auto"
              >
                <div className="w-10 h-1 bg-border/60 rounded-full mx-auto mt-2 mb-1" />
                <DetailPanel
                  carrier={selected}
                  onBack={() => setSelected(null)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ═══════════ FILTER SELECT ═══════════ */
function FilterSelect({
  id,
  label,
  value,
  onChange,
  options,
  labels,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  labels?: string[];
}) {
  return (
    <div className="min-w-[130px]">
      <label
        htmlFor={id}
        className="block text-[10px] tracking-wider uppercase text-muted-foreground/50 mb-1 font-heading"
      >
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-8 px-2.5 rounded-lg bg-input/50 border border-border/40 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all cursor-pointer min-h-[44px]"
      >
        <option value="">Wszystkie</option>
        {options.map((o, i) => (
          <option key={o} value={o}>
            {labels?.[i] ?? o}
          </option>
        ))}
      </select>
    </div>
  );
}

/* ═══════════ LIST PANEL ═══════════ */
function ListPanel({
  carriers,
  onSelect,
}: {
  carriers: Carrier[];
  onSelect: (c: Carrier) => void;
}) {
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
          Kliknij, aby zobaczyć szczegóły
        </p>
      </div>
      <div className="flex-1 overflow-y-auto p-2.5 space-y-1.5">
        {carriers.map((c, i) => {
          const cfg = STATUS_CFG[c.status];
          return (
            <motion.button
              key={c.id}
              type="button"
              onClick={() => onSelect(c)}
              className="w-full text-left p-3 rounded-xl border transition-all group cursor-pointer bg-card/20 border-border/20 hover:border-primary/15 hover:bg-card/40 min-h-[44px]"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.03, 0.3) }}
              whileHover={{ x: 3 }}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-heading font-bold text-xs text-foreground">
                      {c.code}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-semibold ring-1 ${cfg.pill}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                      {cfg.label}
                    </span>
                  </div>
                  <div className="text-[11px] text-muted-foreground truncate">
                    {c.city}, {c.address}
                  </div>
                  <div className="flex items-center gap-2.5 mt-1 text-[10px] text-muted-foreground/50">
                    <span>{c.format}</span>
                    <span>{(c.traffic / 1000).toFixed(0)}k/dzień</span>
                    {c.lit && (
                      <span className="text-amber-400/60">⚡ ośw.</span>
                    )}
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
      </div>
    </motion.div>
  );
}

/* ═══════════ DETAIL PANEL ═══════════ */
function DetailPanel({
  carrier: c,
  onBack,
}: {
  carrier: Carrier;
  onBack: () => void;
}) {
  const cfg = STATUS_CFG[c.status];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col h-full"
    >
      {/* Header */}
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
            {c.code}
          </h3>
          <p className="text-[10px] text-muted-foreground truncate">
            {c.city}, woj. {c.region.toLowerCase()}
          </p>
        </div>
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ring-1 ${cfg.pill}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
          {cfg.label}
        </span>
      </div>

      {/* Body - scrollable */}
      <div className="flex-1 overflow-y-auto">
        {/* Image */}
        <div className="relative h-44 overflow-hidden">
          <Image
            src={c.image}
            alt={`Nośnik ${c.code} - ${c.address}, ${c.city}`}
            fill
            sizes="380px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
          <div className="absolute bottom-2 left-3 flex gap-1.5">
            <span className="px-2 py-0.5 rounded glass text-[10px] font-heading font-bold text-primary">
              {c.type}
            </span>
            <span className="px-2 py-0.5 rounded glass text-[10px] text-muted-foreground">
              {c.format}
            </span>
          </div>
        </div>

        {/* Address */}
        <div className="px-4 py-3 border-b border-border/20 flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary/8 border border-primary/15 flex items-center justify-center shrink-0 mt-0.5">
            <MapPin className="w-4 h-4 text-primary" />
          </div>
          <div>
            <div className="text-sm font-medium text-foreground">
              {c.address}
            </div>
            <div className="text-[11px] text-muted-foreground">
              {c.city}, woj. {c.region.toLowerCase()}
            </div>
          </div>
        </div>

        {/* Progress bars */}
        <div className="px-4 py-4 border-b border-border/20 space-y-3">
          <div className="text-[10px] tracking-wider uppercase text-muted-foreground/40 font-heading mb-2">
            Parametry
          </div>
          <ProgressRow
            icon={Car}
            label="Ruch dzienny"
            value={`${c.traffic.toLocaleString()} poj.`}
            pct={Math.min((c.traffic / 80000) * 100, 100)}
            color="from-primary/60 to-primary"
          />
          <ProgressRow
            icon={Eye}
            label="Widoczność"
            value={`${c.visibility}%`}
            pct={c.visibility}
            color="from-emerald-500/60 to-emerald-400"
          />
        </div>

        {/* Tech specs */}
        <div className="px-4 py-4 border-b border-border/20">
          <div className="text-[10px] tracking-wider uppercase text-muted-foreground/40 font-heading mb-2">
            Szczegóły
          </div>
          <div className="grid grid-cols-2 gap-2">
            <SpecBox icon={Ruler} value={c.format} label="Format" />
            <SpecBox icon={Layers} value={c.type} label="Typ" />
            <SpecBox
              icon={Zap}
              value={c.lit ? "Tak" : "Nie"}
              label="Podświetlenie"
            />
            <SpecBox
              icon={LocateFixed}
              value={`${((c.traffic * 30) / 1000).toFixed(0)}k`}
              label="Kontakty/mies."
            />
          </div>
        </div>

        {/* Urgency badge */}
        {c.status === "dostępny" && (
          <div className="px-4 pt-3">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-400/5 border border-emerald-400/15 text-xs text-emerald-400">
              <span className="relative w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping-slow" />
                <span className="relative block w-2 h-2 rounded-full bg-emerald-400" />
              </span>
              Nośnik dostępny - zarezerwuj zanim ktoś Cię wyprzedzi
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="px-4 py-4">
          <Link href="/kontakt">
            <Button variant="cta" className="w-full group" size="default">
              Zapytaj o ten nośnik{" "}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <div className="mt-2 text-center text-[10px] text-muted-foreground/40">
            <Phone className="w-3 h-3 inline mr-1" />
            <a
              href={COMPANY_PHONE_TEL}
              className="hover:text-primary transition-colors"
            >
              {COMPANY_PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════ MICRO COMPONENTS ═══════════ */
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
