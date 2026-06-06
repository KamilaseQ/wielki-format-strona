import type {
  Carrier,
  CarrierTrafficEstimate,
  TrafficEstimateConfidence,
} from "@/features/carriers/data";

export type PublishedCarrier = Carrier & {
  trafficEstimate: CarrierTrafficEstimate;
};

type SourceKind = "zdm-apr" | "zdm-arcgis" | "gpr" | "model";

interface TrafficReference {
  keywords: string[];
  cityKeywords?: string[];
  dailyVehicles: number;
  sourceKind: SourceKind;
  sourceLabel: string;
  sourceYear: number;
  sourceUrl: string;
  confidence: TrafficEstimateConfidence;
  methodLabel: string;
  lat?: number;
  lng?: number;
  radiusMeters?: number;
  directMeasurement?: boolean;
}

const ZDM_APR_URL =
  "https://zdm.waw.pl/dzialania/badania-i-analizy/analiza-ruchu-na-drogach/";
const ZDM_ARCGIS_URL =
  "https://zdm.waw.pl/dzialania/badania-i-analizy/pomiary-ruchu-na-drogach/";
const GPR_2025_URL =
  "https://www.gov.pl/web/gddkia/generalny-pomiar-ruchu-2025";
const GPR_2025_RESULTS_URL =
  "https://www.gov.pl/attachment/02628301-14c4-4a7c-a518-78b6f6340936";
const GPR_2020_URL =
  "https://www.gov.pl/web/gddkia/generalny-pomiar-ruchu-20202021";

const PUBLIC_MODEL_SOURCE = {
  sourceKind: "model" as SourceKind,
  sourceLabel: "Model lokalny kalibrowany ZDM i GPR",
  sourceYear: 2025,
  sourceUrl: GPR_2025_URL,
  confidence: "medium" as TrafficEstimateConfidence,
  methodLabel: "Model szacunkowy",
};

const ROAD_REFERENCES: TrafficReference[] = [
  {
    keywords: ["marszalkowska"],
    cityKeywords: ["warszawa"],
    dailyVehicles: 37400,
    sourceKind: "zdm-apr",
    sourceLabel: "ZDM Warszawa APR",
    sourceYear: 2024,
    sourceUrl: ZDM_APR_URL,
    confidence: "high",
    methodLabel: "Dane ZDM APR",
    lat: 52.2298,
    lng: 21.0117,
    radiusMeters: 1400,
    directMeasurement: true,
  },
  {
    keywords: ["starzynskiego", "namyslowska"],
    cityKeywords: ["warszawa"],
    dailyVehicles: 38000,
    sourceKind: "zdm-arcgis",
    sourceLabel: "ZDM Warszawa, pomiary skrzyżowań",
    sourceYear: 2025,
    sourceUrl: ZDM_ARCGIS_URL,
    confidence: "high",
    methodLabel: "Dane ZDM ze skrzyżowania",
    lat: 52.26673,
    lng: 21.03039,
    radiusMeters: 700,
    directMeasurement: true,
  },
  reference(["aleje jerozolimskie", "jerozolimskie"], 68000, "warszawa"),
  reference(["prymasa tysiaclecia", "prymasa"], 76000, "warszawa"),
  reference(["trasa torunska", "s8"], 90000, "warszawa", "gpr"),
  reference(["s7", "trasa s7"], 90000, "warszawa", "gpr"),
  reference(["s7", "trasa s7"], 52000, undefined, "gpr"),
  reference(["s17", "trasa lubelska"], 42000, undefined, "gpr"),
  reference(["a2", "autostrada"], 32000, undefined, "gpr"),
  reference(["pulawska"], 52000),
  reference(["modlinska"], 52000),
  reference(["czerniakowska"], 47000, "warszawa"),
  reference(["wisłostrada", "wislostrada", "wybrzeze kosciuszkowskie", "wybrzeze gdanskie"], 62000, "warszawa"),
  reference(["radzyminska"], 42000),
  reference(["grochowska"], 36000, "warszawa"),
  reference(["solidarnosci"], 43000, "warszawa"),
  reference(["wolosa", "woloska"], 39000, "warszawa"),
  reference(["lopuszanska"], 42000, "warszawa"),
  reference(["marynarska"], 38000, "warszawa"),
  reference(["sobieskiego"], 35000, "warszawa"),
  reference(["bronislawa czecha", "czecha"], 37000, "warszawa"),
  reference(["patriotow"], 23000, "warszawa"),
  reference(["trakt brzeski"], 27000),
  reference(["puĺkowa", "pulkowa"], 52000),
  reference(["al krakowska", "krakowska"], 48000),
  reference(["okulickiego"], 33000),
  reference(["armii krajowej"], 30000),
  reference(["zegrzynska"], 27000),
  reference(["warszawska"], 24000),
  reference(["sikorskiego"], 22000),
  reference(["niepodleglosci"], 21000),
  reference(["kosciuszki"], 18000),
  reference(["krolewska"], 18000),
  reference(["wojska polskiego"], 18000),
  reference(["slowackiego"], 17000),
  reference(["kolejowa"], 15000),
];

