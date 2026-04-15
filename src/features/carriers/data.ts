import type { MapViewport } from "@/components/LeafletMap";

export type CarrierType = "SUPER PREMIUM" | "PREMIUM" | "STANDARD";
export type SortKey = "city" | "type" | "traffic";

export interface Carrier {
  id: string;
  code: string;
  city: string;
  address: string;
  region: string;
  type: CarrierType;
  format: string;
  description: string;
  lat: number;
  lng: number;
  traffic: number;
  visibility: number;
  lit: boolean;
  image: string | null;
  zip: string;
}

export const LIST_PAGE_SIZE = 12;
export const MAP_PANEL_PAGE_SIZE = 6;

export const TYPE_CFG: Record<CarrierType, { dot: string; pill: string; label: string; color: string }> = {
  "SUPER PREMIUM": { dot: "bg-rose-400", pill: "bg-rose-400/10 text-rose-300 ring-rose-400/20", label: "Super Premium", color: "#fb7185" },
  "PREMIUM": { dot: "bg-amber-400", pill: "bg-amber-400/10 text-amber-300 ring-amber-400/20", label: "Premium", color: "#fbbf24" },
  "STANDARD": { dot: "bg-sky-400", pill: "bg-sky-400/10 text-sky-300 ring-sky-400/20", label: "Standard", color: "#38bdf8" },
};

const SEGMENT_DEFAULTS: Record<CarrierType, { traffic: number; visibility: number; lit: boolean }> = {
  "SUPER PREMIUM": { traffic: 55000, visibility: 95, lit: true },
  "PREMIUM": { traffic: 38000, visibility: 88, lit: true },
  "STANDARD": { traffic: 22000, visibility: 80, lit: false },
};

// Rough voivodeship mapping by ZIP prefix (first two digits). Accurate enough
// for display in the detail panel; edge cases fall back to a generic label.
const ZIP_REGION: Array<[number, number, string]> = [
  [0, 9, "Mazowieckie"],
  [10, 14, "Warmińsko-Mazurskie"],
  [15, 19, "Podlaskie"],
  [20, 24, "Lubelskie"],
  [25, 29, "Świętokrzyskie"],
  [30, 34, "Małopolskie"],
  [35, 39, "Podkarpackie"],
  [40, 44, "Śląskie"],
  [45, 49, "Opolskie"],
  [50, 59, "Dolnośląskie"],
  [60, 64, "Wielkopolskie"],
  [65, 69, "Lubuskie"],
  [70, 78, "Zachodniopomorskie"],
  [80, 84, "Pomorskie"],
  [85, 89, "Kujawsko-Pomorskie"],
  [90, 99, "Łódzkie"],
];

function regionFromZip(zip: string): string {
  const prefix = Number(zip.slice(0, 2));
  if (Number.isNaN(prefix)) return "Polska";
  const hit = ZIP_REGION.find(([lo, hi]) => prefix >= lo && prefix <= hi);
  return hit ? hit[2] : "Polska";
}

function titleCase(value: string): string {
  return value
    .toLocaleLowerCase("pl-PL")
    .split(/(\s+|-)/)
    .map((part) => (/^\s+$|^-$/.test(part) ? part : part.charAt(0).toLocaleUpperCase("pl-PL") + part.slice(1)))
    .join("");
}

function parseAttributes(raw: string): Record<string, string> {
  const attrs: Record<string, string> = {};
  const re = /([\w:]+)\s*=\s*"([^"]*)"/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(raw)) !== null) {
    attrs[match[1]] = match[2];
  }
  return attrs;
}

function formatFromDimensions(attrs: Record<string, string>): string {
  const w = attrs.Width || attrs.BannerWidth;
  const h = attrs.Height || attrs.BannerHeight;
  if (!w || !h) return "—";
  const fmt = (value: string) => value.replace(",", ".");
  return `${fmt(w)} × ${fmt(h)} m`;
}

function normalizeSegment(raw: string): CarrierType {
  const upper = raw.trim().toUpperCase();
  if (upper === "SUPER PREMIUM") return "SUPER PREMIUM";
  if (upper === "PREMIUM") return "PREMIUM";
  return "STANDARD";
}

export function parseBillboardsXml(xml: string): Carrier[] {
  const rows = xml.matchAll(/<row\b([\s\S]*?)\/>/g);
  const carriers: Carrier[] = [];

  for (const row of rows) {
    const attrs = parseAttributes(row[1]);
    if (!attrs.BillboardID || !attrs.Latitude || !attrs.Longitude) continue;

    const lat = Number(attrs.Latitude);
    const lng = Number(attrs.Longitude);
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) continue;

    const type = normalizeSegment(attrs.SegmentName ?? "");
    const defaults = SEGMENT_DEFAULTS[type];
    const townRaw = (attrs.TownName ?? "").trim();
    const city = townRaw ? titleCase(townRaw) : "—";
    const addressRaw = (attrs.StreetName ?? "").trim();
    const streetNum = (attrs.StreetNum ?? "").trim();
    const address = [addressRaw, streetNum].filter(Boolean).join(" ").trim() || "—";
    const zip = (attrs.ZIP ?? "").trim();

    carriers.push({
      id: attrs.BillboardID,
      code: attrs.BillboardNbr || attrs.BillboardID,
      city,
      address,
      region: regionFromZip(zip),
      type,
      format: formatFromDimensions(attrs),
      description: (attrs.Description ?? "").trim(),
      lat,
      lng,
      traffic: defaults.traffic,
      visibility: defaults.visibility,
      lit: defaults.lit,
      image: attrs.Image ? attrs.Image.trim() : null,
      zip,
    });
  }

  return carriers;
}

export function deriveFilterOptions(carriers: Carrier[]) {
  const cities = [...new Set(carriers.map((carrier) => carrier.city))].sort((a, b) => a.localeCompare(b, "pl"));
  const typeSet = new Set(carriers.map((carrier) => carrier.type));
  const types = (["SUPER PREMIUM", "PREMIUM", "STANDARD"] as CarrierType[]).filter((type) => typeSet.has(type));
  return { cities, types };
}

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
