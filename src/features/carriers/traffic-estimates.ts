import type {
  Carrier,
  CarrierTrafficEstimate,
  TrafficEstimateConfidence,
} from "@/features/carriers/data";

export type PublishedCarrier = Carrier & {
  trafficEstimate: CarrierTrafficEstimate;
};

type SourceKind = "zdm-apr" | "zdm-arcgis" | "gpr" | "model";

type SizeGrade = "mega" | "large" | "standard" | "small" | "unknown";

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
  reference(["trasa torunska", "s8"], 95000, "warszawa", "gpr"),
  reference(["s2", "poludniowa obwodnica", "trasa s2"], 88000, "warszawa", "gpr"),
  reference(["s7", "trasa s7"], 90000, "warszawa", "gpr"),
  reference(["s7", "trasa s7"], 52000, undefined, "gpr"),
  reference(["s8", "trasa s8"], 60000, undefined, "gpr"),
  reference(["s17", "trasa lubelska"], 42000, undefined, "gpr"),
  reference(["a2", "autostrada a2"], 33000, undefined, "gpr"),
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
  reference(["puĺkowa", "pulkowa"], 52000),
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

// Stems (not full words) so Polish inflection is matched: "rond" covers
// rondo / rondzie / ronda / rondem, "skrzyzowan" covers skrzyżowanie/-u/-a, etc.
const STRONG_ROAD_KEYWORDS = [
  "alej",
  "al ",
  "dw ",
  "dk",
  "droga krajowa",
  "droga wojewodzka",
  "obwodnic",
  "rond",
  "skrzyzowan",
  "wiadukt",
  "estakad",
];

const TRAFFIC_SIGNAL_KEYWORDS = [
  "bardzo duzy ruch",
  "duzy ruch",
  "kork",
  "swiatl",
  "trzy pasy",
  "3 pasy",
  "cztery pasy",
  "4 pasy",
  "dwa pasy",
  "dlugi najazd",
  "przystank",
  "centrum handlowe",
  "stacja paliw",
];

// Phrases that mean the carrier FACES / is read from the road (use the road's
// own volume). Combined with a detected highway token below.
const HIGHWAY_FRONTING_MARKERS = [
  "przy autostrad",
  "na autostrad",
  "wzdluz autostrad",
  "przy drodze ekspresow",
  "na drodze ekspresow",
  "przy trasie",
  "na trasie",
  "wzdluz trasy",
  "przy ekspresow",
  "widoczny z",
  "widoczna z",
  "widoczny od strony",
  "usytuowany przy drodze",
  "umieszczony przy drodze",
  "zlokalizowany przy drodze ekspresow",
  "bezposrednio przy",
];

// Strong "this is only an access/exit road" words. When present, the carrier
// does NOT face the trunk route (so a fronting phrase like "przy drodze" must
// not win) — it gets the highway volume only if the board is big enough to be
// read from the trunk route itself.
const HIGHWAY_ACCESS_MARKERS = [
  "dojazd",
  "zjazd",
  "wjazd",
  "najazdow",
  "prowadzi do",
  "droga dojazdowa",
  "do wezla",
  "do trasy",
  "do autostrad",
  "do drogi ekspresow",
];

// Softer "the highway is somewhere near" markers — proximity without access.
const HIGHWAY_PROXIMITY_MARKERS = [
  "w kierunku",
  "wezel",
  "w poblizu",
  "w pobliu",
  "nieopodal",
  "obok",
  "m do ",
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
  const highway = detectHighway(profile);

  // Independent candidates. The final value is the MAX so a richer signal can
  // never be dragged down by a weaker one — no underestimation by design.
  const candidates: CarrierTrafficEstimate[] = [];
  let bestReference: ReturnType<typeof selectBestReference> = null;

  const referenceMatch = selectBestReference(profile);
  if (referenceMatch) {
    bestReference = referenceMatch;
    candidates.push(buildReferenceEstimate(profile, referenceMatch));
  }

  const highwayEstimate = buildHighwayEstimate(profile, highway);
  if (highwayEstimate) candidates.push(highwayEstimate);

  const model = estimateFromLocalModel(profile);
  if (model.confidence !== "low") candidates.push(model);

  const sizeFloor = buildSizeFloorEstimate(profile);
  if (sizeFloor) candidates.push(sizeFloor);

  if (candidates.length === 0) return null;

  const chosen = pickStrongestCandidate(candidates);
  return finalizeEstimate(chosen, profile, highway, bestReference?.reference);
}

