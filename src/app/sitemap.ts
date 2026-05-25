import type { MetadataRoute } from "next";
import { citySlugs } from "@/lib/cities";
import {
  SHOW_REAL_CARRIERS_PAGE,
  SHOW_REAL_GALLERY_PAGE,
} from "@/lib/publication-flags";

const baseUrl = "https://wielkiformat.pl";

type Entry = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

const entries: Entry[] = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/o-nas", changeFrequency: "monthly", priority: 0.8 },
  ...(SHOW_REAL_CARRIERS_PAGE
    ? [{ path: "/nosniki", changeFrequency: "monthly", priority: 0.9 } as Entry]
    : []),
  { path: "/wynajem", changeFrequency: "monthly", priority: 0.9 },
  { path: "/obsluga-kampanii", changeFrequency: "monthly", priority: 0.8 },
  { path: "/cennik", changeFrequency: "monthly", priority: 0.8 },
  { path: "/druk-i-montaz-reklamy", changeFrequency: "monthly", priority: 0.7 },
  { path: "/dla-grafikow", changeFrequency: "yearly", priority: 0.6 },
  ...(SHOW_REAL_GALLERY_PAGE
    ? [{ path: "/galeria", changeFrequency: "monthly", priority: 0.7 } as Entry]
    : []),
  { path: "/kontakt", changeFrequency: "monthly", priority: 0.8 },
  { path: "/polityka-prywatnosci", changeFrequency: "yearly", priority: 0.3 },
  { path: "/regulamin", changeFrequency: "yearly", priority: 0.3 },
  ...citySlugs.map<Entry>((slug) => ({
    path: `/${slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return entries.map(({ path, changeFrequency, priority }) => ({
    url: `${baseUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
