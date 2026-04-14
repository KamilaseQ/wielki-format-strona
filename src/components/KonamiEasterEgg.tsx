"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

const KONAMI_CODE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "KeyB", "KeyA",
];

/**
 * Easter egg component - activated by Konami code.
 * Shows a fun billboard animation when the secret code is entered.
 */
export function KonamiEasterEgg() {
  const [activated, setActivated] = useState(false);
  const sequenceRef = useRef<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newSeq = [...sequenceRef.current, e.code].slice(-KONAMI_CODE.length);
      sequenceRef.current = newSeq;

      if (newSeq.length === KONAMI_CODE.length && newSeq.every((k, i) => k === KONAMI_CODE[i])) {
        setActivated(true);
        sequenceRef.current = [];
        setTimeout(() => setActivated(false), 5000);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <AnimatePresence>
      {activated && (
        <motion.div
          className="fixed inset-0 z-[99999] flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Content */}
          <motion.div
            className="relative z-10 text-center"
            initial={{ scale: 0.3, rotateY: 180 }}
            animate={{ scale: 1, rotateY: 0 }}
            exit={{ scale: 0.3, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <div className="text-[120px] md:text-[180px] leading-none mb-4">🎯</div>
            <motion.h2
              className="font-heading font-black text-3xl md:text-5xl text-gradient-brand-bright text-glow-red mb-3"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              WIELKI FORMAT!
            </motion.h2>
            <motion.p
              className="text-muted-foreground text-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Znalazłeś sekret! 🏆
            </motion.p>

            {/* Confetti particles */}
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  background: i % 3 === 0 ? "oklch(0.58 0.24 25)" : i % 3 === 1 ? "oklch(0.72 0.22 38)" : "oklch(0.65 0.26 25)",
                  top: "50%",
                  left: "50%",
                }}
                initial={{ x: 0, y: 0, scale: 0 }}
                animate={{
                  x: (Math.random() - 0.5) * 600,
                  y: (Math.random() - 0.5) * 600,
                  scale: [0, 1.5, 0],
                  rotate: Math.random() * 720,
                }}
                transition={{
                  duration: 2,
                  delay: 0.2 + Math.random() * 0.5,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
