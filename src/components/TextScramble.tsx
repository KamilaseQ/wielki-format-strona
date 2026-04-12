import { useEffect, useState, useRef } from "react";
import { useInView } from "motion/react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&";

interface TextScrambleProps {
  text: string;
  className?: string;
  /** Duration in ms for the full scramble effect */
  duration?: number;
  /** Delay before starting (ms) */
  delay?: number;
}

/**
 * Text scramble effect — random characters resolve into final text.
 * Triggers once when element enters viewport.
 */
export function TextScramble({ text, className = "", duration = 800, delay = 0 }: TextScrambleProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(text);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!inView || started) return;
    const timer = setTimeout(() => {
      setStarted(true);
      const chars = text.split("");
      const total = chars.length;
      const stepDuration = duration / total;
      let resolved = 0;

      const interval = setInterval(() => {
        const result = chars.map((char, i) => {
          if (i < resolved) return char;
          if (char === " ") return " ";
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join("");
        setDisplay(result);
        resolved++;
        if (resolved > total) {
          clearInterval(interval);
          setDisplay(text);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [inView, started, text, duration, delay]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
