import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const EASE_PREMIUM = [0.22, 1, 0.36, 1] as const;

interface SplashScreenProps {
  /** Fired the moment the splash starts dismissing — use it to reveal the site. */
  onComplete?: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [visible, setVisible] = useState(true);
  const reduced = useReducedMotion();

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      onComplete?.();
    }, 3200);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-8 overflow-hidden bg-white"
        >
          {/* ── Logo: spring scale-in, then gentle float ───────────────────── */}
          <motion.img
            src="/Eloma Group Logo-01.png"
            alt="Eloma Group"
            width={2000}
            height={780}
            decoding="async"
            initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.88, y: 18 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, scale: 1, y: [0, -8, 0] }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 1.05 }}
            transition={{
              opacity: { duration: 0.6, ease: 'easeOut' },
              scale: { duration: 0.9, ease: EASE_PREMIUM },
              y: reduced
                ? undefined
                : { duration: 2.4, ease: 'easeInOut', repeat: Infinity, delay: 0.9 },
            }}
            className="relative z-10 h-auto w-[clamp(220px,46vw,560px)] object-contain"
            style={{ willChange: 'transform' }}
          />

          {/* ── Shimmer loading bar ────────────────────────────────────────── */}
          {!reduced && (
            <div className="relative z-10 h-[4px] w-[clamp(150px,28vw,300px)] overflow-hidden rounded-full bg-emerald-100">
              {/* determinate fill that grows left→right */}
              <motion.div
                className="absolute inset-0 origin-left rounded-full bg-emerald-400"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 2.4, ease: EASE_PREMIUM, delay: 0.3 }}
                style={{ willChange: 'transform' }}
              />
              {/* bright highlight gliding across */}
              <motion.div
                className="absolute inset-y-0 w-1/3 rounded-full bg-gradient-to-r from-transparent via-white/80 to-transparent"
                animate={{ x: ['-120%', '380%'] }}
                transition={{ duration: 1.3, ease: 'easeInOut', repeat: Infinity, delay: 0.4 }}
                style={{ willChange: 'transform' }}
              />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
