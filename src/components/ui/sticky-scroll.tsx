import React from "react";

interface Project {
  client: string;
  quote: string;
  role: string;
  images: string[];
}

const projects: Project[] = [
  {
    client: "Sieć handlowa — kampania ogólnopolska",
    quote: "Dzięki wielkiformat.pl nasze billboardy pojawiły się w 30 miastach w ciągu tygodnia. Proces był błyskawiczny.",
    role: "Dyrektor marketingu",
    images: [
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop",
    ],
  },
  {
    client: "Deweloper — premiera inwestycji",
    quote: "Monster XXL przy A2 dał nam więcej leadów w miesiąc niż cała kampania digital w kwartale.",
    role: "Kierownik sprzedaży",
    images: [
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=600&fit=crop",
    ],
  },
  {
    client: "Marka FMCG — launch produktu",
    quote: "Kompleksowa obsługa od projektu po montaż. Zero stresu, pełna dokumentacja fotograficzna.",
    role: "Brand Manager",
    images: [
      "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=600&fit=crop",
    ],
  },
  {
    client: "Operator telekomunikacyjny — kampania sezonowa",
    quote: "Współpracujemy od 5 lat. Nikt inny nie ogarnia logistyki billboardów na taką skalę.",
    role: "Specjalista ds. mediów OOH",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
    ],
  },
];

export default function StickyScrollGallery() {
  return (
    <ReactLenis root>
      <div className="w-full">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="sticky top-0 min-h-screen flex items-center"
            style={{ zIndex: idx + 1 }}
          >
            <div
              className="w-full min-h-screen flex flex-col justify-center py-16 md:py-24 bg-background"
              style={{
                backgroundImage:
                  idx % 2 === 0
                    ? undefined
                    : "linear-gradient(to bottom, hsl(var(--card)), hsl(var(--background)))",
                backgroundColor: idx % 2 === 0 ? "hsl(var(--background))" : undefined,
              }}
            >
              <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Client quote */}
                <div className="mb-8 max-w-2xl">
                  <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
                    {project.client}
                  </span>
                  <blockquote className="font-heading text-xl md:text-2xl lg:text-3xl font-bold text-foreground leading-snug mb-3">
                    „{project.quote}"
                  </blockquote>
                  <p className="text-sm text-muted-foreground">— {project.role}</p>
                </div>

                {/* Image grid */}
                <div
                  className={`grid gap-3 ${
                    project.images.length <= 3
                      ? "grid-cols-1 sm:grid-cols-3"
                      : project.images.length === 4
                        ? "grid-cols-2 lg:grid-cols-4"
                        : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
                  }`}
                >
                  {project.images.map((src, i) => (
                    <div
                      key={i}
                      className="overflow-hidden rounded-xl border border-border bg-card aspect-[4/3]"
                    >
                      <img
                        src={src}
                        alt={`${project.client} – zdjęcie ${i + 1}`}
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ReactLenis>
  );
}
