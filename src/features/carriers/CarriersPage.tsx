"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import {
  ChevronLeft,
  Filter,
  Layers,
  MapPin,
  Navigation,
  Search,
  X,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import type { MapMarker, MapViewport } from "@/components/LeafletMap";
import { DetailPanel } from "@/features/carriers/DetailPanel";
import { ListPanel } from "@/features/carriers/ListPanel";
import {
  AVAILABILITY_CFG,
  LIST_PAGE_SIZE,
  MAP_PANEL_PAGE_SIZE,
  TYPE_CFG,
  carrierSearchText,
  deriveFilterOptions,
  distanceFromCenter,
  getMarkerBudget,
  isCarrierInsideBounds,
  normalizeSearchValue,
  type Carrier,
  type CarrierAvailability,
  type CarrierType,
  type SortKey,
} from "@/features/carriers/data";

const LeafletMap = dynamic(
  () => import("@/components/LeafletMap").then((mod) => mod.LeafletMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <motion.div
            className="h-10 w-10 rounded-full border-2 border-primary/30 border-t-primary"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
          />
          <span className="font-heading text-sm text-muted-foreground">
            Ładowanie mapy...
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
  const { cities, types, availability } = useMemo(
    () => deriveFilterOptions(carriers),
    [carriers]
  );
  const searchIndex = useMemo(
    () => new Map(carriers.map((carrier) => [carrier.id, carrierSearchText(carrier)])),
    [carriers]
  );

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [city, setCity] = useState("");
  const [format, setFormat] = useState("");
  const [type, setType] = useState<CarrierType | "">("");
  const [availabilityFilter, setAvailabilityFilter] = useState<CarrierAvailability | "">("");
  const [sortBy, setSortBy] = useState<SortKey>("relevance");
  const [selected, setSelected] = useState<Carrier | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [mobileView, setMobileView] = useState<"list" | "map">("map");
  const [visibleCount, setVisibleCount] = useState(LIST_PAGE_SIZE);
  const [mapViewport, setMapViewport] = useState<MapViewport | null>(null);
  const [viewportReadyForFiltering, setViewportReadyForFiltering] = useState(false);
  const [locateSignal, setLocateSignal] = useState(0);
  const [isDesktopLayout, setIsDesktopLayout] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedQuery(query), 220);
    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const syncLayout = () => setIsDesktopLayout(media.matches);

    syncLayout();
    media.addEventListener("change", syncLayout);
    return () => media.removeEventListener("change", syncLayout);
  }, []);

  const formats = useMemo(
    () =>
      [...new Set(carriers.map((carrier) => carrier.format).filter(Boolean))].sort((a, b) =>
        a.localeCompare(b, "pl")
      ),
    [carriers]
  );

  const filtered = useMemo(() => {
    const needle = normalizeSearchValue(debouncedQuery);
    const hasNeedle = needle.length > 0;

    const result = carriers.filter((carrier) => {
      if (city && carrier.city !== city) return false;
      if (format && carrier.format !== format) return false;
      if (type && carrier.type !== type) return false;
      if (availabilityFilter && carrier.availability !== availabilityFilter) return false;
      if (!hasNeedle) return true;
      return searchIndex.get(carrier.id)?.includes(needle) ?? false;
    });

    return [...result].sort((left, right) => {
      if (sortBy === "traffic") {
        return getCarrierTrafficValue(right) - getCarrierTrafficValue(left);
      }
      if (sortBy === "type") return left.type.localeCompare(right.type, "pl");
      if (sortBy === "city") return left.city.localeCompare(right.city, "pl");
      if (hasNeedle) {
        const leftScore = relevanceScore(left, needle);
        const rightScore = relevanceScore(right, needle);
        if (rightScore !== leftScore) return rightScore - leftScore;
      }
      const cityDiff = left.city.localeCompare(right.city, "pl");
      return cityDiff || getCarrierTrafficValue(right) - getCarrierTrafficValue(left);
    });
  }, [availabilityFilter, carriers, city, debouncedQuery, format, searchIndex, sortBy, type]);

  const autoFitKey = `${city}|${format}|${type}|${availabilityFilter}|${debouncedQuery}|${sortBy}|${filtered.length}`;

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
  }, [availabilityFilter, city, debouncedQuery, format, mobileView, sortBy, type]);

  const cityCount = new Set(filtered.map((carrier) => carrier.city)).size;
  const typeCount = new Set(filtered.map((carrier) => carrier.type)).size;
  const activeFilterCount = [city, format, type, availabilityFilter, debouncedQuery].filter(Boolean).length;
  const markerBudget = getMarkerBudget(mapViewport?.zoom ?? 6);
  const shouldRenderMap = isDesktopLayout || mobileView === "map";

  const handleViewportChange = useCallback((viewport: MapViewport) => {
    setMapViewport(viewport);
    setViewportReadyForFiltering(true);
  }, []);

  const boundedCarriers = useMemo(() => {
    if (!mapViewport || !viewportReadyForFiltering) return filtered;
    return filtered.filter((carrier) => isCarrierInsideBounds(carrier, mapViewport.bounds));
  }, [filtered, mapViewport, viewportReadyForFiltering]);

  const carriersForMapRanking = useMemo(
    () => (boundedCarriers.length > 0 || filtered.length === 0 ? boundedCarriers : filtered),
    [boundedCarriers, filtered]
  );

  const mapMarkers: MapMarker[] = useMemo(() => {
    const selectedCarrier = selected
      ? filtered.find((carrier) => carrier.id === selected.id) ?? null
      : null;
    const availableBudget = Math.max(1, markerBudget - (selectedCarrier ? 1 : 0));
    const clusterSource = selectedCarrier
      ? carriersForMapRanking.filter((carrier) => carrier.id !== selectedCarrier.id)
      : carriersForMapRanking;
    const clustered = buildMapMarkers(
      clusterSource,
      mapViewport?.zoom ?? 6,
      availableBudget,
      mapViewport?.center
    );

    if (!selectedCarrier) return clustered;
    return [carrierToMarker(selectedCarrier, true), ...clustered];
  }, [carriersForMapRanking, filtered, mapViewport, markerBudget, selected]);

  const mapFitPoints = useMemo(
    () => filtered.map((carrier) => ({ lat: carrier.lat, lng: carrier.lng })),
    [filtered]
  );

  const mapListSource =
    mobileView === "map" && viewportReadyForFiltering && boundedCarriers.length > 0
      ? boundedCarriers
      : filtered;
  const visibleCarriers = mapListSource.slice(0, visibleCount);
  const hasMoreResults = visibleCount < mapListSource.length;
  const renderedMarkerCarrierCount = mapMarkers.reduce(
    (sum, marker) => sum + (marker.count ?? 1),
    0
  );
  const hiddenMarkerCount = Math.max(0, carriersForMapRanking.length - renderedMarkerCarrierCount);
  const clusterMarkerCount = mapMarkers.filter((marker) => (marker.count ?? 1) > 1).length;

  const clearAll = () => {
    setCity("");
    setFormat("");
    setType("");
    setAvailabilityFilter("");
    setQuery("");
    setDebouncedQuery("");
    setSelected(null);
  };

  const handleSelectCarrier = useCallback((carrier: Carrier) => {
    setSelected(carrier);
    if (!isDesktopLayout) {
      setMobileView("map");
    }
  }, [isDesktopLayout]);

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
    <div className="flex h-[100dvh] flex-col overflow-hidden bg-background text-foreground">
      <header className="shrink-0 border-b border-border bg-card/95 px-3 py-2 shadow-sm lg:px-5">
        <div className="flex items-center gap-2 lg:gap-3">
          <Link
            href="/"
            className="flex h-10 min-w-[40px] items-center justify-center rounded-lg border border-border bg-secondary/50 text-foreground transition-colors hover:border-primary/35 hover:text-primary lg:h-11 lg:min-w-[44px]"
            aria-label="Wróć do strony głównej"
          >
            <ChevronLeft className="h-4 w-4" />
          </Link>

          <div className="min-w-0 flex-1 lg:min-w-[8.5rem] lg:flex-none">
            <h1 className="font-heading text-base font-black leading-tight text-foreground lg:text-lg">
              Nośniki
            </h1>
            <p className="hidden text-xs text-muted-foreground sm:block">
              Wyszukaj lokalizację, format albo klasę.
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground lg:hidden">
              {filtered.length} wyników
            </p>
          </div>

          <div className="relative hidden min-w-[280px] max-w-xl flex-1 lg:block">
            <SearchBox id="carrier-search-desktop" value={query} onChange={setQuery} />
          </div>

          <button
            type="button"
            onClick={() => setFiltersOpen((current) => !current)}
            className={`relative flex h-10 min-w-[40px] items-center justify-center gap-2 rounded-lg border px-3 text-sm font-semibold transition-colors cursor-pointer lg:h-11 lg:min-w-[44px] ${
              filtersOpen
                ? "border-primary/40 bg-primary/10 text-primary"
                : "border-border bg-secondary/55 text-foreground hover:border-primary/35"
            }`}
            aria-label="Pokaż filtry"
            aria-expanded={filtersOpen}
          >
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Filtry</span>
            {activeFilterCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-primary-foreground">
                {activeFilterCount}
              </span>
            )}
          </button>

          <div className="hidden items-center gap-2 rounded-lg border border-border bg-secondary/45 px-3 h-10 text-sm lg:flex">
            <span className="font-heading font-bold tabular-nums text-foreground">
              {filtered.length}
            </span>
            <span className="text-muted-foreground">nośników</span>
            <span className="text-muted-foreground/50">/</span>
            <span className="font-heading font-bold tabular-nums text-primary">
              {cityCount}
            </span>
            <span className="text-muted-foreground">miast</span>
          </div>

          <div className="hidden lg:block">
            <ThemeToggle />
          </div>
          <div className="lg:hidden">
            <ThemeToggle />
          </div>
        </div>

      </header>

      <AnimatePresence initial={false}>
        {filtersOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="shrink-0 overflow-hidden border-b border-border bg-card"
          >
            <div className="grid grid-cols-2 gap-3 px-3 py-3 lg:grid-cols-[1.2fr_1fr_1fr_1fr_1fr_auto] lg:items-end lg:px-5">
              <div className="col-span-2 lg:hidden">
                <SearchBox id="carrier-search-mobile" value={query} onChange={setQuery} />
              </div>
              <FilterSelect id="carrier-city" label="Miasto" value={city} onChange={setCity} options={cities} />
              <FilterSelect
                id="carrier-format"
                label="Format"
                value={format}
                onChange={setFormat}
                options={formats}
              />
              <FilterSelect
                id="carrier-type"
                label="Klasa"
                value={type}
                onChange={(value) => setType(value as CarrierType | "")}
                options={types}
                labels={types.map((item) => TYPE_CFG[item].label)}
              />
              <FilterSelect
                id="carrier-availability"
                label="Dostępność"
                value={availabilityFilter}
                onChange={(value) => setAvailabilityFilter(value as CarrierAvailability | "")}
                options={availability}
                labels={availability.map((item) => AVAILABILITY_CFG[item].label)}
              />
              <FilterSelect
                id="carrier-sort"
                label="Sortuj"
                value={sortBy}
                onChange={(value) => setSortBy(value as SortKey)}
                options={["relevance", "city", "type", "traffic"]}
                labels={["Trafność", "Miasto", "Klasa", "Ruch"]}
              />
              <button
                type="button"
                onClick={clearAll}
                disabled={activeFilterCount === 0}
                className="col-span-2 flex h-10 items-center justify-center gap-2 rounded-lg border border-border bg-secondary/45 px-3 text-sm font-semibold text-foreground transition-colors cursor-pointer hover:border-primary/35 hover:text-primary disabled:cursor-not-allowed disabled:opacity-45 lg:col-span-1"
              >
                <X className="h-4 w-4" />
                Wyczyść
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-0 flex flex-1 flex-col lg:grid lg:grid-cols-[430px_minmax(0,1fr)]">
        <aside className="hidden min-h-0 flex-1 flex-col overflow-hidden border-border bg-card lg:flex lg:border-r">
          <AnimatePresence mode="wait">
            {selected ? (
              <DetailPanel key={`sidebar-detail-${selected.id}`} carrier={selected} onBack={() => setSelected(null)} />
            ) : (
              <ListPanel
                key="sidebar-list"
                carriers={filtered.slice(0, visibleCount)}
                totalCount={filtered.length}
                hasMore={visibleCount < filtered.length}
                onLoadMore={() => setVisibleCount((current) => current + LIST_PAGE_SIZE)}
                onSelect={handleSelectCarrier}
                selectedId={null}
                subtitle={`${filtered.length} wyników, ${cityCount} miast, ${typeCount} klasy.`}
              />
            )}
          </AnimatePresence>
        </aside>

        <section className="relative min-h-0 flex-1 flex flex-col bg-background lg:overflow-hidden">
          <div className="relative h-[40dvh] min-h-[260px] max-h-[360px] shrink-0 overflow-hidden lg:h-auto lg:min-h-[260px] lg:max-h-none lg:flex-1">
            {shouldRenderMap ? (
              <LeafletMap
                markers={mapMarkers}
                selectedId={selected?.id}
                onMarkerClick={handleMarkerClick}
                onViewportChange={handleViewportChange}
                autoFitKey={autoFitKey}
                fitPoints={mapFitPoints}
                locateSignal={locateSignal}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-background" />
            )}

            <div className="absolute left-3 top-3 z-[1000] hidden max-w-[calc(100%-4.5rem)] rounded-lg border border-border bg-card/95 px-3 py-2 shadow-lg backdrop-blur-md lg:block">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-primary" />
                <span className="font-heading text-sm font-bold text-foreground">
                  {filtered.length} nośników
                </span>
                <span className="hidden text-xs text-muted-foreground sm:inline">
                  w {cityCount} miastach
                </span>
              </div>
              {(hiddenMarkerCount > 0 || clusterMarkerCount > 0) && (
                <div className="mt-0.5 text-[11px] text-muted-foreground">
                  {hiddenMarkerCount > 0
                    ? `Przybliż, aby zobaczyć więcej (+${hiddenMarkerCount})`
                    : "Przybliż, aby rozbić grupy"}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setLocateSignal((value) => value + 1)}
              className="absolute bottom-4 right-3 z-[1000] flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-card/95 text-foreground shadow-lg backdrop-blur-md transition-colors cursor-pointer hover:border-primary/40 hover:text-primary lg:bottom-32"
              title="Moja lokalizacja"
              aria-label="Pokaż moją lokalizację na mapie"
            >
              <Navigation className="h-4 w-4" />
            </button>

            <div className="absolute bottom-3 left-3 z-[1000] hidden rounded-lg border border-border bg-card/95 px-3 py-2 shadow-lg backdrop-blur-md lg:block">
              <div className="mb-1.5 flex items-center gap-1.5 font-heading text-[10px] uppercase tracking-label text-muted-foreground">
                <Layers className="h-3 w-3" />
                Klasa
              </div>
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-foreground">
                {types.map((carrierType) => {
                  const cfg = TYPE_CFG[carrierType];
                  return (
                    <span key={carrierType} className="inline-flex items-center gap-1.5">
                      <span className="relative inline-flex h-3 w-3 items-center justify-center rounded-full border-2 bg-card" style={{ borderColor: cfg.color }}>
                        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: cfg.color }} />
                      </span>
                      {cfg.label}
                    </span>
                  );
                })}
              </div>
            </div>

            {filtered.length === 0 && (
              <div className="absolute inset-0 z-[1000] flex items-center justify-center bg-background/70 p-6 backdrop-blur-sm">
                <div className="max-w-xs text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg border border-primary/20 bg-primary/10">
                    <Search className="h-5 w-5 text-primary" />
                  </div>
                  <p className="mb-1 font-heading text-base font-semibold text-foreground">
                    Brak nośników
                  </p>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Zmień filtry albo wyszukaj inne miasto.
                  </p>
                  <button
                    type="button"
                    onClick={clearAll}
                    className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
                  >
                    Wyczyść filtry
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="lg:hidden min-h-0 flex-1 overflow-y-auto overscroll-contain border-t border-border bg-background">
            <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
              <div className="min-w-0">
                <div className="font-heading text-base font-bold text-foreground">
                  {selected ? "Szczegóły nośnika" : "Nośniki w widoku"}
                </div>
                <div className="mt-0.5 truncate text-xs text-muted-foreground">
                  {selected
                    ? `${selected.city}, ${selected.address}`
                    : `${Math.min(visibleCarriers.length, mapListSource.length)} z ${mapListSource.length} wyników`}
                </div>
              </div>
              {!selected && (
                <span className="shrink-0 rounded-full border border-border bg-secondary/60 px-3 py-1.5 text-xs text-muted-foreground">
                  {typeCount} klas
                </span>
              )}
            </div>

            <AnimatePresence mode="wait">
              {selected ? (
                <DetailPanel key={`mobile-detail-${selected.id}`} carrier={selected} onBack={() => setSelected(null)} flow />
              ) : (
                <ListPanel
                  key="mobile-map-list"
                  compact
                  flow
                  showHeader={false}
                  carriers={visibleCarriers}
                  totalCount={mapListSource.length}
                  hasMore={hasMoreResults}
                  onLoadMore={() => setVisibleCount((current) => current + MAP_PANEL_PAGE_SIZE)}
                  onSelect={setSelected}
                  selectedId={null}
                  subtitle="Lista jest powiązana z aktualnym widokiem mapy."
                />
              )}
            </AnimatePresence>
          </div>
        </section>
      </div>
    </div>
  );
}

