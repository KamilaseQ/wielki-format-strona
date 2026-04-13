"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to monitoring service (e.g. Sentry)
    console.error("Page error:", error);
  }, [error]);

  return (
    <main className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-background px-4">
      <div className="absolute inset-0 bg-noise" />
      <div className="absolute left-1/2 top-1/3 h-[250px] w-[500px] -translate-x-1/2 rounded-full bg-destructive/5 blur-[150px]" />
      <div className="relative z-10 max-w-md text-center">
        <div className="mb-4 font-heading text-[80px] font-black leading-none text-destructive/30 md:text-[100px]">
          Ups!
        </div>
        <h1 className="mb-3 text-xl font-bold text-foreground">
          Coś poszło nie tak
        </h1>
        <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
          Wystąpił nieoczekiwany błąd. Spróbuj odświeżyć stronę lub wróć na
          stronę główną.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center rounded-lg border border-border bg-secondary px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:bg-secondary/80 cursor-pointer min-h-[44px]"
          >
            Spróbuj ponownie
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] min-h-[44px]"
          >
            Strona główna
          </Link>
        </div>
      </div>
    </main>
  );
}
