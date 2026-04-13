import type { Metadata } from "next";
import "leaflet/dist/leaflet.css";
import CarriersPage from "@/routes/nosniki";

export const metadata: Metadata = {
  title: "Mapa nosnikow reklamowych",
  description:
    "Interaktywna mapa nosnikow billboardowych w calej Polsce. Sprawdz dostepnosc i lokalizacje.",
};

export default function Page() {
  return <CarriersPage />;
}
