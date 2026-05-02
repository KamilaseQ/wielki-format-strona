import type { Metadata } from "next";
import AboutPage from "@/routes/o-nas";

export const metadata: Metadata = {
  title: "O nas",
  description:
    "Poznaj Billboard Sp. z o.o. - działamy od 1998 roku w reklamie wielkoformatowej i billboardach.",
  alternates: {
    canonical: "https://wielki-format-strona.vercel.app/o-nas",
  },
};

export default function Page() {
  return <AboutPage />;
}
