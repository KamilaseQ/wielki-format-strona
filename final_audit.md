# Final audit strony wielkiformat.pl

Data audytu: 2026-05-13  
Projekt: Next.js 16, App Router  
Środowisko testowe: produkcyjny build lokalnie, `http://localhost:3000`  
Zakres: gotowość do pierwszego wdrożenia na Hostinger preview i późniejsze przepięcie domeny `wielkiformat.pl`

## Werdykt

Strona technicznie kompiluje się i główne podstrony renderują się poprawnie, ale nie jest jeszcze gotowa do produkcyjnego wdrożenia na domenę `wielkiformat.pl`.

Najważniejsze blokery przed pierwszym publicznym release:

- [ ] Zaktualizować podatne zależności: `npm audit --omit=dev` wykazał podatności `high` dla `next` oraz `moderate` dla `postcss`.
- [ ] Usunąć wszystkie kanonikalne, OG, Twitter, robots i sitemap URL-e wskazujące na `https://wielki-format-strona.vercel.app`.
- [ ] Ustalić strategię preview: preview musi mieć `noindex` albo być zabezpieczone przed indeksacją.
- [ ] Naprawić linki 404 w stopce: `/polityka-prywatnosci` i `/regulamin`.
- [ ] Podłączyć realną wysyłkę formularza; obecnie formularz tylko symuluje sukces.
- [ ] Dodać klauzule RODO, politykę prywatności, cookies i podstawowe dokumenty prawne.
- [ ] Rozwiązać migrację obecnie zaindeksowanych URL-i na `wielkiformat.pl`, zwłaszcza stron lokalnych.
- [ ] Naprawić niespójność danych: strona komunikuje `1400+ nośników`, a mapa ma 10 rekordów, w tym `Piotrków Trybunalski` poza Mazowszem.
- [ ] Dodać podstawowe nagłówki bezpieczeństwa i wymusić HTTPS/canonical host po stronie hostingu.

## Wyniki techniczne

- [x] `npm run lint` przechodzi.
- [x] `npm run build` przechodzi.
- [x] Build wygenerował statyczne trasy: `/`, `/kontakt`, `/nosniki`, `/o-nas`, `/obsluga-kampanii`, `/robots.txt`, `/sitemap.xml`, `/wynajem`.
- [x] Główne podstrony mają pojedynczy H1.
- [x] Główne wewnętrzne linki nawigacji działają.
- [ ] `npm audit --omit=dev` nie przechodzi:
  - `next`: high, wiele advisories dla zakresu `9.3.4-canary.0 - 16.3.0-canary.5`.
  - `postcss <8.5.10`: moderate.
  - Wykonać aktualizację zależności i ponowić `npm ci`, `npm run lint`, `npm run build`, `npm audit --omit=dev`.
- [ ] Brakuje jawnej wersji Node dla hostingu, np. `engines.node` albo dokumentacji wymaganego runtime; Hostinger obsługuje Node 18/20/22/24 dla Node.js Web Apps.
- [ ] Do wdrożenia na Hostinger trzeba potwierdzić plan: Business Web Hosting, Cloud albo VPS. Zwykły statyczny hosting nie wystarczy dla `next start`, chyba że projekt zostanie świadomie przerobiony na `output: export`.

## P0 - blokery przed publicznym preview

### Bezpieczeństwo zależności

- [ ] Uruchomić `npm audit fix` albo ręcznie podnieść `next` i zależności do wersji bez zgłoszonych podatności.
- [ ] Zablokować wynik w `package-lock.json`.
- [ ] Po aktualizacji ponownie wykonać:
  - [ ] `npm ci`
  - [ ] `npm run lint`
  - [ ] `npm run build`
  - [ ] `npm audit --omit=dev`
- [ ] Sprawdzić, czy aktualizacja Next nie zmienia generowania metadata, sitemap i obrazów.

### Preview i indeksacja

