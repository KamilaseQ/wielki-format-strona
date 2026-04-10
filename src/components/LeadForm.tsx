import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export function LeadForm({ compact = false }: { compact?: boolean }) {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="rounded-xl bg-surface-elevated border border-primary/20 p-8 text-center">
        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
          <Send className="w-5 h-5 text-primary" />
        </div>
        <h3 className="font-heading font-bold text-lg text-foreground mb-2">Dziękujemy!</h3>
        <p className="text-sm text-muted-foreground">Odezwiemy się do Ciebie w ciągu 24 godzin.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
      className={`rounded-xl bg-surface-elevated border border-border p-6 ${compact ? "" : "md:p-8"}`}
    >
      {!compact && (
        <div className="mb-6">
          <h3 className="font-heading font-bold text-xl text-foreground mb-1">Zapytaj o dostępność</h3>
          <p className="text-sm text-muted-foreground">Odpowiadamy w ciągu 24h</p>
        </div>
      )}
      <div className={`grid gap-4 ${compact ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"}`}>
        <input
          type="text"
          placeholder="Imię i nazwisko"
          required
          className="w-full h-11 px-4 rounded-lg bg-input border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
        />
        <input
          type="email"
          placeholder="Adres e-mail"
          required
          className="w-full h-11 px-4 rounded-lg bg-input border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
        />
        <input
          type="tel"
          placeholder="Numer telefonu"
          className="w-full h-11 px-4 rounded-lg bg-input border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
        />
        <input
          type="text"
          placeholder="Miasto / region"
          className="w-full h-11 px-4 rounded-lg bg-input border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
        />
      </div>
      <textarea
        placeholder="Opisz krótko swoje potrzeby..."
        rows={3}
        className="w-full mt-4 px-4 py-3 rounded-lg bg-input border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all resize-none"
      />
      <Button type="submit" variant="cta" size="lg" className="w-full mt-4">
        <Send className="w-4 h-4" />
        Wyślij zapytanie
      </Button>
    </form>
  );
}
