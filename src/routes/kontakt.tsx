import { createFileRoute } from "@tanstack/react-router";
import { LeadForm } from "@/components/LeadForm";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt — wielkiformat.pl" },
      { name: "description", content: "Skontaktuj się z nami. Zapytaj o dostępność billboardów, poproś o wycenę lub umów się na rozmowę." },
      { property: "og:title", content: "Kontakt — wielkiformat.pl" },
      { property: "og:description", content: "Zapytaj o dostępność billboardów i poproś o wycenę." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <section className="section-padding bg-noise">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Info */}
          <div>
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-3">Kontakt</span>
            <h1 className="font-heading font-bold text-4xl md:text-5xl text-foreground leading-tight mb-6">
              Porozmawiajmy o <span className="text-gradient-brand">Twojej kampanii</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              Wyślij zapytanie przez formularz lub skontaktuj się bezpośrednio. Odpowiadamy na każde zapytanie w ciągu 24 godzin.
            </p>

            <div className="space-y-6">
              {[
                { icon: Phone, label: "Telefon", value: "+48 123 456 789", href: "tel:+48123456789" },
                { icon: Mail, label: "E-mail", value: "biuro@wielkiformat.pl", href: "mailto:biuro@wielkiformat.pl" },
                { icon: MapPin, label: "Adres", value: "ul. Przykładowa 10, 00-001 Warszawa" },
                { icon: Clock, label: "Godziny pracy", value: "Pon–Pt: 8:00–17:00" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">{item.label}</div>
                    {"href" in item && item.href ? (
                      <a href={item.href} className="text-foreground font-medium hover:text-primary transition-colors">{item.value}</a>
                    ) : (
                      <div className="text-foreground font-medium">{item.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Company info */}
            <div className="mt-10 p-5 rounded-xl bg-card border border-border">
              <h3 className="font-heading font-semibold text-foreground text-sm mb-2">Dane firmowe</h3>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>Billboard Sp. z o.o.</p>
                <p>ul. Przykładowa 10, 00-001 Warszawa</p>
                <p>NIP: 000-000-00-00 | REGON: 000000000</p>
                <p>KRS: 0000000000</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <LeadForm />
        </div>
      </div>
    </section>
  );
}
