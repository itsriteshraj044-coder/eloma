import { useEffect } from 'react';
import Lenis from 'lenis';

/** Pixels to leave below the fixed navbar when jumping to an anchor. */
const NAV_OFFSET = -88;

/**
 * Initialises Lenis for buttery-smooth, inertia-based scrolling.
 * Uses lerp (exponential decay) instead of fixed duration so the
 * animation naturally scales with monitor refresh rate (60 / 90 / 120 Hz).
 */
export function useSmoothScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      lerp: 0.11,          // exponential decay — lower = silkier, higher = snappier
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.6,
      infinite: false,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Smooth in-page anchor navigation with a fixed-navbar offset
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement)?.closest?.('a[href^="#"]') as
        | HTMLAnchorElement
        | null;
      if (!anchor) return;
      const hash = anchor.getAttribute('href');
      if (!hash || hash === '#') return;
      const target = document.querySelector(hash);
      if (!target) {
        // The section lives on the homepage but we're on another route
        // (e.g. /about-us). Hand off to the browser: load home at the anchor.
        if (window.location.pathname !== '/') {
          e.preventDefault();
          window.location.href = `/${hash}`;
        }
        return;
      }
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: NAV_OFFSET });
      history.replaceState(null, '', hash);
    };

    document.addEventListener('click', onClick);

    // Landed on a deep link like "/#contact" (e.g. Contact Us clicked from
    // another route). The native jump misfires while the splash overlay is up
    // and Lenis owns the scroll, so re-run it ourselves once the DOM is ready.
    if (window.location.hash && window.location.hash !== '#') {
      const hash = window.location.hash;
      const t = setTimeout(() => {
        const target = document.querySelector(hash);
        if (target) lenis.scrollTo(target as HTMLElement, { offset: NAV_OFFSET, immediate: true });
      }, 200);
      // ensure the timer is cleared on unmount
      return () => {
        clearTimeout(t);
        document.removeEventListener('click', onClick);
        cancelAnimationFrame(rafId);
        lenis.destroy();
      };
    }

    return () => {
      document.removeEventListener('click', onClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
}
