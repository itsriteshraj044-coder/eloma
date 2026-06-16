import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const LOGO_URL = '/Eloma Group Logo-01.png';

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
          {/* ── Logo reveal: the wordmark is "drawn" left→right. A white cover
                 retracts to the right, uncovering the single (un-sliced) logo, with
                 a glowing emerald edge riding the frontier like a pen. After the
                 draw completes, the whole logo gently floats. ──────────────── */}
          <motion.div
            initial={reduced ? { opacity: 0 } : { opacity: 0 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, y: [0, -8, 0] }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 1.06 }}
            transition={{
              opacity: { duration: 0.5, ease: 'easeOut' },
              y: reduced ? undefined : { duration: 2.6, ease: 'easeInOut', repeat: Infinity, delay: 2.1 },
            }}
            className="relative z-10 w-[clamp(170px,32vw,380px)]"
            style={{ willChange: 'transform, opacity' }}
          >
            <div className="relative aspect-[2000/780] w-full overflow-hidden">
              <img
                src={LOGO_URL}
                alt="Eloma Group"
                width={2000}
                height={780}
                decoding="async"
                className="absolute inset-0 h-full w-full object-contain"
              />

              {!reduced && (
                /* White cover that slides right to reveal the logo left→right */
                <motion.div
                  aria-hidden="true"
                  className="absolute inset-0 bg-white"
                  initial={{ x: '0%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 1.7, ease: [0.65, 0, 0.35, 1], delay: 0.35 }}
                  style={{ willChange: 'transform' }}
                >
                  {/* Glowing emerald drawing-edge at the cover's left boundary */}
                  <span className="absolute inset-y-0 left-0 w-[3px] bg-emerald-400 shadow-[0_0_14px_3px_rgba(52,185,140,0.8)]" />
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* ── Loader: a sleek spinning ring ──────────────────────────────── */}
          {!reduced && (
            <motion.div
              className="relative z-10 h-7 w-7 rounded-full border-2 border-emerald-100 border-t-emerald-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, rotate: 360 }}
              transition={{
                opacity: { duration: 0.5, ease: 'easeOut', delay: 0.4 },
                rotate: { duration: 0.9, ease: 'linear', repeat: Infinity },
              }}
              style={{ willChange: 'transform' }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