function SearchBox({
  id,
  value,
  onChange,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <label htmlFor={id} className="sr-only">
        Wyszukaj nośnik
      </label>
      <input
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Szukaj miasta, ulicy lub kodu..."
        className="h-10 w-full rounded-lg border border-border bg-input pl-9 pr-9 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary/45 focus:ring-2 focus:ring-primary/25"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-1 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors cursor-pointer hover:text-foreground"
          aria-label="Wyczyść wyszukiwanie"
        >
          <X className="h-4 w-4" />
        </button>
      )}
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
    <div className="min-w-0">
      <label htmlFor={id} className="mb-1 block font-heading text-[11px] font-semibold uppercase tracking-label text-muted-foreground">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 w-full rounded-lg border border-border bg-input px-3 text-sm text-foreground outline-none transition-all cursor-pointer focus:border-primary/45 focus:ring-2 focus:ring-primary/25"
      >
        <option value="">Wszystkie</option>
        {options.map((option, index) => (
          <option key={option} value={option}>
            {labels?.[index] ?? option}
          </option>
        ))}
      </select>
    </div>
  );
}

function relevanceScore(carrier: Carrier, needle: string): number {
  let score = 0;
  if (normalizeSearchValue(carrier.code).startsWith(needle)) score += 60;
  if (normalizeSearchValue(carrier.city).includes(needle)) score += 35;
  if (normalizeSearchValue(carrier.address).includes(needle)) score += 25;
  if (normalizeSearchValue(carrier.zip).includes(needle)) score += 20;
  return score;
}