- [ ] Preview na Hostinger powinno mieć `noindex, nofollow` albo być niewidoczne dla robotów do momentu finalnej akceptacji.
- [ ] Nie wypuszczać publicznego preview z canonicalami do domeny produkcyjnej, jeśli treści nie są zaakceptowane.
- [ ] Po produkcji usunąć `noindex` tylko z docelowej domeny.
- [ ] Ustalić docelowy canonical host: rekomendacja `https://wielkiformat.pl` bez `www`, chyba że świadomie wybieramy `www`.
- [ ] Wymusić 301:
  - [ ] `http://wielkiformat.pl` -> `https://wielkiformat.pl`
  - [ ] `http://www.wielkiformat.pl` -> `https://wielkiformat.pl`
  - [ ] `https://www.wielkiformat.pl` -> `https://wielkiformat.pl`

### Metadata, canonical, sitemap, robots

- [ ] Zmienić `metadataBase` z `https://wielki-format-strona.vercel.app` na docelowy URL produkcyjny.
- [ ] Zmienić wszystkie `alternates.canonical` na `https://wielkiformat.pl/...`.
- [ ] Zmienić `openGraph.url` per podstrona; obecnie większość podstron dziedziczy URL strony głównej.
- [ ] Zmienić `og:image` i `twitter:image` z preview URL na produkcyjny URL.
- [ ] Zmienić `src/app/robots.ts`, bo sitemap wskazuje obecnie `https://wielki-format-strona.vercel.app/sitemap.xml`.
- [ ] Zmienić `src/app/sitemap.ts`, bo wszystkie `<loc>` wskazują obecnie preview.
- [ ] Poprawić `lastModified` w sitemap: teraz `new Date()` ustawia datę builda dla wszystkich stron. Google zaleca używać `lastmod` tylko wtedy, gdy odzwierciedla znaczącą zmianę treści.
- [ ] Dodać per-page OG/Twitter:
  - [ ] `/` - oferta główna i region.
  - [ ] `/nosniki` - mapa nośników.
  - [ ] `/wynajem` - wynajem billboardów.
  - [ ] `/obsluga-kampanii` - kompleksowa obsługa.
  - [ ] `/o-nas` - firma i doświadczenie.
  - [ ] `/kontakt` - kontakt i wycena.

### Linki 404

- [ ] Utworzyć `/polityka-prywatnosci`.
- [ ] Utworzyć `/regulamin` albo zmienić link na realny dokument OWU/RODO.
- [ ] Po wdrożeniu sprawdzić link checkerem wszystkie `href`.
- [ ] Dodać sensowną mapę przekierowań ze starych URL-i, zamiast pozwolić im przejść na 404.

W lokalnym buildzie 2026-05-13:

- `/polityka-prywatnosci` -> 404
- `/regulamin` -> 404
- `/piaseczno` -> 404
- `/otwock` -> 404
- `/pruszkow` -> 404
- `/lomianki` -> 404
- `/legionowo` -> 404
- `/ząbki` -> 404
- `/wołomin` -> 404
- `/minsk-mazowiecki` -> 404
- `/grodzisk-mazowiecki` -> 404
- `/reklamy-wolnostojace` -> 404

### Formularz leadowy

- [ ] Podłączyć prawdziwą wysyłkę formularza. Obecnie `LeadForm` robi tylko `setTimeout`, pokazuje sukces i niczego nie wysyła.
- [ ] Dodać endpoint/API albo usługę formularzy kompatybilną z Hostinger.
- [ ] Ustalić adres odbiorcy, np. `info@wielkiformat.pl`.
- [ ] Dodać obsługę błędu wysyłki.
- [ ] Dodać zabezpieczenie antyspamowe: minimum honeypot, rate limit, ewentualnie Turnstile/reCAPTCHA.
- [ ] Dodać checkbox/klauzulę informacyjną RODO przy formularzu.
- [ ] Dodać informację, kto jest administratorem danych, cel, podstawa, czas przetwarzania, prawa użytkownika i kontakt.
- [ ] Ustalić retencję leadów oraz gdzie trafiają dane.
- [ ] Dodać `aria-describedby` dla błędów formularza.
- [ ] Dodać widoczne etykiety pól albo trwałe floating labels; same placeholdery są słabsze UX i dostępnościowo.
- [ ] Nie pokazywać komunikatu "Twoje zapytanie zostało wysłane", jeżeli backend nie potwierdzi wysyłki.

### RODO, cookies, dokumenty

