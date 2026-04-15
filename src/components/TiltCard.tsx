"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

/**
 * 3D tilt card with perspective transform and mouse-follow radial glow.
 * Uses spring physics for smooth return to flat state.
 * will-change is only applied during active hover to save GPU memory.
 */
export function TiltCard({ children, className = "", intensity = 7 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mp, setMp] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);
  const [interactive, setInteractive] = useState(true);
  const rx = useMotionValue(0), ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 20 });
  const sry = useSpring(ry, { stiffness: 150, damping: 20 });

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    const update = () => setInteractive(media.matches);

    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect(); if (!r) return;
    const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
    rx.set((py - 0.5) * -intensity); ry.set((px - 0.5) * intensity);
    setMp({ x: px * 100, y: py * 100 });
    ref.current?.style.setProperty("--ripple-x", `${px * 100}%`);
    ref.current?.style.setProperty("--ripple-y", `${py * 100}%`);
  }, [rx, ry, intensity]);

  const handleMouseEnter = useCallback(() => setIsHovering(true), []);
  const handleMouseLeave = useCallback(() => {
    rx.set(0); ry.set(0);
    setIsHovering(false);
  }, [rx, ry]);

  if (!interactive) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX: srx,
        rotateY: sry,
        transformPerspective: 800,
        transformStyle: "preserve-3d",
        willChange: isHovering ? "transform" : "auto",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      <div className="pointer-events-none absolute inset-0 z-10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(220px circle at ${mp.x}% ${mp.y}%, oklch(0.58 0.24 25 / 7%) 0%, oklch(0.58 0.24 25 / 5%) 28%, oklch(0.58 0.24 25 / 2.5%) 52%, transparent 76%)`,
          filter: "blur(22px)",
        }} />
      {children}
    </motion.div>
  );
}
