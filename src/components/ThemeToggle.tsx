"use client";

import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const reduced = useReducedMotion();
  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative inline-flex items-center justify-center min-w-[44px] min-h-[44px] w-11 h-11 rounded-lg border transition-all duration-300 cursor-pointer ${
        isLight
          ? "bg-white/70 border-border/60 text-foreground hover:border-primary/40"
          : "bg-secondary/40 border-border/40 text-foreground hover:border-primary/40"
      } ${className}`}
      aria-label={isLight ? "Włącz motyw ciemny" : "Włącz motyw jasny"}
      title={isLight ? "Motyw ciemny" : "Motyw jasny"}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isLight ? (
          <motion.span
            key="moon"
            initial={reduced ? false : { opacity: 0, rotate: -45, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={reduced ? undefined : { opacity: 0, rotate: 45, scale: 0.6 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="block"
          >
            <Moon className="w-4 h-4" />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={reduced ? false : { opacity: 0, rotate: 45, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={reduced ? undefined : { opacity: 0, rotate: -45, scale: 0.6 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="block"
          >
            <Sun className="w-4 h-4" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