- [ ] Dodać politykę prywatności.
- [ ] Dodać politykę cookies.
- [ ] Ustalić, czy będą używane narzędzia analityczne/marketingowe: GA4, Google Ads, Meta Pixel, Hotjar itp.
- [ ] Jeżeli będą cookies/analityka inne niż niezbędne, wdrożyć realny consent management:
  - [ ] "Akceptuję"
  - [ ] "Odrzuć / tylko niezbędne"
  - [ ] możliwość zmiany zgód
  - [ ] blokowanie skryptów analitycznych do czasu zgody
  - [ ] Google Consent Mode v2, jeśli używamy Google Ads/GA4.
- [ ] Obecny baner cookies jest mylący: "Akceptuję" i "Tylko niezbędne" robią technicznie to samo.
- [ ] Jeżeli strona nie używa niepotrzebnych cookies, uprościć komunikat i nie sugerować zgody na więcej, niż faktycznie zapisujemy.
- [ ] Dodać regulamin/OWU albo usunąć link, jeśli nie ma dokumentu.
- [ ] Zweryfikować, czy Polski Akt o Dostępności/EAA dotyczy tej usługi. Jeśli przez stronę można zawrzeć umowę lub zamówić usługę online, trzeba potraktować dostępność jako wymóg, nie "nice to have".

### Dane nośników i mapa

- [ ] Uzupełnić produkcyjny dataset nośników. `public/data/billboards.xml` ma teraz 10 rekordów.
- [ ] Usunąć albo poprawić rekord `Piotrków Trybunalski`, jeśli komunikujemy wyłącznie woj. mazowieckie.
- [ ] Ujednolicić zapis nazw miejscowości i ulic, np. `Patriotów` vs `Patriotow`.
- [ ] Zweryfikować formaty i wymiary.
- [ ] Dodać realne zdjęcia nośników, a nie generyczne obrazy per segment.
- [ ] Dodać status dostępności albo usunąć CTA "Sprawdź dostępność", jeśli mapa jej realnie nie pokazuje.
- [ ] Ustalić, czy liczba `1400+` to liczba nośników, powierzchni, lokalizacji czy ekspozycji.
- [ ] Jeżeli nie możemy pokazać pełnej bazy przed pierwszym release, zmienić copy na uczciwe: np. "wybrane lokalizacje" zamiast "ponad 1400 nośników".

## P0 - migracja SEO z obecnej domeny

Obecna domena `wielkiformat.pl` ma już zaindeksowane i działające treści. Nowa wersja nie może ich po prostu zgubić.

Zaobserwowane istniejące URL-e:

- [ ] `https://wielkiformat.pl/`
- [ ] `https://wielkiformat.pl/kontakt`
- [ ] `https://wielkiformat.pl/piaseczno`
- [ ] `https://wielkiformat.pl/otwock`
- [ ] `https://wielkiformat.pl/pruszkow`
- [ ] `https://wielkiformat.pl/lomianki`
- [ ] `https://wielkiformat.pl/legionowo`
- [ ] `https://wielkiformat.pl/ząbki`
- [ ] `https://wielkiformat.pl/wołomin`
- [ ] `https://wielkiformat.pl/minsk-mazowiecki`
- [ ] `https://wielkiformat.pl/grodzisk-mazowiecki`
- [ ] `https://wielkiformat.pl/reklamy-wolnostojace`
- [ ] `https://wielkiformat.pl/home1`

Decyzja przed wdrożeniem:

- [ ] Odtworzyć najważniejsze landing pages lokalne w nowej wersji, albo
- [ ] przygotować 301 z każdego starego URL-a do najbliższego odpowiednika.

Minimalna mapa przekierowań:

