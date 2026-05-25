import Link from "next/link";
import { ArrowRight, Home, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

type LinkItem = {
  href: string;
  title: string;
  description: string;
};

type TemporarySectionNoticeProps = {
  eyebrow: string;
  title: string;
  description: string;
  note: string;
  links: LinkItem[];
};

export function TemporarySectionNotice({
  eyebrow,
  title,
  description,
  note,
  links,
}: TemporarySectionNoticeProps) {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 bg-grid-fine opacity-35" aria-hidden="true" />
      <div className="absolute inset-0 bg-noise" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(340px,0.95fr)] lg:px-8">
        <div className="flex min-h-[54vh] flex-col justify-center">
          <span className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            {eyebrow}
          </span>
          <h1 className="max-w-4xl font-heading text-4xl font-black leading-tight text-foreground md:text-6xl lg:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {description}
          </p>
          <div className="mt-8">
            <Link href="/kontakt">
              <Button variant="hero" size="lg" className="min-h-[44px] glow-red">
                <Mail className="h-4 w-4" />
                Zapytaj o wycenę
              </Button>
            </Link>
            <Link
              href="/"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
            >
              <Home className="h-4 w-4" />
              Wróć na stronę główną
            </Link>
          </div>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground/80">
            {note}
          </p>
        </div>

        <div className="self-center border-y border-border/50 bg-surface/60 backdrop-blur-sm">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-center justify-between gap-5 border-b border-border/50 px-4 py-6 transition-colors last:border-b-0 hover:bg-secondary/40 sm:px-6"
            >
              <span>
                <span className="block font-heading text-xl font-bold text-foreground md:text-2xl">
                  {item.title}
                </span>
                <span className="mt-2 block text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </span>
              </span>
              <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
