import { motion, useScroll, useTransform } from "motion/react";

/**
 * Dekoracyjne kształty 3D unoszące się wokół sekcji.
 * Czyste CSS transforms — zero WebGL, minimalny koszt performance.
 */

export function HeroFloatingShapes() {
  const { scrollYProgress } = useScroll();
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y1 = useTransform(scrollYProgress, [0, 0.3], [0, -60]);
  const y2 = useTransform(scrollYProgress, [0, 0.3], [0, -30]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]" aria-hidden="true">
      {/* Czerwony sześcian 3D — lewa strona */}
      <motion.div
        className="absolute top-[22%] left-[5%] lg:left-[8%] w-12 h-12 lg:w-16 lg:h-16"
        style={{
          y: y1,
          rotateX: rotate1,
          rotateY: rotate1,
          perspective: 600,
          transformStyle: "preserve-3d",
        }}
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-full h-full relative" style={{ transformStyle: "preserve-3d" }}>
          {/* Face front */}
          <div
            className="absolute inset-0 rounded-md"
            style={{
              background: "linear-gradient(135deg, oklch(0.58 0.24 25 / 15%), oklch(0.58 0.24 25 / 5%))",
              border: "1px solid oklch(0.58 0.24 25 / 12%)",
              transform: "translateZ(8px)",
              backdropFilter: "blur(4px)",
            }}
          />
          {/* Face back */}
          <div
            className="absolute inset-0 rounded-md"
            style={{
              background: "oklch(0.58 0.24 25 / 6%)",
              border: "1px solid oklch(0.58 0.24 25 / 8%)",
              transform: "translateZ(-8px)",
            }}
          />
        </div>
      </motion.div>

      {/* Wireframe circle — prawa strona */}
      <motion.div
        className="absolute top-[30%] right-[6%] lg:right-[12%] w-20 h-20 lg:w-28 lg:h-28"
        style={{ y: y2 }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            border: "1px solid oklch(0.58 0.24 25 / 10%)",
            boxShadow: "inset 0 0 20px oklch(0.58 0.24 25 / 3%), 0 0 30px oklch(0.58 0.24 25 / 2%)",
          }}
        />
        {/* Inner ring */}
        <div
          className="absolute top-[15%] left-[15%] right-[15%] bottom-[15%] rounded-full"
          style={{
            border: "1px dashed oklch(0.58 0.24 25 / 7%)",
          }}
        />
      </motion.div>

      {/* Diagonalna linia z gradient — lewa strona */}
      <motion.div
        className="absolute top-[45%] -left-12 w-[200px] lg:w-[300px] h-px"
        style={{
          background: "linear-gradient(90deg, transparent, oklch(0.58 0.24 25 / 12%), transparent)",
          transform: "rotate(-35deg)",
          transformOrigin: "left center",
        }}
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Mały dot z glow — lewy dół */}
      <motion.div
        className="absolute bottom-[25%] left-[15%] w-2 h-2 rounded-full"
        style={{
          background: "oklch(0.58 0.24 25 / 30%)",
          boxShadow: "0 0 12px oklch(0.58 0.24 25 / 20%), 0 0 30px oklch(0.58 0.24 25 / 10%)",
        }}
        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

export function CTAFloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Romb 3D — lewa strona */}
      <motion.div
        className="absolute top-[20%] left-[5%] lg:left-[10%] w-10 h-10 lg:w-14 lg:h-14"
        style={{ perspective: 500, transformStyle: "preserve-3d" }}
        animate={{
          y: [0, -15, 0],
          rotateX: [0, 180, 360],
          rotateZ: [45, 45, 45],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="w-full h-full rounded-sm"
          style={{
            background: "linear-gradient(135deg, oklch(0.58 0.24 25 / 10%), oklch(0.65 0.22 30 / 5%))",
            border: "1px solid oklch(0.58 0.24 25 / 15%)",
            transform: "rotate(45deg)",
          }}
        />
      </motion.div>

      {/* Glow ring — prawa strona */}
      <motion.div
        className="absolute top-[30%] right-[8%] lg:right-[15%] w-16 h-16 lg:w-24 lg:h-24"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            border: "1.5px solid oklch(0.58 0.24 25 / 12%)",
            boxShadow: "0 0 40px oklch(0.58 0.24 25 / 6%), inset 0 0 20px oklch(0.58 0.24 25 / 3%)",
          }}
        />
      </motion.div>

      {/* Small floating dot - right */}
      <motion.div
        className="absolute bottom-[30%] right-[20%] w-1.5 h-1.5 rounded-full"
        style={{
          background: "oklch(0.58 0.24 25 / 25%)",
          boxShadow: "0 0 8px oklch(0.58 0.24 25 / 15%)",
        }}
        animate={{ y: [0, -8, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

export function SubpageHeroFloatingShape() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <motion.div
        className="absolute top-[20%] right-[8%] w-16 h-16 lg:w-20 lg:h-20"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 90, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{ perspective: 400, transformStyle: "preserve-3d" }}
      >
        <div
          className="w-full h-full rounded-lg"
          style={{
            background: "linear-gradient(135deg, oklch(0.58 0.24 25 / 8%), transparent)",
            border: "1px solid oklch(0.58 0.24 25 / 8%)",
            transform: "rotateX(20deg) rotateY(20deg)",
          }}
        />
      </motion.div>
    </div>
  );
}