- [ ] `/home1` -> `/`
- [ ] `/kontakt` -> `/kontakt`
- [ ] `/otwock` -> nowa strona lokalna `/otwock` albo `/nosniki?city=Otwock`
- [ ] `/piaseczno` -> nowa strona lokalna `/piaseczno` albo `/wynajem`
- [ ] `/pruszkow` -> nowa strona lokalna `/pruszkow` albo `/wynajem`
- [ ] `/legionowo` -> nowa strona lokalna `/legionowo` albo `/wynajem`
- [ ] `/lomianki` -> nowa strona lokalna `/lomianki` albo `/wynajem`
- [ ] `/ząbki` -> nowa strona lokalna `/zabki` albo `/wynajem`
- [ ] `/wołomin` -> nowa strona lokalna `/wolomin` albo `/wynajem`
- [ ] `/minsk-mazowiecki` -> nowa strona lokalna `/minsk-mazowiecki` albo `/wynajem`
- [ ] `/grodzisk-mazowiecki` -> nowa strona lokalna `/grodzisk-mazowiecki` albo `/wynajem`
- [ ] `/reklamy-wolnostojace` -> `/obsluga-kampanii` albo dedykowana strona oferty.

Nie przekierowywać wszystkich starych stron hurtowo na homepage, jeśli mają inny intent. To zwykle pogarsza UX i może wyglądać jak soft 404.

## SEO - sekcja osobna

### Co działa w tej niszy

Wyniki wyszukiwania dla niszy billboardów i reklamy wielkoformatowej pokazują trzy silne typy stron:

- strony lokalne: `billboardy Otwock`, `banery Piaseczno`, `billboardy Pruszków`;
- strony ofertowe: wynajem billboardów, nośniki reklamowe, reklama wielkoformatowa, druk i montaż;
- strony konkretnych nośników: lokalizacja, format, kierunek, powierzchnia, traffic, zdjęcie, CTA rezerwacji.

Najbardziej potrzebne działania SEO przed pierwszym release:

- [ ] Utrzymać albo odtworzyć landing pages lokalne, bo obecna domena już takie posiada.
- [ ] Dodać realne, unikalne dane lokalne: miasta, ulice, formaty, zdjęcia, ruch, kierunek ekspozycji.
- [ ] Dodać stronę "Cennik / ile kosztuje billboard" z jasnym wyjaśnieniem czynników ceny.
- [ ] Dodać stronę "Dla grafików / specyfikacja plików" albo PDF, bo stara domena miała ten intent w nawigacji.
- [ ] Dodać stronę "Druk i montaż reklamy" jako osobny target SEO, jeśli to realnie ważna usługa.
- [ ] Dodać case studies albo realizacje z prawdziwymi zdjęciami.
- [ ] Zoptymalizować Google Business Profile: NAP, kategorie, opis, zdjęcia, usługi, opinie.
- [ ] Ujednolicić NAP na stronie, GBP, katalogach i danych strukturalnych.
- [ ] Dodać `LocalBusiness`/`AdvertisingAgency` schema z prawidłowym adresem, geo i `sameAs`.
- [ ] Dodać `BreadcrumbList` schema na podstronach.
- [ ] Zachować widoczne FAQ na stronach, ale nie opierać strategii na FAQ rich results w Google.

### Frazy priorytetowe

- [ ] `wynajem billboardów Warszawa`
- [ ] `billboardy Warszawa`
- [ ] `billboardy mazowieckie`
- [ ] `wynajem billboardów mazowieckie`
- [ ] `nośniki reklamowe mazowieckie`
- [ ] `reklama wielkoformatowa Warszawa`
- [ ] `reklama zewnętrzna Warszawa`
- [ ] `billboard Otwock`
- [ ] `billboard Józefów`
- [ ] `billboard Marki`
- [ ] `billboard Pruszków`
- [ ] `billboard Piaseczno`
- [ ] `billboard Legionowo`
- [ ] `banery reklamowe [miasto]`
- [ ] `druk billboardów Warszawa`
- [ ] `montaż billboardów`
- [ ] `billboard 6x3 cena`
- [ ] `ile kosztuje billboard`

### Struktura stron SEO do pierwszej wersji

Minimum:

- [ ] `/` - jasne pozycjonowanie: billboardy i reklama wielkoformatowa na Mazowszu.
- [ ] `/nosniki` - mapa i lista realnych nośników.
- [ ] `/wynajem` - wynajem billboardów, formaty, cena, proces.
- [ ] `/obsluga-kampanii` - projekt, druk, montaż, raport.
- [ ] `/kontakt` - szybka wycena, NAP, dane firmowe.
- [ ] `/polityka-prywatnosci`
- [ ] `/regulamin` albo OWU.

