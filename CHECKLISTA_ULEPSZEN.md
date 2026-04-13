# 🔥 CHECKLISTA ULEPSZEŃ — wielkiformat.pl

> **Data analizy:** 13 kwietnia 2026  
> **Stan:** Projekt Next.js 16 + Tailwind 4 + Motion (Framer Motion)  
> **Cel:** Profesjonalna, konwersyjna strona premium klasy światowej

---

## 📐 I. ARCHITEKTURA & STRUKTURA KODU

### 1. ❌ Usunąć `@tanstack/react-router` — plik martwego kodu
**Co to jest:** W plikach `Header.tsx`, `Footer.tsx` i wszystkich route'ach importowany jest `@tanstack/react-router`, który w Next.js nie ma sensu. Istnieje shim w `router-shim.tsx`, ale jest to hack.  
**Co zrobić:** Zamienić wszystkie importy na natywne `next/link` i `next/navigation`. Usunąć `router-shim.tsx`.

### 2. ❌ Przenieść route pages z `/src/routes/` do `/src/app/(site)/`
**Co to jest:** Pliki stron (`index.tsx`, `kontakt.tsx`, `o-nas.tsx` itd.) żyją w katalogu `routes/`, który jest konwencją TanStack Routera, a nie Next.js App Router.  
**Co zrobić:** Każdy route powinien mieć swój katalog w `app/(site)/` z plikiem `page.tsx` (np. `app/(site)/kontakt/page.tsx`).

### 3. ❌ Usunąć nadmiarowe `"use client"` z plików route
**Co to jest:** Dyrektywa `"use client"` na początku każdego pliku route sprawia, że CAŁA strona jest komponentem klienckim — Next.js nie może zrobić SSR/RSC dla statycznej treści.  
**Co zrobić:** Rozdzielić komponenty: treść statyczna (teksty, SEO) → Server Component, elementy interaktywne (animacje, formularze) → osobne pliki z `"use client"`.

### 4. ❌ Zduplikowany komponent `Reveal` w 5 plikach
**Co to jest:** Identyczny komponent animacyjny `Reveal` jest copy-paste'owany w `index.tsx`, `o-nas.tsx`, `wynajem.tsx`, `kontakt.tsx`, `obsluga-kampanii.tsx`.  
**Co zrobić:** Wydzielić do `src/components/Reveal.tsx` i importować.

### 5. ❌ Plik `index.tsx` ma ~1000 linii — zbyt duży monolith
**Co to jest:** Strona główna zawiera ~15 sekcji w jednym pliku (988 linii). Utrudnia to maintenance i code reviews.  
**Co zrobić:** Wydzielić każdą sekcję do osobnego komponentu w `src/components/sections/` (np. `HeroSection.tsx`, `ServicesSection.tsx`).

### 6. ❌ Brak `error.tsx` i `loading.tsx` w App Router
**Co to jest:** Next.js App Router umożliwia tworzenie error boundary (`error.tsx`) i loading state (`loading.tsx`) per-route. Bez nich błąd runtime'u crashuje całą stronę.  
**Co zrobić:** Dodać `error.tsx` w katalogu `(site)` oraz opcjonalnie `loading.tsx` ze skeleton UI.

---

## ⚡ II. PERFORMANCE & CORE WEB VITALS

### 7. ❌ Użyć `next/image` zamiast `<img>`
**Co to jest:** Komponent `<Image>` z Next.js automatycznie optymalizuje obrazy — generuje WebP/AVIF, responsive sizes, lazy loading i zapobiega CLS (przesunięciom layoutu).  
**Co zrobić:** Zamienić WSZYSTKIE `<img>` na `<Image>` z `next/image`. W projekcie jest ~30+ tagów `<img>` do zamiany.

### 8. ❌ Użyć `next/font` zamiast Google Fonts z `<link>`
**Co to jest:** Ładowanie fontów przez `<link>` w `<head>` powoduje dodatkowe requesty sieciowe do `fonts.googleapis.com`, FOUT (Flash of Unstyled Text) i pogarsza CLS.  
**Co zrobić:** Zastąpić importem z `next/font/google` (np. `import { Inter, Space_Grotesk, DM_Serif_Display } from "next/font/google"`). Fonty będą self-hosted i zoptymalizowane.

