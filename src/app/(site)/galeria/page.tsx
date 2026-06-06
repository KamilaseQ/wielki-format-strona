import type { Metadata } from "next";
import { parseBillboardsXml, type Carrier } from "@/features/carriers/data";
import { readCarriersXml } from "@/features/carriers/xml-loader";
import GaleriaPage, { type GalleryItem } from "@/routes/galeria";

const realMetadata: Metadata = {
  title: "Galeria realizacji - billboardy i nośniki reklamowe",
  description:
    "Nasze realizacje - billboardy, citylighty i powierzchnie wielkoformatowe w Warszawie i na Mazowszu. Zobacz przykładowe nośniki reklamowe z naszego portfolio.",
  openGraph: {
    title: "Galeria realizacji - Wielkiformat.pl",
    description:
      "Zrealizowane kampanie i nośniki reklamowe w województwie mazowieckim.",
  },
  alternates: {
    canonical: "https://wielkiformat.pl/galeria",
  },
};

export const metadata: Metadata = realMetadata;

const GALLERY_ITEM_LIMIT = 120;

interface GalleryCandidate {
  carrier: Carrier;
  src: string;
}

async function loadGallery(): Promise<GalleryItem[]> {
  const seenLocations = new Set<string>();
  const seenImages = new Set<string>();
  const carriers = parseBillboardsXml(await readCarriersXml());

  return carriers
    .filter(isGalleryCarrier)
    .sort(compareGalleryCarriers)
    .flatMap<GalleryCandidate>((carrier) => {
      const src = resolveGalleryImageSrc(carrier.image);
      if (!src) return [];

      const locationKey = normalizeGalleryKey(
        `${carrier.city} ${carrier.address}`
      );
      if (seenLocations.has(locationKey) || seenImages.has(src)) return [];

      seenLocations.add(locationKey);
      seenImages.add(src);
      return [{ carrier, src }];
    })
    .slice(0, GALLERY_ITEM_LIMIT)
    .map(({ carrier, src }) => ({
      src,
      title: `${carrier.city} - ${carrier.address}`,
      location: `Nośnik ${carrier.code} • ${carrier.format}`,
    }));
}

function isGalleryCarrier(carrier: Carrier): boolean {
  return Boolean(
    carrier.image &&
      carrier.city &&
      carrier.city !== "—" &&
      carrier.address &&
      carrier.address !== "—" &&
      /[a-ząćęłńóśźż]/i.test(carrier.address)
  );
}

function compareGalleryCarriers(left: Carrier, right: Carrier): number {
  const areaDiff = carrierArea(right) - carrierArea(left);
  if (Math.abs(areaDiff) > 0.25) return areaDiff;

  const typePriority =
    carrierTypePriority(left.type) - carrierTypePriority(right.type);
  if (typePriority !== 0) return typePriority;

  const longEdgeDiff = carrierLongEdge(right) - carrierLongEdge(left);
  if (Math.abs(longEdgeDiff) > 0.25) return longEdgeDiff;

  return (
    left.address.localeCompare(right.address, "pl") ||
    left.city.localeCompare(right.city, "pl") ||
    left.code.localeCompare(right.code, "pl")
  );
}

function carrierTypePriority(type: Carrier["type"]): number {
  if (type === "SUPER PREMIUM") return 0;
  if (type === "PREMIUM") return 1;
  return 2;
}

function carrierArea(carrier: Carrier): number {
  return (carrier.widthMeters ?? 0) * (carrier.heightMeters ?? 0);
}

function carrierLongEdge(carrier: Carrier): number {
  return Math.max(carrier.widthMeters ?? 0, carrier.heightMeters ?? 0);
}

function resolveGalleryImageSrc(image: string | null): string | null {
  if (!image) return null;
  if (/^https?:/i.test(image)) {
    try {
      const url = new URL(image);
      if (
        url.hostname.toLowerCase() === "billboard.wielkiformat.pl" &&
        url.pathname.startsWith("/billboards/")
      ) {
        return `/api/carrier-image?path=${encodeURIComponent(`${url.pathname}${url.search}`)}`;
      }
      return image;
    } catch {
      return null;
    }
  }
  if (/^(data:|blob:)/i.test(image)) return image;
  return `/${image.replace(/^\/+/, "").replace(/^public[\\/]/, "")}`;
}

function normalizeGalleryKey(value: string): string {
  return value
    .toLocaleLowerCase("pl-PL")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ł/g, "l")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Strona główna", item: "https://wielkiformat.pl" },
    { "@type": "ListItem", position: 2, name: "Galeria realizacji", item: "https://wielkiformat.pl/galeria" },
  ],
};

export default async function Page() {
  const items = await loadGallery();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <GaleriaPage items={items} />
    </>
  );
}