Rekomendowane jeszcze przed przepięciem domeny, jeśli zależy nam na utrzymaniu SEO:

- [ ] `/otwock`
- [ ] `/piaseczno`
- [ ] `/pruszkow`
- [ ] `/legionowo`
- [ ] `/lomianki`
- [ ] `/zabki`
- [ ] `/wolomin`
- [ ] `/minsk-mazowiecki`
- [ ] `/grodzisk-mazowiecki`
- [ ] `/reklamy-wolnostojace`
- [ ] `/druk-i-montaz-reklamy`
- [ ] `/dla-grafikow`
- [ ] `/cennik`

Każda strona lokalna powinna mieć unikalne treści, nie kopię z podmienioną nazwą miasta:

- [ ] realne nośniki w mieście lub okolicy;
- [ ] zdjęcia albo przykłady lokalizacji;
- [ ] formaty dostępne w danym obszarze;
- [ ] opis dojazdów, głównych dróg, dzielnic i use case'ów;
- [ ] CTA do zapytania o konkretną lokalizację;
- [ ] link do mapy z aktywnym filtrem miasta, jeśli będzie obsługiwany.

## Spójność treści

- [ ] Zdecydować, czy firma komunikuje "Mazowsze" czy "największe polskie miasta". Obecnie większość strony mówi o Mazowszu, ale `/o-nas` ma tekst o "największych polskich miastach".
- [ ] Potwierdzić liczbę `1400+ nośników`.
- [ ] Potwierdzić liczbę `2500+ kampanii rocznie`.
- [ ] Potwierdzić claim "rezerwacja billboardu w 30 sekund".
- [ ] Potwierdzić claim "automatyczny preflight".
- [ ] Potwierdzić claim "raporty fotograficzne wysyłane automatycznie".
- [ ] Potwierdzić claim "wszystko w cenie" / "bez doliczanych opłat" na stronie obsługi kampanii. To może być ryzykowne, jeśli druk/montaż/demontaż są jednak wyceniane osobno.
- [ ] Ujednolicić "województwo mazowieckie", "Mazowsze", "mazowieckie".
- [ ] Ujednolicić zapis formatów: `5,04 x 2,38 m`, `6 x 3 m`, `12 x 3 m`, `30-100+ m²`.
- [ ] Zweryfikować listę marek i klientów: KFC, McDonald's, Leroy Merlin, Renault, Toyota, AVON, Euro 2012, Madonna itd. Potrzebujemy prawa do użycia logotypów i claimów.
- [ ] Usunąć albo urealnić martwe/fikcyjne testimonials, jeśli mają wrócić do renderu.
- [ ] Zweryfikować teksty fundacyjne/CSR i zgody na publikację nazw fundacji.
- [ ] Ustalić, czy email `info@wielkiformat.pl` jest właściwy dla nowych leadów.

## Dostępność i standardy UI

Cel: WCAG 2.2 AA jako standard praktyczny na 2026 oraz potencjalny wymóg, jeśli usługa online podpada pod Polski Akt o Dostępności.

- [ ] Dodać skip link do `#main-content`.
- [ ] Sprawdzić pełną obsługę klawiaturą:
  - [ ] menu desktop;
  - [ ] menu mobile;
  - [ ] formularz;
  - [ ] kalkulator;
  - [ ] FAQ accordion;
  - [ ] mapa i lista nośników;
  - [ ] przed/po slider;
  - [ ] przyciski floating WhatsApp/back-to-top.
- [ ] Zapewnić widoczne focus states na ciemnym i jasnym motywie.
- [ ] Zmierzyć kontrasty kolorów dla tekstów `muted-foreground`, tekstów na gradientach i małych etykiet.
- [ ] Dodać trwałe etykiety pól formularza.
- [ ] Powiązać komunikaty błędów z polami przez `aria-describedby`.
- [ ] Dodać status live region dla wyniku wysyłki formularza.
- [ ] Upewnić się, że przyciski ikon mają jasne `aria-label`.
- [ ] Sprawdzić, czy `role="application"` na mapie nie utrudnia screen readerów; jeśli nie jest konieczne, rozważyć łagodniejszy opis regionu mapy.
- [ ] Dodać alternatywę tekstową/listową dla mapy - częściowo już jest, ale musi być kompletna i zgodna z realną bazą.
- [ ] Sprawdzić `prefers-reduced-motion` w praktyce; CSS go obsługuje, ale Lenis/motion też trzeba zweryfikować w przeglądarce.
- [ ] Sprawdzić mobile viewport pod kątem nakładania się WhatsApp, cookie banner, sticky CTA i back-to-top.