### 9. ❌ Dynamiczny import Leaflet (`next/dynamic`)
**Co to jest:** Leaflet to ciężka biblioteka (~40 KB gzip) ładowana eager. Na stronie `/nosniki` powinna być ładowana jako chunk wyłącznie gdy jest potrzebna.  
**Co zrobić:** Użyć `next/dynamic` z `{ ssr: false }` i obwrapować komponent mapy w `<Suspense>` z fallbackiem skeleton.

### 10. ❌ Zbyt wiele animacji `will-change: transform`
**Co to jest:** `will-change` informuje GPU o nadchodzących zmianach. Ale użycie go na wielu elementach jednocześnie (Footer, testimonials, stats) zużywa pamięć GPU i może powodować jank na słabszych urządzeniach.  
**Co zrobić:** Stosować `will-change` tylko na aktywnie animowanych elementach, usuwać po zakończeniu animacji.

### 11. ❌ `contentVisibility: "auto"` na sekcjach z animacjami scroll
**Co to jest:** CSS `content-visibility: auto` pomija renderowanie off-screen elementów, co koliduje z Framer Motion `whileInView` — animacje mogą nie triggerować się poprawnie.  
**Co zrobić:** Usunąć `contentVisibility: "auto"` z sekcji, które mają animacje scroll-driven. Alternatywnie: użyć `contain-intrinsic-size`.

### 12. ❌ Preload zbyt wielu zasobów
**Co to jest:** W `layout.tsx` preloadowany jest obraz hero Unsplash (`rel="preload"`). To dobrze, ale preload powinien być warunkowy — tylko na stronie głównej.  
**Co zrobić:** Przenieść preload do strony głównej lub użyć `priority` prop na `<Image>`.

### 13. ⚠️ Bundle size — sprawdzić, jakie moduły z `lucide-react` są ładowane
**Co to jest:** `lucide-react` importuje ikony per-named-export. Jeśli bundler nie robi tree-shaking dobrze, cały pakiet ikon może trafić do bundle.  
**Co zrobić:** Sprawdzić bundle analyzerem (`@next/bundle-analyzer`) czy ikony są tree-shaked. Upewnić się, że importy są named (co już jest zrobione ✅).

---

## 🎨 III. DESIGN & UX

### 14. ❌ Dodać prawdziwe logo SVG zamiast litery "W"
**Co to jest:** Aktualnie logo to kwadrat z literą "W" w gradientowym tle. Wygląda generycznie i amatorsko dla strony premium.  
**Co zrobić:** Zaprojektować profesjonalne logo SVG lub zlecić grafikowi. Umieścić jako `<svg>` inline lub `<Image>` w headerze i footerze.

### 15. ❌ Prawdziwe zdjęcia zamiast stocków Unsplash
**Co to jest:** Wszystkie zdjęcia na stronie to generyczne stocki z Unsplash (biurowce, miasta, drukarki). Klient premium oczekuje autentycznych zdjęć firmowych.  
**Co zrobić:** Zrobić sesję zdjęciową własnych billboardów, montaży, biura, ekipy. Tymczasowo: przynajmniej zamienić na bardziej tematyczne zdjęcia billboardów outdoorowych.

### 16. ❌ Brak favicon i ikonek dla PWA/Apple
**Co to jest:** Istnieje plik `icon.svg` (512 bajtów), ale brak pełnego zestawu ikon (apple-touch-icon, favicon-32x32, manifest.webmanifest).  
**Co zrobić:** Wygenerować kompletny zestaw favicon. Dodać `manifest.webmanifest` z ikonami.

### 17. ❌ Social media placeholders (`#`) w footerze
**Co to jest:** Linki do FB, LI, IG prowadzą do `href="#"` — to wygląda jak niedokończona strona.  
**Co zrobić:** Podać prawdziwe URL-e social media firmy lub ukryć sekcję do momentu posiadania kont.

### 18. ❌ Brak wizualnej hierarchii między sekcjami CTA
**Co to jest:** Niemal każda podstrona kończy się identyczną sekcją CTA z tym samym designem (glow, gradient, przycisk). To zmniejsza impact i powoduje „ślepotę bannerową".  
**Co zrobić:** Zróżnicować CTA na różnych podstronach — inne wezwanie, inny layout (np. split z formularzem, social proof strip, video CTA).

