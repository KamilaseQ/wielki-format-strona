"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  const [hasMoved, setHasMoved] = useState(false);

  useEffect(() => {
    // Only show on desktop with fine pointer
    const mq = window.matchMedia("(pointer: fine)");
    setIsMobile(!mq.matches);
    if (!mq.matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMove = (e: MouseEvent) => {
      setHasMoved(true);
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    };

    const onEnter = () => setHovering(true);
    const onLeave = () => setHovering(false);

    document.addEventListener("mousemove", onMove, { passive: true });

    // Observe interactive elements
    const interactives = document.querySelectorAll("a, button, [role='button'], input, select, textarea, .cursor-interact");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  if (isMobile) return null;

  return (
    <div
      ref={cursorRef}
      className={`cursor-glow ${hovering ? "hovering" : ""}`}
      style={{ opacity: hasMoved ? 1 : 0 }}
      aria-hidden="true"
    />
  );
}
