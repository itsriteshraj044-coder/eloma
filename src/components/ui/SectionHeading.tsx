import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { fadeUp, staggerParent, VIEWPORT_ONCE } from '@/lib/motion';

interface SectionHeadingProps {
  eyebrow?: string;
  title?: ReactNode;
  description?: string;
  align?: 'left' | 'center';
  theme?: 'light' | 'dark';
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

/**
 * Standardized section header: eyebrow chip → title → description.
 * Drives a staggered reveal and keeps typographic rhythm consistent.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  theme = 'light',
  className,
  titleClassName,
  descriptionClassName,
}: SectionHeadingProps) {
  const isDark = theme === 'dark';
  return (
    <motion.div
      variants={staggerParent(0.12)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      className={cn(
        'flex w-full flex-col gap-4 sm:gap-5 3xl:gap-6 4xl:gap-8',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      {eyebrow && (
        <motion.span variants={fadeUp} className={isDark ? 'eyebrow-dark' : 'eyebrow'}>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 3xl:h-2 3xl:w-2 4xl:h-2.5 4xl:w-2.5" />
          {eyebrow}
        </motion.span>
      )}
      {title && (
        <motion.h2
          variants={fadeUp}
          className={cn(
            'text-section-h2 uppercase text-balance',
            isDark ? 'text-white' : 'text-navy-900',
            titleClassName,
          )}
        >
          {title}
        </motion.h2>
      )}
      {description && (
        <motion.p
          variants={fadeUp}
          className={cn(
            'text-body-fluid text-pretty',
            align === 'center' ? 'max-w-3xl' : 'w-full',
            isDark ? 'text-navy-100/80' : 'text-navy-500',
            descriptionClassName,
          )}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
