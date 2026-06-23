import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Application } from '@splinetool/runtime';
import { Clock, MapPin } from 'lucide-react';
import { SplineScene } from '@/components/ui/splite';
import { OFFICES } from '@/data/content';
import { cn } from '@/lib/cn';
import { EASE_PREMIUM, VIEWPORT_ONCE } from '@/lib/motion';
import type { Office } from '@/types';

/**
 * "Our Offices" — full-width interactive 3D earth with the office cities
 * floating above it. Each city chip reveals its full address on hover / focus.
 * The 3D scene only mounts as the section nears the viewport.
 */

/** Each office's IANA time zone — drives the live local clocks. */
const OFFICE_TZ: Record<string, string> = {
  'Melbourne, Australia': 'Australia/Melbourne',
  Sydney: 'Australia/Sydney',
  Brisbane: 'Australia/Brisbane',
  Adelaide: 'Australia/Adelaide',
  Perth: 'Australia/Perth',
};

/** Live HH:MM clock for a given time zone, refreshed each half-minute. */
function useLocalTime(timeZone: string | undefined): string {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000 * 30);
    return () => window.clearInterval(id);
  }, []);
  if (!timeZone) return '';
  try {
    return new Intl.DateTimeFormat('en-AU', {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(now);
  } catch {
    return '';
  }
}

/** A floating office label over the 3D scene — city, HQ badge, live clock.
 *  Hover or focus reveals a popup with the office's full address. */
function OfficeChip({ office }: { office: Office }) {
  const time = useLocalTime(OFFICE_TZ[office.city]);
  const city = office.city.split(',')[0];
  return (
    <div className="group relative">
      <div
        tabIndex={0}
        role="button"
        aria-label={office.address ? `${city} office — ${office.address}` : `${city} office`}
        className={cn(
          'inline-flex cursor-default items-center gap-2 whitespace-nowrap rounded-full border px-3.5 py-2 shadow-glass outline-none backdrop-blur-md transition-transform duration-300 ease-premium hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-emerald-300',
          office.primary ? 'border-emerald-200 bg-white/85' : 'border-white/60 bg-white/70',
        )}
      >
        <MapPin className="h-3.5 w-3.5 shrink-0 text-emerald-600" aria-hidden="true" />
        <span className="text-sm font-bold text-navy-900">{city}</span>
        {office.primary && (
          <span className="rounded-full bg-emerald-500 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em] text-white">
            HQ
          </span>
        )}
        {time && (
          <span className="inline-flex items-center gap-1 text-xs font-semibold tabular-nums text-navy-500">
            <Clock className="h-3 w-3 text-navy-300" aria-hidden="true" />
            {time}
          </span>
        )}
      </div>

      {/* Full-address popup — reveals on hover / focus */}
      {office.address && (
        <div
          role="tooltip"
          className="pointer-events-none absolute left-1/2 top-full z-30 mt-2.5 w-[clamp(15rem,78vw,19rem)] origin-top -translate-x-1/2 translate-y-1 scale-95 opacity-0 transition-all duration-300 ease-premium group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:scale-100 group-focus-within:opacity-100"
        >
          {/* Arrow */}
          <span
            aria-hidden="true"
            className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 rounded-[2px] border-l border-t border-navy-100 bg-white"
          />
          <div className="relative rounded-2xl border border-navy-100 bg-white p-4 text-left shadow-glass">
            <div className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-emerald-600" aria-hidden="true" />
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-navy-900">
                {city}
              </span>
              {office.primary && (
                <span className="rounded-full bg-emerald-500 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em] text-white">
                  HQ
                </span>
              )}
            </div>
            <p className="mt-2 text-sm leading-relaxed text-navy-600 text-pretty">
              {office.address}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export function OurOffices() {
  const officesRef = useRef<HTMLDivElement>(null);
  // `once` so the 3D earth mounts a single time and never reloads on scroll.
  const officesInView = useInView(officesRef, { once: true, margin: '300px' });
  // Live visibility drives play / stop so the auto-rotating earth pauses its
  // render loop while off-screen — keeping the rest of the page smooth.
  const visible = useInView(officesRef, { margin: '0px 0px -10% 0px' });
  const appRef = useRef<Application | null>(null);
  const visibleRef = useRef(visible);
  visibleRef.current = visible;

  useEffect(() => {
    const app = appRef.current;
    if (!app) return;
    if (visible) app.play();
    else app.stop();
  }, [visible]);

  return (
    <section aria-label="Our offices" className="relative w-full overflow-x-clip bg-white">
      <motion.div
        ref={officesRef}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: 0.8, ease: EASE_PREMIUM }}
        className="relative w-full"
      >
        <div className="relative h-[clamp(460px,56vw,820px)] w-full">
          {/* Interactive 3D earth — renders on demand and only mounts as the
              section nears the viewport, so it doesn't tax scroll elsewhere. */}
          {officesInView && (
            <SplineScene
              scene="https://prod.spline.design/IUF9sLybH2X79si2/scene.splinecode"
              onLoad={(app) => {
                appRef.current = app;
                if (visibleRef.current) app.play();
                else app.stop();
              }}
              className="absolute inset-0 h-full w-full"
            />
          )}

          {/* Heading + cities — linear, in the space above the earth */}
          <div className="pointer-events-none absolute inset-x-0 top-7 z-10 flex flex-col items-center gap-4 px-4 sm:top-9">
            <span className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Our Offices
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {OFFICES.map((office) => (
                <div key={office.city} className="pointer-events-auto">
                  <OfficeChip office={office} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
