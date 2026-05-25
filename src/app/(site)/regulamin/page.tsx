import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Download, ExternalLink, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const OWU_PDF_PATH = "/documents/owu-2024-02-08.pdf";

export const metadata: Metadata = {
  title: "Ogólne Warunki Umowy",
  description:
    "Ogólne Warunki Umowy Billboard Sp. z o.o. do otwarcia lub pobrania w formacie PDF.",
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
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 bg-noise" />
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
            Dokument dla klientów
          </span>
          <h1 className="mb-5 font-heading text-4xl font-black leading-tight text-foreground md:text-5xl">
            Ogólne Warunki Umowy
          </h1>
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            Aktualne OWU możesz otworzyć w przeglądarce albo pobrać jako plik
            PDF. To dokument, do którego odsyłamy klientów przy ustalaniu
            warunków współpracy.
          </p>
        </div>

        <section id="owu" className="mb-14 scroll-mt-24">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
            <div className="overflow-hidden rounded-lg border border-primary/35 bg-card/50 shadow-xl shadow-primary/5">
              <div className="flex items-center gap-3 border-b border-border bg-secondary/30 px-4 py-3">
                <FileText className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    OWU z dnia 08.02.2024 r.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Format PDF, ok. 661 KB
                  </p>
                </div>
              </div>
              <iframe
                src={OWU_PDF_PATH}
                title="Podgląd Ogólnych Warunków Umowy"
                className="h-[72vh] min-h-[560px] w-full bg-background"
              />
            </div>

            <aside className="h-fit rounded-lg border border-primary/35 bg-card/50 p-5 shadow-lg shadow-primary/5">
              <h2 className="mb-3 font-heading text-xl font-bold text-foreground">
                Pobierz dokument
              </h2>
              <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
                Jeśli podgląd PDF nie wyświetla się w Twojej przeglądarce, użyj
                bezpośredniego otwarcia lub pobierz plik.
              </p>
              <div className="flex flex-col gap-3">
                <Button asChild variant="cta" className="w-full">
                  <a href={OWU_PDF_PATH} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                    Otwórz OWU
                  </a>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <a href={OWU_PDF_PATH} download>
                    <Download className="h-4 w-4" />
                    Pobierz OWU
                  </a>
                </Button>
              </div>
            </aside>
          </div>
        </section>

        <section
          id="regulamin-serwisu"
          className="scroll-mt-24 border-t border-border/40 pt-8"
        >
          <details className="group rounded-lg border border-border bg-card/30">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4">
              <span className="flex items-center gap-3">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <span>
                  <span className="block font-heading text-base font-semibold text-foreground">
                    Regulamin serwisu
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Zasady korzystania ze strony internetowej
                  </span>
                </span>
              </span>
              <span className="text-sm text-muted-foreground transition-transform group-open:rotate-180">
                ↓
              </span>
            </summary>

            <div className="border-t border-border px-5 py-5 text-sm leading-relaxed text-muted-foreground">
              <div className="space-y-5">
                <div>
                  <h2 className="mb-2 font-heading text-lg font-bold text-foreground">
                    Charakter serwisu
                  </h2>
                  <p>
                    Serwis ma charakter informacyjny i służy do prezentacji
                    oferty oraz umożliwienia kontaktu z operatorem serwisu.
                    Informacje opublikowane na stronie nie stanowią oferty w
                    rozumieniu przepisów prawa cywilnego.
                  </p>
                </div>

                <div>
                  <h2 className="mb-2 font-heading text-lg font-bold text-foreground">
                    Korzystanie ze strony
                  </h2>
                  <p>
                    Użytkownik powinien korzystać z serwisu zgodnie z prawem,
                    dobrymi obyczajami i jego przeznaczeniem. Zabronione jest
                    dostarczanie treści bezprawnych, spamu oraz działań
                    zakłócających prawidłowe funkcjonowanie strony.
                  </p>
                </div>

                <div>
                  <h2 className="mb-2 font-heading text-lg font-bold text-foreground">
                    Treści i prawa
                  </h2>
                  <p>
                    Materiały dostępne w serwisie podlegają ochronie prawnej.
                    Ich kopiowanie lub wykorzystywanie poza dozwolonym użytkiem
                    wymaga zgody uprawnionego podmiotu.
                  </p>
                </div>

                <div>
                  <h2 className="mb-2 font-heading text-lg font-bold text-foreground">
                    Dane osobowe i kontakt
                  </h2>
                  <p>
                    Zasady przetwarzania danych osobowych opisuje{" "}
                    <Link
                      href="/polityka-prywatnosci"
                      className="text-primary hover:underline"
                    >
                      polityka prywatności
                    </Link>
                    . Uwagi dotyczące działania serwisu można kierować na adres{" "}
                    <a
                      href="mailto:info@wielkiformat.pl"
                      className="text-primary hover:underline"
                    >
                      info@wielkiformat.pl
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </details>
        </section>
      </div>
    </section>
  );
}
