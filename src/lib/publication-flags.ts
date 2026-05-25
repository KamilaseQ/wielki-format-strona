const TRUE_VALUES = new Set(["1", "true", "yes", "on"]);

function envFlag(name: string): boolean {
  return TRUE_VALUES.has((process.env[name] ?? "").trim().toLowerCase());
}

// Temporary publication switches.
// false: show a noindex maintenance notice.
// true: show the real page content and include it in public SEO surfaces.
export const SHOW_REAL_CARRIERS_PAGE = envFlag("SHOW_REAL_CARRIERS_PAGE");
export const SHOW_REAL_GALLERY_PAGE = envFlag("SHOW_REAL_GALLERY_PAGE");
