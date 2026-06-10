import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export function SplashScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 5000);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
        >
          {/* Icon */}
          <motion.img
            src="/FinalElomaGroupiconwhite.jpg"
            alt="Eloma Group"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{
              scale: [0.6, 1.05, 1],
              opacity: 1,
              y: [0, -8, 0],
            }}
            exit={{ scale: 1.1, opacity: 0 }}
            transition={{
              scale: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.5 },
              y: { duration: 1.8, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse', delay: 0.7 },
            }}
            className="relative h-28 w-28 rounded-2xl object-contain shadow-lg 3xl:h-44 3xl:w-44 3xl:rounded-3xl 4xl:h-56 4xl:w-56 5xl:h-72 5xl:w-72"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
