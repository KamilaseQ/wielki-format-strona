import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Polityka prywatności",
  description:
    "Polityka prywatności serwisu wielkiformat.pl. Informacje o przetwarzaniu danych osobowych zgodnie z RODO.",
  alternates: {
    canonical: "https://wielkiformat.pl/polityka-prywatnosci",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PolitykaPrywatnosciPage() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-noise" />
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-primary text-[11px] font-semibold tracking-[0.2em] uppercase mb-6">
          Dokumenty
        </span>
        <h1 className="font-heading font-black text-4xl md:text-5xl text-foreground leading-tight mb-8">
          Polityka prywatności
        </h1>

        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground leading-relaxed">
          <p className="text-sm">
            Data ostatniej aktualizacji: 14 maja 2026 r.
          </p>

          <h2 className="font-heading text-2xl text-foreground mt-10">
            1. Administrator danych
          </h2>
          <p>
            Administratorem Twoich danych osobowych jest <strong>Billboard Sp. z o.o.</strong>,
            z siedzibą przy Al. Marszałka Józefa Piłsudskiego 55A, 05-270 Marki.
            Kontakt w sprawach związanych z przetwarzaniem danych:{" "}
            <a
              href="mailto:info@wielkiformat.pl"
              className="text-primary hover:underline"
            >
              info@wielkiformat.pl
            </a>
            .
          </p>

          <h2 className="font-heading text-2xl text-foreground mt-10">
            2. Zakres i cele przetwarzania
          </h2>
          <p>
            Przetwarzamy dane osobowe podane w formularzu kontaktowym (imię, adres
            e-mail, numer telefonu, treść wiadomości) w celu:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              udzielenia odpowiedzi na zapytanie i przedstawienia oferty - podstawa:
              art. 6 ust. 1 lit. b RODO (działania przed zawarciem umowy) lub
              art. 6 ust. 1 lit. f RODO (uzasadniony interes administratora);
            </li>
            <li>
              ochrony przed nadużyciami (rate limiting, filtry antyspamowe) -
              podstawa: art. 6 ust. 1 lit. f RODO;
            </li>
            <li>
              wypełnienia obowiązków prawnych ciążących na administratorze -
              podstawa: art. 6 ust. 1 lit. c RODO.
            </li>
          </ul>

          <h2 className="font-heading text-2xl text-foreground mt-10">
            3. Okres przechowywania danych
          </h2>
          <p>
            Dane z formularza kontaktowego przechowujemy maksymalnie przez okres
            12 miesięcy od ostatniego kontaktu, chyba że dojdzie do zawarcia umowy -
            wtedy dane są przechowywane przez okres trwania umowy oraz przez okres
            wynikający z przepisów (m.in. podatkowych i rachunkowych).
          </p>

          <h2 className="font-heading text-2xl text-foreground mt-10">
            4. Odbiorcy danych
          </h2>
          <p>
            Dane mogą być przekazywane podmiotom przetwarzającym na nasze zlecenie
            (dostawca poczty elektronicznej, hostingu, narzędzi analitycznych) na
            podstawie umów powierzenia przetwarzania danych. Nie przekazujemy
            danych poza Europejski Obszar Gospodarczy bez zachowania odpowiednich
            zabezpieczeń.
          </p>

          <h2 className="font-heading text-2xl text-foreground mt-10">
            5. Twoje prawa
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>prawo dostępu do swoich danych oraz uzyskania ich kopii;</li>
            <li>prawo do sprostowania (poprawiania) danych;</li>
            <li>prawo do usunięcia danych (tzw. prawo do bycia zapomnianym);</li>
            <li>prawo do ograniczenia przetwarzania;</li>
            <li>prawo do wniesienia sprzeciwu wobec przetwarzania;</li>
            <li>prawo do przenoszenia danych;</li>
            <li>
              prawo do wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych
              (ul. Stawki 2, 00-193 Warszawa).
            </li>
          </ul>

          <h2 className="font-heading text-2xl text-foreground mt-10">
            6. Dobrowolność podania danych
          </h2>
          <p>
            Podanie danych jest dobrowolne, ale niezbędne do udzielenia odpowiedzi
            na zapytanie i przedstawienia oferty. Brak podania danych
            kontaktowych uniemożliwia kontakt zwrotny.
          </p>

          <h2 className="font-heading text-2xl text-foreground mt-10">
            7. Pliki cookies
          </h2>
          <p>
            Serwis korzysta z plików cookies niezbędnych do prawidłowego działania
            (m.in. zapamiętanie preferencji motywu, akceptacja informacji o
            cookies). Możesz zarządzać plikami cookies w ustawieniach swojej
            przeglądarki.
          </p>

          <h2 className="font-heading text-2xl text-foreground mt-10">
            8. Zmiany polityki
          </h2>
          <p>
            Polityka prywatności może być aktualizowana. Każda istotna zmiana
            będzie publikowana na tej stronie wraz z nową datą obowiązywania.
          </p>

          <p className="mt-12">
            <Link href="/" className="text-primary hover:underline">
              ← Powrót na stronę główną
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