### 19. ❌ Brak wideo na stronie
**Co to jest:** Profesjonalne strony premium 2026 używają krótkiego (5–15s) hero video lub background video do wow effectu. Strona ma tylko statyczne zdjęcia.  
**Co zrobić:** Dodać krótkie autoplay video (muted) w hero sekcji lub w sekcji "przed i po montażu". Użyć `<video>` z posterem.

### 20. ❌ Brak dark/light mode toggle
**Co to jest:** Strona jest wyłącznie dark-theme, bez możliwości przełączenia. W 2026 adaptacyjność motywu jest standardem premium.  
**Co zrobić:** Dodać toggle w headerze. Zdefiniować jasny motyw w CSS variables. Użyć `next-themes` do zarządzania preferencją.

### 21. ⚠️ Custom Cursor może irytować użytkowników
**Co to jest:** `CustomCursor.tsx` podmienia natywny kursor na kółko z glow. To efektowne, ale może utrudniać klikanie i jest kontrowersyjne z perspektywy UX.  
**Co zrobić:** Pozostawić jako opcję, ale dodać `prefers-reduced-motion` check. Wyłączyć na mobile (co jest zrobione ✅ — `@media (pointer: fine)`).

### 22. ❌ Dodać animację page transition między stronami
**Co to jest:** `SiteShell.tsx` ma `motion.div` z `key={pathname}`, ale przejście to tylko `opacity + y`. Bardziej premium feel dałaby animacja z progress barem lub wipe transition.  
**Co zrobić:** Dodać View Transitions API (obsługiwane w Chrome 2025+) lub bardziej zaawansowaną animację exit/enter.

### 23. ❌ Testimonials — dodać prawdziwe awatary (zdjęcia)
**Co to jest:** Opinie klientów mają inicjały zamiast zdjęć. To zmniejsza wiarygodność social proof.  
**Co zrobić:** Dodać prawdziwe zdjęcia klientów lub przynajmniej profesjonalne placeholder avatary. Najlepiej: prawdziwe zdjęcia z nazwą firmy i logotypem.

### 24. ❌ Brak sekcji case study / portfolio
**Co to jest:** Strona ma "Client Showcase" z generycznymi opisami (Sieć handlowa, Operator telekomunikacyjny), ale brak konkretnych case studies ze zdjęciami, metrykami i opisem.  
**Co zrobić:** Stworzyć dedykowaną podstronę lub sekcję z 3–5 case studies: zdjęcia przed/po, cel kampanii, wyniki, opinia klienta.

---

## 🔍 IV. SEO & META

### 25. ❌ Brak polskich znaków w meta description
**Co to jest:** W `layout.tsx` meta description zawiera "calej" zamiast "całej", "doswiadczenia" zamiast "doświadczenia". Google wyświetli to w snippetach — wygląda nieprofesjonalnie.  
**Co zrobić:** Poprawić wszystkie polskie znaki diakrytyczne w metadanych.

### 26. ❌ Brak OG:image
**Co to jest:** Open Graph (og:image) to zdjęcie wyświetlane przy udostępnianiu linku na social media (Facebook, LinkedIn, Twitter). Jego brak = generyczny szary prostokąt.  
**Co zrobić:** Stworzyć OG image 1200×630px z logo, hasłem i zdjęciem billboardu. Dodać do metadata w layout.tsx.

### 27. ❌ Strona 404 — brak polskich znaków
**Co to jest:** W `not-found.tsx` tekst jest bez diakrytyków: "Wroc na strone glowna", "zostala przeniesiona".  
**Co zrobić:** Dodać polskie znaki: "Wróć na stronę główną", "została przeniesiona".

### 28. ❌ Brak Schema.org — LocalBusiness i Service
**Co to jest:** Istnieje schema `Organization`, ale brak `LocalBusiness` (z godzinami pracy, mapą) i `Service` (opis usług). To pomaga w Google rich snippets.  
**Co zrobić:** Dodać JSON-LD `LocalBusiness` z: adres, telefon, godziny pracy, koordynaty GPS. Dodać `Service` schema na podstronach usług.

### 29. ❌ Brak Schema.org — FAQ
**Co to jest:** Strona `/wynajem` ma sekcję FAQ, ale bez strukturyzowanych danych FAQ. Google może wyświetlić pytania-odpowiedzi bezpośrednio w wynikach wyszukiwania jako rich snippet.  
**Co zrobić:** Dodać JSON-LD `FAQPage` schema z pytaniami i odpowiedziami ze strony wynajem.

