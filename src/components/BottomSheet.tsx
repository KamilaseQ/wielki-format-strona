import { useState, useRef, useCallback, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate, PanInfo } from "motion/react";

type SheetState = "collapsed" | "half" | "full";

const SNAP_POINTS: Record<SheetState, number> = {
  collapsed: 0.12,
  half: 0.45,
  full: 0.92,
};

interface BottomSheetProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  state: SheetState;
  onStateChange: (state: SheetState) => void;
}

export function BottomSheet({ children, header, state, onStateChange }: BottomSheetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const y = useMotionValue(0);
  const [containerH, setContainerH] = useState(0);

  useEffect(() => {
    const update = () => {
      if (containerRef.current) setContainerH(window.innerHeight);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Animate to snap point when state changes
  useEffect(() => {
    if (!containerH) return;
    const targetY = containerH * (1 - SNAP_POINTS[state]);
    animate(y, targetY, { type: "spring", stiffness: 300, damping: 30 });
  }, [state, containerH, y]);

  const handleDragEnd = useCallback(
    (_: any, info: PanInfo) => {
      if (!containerH) return;
      const currentY = y.get();
      const velocity = info.velocity.y;
      const pct = 1 - currentY / containerH;

      // Fast swipe detection
      if (velocity < -500) {
        onStateChange(state === "collapsed" ? "half" : "full");
        return;
      }
      if (velocity > 500) {
        onStateChange(state === "full" ? "half" : "collapsed");
        return;
      }

      // Snap to nearest
      const states: SheetState[] = ["collapsed", "half", "full"];
      let closest: SheetState = "collapsed";
      let minDist = Infinity;
      for (const s of states) {
        const dist = Math.abs(pct - SNAP_POINTS[s]);
        if (dist < minDist) {
          minDist = dist;
          closest = s;
        }
      }
      onStateChange(closest);
    },
    [containerH, state, onStateChange, y]
  );

  const borderRadius = useTransform(y, [containerH * 0.1, containerH * 0.8], [24, 0]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-40 pointer-events-none lg:hidden">
      <motion.div
        style={{ y, borderTopLeftRadius: borderRadius, borderTopRightRadius: borderRadius }}
        drag="y"
        dragConstraints={{ top: containerH * (1 - SNAP_POINTS.full), bottom: containerH * (1 - SNAP_POINTS.collapsed) }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
        className="absolute left-0 right-0 bottom-0 bg-surface border-t border-border/40 shadow-2xl pointer-events-auto flex flex-col overflow-hidden"
        style={{ y, height: containerH, borderTopLeftRadius: borderRadius, borderTopRightRadius: borderRadius }}
      >
        {/* Drag handle */}
        <div className="flex items-center justify-center py-2 cursor-grab active:cursor-grabbing shrink-0">
          <div className="w-10 h-1 bg-border/60 rounded-full" />
        </div>
        {/* Header */}
        {header && <div className="shrink-0">{header}</div>}
        {/* Content */}
        <div className="flex-1 overflow-y-auto overscroll-contain">{children}</div>
      </motion.div>
    </div>
  );
}