const EXPRESSWAY_KEYWORDS = [
  "a2",
  "autostrada",
  "droga ekspresowa",
  "s7",
  "s8",
  "s17",
  "trasa torunska",
  "trasa lubelska",
];

const STRONG_ROAD_KEYWORDS = [
  "aleja",
  "al ",
  "dw",
  "dk",
  "droga krajowa",
  "droga wojewodzka",
  "obwodnica",
  "rondo",
  "skrzyzowanie",
];

const TRAFFIC_SIGNAL_KEYWORDS = [
  "bardzo duzy ruch",
  "duzy ruch",
  "korki",
  "swiatla",
  "trzy pasy",
  "3 pasy",
  "dlugi najazd",
  "przystanki",
  "centrum handlowe",
  "stacja paliw",
];

export function publishCarriersWithTrafficEstimates(
  carriers: Carrier[]
): Carrier[] {
  return carriers.map((carrier) => ({
    ...carrier,
    trafficEstimate: estimateCarrierTraffic(carrier),
  }));
}

export function hasPublishedTrafficEstimate(
  carrier: Carrier
): carrier is PublishedCarrier {
  return (
    carrier.trafficEstimate !== null &&
    carrier.trafficEstimate.confidence !== "low"
  );
}

function estimateCarrierTraffic(carrier: Carrier): CarrierTrafficEstimate | null {
  if (
    !Number.isFinite(carrier.lat) ||
    !Number.isFinite(carrier.lng) ||
    carrier.city === "—" ||
    carrier.address === "—"
  ) {
    return null;
  }

  const profile = buildCarrierTrafficProfile(carrier);
  const bestReference = selectBestReference(profile);

  if (bestReference) {
    const referenceMultiplier = bestReference.reference.directMeasurement
      ? 1
      : Math.max(0.92, Math.min(1.08, profile.multiplier));
    const dailyVehicles = roundTraffic(
      bestReference.reference.dailyVehicles * referenceMultiplier
    );
    return buildEstimate(
      {
        dailyVehicles,
        confidence: bestReference.confidence,
        basis: bestReference.reference.directMeasurement
          ? "direct-measurement"
          : "measured-corridor",
        methodLabel: bestReference.reference.methodLabel,
        methodDescription: describeReferenceMethod(
          bestReference.reference,
          bestReference.distanceMeters,
          profile
        ),
        sourceLabel: bestReference.reference.sourceLabel,
        sourceYear: bestReference.reference.sourceYear,
        sourceUrl: bestReference.reference.sourceUrl,
        matchedDistanceMeters: bestReference.distanceMeters,
      },
      profile,
      bestReference.reference
    );
  }

  const model = estimateFromLocalModel(profile);
  if (model.confidence === "low") return null;

  return buildEstimate(model, profile);
}

function buildEstimate(
  estimate: CarrierTrafficEstimate,
  profile: CarrierTrafficProfile,
  reference?: TrafficReference
): CarrierTrafficEstimate {
  return {
    ...estimate,
    dailyVehicles: Math.max(
      3000,
      Math.min(estimateTrafficCeiling(profile, reference), estimate.dailyVehicles)
    ),
  };
}

function estimateFromLocalModel(profile: CarrierTrafficProfile): CarrierTrafficEstimate {
  const { carrier, haystack, cityText, multiplier } = profile;
  const cityBase = estimateCityBase(cityText);
  const roadBase = estimateRoadBase(profile, cityBase);
  const signalBoost = TRAFFIC_SIGNAL_KEYWORDS.some((keyword) =>
    haystack.includes(keyword)
  )
    ? 1
    : 0.9;
  const dailyVehicles = roundTraffic(roadBase * multiplier * signalBoost);
  const confidence: TrafficEstimateConfidence =
    carrier.address.length > 2 && carrier.city.length > 2 ? "medium" : "low";
  const source =
    roadBase >= 48000 || hasExpresswayAddress(profile.addressText)
      ? {
          ...PUBLIC_MODEL_SOURCE,
          sourceKind: "gpr" as SourceKind,
          sourceLabel: "GDDKiA GPR 2025 / model lokalny",
          sourceUrl: GPR_2025_URL,
        }
      : PUBLIC_MODEL_SOURCE;

  return {
    dailyVehicles,
    confidence,
    basis: "local-model",
    methodLabel: source.methodLabel,
    methodDescription:
      "Model szacunkowy: lokalizacja nie ma bezpośrednio przypisanego publicznego licznika, więc wynik wyliczono z typu miasta, znaczenia drogi, opisu lokalizacji i kalibracji na bezpłatnych pomiarach ZDM oraz GPR. Liczba oznacza potencjalny ruch dobowy w obu kierunkach, nie gwarantowaną widownię reklamy.",
    sourceLabel: source.sourceLabel,
    sourceYear: source.sourceYear,
    sourceUrl: source.sourceUrl,
    matchedDistanceMeters: null,
  };
}