function pickStrongestCandidate(
  candidates: CarrierTrafficEstimate[]
): CarrierTrafficEstimate {
  return [...candidates].sort((left, right) => {
    if (right.dailyVehicles !== left.dailyVehicles) {
      return right.dailyVehicles - left.dailyVehicles;
    }
    return confidenceRank(right.confidence) - confidenceRank(left.confidence);
  })[0];
}

function confidenceRank(confidence: TrafficEstimateConfidence): number {
  if (confidence === "high") return 2;
  if (confidence === "medium") return 1;
  return 0;
}

function finalizeEstimate(
  estimate: CarrierTrafficEstimate,
  profile: CarrierTrafficProfile,
  highway: HighwayMatch | null,
  reference?: TrafficReference
): CarrierTrafficEstimate {
  return {
    ...estimate,
    dailyVehicles: Math.max(
      3000,
      Math.min(
        estimateTrafficCeiling(profile, highway, reference),
        estimate.dailyVehicles
      )
    ),
  };
}

function buildReferenceEstimate(
  profile: CarrierTrafficProfile,
  match: NonNullable<ReturnType<typeof selectBestReference>>
): CarrierTrafficEstimate {
  const referenceMultiplier = match.reference.directMeasurement
    ? 1
    : Math.max(0.92, Math.min(1.1, profile.multiplier));
  const dailyVehicles = roundTraffic(match.comboVehicles * referenceMultiplier);

  return {
    dailyVehicles,
    confidence: match.confidence,
    basis: match.reference.directMeasurement
      ? "direct-measurement"
      : "measured-corridor",
    methodLabel: match.reference.methodLabel,
    methodDescription: describeReferenceMethod(
      match.reference,
      match.distanceMeters,
      profile,
      match.crossRoadVehicles > 0
    ),
    sourceLabel: match.reference.sourceLabel,
    sourceYear: match.reference.sourceYear,
    sourceUrl: match.reference.sourceUrl,
    matchedDistanceMeters: match.distanceMeters,
  };
}

function buildHighwayEstimate(
  profile: CarrierTrafficProfile,
  highway: HighwayMatch | null
): CarrierTrafficEstimate | null {
  if (!highway) return null;

  const seenFromHighway = highway.fronting || isBigBoard(profile.sizeGrade);
  const multiplier = Math.max(0.95, Math.min(1.12, profile.multiplier));

  if (seenFromHighway) {
    const dailyVehicles = roundTraffic(highway.dailyVehicles * multiplier);
    // A corridor model is never a counter at this exact spot, so cap at medium;
    // "high" is reserved for direct ZDM measurements near the carrier.
    return {
      dailyVehicles,
      confidence: "medium",
      basis: "measured-corridor",
      methodLabel: "Korytarz trasy szybkiego ruchu",
      methodDescription: highwayMethodDescription(profile, highway, true),
      sourceLabel: "GDDKiA GPR 2025 (SDRR) / model korytarza",
      sourceYear: 2025,
      sourceUrl: GPR_2025_RESULTS_URL,
      matchedDistanceMeters: null,
    };
  }

  if (highway.proximity) {
    // Access / exit road: not the highway itself (board too small to read from
    // it), but a road that demonstrably feeds a trunk route — keep it healthy
    // yet proportional to the route it serves.
    const accessVehicles = roundTraffic(
      Math.max(22000, highway.dailyVehicles * 0.4) * multiplier
    );
    return {
      dailyVehicles: accessVehicles,
      confidence: "medium",
      basis: "local-model",
      methodLabel: "Model szacunkowy",
      methodDescription: highwayMethodDescription(profile, highway, false),
      sourceLabel: "GDDKiA GPR 2025 / model lokalny",
      sourceYear: 2025,
      sourceUrl: GPR_2025_URL,
      matchedDistanceMeters: null,
    };
  }

  return null;
}

