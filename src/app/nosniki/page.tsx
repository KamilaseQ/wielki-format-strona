import type { Metadata } from "next";
import { promises as fs } from "node:fs";
import path from "node:path";
import { ThemeProvider } from "@/components/ThemeProvider";
import CarriersPage from "@/features/carriers/CarriersPage";
import { parseBillboardsXml, type Carrier } from "@/features/carriers/data";
import { cities } from "@/lib/cities";

export const metadata: Metadata = {
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
    title: "Mapa nośników reklamowych - wielkiformat.pl",
    description:
      "Interaktywna mapa nośników billboardowych w województwie mazowieckim.",
    url: "https://wielkiformat.pl/nosniki",
  },
};

async function loadCarriers(): Promise<Carrier[]> {
  const dataFile = process.env.CARRIERS_DATA_FILE ?? "billboards-sample-200.xml";
  const xmlPath = path.isAbsolute(dataFile)
    ? dataFile
    : path.join(process.cwd(), "public", "data", dataFile);

  let xml: string;
  try {
    xml = await fs.readFile(xmlPath, "utf8");
  } catch {
    const fallbackPath = path.join(process.cwd(), "public", "data", "billboards.xml");
    xml = await fs.readFile(fallbackPath, "utf8");
  }

  return parseBillboardsXml(xml);
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