### 30. ⚠️ Canonical URL na podstronach
**Co to jest:** Canonical URL jest ustawiony na `https://wielkiformat.pl` w `layout.tsx`, ale podstrony powinny mieć własne canonical URL-e.  
**Co zrobić:** Ustawić canonical per-page za pomocą metadata w każdym `page.tsx`.

### 31. ❌ Brak hreflang (jeśli planowana wersja wielojęzyczna)
**Co to jest:** Tag `hreflang` informuje Google o wersjach językowych strony. Obecnie `lang="pl"` jest ustawione, ale brak hreflang.  
**Co zrobić:** Jeśli planowana jest wersja EN — dodać `hreflang` tags. Jeśli nie — ten punkt można pominąć.

---

## ♿ V. DOSTĘPNOŚĆ (ACCESSIBILITY / A11Y)

### 32. ❌ Brak `aria-label` na wielu interaktywnych elementach
**Co to jest:** Elementy interaktywne (przyciski filtrów, linki social media w footerze, itp.) powinny mieć opisowe `aria-label` dla użytkowników czytników ekranu.  
**Co zrobić:** Przejrzeć WSZYSTKIE `<button>`, `<a>`, i `<input>` w projekcie i uzupełnić brakujące `aria-label`.

### 33. ❌ Kontrast kolorystyczny tekstu `text-muted-foreground/40`
**Co to jest:** Wiele tekstów pomocniczych (np. "Zasięg ogólnopolski", trust badges, numer telefonu w footerze) używa opacity 40–50%, co daje kontrast poniżej wymaganego 4.5:1 WCAG AA.  
**Co zrobić:** Podnieść minimalny kontrast. Zamiast `/40` użyć `/60` lub wyższej wartości. Przetestować narzędziem jak axe DevTools lub Lighthouse.

### 34. ❌ Brak `role="marquee"` alternatywy w Brand Ticker
**Co to jest:** Ticker marek ma `role="marquee"`, ale brak alternatywnego sposobu dostępu do listy marek. Czytnik ekranu nie odczyta auto-scrollowanego tickera.  
**Co zrobić:** Dodać `aria-hidden="true"` na ticker i visually-hidden listę marek dla czytników ekranu.

### 35. ❌ Formularz `LeadForm` — brakujące `<label>` dla pól
**Co to jest:** Pola formularza mają `placeholder` ale nie mają elementu `<label>`. Czytniki ekranu nie identyfikują pól prawidłowo.  
**Co zrobić:** Dodać `<label>` (can be `sr-only`) powiązane z każdym polem przez `htmlFor`/`id`.

### 36. ❌ Skip navigation link nie działa prawidłowo
**Co to jest:** `SiteShell.tsx` ma link "Przejdz do tresci" (bez polskich znaków!) z `href="#main-content"`, ale strona `/nosniki` renderuje MapTool poza `<main>` w SiteShell.  
**Co zrobić:** Poprawić polski tekst na "Przejdź do treści". Upewnić się, że `#main-content` jest obecny na każdej stronie.

### 37. ❌ Animacje bez `prefers-reduced-motion` w Motion components
**Co to jest:** CSS ma `@media (prefers-reduced-motion)`, ale Motion (Framer Motion) komponenty (`<motion.div>` z `whileInView`, `animate`) nie respektują tej preferencji.  
**Co zrobić:** Dodać globalny hook `useReducedMotion()` z Framer Motion i warunkować animacje. Albo: `<motion.div layout={!reducedMotion}>`.

---

## 🎯 VI. KONWERSJA & SALES FUNNEL

### 38. ❌ Formularz nie wysyła danych — tylko symulacja
**Co to jest:** `LeadForm.tsx` ma `setTimeout(() => { setSubmitted(true) }, 1200)` — formularz udaje wysyłanie, ale nic nie trafia na serwer.  
**Co zrobić:** Podpiąć formularz do API: email service (np. Resend, SendGrid), CRM (np. HubSpot), lub przynajmniej Next.js API Route wysyłający email.

### 39. ❌ Brak UTM tracking i analytics
**Co to jest:** Strona nie ma Google Analytics, Google Tag Manager, ani żadnego systemu śledzenia konwersji i ruchu.  
**Co zrobić:** Dodać GA4 lub Plausible/Umami (GDPR-friendly). Zaimplementować event tracking na: kliknięcia CTA, wysłanie formularza, kliknięcie numeru telefonu.

