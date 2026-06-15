import { useEffect, useRef, useState } from 'react';
import type { AnchorHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ChevronDown, Menu, Phone, X } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { BRAND, NAV_ITEMS } from '@/data/content';
import { cn } from '@/lib/cn';
import { EASE_PREMIUM } from '@/lib/motion';
import type { MegaMenu } from '@/types';

/* ── Shared padding — nav bar + mega-menu panel stay in sync ─────────────── */
const NAV_PX = 'px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 3xl:px-20 4xl:px-24';

/* ── Smart link — SPA <Link> for internal routes ("/about-us"), plain <a> for
   in-page hash anchors ("#about") so the global Lenis smooth-scroll handler
   still owns them. ─────────────────────────────────────────────────────── */
type SmartLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
function SmartLink({ href, children, ...rest }: SmartLinkProps) {
  const isRoute = href.startsWith('/') && !href.startsWith('//');
  if (isRoute) {
    return (
      <Link to={href} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
}

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
              <span className="text-[10px] font-extrabold uppercase tracking-[2px] text-navy-400">
                {menu.eyebrow}
              </span>
            </div>

            <h2 className="text-[clamp(18px,1.6vw,24px)] font-extrabold normal-case leading-snug text-navy-900 text-balance">
              {menu.heading}
            </h2>

            <p className="mt-2.5 text-[13.5px] font-normal leading-[1.75] text-navy-500">
              {menu.description}
            </p>

            <SmartLink
              href={menu.cta.href}
              className="mt-5 inline-flex w-fit items-center rounded-full bg-navy-900 px-4 py-2 text-[13px] font-bold text-white transition-colors duration-200 hover:bg-navy-700"
            >
              {menu.cta.label}
            </SmartLink>
          </div>

          {/* Right: link columns */}
          <div className="flex flex-1 gap-6 pl-8 xl:pl-10">
            {menu.linkGroups.map((group, gi) => (
              <div key={gi} className="min-w-[160px] flex-1">
                {group.heading && (
                  <p className="mb-2.5 text-[10px] font-extrabold uppercase tracking-[1.5px] text-emerald-600">
                    {group.heading}
                  </p>
                )}
                <ul>
                  {group.links.map((link) => (
                    <li key={link.label} className="border-b border-navy-100 last:border-0">
                      <SmartLink
                        href={link.href}
                        className="block py-2.5 text-[14.5px] font-medium text-navy-700 transition-colors duration-150 hover:text-emerald-600"
                      >
                        {link.label}
                      </SmartLink>
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

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (latest) => setScrolled(latest > 24));

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
    <header className="fixed inset-x-0 top-0 z-50 font-jakarta">
      <motion.nav
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: EASE_PREMIUM }}
        aria-label="Primary"
        className={cn(
          'border-b border-navy-100/60 bg-white shadow-glass transition-shadow duration-500 ease-premium',
          !solid && 'shadow-none',
        )}
      >
        {/* ── Nav bar row ────────────────────────────────────────────── */}
        <div className={cn(
          'flex h-14 w-full items-center justify-between gap-6 lg:h-16',
          NAV_PX,
        )}>

          {/* Logo */}
          <Link to="/" aria-label="Eloma Group — home" className="shrink-0">
            <Logo />
          </Link>

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
                  <SmartLink
                    href={item.href}
                    aria-current={isActive ? 'true' : undefined}
                    aria-expanded={hasMenu ? menuOpen : undefined}
                    aria-haspopup={hasMenu ? 'true' : undefined}
                    className={cn(
                      'relative inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[clamp(12.5px,0.85vw,14px)] leading-[1.5rem] font-semibold text-navy-500 transition-colors duration-200 hover:text-navy-900',
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
                  </SmartLink>
                </li>
              );
            })}
          </ul>

          {/* ── Right actions ───────────────────────────────────────── */}
          <div className="hidden items-center gap-2 lg:flex">
            <a
              href={`tel:${BRAND.phonePrimary.replace(/\s/g, '')}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-navy-900 bg-navy-900 px-4 py-2 text-[13px] font-bold text-white transition-all duration-300 ease-premium hover:bg-navy-700 active:scale-[0.98]"
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
            className="grid h-11 w-11 place-items-center rounded-lg text-navy-900 transition-colors hover:bg-navy-50 lg:hidden"
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
                          className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-[16px] leading-[1.5rem] font-bold text-navy-700 transition-colors hover:bg-navy-50 hover:text-navy-900"
                        >
                          {item.label}
                          <ChevronDown
                            className={cn('h-4 w-4 shrink-0 transition-transform duration-300', expanded && 'rotate-180')}
                            aria-hidden="true"
                          />
                        </button>
                      ) : (
                        <SmartLink
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="block rounded-xl px-4 py-3 text-[16px] leading-[1.5rem] font-bold text-navy-700 transition-colors hover:bg-navy-50 hover:text-navy-900"
                        >
                          {item.label}
                        </SmartLink>
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
                              <p className="mb-2.5 text-[16px] font-bold text-navy-800">
                                {item.megaMenu.heading}
                              </p>
                              {item.megaMenu.linkGroups.map((group, gi) => (
                                <div key={gi} className="mb-2.5">
                                  {group.heading && (
                                    <p className="mb-1.5 text-[10.5px] font-extrabold uppercase tracking-[1.5px] text-emerald-600">
                                      {group.heading}
                                    </p>
                                  )}
                                  <ul className="flex flex-col">
                                    {group.links.map((link) => (
                                      <li key={link.label}>
                                        <SmartLink
                                          href={link.href}
                                          onClick={() => setMobileOpen(false)}
                                          className="block rounded-lg px-3 py-2 text-[14px] leading-[1.5rem] font-medium text-navy-600 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
                                        >
                                          {link.label}
                                        </SmartLink>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                              <SmartLink
                                href={item.megaMenu.cta.href}
                                onClick={() => setMobileOpen(false)}
                                className="mt-1.5 inline-flex items-center rounded-full bg-navy-900 px-4 py-1.5 text-[13px] font-bold text-white"
                              >
                                {item.megaMenu.cta.label}
                              </SmartLink>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                })}
              </ul>

              <div className="mx-3 h-px bg-navy-100" />

              <div className="p-3">
                <a
                  href={`tel:${BRAND.phonePrimary.replace(/\s/g, '')}`}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-full border border-navy-900 bg-navy-900 px-5 py-2.5 text-[15px] font-bold text-white transition-colors hover:bg-navy-700"
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
