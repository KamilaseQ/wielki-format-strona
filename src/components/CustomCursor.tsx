"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const isMobileRef = useRef(true);
  const hasMovedRef = useRef(false);
  const isHoveringRef = useRef(false);
  const rafRef = useRef<number>(0);
  const posRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Only show on desktop with fine pointer
    const mq = window.matchMedia("(pointer: fine)");
    isMobileRef.current = !mq.matches;
    if (!mq.matches) {
      // Force a re-render to show/hide cursor
      if (cursorRef.current) cursorRef.current.style.display = "block";
    } else {
      return;
    }

    const cursor = cursorRef.current;
    if (!cursor) return;
    cursor.style.display = "block";

    // Use RAF-batched position updates instead of direct DOM writes on every mousemove
    const onMove = (e: MouseEvent) => {
      posRef.current.x = e.clientX;
      posRef.current.y = e.clientY;
      if (!hasMovedRef.current) {
        hasMovedRef.current = true;
        cursor.style.opacity = "1";
      }
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          cursor.style.left = posRef.current.x + "px";
          cursor.style.top = posRef.current.y + "px";
          rafRef.current = 0;
        });
      }
    };

    const onEnter = () => {
      isHoveringRef.current = true;
      cursor.classList.add("hovering");
    };
    const onLeave = () => {
      isHoveringRef.current = false;
      cursor.classList.remove("hovering");
    };

    document.addEventListener("mousemove", onMove, { passive: true });

    // Use event delegation instead of attaching to every interactive element
    document.addEventListener("mouseover", (e) => {
      const target = e.target as Element;
      if (target.closest("a, button, [role='button'], input, select, textarea, .cursor-interact")) {
        onEnter();
      }
    });
    document.addEventListener("mouseout", (e) => {
      const target = e.target as Element;
      if (target.closest("a, button, [role='button'], input, select, textarea, .cursor-interact")) {
        onLeave();
      }
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Always render the div but hide it initially
  return (
    <div
      ref={cursorRef}
      className="cursor-glow"
      style={{ opacity: 0, display: "none" }}
      aria-hidden="true"
    />
  );
}
