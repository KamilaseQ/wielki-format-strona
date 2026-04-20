import type { Metadata } from "next";
import CampaignServicePage from "@/routes/obsluga-kampanii";

export const metadata: Metadata = {
  title: "Kompleksowa obsługa kampanii",
  description:
    "Pełna obsługa kampanii billboardowej: projekt, druk, montaż, demontaż i dokumentacja fotograficzna.",
  alternates: {
    canonical: "https://wielki-format-strona.vercel.app/obsluga-kampanii",
  },
};

export default function Page() {
  return <CampaignServicePage />;
}
