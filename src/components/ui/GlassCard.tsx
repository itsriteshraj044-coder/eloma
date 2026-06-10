import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/cn';

interface GlassCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  /** Adds the signature hover-lift (translateY(-8px)). */
  interactive?: boolean;
  theme?: 'light' | 'dark';
  className?: string;
}

/**
 * Premium card surface: 24px radius, soft shadow, subtle border, optional
 * hover-lift. The base for every card on the page so styling stays DRY.
 */
export function GlassCard({
  children,
  interactive = true,
  theme = 'light',
  className,
  ...rest
}: GlassCardProps) {
  const isDark = theme === 'dark';
  return (
    <motion.div
      whileHover={interactive ? { y: -8 } : undefined}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'relative rounded-3xl p-6 transition-shadow duration-300 ease-premium sm:p-8 3xl:rounded-[2rem] 3xl:p-10 4xl:rounded-[2.5rem] 4xl:p-12',
        isDark
          ? 'border border-white/10 bg-white/[0.06] shadow-glass-lg backdrop-blur-xl'
          : 'border border-navy-100 bg-white shadow-glass',
        interactive && (isDark ? 'hover:border-emerald-400/30' : 'hover:shadow-glass-lg hover:border-emerald-200'),
        className,
      )}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