### 40. ❌ Brak pixel retargetingowy (Meta Pixel / Google Ads)
**Co to jest:** Bez pikseli remarketing nie jest możliwy. Firma traci możliwość retargetowania odwiedzających stronę w social media i Google Ads.  
**Co zrobić:** Dodać Meta Pixel i/lub Google Ads tag. Skonfigurować konwersje (formularz, telefon).

### 41. ❌ CTA „Sprawdź dostępność nośników" prowadzi do `/kontakt`
**Co to jest:** Główny przycisk hero CTA mówi „Sprawdź dostępność" ale prowadzi do strony kontaktowej, a nie do mapy nośników. To dezorientuje użytkownika.  
**Co zrobić:** Zmienić link na `/nosniki` (mapa) lub zmienić tekst CTA na coś zgodnego z destinacją (np. "Wyślij zapytanie").

### 42. ❌ Brak urgency i scarcity triggers na podstronach
**Co to jest:** Na stronie głównej jest "47 nośników dostępnych", ale brak tego na podstronach `/wynajem` i `/kontakt`.  
**Co zrobić:** Dodać dynamiczne info o liczbie wolnych nośników (nawet symulowane) na stronach konwersyjnych.

### 43. ❌ Exit-intent popup
**Co to jest:** Popup pojawiający się gdy użytkownik próbuje opuścić stronę — typowy element premium stron B2B.  
**Co zrobić:** Dodać delikatny (nie agresywny) exit-intent popup z ofertą "Darmowa konsultacja" lub "Pobierz cennik PDF".

### 44. ❌ Pricing Calculator — brak realnych kalkulacji
**Co to jest:** `PricingCalculator.tsx` istnieje, ale ceny są hardcoded i nie wynikają z żadnego modelu cenowego.  
**Co zrobić:** Skonsultować z działem handlowym i dodać realne widełki cenowe. Albo: zmienić na "Zapytaj o cenę" z kreatorem zapytania.

---

## 🔒 VII. BEZPIECZEŃSTWO & PRAWO

### 45. ❌ Cookie Consent — brak prawdziwej blokady cookies
**Co to jest:** `CookieConsent.tsx` pokazuje banner, ale nie blokuje żadnych cookies ani nie integruje się z systemem zarządzania zgodami. Nie spełnia wymagań RODO/GDPR.  
**Co zrobić:** Zintegrować z `cookie-consent-tool` lub `react-cookie-consent`. Blokować analityki i piksele do momentu akceptacji.

### 46. ❌ Brak strony Polityka Prywatności
**Co to jest:** W footerze jest link "Polityka prywatności" prowadzący do `#`. Brak strony z treścią polityki — to naruszenie RODO.  
**Co zrobić:** Stworzyć stronę `/polityka-prywatnosci` z treścią RODO-compliant (administrator danych, cele przetwarzania, prawa użytkownika).

### 47. ❌ Brak strony Regulamin
**Co to jest:** Podobnie jak polityka prywatności — link w footerze prowadzi donikąd.  
**Co zrobić:** Stworzyć stronę `/regulamin` z warunkami korzystania z serwisu.

### 48. ❌ Placeholder dane firmowe
**Co to jest:** Adres ("ul. Przykładowa 10"), telefon ("+48 123 456 789"), NIP ("000-000-00-00") to wyraźne placeholdery. To dyskwalifikuje stronę jako profesjonalną.  
**Co zrobić:** Wstawić PRAWDZIWE dane firmy — adres, NIP, REGON, KRS, telefon, email.

### 49. ❌ Security headers w Next.js config
**Co to jest:** `next.config.ts` ma tylko `poweredByHeader: false`. Brak security headers: `X-Content-Type-Options`, `X-Frame-Options`, `Strict-Transport-Security`, `Content-Security-Policy`.  
**Co zrobić:** Dodać headers w `next.config.ts` w sekcji `headers()`, lub middleware z security headers.

### 50. ❌ Brak `rel="noopener noreferrer"` na linkach zewnętrznych
**Co to jest:** Linki z `target="_blank"` (np. social media) powinny mieć `rel="noopener noreferrer"` ze względów bezpieczeństwa (zapobiega tab-napping).  
**Co zrobić:** Dodać atrybuty do wszystkich zewnętrznych linków.

---

## 🧹 VIII. KOD & JAKOŚĆ

