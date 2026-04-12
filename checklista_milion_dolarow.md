# 🏆 WIELKI FORMAT — Checklista „Strona warta milion dolarów" v3

> Rozszerzona analiza + plan wdrożenia oparty o trendy web design 2026:
> immersive 3D, scrollytelling, volumetric UI, Aurora UI, spatial depth, interactive maps.
> 
> **Zasada nadrzędna:** Każda animacja musi służyć celowi — prowadzić wzrok, wzmacniać brand, ułatwiać konwersję. Bez efektów dla samych efektów. `prefers-reduced-motion` fallback na wszystkim.

---

## Legenda

| Priorytet | Znaczenie |
|-----------|-----------|
| **P0** | Krytyczne |
| **P1** | Ważne — podnosi o poziom |
| **P2** | Premium — last 10% |
| ✅ | Zrobione |
| 🔲 | Do zrobienia (frontend) |
| ⏳ | Wymaga materiałów od usera |

---

## ═══ FAZA A: OBIEKTY 3D I ANIMACJE ═══

### A1. 🎲 3D TILT CARDS Z EFEKTEM GŁĘBI

- ✅ **P1** — `TiltCard` z `perspective(800px)` + `rotateX/Y` na karcie „2500+ kampanii" — działa
- ✅ **P1** — Zastosować `TiltCard` na kartach **usług** (ServicesSection) — hover tilt + radial glow + translateZ
- ✅ **P1** — Zastosować `TiltCard` na kartach **wartości** na `/o-nas` — translateZ na liczbach i labelach
- ✅ **P2** — Zastosować `TiltCard` na kartach **formatów** na `/wynajem` — depth na badge „Popularny"
- 🔲 **P2** — Dodać wariant `TiltCard` z mouse-follow glow na podstronach

### A2. 🪁 FLOATING 3D OBJECTS (CSS + motion/react)

> Trend 2026: ornamenty 3D unoszące się wokół hero / CTA — delikatne, geometryczne kształty.
> Użyć CSS `perspective + rotate3d + translate3d` + `animate-float`. Bez WebGL = zero kosztu performance.

- ❌ **USUNIĘTE** — **Hero**: Floating shapes usunięte na życzenie użytkownika
- ❌ **USUNIĘTE** — **CTA section**: Floating shapes usunięte na życzenie użytkownika
- ❌ **USUNIĘTE** — **Hero podstron**: SubpageHeroFloatingShape usunięty ze wszystkich podstron

### A3. 🌊 PARALLAX DEPTH LAYERS (Scrollytelling)

> Trend 2026: elementy przesuwające się z różną prędkością scroll = poczucie 3D.
> Użyć `useScroll` + `useTransform` z motion/react.

- ✅ **P0** — Hero image parallax: działa (`bgY` = transform na scrollu)
- ✅ **P1** — **Editorial Stats**: Prawa kolumna z useTransform parallax (±30px) — wrażenie głębi
- ✅ **P1** — **Testimonials**: Karty z różnym `translateY` na scroll (parallax stagger -15/0/+15px)
- ✅ **P2** — **ProcessTimeline**: Dots na linii timeline pojawiają się z `scale 0` do `scale 1` w miarę scrollu
- ✅ **P2** — **Footer**: Logo i kolumny z delikatnym parallax

### A4. ✨ AURORA / GLOW EFFECTS (Enhanced)

> Trend 2026: Large animated blurry color blobs + translucent UI = Aurora UI.
> Już mamy `AmbientGlow` orbs — ale mogą być lepsze.

- ✅ **P1** — AmbientGlow: 3 float-owe blobs w tle strony
- ✅ **P1** — **Scroll-responsive glow**: CTA blob rośnie opacity (4%→12%) i scale (0.8→1.2) na scrollu
- ✅ **P1** — **Gradient morph**: Hero glow blob — animate-gradient-morph (red → warm orange → red, 6s)
- ✅ **P2** — **Aurora on hover**: Pricing cards z aurora blob podążającym za kursorem
- ✅ **P2** — **CTA glow intensification**: Przycisk CTA z proximity-based glow

