import type { Metadata } from "next";
import HomePage from "@/routes/index";
import { SiteShell } from "@/components/SiteShell";

export const metadata: Metadata = {
  title: "Billboardy i reklama wielkoformatowa w województwie mazowieckim",
  description:
    "Billboardy i reklama wielkoformatowa w województwie mazowieckim. 1400+ nośników, działamy od 1998 roku, 2500+ kampanii rocznie.",
  alternates: {
    canonical: "https://wielkiformat.pl",
  },
};

export default function Page() {
  return (
    <SiteShell>
      <HomePage />
    </SiteShell>
  );
}
