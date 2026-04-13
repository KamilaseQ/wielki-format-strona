import type { MetadataRoute } from "next";

const baseUrl = "https://wielkiformat.pl";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/o-nas",
    "/nosniki",
    "/wynajem",
    "/obsluga-kampanii",
    "/kontakt",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}
