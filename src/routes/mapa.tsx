import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Filter, X, ChevronDown, Eye, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/mapa")({
  head: () => ({
    meta: [
      { title: "Mapa nośników — wielkiformat.pl" },
      { name: "description", content: "Interaktywna mapa billboardów i nośników reklamowych w całej Polsce. Sprawdź dostępność i lokalizację." },
      { property: "og:title", content: "Mapa nośników — wielkiformat.pl" },
      { property: "og:description", content: "Interaktywna mapa nośników reklamowych w całej Polsce." },
    ],
  }),
  component: MapPage,
});

type CarrierStatus = "dostępny" | "zarezerwowany" | "zajęty";

interface Carrier {
  id: string;
  name: string;
  city: string;
  region: string;
  type: string;
  format: string;
  status: CarrierStatus;
  lat: number;
  lng: number;
}

const mockCarriers: Carrier[] = [
  { id: "1", name: "WAW-S12-001", city: "Warszawa", region: "Mazowieckie", type: "Super 12", format: "4×3 m", status: "dostępny", lat: 52.23, lng: 21.01 },
  { id: "2", name: "WAW-S18-002", city: "Warszawa", region: "Mazowieckie", type: "Super 18", format: "6×3 m", status: "zarezerwowany", lat: 52.25, lng: 20.98 },
  { id: "3", name: "KRK-S12-003", city: "Kraków", region: "Małopolskie", type: "Super 12", format: "4×3 m", status: "dostępny", lat: 50.06, lng: 19.94 },
  { id: "4", name: "KRK-S36-004", city: "Kraków", region: "Małopolskie", type: "Super 36", format: "12×3 m", status: "dostępny", lat: 50.08, lng: 19.92 },
  { id: "5", name: "WRO-S18-005", city: "Wrocław", region: "Dolnośląskie", type: "Super 18", format: "6×3 m", status: "zajęty", lat: 51.11, lng: 17.04 },
  { id: "6", name: "POZ-MXL-006", city: "Poznań", region: "Wielkopolskie", type: "Monster XXL", format: "18×4 m", status: "dostępny", lat: 52.41, lng: 16.93 },
  { id: "7", name: "GDA-S12-007", city: "Gdańsk", region: "Pomorskie", type: "Super 12", format: "4×3 m", status: "dostępny", lat: 54.35, lng: 18.65 },
  { id: "8", name: "KAT-S18-008", city: "Katowice", region: "Śląskie", type: "Super 18", format: "6×3 m", status: "zarezerwowany", lat: 50.26, lng: 19.02 },
  { id: "9", name: "LOD-S36-009", city: "Łódź", region: "Łódzkie", type: "Super 36", format: "12×3 m", status: "dostępny", lat: 51.76, lng: 19.46 },
  { id: "10", name: "SZC-S12-010", city: "Szczecin", region: "Zachodniopomorskie", type: "Super 12", format: "4×3 m", status: "dostępny", lat: 53.43, lng: 14.55 },
  { id: "11", name: "LUB-S18-011", city: "Lublin", region: "Lubelskie", type: "Super 18", format: "6×3 m", status: "dostępny", lat: 51.25, lng: 22.57 },
  { id: "12", name: "BIA-MXL-012", city: "Białystok", region: "Podlaskie", type: "Monster XXL", format: "18×4 m", status: "zajęty", lat: 53.13, lng: 23.16 },
];

const cities = [...new Set(mockCarriers.map((c) => c.city))].sort();
const types = [...new Set(mockCarriers.map((c) => c.type))].sort();
const statuses: CarrierStatus[] = ["dostępny", "zarezerwowany", "zajęty"];

const statusColors: Record<CarrierStatus, string> = {
  dostępny: "bg-green-500",
  zarezerwowany: "bg-yellow-500",
  zajęty: "bg-red-500",
};