function getCarrierTrafficValue(carrier: Carrier): number {
  return carrier.trafficEstimate?.dailyVehicles ?? carrier.traffic;
}

function buildMapMarkers(
  carriers: Carrier[],
  zoom: number,
  budget: number,
  center?: MapViewport["center"]
): MapMarker[] {
  if (budget <= 0 || carriers.length === 0) return [];

  const ranked = [...carriers].sort((left, right) => {
    const distanceDiff = distanceFromCenter(left, center) - distanceFromCenter(right, center);
    if (Math.abs(distanceDiff) > 0.005) return distanceDiff;
    return getCarrierTrafficValue(right) - getCarrierTrafficValue(left);
  });

  if (zoom >= 11.25) {
    return ranked.slice(0, budget).map((carrier) => carrierToMarker(carrier, false));
  }

  const cellSize = clusterCellSize(zoom);
  const buckets = new Map<string, ClusterBucket>();

  ranked.forEach((carrier) => {
    const key = `${Math.round(carrier.lat / cellSize)}:${Math.round(carrier.lng / cellSize)}`;
    const bucket =
      buckets.get(key) ??
      ({
        key,
        carriers: [],
        latSum: 0,
        lngSum: 0,
        count: 0,
        trafficSum: 0,
        cityCounts: new Map<string, number>(),
        typeCounts: new Map<CarrierType, number>(),
      } satisfies ClusterBucket);

    bucket.carriers.push(carrier);
    bucket.latSum += carrier.lat;
    bucket.lngSum += carrier.lng;
    bucket.trafficSum += getCarrierTrafficValue(carrier);
    bucket.count += 1;
    bucket.cityCounts.set(carrier.city, (bucket.cityCounts.get(carrier.city) ?? 0) + 1);
    bucket.typeCounts.set(carrier.type, (bucket.typeCounts.get(carrier.type) ?? 0) + 1);
    buckets.set(key, bucket);
  });

  return [...buckets.values()]
    .sort((left, right) => {
      if (zoom < 8 && left.count !== right.count) return right.count - left.count;
      const distanceDiff =
        distanceFromPoint(left.latSum / left.count, left.lngSum / left.count, center) -
        distanceFromPoint(right.latSum / right.count, right.lngSum / right.count, center);
      if (Math.abs(distanceDiff) > 0.005) return distanceDiff;
      return right.count - left.count;
    })
    .slice(0, budget)
    .map((bucket) => {
      if (bucket.count === 1) return carrierToMarker(bucket.carriers[0], false);

      const dominantType = dominantMapValue(bucket.typeCounts) ?? "STANDARD";
      return {
        id: `cluster:${bucket.key}`,
        lat: bucket.latSum / bucket.count,
        lng: bucket.lngSum / bucket.count,
        color: TYPE_CFG[dominantType].color,
        label: clusterLabel(bucket, dominantType),
        count: bucket.count,
      };
    });
}

