import React from "react";

const projects = [
  {
    title: "Kampania Retail — sieć handlowa",
    images: [
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=400&fit=crop",
    ],
  },
  {
    title: "Billboard Monster XXL — autostrada A2",
    images: [
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=600&h=400&fit=crop",
    ],
  },
  {
    title: "Kampania miejska — Super 18",
    images: [
      "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&h=400&fit=crop",
    ],
  },
  {
    title: "Druk i montaż — Super 36",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop",
    ],
  },
];

export default function StickyScrollGallery() {
  return (
    <div className="w-full">
      {projects.map((project, idx) => (
        <div key={idx} className="sticky top-0 min-h-screen flex flex-col justify-center py-12 md:py-20">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <h3 className="font-heading font-bold text-xl md:text-2xl text-foreground mb-6">
              {project.title}
            </h3>
            <div
              className={`grid gap-3 ${
                project.images.length <= 3
                  ? "grid-cols-1 sm:grid-cols-3"
                  : project.images.length === 4
                    ? "grid-cols-2 sm:grid-cols-4"
                    : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
              }`}
            >
              {project.images.map((src, i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-xl border border-border bg-card aspect-[3/2]"
                >
                  <img
                    src={src}
                    alt={`${project.title} – zdjęcie ${i + 1}`}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
