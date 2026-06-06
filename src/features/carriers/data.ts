import type { MapViewport } from "@/components/LeafletMap";

export type CarrierType = "SUPER PREMIUM" | "PREMIUM" | "STANDARD";
export type CarrierAvailability = "available" | "reserved" | "unavailable";
export type SortKey = "relevance" | "city" | "type" | "traffic";
export type TrafficEstimateConfidence = "high" | "medium" | "low";
export type TrafficEstimateBasis =
  | "direct-measurement"
  | "measured-corridor"
  | "local-model";

export interface CarrierTrafficEstimate {
  dailyVehicles: number;
  confidence: TrafficEstimateConfidence;
  basis: TrafficEstimateBasis;
  methodLabel: string;
  methodDescription: string;
  sourceLabel: string;
  sourceYear?: number;
  sourceUrl?: string;
  matchedDistanceMeters: number | null;
}

export interface Carrier {
  id: string;
  code: string;
  city: string;
  address: string;
  region: string;
  type: CarrierType;
  format: string;
  widthMeters: number | null;
  heightMeters: number | null;
  description: string;
  lat: number;
  lng: number;
  traffic: number;
  visibility: number;
  trafficEstimate: CarrierTrafficEstimate | null;
  image: string | null;
  zip: string;
  availability: CarrierAvailability;
}

export const LIST_PAGE_SIZE = 12;
export const MAP_PANEL_PAGE_SIZE = 6;

export const TYPE_CFG: Record<CarrierType, { dot: string; pill: string; label: string; color: string }> = {
  "SUPER PREMIUM": { dot: "bg-rose-500", pill: "bg-rose-500/10 text-rose-700 dark:text-rose-200 ring-rose-500/25", label: "Super Premium", color: "#e11d48" },
  "PREMIUM": { dot: "bg-amber-500", pill: "bg-amber-500/12 text-amber-800 dark:text-amber-200 ring-amber-500/25", label: "Premium", color: "#d97706" },
  "STANDARD": { dot: "bg-sky-500", pill: "bg-sky-500/12 text-sky-800 dark:text-sky-200 ring-sky-500/25", label: "Standard", color: "#0284c7" },
};

export const AVAILABILITY_CFG: Record<CarrierAvailability, { label: string; dot: string; pill: string }> = {
  available: {
    label: "Dostępny",
    dot: "bg-emerald-500",
    pill: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-200 ring-emerald-500/25",
  },
  reserved: {
    label: "Rezerwacja",
    dot: "bg-amber-500",
    pill: "bg-amber-500/12 text-amber-800 dark:text-amber-200 ring-amber-500/25",
  },
  unavailable: {
    label: "Niedostępny",
    dot: "bg-muted-foreground",
    pill: "bg-secondary text-muted-foreground ring-border",
  },
};

const SEGMENT_DEFAULTS: Record<CarrierType, { traffic: number; visibility: number }> = {
  "SUPER PREMIUM": { traffic: 55000, visibility: 95 },
  "PREMIUM": { traffic: 38000, visibility: 88 },
  "STANDARD": { traffic: 22000, visibility: 80 },
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

const MAZOWIECKIE_TOWN_HINTS = [
  "WARSZAWA",
  "OTWOCK",
  "JOZEFOW",
  "JÓZEFÓW",
  "PIASECZNO",
  "PRUSZKOW",
  "PRUSZKÓW",
  "LEGIONOWO",
  "MARKI",
  "ZABKI",
  "ZĄBKI",
  "WOLOMIN",
  "WOŁOMIN",
  "GRODZISK MAZOWIECKI",
  "MILANOWEK",
  "MILANÓWEK",
  "NOWY DWOR MAZOWIECKI",
  "NOWY DWÓR MAZOWIECKI",
  "MINSK MAZOWIECKI",
  "MIŃSK MAZOWIECKI",
  "SIEDLCE",
  "RADOM",
  "PLOCK",
  "PŁOCK",
];

function normalizeRegionHint(value: string): string {
  return value
    .toLocaleUpperCase("pl-PL")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/Ł/g, "L");
}

function regionFromZip(zip: string): string {
  const prefix = Number(zip.slice(0, 2));
  if (Number.isNaN(prefix)) return "Polska";
  const hit = ZIP_REGION.find(([lo, hi]) => prefix >= lo && prefix <= hi);
  return hit ? hit[2] : "Polska";
}

