import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { ArrowRight, Printer, Wrench, Camera, Paintbrush, FileCheck, Truck } from "lucide-react";

export const Route = createFileRoute("/obsluga-kampanii")({
  head: () => ({
    meta: [
      { title: "Kompleksowa obsługa kampanii — wielkiformat.pl" },
      { name: "description", content: "Pełna obsługa kampanii billboardowej: projekt graficzny, druk, montaż, demontaż i dokumentacja fotograficzna." },
      { property: "og:title", content: "Obsługa kampanii — wielkiformat.pl" },
      { property: "og:description", content: "Pełna obsługa kampanii billboardowej od A do Z." },
    ],
  }),
  component: CampaignServicePage,
});

const services = [
  { icon: Paintbrush, title: "Projekt graficzny", desc: "Przygotujemy projekt plakatu dostosowany do formatu nośnika. Zadbamy o czytelność, kompozycję i zgodność z Twoim brandem." },
  { icon: Printer, title: "Druk wielkoformatowy", desc: "Profesjonalny druk na materiałach odpornych na warunki atmosferyczne. Najwyższa jakość kolorów i trwałość." },
  { icon: Truck, title: "Logistyka i transport", desc: "Zajmiemy się dostarczeniem materiałów na miejsce montażu — bez Twojego udziału." },
  { icon: Wrench, title: "Montaż", desc: "Sprawny montaż plakatów na nośnikach. Realizujemy montaże terminowo, na terenie całej Polski." },
  { icon: FileCheck, title: "Demontaż i zaklejenie", desc: "Po zakończeniu kampanii demontujemy plakat i zaklejamy nośnik. Wszystko w ramach usługi." },
  { icon: Camera, title: "Dokumentacja fotograficzna", desc: "Po montażu otrzymasz zdjęcia każdego nośnika z Twoją reklamą — potwierdzenie realizacji." },
];

function CampaignServicePage() {
  return (
    <>
      <section className="section-padding bg-noise">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-3">Kompleksowa obsługa</span>
            <h1 className="font-heading font-bold text-4xl md:text-5xl text-foreground leading-tight mb-6">
              Cały proces <span className="text-gradient-brand">po naszej stronie</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Nie musisz koordynować projektu, druku, transportu i montażu osobno. Obsłużymy Twoją kampanię od A do Z — szybko, sprawnie i bez komplikacji.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <div key={s.title} className="group rounded-xl bg-card border border-border p-6 hover:border-primary/30 transition-all">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <s.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/kontakt">
              <Button variant="cta" size="xl">
                Zapytaj o kompleksową obsługę
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
