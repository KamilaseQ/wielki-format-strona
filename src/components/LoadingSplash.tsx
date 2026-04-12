import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export function LoadingSplash() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Check if already shown this session
    if (sessionStorage.getItem("splash-shown")) {
      setVisible(false);
      return;
    }
    const timer = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("splash-shown", "true");
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed inset-0 z-[99999] bg-background flex items-center justify-center"
        >
          <div className="flex flex-col items-center gap-6">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="w-16 h-16 rounded-2xl bg-gradient-brand flex items-center justify-center shadow-2xl shadow-primary/20"
            >
              <span className="text-primary-foreground font-heading font-black text-2xl">W</span>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="text-center"
            >
              <div className="font-heading font-bold text-lg text-foreground">
                wielkiformat<span className="text-primary">.pl</span>
              </div>
              <div className="text-xs text-muted-foreground/40 mt-1 tracking-[0.15em] uppercase font-heading">
                Reklama wielkoformatowa
              </div>
            </motion.div>

            {/* Progress bar */}
            <motion.div className="w-32 h-0.5 bg-border/20 rounded-full overflow-hidden mt-2">
              <motion.div
                className="h-full bg-gradient-brand rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
