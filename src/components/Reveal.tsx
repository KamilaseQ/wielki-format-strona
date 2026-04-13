"use client";

import { motion, useReducedMotion } from "motion/react";
import type { TargetAndTransition } from "motion/react";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  from?: "bottom" | "left" | "right" | "scale";
}

const variants: Record<string, TargetAndTransition> = {
  bottom: { opacity: 0, y: 24 },
  left: { opacity: 0, x: -30 },
  right: { opacity: 0, x: 30 },
  scale: { opacity: 0, scale: 0.95 },
};

const ease = [0.25, 0.46, 0.45, 0.94] as const;

/**
 * Scroll-reveal animation wrapper.
 * Respects `prefers-reduced-motion` — skips animation when enabled.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  from = "bottom",
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={variants[from]}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.6, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
