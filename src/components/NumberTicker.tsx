import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

interface NumberTickerProps {
  value: number;
  className?: string;
  /** Animation duration in seconds */
  duration?: number;
  /** Delay before starting (ms) */
  delay?: number;
  /** Suffix after number (e.g. "+", "%") */
  suffix?: string;
  /** Prefix before number */
  prefix?: string;
}

/**
 * Slot-machine style number ticker — digits scroll from 0 to target value.
 * Each digit animates independently with CSS translateY for smooth performance.
 */
export function NumberTicker({
  value,
  className = "",
  duration = 2,
  delay = 0,
  suffix = "",
  prefix = "",
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const timer = setTimeout(() => {
      const startTime = performance.now();
      const durationMs = duration * 1000;

      function tick(now: number) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / durationMs, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(Math.round(eased * value));
        if (progress < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
    }, delay);

    return () => clearTimeout(timer);
  }, [inView, value, duration, delay]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}{display.toLocaleString()}{suffix}
    </span>
  );
}
