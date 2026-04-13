import type { Metadata } from "next";
import ContactPage from "@/routes/kontakt";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Skontaktuj sie z nami. Zapytaj o dostepnosc billboardow, popros o wycene lub umow rozmowe.",
};

export default function Page() {
  return <ContactPage />;
}