interface CarrierTrafficProfile {
  carrier: Carrier;
  haystack: string;
  addressText: string;
  cityText: string;
  multiplier: number;
}

function buildCarrierTrafficProfile(carrier: Carrier): CarrierTrafficProfile {
  const haystack = normalizeTrafficText(
    `${carrier.city} ${carrier.address} ${carrier.description}`
  );
  const addressText = normalizeTrafficText(`${carrier.city} ${carrier.address}`);
  const cityText = normalizeTrafficText(carrier.city);

  return {
    carrier,
    haystack,
    addressText,
    cityText,
    multiplier: estimateContextMultiplier(haystack),
  };
}

function selectBestReference(profile: CarrierTrafficProfile):
  | {
      reference: TrafficReference;
      distanceMeters: number | null;
      confidence: TrafficEstimateConfidence;
    }
  | null {
  const candidates = ROAD_REFERENCES.flatMap((reference) => {
    const cityMatches =
      !reference.cityKeywords ||
      reference.cityKeywords.some((keyword) => profile.cityText.includes(keyword));
    if (!cityMatches) return [];

    const keywordMatches = reference.keywords.some((keyword) => {
      const normalizedKeyword = normalizeTrafficText(keyword);
      return profile.addressText.includes(normalizedKeyword);
    });
    if (!keywordMatches) return [];

    const distanceMeters =
      reference.lat !== undefined && reference.lng !== undefined
        ? distanceBetweenMeters(
            profile.carrier.lat,
            profile.carrier.lng,
            reference.lat,
            reference.lng
          )
        : null;

    if (
      distanceMeters !== null &&
      reference.radiusMeters !== undefined &&
      distanceMeters > reference.radiusMeters
    ) {
      return [];
    }

    const distancePenalty = distanceMeters === null ? 0 : distanceMeters / 1000;
    const directBonus = reference.directMeasurement ? -3 : 0;
    const score = directBonus + distancePenalty - reference.dailyVehicles / 100000;

    return [
      {
        reference,
        distanceMeters:
          distanceMeters === null ? null : Math.round(distanceMeters / 10) * 10,
        score,
      },
    ];
  });

  const best = candidates.sort((left, right) => left.score - right.score)[0];
  if (!best) return null;

  return {
    reference: best.reference,
    distanceMeters: best.distanceMeters,
    confidence:
      best.reference.directMeasurement && best.distanceMeters !== null
        ? "high"
        : best.reference.confidence,
  };
}

function describeReferenceMethod(
  reference: TrafficReference,
  distanceMeters: number | null,
  profile: CarrierTrafficProfile
): string {
  const distanceText =
    distanceMeters === null
      ? ""
      : ` Punkt referencyjny jest ok. ${distanceMeters.toLocaleString("pl-PL")} m od nośnika.`;
  const locationText = reference.directMeasurement
    ? "Szacunek oparty o publiczny pomiar dla tej samej ulicy lub najbliższego skrzyżowania."
    : "Szacunek oparty o kalibrowany korytarz drogowy z publicznych pomiarów ZDM/GPR.";
  const contextText =
    profile.multiplier === 1
      ? ""
      : " Wynik skorygowano o lokalny opis widoczności, korków i układu drogi.";

  return `${locationText}${distanceText}${contextText} Liczba oznacza potencjalny ruch dobowy w obu kierunkach, nie gwarantowaną widownię reklamy.`;
}

function estimateCityBase(cityText: string): number {
  if (cityText.includes("warszawa")) return 28000;
  if (/(radom|plock|piotrkow)/.test(cityText)) return 22000;
  if (
    /(piaseczno|pruszkow|legionowo|marki|zabki|wolomin|otwock|jozefow|lomianki|raszyn|grodzisk|milanowek|nowy dwor)/.test(
      cityText
    )
  ) {
    return 18000;
  }
  if (/(halinow|lesznowola|nieporet|stare babice|gora kalwaria|grojec)/.test(cityText)) {
    return 14000;
  }
  return 12000;
}

