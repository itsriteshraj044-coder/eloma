import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AppRoutes } from '@/routes/AppRoutes';
import { SplashScreen } from '@/components/ui/SplashScreen';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

/** Root layout: persistent navbar + routed content + footer. */
export default function App() {
  useSmoothScroll();
  const [splashDone, setSplashDone] = useState(false);

  return (
    <>
      <SplashScreen onComplete={() => setSplashDone(true)} />

      {/* overflow-x-clip (not -hidden): prevents horizontal scroll WITHOUT turning
          this wrapper into a scroll container — keeps position:sticky working.
          Reveal uses opacity only: no transform is left on this ancestor (a leftover
          transform would break position:sticky), and the element type never changes
          (so children never remount / re-flash). */}
      <motion.div
        className="relative flex min-h-screen flex-col overflow-x-clip"
        initial={{ opacity: 0 }}
        animate={{ opacity: splashDone ? 1 : 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      >
        <Navbar />
        <AppRoutes />
        <Footer />
      </motion.div>
    </>
  );
}