### A5. 🎭 MICRO-ANIMACJE I INTERAKCJE

> Trend 2026: functional micro-interactions — subtelne, ale dające poczucie żywej strony.

- ✅ **P1** — Reveal animations (viewport enter)
- ✅ **P1** — Nav animated underline (motion layoutId)
- ✅ **P1** — TiltCard mouse follow glow
- ✅ **P1** — AnimatePresence na menu mobile + FAQ
- ✅ **P1** — **Magnetic buttons**: Przyciski CTA w hero podążają za kursorem (spring physics, max 4px)
- ✅ **P1** — **Staggered count-up**: Statystyki w hero z motion.div delay co 200ms
- ❌ **USUNIĘTE** — **Text scramble**: Efekt losowych znaków na „zostaje” usunięty na życzenie użytkownika (zastąpiony plain text)
- ✅ **P2** — **Hover ripple** na kartach usług: animacja ripple, subtelna, red glow
- ✅ **P2** — **Icon spin on hover**: Ikony w kartach usług obracają się o 15deg na hover (CSS .icon-spin-hover)
- ✅ **P2** — **Number ticker**: NumberTicker component gotowy (rAF + cubic ease-out)

### A6. 📜 SCROLLYTELLING — NARRACJA SCROLLEM

> Trend 2026: scroll = oś narracyjna. Sekcje przechodzą płynnie.

- ✅ **P1** — **Horizontal scroll showcase**: ClientShowcase — karty scrollują horyzontalnie na desktop
- ✅ **P2** — **Masking text reveal**: Nagłówek w EditorialStats — clip-path animowany scroll-driven
- ✅ **P2** — **Section color transitions**: Tło strony zmienia odcień między sekcjami

---

## ═══ FAZA B: REDESIGN "NOŚNIKI I MAPA" ═══

> **INSTRUKCJA: ~~Usunąć całą zawartość obecnego nosniki.tsx i napisać od nowa.~~ ZROBIONE**
> Wzór UX: InPost Paczkomat Finder — pełnoekranowa mapa z bocznym panelem.
> Na razie iframe Google Maps — docelowo `@vis.gl/react-google-maps`.

### B1. 📐 ARCHITEKTURA LAYOUTU

- ✅ **P0** — **Full-screen layout**: `height: 100vh`, flexbox horizontal — sidebar 380px + mapa flex-1
- ✅ **P0** — **Toolbar**: logo + search bar + filter toggle + stats + mobile toggle + link home
- ✅ **P0** — **Usunięto**: SVG Polski, custom markery, grid background — zastąpiono Google Maps iframe

### B2. 🗺️ GOOGLE MAPS EMBED

- ✅ **P0** — Iframe Google Maps embed — centrum Polski, pełnoekranowy
- ✅ **P1** — **Custom dark style**: grayscale 80% + brightness 60% + hue-rotate + contrast
- 🔲 **P1** — Docelowo: Migracja na `@vis.gl/react-google-maps` z `AdvancedMarker` + `Pin`
- 🔲 **P2** — `@googlemaps/markerclusterer` — grupowanie pinezek w clustery

### B3. 📍 PINEZKI / MARKERY

- ✅ **P0** — **15 pinezek** rozłożonych po polskich miastach z danymi tymczasowymi (Carrier interface)
- 🔲 **P1** — **Custom marker design na mapie**: Pinezki na mapie (wymaga API, nie iframe)
- 🔲 **P1** — **Tooltip on hover na mapie**: (wymaga API)
- 🔲 **P1** — **Selected state na mapie**: (wymaga API)
- ⏳ **P2** — Podmiana danych tymczasowych na dane z pliku usera

### B4. 🔎 PANEL WYSZUKIWANIA I FILTRÓW

