import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const SPLASH_VIDEO_URL = '/splash-clean.mp4';
/** Safety net: dismiss even if the video never fires `ended` (e.g. autoplay blocked). */
const MAX_SPLASH_MS = 13000;

interface SplashScreenProps {
  /** Fired the moment the splash starts dismissing — use it to reveal the site. */
  onComplete?: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [visible, setVisible] = useState(true);
  const doneRef = useRef(false);

  const dismiss = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    setVisible(false);
    onComplete?.();
  }, [onComplete]);

  // Fallback only — the video's `onEnded` is the primary trigger.
  useEffect(() => {
    const t = setTimeout(dismiss, MAX_SPLASH_MS);
    return () => clearTimeout(t);
  }, [dismiss]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-white"
        >
          {/* ── Brand splash video plays in full, then reveals the site ─────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.06 }}
            transition={{ opacity: { duration: 0.5, ease: 'easeOut' }, scale: { duration: 0.6, ease: 'easeOut' } }}
            className="relative z-10 w-[clamp(200px,42vw,520px)]"
            style={{ willChange: 'transform, opacity' }}
          >
            <video
              src={SPLASH_VIDEO_URL}
              autoPlay
              muted
              playsInline
              preload="auto"
              aria-label="Eloma Group"
              onEnded={dismiss}
              onError={dismiss}
              className="h-auto w-full object-contain"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
