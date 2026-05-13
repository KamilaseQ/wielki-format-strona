"use client";

import Image from "next/image";
import { useRef, useState, useCallback } from "react";
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
  beforeLabel = "Pusty nośnik",
  afterLabel = "Z reklamą",
  beforeAlt = "Nośnik reklamowy przed montażem plakatu",
  afterAlt = "Nośnik reklamowy po montażu plakatu z reklamą",
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(8, Math.min(92, pct)));
  }, []);

  const handlePointerDown = useCallback((event: React.PointerEvent) => {
    dragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    updatePosition(event.clientX);
  }, [updatePosition]);

  const handlePointerMove = useCallback((event: React.PointerEvent) => {
    if (!dragging.current) return;
    updatePosition(event.clientX);
  }, [updatePosition]);

  const handlePointerUp = useCallback(() => {
    dragging.current = false;
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="relative rounded-2xl overflow-hidden aspect-[16/10] cursor-col-resize select-none border border-border/40 bg-card"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Image
        src={beforeImage}
        alt={beforeAlt}
        fill
        sizes="(min-width: 1024px) 960px, 100vw"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ clipPath: `inset(0 0 0 ${position}%)` }}>
        <Image
          src={afterImage}
          alt={afterAlt}
          fill
          sizes="(min-width: 1024px) 960px, 100vw"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      <div
        className="absolute top-0 bottom-0 z-20"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      >
        <div className="w-0.5 h-full bg-white/80 shadow-[0_0_12px_oklch(0_0_0/45%)]" />
        <div className="absolute top-1/2 left-1/2 w-10 h-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white text-gray-800 shadow-xl flex items-center justify-center">
          <GripVertical className="w-4 h-4" />
        </div>
      </div>

      <div className="absolute top-4 left-4 z-20 px-2.5 py-1 rounded-lg bg-black/55 backdrop-blur-md text-white text-[11px] font-heading font-bold uppercase tracking-wider pointer-events-none">
        {beforeLabel}
      </div>
      <div className="absolute top-4 right-4 z-20 px-2.5 py-1 rounded-lg bg-black/55 backdrop-blur-md text-white text-[11px] font-heading font-bold uppercase tracking-wider pointer-events-none">
        {afterLabel}
      </div>
    </motion.div>
  );
}
