import type { Metadata } from "next";
import HomePage from "@/routes/index";

export const metadata: Metadata = {
  title: "Billboardy i reklama wielkoformatowa w Polsce",
  description:
    "Billboardy i reklama wielkoformatowa na terenie calej Polski. Ponad 25 lat doswiadczenia, 2500+ kampanii rocznie.",
};

export default function Page() {
  return <HomePage />;
}
