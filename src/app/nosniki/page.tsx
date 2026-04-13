import type { Metadata } from "next";
import "leaflet/dist/leaflet.css";
import CarriersPage from "@/routes/nosniki";

export const metadata: Metadata = {
  title: "Mapa nośników reklamowych",
  description:
    "Interaktywna mapa nośników billboardowych w całej Polsce. Sprawdź dostępność i lokalizacje.",
  openGraph: {
    title: "Mapa nośników reklamowych — wielkiformat.pl",
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