## Wydajność

Standard na maj 2026: Core Web Vitals na 75. percentylu: LCP <= 2,5 s, INP <= 200 ms, CLS <= 0,1.

- [ ] Uruchomić Lighthouse/WebPageTest po wdrożeniu preview.
- [ ] Zmierzyć osobno:
  - [ ] mobile 4G;
  - [ ] desktop;
  - [ ] `/`;
  - [ ] `/nosniki`;
  - [ ] `/kontakt`;
  - [ ] `/wynajem`.
- [ ] Zoptymalizować obrazy w `public/images/generated`. Obecnie wiele PNG ma ok. 1,8-2,5 MB.
- [ ] Zamienić duże PNG na AVIF/WebP i wersje responsywne.
- [ ] Hero homepage używa `motion.img` z bezpośrednim PNG, więc omija optymalizację `next/image`.
- [ ] Sprawdzić LCP per strona i preload tylko tego obrazu, który faktycznie jest LCP.
- [ ] Sprawdzić ostrzeżenia Next dotyczące proporcji logo klientów; w logach dev były ostrzeżenia dla `new_kfc.png`, `new_mc.png`, `new_leroymerlin.png`, `new_renault.png`, `new_toyota.png`.
- [ ] Ograniczyć liczbę font weights, jeśli Lighthouse pokaże zbyt duży koszt fontów.
- [ ] Zmierzyć bundle mapy; Leaflet powinien ładować się tylko na `/nosniki`.
- [ ] Zweryfikować koszt animacji/parallax na słabszych urządzeniach.

## Nagłówki i bezpieczeństwo

Lokalne odpowiedzi produkcyjne nie pokazały podstawowych nagłówków bezpieczeństwa poza cache.

- [ ] Dodać lub skonfigurować:
  - [ ] `X-Content-Type-Options: nosniff`
  - [ ] `Referrer-Policy: strict-origin-when-cross-origin`
  - [ ] `X-Frame-Options: SAMEORIGIN` albo CSP `frame-ancestors 'self'`
  - [ ] `Permissions-Policy` ograniczający m.in. geolocation/camera/microphone.
  - [ ] `Content-Security-Policy` najpierw w trybie report-only, potem enforce.
  - [ ] `Strict-Transport-Security` po poprawnym HTTPS na produkcji.
- [ ] Uważać na CSP, bo aplikacja ma inline script do motywu i JSON-LD; trzeba użyć nonce/hash albo polityki świadomie dopasowanej do Next.
- [ ] Ustalić, czy geolokalizacja na mapie jest potrzebna. Obecny przycisk prosi o uprawnienie, ale nie pokazuje lokalizacji użytkownika.
- [ ] Dodać monitoring błędów, np. Sentry, ale dopiero po spięciu consent/privacy.

## Hostinger i wdrożenie

- [ ] Potwierdzić, czy wybrany plan Hostinger obsługuje Node.js Web Apps albo VPS.
- [ ] Ustawić build command: `npm run build`.
- [ ] Ustawić start command: `npm run start`.
- [ ] Ustawić Node version zgodną z Next 16 i hostingiem.
- [ ] Ustawić zmienne środowiskowe:
  - [ ] `NEXT_PUBLIC_SITE_URL`
  - [ ] `NEXT_PUBLIC_ENV=preview|production`
  - [ ] dane formularza/SMTP/API
  - [ ] klucze antyspamowe, jeśli będą.
- [ ] Preview uruchomić na tymczasowej domenie Hostinger.
- [ ] Sprawdzić preview:
  - [ ] 200/404/301;
  - [ ] sitemap;
  - [ ] robots;
  - [ ] metadata;
  - [ ] nagłówki;
  - [ ] formularz;
  - [ ] mobile;
  - [ ] Core Web Vitals lab;
  - [ ] brak indeksacji preview.
