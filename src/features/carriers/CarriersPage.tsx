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
  CARRIERS,
  CITIES,
  LIST_PAGE_SIZE,
  MAP_PANEL_PAGE_SIZE,
  TYPE_CFG,
  TYPES,
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
          <span className="text-xs text-muted-foreground/50 font-heading">
            Ładowanie mapy…
          </span>
        </div>
      </div>
    ),
  }
);

export default function CarriersPage() {
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
    let result = CARRIERS.filter((carrier) => {
      if (city && carrier.city !== city) return false;
      if (type && carrier.type !== type) return false;
      if (!debouncedQuery) return true;
      const normalized = debouncedQuery.toLowerCase();
      return carrier.city.toLowerCase().includes(normalized) || carrier.code.toLowerCase().includes(normalized) || carrier.address.toLowerCase().includes(normalized);
    });

    result = [...result].sort((left, right) => {
      if (sortBy === "city") return left.city.localeCompare(right.city);
      if (sortBy === "type") return left.type.localeCompare(right.type);
      return right.traffic - left.traffic;
    });

    return result;
  }, [city, type, debouncedQuery, sortBy]);

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
        label: `<strong>${carrier.code}</strong><br/>${carrier.city}, ${carrier.address}<br/><em>${carrier.type} · ${carrier.format}</em>`,
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
      <header className="h-14 lg:h-16 bg-surface/95 backdrop-blur-xl border-b border-border/40 flex items-center px-4 lg:px-5 gap-3 shrink-0 z-50">
        <Link href="/" className="flex items-center shrink-0 mr-2" aria-label="wielkiformat.pl - Strona główna">
          <span className="font-heading font-bold text-sm text-foreground hidden md:block">Mapa nośników</span>
        </Link>
        <div className="w-px h-6 bg-border/40 hidden md:block" />

        <div className="flex-1 max-w-md relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
          <label htmlFor="carrier-search" className="sr-only">Wyszukaj nośnik</label>
          <input id="carrier-search" value={query} onChange={(event) => handleSearch(event.target.value)} placeholder="Szukaj miasta, adresu lub kodu…" className="w-full h-9 pl-9 pr-8 rounded-lg bg-input/50 border border-border/40 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
          {query && <button type="button" onClick={() => handleSearch("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center -mr-2" aria-label="Wyczyść wyszukiwanie"><X className="w-3.5 h-3.5" /></button>}
        </div>

        <button type="button" onClick={() => setFiltersOpen((current) => !current)} className={`flex items-center gap-1.5 px-3 min-h-[44px] rounded-lg text-xs font-medium border transition-all cursor-pointer ${filtersOpen ? "bg-primary/10 text-primary border-primary/20" : "bg-secondary/50 text-secondary-foreground border-border/40 hover:bg-secondary"}`} aria-label="Pokaż filtry" aria-expanded={filtersOpen}>
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Filtry</span>
          {hasFilters && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
        </button>

        <div className="hidden lg:flex items-center gap-2 px-3 h-9 rounded-lg glass text-xs">
          <span className="font-bold text-foreground">{filtered.length}</span>
          <span className="text-muted-foreground/60">nośników</span>
          <span className="text-muted-foreground/30">·</span>
          <span className="font-bold text-primary">{cityCount}</span>
          <span className="text-muted-foreground/60">miast</span>
        </div>

        <button type="button" onClick={() => setMobileView(mobileView === "map" ? "list" : "map")} className="lg:hidden flex items-center gap-1.5 px-3 min-h-[44px] rounded-lg text-xs font-medium bg-secondary/50 border border-border/40 cursor-pointer" aria-label={mobileView === "map" ? "Pokaż listę nośników" : "Pokaż mapę"}>
          {mobileView === "map" ? <><List className="w-3.5 h-3.5" /> Lista</> : <><MapIcon className="w-3.5 h-3.5" /> Mapa</>}
        </button>

        <Link href="/" className="hidden lg:flex items-center gap-1 px-3 h-9 rounded-lg text-xs text-muted-foreground hover:text-foreground transition-colors">← Strona główna</Link>
      </header>

      <AnimatePresence>
        {filtersOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden border-b border-border/40 bg-surface/90 backdrop-blur-xl z-40">
            <div className="px-4 lg:px-5 py-3 flex flex-wrap gap-3 items-end">
              <FilterSelect id="filter-city" label="Miasto" value={city} onChange={setCity} options={CITIES} />
              <FilterSelect id="filter-type" label="Format nośnika" value={type} onChange={(value) => setType(value as CarrierType | "")} options={TYPES} />
              {hasFilters && <button type="button" onClick={clearAll} className="h-8 px-3 text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 rounded-lg hover:bg-secondary/50 transition-all cursor-pointer min-h-[44px]" aria-label="Wyczyść wszystkie filtry"><X className="w-3 h-3" /> Wyczyść filtry</button>}
              <div className="ml-auto hidden lg:block">
                <FilterSelect id="filter-sort" label="Sortuj wg" value={sortBy} onChange={(value) => setSortBy(value as SortKey)} options={["city", "type", "traffic"]} labels={["Miasta", "Formatu", "Ruchu"]} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Sidebar list - full screen on mobile list view */}
        <div className={`w-full lg:w-[380px] shrink-0 lg:border-r border-border/40 bg-surface/95 lg:backdrop-blur-xl flex flex-col overflow-hidden ${mobileView === "map" ? "hidden lg:flex" : "flex"}`}>
          <div className="lg:hidden px-4 py-2 border-b border-border/30 flex items-center gap-2 text-xs shrink-0">
            <span className="font-bold text-foreground">{filtered.length}</span><span className="text-muted-foreground/60">nośników</span><span className="text-muted-foreground/30">·</span><span className="font-bold text-primary">{cityCount}</span><span className="text-muted-foreground/60">miast</span>
          </div>
          <AnimatePresence mode="wait">
            {selected ? <DetailPanel key={`sidebar-detail-${selected.id}`} carrier={selected} onBack={() => setSelected(null)} /> : <ListPanel key="sidebar-list" carriers={visibleCarriers} totalCount={filtered.length} hasMore={hasMoreResults} onLoadMore={() => setVisibleCount((current) => current + listStep)} onSelect={(carrier) => { setSelected(carrier); setMobileView("map"); }} subtitle="Kliknij, aby zobaczyć szczegóły nośnika." />}
          </AnimatePresence>
        </div>

        {/* Map + bottom panel */}
        <div className={`flex-1 flex-col bg-background overflow-hidden ${mobileView === "list" ? "hidden lg:flex" : "flex"}`}>
          {/* Map - responsive height */}
          <div className="relative h-[42vh] min-h-[200px] sm:h-[50vh] lg:h-auto lg:flex-1 overflow-hidden">
            <LeafletMap markers={mapMarkers} selectedId={selected?.id} onMarkerClick={handleMarkerClick} onViewportChange={handleViewportChange} autoFitKey={autoFitKey} />
            {/* Legend - compact on narrow screens */}
            <div className="absolute bottom-3 left-3 glass rounded-lg px-2 py-1.5 sm:px-3 sm:py-2 flex flex-wrap gap-x-3 sm:gap-x-4 gap-y-1 z-20 text-[10px] sm:text-[11px]" aria-label="Legenda mapy">
              {TYPES.map((carrierType) => (
                <div key={carrierType} className="flex items-center gap-1.5 text-muted-foreground">
                  <span className={`w-2 h-2 rounded-full ${TYPE_CFG[carrierType].dot}`} />
                  <span className="hidden sm:inline">{carrierType}</span>
                  <span className="sm:hidden">{carrierType.replace("Super ", "S").replace("Monster XXL", "XXL")}</span>
                </div>
              ))}
            </div>
            {/* Map label */}
            <div className="absolute top-3 left-3 right-14 sm:right-auto glass rounded-lg px-2 py-1.5 sm:px-3 sm:py-2 z-20">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary shrink-0" />
                <span className="text-xs font-heading font-bold text-foreground">Mapa nośników</span>
                <span className="text-[10px] text-muted-foreground/50">{filtered.length}</span>
              </div>
              {hiddenMarkerCount > 0 && (
                <div className="mt-1 text-[9px] sm:text-[10px] text-muted-foreground/60">Przybliż, aby zobaczyć więcej (+{hiddenMarkerCount})</div>
              )}
            </div>
            <button type="button" className="absolute bottom-3 right-3 glass rounded-lg min-w-[44px] min-h-[44px] flex items-center justify-center z-20 text-muted-foreground hover:text-primary transition-colors cursor-pointer" title="Moja lokalizacja" aria-label="Pokaż moją lokalizację na mapie" onClick={() => { if ("geolocation" in navigator) navigator.geolocation.getCurrentPosition(() => {}); }}><Navigation className="w-4 h-4" /></button>
            {filtered.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center z-30 bg-background/60 backdrop-blur-sm">
                <div className="text-center p-6">
                  <Search className="w-8 h-8 text-muted-foreground/20 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground font-heading font-semibold mb-1">Brak nośników</p>
                  <p className="text-xs text-muted-foreground/50 mb-3">Zmień filtry lub wyszukaj inne miasto.</p>
                  <button type="button" onClick={clearAll} className="text-xs text-primary hover:text-primary/80 font-medium cursor-pointer">Wyczyść filtry</button>
                </div>
              </div>
            )}
          </div>

          {/* List panel below map - mobile only */}
          <div className="lg:hidden flex-1 min-h-[160px] border-t border-border/30 bg-surface/95 overflow-hidden">
            <div className="px-4 py-2 border-b border-border/30 flex items-center justify-between gap-3 text-xs shrink-0">
              <div className="min-w-0">
                <span className="font-heading font-bold text-foreground">{selected ? "Szczegóły nośnika" : "Nośniki w widoku"}</span>
                <p className="text-muted-foreground/50 mt-0.5 text-[10px]">{selected ? "Mapa widoczna powyżej." : `${Math.min(visibleCarriers.length, filtered.length)} z ${filtered.length} wyników`}</p>
              </div>
              {!selected && <span className="inline-flex items-center gap-1 rounded-full bg-secondary/60 px-2 py-1 text-[10px] text-muted-foreground shrink-0">{typeCount} form.</span>}
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
    <div className="min-w-[130px]">
      <label htmlFor={id} className="block text-[10px] tracking-wider uppercase text-muted-foreground/50 mb-1 font-heading">{label}</label>
      <select id={id} value={value} onChange={(event) => onChange(event.target.value)} className="w-full h-8 px-2.5 rounded-lg bg-input/50 border border-border/40 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all cursor-pointer min-h-[44px]">
        <option value="">Wszystkie</option>
        {options.map((option, index) => <option key={option} value={option}>{labels?.[index] ?? option}</option>)}
      </select>
    </div>
  );
}
