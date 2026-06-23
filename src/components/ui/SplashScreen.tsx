import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

/** Transparent (alpha) WebM; MP4 is the fallback for browsers without VP9-alpha. */
const SPLASH_VIDEO_WEBM = '/splash-eloma.webm';
const SPLASH_VIDEO_MP4 = '/splash-eloma.mp4';
/** Fixed splash duration — the screen stays for this long, then reveals the site. */
const SPLASH_MS = 7000;

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

  // Primary trigger — keep the splash up for a fixed 7s regardless of video length.
  useEffect(() => {
    const t = setTimeout(dismiss, SPLASH_MS);
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
              autoPlay
              muted
              playsInline
              preload="auto"
              aria-label="Eloma Group"
              onError={dismiss}
              className="h-auto w-full object-contain"
            >
              <source src={SPLASH_VIDEO_WEBM} type="video/webm" />
              <source src={SPLASH_VIDEO_MP4} type="video/mp4" />
            </video>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
