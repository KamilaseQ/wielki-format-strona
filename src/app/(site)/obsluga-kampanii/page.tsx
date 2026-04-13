import type { Metadata } from "next";
import CampaignServicePage from "@/routes/obsluga-kampanii";

export const metadata: Metadata = {
  title: "Kompleksowa obsluga kampanii",
  description:
    "Pelna obsluga kampanii billboardowej: projekt, druk, montaz, demontaz i dokumentacja fotograficzna.",
};

export default function Page() {
  return <CampaignServicePage />;
}
