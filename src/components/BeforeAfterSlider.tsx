"use client";

import Image from "next/image";
import { useState, useRef, useCallback } from "react";
import { motion } from "motion/react";
import { GripVertical } from "lucide-react";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  beforeAlt?: string;
  afterAlt?: string;
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Przed",
  afterLabel = "Po",
  beforeAlt = "Zdjęcie przed",
  afterAlt = "Zdjęcie po",
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(2, Math.min(98, (x / rect.width) * 100));
    setPosition(pct);
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  }, [updatePosition]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    updatePosition(e.clientX);
  }, [updatePosition]);

  const handlePointerUp = useCallback(() => {
    dragging.current = false;
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="relative rounded-2xl overflow-hidden aspect-[16/10] cursor-col-resize select-none border border-border/30"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* After (bottom layer — full) */}
      <Image
        src={afterImage}
        alt={afterAlt}
        fill
        sizes="(min-width: 1024px) 960px, 100vw"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Before (top layer — clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <Image
          src={beforeImage}
          alt={beforeAlt}
          fill
          sizes="(min-width: 1024px) 960px, 100vw"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      {/* Slider line */}
      <div
        className="absolute top-0 bottom-0 z-10"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      >
        <div className="w-0.5 h-full bg-white/60 backdrop-blur-sm" />
        {/* Handle */}
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur shadow-xl flex items-center justify-center hover:scale-110 transition-transform">
          <GripVertical className="w-4 h-4 text-gray-700" />
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 px-2.5 py-1 rounded-lg bg-black/50 backdrop-blur-md text-white text-[11px] font-heading font-bold uppercase tracking-wider pointer-events-none">
        {beforeLabel}
      </div>
      <div className="absolute top-4 right-4 px-2.5 py-1 rounded-lg bg-black/50 backdrop-blur-md text-white text-[11px] font-heading font-bold uppercase tracking-wider pointer-events-none">
        {afterLabel}
      </div>
    </motion.div>
  );
}
