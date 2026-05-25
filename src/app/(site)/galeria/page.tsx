import type { Metadata } from "next";
import { promises as fs } from "node:fs";
import path from "node:path";
import { TemporarySectionNotice } from "@/components/TemporarySectionNotice";
import { SHOW_REAL_GALLERY_PAGE } from "@/lib/publication-flags";
import GaleriaPage, { type GalleryItem } from "@/routes/galeria";

const realMetadata: Metadata = {
  title: "Galeria realizacji - billboardy i nośniki reklamowe",
  description:
    "Nasze realizacje - billboardy, citylighty i powierzchnie wielkoformatowe w Warszawie i na Mazowszu. Zobacz przykładowe nośniki reklamowe z naszego portfolio.",
  openGraph: {
    title: "Galeria realizacji - Wielkiformat.pl",
    description:
      "Zrealizowane kampanie i nośniki reklamowe w województwie mazowieckim.",
  },
  alternates: {
    canonical: "https://wielkiformat.pl/galeria",
  },
};

const temporaryMetadata: Metadata = {
  title: "Galeria realizacji w aktualizacji",
  description:
    "Aktualizujemy galerię realizacji Wielkiformat.pl. W sprawie przykładów realizacji i doboru nośników skontaktuj się z naszym zespołem.",
  alternates: {
    canonical: "https://wielkiformat.pl/galeria",
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Galeria realizacji w aktualizacji - Wielkiformat.pl",
    description:
      "Aktualizujemy galerię realizacji. W sprawie przykładów kampanii skontaktuj się z naszym zespołem.",
    url: "https://wielkiformat.pl/galeria",
  },
};

export const metadata: Metadata = SHOW_REAL_GALLERY_PAGE
  ? realMetadata
  : temporaryMetadata;

const EXCLUDED = new Set(["billboardy.jpg", "montaz.jpg", "z nosnikiem.jpg"]);
const GALLERY_PUBLIC_DIR = "Z";

function titleFromFilename(name: string): { title: string; location?: string } {
  const base = name.replace(/\.[^.]+$/, "").trim();
  const cleaned = base
    .replace(/_/g, " ")
    .replace(/\s+\(\d+\)\s*$/, "")
    .replace(/\.+$/, "")
    .trim();

  const match = cleaned.match(/^([0-9A-Za-z]+)\.?\s+(.+)$/);
  if (match && /\d/.test(match[1])) {
    return { title: match[2].trim(), location: `Nośnik ${match[1]}` };
  }
  return { title: cleaned };
}

async function loadGallery(): Promise<GalleryItem[]> {
  const dir = path.join(process.cwd(), "public", GALLERY_PUBLIC_DIR);
  let entries: string[] = [];
  try {
    entries = await fs.readdir(dir);
  } catch {
    return [];
  }

  return entries
    .filter((name) => /\.(jpe?g|png|webp)$/i.test(name))
    .filter((name) => !EXCLUDED.has(name.toLowerCase()))
    .sort((a, b) => a.localeCompare(b, "pl"))
    .map((name) => {
      const { title, location } = titleFromFilename(name);
      return {
        src: `/${GALLERY_PUBLIC_DIR}/${encodeURIComponent(name)}`,
        title,
        location,
      };
    });
}

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Strona główna", item: "https://wielkiformat.pl" },
    { "@type": "ListItem", position: 2, name: "Galeria realizacji", item: "https://wielkiformat.pl/galeria" },
  ],
};

export default async function Page() {
  if (!SHOW_REAL_GALLERY_PAGE) {
    return (
      <TemporarySectionNotice
        eyebrow="Galeria realizacji"
        title="Odświeżamy portfolio realizacji."
        description="Aktualizujemy zdjęcia nośników i opisy kampanii, żeby galeria pokazywała aktualne, sprawdzone przykłady. Jeśli potrzebujesz referencji do briefu, dobierzemy je bezpośrednio pod branżę i lokalizację."
        note="Do czasu zakończenia aktualizacji możemy wysłać przykłady realizacji dobrane pod branżę, format i planowany region kampanii."
        links={[
          {
            href: "/druk-i-montaz-reklamy",
            title: "Druk i montaż",
            description:
              "Zobacz, jak prowadzimy produkcję, montaż i dokumentację kampanii.",
          },
          {
            href: "/obsluga-kampanii",
            title: "Obsługa kampanii",
            description:
              "Proces od briefu i projektu po montaż, kontrolę oraz raport zdjęciowy.",
          },
          {
            href: "/kontakt",
            title: "Kontakt",
            description:
              "Poproś o przykłady realizacji dopasowane do Twojej kampanii.",
          },
        ]}
      />
    );
  }

  const items = await loadGallery();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <GaleriaPage items={items} />
    </>
  );
}
