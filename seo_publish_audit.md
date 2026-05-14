# Audyt przedpublikacyjny — wielkiformat.pl

Stan: 2026-05-14. Pomija: podstronę **„Nośniki” z mapą** (na życzenie klienta — zostaje na razie nietknięta).

Legenda:
- `[x]` — zrobione i sprawdzone w kodzie
- `[~]` — częściowo zrobione / wymaga drobnej poprawki
- `[ ]` — do zrobienia przed publikacją
- 🔴 blokujące publikację · 🟡 ważne, do uzupełnienia po starcie · 🟢 nice-to-have

---

## 1. Formularz kontaktowy i obsługa zapytań

- [x] Realny endpoint API `POST /api/contact` ([src/app/api/contact/route.ts](src/app/api/contact/route.ts))
- [x] Wysyłka maila do `info@wielkiformat.pl` (Nodemailer + SMTP)
- [x] Auto-odpowiedź do osoby wysyłającej z numerem telefonu i danymi firmy
- [x] `Reply-To` ustawione na adres klienta (jedno kliknięcie → odpowiedź)
- [x] Honeypot (`website`) + time-trap (≥ 2 s od mountu) ([src/components/LeadForm.tsx](src/components/LeadForm.tsx))
- [x] Rate limit 5 zgłoszeń / 10 min / IP ([src/lib/rate-limit.ts](src/lib/rate-limit.ts))
- [x] Sanityzacja: limit długości, strip znaków kontrolnych, escape HTML w mailach
- [x] Ochrona przed header injection (`\r\n` w polach trafiających do nagłówków)
- [x] Filtr „za dużo linków w treści” (>3 https:// → ciche odrzucenie)
- [x] Checkbox zgody RODO + link do polityki prywatności
- [x] Walidacja po stronie serwera niezależna od klienta
- [x] Komunikat o błędzie wyświetlany użytkownikowi (`role="alert"`)
- [ ] 🔴 Skonfigurować realne SMTP w środowisku produkcyjnym (Vercel → Settings → Env): `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_FROM`, `CONTACT_TO` — wzór w [.env.example](.env.example)
- [ ] 🔴 Wykonać testowe zgłoszenie z produkcji i sprawdzić deliverability (czy nie ląduje w SPAM — patrz SPF/DKIM niżej)
- [ ] 🟡 Rozważyć zewnętrzny rate limit (Upstash) jeśli ruch wzrośnie — obecna implementacja in-memory nie działa między instancjami serverless
- [ ] 🟢 Logowanie zgłoszeń (np. do Vercel Logs/Sentry) — obecnie tylko `console.error` przy błędzie SMTP

---

## 2. Domena, hosting, DNS

- [ ] 🔴 Podpięcie domeny `wielkiformat.pl` w Vercel (obecnie wszędzie kanonik = `wielki-format-strona.vercel.app`)
- [x] 🔴 Po podpięciu domeny zamienić **wszystkie** wystąpienia `https://wielki-format-strona.vercel.app` na `https://wielkiformat.pl`:
  - [x] [src/app/layout.tsx:29](src/app/layout.tsx#L29) (`metadataBase`)
  - [x] [src/app/layout.tsx:54](src/app/layout.tsx#L54), [:76](src/app/layout.tsx#L76), [:112](src/app/layout.tsx#L112)
  - [x] [src/app/sitemap.ts:3](src/app/sitemap.ts#L3)
  - [x] [src/app/robots.ts:9](src/app/robots.ts#L9)
  - [x] canonicale w każdym `(site)/*/page.tsx`
- [ ] 🔴 Redirect 301 z `www.wielkiformat.pl` → `wielkiformat.pl` (lub odwrotnie — wybrać jedną wersję)
- [ ] 🔴 HTTPS wymuszony (Vercel robi to domyślnie — zweryfikować)
- [ ] 🔴 **SPF** w DNS: `v=spf1 include:<smtp-provider> ~all` — dla skrzynki, z której wysyła formularz
- [ ] 🔴 **DKIM** włączony u dostawcy poczty i wpisany w DNS
- [ ] 🟡 **DMARC**: `v=DMARC1; p=quarantine; rua=mailto:info@wielkiformat.pl`
- [ ] 🟡 Rekord MX, A/AAAA dla poczty pozostają nietknięte (zweryfikować, że domena obsługuje pocztę firmową)

---

## 3. SEO — meta, kanonikale, structured data

- [x] `metadataBase` ustawione globalnie ([src/app/layout.tsx:29](src/app/layout.tsx#L29))
- [x] Szablon tytułu `%s | wielkiformat.pl`
- [x] Unikalne `title` i `description` na każdej podstronie (`/`, `/o-nas`, `/wynajem`, `/obsluga-kampanii`, `/kontakt`, `/galeria`)
- [x] Canonical na każdej podstronie
- [x] OpenGraph (image, locale, siteName) w layoucie
- [x] Twitter Card `summary_large_image`
- [x] JSON-LD `Organization` + `LocalBusiness` + `Service` ([src/app/layout.tsx:80-162](src/app/layout.tsx#L80-L162))
- [x] JSON-LD `FAQPage` na `/wynajem`
- [x] `lang="pl"` na `<html>`
- [x] `sitemap.xml` automatyczny ([src/app/sitemap.ts](src/app/sitemap.ts))
- [x] `robots.txt` automatyczny ([src/app/robots.ts](src/app/robots.ts))
- [x] 🔴 Dodać `/galeria` do `sitemap.ts` (obecnie brak — strona istnieje, ale nie jest w mapie)
- [x] 🟡 Dodać `/polityka-prywatnosci` i `/regulamin` do sitemap po ich utworzeniu (priority 0.3, `changeFrequency: "yearly"`)
- [x] 🟡 JSON-LD `BreadcrumbList` na podstronach (kontakt, o-nas, wynajem, obsluga-kampanii, galeria, cennik, druk-i-montaz-reklamy, dla-grafikow, [city])
- [x] 🟡 JSON-LD `WebSite` (bez SearchAction — brak wyszukiwarki w serwisie)
- [ ] 🟢 `hreflang` — nieistotne, strona jest tylko po polsku
- [ ] 🟢 OG image dedykowany per-podstrona (obecnie wspólny `/og-image.jpg`)

---

## 4. Treść i nagłówki

- [x] Dokładnie jeden `<h1>` na każdej podstronie (zweryfikowane w `routes/*.tsx`)
- [x] Hierarchia H1 → H2 → H3 zachowana
- [x] Słowa kluczowe w title/description i H1 (billboardy, reklama wielkoformatowa, mazowieckie, Warszawa)
- [~] 🟡 Treść na `/o-nas` — wzmocnić odmiany słów-kluczy lokalnych. Częściowo pokryte przez 16 lokalnych landingów dedykowanych (`/otwock`, `/marki`, `/warszawa`...).
- [ ] 🟡 Sekcja FAQ na stronie głównej lub `/obsluga-kampanii` z JSON-LD (poza już istniejącym na `/wynajem`)
- [ ] 🟢 Blog/aktualności — obecnie brak. Pod kątem SEO długoterminowego warto rozważyć (nie blokuje publikacji)

---

## 5. Obrazy i media

- [x] `next/image` używany wszędzie zamiast `<img>` (zweryfikowane w `routes/*`)
- [x] Atrybut `alt` wypełniony w głównych obrazach (15 wystąpień, 0 pustych `alt=""`)
- [x] `loading="lazy"` poza heroami, `priority`/`loading="eager"` na heroach
- [x] Formaty `avif`/`webp` włączone w `next.config.ts`
- [ ] 🟡 Audyt `alt` w `routes/galeria.tsx` — generowane z nazw plików, zweryfikować że dla każdego zdjęcia jest sensowny opis (a nie surowa nazwa pliku)
- [ ] 🟡 OG image (`/public/og-image.jpg`) — sprawdzić wymiary 1200×630 i wagę < 300 kB
- [ ] 🟢 Lighthouse: Largest Contentful Paint na home — zweryfikować po deploy

---

## 6. Wydajność i Core Web Vitals

- [x] `next/font` z `display: "swap"` dla wszystkich trzech rodzin fontów
- [x] `compress: true` w `next.config.ts`
- [x] Agresywne cache nagłówków dla obrazów/fontów w produkcji
- [x] `reactStrictMode: true`
- [ ] 🟡 Po deploy: Lighthouse mobile ≥ 90 (Performance, SEO, Accessibility, Best Practices)
- [ ] 🟡 PageSpeed Insights — sprawdzić LCP < 2.5 s, CLS < 0.1, INP < 200 ms
- [ ] 🟢 Preload kluczowego font subset/woff2 jeśli LCP wskazuje na font

---

## 7. Dostępność (a11y)

- [x] `lang="pl"` ustawione
- [x] `aria-label` na ikonowych przyciskach (telefon, WhatsApp)
- [x] `aria-invalid` w polach formularza
- [x] `role="alert"` przy komunikatach błędu
- [x] Kontrast — motyw `dark` z czerwonym akcentem, sprawdzony wizualnie
- [ ] 🟡 Tabulator: przejść formularz i nawigację samą klawiaturą — focus visible musi być widoczny wszędzie
- [x] 🟡 Etykiety pól formularza — dodano `aria-label` w [src/components/LeadForm.tsx](src/components/LeadForm.tsx) (input + textarea)
- [ ] 🟡 `prefers-reduced-motion` — sprawdzić, czy `motion/react` respektuje
- [x] 🟢 Skip-link „Przejdź do treści” — dodany w [src/components/SiteShell.tsx](src/components/SiteShell.tsx)

---

## 8. RODO / strony prawne

- [x] 🔴 **Brak strony `/polityka-prywatnosci`** — utworzona: [src/app/(site)/polityka-prywatnosci/page.tsx](src/app/(site)/polityka-prywatnosci/page.tsx). Treść do weryfikacji prawnej.
- [x] 🔴 **Brak strony `/regulamin`** — utworzona: [src/app/(site)/regulamin/page.tsx](src/app/(site)/regulamin/page.tsx). Treść do weryfikacji prawnej.
- [x] Cookie banner ([src/components/CookieConsent.tsx](src/components/CookieConsent.tsx))
- [ ] 🟡 Polityka prywatności musi zawierać: administrator (Billboard Sp. z o.o., NIP, adres), cel przetwarzania, podstawa prawna (art. 6 ust. 1 lit. f / a RODO), okres przechowywania, prawa osoby, IOD (jeśli wyznaczony), informacja o cookies
- [ ] 🟡 Cookie banner: jeśli używasz GA/Pixel/Hotjar — musi mieć opcję „odrzuć wszystko” i nie ładować skryptów przed zgodą
- [ ] 🟡 Klauzula informacyjna RODO przy formularzu (krótka, pełna w polityce) — częściowo jest, zweryfikować pełną treść z prawnikiem

---

## 9. Linki, błędy, nawigacja

- [x] `not-found.tsx` istnieje ([src/app/not-found.tsx](src/app/not-found.tsx))
- [x] `error.tsx` w `(site)` group ([src/app/(site)/error.tsx](src/app/(site)/error.tsx))
- [x] 🔴 Naprawić martwe linki w stopce do `/polityka-prywatnosci` i `/regulamin` (strony utworzone — linki działają)
- [ ] 🟡 Przejść klikiem każdy CTA, każdy link w stopce/headerze — wyłapać literówki w hrefach
- [ ] 🟡 Sprawdzić wszystkie wewnętrzne linki w `kontakt.tsx` (telefon, mail, mapy) i `o-nas.tsx`
- [ ] 🟢 404 — sprawdzić czy ma sensowny CTA powrotu na stronę główną

---

## 10. Analityka i monitorowanie

- [ ] 🟡 Google Analytics 4 / Plausible / inny — obecnie **brak jakiejkolwiek analityki** (potwierdzone grepem)
- [ ] 🟡 Google Search Console — dodać domenę po podpięciu, wysłać sitemap
- [ ] 🟡 Bing Webmaster Tools — opcjonalnie
- [ ] 🟡 Meta Pixel / GTM — jeśli planujesz remarketing/kampanie reklamowe
- [ ] 🟢 Sentry / error monitoring — pomocne, niekrytyczne dla małego ruchu
- [ ] 🟢 Monitoring uptime (UptimeRobot / Better Stack)

---

## 11. Bezpieczeństwo

- [x] `poweredByHeader: false` w `next.config.ts`
- [x] Brak sekretów w repo (sprawdzone — `.env*` w `.gitignore`)
- [x] Rate limit na endpoint kontaktowy
- [x] 🟡 Nagłówki bezpieczeństwa (Next 16 / Vercel) — dodane w [next.config.ts](next.config.ts) (produkcyjnie):
  - [x] `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
  - [x] `X-Content-Type-Options: nosniff`
  - [x] `Referrer-Policy: strict-origin-when-cross-origin`
  - [x] `Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()`
  - [x] `X-Frame-Options: SAMEORIGIN`
- [ ] 🟡 `Content-Security-Policy` — opcjonalnie, wymaga uwagi przy inline JSON-LD `<script>` (potrzebny `nonce` albo `'unsafe-inline'`)
- [ ] 🟢 Audyt `npm audit` — obecnie `2 vulnerabilities (1 moderate, 1 high)` — sprawdzić i, jeśli to nie tylko devDeps, zaktualizować

---

## 12. Lokalne SEO (Google Business Profile)

- [ ] 🔴 Wizytówka Google Business Profile na adres Al. Piłsudskiego 55A, Marki — zweryfikować, że istnieje i jest aktualna
- [ ] 🟡 NAP (Name / Address / Phone) spójne wszędzie: w stopce, JSON-LD, GBP, fakturach — zweryfikowane w `kontakt.tsx`, layoucie ✅
- [ ] 🟡 Linki zwrotne z lokalnych katalogów (panoramafirm.pl, aleo.com, oferia)
- [ ] 🟢 `sameAs` w JSON-LD `LocalBusiness` — obecnie puste, dodać linki do GBP, FB, LinkedIn jeśli istnieją

---

## 13. Pre-launch smoke test (po deployu produkcyjnym)

- [ ] 🔴 `curl https://wielkiformat.pl/sitemap.xml` zwraca pełną mapę
- [ ] 🔴 `curl https://wielkiformat.pl/robots.txt` zwraca poprawny plik z linkiem do sitemapy
- [ ] 🔴 Wypełnić formularz → mail przychodzi na `info@` w < 30 s, auto-reply przychodzi na adres testowy
- [ ] 🔴 Test 4 razy z rzędu z tego samego IP → 5. zwraca 429
- [ ] 🔴 Test honeypot: wypełnić ukryte pole przez DevTools → API zwraca `ok:true` ale mail **nie** powinien przyjść
- [ ] 🔴 Test rzeczywistym mobile (Android Chrome, iOS Safari) — nawigacja, formularz, mapa
- [ ] 🟡 Google Search Console: „Request indexing” dla strony głównej i kluczowych podstron
- [ ] 🟡 Lighthouse mobile na każdej podstronie ≥ 90 we wszystkich 4 kategoriach
- [ ] 🟡 Validator JSON-LD: https://validator.schema.org/ — sprawdzić każdą podstronę
- [ ] 🟡 OpenGraph debugger: https://www.opengraph.xyz/ — sprawdzić jak link wygląda na FB/LinkedIn/Slack

---

## Podsumowanie blokerów (🔴)

Minimum do uruchomienia publicznego:

1. **SMTP w env produkcyjnym** + test wysyłki (sekcja 1)
2. **Domena `wielkiformat.pl` podpięta** i wszystkie URL-e zmienione z `*.vercel.app` (sekcja 2 + 3)
3. **SPF/DKIM** dla skrzynki nadawczej (sekcja 2) — inaczej autoreplies idą do SPAM
4. **`/polityka-prywatnosci` i `/regulamin`** utworzone (sekcja 8) — obecnie 404 z formularza i stopki
5. **`/galeria` w sitemap.ts** (sekcja 3)
6. **Naprawić martwe linki** w stopce (sekcja 9)
7. **Smoke testy** po deployu (sekcja 13)

Wszystko 🟡 można dorabiać po starcie — ale lista 🔴 jest bezdyskusyjna.
