import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'glass';
type Size = 'sm' | 'md' | 'lg';

/** Native button attrs minus the handlers whose signatures clash with Framer Motion. */
type SafeButtonAttributes = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  | 'children'
  | 'onDrag'
  | 'onDragStart'
  | 'onDragEnd'
  | 'onDragEnter'
  | 'onDragLeave'
  | 'onDragOver'
  | 'onDrop'
  | 'onAnimationStart'
  | 'onAnimationEnd'
  | 'onAnimationIteration'
>;

interface ButtonProps extends SafeButtonAttributes {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  /** Render as an anchor instead of a button. */
  href?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  className?: string;
}

const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 ease-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60';

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-7 py-3.5 text-base',
};

const variants: Record<Variant, string> = {
  primary:
    'bg-emerald-400 text-navy-900 shadow-glow-emerald hover:bg-emerald-300 hover:shadow-[0_16px_48px_-8px_rgba(60,185,140,0.5)] active:scale-[0.98]',
  secondary:
    'bg-navy-800 text-white shadow-premium hover:bg-navy-700 active:scale-[0.98]',
  ghost:
    'text-navy-800 hover:bg-navy-50 active:scale-[0.98]',
  glass:
    'glass text-navy-900 shadow-glass hover:bg-white/85 active:scale-[0.98] ring-offset-transparent',
};

/**
 * Polymorphic, animated button. Renders an `<a>` when `href` is provided,
 * otherwise a `<button>`. Includes a subtle press/lift micro-interaction.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', children, href, iconLeft, iconRight, className, ...rest },
  ref,
) {
  const classes = cn(base, sizes[size], variants[variant], className);
  const content = (
    <>
      {iconLeft}
      <span>{children}</span>
      {iconRight}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        whileTap={{ scale: 0.98 }}
        className={classes}
        {...(rest as object)}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button ref={ref} whileTap={{ scale: 0.98 }} className={classes} {...rest}>
      {content}
    </motion.button>
  );
});
