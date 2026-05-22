/**
 * ════════════════════════════════════════════════════════════════════
 *  PRZEŁĄCZNIK WIDOCZNOŚCI ZAKŁADEK W MENU
 * ════════════════════════════════════════════════════════════════════
 *
 *  Aby pokazać zakładkę spowrotem w nawigacji (Header + Footer) —
 *  ustaw wartość na `false`. Aby ukryć — `true`.
 *
 *  UWAGA: To ukrywa TYLKO linki w menu i stopce. Same strony
 *  (/nosniki, /galeria itd.) nadal istnieją i są dostępne pod
 *  bezpośrednim URL — możesz je lokalnie modyfikować i testować
 *  wpisując adres ręcznie w przeglądarce, np.:
 *    http://localhost:3000/galeria
 *    http://localhost:3000/nosniki
 *
 *  Gdy strona będzie gotowa do publikacji — zmień flagę na `false`
 *  i link automatycznie pojawi się w Header + Footer.
 * ════════════════════════════════════════════════════════════════════
 */
export const HIDDEN_NAV_HREFS: ReadonlySet<string> = new Set<string>([
  "/nosniki",   // Nośniki i mapa — ukryte, w trakcie dopracowywania
  "/galeria",   // Galeria — ukryta, w trakcie dopracowywania
]);

export const isNavHidden = (href: string): boolean => HIDDEN_NAV_HREFS.has(href);
