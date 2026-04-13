import type { Metadata } from "next";
import HomePage from "@/routes/index";

export const metadata: Metadata = {
  title: "Billboardy i reklama wielkoformatowa w Polsce",
  description:
    "Billboardy i reklama wielkoformatowa na terenie całej Polski. Ponad 25 lat doświadczenia, 2500+ kampanii rocznie.",
  alternates: {
    canonical: "https://wielkiformat.pl",
  },
};

export default function Page() {
  return <HomePage />;
}
