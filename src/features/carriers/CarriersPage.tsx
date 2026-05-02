"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import type { MapMarker, MapViewport } from "@/components/LeafletMap";
import {
  List,
  Map as MapIcon,
  MapPin,
  Navigation,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { DetailPanel } from "@/features/carriers/DetailPanel";
import { ListPanel } from "@/features/carriers/ListPanel";
import {
  LIST_PAGE_SIZE,
  MAP_PANEL_PAGE_SIZE,
  TYPE_CFG,
  deriveFilterOptions,
  distanceFromCenter,
  getMarkerBudget,
  isCarrierInsideBounds,
  type Carrier,
  type CarrierType,
  type SortKey,
} from "@/features/carriers/data";

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
          <span className="text-sm text-muted-foreground font-heading">
            Ładowanie mapy…
          </span>
        </div>
      </div>
    ),
  }
);

interface CarriersPageProps {
  carriers: Carrier[];
}

export default function CarriersPage({ carriers }: CarriersPageProps) {
  const { cities: CITIES, types: TYPES } = useMemo(
    () => deriveFilterOptions(carriers),
    [carriers]
  );
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [selected, setSelected] = useState<Carrier | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortKey>("city");
  const [mobileView, setMobileView] = useState<"list" | "map">("list");
  const [visibleCount, setVisibleCount] = useState(LIST_PAGE_SIZE);
  const [mapViewport, setMapViewport] = useState<MapViewport | null>(null);
  const [viewportReadyForFiltering, setViewportReadyForFiltering] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const handleSearch = useCallback((value: string) => {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setDebouncedQuery(value), 250);
  }, []);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const filtered = useMemo(() => {
    let result = carriers.filter((carrier) => {
      if (city && carrier.city !== city) return false;
      if (type && carrier.type !== type) return false;
      if (!debouncedQuery) return true;
      const normalized = debouncedQuery.toLowerCase();
      return (
        carrier.city.toLowerCase().includes(normalized) ||
        carrier.code.toLowerCase().includes(normalized) ||
        carrier.address.toLowerCase().includes(normalized)
      );
    });

    result = [...result].sort((left, right) => {
      if (sortBy === "city") return left.city.localeCompare(right.city, "pl");
      if (sortBy === "type") return left.type.localeCompare(right.type);
      return right.traffic - left.traffic;
    });

    return result;
  }, [carriers, city, type, debouncedQuery, sortBy]);

  const autoFitKey = `${city}|${type}|${debouncedQuery}|${sortBy}|${filtered.length}`;

  useEffect(() => {
    setViewportReadyForFiltering(false);
  }, [autoFitKey]);

  useEffect(() => {
    if (selected && !filtered.some((carrier) => carrier.id === selected.id)) {
      setSelected(null);
    }
  }, [filtered, selected]);

  useEffect(() => {
    setVisibleCount(mobileView === "map" ? MAP_PANEL_PAGE_SIZE : LIST_PAGE_SIZE);
  }, [city, type, debouncedQuery, sortBy, mobileView]);

  const clearAll = () => {
    setCity("");
    setType("");
    setQuery("");
    setDebouncedQuery("");
    setSelected(null);
  };

  const hasFilters = Boolean(city || type || query);
  const cityCount = new Set(filtered.map((carrier) => carrier.city)).size;
  const typeCount = new Set(filtered.map((carrier) => carrier.type)).size;
  const listStep = mobileView === "map" ? MAP_PANEL_PAGE_SIZE : LIST_PAGE_SIZE;

  const handleViewportChange = useCallback((viewport: MapViewport) => {
    setMapViewport(viewport);
    setViewportReadyForFiltering(true);
  }, []);

  const boundedCarriers = useMemo(() => {
    if (!mapViewport || !viewportReadyForFiltering) return filtered;
    return filtered.filter((carrier) => isCarrierInsideBounds(carrier, mapViewport.bounds));
  }, [filtered, mapViewport, viewportReadyForFiltering]);

  const markerBudget = getMarkerBudget(mapViewport?.zoom ?? 6);

  const mapCarriers = useMemo(() => {
    const ranked = [...boundedCarriers].sort((left, right) => {
      const distanceDiff = distanceFromCenter(left, mapViewport?.center) - distanceFromCenter(right, mapViewport?.center);
      if (Math.abs(distanceDiff) > 0.005) return distanceDiff;
      return right.traffic - left.traffic;
    });

    const limited = ranked.slice(0, markerBudget);
    if (!selected) return limited;

    const selectedCarrier = filtered.find((carrier) => carrier.id === selected.id);
    if (!selectedCarrier || limited.some((carrier) => carrier.id === selectedCarrier.id)) return limited;
    return [selectedCarrier, ...limited.slice(0, Math.max(0, markerBudget - 1))];
  }, [boundedCarriers, filtered, mapViewport, markerBudget, selected]);

  const mapMarkers: MapMarker[] = useMemo(
    () =>
      mapCarriers.map((carrier) => ({
        id: carrier.id,
        lat: carrier.lat,
        lng: carrier.lng,
        color: TYPE_CFG[carrier.type].color,
        label: `<strong>${carrier.code}</strong><br/>${carrier.city}, ${carrier.address}<br/><em>${TYPE_CFG[carrier.type].label} · ${carrier.format}</em>`,
        selected: selected?.id === carrier.id,
      })),
    [mapCarriers, selected]
  );

  const hiddenMarkerCount = Math.max(0, filtered.length - mapCarriers.length);
  const visibleCarriers = filtered.slice(0, visibleCount);
  const hasMoreResults = visibleCount < filtered.length;

  const handleMarkerClick = useCallback(
    (id: string) => {
      const carrier = filtered.find((item) => item.id === id);
      if (!carrier) return;
      setSelected(carrier);
      setMobileView("map");
    },
    [filtered]
  );

  return (
    <div className="h-screen flex flex-col bg-background">
      <header className="h-14 lg:h-16 bg-card border-b border-border flex items-center px-4 lg:px-5 gap-3 shrink-0 z-50">
        <Link href="/" className="flex items-center shrink-0 mr-2 text-muted-foreground hover:text-foreground transition-colors" aria-label="wielkiformat.pl - Strona główna">
          <span className="font-heading font-bold text-sm hidden md:block">← Mapa nośników</span>
          <span className="font-heading font-bold text-sm md:hidden">←</span>
        </Link>
        <div className="w-px h-6 bg-border hidden md:block" />

        <div className="flex-1 max-w-md relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <label htmlFor="carrier-search" className="sr-only">Wyszukaj nośnik</label>
          <input id="carrier-search" value={query} onChange={(event) => handleSearch(event.target.value)} placeholder="Szukaj miasta, adresu lub kodu…" className="w-full h-10 pl-9 pr-8 rounded-lg bg-input border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all" />
          {query && <button type="button" onClick={() => handleSearch("")} className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer w-8 h-8 flex items-center justify-center rounded-md" aria-label="Wyczyść wyszukiwanie"><X className="w-4 h-4" /></button>}
        </div>

        <button type="button" onClick={() => setFiltersOpen((current) => !current)} className={`flex items-center gap-1.5 px-3 h-10 rounded-lg text-sm font-medium border transition-all cursor-pointer ${filtersOpen ? "bg-primary/10 text-primary border-primary/30" : "bg-secondary/60 text-foreground border-border hover:bg-secondary"}`} aria-label="Pokaż filtry" aria-expanded={filtersOpen}>
          <SlidersHorizontal className="w-4 h-4" />
          <span className="hidden sm:inline">Filtry</span>
          {hasFilters && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
        </button>

        <div className="hidden lg:flex items-center gap-2 px-3 h-10 rounded-lg bg-secondary/40 border border-border text-sm">
          <span className="font-bold text-foreground tabular-nums">{filtered.length}</span>
          <span className="text-muted-foreground">nośników</span>
          <span className="text-muted-foreground/50">·</span>
          <span className="font-bold text-primary tabular-nums">{cityCount}</span>
          <span className="text-muted-foreground">miast</span>
        </div>

        <button type="button" onClick={() => setMobileView(mobileView === "map" ? "list" : "map")} className="lg:hidden flex items-center gap-1.5 px-3 h-10 rounded-lg text-sm font-medium bg-secondary/60 border border-border cursor-pointer" aria-label={mobileView === "map" ? "Pokaż listę nośników" : "Pokaż mapę"}>
          {mobileView === "map" ? <><List className="w-4 h-4" /> Lista</> : <><MapIcon className="w-4 h-4" /> Mapa</>}
        </button>
      </header>

      <AnimatePresence>
        {filtersOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden border-b border-border bg-card z-40">
            <div className="px-4 lg:px-5 py-3 flex flex-wrap gap-3 items-end">
              <FilterSelect id="filter-city" label="Miasto" value={city} onChange={setCity} options={CITIES} />
              <FilterSelect id="filter-type" label="Format nośnika" value={type} onChange={(value) => setType(value as CarrierType | "")} options={TYPES} />
              {hasFilters && <button type="button" onClick={clearAll} className="h-10 px-3 text-sm text-foreground hover:text-primary flex items-center gap-1.5 rounded-lg border border-border hover:border-primary/40 transition-all cursor-pointer" aria-label="Wyczyść wszystkie filtry"><X className="w-3.5 h-3.5" /> Wyczyść</button>}
              <div className="ml-auto hidden lg:block">
                <FilterSelect id="filter-sort" label="Sortuj wg" value={sortBy} onChange={(value) => setSortBy(value as SortKey)} options={["city", "type", "traffic"]} labels={["Miasta", "Formatu", "Ruchu"]} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Sidebar list - full screen on mobile list view */}
        <div className={`w-full lg:w-[400px] shrink-0 lg:border-r border-border bg-card flex flex-col overflow-hidden ${mobileView === "map" ? "hidden lg:flex" : "flex"}`}>
          <div className="lg:hidden px-4 py-2 border-b border-border flex items-center gap-2 text-sm shrink-0">
            <span className="font-bold text-foreground tabular-nums">{filtered.length}</span><span className="text-muted-foreground">nośników</span><span className="text-muted-foreground/50">·</span><span className="font-bold text-primary tabular-nums">{cityCount}</span><span className="text-muted-foreground">miast</span>
          </div>
          <AnimatePresence mode="wait">
            {selected ? <DetailPanel key={`sidebar-detail-${selected.id}`} carrier={selected} onBack={() => setSelected(null)} /> : <ListPanel key="sidebar-list" carriers={visibleCarriers} totalCount={filtered.length} hasMore={hasMoreResults} onLoadMore={() => setVisibleCount((current) => current + listStep)} onSelect={(carrier) => { setSelected(carrier); setMobileView("map"); }} subtitle="Kliknij, aby zobaczyć szczegóły nośnika." />}
          </AnimatePresence>
        </div>

        {/* Map + bottom panel */}
        <div className={`flex-1 flex-col bg-background overflow-hidden ${mobileView === "list" ? "hidden lg:flex" : "flex"}`}>
          {/* Map - responsive height */}
          <div className="relative h-[42vh] min-h-[260px] sm:h-[55vh] lg:h-auto lg:flex-1 overflow-hidden">
            <LeafletMap markers={mapMarkers} selectedId={selected?.id} onMarkerClick={handleMarkerClick} onViewportChange={handleViewportChange} autoFitKey={autoFitKey} />

            {/* Info chip - top-left */}
            <div className="absolute top-3 left-3 right-14 sm:right-auto bg-card/95 backdrop-blur-md border border-border shadow-lg rounded-xl px-3 py-2 z-20">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span className="text-sm font-heading font-bold text-foreground">{filtered.length} nośników</span>
                <span className="text-xs text-muted-foreground hidden sm:inline">w {cityCount} miastach</span>
              </div>
              {hiddenMarkerCount > 0 && (
                <div className="mt-0.5 text-[11px] text-muted-foreground">Przybliż, aby zobaczyć więcej (+{hiddenMarkerCount})</div>
              )}
            </div>

            {/* Legend - bottom-left */}
            <div className="absolute bottom-3 left-3 bg-card/95 backdrop-blur-md border border-border shadow-lg rounded-xl px-3 py-2 z-20" aria-label="Legenda mapy">
              <div className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground font-heading mb-1.5">Klasa</div>
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs">
                {TYPES.map((carrierType) => {
                  const cfg = TYPE_CFG[carrierType];
                  return (
                    <div key={carrierType} className="flex items-center gap-1.5 text-foreground">
                      <span className="relative inline-flex items-center justify-center w-3 h-3">
                        <span className="absolute w-3 h-3 rounded-full bg-white border-2" style={{ borderColor: cfg.color }} />
                        <span className="relative w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cfg.color }} />
                      </span>
                      {cfg.label}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Locate me button - bottom-right (above zoom control) */}
            <button type="button" className="absolute bottom-24 right-3 bg-card/95 backdrop-blur-md border border-border shadow-lg rounded-xl w-11 h-11 flex items-center justify-center z-20 text-foreground hover:text-primary hover:border-primary/40 transition-all cursor-pointer" title="Moja lokalizacja" aria-label="Pokaż moją lokalizację na mapie" onClick={() => { if ("geolocation" in navigator) navigator.geolocation.getCurrentPosition(() => {}); }}><Navigation className="w-4 h-4" /></button>

            {filtered.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center z-30 bg-background/60 backdrop-blur-sm">
                <div className="text-center p-6 max-w-xs">
                  <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-3">
                    <Search className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-base text-foreground font-heading font-semibold mb-1">Brak nośników</p>
                  <p className="text-sm text-muted-foreground mb-4">Zmień filtry lub wyszukaj inne miasto.</p>
                  <button type="button" onClick={clearAll} className="text-sm text-primary hover:text-primary/80 font-semibold cursor-pointer underline-offset-4 hover:underline">Wyczyść filtry</button>
                </div>
              </div>
            )}
          </div>

          {/* List panel below map - mobile only */}
          <div className="lg:hidden flex-1 min-h-[160px] border-t border-border bg-card overflow-hidden">
            <div className="px-4 py-2 border-b border-border flex items-center justify-between gap-3 text-sm shrink-0">
              <div className="min-w-0">
                <span className="font-heading font-bold text-foreground">{selected ? "Szczegóły nośnika" : "Nośniki w widoku"}</span>
                <p className="text-muted-foreground mt-0.5 text-xs">{selected ? "Mapa widoczna powyżej." : `${Math.min(visibleCarriers.length, filtered.length)} z ${filtered.length} wyników`}</p>
              </div>
              {!selected && <span className="inline-flex items-center gap-1 rounded-full bg-secondary/60 border border-border px-2 py-1 text-xs text-muted-foreground shrink-0">{typeCount} form.</span>}
            </div>
            <AnimatePresence mode="wait">
              {selected
                ? <DetailPanel key={`mobile-detail-${selected.id}`} carrier={selected} onBack={() => setSelected(null)} />
                : <ListPanel key="mobile-map-list" carriers={visibleCarriers} totalCount={filtered.length} hasMore={hasMoreResults} onLoadMore={() => setVisibleCount((current) => current + listStep)} onSelect={setSelected} subtitle="Powiązane z aktualnym widokiem mapy." />
              }
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

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
  onChange: (value: string) => void;
  options: string[];
  labels?: string[];
}) {
  return (
    <div className="min-w-[140px]">
      <label htmlFor={id} className="block text-[11px] tracking-[0.18em] uppercase text-muted-foreground mb-1 font-heading font-semibold">{label}</label>
      <select id={id} value={value} onChange={(event) => onChange(event.target.value)} className="w-full h-10 px-3 rounded-lg bg-input border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all cursor-pointer">
        <option value="">Wszystkie</option>
        {options.map((option, index) => <option key={option} value={option}>{labels?.[index] ?? option}</option>)}
      </select>
    </div>
  );
}