function regionFromTownAndZip(town: string, zip: string): string {
  const normalizedTown = normalizeRegionHint(town);
  if (MAZOWIECKIE_TOWN_HINTS.some((hint) => normalizedTown.includes(normalizeRegionHint(hint)))) {
    return "Mazowieckie";
  }
  return regionFromZip(zip);
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
    attrs[match[1]] = decodeXmlEntities(match[2]);
  }
  return attrs;
}

function decodeXmlEntities(value: string): string {
  return value.replace(
    /&(?:amp|quot|apos|lt|gt|#\d+|#x[\da-f]+);/gi,
    (entity) => {
      const named: Record<string, string> = {
        "&amp;": "&",
        "&quot;": '"',
        "&apos;": "'",
        "&lt;": "<",
        "&gt;": ">",
      };
      const normalized = entity.toLowerCase();
      if (named[normalized]) return named[normalized];

      const isHex = normalized.startsWith("&#x");
      const codePoint = Number.parseInt(
        normalized.slice(isHex ? 3 : 2, -1),
        isHex ? 16 : 10
      );
      return Number.isFinite(codePoint) && codePoint >= 0 && codePoint <= 0x10ffff
        ? String.fromCodePoint(codePoint)
        : entity;
    }
  );
}

function formatFromDimensions(attrs: Record<string, string>): string {
  const w = attrs.Width || attrs.BannerWidth;
  const h = attrs.Height || attrs.BannerHeight;
  if (!w || !h) return "—";
  const fmt = (value: string) => value.replace(",", ".");
  return `${fmt(w)} × ${fmt(h)} m`;
}

function parseDimension(value?: string): number | null {
  const parsed = Number((value ?? "").trim().replace(",", "."));
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

function normalizeImage(raw?: string): string | null {
  const image = (raw ?? "").trim();
  if (!image) return null;
  if (/^https?:\/\/billboard\.wielkiformat\.pl\/?$/i.test(image)) return null;
  return image;
}

function normalizeSegment(raw: string): CarrierType {
  const upper = raw.trim().toUpperCase();
  if (upper === "SUPER PREMIUM") return "SUPER PREMIUM";
  if (upper === "PREMIUM") return "PREMIUM";
  return "STANDARD";
}

function normalizeAvailability(raw?: string): CarrierAvailability {
  const value = (raw ?? "").trim().toLowerCase();
  if (["reserved", "rezerwacja", "zarezerwowany", "booked"].includes(value)) return "reserved";
  if (["unavailable", "niedostepny", "niedostępny", "inactive", "wylaczony", "wyłączony"].includes(value)) {
    return "unavailable";
  }
  return "available";
}

export function normalizeSearchValue(value: string): string {
  return value
    .toLocaleLowerCase("pl-PL")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ł/g, "l")
    .replace(/\s+/g, " ")
    .trim();
}

export function carrierSearchText(carrier: Carrier): string {
  return normalizeSearchValue(
    [
      carrier.code,
      carrier.city,
      carrier.address,
      carrier.region,
      carrier.zip,
      carrier.type,
      carrier.format,
      carrier.description,
    ].join(" ")
  );
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
    const widthMeters = parseDimension(attrs.Width || attrs.BannerWidth);
    const heightMeters = parseDimension(attrs.Height || attrs.BannerHeight);

    carriers.push({
      id: attrs.BillboardID,
      code: attrs.BillboardNbr || attrs.BillboardID,
      city,
      address,
      region: regionFromTownAndZip(townRaw, zip),
      type,
      format: formatFromDimensions(attrs),
      widthMeters,
      heightMeters,
      description: (attrs.Description ?? "").trim(),
      lat,
      lng,
      traffic: defaults.traffic,
      visibility: defaults.visibility,
      trafficEstimate: null,
      image: normalizeImage(attrs.Image),
      zip,
      availability: normalizeAvailability(attrs.Availability ?? attrs.Status ?? attrs.Available),
    });
  }

  return carriers;
}

export function deriveFilterOptions(carriers: Carrier[]) {
  const cities = [...new Set(carriers.map((carrier) => carrier.city))].sort((a, b) => a.localeCompare(b, "pl"));
  const typeSet = new Set(carriers.map((carrier) => carrier.type));
  const types = (["SUPER PREMIUM", "PREMIUM", "STANDARD"] as CarrierType[]).filter((type) => typeSet.has(type));
  const availabilitySet = new Set(carriers.map((carrier) => carrier.availability));
  const availability = (["available", "reserved", "unavailable"] as CarrierAvailability[]).filter((status) => availabilitySet.has(status));
  return { cities, types, availability };
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
