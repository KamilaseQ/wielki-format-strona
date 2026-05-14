import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Regulamin serwisu",
  description:
    "Regulamin korzystania z serwisu wielkiformat.pl oraz ogólne warunki świadczenia usług.",
  alternates: {
    canonical: "https://wielkiformat.pl/regulamin",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RegulaminPage() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-noise" />
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-primary text-[11px] font-semibold tracking-[0.2em] uppercase mb-6">
          Dokumenty
        </span>
        <h1 className="font-heading font-black text-4xl md:text-5xl text-foreground leading-tight mb-8">
          Regulamin serwisu
        </h1>

        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground leading-relaxed">
          <p className="text-sm">
            Data ostatniej aktualizacji: 14 maja 2026 r.
          </p>

          <h2 className="font-heading text-2xl text-foreground mt-10">
            §1. Postanowienia ogólne
          </h2>
          <p>
            Niniejszy regulamin określa zasady korzystania z serwisu internetowego
            dostępnego pod adresem{" "}
            <a href="https://wielkiformat.pl" className="text-primary hover:underline">
              wielkiformat.pl
            </a>
            , prowadzonego przez <strong>Billboard Sp. z o.o.</strong>, z siedzibą
            przy Al. Marszałka Józefa Piłsudskiego 55A, 05-270 Marki (dalej:
            "Usługodawca").
          </p>

          <h2 className="font-heading text-2xl text-foreground mt-10">
            §2. Zakres usług
          </h2>
          <p>
            Serwis stanowi prezentację oferty Usługodawcy w zakresie wynajmu
            nośników reklamy wielkoformatowej (billboardów) oraz kompleksowej
            obsługi kampanii reklamowych. Za pośrednictwem serwisu Użytkownik może:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>zapoznać się z ofertą i mapą nośników;</li>
            <li>skontaktować się z Usługodawcą poprzez formularz kontaktowy;</li>
            <li>poprosić o indywidualną wycenę kampanii.</li>
          </ul>
          <p>
            Wypełnienie formularza kontaktowego nie stanowi oferty handlowej w
            rozumieniu Kodeksu cywilnego. Warunki realizacji usługi każdorazowo
            ustalane są w odrębnej umowie.
          </p>

          <h2 className="font-heading text-2xl text-foreground mt-10">
            §3. Wymagania techniczne
          </h2>
          <p>
            Do korzystania z serwisu wymagane jest urządzenie z dostępem do
            Internetu oraz przeglądarka internetowa w aktualnej wersji
            obsługująca JavaScript i pliki cookies.
          </p>

          <h2 className="font-heading text-2xl text-foreground mt-10">
            §4. Zasady korzystania z serwisu
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              Użytkownik zobowiązany jest do korzystania z serwisu zgodnie z jego
              przeznaczeniem, przepisami prawa oraz dobrymi obyczajami.
            </li>
            <li>
              Zabronione jest dostarczanie treści o charakterze bezprawnym,
              w tym przesyłanie spamu, treści obraźliwych lub naruszających prawa
              osób trzecich.
            </li>
            <li>
              Usługodawca zastrzega sobie prawo do zablokowania dostępu do
              formularza kontaktowego użytkownikom naruszającym regulamin
              (m.in. poprzez rate limiting).
            </li>
          </ul>

          <h2 className="font-heading text-2xl text-foreground mt-10">
            §5. Prawa autorskie
          </h2>
          <p>
            Wszelkie treści zamieszczone w serwisie (teksty, grafiki, zdjęcia,
            logotypy, układ strony) podlegają ochronie prawnoautorskiej i stanowią
            własność Usługodawcy lub są wykorzystywane na podstawie odpowiednich
            licencji. Kopiowanie i wykorzystywanie tych treści bez zgody jest
            zabronione.
          </p>

          <h2 className="font-heading text-2xl text-foreground mt-10">
            §6. Reklamacje
          </h2>
          <p>
            Reklamacje związane z funkcjonowaniem serwisu można zgłaszać na adres{" "}
            <a
              href="mailto:info@wielkiformat.pl"
              className="text-primary hover:underline"
            >
              info@wielkiformat.pl
            </a>
            . Reklamacje rozpatrywane są w terminie 14 dni roboczych od ich
            otrzymania.
          </p>

          <h2 className="font-heading text-2xl text-foreground mt-10">
            §7. Dane osobowe
          </h2>
          <p>
            Zasady przetwarzania danych osobowych opisane są w{" "}
            <Link href="/polityka-prywatnosci" className="text-primary hover:underline">
              Polityce prywatności
            </Link>
            .
          </p>

          <h2 className="font-heading text-2xl text-foreground mt-10">
            §8. Postanowienia końcowe
          </h2>
          <p>
            Usługodawca zastrzega sobie prawo do zmiany regulaminu z ważnych
            powodów (m.in. zmiany przepisów prawa, zmiany zakresu usług). Aktualna
            wersja regulaminu publikowana jest na tej stronie. W sprawach
            nieuregulowanych mają zastosowanie przepisy prawa polskiego.
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