### 51. ❌ Niespójne line endings (CRLF vs LF)
**Co to jest:** Pliki mają mieszane zakończenia linii — część linii kończy się `\r\n` (Windows/CRLF), część `\n` (Unix/LF). To powoduje problemy z git diff i linting.  
**Co zrobić:** Dodać `.editorconfig` i `.gitattributes` wymuszające LF. Przeformatować pliki.

### 52. ❌ Brak testów — zero test coverage
**Co to jest:** Projekt nie ma żadnych testów — ani unit, ani integration, ani e2e. Każda zmiana to ryzyko regresji.  
**Co zrobić:** Dodać przynajmniej: (1) e2e testy z Playwright na kluczowe ścieżki, (2) testy komponentów z React Testing Library.

### 53. ❌ TypeScript `any` w kilku miejscach
**Co to jest:** Komponent `Reveal` używa `Record<string, any>` do typowania wariantów animacji. To osłabia type-safety.  
**Co zrobić:** Użyć typów Framer Motion: `Variants` / `TargetAndTransition` zamiast `any`.

### 54. ❌ Brak CI/CD pipeline
**Co to jest:** Brak automatycznego procesu budowania, testowania i deploymentu. Każdy deploy jest manualny.  
**Co zrobić:** Skonfigurować GitHub Actions z: lint, type-check, build, testy. Podpiąć auto-deploy na Vercel z preview deployments.

### 55. ⚠️ Brak `eslint-plugin-jsx-a11y`
**Co to jest:** Plugin ESLint do automatycznego wykrywania problemów z dostępnością w JSX. Łapie brakujące `alt`, `aria-label`, itd.  
**Co zrobić:** Dodać `eslint-plugin-jsx-a11y` do konfiguracji ESLint.

---

## 📱 IX. MOBILE & RESPONSYWNOŚĆ

### 56. ❌ Mobile menu nie blokuje scrollowania body
**Co to jest:** Gdy menu mobilne jest otwarte (`mobileOpen = true`), tło strony nadal się scrolluje — użytkownik może przypadkowo przewinąć stronę pod menu.  
**Co zrobić:** Dodać `document.body.style.overflow = "hidden"` gdy menu jest otwarte i przywracać po zamknięciu.

### 57. ❌ Touch target size — niektóre elementy < 44×44px
**Co to jest:** WCAG wymaga minimum 44×44px na touch targets (przyciski, linki). Niektóre elementy (ikony social media 36×36px, filtry mapy) są mniejsze.  
**Co zrobić:** Zwiększyć padding/min-size do minimum 44×44px na mobile.

### 58. ❌ Strona `/nosniki` — mapa fullscreen na mobile
**Co to jest:** Mapa zajmuje 100vh na mobile, ale brak intuicyjnego swipe gestów do przełączania między mapą a listą. Toggle "Lista / Mapa" jest mały.  
**Co zrobić:** Zwiększyć toggle, dodać swipe gesture do przełączania. Rozważyć domyślne wyświetlenie listy na mobile (nie mapy).

### 59. ❌ StickyMobileCTA nakłada się na CookieConsent
**Co to jest:** `StickyMobileCTA` (z-index: 49) i `CookieConsent` (z-index: 9998) mogą się nakładać na mobile, tworząc chaotyczny stack elementów na dole ekranu.  
**Co zrobić:** Ukrywać StickyMobileCTA gdy CookieConsent jest widoczny. Albo: przesunąć CTA wyżej gdy cookie banner jest aktywny.

---

## 🌐 X. INFRASTRUKTURA & DEPLOYMENT

### 60. ❌ Brak environment variables
**Co to jest:** Projekt nie ma pliku `.env` ani `.env.example`. API keys (GA, piksele, formularze) nie mają gdzie żyć.  
**Co zrobić:** Stworzyć `.env.local` i `.env.example` z kluczami dla: analytics, form submission API, mapy.

### 61. ❌ Brak monitoring błędów (Sentry / LogRocket)
**Co to jest:** Jeśli strona crashuje na produkcji — nikt się nie dowie. Brak error trackingu.  
**Co zrobić:** Dodać Sentry (darmowy plan wystarczy): `@sentry/nextjs`. Konfiguracja zajmie ~15 minut.

