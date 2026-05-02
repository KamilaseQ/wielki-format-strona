"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  COMPANY_WHATSAPP_ARIA,
  COMPANY_WHATSAPP_URL,
} from "@/lib/contact";

/* WhatsApp brand glyph as inline SVG (so we don't pull a new dep) */
function WhatsAppGlyph({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M16 3C8.82 3 3 8.82 3 16c0 2.29.6 4.43 1.66 6.3L3 29l6.86-1.62A12.92 12.92 0 0 0 16 29c7.18 0 13-5.82 13-13S23.18 3 16 3Zm0 23.55a10.5 10.5 0 0 1-5.34-1.45l-.38-.22-4.07.96.97-3.97-.25-.4A10.55 10.55 0 1 1 26.55 16 10.56 10.56 0 0 1 16 26.55Zm5.78-7.86c-.32-.16-1.88-.93-2.17-1.04-.29-.1-.5-.16-.71.16-.21.32-.81 1.04-1 1.25-.18.21-.36.24-.68.08-.32-.16-1.34-.49-2.55-1.57a9.62 9.62 0 0 1-1.77-2.2c-.18-.32-.02-.49.14-.65.14-.14.32-.36.48-.55.16-.18.21-.32.32-.53.1-.21.05-.4-.03-.55-.08-.16-.71-1.72-.98-2.36-.26-.62-.52-.54-.71-.55-.18-.01-.4-.01-.6-.01a1.16 1.16 0 0 0-.85.4c-.29.32-1.1 1.07-1.1 2.6s1.13 3.02 1.29 3.23c.16.21 2.22 3.39 5.39 4.75.75.32 1.34.51 1.8.65.76.24 1.45.21 2 .13.61-.09 1.88-.77 2.15-1.51.27-.74.27-1.37.19-1.51-.08-.13-.29-.21-.61-.37Z" />
    </svg>
  );
}

export function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [showLabel, setShowLabel] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    // Reveal a little after first paint so it doesn't fight LoadingSplash
    const t = setTimeout(() => setVisible(true), 1200);
    // Pulse the label briefly to draw attention
    const t2 = setTimeout(() => setShowLabel(true), 1800);
    const t3 = setTimeout(() => setShowLabel(false), 5000);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={reduced ? false : { opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={reduced ? undefined : { opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
          className="whatsapp-fab-wrap"
        >
          {/* Hover/auto label */}
          <AnimatePresence>
            {showLabel && (
              <motion.span
                key="label"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.25 }}
                className="whatsapp-fab-label"
              >
                Napisz na WhatsApp
              </motion.span>
            )}
          </AnimatePresence>

          <a
            href={COMPANY_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-fab"
            aria-label={COMPANY_WHATSAPP_ARIA}
            title="Napisz na WhatsApp"
            onMouseEnter={() => setShowLabel(true)}
            onMouseLeave={() => setShowLabel(false)}
            onFocus={() => setShowLabel(true)}
            onBlur={() => setShowLabel(false)}
          >
            <span className="whatsapp-fab-pulse" aria-hidden="true" />
            <WhatsAppGlyph className="w-7 h-7 relative z-10" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