function MapPage() {
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedCarrier, setSelectedCarrier] = useState<Carrier | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    return mockCarriers.filter((c) => {
      if (selectedCity && c.city !== selectedCity) return false;
      if (selectedType && c.type !== selectedType) return false;
      if (selectedStatus && c.status !== selectedStatus) return false;
      return true;
    });
  }, [selectedCity, selectedType, selectedStatus]);

  const clearFilters = () => {
    setSelectedCity("");
    setSelectedType("");
    setSelectedStatus("");
  };

  const hasFilters = selectedCity || selectedType || selectedStatus;

  return (
    <div className="h-[calc(100vh-4rem)] lg:h-[calc(100vh-5rem)] flex flex-col">
      {/* Top bar */}
      <div className="bg-surface border-b border-border px-4 py-3 flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          <h1 className="font-heading font-bold text-lg text-foreground">Mapa nośników</h1>
          <span className="text-sm text-muted-foreground hidden sm:inline">({filtered.length} nośników)</span>
        </div>
        <button
          onClick={() => setFiltersOpen(!filtersOpen)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary text-sm text-secondary-foreground hover:bg-secondary/80 transition-colors"
        >
          <Filter className="w-4 h-4" />
          Filtry
          {hasFilters && <span className="w-2 h-2 rounded-full bg-primary" />}
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${filtersOpen ? "rotate-180" : ""}`} />
        </button>
      </div>

      {/* Filters */}
      {filtersOpen && (
        <div className="bg-surface border-b border-border px-4 py-4 shrink-0">
          <div className="flex flex-wrap gap-3 items-end">
            <div className="flex-1 min-w-[150px]">
              <label className="block text-xs text-muted-foreground mb-1">Miasto</label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full h-9 px-3 rounded-lg bg-input border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="">Wszystkie</option>
                {cities.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex-1 min-w-[150px]">
              <label className="block text-xs text-muted-foreground mb-1">Typ nośnika</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full h-9 px-3 rounded-lg bg-input border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="">Wszystkie</option>
                {types.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="flex-1 min-w-[150px]">
              <label className="block text-xs text-muted-foreground mb-1">Dostępność</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full h-9 px-3 rounded-lg bg-input border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="">Wszystkie</option>
                {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            {hasFilters && (
              <button onClick={clearFilters} className="h-9 px-3 text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                <X className="w-3.5 h-3.5" /> Wyczyść
              </button>
            )}
          </div>
        </div>
      )}

      {/* Map + sidebar */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Map area */}
        <div className="flex-1 relative bg-background overflow-hidden">
          {/* Poland SVG simplified map */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full max-w-2xl aspect-[3/4] p-8">
              {/* Poland outline simplified */}
              <svg viewBox="0 0 400 450" className="w-full h-full" fill="none">
                <path
                  d="M100,50 L150,30 L200,25 L250,30 L300,50 L340,80 L360,130 L370,180 L380,230 L370,280 L350,320 L320,360 L280,390 L240,410 L200,420 L160,410 L120,390 L80,360 L50,320 L30,280 L20,230 L25,180 L40,130 L60,80 Z"
                  fill="oklch(0.15 0.005 0)"
                  stroke="oklch(0.25 0.005 0)"
                  strokeWidth="1"
                />
              </svg>

              {/* Carrier pins */}
              {filtered.map((carrier) => {
                const x = ((carrier.lng - 14) / (24 - 14)) * 80 + 10;
                const y = ((55 - carrier.lat) / (55 - 49)) * 80 + 10;
                return (
                  <button
                    key={carrier.id}
                    onClick={() => setSelectedCarrier(carrier)}
                    className={`absolute w-4 h-4 rounded-full border-2 border-background transition-all hover:scale-150 ${
                      statusColors[carrier.status]
                    } ${selectedCarrier?.id === carrier.id ? "scale-150 ring-2 ring-primary" : ""}`}
                    style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
                    title={`${carrier.name} — ${carrier.city}`}
                  />
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-3 flex gap-4">
            {statuses.map((s) => (
              <div key={s} className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className={`w-2.5 h-2.5 rounded-full ${statusColors[s]}`} />
                {s}
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar / detail panel */}
        <div className="lg:w-96 border-t lg:border-t-0 lg:border-l border-border bg-surface overflow-y-auto">
          {selectedCarrier ? (
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="font-heading font-bold text-lg text-foreground">{selectedCarrier.name}</h2>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5" /> {selectedCarrier.city}, {selectedCarrier.region}
                  </p>
                </div>
                <button onClick={() => setSelectedCarrier(null)} className="p-1 text-muted-foreground hover:text-foreground">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Preview */}
              <div className="aspect-[16/10] bg-secondary rounded-lg flex items-center justify-center mb-4">
                <Eye className="w-8 h-8 text-muted-foreground/30" />
              </div>

              {/* Details */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Typ nośnika</span>
                  <span className="text-foreground font-medium">{selectedCarrier.type}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Format</span>
                  <span className="text-foreground font-medium">{selectedCarrier.format}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Status</span>
                  <span className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${statusColors[selectedCarrier.status]}`} />
                    <span className="text-foreground font-medium capitalize">{selectedCarrier.status}</span>
                  </span>
                </div>
              </div>

              <Button variant="cta" className="w-full" size="lg">
                Zapytaj o ten nośnik
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="p-6">
              <h2 className="font-heading font-semibold text-foreground mb-4">Lista nośników</h2>
              <div className="space-y-2">
                {filtered.map((carrier) => (
                  <button
                    key={carrier.id}
                    onClick={() => setSelectedCarrier(carrier)}
                    className="w-full text-left p-3 rounded-lg bg-card border border-border hover:border-primary/30 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-foreground">{carrier.name}</div>
                        <div className="text-xs text-muted-foreground">{carrier.city} · {carrier.type}</div>
                      </div>
                      <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${statusColors[carrier.status]}`} />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