- ✅ **P0** — **Search bar** z debounce 300ms, clear button, placeholder, aria-label
- ✅ **P0** — **Filtry**: miasto, typ nośnika, status (dropdowny) — AnimatePresence slide
- ✅ **P0** — **Counter wyników**: „15 nośników · 10 wolnych" dynamicznie aktualizowany
- ✅ **P1** — **Clear All**: Przycisk „Wyczyść filtry" (widoczny tylko z aktywnymi filtrami)
- ✅ **P1** — **Empty state**: „Brak nośników w tym obszarze" + link „Wyczyść filtry"

### B5. 📋 LISTA NOŚNIKÓW (SIDEBAR)

- ✅ **P0** — **Lista kart**: Kompaktowe karty z kodem, miastem, formatem, statusem, oświetleniem
- ✅ **P1** — **Sortowanie**: Dropdown sortuj wg miasta/formatu/statusu
- 🔲 **P1** — **Scroll sync**: Klik markera na mapie scrolluje listę (wymaga API)
- 🔲 **P2** — **Lazy rendering**: Virtualized list (react-window)

### B6. 📐 PANEL SZCZEGÓŁÓW NOŚNIKA

- ✅ **P0** — **Slide-in panel**: zdjęcie, kod, adres, typ, format, status badge, CTA + telefon
- ✅ **P1** — **Parametry**: Ruch dzienny, widoczność % — animated progress bars
- ✅ **P1** — **Back button**: ChevronLeft + AnimatePresence slide transition
- 🔲 **P2** — **Share link**: URL z ID nośnika (URL params)

### B7. 📱 MOBILE UX

- ✅ **P0** — **Bottom sheet** na mobile: spring animated slide-up na selected carrier
- ✅ **P1** — **Map/List toggle**: Przycisk z ikoną List/MapIcon
- ✅ **P1** — **Geolocation**: Przycisk Navigation na mapie (placeholder impl.)
- 🔲 **P2** — **Pełny 3-stanowy BottomSheet** z drag gesture (komponent gotowy, do podłączenia)

### B8. ⚡ PERFORMANCE

- 🔲 **P1** — Lazy-load iframe (route-based = OK, bo subpage)
- ✅ **P1** — `contentVisibility: auto` na liście nośników
- ✅ **P1** — Debounce search input (300ms)
- ✅ **P2** — Memoization filtrów (`useMemo` na filtered + sorted list)

---

## ═══ FAZA C: POZOSTAŁE ELEMENTY FRONTENDOWE ═══

### C1. 🎬 HERO & PIERWSZE WRAŻENIE

- ⏳ **P0** — Własne zdjęcie/film billboardu zamiast Unsplash (user dostarczy)
- ⏳ **P0** — Hero video w tle (user dostarczy)
- ✅ **P1** — Social proof (4.9/5) pod statystykami
- ✅ **P1** — CTA benefit-driven + Mapa nośników
- ✅ **P2** — FOMO counter „47 nośników dostępnych"
- ✅ **P2** — Scroll-down indicator

### C2. 🔤 TYPOGRAFIA

- ✅ **P1** — Zróżnicowanie wag fontów
- ✅ **P1** — Accent font (DM Serif Display) na „zostaje"
- ✅ **P2** — Fluid typography (`clamp()`)
- ✅ **P2** — **Custom letter-spacing**: h1-h6 (-0.03em auto), .tracking-label (0.02em) utility

### C3. 🧭 NAWIGACJA

- ⏳ **P0** — Właściwe logo SVG
- ✅ **P0** — Header scroll shrink animation
- ✅ **P1** — Nawigacja 5 linków
- ✅ **P1** — Mobile menu AnimatePresence
- ✅ **P1** — Footer redesign 4-kolumnowy
- 🔲 **P2** — **Mega-menu** na desktop
- ✅ **P2** — Animated underline (layoutId)

### C4. 🏅 SOCIAL PROOF

- ⏳ **P0** — Prawdziwe logotypy klientów SVG
- ✅ **P0** — Sekcja testimoniali
- ⏳ **P0** — Case studies z danymi
- ✅ **P1** — Social proof w hero i CTA
- ⏳ **P1** — Certyfikaty/partnerstwa

### C5. 💰 KONWERSJA