function buildSizeFloorEstimate(
  profile: CarrierTrafficProfile
): CarrierTrafficEstimate | null {
  const floor = sizeFloorVehicles(profile.areaSqm);
  if (floor === null) return null;

  const multiplier = Math.max(0.9, Math.min(1.12, profile.multiplier));
  return {
    dailyVehicles: roundTraffic(floor * multiplier),
    confidence: "medium",
    basis: "local-model",
    methodLabel: "Model + skala nośnika",
    methodDescription:
      "Szacunek wsparty skalą nośnika: wielkoformatowe tablice stawia się przy ruchliwych, szybkich drogach, więc dolny pułap ruchu wyznaczono na podstawie powierzchni nośnika i kalibracji ZDM/GPR. Liczba oznacza potencjalny ruch dobowy w obu kierunkach, nie gwarantowaną widownię reklamy.",
    sourceLabel: PUBLIC_MODEL_SOURCE.sourceLabel,
    sourceYear: PUBLIC_MODEL_SOURCE.sourceYear,
    sourceUrl: PUBLIC_MODEL_SOURCE.sourceUrl,
    matchedDistanceMeters: null,
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
      "Model szacunkowy: lokalizacja nie ma bezpośrednio przypisanego publicznego licznika, więc wynik wyliczono z typu miasta, znaczenia drogi, opisu lokalizacji, skali nośnika i kalibracji na bezpłatnych pomiarach ZDM oraz GPR. Liczba oznacza potencjalny ruch dobowy w obu kierunkach, nie gwarantowaną widownię reklamy.",
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
  descText: string;
  cityText: string;
  areaSqm: number;
  sizeGrade: SizeGrade;
  multiplier: number;
}

function buildCarrierTrafficProfile(carrier: Carrier): CarrierTrafficProfile {
  const haystack = normalizeTrafficText(
    `${carrier.city} ${carrier.address} ${carrier.description}`
  );
  const addressText = normalizeTrafficText(`${carrier.city} ${carrier.address}`);
  const descText = normalizeTrafficText(carrier.description);
  const cityText = normalizeTrafficText(carrier.city);
  const areaSqm = carrierAreaSqm(carrier);

  return {
    carrier,
    haystack,
    addressText,
    descText,
    cityText,
    areaSqm,
    sizeGrade: gradeForArea(areaSqm),
    multiplier: estimateContextMultiplier(haystack),
  };
}

function carrierAreaSqm(carrier: Carrier): number {
  const width = carrier.widthMeters;
  const height = carrier.heightMeters;
  if (!width || !height || width <= 0 || height <= 0) return 0;
  return width * height;
}

function gradeForArea(areaSqm: number): SizeGrade {
  if (areaSqm <= 0) return "unknown";
  if (areaSqm >= 48) return "mega";
  if (areaSqm >= 18) return "large";
  if (areaSqm >= 8) return "standard";
  return "small";
}

function isBigBoard(grade: SizeGrade): boolean {
  return grade === "large" || grade === "mega";
}

function sizeFloorVehicles(areaSqm: number): number | null {
  if (areaSqm >= 48) return 40000;
  if (areaSqm >= 30) return 32000;
  if (areaSqm >= 18) return 26000;
  return null;
}

interface HighwayMatch {
  dailyVehicles: number;
  label: string;
  specific: boolean;
  inAddress: boolean;
  fronting: boolean;
  proximity: boolean;
}

function detectHighway(profile: CarrierTrafficProfile): HighwayMatch | null {
  const { addressText, descText, cityText } = profile;
  const combined = `${addressText} ${descText}`;
  const corridor = highwayCorridor(combined, cityText);
  if (!corridor) return null;

  const inAddress = highwayCorridor(addressText, cityText) !== null;
  const hasAccessWord = HIGHWAY_ACCESS_MARKERS.some((marker) =>
    combined.includes(marker)
  );
  // The highway in the street name means the carrier stands on it. Otherwise a
  // fronting phrase counts only if it is NOT contradicted by an access word
  // ("przy drodze DOJAZDOWEJ do S8" is an access road, not a frontage).
  const fronting =
    inAddress ||
    (!hasAccessWord &&
      HIGHWAY_FRONTING_MARKERS.some((marker) => descText.includes(marker)));
  const proximity =
    !fronting &&
    (hasAccessWord ||
      HIGHWAY_PROXIMITY_MARKERS.some((marker) => combined.includes(marker)));

  return { ...corridor, inAddress, fronting, proximity };
}

function highwayCorridor(
  text: string,
  cityText: string
): { dailyVehicles: number; label: string; specific: boolean } | null {
  const isWarsaw = cityText.includes("warszawa");

  if (/\bs8\b/.test(text) || text.includes("trasa torunska")) {
    return { dailyVehicles: isWarsaw ? 95000 : 60000, label: "S8", specific: true };
  }
  if (
    /\bs2\b/.test(text) ||
    text.includes("poludniowa obwodnica") ||
    text.includes("obwodnica warszawy")
  ) {
    return { dailyVehicles: 88000, label: "S2 / POW", specific: true };
  }
  if (/\bs7\b/.test(text) || text.includes("trasa s7")) {
    return { dailyVehicles: isWarsaw ? 90000 : 52000, label: "S7", specific: true };
  }
  if (/\bs17\b/.test(text) || text.includes("trasa lubelska")) {
    return { dailyVehicles: 42000, label: "S17", specific: true };
  }
  if (/\ba2\b/.test(text) || text.includes("autostrada a2")) {
    return { dailyVehicles: 33000, label: "A2", specific: true };
  }
  if (/\ba[14]\b/.test(text)) {
    return { dailyVehicles: 35000, label: "autostrada", specific: true };
  }
  // Generic expressway: numbered S-road, "droga ekspresowa", or "trasa S".
  if (/\bs\d{1,3}\b/.test(text) || /\btrasa s\b/.test(text)) {
    return { dailyVehicles: 55000, label: "droga ekspresowa", specific: false };
  }
  if (
    text.includes("droga ekspresowa") ||
    text.includes("ekspresow") ||
    text.includes("expresow")
  ) {
    return { dailyVehicles: 55000, label: "droga ekspresowa", specific: false };
  }
  if (text.includes("autostrad")) {
    return { dailyVehicles: 35000, label: "autostrada", specific: false };
  }
  return null;
}

function selectBestReference(profile: CarrierTrafficProfile):
  | {
      reference: TrafficReference;
      distanceMeters: number | null;
      confidence: TrafficEstimateConfidence;
      comboVehicles: number;
      crossRoadVehicles: number;
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

  const best = candidates.slice().sort((left, right) => left.score - right.score)[0];
  if (!best) return null;

  // Intersection ("ul. A / ul. B"): add a fraction of the strongest *other*
  // crossing road so a busy junction is not reduced to a single street. A
  // crossing road must be a genuinely different road — references that share a
  // keyword (e.g. two S8 corridor entries) describe the same road, not a
  // junction, so they must not stack.
  const crossRoadVehicles = candidates
    .filter(
      (candidate) =>
        candidate.reference !== best.reference &&
        !candidate.reference.keywords.some((keyword) =>
          best.reference.keywords.includes(keyword)
        )
    )
    .reduce((max, candidate) => Math.max(max, candidate.reference.dailyVehicles), 0);

  const comboVehicles = best.reference.directMeasurement
    ? best.reference.dailyVehicles
    : Math.min(
        best.reference.dailyVehicles * 1.35,
        best.reference.dailyVehicles + crossRoadVehicles * 0.25
      );

  return {
    reference: best.reference,
    distanceMeters: best.distanceMeters,
    confidence:
      best.reference.directMeasurement && best.distanceMeters !== null
        ? "high"
        : best.reference.confidence,
    comboVehicles,
    crossRoadVehicles,
  };
}

function describeReferenceMethod(
  reference: TrafficReference,
  distanceMeters: number | null,
  profile: CarrierTrafficProfile,
  hasCrossRoad: boolean
): string {
  const distanceText =
    distanceMeters === null
      ? ""
      : ` Punkt referencyjny jest ok. ${distanceMeters.toLocaleString("pl-PL")} m od nośnika.`;
  const locationText = reference.directMeasurement
    ? "Szacunek oparty o publiczny pomiar dla tej samej ulicy lub najbliższego skrzyżowania."
    : "Szacunek oparty o kalibrowany korytarz drogowy z publicznych pomiarów ZDM/GPR.";
  const crossText = hasCrossRoad
    ? " Uwzględniono dodatkowy ruch z drogi poprzecznej na skrzyżowaniu."
    : "";
  const contextText =
    profile.multiplier === 1
      ? ""
      : " Wynik skorygowano o lokalny opis widoczności, korków i układu drogi.";

  return `${locationText}${distanceText}${crossText}${contextText} Liczba oznacza potencjalny ruch dobowy w obu kierunkach, nie gwarantowaną widownię reklamy.`;
}

function highwayMethodDescription(
  profile: CarrierTrafficProfile,
  highway: HighwayMatch,
  seenFromHighway: boolean
): string {
  if (seenFromHighway) {
    const sizeText = isBigBoard(profile.sizeGrade)
      ? "Wielkoformatowy nośnik czytany jest z trasy szybkiego ruchu, dlatego przyjęto natężenie samej trasy"
      : "Nośnik usytuowany jest bezpośrednio przy trasie szybkiego ruchu, dlatego przyjęto jej natężenie";
    return `${sizeText} (${highway.label}). Wartość wynika z korytarza GDDKiA GPR i kalibracji lokalnej. Liczba oznacza potencjalny ruch dobowy w obu kierunkach, nie gwarantowaną widownię reklamy.`;
  }
  return `Nośnik znajduje się przy drodze prowadzącej do trasy ${highway.label}. Przyjęto ruch drogi dojazdowej (część natężenia trasy), bo z tej odległości i przy tej wielkości nośnika kierowcy na samej trasie nie odczytują reklamy. Liczba oznacza potencjalny ruch dobowy w obu kierunkach, nie gwarantowaną widownię reklamy.`;
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

  const corridor = highwayCorridor(addressText, profile.cityText);
  if (corridor) {
    // Use the specific route's volume (A2 ≈ 33k, S8 ≈ 95k) instead of a flat
    // expressway figure, so motorways are not over- or under-shot uniformly.
    return Math.max(cityBase, corridor.dailyVehicles);
  }
  if (
    STRONG_ROAD_KEYWORDS.some((keyword) => addressText.includes(keyword)) ||
    STRONG_ROAD_KEYWORDS.some((keyword) => haystack.includes(keyword))
  ) {
    return Math.max(cityBase, 26000);
  }
  // Inter-city through roads ("na trasie X-Y", "długi najazd") carry more than
  // a generic local street even without a named-road match.
  if (
    haystack.includes("na trasie") ||
    haystack.includes("dlugi najazd") ||
    /\btrasa \w/.test(haystack)
  ) {
    return Math.max(cityBase, 24000);
  }
  if (haystack.includes("centrum") || haystack.includes("scisla zabudowa")) {
    return Math.max(cityBase, 21000);
  }
  return cityBase;
}

function estimateTrafficCeiling(
  profile: CarrierTrafficProfile,
  highway: HighwayMatch | null,
  reference?: TrafficReference
): number {
  if (reference?.directMeasurement) return 98000;

  let base = categoryCeiling(profile);

  // A genuine trunk-route signal must never be capped below the route itself.
  if (highway && (highway.fronting || isBigBoard(profile.sizeGrade))) {
    base = Math.max(base, Math.round(highway.dailyVehicles * 1.15));
  }

  base = Math.round(base * sizeCeilingMultiplier(profile.sizeGrade));
  return Math.min(base, 140000);
}

function categoryCeiling(profile: CarrierTrafficProfile): number {
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

function sizeCeilingMultiplier(grade: SizeGrade): number {
  if (grade === "mega") return 1.4;
  if (grade === "large") return 1.15;
  return 1;
}

function hasExpresswayAddress(addressText: string): boolean {
  return highwayCorridor(addressText, addressText) !== null;
}

function estimateContextMultiplier(haystack: string): number {
  let multiplier = 1;

  if (haystack.includes("bardzo duzy ruch")) multiplier += 0.14;
  else if (haystack.includes("duzy ruch")) multiplier += 0.07;
  if (haystack.includes("kork")) multiplier += 0.08;
  if (haystack.includes("trzy pasy") || haystack.includes("3 pasy")) {
    multiplier += 0.08;
  }
  if (haystack.includes("cztery pasy") || haystack.includes("4 pasy")) {
    multiplier += 0.1;
  }
  if (haystack.includes("skrzyzowan") || haystack.includes("rond")) {
    multiplier += 0.06;
  }
  if (haystack.includes("scisle centrum") || haystack.includes("centrum miasta")) {
    multiplier += 0.06;
  }
  if (
    haystack.includes("parking") ||
    haystack.includes("wewnetrzna") ||
    haystack.includes("osiedlow")
  ) {
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
    .replace(/[̀-ͯ]/g, "")
    .replace(/ł/g, "l")
    .replace(/Ł/g, "l")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
