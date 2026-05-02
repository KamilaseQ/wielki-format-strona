import type { Metadata } from "next";
import HomePage from "@/routes/index";
import { SiteShell } from "@/components/SiteShell";

export const metadata: Metadata = {
  title: "Billboardy i reklama wielkoformatowa w województwie mazowieckim",
  description:
    "Billboardy i reklama wielkoformatowa w województwie mazowieckim. 1400+ nośników, działamy od 1998 roku, 2500+ kampanii rocznie.",
  alternates: {
    canonical: "https://wielki-format-strona.vercel.app",
  },
};

export default function Page() {
  return (
    <SiteShell>
      <HomePage />
    </SiteShell>
  );
}
