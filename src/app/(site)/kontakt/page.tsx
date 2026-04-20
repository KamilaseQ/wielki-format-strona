import type { Metadata } from "next";
import ContactPage from "@/routes/kontakt";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Skontaktuj się z nami. Zapytaj o dostępność billboardów, poproś o wycenę lub umów rozmowę.",
  alternates: {
    canonical: "https://wielki-format-strona.vercel.app/kontakt",
  },
};

export default function Page() {
  return <ContactPage />;
}
