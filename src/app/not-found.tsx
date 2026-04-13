import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4">
      <div className="absolute inset-0 bg-noise" />
      <div className="absolute left-1/2 top-1/3 h-[250px] w-[500px] -translate-x-1/2 rounded-full bg-primary/5 blur-[150px]" />
      <div className="relative z-10 max-w-md text-center">
        <div className="mb-4 font-heading text-[120px] font-black leading-none text-gradient-brand-bright text-glow-red md:text-[160px]">
          404
        </div>
        <h1 className="mb-3 text-2xl font-bold text-foreground">
          Strona nie znaleziona
        </h1>
        <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
          Wybrana podstrona nie istnieje albo zostala przeniesiona. Wroc na
          strone glowna i przejdz do interesujacej sekcji.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg bg-gradient-brand px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/30"
        >
          Wroc na strone glowna
        </Link>
      </div>
    </main>
  );
}