function carrierToMarker(carrier: Carrier, selected: boolean): MapMarker {
  return {
    id: carrier.id,
    lat: carrier.lat,
    lng: carrier.lng,
    color: TYPE_CFG[carrier.type].color,
    label: markerLabel(carrier),
    selected,
  };
}

type ClusterBucket = {
  key: string;
  carriers: Carrier[];
  latSum: number;
  lngSum: number;
  count: number;
  trafficSum: number;
  cityCounts: Map<string, number>;
  typeCounts: Map<CarrierType, number>;
};

function clusterCellSize(zoom: number): number {
  if (zoom < 7) return 0.62;
  if (zoom < 8) return 0.36;
  if (zoom < 9.5) return 0.2;
  if (zoom < 10.75) return 0.08;
  return 0.035;
}

function distanceFromPoint(
  lat: number,
  lng: number,
  center?: MapViewport["center"]
): number {
  if (!center) return 0;
  const latDiff = lat - center.lat;
  const lngDiff = lng - center.lng;
  return Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);
}

function dominantMapValue<T extends string>(counts: Map<T, number>): T | null {
  let winner: T | null = null;
  let winnerCount = -1;

  counts.forEach((count, key) => {
    if (count > winnerCount) {
      winner = key;
      winnerCount = count;
    }
  });

  return winner;
}