- [ ] Dopiero po akceptacji przepiąć DNS domeny.
- [ ] Włączyć SSL.
- [ ] Wymusić HTTPS.
- [ ] Dodać domenę do Google Search Console.
- [ ] Wysłać sitemap produkcyjny.
- [ ] Monitorować 404 przez minimum 2-4 tygodnie po migracji.

## Monitoring i analityka

- [ ] Dodać Google Search Console.
- [ ] Dodać Bing Webmaster Tools.
- [ ] Dodać GA4 albo inną analitykę po decyzji o cookies/consent.
- [ ] Skonfigurować konwersje:
  - [ ] wysłanie formularza;
  - [ ] klik telefonu;
  - [ ] klik mailto;
  - [ ] klik WhatsApp;
  - [ ] klik "Zapytaj o ten nośnik".
- [ ] Dodać logowanie błędów formularza.
- [ ] Dodać uptime monitoring po produkcji.
- [ ] Przygotować dashboard: ruch organiczny, zapytania lokalne, konwersje, 404, indeksacja.

## Materiały potrzebne od właściciela

- [ ] Decyzja o canonical host: `wielkiformat.pl` czy `www.wielkiformat.pl`.
- [ ] Dostęp lub informacje o planie Hostinger.
- [ ] Docelowy preview URL.
- [ ] Dostęp do DNS domeny.
- [ ] Dostęp do obecnej strony albo lista wszystkich istniejących URL-i.
- [ ] Pełna baza nośników produkcyjnych: ID, miasto, adres, współrzędne, format, segment, status, zdjęcia, opis, traffic, kierunek ekspozycji.
- [ ] Potwierdzenie, czy pokazujemy pełne `1400+` nośników, czy tylko wybrane lokalizacje.
- [ ] Prawdziwe zdjęcia nośników i realizacji.
- [ ] Aktualne logo/brandbook, jeśli istnieje.
- [ ] Finalny obraz OG 1200x630.
- [ ] Zgody na użycie logotypów klientów i nazw marek.
- [ ] Potwierdzone case studies lub referencje.
- [ ] Potwierdzone liczby: lata działalności, kampanie rocznie, liczba nośników.
- [ ] Aktualne ceny lub zasady wyceny.
- [ ] Regulamin/OWU.
- [ ] Polityka prywatności.
- [ ] Polityka cookies.
- [ ] Klauzula RODO dla formularza.
- [ ] Adres email lub usługa do odbierania formularzy.
- [ ] Dane SMTP/API albo decyzja o narzędziu formularzy.
- [ ] Dostęp do Google Business Profile.
- [ ] Dostęp do Google Search Console, jeśli już istnieje.
- [ ] Decyzja o GA4/GTM/Google Ads/Meta Pixel.
- [ ] Lista miast priorytetowych SEO.
- [ ] Decyzja, czy obsługujemy tylko Mazowsze, czy szerzej Polskę.

## Źródła i standardy użyte w audycie

- [Next.js Deploying](https://nextjs.org/docs/app/getting-started/deploying)
- [Hostinger - How to add a Node.js Web App](https://www.hostinger.com/support/how-to-deploy-a-nodejs-website-in-hostinger/)
- [Google Search technical requirements](https://developers.google.com/search/docs/essentials/technical)
- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Google - Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google - Influencing title links](https://developers.google.com/search/docs/appearance/title-link)
- [Google - Meta tags supported by Google](https://developers.google.com/search/docs/crawling-indexing/special-tags)
- [Google - JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
- [Google - FAQ structured data, deprecation notice May 7, 2026](https://developers.google.com/search/docs/appearance/structured-data/faqpage)
- [web.dev - Core Web Vitals thresholds](https://web.dev/articles/defining-core-web-vitals-thresholds)
- [web.dev - Security headers quick reference](https://web.dev/articles/security-headers)
- [W3C WCAG 2.2](https://www.w3.org/TR/wcag/)
- [Gov.pl - Polski Akt o Dostępności i usługi handlu elektronicznego](https://www.gov.pl/web/dostepnosc-cyfrowa/polski-akt-o-dostepnosci--uslugi-handlu-elektronicznego)
- [Obecna domena wielkiformat.pl](https://wielkiformat.pl/)
