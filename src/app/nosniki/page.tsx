import type { Metadata } from "next";
import { promises as fs } from "node:fs";
import path from "node:path";
import CarriersPage from "@/features/carriers/CarriersPage";
import { parseBillboardsXml, type Carrier } from "@/features/carriers/data";

export const metadata: Metadata = {
  title: "Mapa nośników reklamowych",
  description:
    "Interaktywna mapa nośników billboardowych w województwie mazowieckim. Poznaj lokalizacje, formaty i rozmieszczenie ponad 1400 nośników.",
  openGraph: {
    title: "Mapa nośników reklamowych - wielkiformat.pl",
    description:
      "Interaktywna mapa nośników billboardowych w województwie mazowieckim.",
  },
  alternates: {
    canonical: "https://wielki-format-strona.vercel.app/nosniki",
  },
};

async function loadCarriers(): Promise<Carrier[]> {
  const xmlPath = path.join(process.cwd(), "public", "data", "billboards.xml");
  const xml = await fs.readFile(xmlPath, "utf8");
  return parseBillboardsXml(xml);
}

export default async function Page() {
  const carriers = await loadCarriers();
  return <CarriersPage carriers={carriers} />;
}
