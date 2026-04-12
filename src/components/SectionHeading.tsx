import { motion } from "motion/react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
}

export function SectionHeading({ eyebrow, title, description, center = true }: SectionHeadingProps) {
  return (
    <div className={`mb-14 md:mb-18 ${center ? "text-center" : ""}`}>
      {eyebrow && (
        <div className={`flex items-center gap-3 mb-4 ${center ? "justify-center" : ""}`}>
          <motion.div
            className="h-px w-8 bg-gradient-to-r from-transparent to-primary/50"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "left" }}
          />
          <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-primary font-heading">
            {eyebrow}
          </span>
          <motion.div
            className="h-px w-8 bg-gradient-to-l from-transparent to-primary/50"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "right" }}
          />
        </div>
      )}
      <h2 className="font-heading font-black text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight">
        {title}
      </h2>
      {description && (
        <p className={`mt-5 text-muted-foreground text-base md:text-lg leading-relaxed ${center ? "max-w-2xl mx-auto" : "max-w-2xl"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
