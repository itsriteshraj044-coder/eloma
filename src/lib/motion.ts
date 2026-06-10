import type { Variants } from 'framer-motion';

/** Premium easing curve used across the site (matches Tailwind `ease-premium`). */
export const EASE_PREMIUM: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Fade up — the workhorse reveal. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_PREMIUM },
  },
};

/** Simple fade. */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: EASE_PREMIUM } },
};

/** Scale-in for cards and media. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_PREMIUM },
  },
};

/** Parent that staggers its children. */
export const staggerParent = (stagger = 0.1, delayChildren = 0.05): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

/** Shared viewport config for scroll reveals. */
export const VIEWPORT_ONCE = { once: true, amount: 0.25 } as const;
