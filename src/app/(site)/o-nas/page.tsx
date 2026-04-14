import type { Metadata } from "next";
import AboutPage from "@/routes/o-nas";

export const metadata: Metadata = {
  title: "O nas",
  description:
    "Poznaj Billboard Sp. z o.o. - ponad 25 lat doświadczenia w reklamie wielkoformatowej i billboardach.",
  alternates: {
    canonical: "https://wielkiformat.pl/o-nas",
  },
};

export default function Page() {
  return <AboutPage />;
}
