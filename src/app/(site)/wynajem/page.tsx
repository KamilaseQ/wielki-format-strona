import type { Metadata } from "next";
import RentalPage from "@/routes/wynajem";

export const metadata: Metadata = {
  title: "Wynajem billboardow",
  description:
    "Wynajmij billboard w dowolnym miescie w Polsce. Sprawdz dostepnosc nosnikow i zarezerwuj termin kampanii.",
};

export default function Page() {
  return <RentalPage />;
}
