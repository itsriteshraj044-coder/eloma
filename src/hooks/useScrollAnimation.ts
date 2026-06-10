import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { VIEWPORT_ONCE } from '@/lib/motion';

interface ScrollAnimationOptions {
  /** Trigger only the first time the element enters the viewport. */
  once?: boolean;
  /** 0–1 portion of the element that must be visible to trigger. */
  amount?: number;
  /** Root margin string, e.g. "-80px". */
  margin?: string;
}

/**
 * Reusable scroll-reveal hook built on Framer Motion's `useInView`.
 * Returns a ref to attach and a boolean `inView` flag for driving variants.
 *
 * @example
 * const { ref, inView } = useScrollAnimation();
 * <motion.div ref={ref} animate={inView ? 'visible' : 'hidden'} />
 */
export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  options: ScrollAnimationOptions = {},
) {
  const ref = useRef<T>(null);
  const inView = useInView(ref, {
    once: options.once ?? VIEWPORT_ONCE.once,
    amount: options.amount ?? VIEWPORT_ONCE.amount,
    margin: options.margin as never,
  });

  return { ref, inView };
}
