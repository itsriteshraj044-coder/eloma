import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Menu, Phone, X } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { LoginDropdown } from '@/components/layout/LoginDropdown';
import { BRAND, NAV_ITEMS, LOGIN_OPTIONS } from '@/data/content';
import { cn } from '@/lib/cn';
import { EASE_PREMIUM } from '@/lib/motion';
import type { MegaMenu } from '@/types';

/* ── Shared padding — nav bar + mega-menu panel stay in sync ─────────────── */
const NAV_PX = 'px-4 sm:px-5 md:px-6 lg:px-8 xl:px-12 2xl:px-16 3xl:px-20 4xl:px-24';

/* ── Scroll spy ─────────────────────────────────────────────────────────── */
const SPY_IDS = NAV_ITEMS.map((l) => l.href.replace('#', ''));

/* ── Mega-menu panel ────────────────────────────────────────────────────── */
function MegaMenuPanel({
  menu,
  onMouseEnter,
  onMouseLeave,
}: {
  menu: MegaMenu;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const totalLinkCols = menu.linkGroups.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.16, ease: EASE_PREMIUM }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="absolute inset-x-0 top-full z-40 border-t border-navy-100 bg-white shadow-glass-lg"
    >
      <div className={cn('w-full', NAV_PX)}>
        <div className="flex gap-0 py-7 lg:py-8">

          {/* Left: description panel */}
          <div
            className={cn(
              'flex shrink-0 flex-col justify-center border-r border-navy-100 pr-8 xl:pr-10',
              totalLinkCols >= 2 ? 'w-[36%]' : 'w-[48%]',
            )}
          >
            <div className="mb-3 flex items-center gap-2">
              <span className="h-0.5 w-5 shrink-0 rounded-full bg-emerald-500" aria-hidden="true" />
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-navy-400">
                {menu.eyebrow}
              </span>
            </div>

            <h2 className="text-xl font-bold leading-snug text-navy-900 text-balance xl:text-2xl">
              {menu.heading}
            </h2>

            <p className="mt-2.5 text-sm leading-relaxed text-navy-500">
              {menu.description}
            </p>

            <a
              href={menu.cta.href}
              className="mt-5 inline-flex w-fit items-center rounded-full bg-navy-900 px-4 py-2 text-[13px] font-semibold text-white transition-colors duration-200 hover:bg-navy-700"
            >
              {menu.cta.label}
            </a>
          </div>

          {/* Right: link columns */}
          <div className="flex flex-1 gap-6 pl-8 xl:pl-10">
            {menu.linkGroups.map((group, gi) => (
              <div key={gi} className="min-w-[160px] flex-1">
                {group.heading && (
                  <p className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.22em] text-navy-300">
                    {group.heading}
                  </p>
                )}
                <ul>
                  {group.links.map((link) => (
                    <li key={link.label} className="border-b border-navy-100 last:border-0">
                      <a
                        href={link.href}
                        className="block py-2.5 text-[14px] font-medium text-navy-700 transition-colors duration-150 hover:text-emerald-600"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </div>
    </motion.div>
  );
}

/* ── Navbar ─────────────────────────────────────────────────────────────── */
export function Navbar() {
  const [scrolled, setScrolled]             = useState(false);
  const [mobileOpen, setMobileOpen]         = useState(false);
  const [activeMenu, setActiveMenu]         = useState<string | null>(null);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const [activeId, setActiveId]             = useState<string>('');
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveId(e.target.id); }),
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );
    SPY_IDS.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setActiveMenu(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const openMenu = (label: string) => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setActiveMenu(label);
  };
  const scheduleClose = () => {
    closeTimerRef.current = setTimeout(() => setActiveMenu(null), 120);
  };
  const cancelClose = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
  };

  const solid = scrolled || mobileOpen;
  const activeItem = NAV_ITEMS.find((i) => i.label === activeMenu && i.megaMenu);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.nav
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: EASE_PREMIUM }}
        aria-label="Primary"
        className={cn(
          'transition-[border-color,background-color,box-shadow] duration-500 ease-premium',
          solid
            ? 'border-b border-navy-100/60 bg-white/92 shadow-glass backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        {/* ── Nav bar row ────────────────────────────────────────────── */}
        <div className={cn(
          'flex h-14 w-full items-center justify-between gap-6 lg:h-16',
          NAV_PX,
        )}>

          {/* Logo */}
          <a href="#top" aria-label="Eloma Group — home" className="shrink-0">
            <Logo />
          </a>

          {/* ── Desktop nav links ───────────────────────────────────── */}
          <ul className="hidden items-center lg:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = activeId === item.href.replace('#', '');
              const hasMenu  = !!item.megaMenu;
              const menuOpen = activeMenu === item.label;

              return (
                <li
                  key={item.href}
                  onMouseEnter={() => hasMenu ? openMenu(item.label) : setActiveMenu(null)}
                  onMouseLeave={hasMenu ? scheduleClose : undefined}
                >
                  <a
                    href={item.href}
                    aria-current={isActive ? 'true' : undefined}
                    aria-expanded={hasMenu ? menuOpen : undefined}
                    aria-haspopup={hasMenu ? 'true' : undefined}
                    className={cn(
                      'relative inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[14px] xl:text-[15px] 2xl:text-base font-medium text-navy-500 transition-colors duration-200 hover:text-navy-900',
                      (isActive || menuOpen) && 'text-navy-900',
                    )}
                  >
                    {item.label}
                    {hasMenu && (
                      <ChevronDown
                        className={cn(
                          'h-3.5 w-3.5 shrink-0 transition-transform duration-300',
                          menuOpen && 'rotate-180',
                        )}
                        aria-hidden="true"
                      />
                    )}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-emerald-500"
                        transition={{ duration: 0.35, ease: EASE_PREMIUM }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* ── Right actions ───────────────────────────────────────── */}
          <div className="hidden items-center gap-2 lg:flex">
            <LoginDropdown theme="light" />
            <a
              href={`tel:${BRAND.phonePrimary.replace(/\s/g, '')}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-navy-900 shadow-glow-emerald transition-all duration-300 ease-premium hover:bg-emerald-300 active:scale-[0.98]"
            >
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              {BRAND.phonePrimary}
            </a>
          </div>

          {/* ── Mobile hamburger ────────────────────────────────────── */}
          <button
            type="button"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-lg text-navy-900 transition-colors hover:bg-navy-50 lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </motion.nav>

      {/* ── Desktop mega-menu (lg+) ───────────────────────────────────── */}
      <div className="hidden lg:block">
        <AnimatePresence>
          {activeItem?.megaMenu && (
            <MegaMenuPanel
              key={activeItem.label}
              menu={activeItem.megaMenu}
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}
            />
          )}
        </AnimatePresence>
      </div>

      {/* ── Mobile drawer ────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-14 z-40 overflow-y-auto bg-black/10 lg:hidden"
          >
            <motion.div
              initial={{ y: -12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.25, ease: EASE_PREMIUM }}
              className="mx-3 mt-2 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-glass-lg"
            >
              {/* Nav items */}
              <ul className="flex flex-col p-2">
                {NAV_ITEMS.map((item) => {
                  const hasMenu  = !!item.megaMenu;
                  const expanded = expandedMobile === item.label;

                  return (
                    <li key={item.href}>
                      {hasMenu ? (
                        <button
                          type="button"
                          onClick={() => setExpandedMobile(expanded ? null : item.label)}
                          className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-[15px] font-medium text-navy-700 transition-colors hover:bg-navy-50 hover:text-navy-900"
                        >
                          {item.label}
                          <ChevronDown
                            className={cn('h-4 w-4 shrink-0 transition-transform duration-300', expanded && 'rotate-180')}
                            aria-hidden="true"
                          />
                        </button>
                      ) : (
                        <a
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="block rounded-xl px-4 py-3 text-[15px] font-medium text-navy-700 transition-colors hover:bg-navy-50 hover:text-navy-900"
                        >
                          {item.label}
                        </a>
                      )}

                      <AnimatePresence>
                        {hasMenu && expanded && item.megaMenu && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22, ease: EASE_PREMIUM }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 pb-3 pt-0.5">
                              <p className="mb-2.5 text-[13px] font-semibold text-navy-800">
                                {item.megaMenu.heading}
                              </p>
                              {item.megaMenu.linkGroups.map((group, gi) => (
                                <div key={gi} className="mb-2.5">
                                  {group.heading && (
                                    <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-navy-400">
                                      {group.heading}
                                    </p>
                                  )}
                                  <ul className="flex flex-col">
                                    {group.links.map((link) => (
                                      <li key={link.label}>
                                        <a
                                          href={link.href}
                                          onClick={() => setMobileOpen(false)}
                                          className="block rounded-lg px-3 py-2 text-[14px] text-navy-600 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
                                        >
                                          {link.label}
                                        </a>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                              <a
                                href={item.megaMenu.cta.href}
                                onClick={() => setMobileOpen(false)}
                                className="mt-1.5 inline-flex items-center rounded-full bg-navy-900 px-4 py-1.5 text-[13px] font-semibold text-white"
                              >
                                {item.megaMenu.cta.label}
                              </a>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                })}
              </ul>

              <div className="mx-3 h-px bg-navy-100" />

              {/* Login options */}
              <div className="p-2">
                <p className="px-3 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-navy-400">
                  Login
                </p>
                <ul className="flex flex-col">
                  {LOGIN_OPTIONS.map((opt) => {
                    const Icon = opt.icon;
                    return (
                      <li key={opt.label}>
                        <a
                          href={opt.href}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-navy-50"
                        >
                          <span className="grid h-8 w-8 place-items-center rounded-lg text-navy-700">
                            <Icon className="h-4 w-4" aria-hidden="true" />
                          </span>
                          <div>
                            <p className="text-[14px] font-medium text-navy-800">{opt.label}</p>
                            <p className="text-[11px] text-navy-400">{opt.description}</p>
                          </div>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="p-3 pt-0">
                <a
                  href={`tel:${BRAND.phonePrimary.replace(/\s/g, '')}`}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-full bg-emerald-400 px-5 py-2.5 text-[14px] font-semibold text-navy-900 shadow-glow-emerald"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {BRAND.phonePrimary}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