function clusterLabel(bucket: ClusterBucket, dominantType: CarrierType): string {
  const topCity = dominantMapValue(bucket.cityCounts) ?? "Mapa";
  const cfg = TYPE_CFG[dominantType];
  const averageTraffic = Math.round(bucket.trafficSum / bucket.count / 1000);

  return [
    `<strong>${escapeHtml(topCity)}</strong>`,
    `${bucket.count} no\u015bnik\u00f3w w tym obszarze`,
    `<em>${escapeHtml(cfg.label)} / ~${averageTraffic}k ruchu dziennie</em>`,
  ].join("<br/>");
}

function markerLabel(carrier: Carrier): string {
  const cfg = TYPE_CFG[carrier.type];
  const trafficLine = carrier.trafficEstimate
    ? `<span>~${escapeHtml(formatTrafficValue(carrier.trafficEstimate.dailyVehicles))}</span>`
    : "";
  return [
    `<strong>${escapeHtml(carrier.code)}</strong>`,
    `${escapeHtml(carrier.city)}, ${escapeHtml(carrier.address)}`,
    trafficLine,
    `<em>${escapeHtml(cfg.label)} / ${escapeHtml(carrier.format)}</em>`,
  ].filter(Boolean).join("<br/>");
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatTrafficValue(value: number): string {
  return `${value.toLocaleString("pl-PL")} poj./dobę`;
}
