import type { Metadata } from "next";
import CarriersPage from "@/features/carriers/CarriersPage";

export const metadata: Metadata = {
  title: "Mapa nośników reklamowych",
  description:
    "Interaktywna mapa nośników billboardowych w całej Polsce. Poznaj lokalizacje, formaty i rozmieszczenie nośników.",
  openGraph: {
    title: "Mapa nośników reklamowych - wielkiformat.pl",
    description:
      "Interaktywna mapa nośników billboardowych w całej Polsce.",
  },
  alternates: {
    canonical: "https://wielkiformat.pl/nosniki",
  },
};

export default function Page() {
  return <CarriersPage />;
}
