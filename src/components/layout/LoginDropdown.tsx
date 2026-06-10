import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, LogIn } from 'lucide-react';
import { LOGIN_OPTIONS } from '@/data/content';
import { cn } from '@/lib/cn';
import { EASE_PREMIUM } from '@/lib/motion';

interface LoginDropdownProps {
  /** Visual theme — adapts to transparent (over hero) vs. solid navbar. */
  theme?: 'light' | 'dark';
}

/**
 * Accessible Login dropdown.
 * - Glassmorphism panel with spring entrance.
 * - Keyboard support: Enter/Space/ArrowDown to open, Escape to close,
 *   Arrow keys to move between options, focus returns to trigger on close.
 * - Closes on outside click / Escape.
 */
export function LoginDropdown({ theme = 'dark' }: LoginDropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  const isDark = theme === 'dark';

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open]);

  // Focus first item when opened
  useEffect(() => {
    if (open) {
      const t = window.setTimeout(() => itemRefs.current[0]?.focus(), 60);
      return () => window.clearTimeout(t);
    }
  }, [open]);

  const close = (returnFocus = true) => {
    setOpen(false);
    if (returnFocus) triggerRef.current?.focus();
  };

  const onTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setOpen(true);
    } else if (e.key === 'Escape') {
      close();
    }
  };

  const onItemKeyDown = (e: React.KeyboardEvent, index: number) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        itemRefs.current[(index + 1) % LOGIN_OPTIONS.length]?.focus();
        break;
      case 'ArrowUp':
        e.preventDefault();
        itemRefs.current[(index - 1 + LOGIN_OPTIONS.length) % LOGIN_OPTIONS.length]?.focus();
        break;
      case 'Escape':
        close();
        break;
      case 'Tab':
        // Let focus leave naturally, but close the menu.
        setOpen(false);
        break;
      default:
        break;
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onTriggerKeyDown}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300 3xl:px-5 3xl:py-2.5 3xl:text-base 4xl:px-6 4xl:py-3 4xl:text-base',
          isDark
            ? 'text-white/90 hover:bg-white/10 hover:text-white'
            : 'text-navy-700 hover:bg-navy-50 hover:text-navy-900',
        )}
      >
        <LogIn className="h-4 w-4 3xl:h-5 3xl:w-5 4xl:h-6 4xl:w-6" aria-hidden="true" />
        Login
        <ChevronDown
          className={cn('h-4 w-4 transition-transform duration-300 3xl:h-5 3xl:w-5 4xl:h-6 4xl:w-6', open && 'rotate-180')}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            aria-label="Login options"
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.22, ease: EASE_PREMIUM }}
            className="absolute right-0 top-[calc(100%+0.65rem)] z-50 w-72 origin-top-right overflow-hidden rounded-3xl border border-white/60 bg-white/80 p-2 shadow-glass-lg backdrop-blur-2xl 3xl:w-96 3xl:rounded-[2rem] 3xl:p-3 4xl:w-[28rem] 4xl:p-4"
          >
            {/* glow accent */}
            <div className="pointer-events-none absolute -top-12 right-0 h-24 w-24 rounded-full bg-emerald-300/40 blur-3xl" />
            {LOGIN_OPTIONS.map((opt, i) => {
              const Icon = opt.icon;
              return (
                <a
                  key={opt.label}
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  href={opt.href}
                  role="menuitem"
                  onKeyDown={(e) => onItemKeyDown(e, i)}
                  onClick={() => close(false)}
                  className="group relative flex items-center gap-3 rounded-2xl px-3 py-3 transition-colors duration-200 hover:bg-emerald-50 focus-visible:bg-emerald-50"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-navy-800 text-emerald-400 transition-transform duration-300 group-hover:scale-105 3xl:h-12 3xl:w-12 3xl:rounded-2xl 4xl:h-14 4xl:w-14">
                    <Icon className="h-5 w-5 3xl:h-6 3xl:w-6 4xl:h-7 4xl:w-7" aria-hidden="true" />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-sm font-semibold text-navy-900 3xl:text-base 4xl:text-base">{opt.label}</span>
                    <span className="text-xs text-navy-500 3xl:text-sm 4xl:text-sm">{opt.description}</span>
                  </span>
                </a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