- 🔲 **P0** — Backend formularza (wymaga serwera)
- ✅ **P0** — Inline walidacja + animacje
- ✅ **P1** — CTA benefit-driven „Chcę otrzymać wycenę"
- ✅ **P1** — Social proof pod formularzem
- ✅ **P1** — Sticky mobile CTA
- ✅ **P2** — Success state animacja
- 🔲 **P2** — **Multi-step formularz** (3 kroki z progress bar)

### C6. 📄 PODSTRONY

- ✅ Reveal animacje na wszystkich
- ✅ Hero + CTA na wszystkich

| Podstrona | Zrobione | Do zrobienia |
|-----------|----------|-------------|
| O nas | Timeline ✅, W liczbach ✅ | Zespół ⏳ |
| Wynajem | Formaty ✅, Kalkulator ✅, FAQ ✅ | — |
| Obsługa | Image cards ✅, Before/After ✅ | Video showreel ⏳ |
| Kontakt | Google Maps ✅, Trust badges ✅ | Calendly 🔲 |

### C7. 🚀 PERFORMANCE

- ✅ Width/height na img, fetchpriority hero, prefers-reduced-motion
- ✅ Preload hero image
- ✅ Lenis smooth scroll
- ⏳ Self-hosted WebP/AVIF
- 🔲 **P1** — Usunąć nieużywane Radix UI komponenty
- 🔲 **P1** — Zweryfikować `framer-motion` vs `motion` duplikację
- 🔲 **P2** — Font subsetting
- 🔲 **P2** — PWA manifest + Service Worker

### C8. 🔍 SEO & DOSTĘPNOŚĆ

- ✅ favicon, alt texts, robots.txt, sitemap, OG tags, JSON-LD, canonical, aria-labels, skip-to-content, focus styles
- 🔲 **P2** — hreflang (jeśli EN)

### C9. ✨ POLISH

- ⏳ Prawdziwe dane firmowe
- ✅ Page transitions, 404 page, cookie consent, back-to-top, custom cursor, scroll progress, loading splash
- 🔲 **P2** — Dark/Light mode toggle
- 🔲 **P2** — Easter egg (Konami code)

---

## ═══ PODSUMOWANIE STATUSU ═══

### 📊 Statystyki

| Kategoria | ✅ Done | 🔲 TODO (frontend) | ⏳ User materials |
|-----------|:---:|:---:|:---:|
| A: 3D / Animacje | 20 | 8 | 0 |
| B: Mapa nośników | 19 | 8 | 1 |
| C: Pozostałe | 44 | 10 | 9 |
| **RAZEM** | **83** | **26** | **10** |

### 🎯 KOLEJNOŚĆ WDROŻENIA (sugerowana)

1. ~~**Faza B** — Redesign mapy nośników~~ ✅ DONE (19/28)
2. **Faza A** — Obiekty 3D i animacje (floating shapes, parallax, magnetic buttons)
3. **Faza C** — Pozostałe drobne ulepszenia frontendowe

### 🗂️ NOWE PLIKI DO STWORZENIA

| Plik | Status |
|------|--------|
| `src/routes/nosniki.tsx` | ✅ KOMPLETNY REWRITE |
| `src/components/BottomSheet.tsx` | ✅ Gotowy (do podłączenia) |
| `src/components/FloatingShapes.tsx` | ✅ Gotowy |
| `src/components/MagneticButton.tsx` | ✅ Gotowy |
| `src/components/TextScramble.tsx` | ✅ Gotowy |
| `src/components/NumberTicker.tsx` | ✅ Gotowy |
| `src/components/HorizontalScroll.tsx` | 🔲 Do zrobienia |

### ⚠️ UWAGA

- **Nie używamy WebGL / Three.js / Spline** — zbyt ciężkie
- Wszystkie efekty 3D = **CSS `perspective` + `rotate3d` + `translateZ`** + **motion/react animate**
- Każda animacja ma fallback `prefers-reduced-motion: reduce` w CSS
- Google Maps — na razie **iframe embed** (tymczasowo), docelowo `@vis.gl/react-google-maps` po podaniu API key
