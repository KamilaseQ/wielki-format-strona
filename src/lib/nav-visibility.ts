export const HIDDEN_NAV_HREFS: ReadonlySet<string> = new Set<string>();

export const isNavHidden = (href: string): boolean => HIDDEN_NAV_HREFS.has(href);
