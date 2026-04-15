import type { MapViewport } from "@/components/LeafletMap";

export type CarrierType = "Super 12" | "Super 18" | "Super 36" | "Monster XXL";
export type SortKey = "city" | "type" | "traffic";

export interface Carrier {
  id: string;
  code: string;
  city: string;
  address: string;
  region: string;
  type: CarrierType;
  format: string;
  lat: number;
  lng: number;
  traffic: number;
  visibility: number;
  lit: boolean;
  image: string;
}

export const CARRIERS: Carrier[] = [
  { id: "1", code: "WAW-S12-001", city: "Warszawa", address: "al. Jerozolimskie 120", region: "Mazowieckie", type: "Super 12", format: "4×3 m", lat: 52.229, lng: 21.003, traffic: 45000, visibility: 92, lit: true, image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&auto=format&fit=crop&q=60" },
  { id: "2", code: "WAW-S18-002", city: "Warszawa", address: "ul. Marszałkowska 85", region: "Mazowieckie", type: "Super 18", format: "6×3 m", lat: 52.235, lng: 20.985, traffic: 62000, visibility: 97, lit: true, image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&auto=format&fit=crop&q=60" },
  { id: "3", code: "WAW-S36-003", city: "Warszawa", address: "ul. Puławska 300", region: "Mazowieckie", type: "Super 36", format: "12×3 m", lat: 52.17, lng: 21.02, traffic: 51000, visibility: 94, lit: true, image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&auto=format&fit=crop&q=60" },
  { id: "4", code: "KRK-S12-004", city: "Kraków", address: "al. Krasińskiego 22", region: "Małopolskie", type: "Super 12", format: "4×3 m", lat: 50.065, lng: 19.937, traffic: 38000, visibility: 88, lit: true, image: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=400&auto=format&fit=crop&q=60" },
  { id: "5", code: "KRK-S36-005", city: "Kraków", address: "Rondo Mogilskie", region: "Małopolskie", type: "Super 36", format: "12×3 m", lat: 50.072, lng: 19.955, traffic: 55000, visibility: 95, lit: true, image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400&auto=format&fit=crop&q=60" },
  { id: "6", code: "WRO-S18-006", city: "Wrocław", address: "pl. Grunwaldzki 1", region: "Dolnośląskie", type: "Super 18", format: "6×3 m", lat: 51.11, lng: 17.04, traffic: 41000, visibility: 90, lit: false, image: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=400&auto=format&fit=crop&q=60" },
  { id: "7", code: "POZ-MXL-007", city: "Poznań", address: "ul. Królowej Jadwigi 5", region: "Wielkopolskie", type: "Monster XXL", format: "18×4 m", lat: 52.41, lng: 16.93, traffic: 72000, visibility: 99, lit: true, image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&auto=format&fit=crop&q=60" },
  { id: "8", code: "GDA-S12-008", city: "Gdańsk", address: "al. Grunwaldzka 411", region: "Pomorskie", type: "Super 12", format: "4×3 m", lat: 54.372, lng: 18.618, traffic: 35000, visibility: 85, lit: true, image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=400&auto=format&fit=crop&q=60" },
  { id: "9", code: "KAT-S18-009", city: "Katowice", address: "al. Roździeńskiego 1", region: "Śląskie", type: "Super 18", format: "6×3 m", lat: 50.265, lng: 19.023, traffic: 48000, visibility: 91, lit: true, image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&auto=format&fit=crop&q=60" },
  { id: "10", code: "LOD-S36-010", city: "Łódź", address: "al. Piłsudskiego 135", region: "Łódzkie", type: "Super 36", format: "12×3 m", lat: 51.76, lng: 19.46, traffic: 52000, visibility: 93, lit: true, image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&auto=format&fit=crop&q=60" },
  { id: "11", code: "SZC-S12-011", city: "Szczecin", address: "al. Wojska Polskiego 64", region: "Zachodniopomorskie", type: "Super 12", format: "4×3 m", lat: 53.43, lng: 14.55, traffic: 29000, visibility: 82, lit: false, image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=400&auto=format&fit=crop&q=60" },
  { id: "12", code: "LUB-S18-012", city: "Lublin", address: "al. Racławickie 20", region: "Lubelskie", type: "Super 18", format: "6×3 m", lat: 51.25, lng: 22.57, traffic: 31000, visibility: 86, lit: true, image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&auto=format&fit=crop&q=60" },
  { id: "13", code: "BIA-MXL-013", city: "Białystok", address: "ul. Lipowa 1", region: "Podlaskie", type: "Monster XXL", format: "18×4 m", lat: 53.13, lng: 23.16, traffic: 67000, visibility: 98, lit: true, image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&auto=format&fit=crop&q=60" },
  { id: "14", code: "RZE-S12-014", city: "Rzeszów", address: "al. Piłsudskiego 32", region: "Podkarpackie", type: "Super 12", format: "4×3 m", lat: 50.04, lng: 21.99, traffic: 27000, visibility: 84, lit: true, image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&auto=format&fit=crop&q=60" },
  { id: "15", code: "BYD-S18-015", city: "Bydgoszcz", address: "ul. Gdańska 10", region: "Kujawsko-Pomorskie", type: "Super 18", format: "6×3 m", lat: 53.12, lng: 18.01, traffic: 33000, visibility: 87, lit: true, image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=400&auto=format&fit=crop&q=60" },
];

export const CITIES = [...new Set(CARRIERS.map((carrier) => carrier.city))].sort();
export const TYPES = [...new Set(CARRIERS.map((carrier) => carrier.type))].sort() as CarrierType[];
export const LIST_PAGE_SIZE = 12;
export const MAP_PANEL_PAGE_SIZE = 6;

export const TYPE_CFG: Record<CarrierType, { dot: string; pill: string; label: string; color: string }> = {
  "Super 12": { dot: "bg-sky-400", pill: "bg-sky-400/10 text-sky-300 ring-sky-400/20", label: "Super 12", color: "#38bdf8" },
  "Super 18": { dot: "bg-amber-400", pill: "bg-amber-400/10 text-amber-300 ring-amber-400/20", label: "Super 18", color: "#fbbf24" },
  "Super 36": { dot: "bg-rose-400", pill: "bg-rose-400/10 text-rose-300 ring-rose-400/20", label: "Super 36", color: "#fb7185" },
  "Monster XXL": { dot: "bg-emerald-400", pill: "bg-emerald-400/10 text-emerald-300 ring-emerald-400/20", label: "Monster XXL", color: "#34d399" },
};

export function getMarkerBudget(zoom: number) {
  if (zoom < 6.5) return 18;
  if (zoom < 8) return 32;
  if (zoom < 9.5) return 64;
  if (zoom < 11) return 120;
  return 220;
}

export function isCarrierInsideBounds(
  carrier: Carrier,
  bounds: MapViewport["bounds"]
) {
  return carrier.lat >= bounds.south && carrier.lat <= bounds.north && carrier.lng >= bounds.west && carrier.lng <= bounds.east;
}

export function distanceFromCenter(
  carrier: Carrier,
  center?: MapViewport["center"]
) {
  if (!center) return 0;
  const latDiff = carrier.lat - center.lat;
  const lngDiff = carrier.lng - center.lng;
  return Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);
}
