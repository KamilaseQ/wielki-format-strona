import type { Metadata } from "next";
import { promises as fs } from "node:fs";
import path from "node:path";
import { ThemeProvider } from "@/components/ThemeProvider";
import CarriersPage from "@/features/carriers/CarriersPage";
import { parseBillboardsXml, type Carrier } from "@/features/carriers/data";
import { publishCarriersWithTrafficEstimates } from "@/features/carriers/traffic-estimates";
import { cities } from "@/lib/cities";

const realMetadata: Metadata = {
  title: "Mapa nośników reklamowych",
  description:
    "Interaktywna mapa nośników billboardowych w województwie mazowieckim. Poznaj lokalizacje, formaty i rozmieszczenie ponad 1400 nośników.",
  alternates: {
    canonical: "https://wielkiformat.pl/nosniki",
  },
  keywords: [
    "mapa billboardów",
    "mapa nośników reklamowych",
    "billboardy mazowieckie",
    "billboardy Warszawa",
    "lokalizacje billboardów",
    "nośniki reklamowe mazowieckie",
    "wynajem billboardów mazowieckie",
  ],
  openGraph: {
    title: "Mapa nośników reklamowych - Wielkiformat.pl",
    description:
      "Interaktywna mapa nośników billboardowych w województwie mazowieckim.",
    url: "https://wielkiformat.pl/nosniki",
  },
};

export const metadata: Metadata = realMetadata;

async function loadCarriers(): Promise<Carrier[]> {
  const dataFile =
    process.env.CARRIERS_DATA_FILE ?? "billboards-loadtest-1400.xml";
  const xmlPath = path.isAbsolute(dataFile)
    ? dataFile
    : path.join(process.cwd(), "public", "data", dataFile);

  let xml: string;
  try {
    xml = await fs.readFile(xmlPath, "utf8");
  } catch {
    const fallbackPath = path.join(
      process.cwd(),
      "public",
      "data",
      "billboards-sample-200.xml"
    );
    xml = await fs.readFile(fallbackPath, "utf8");
  }

  const carriers = publishCarriersWithTrafficEstimates(parseBillboardsXml(xml));

  return Promise.all(
    carriers.map(async (carrier) => {
      if (!carrier.image || /^(https?:|data:|blob:)/i.test(carrier.image)) {
        return carrier;
      }

      const relativeImagePath = carrier.image
        .replace(/^\/+/, "")
        .replace(/^public[\\/]/, "");
      const imagePath = path.join(process.cwd(), "public", relativeImagePath);

      try {
        await fs.access(imagePath);
        return carrier;
      } catch {
        return { ...carrier, image: null };
      }
    })
  );
}

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Strona główna", item: "https://wielkiformat.pl" },
    { "@type": "ListItem", position: 2, name: "Mapa nośników", item: "https://wielkiformat.pl/nosniki" },
  ],
};

const cityListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Lokalizacje nośników w miastach Mazowsza",
  itemListElement: cities.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `https://wielkiformat.pl/${c.slug}`,
    name: `Billboardy ${c.name}`,
  })),
};

export default async function Page() {
  const carriers = await loadCarriers();
  return (
    <ThemeProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cityListJsonLd) }}
      />
      <CarriersPage carriers={carriers} />
    </ThemeProvider>
  );
}