### 62. ❌ Brak konfiguracji CDN dla statycznych assetów
**Co to jest:** Na Vercel CDN jest domyślny, ale brak konfiguracji cache headers dla custom assetów.  
**Co zrobić:** Skonfigurować `Cache-Control` headers w `next.config.ts` dla statycznych zasobów. Vercel domyślnie robi to dobrze, ale warto zweryfikować.

### 63. ❌ Brak Web Analytics na Vercel
**Co to jest:** Vercel oferuje wbudowane Web Analytics (performance, Core Web Vitals) za darmo.  
**Co zrobić:** Włączyć Vercel Analytics w dashboard i dodać `@vercel/analytics` do projektu.

---

## 🎭 XI. DODATKOWE ELEMENTY PREMIUM

### 64. ❌ Dodać blog / sekcję edukacyjną
**Co to jest:** Blog z artykułami o reklamie outdoorowej to potężne narzędzie SEO (long-tail keywords) i budowania autorytetu.  
**Co zrobić:** Stworzyć `/blog` z MDX lub CMS (np. Contentful, Sanity). Tematy: "Jak wybrać lokalizację billboardu", "Ile kosztuje billboard".

### 65. ❌ Dodać chat widget / WhatsApp button
**Co to jest:** Instant messaging to standard 2026 — klient chce szybkiej odpowiedzi. Formularz jest barierą.  
**Co zrobić:** Dodać floating WhatsApp button lub integrację z Tawk.to / Crisp (darmowe plany).

### 66. ❌ Dodać PDF cennik do pobrania
**Co to jest:** Wielu klientów B2B chce pobrać cennik i przesłać do przełożonego. Brak pliku PDF to stracona okazja.  
**Co zrobić:** Stworzyć profesjonalny PDF cennik i dodać przycisk "Pobierz cennik" (opcjonalnie: za podanie emaila — lead magnet).

### 67. ❌ Newsletter / Lead magnet
**Co to jest:** Zbieranie bazy mailingowej jest fundamentem marketingu B2B. Strona nie ma żadnego mechanizmu zbierania leadów poza formularzem kontaktowym.  
**Co zrobić:** Dodać popup/sekcję z lead magnetem: "Pobierz poradnik: Jak zaplanować skuteczną kampanię billboardową" za email.

### 68. ❌ Google Business Profile integracja
**Co to jest:** Mapa na stronie `/kontakt` jest statycznym osadzeniem Google Maps. Powinna linkować do Google Business Profile.  
**Co zrobić:** Utworzyć/zOptymalizować Google Business Profile. Dodać link "Zobacz opinie na Google" na stronie.

### 69. ❌ Schema BreadcrumbList
**Co to jest:** Breadcrumbs (okruszki nawigacyjne) w postaci Structured Data pomagają Google w indeksowaniu i wyświetlają hierarchię w wynikach wyszukiwania.  
**Co zrobić:** Dodać JSON-LD `BreadcrumbList` na każdej podstronie. Opcjonalnie: dodać wizualne breadcrumbs pod headerem.

### 70. ❌ Dodać Web Vitals monitoring
**Co to jest:** Automatyczne śledzenie LCP, FID/INP, CLS na produkcji pozwala wykrywać problemy z performance u prawdziwych użytkowników.  
**Co zrobić:** Użyć `next/web-vitals` lub `web-vitals` library do raportowania metryk do analytics.

---

## 📊 PODSUMOWANIE PRIORYTETÓW

| Priorytet | Punkty | Cel |
|-----------|--------|-----|
| 🔴 **KRYTYCZNE** | 3, 7, 8, 25, 27, 38, 45, 46, 47, 48 | Strona nie powinna być live bez tych poprawek |
| 🟠 **WYSOKIE** | 1, 2, 4, 5, 6, 9, 14, 17, 26, 28, 33, 35, 39, 41, 49 | Profesjonalność i konwersja |
| 🟡 **ŚREDNIE** | 10, 15, 16, 18, 19, 22, 23, 24, 29, 34, 37, 42, 52, 56 | Premium experience |
| 🟢 **NICE-TO-HAVE** | 20, 21, 30, 31, 36, 40, 43, 44, 50, 51, 53, 54, 55, 57-70 | Kolejne iteracje |

---

> 💡 **Następny krok:** Rozpocznij od punktów krytycznych (🔴). Każdy z nich powinien zająć 15–60 minut. Razem ~1 dzień roboczy.  
> Punkty wysokie (🟠) to kolejny dzień. Po ich wdrożeniu strona będzie na poziomie profesjonalnym.