function estimateRoadBase(profile: CarrierTrafficProfile, cityBase: number): number {
  const { addressText, haystack } = profile;

  if (hasExpresswayAddress(addressText)) {
    return Math.max(cityBase, 62000);
  }
  if (
    STRONG_ROAD_KEYWORDS.some((keyword) => addressText.includes(keyword)) ||
    STRONG_ROAD_KEYWORDS.some((keyword) => haystack.includes(keyword))
  ) {
    return Math.max(cityBase, 26000);
  }
  if (haystack.includes("centrum") || haystack.includes("scisla zabudowa")) {
    return Math.max(cityBase, 21000);
  }
  return cityBase;
}

function estimateTrafficCeiling(
  profile: CarrierTrafficProfile,
  reference?: TrafficReference
): number {
  if (reference?.directMeasurement) return 98000;
  if (hasExpresswayAddress(profile.addressText)) return 90000;

  const isWarsaw = profile.cityText.includes("warszawa");
  const hasNamedMajorRoad = [
    "pulawska",
    "modlinska",
    "jerozolimskie",
    "solidarnosci",
    "prymasa",
    "czerniakowska",
    "wislostrada",
    "al krakowska",
    "krakowska",
  ].some((keyword) => profile.addressText.includes(keyword));

  if (isWarsaw && hasNamedMajorRoad) return 86000;
  if (isWarsaw) return 68000;
  if (hasNamedMajorRoad) return 58000;
  if (STRONG_ROAD_KEYWORDS.some((keyword) => profile.addressText.includes(keyword))) {
    return 52000;
  }
  if (
    /(piaseczno|pruszkow|legionowo|marki|zabki|wolomin|otwock|jozefow|lomianki|raszyn|grodzisk|milanowek|nowy dwor)/.test(
      profile.cityText
    )
  ) {
    return 44000;
  }
  return 36000;
}

function hasExpresswayAddress(addressText: string): boolean {
  return EXPRESSWAY_KEYWORDS.some((keyword) => addressText.includes(keyword));
}

function estimateContextMultiplier(haystack: string): number {
  let multiplier = 1;

  if (haystack.includes("bardzo duzy ruch")) multiplier += 0.14;
  else if (haystack.includes("duzy ruch")) multiplier += 0.07;
  if (haystack.includes("stale korki") || haystack.includes("korki")) {
    multiplier += 0.08;
  }
  if (haystack.includes("trzy pasy") || haystack.includes("3 pasy")) {
    multiplier += 0.08;
  }
  if (haystack.includes("skrzyzowanie") || haystack.includes("rondo")) {
    multiplier += 0.06;
  }
  if (haystack.includes("scisle centrum") || haystack.includes("centrum miasta")) {
    multiplier += 0.06;
  }
  if (haystack.includes("parking") || haystack.includes("wewnetrzna")) {
    multiplier -= 0.08;
  }

  return Math.max(0.82, Math.min(1.24, multiplier));
}

function roundTraffic(value: number): number {
  const step = value >= 30000 ? 1000 : 500;
  return Math.round(value / step) * step;
}

function reference(
  keywords: string[],
  dailyVehicles: number,
  cityKeyword?: string,
  sourceKind: SourceKind = "model"
): TrafficReference {
  const source =
    sourceKind === "gpr"
      ? {
          sourceKind,
          sourceLabel: "GDDKiA GPR 2025 (SDRR) / model korytarza",
          sourceYear: 2025,
          sourceUrl: GPR_2025_RESULTS_URL,
        }
      : {
          sourceKind,
          sourceLabel: "Model lokalny kalibrowany ZDM i GPR",
          sourceYear: 2025,
          sourceUrl: sourceKind === "zdm-arcgis" ? ZDM_ARCGIS_URL : GPR_2020_URL,
        };

  return {
    keywords,
    cityKeywords: cityKeyword ? [cityKeyword] : undefined,
    dailyVehicles,
    confidence: "medium",
    methodLabel: "Model kalibrowany pomiarami",
    ...source,
  };
}

function distanceBetweenMeters(
  latA: number,
  lngA: number,
  latB: number,
  lngB: number
): number {
  const earthRadiusMeters = 6371000;
  const latARadians = toRadians(latA);
  const latBRadians = toRadians(latB);
  const latDelta = toRadians(latB - latA);
  const lngDelta = toRadians(lngB - lngA);
  const sinLat = Math.sin(latDelta / 2);
  const sinLng = Math.sin(lngDelta / 2);
  const a =
    sinLat * sinLat +
    Math.cos(latARadians) * Math.cos(latBRadians) * sinLng * sinLng;
  return earthRadiusMeters * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function toRadians(value: number): number {
  return (value * Math.PI) / 180;
}

function normalizeTrafficText(value: string): string {
  return value
    .toLocaleLowerCase("pl-PL")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ł/g, "l")
    .replace(/Ł/g, "l")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
