import { useState } from 'react';
import type { FormEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { CheckCircle2, Loader2, Mail, MapPin, Phone, Send } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { BRAND, CONTACT, OFFICES } from '@/data/content';
import { cn } from '@/lib/cn';
import { EASE_PREMIUM, fadeUp, staggerParent, VIEWPORT_ONCE } from '@/lib/motion';

/**
 * "Contact Canvas" — a presence-led split: an interactive stylised map of the
 * Australian offices on the left (pins are selectable and surface each city's
 * details) paired with a clean message form on the right. Reinforces real
 * global infrastructure — the trust cue premium corporate sites lead with.
 * White + navy + a single emerald accent.
 */

/** Approximate pin positions (% within the map panel) per city. */
const PIN_POS: Record<string, { x: number; y: number }> = {
  'Melbourne, Australia': { x: 62, y: 82 },
  Sydney: { x: 74, y: 62 },
  Brisbane: { x: 71, y: 40 },
  Adelaide: { x: 50, y: 66 },
  Perth: { x: 16, y: 58 },
};

const EMAIL_RE = /^\S+@\S+\.\S+$/;

const inputClasses =
  'w-full rounded-2xl border border-transparent bg-navy-50/60 px-5 py-3.5 text-base text-navy-900 outline-none transition-all duration-200 placeholder:text-navy-300 hover:bg-navy-50 focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-400/25';

export function ContactCanvas() {
  const reduceMotion = useReducedMotion();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [activeCity, setActiveCity] = useState(
    OFFICES.find((o) => o.primary)?.city ?? OFFICES[0].city,
  );

  const activeOffice = OFFICES.find((o) => o.city === activeCity) ?? OFFICES[0];

  const update = (field: 'name' | 'email' | 'message') => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((p) => ({ ...p, [field]: e.target.value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: undefined }));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next = {
      name: form.name.trim() ? undefined : 'Please enter your name.',
      email: !form.email.trim()
        ? 'Please enter your email.'
        : EMAIL_RE.test(form.email.trim())
          ? undefined
          : 'Enter a valid email.',
      message: form.message.trim() ? undefined : 'Please add a short message.',
    };
    setErrors(next);
    if (next.name || next.email || next.message) return;
    setStatus('sending');
    window.setTimeout(() => setStatus('sent'), 900);
  };

  return (
    <section
      id="contact-canvas"
      aria-label="Contact — presence canvas"
      className="section-py relative overflow-hidden bg-white"
    >
      <Container className="relative">
        <SectionHeading
          eyebrow="Contact Us"
          title={
            <>
              <span className="text-navy">Find us across</span>{' '}
              <span className="text-emerald">Australia</span>
            </>
          }
          titleClassName="normal-case !font-normal"
          description="Five offices, one connected group. Choose a location or send us a message — we'll route it to the nearest team."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14 lg:mt-16">
          {/* ── Presence map ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.7, ease: EASE_PREMIUM }}
            className="lg:col-span-6"
          >
            <div className="relative overflow-hidden rounded-[1.75rem] border border-navy-100 bg-white/70 p-6 shadow-glass sm:p-8">
              {/* Dotted field */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-60"
                style={{
                  backgroundImage: 'radial-gradient(rgba(16,42,67,0.12) 1px, transparent 1px)',
                  backgroundSize: '18px 18px',
                  maskImage: 'radial-gradient(ellipse at center, black 55%, transparent 85%)',
                }}
              />
              {/* Map canvas */}
              <div className="relative aspect-[4/3] w-full">
                {OFFICES.map((office) => {
                  const pos = PIN_POS[office.city];
                  if (!pos) return null;
                  const isActive = office.city === activeCity;
                  return (
                    <button
                      key={office.city}
                      type="button"
                      onClick={() => setActiveCity(office.city)}
                      aria-pressed={isActive}
                      aria-label={office.city}
                      style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer outline-none"
                    >
                      {isActive && (
                        <span
                          aria-hidden="true"
                          className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-emerald-300/50 [animation-duration:2.4s]"
                        />
                      )}
                      <span
                        className={cn(
                          'will-transform relative grid place-items-center rounded-full transition-all duration-300 ease-premium',
                          isActive
                            ? 'h-7 w-7 bg-emerald-400 text-navy-900 shadow-glow-emerald'
                            : 'h-5 w-5 bg-white text-emerald-600 shadow-glass hover:scale-110',
                        )}
                      >
                        <MapPin className={cn(isActive ? 'h-4 w-4' : 'h-3 w-3')} aria-hidden="true" />
                      </span>
                      <span
                        className={cn(
                          'absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-semibold transition-colors duration-300',
                          isActive ? 'bg-emerald-50 text-emerald-700' : 'text-navy-400',
                        )}
                      >
                        {office.city.split(',')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Active office detail */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeOffice.city}
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
                  transition={{ duration: 0.35, ease: EASE_PREMIUM }}
                  className="relative mt-4 rounded-2xl border border-navy-100 bg-white/90 p-5"
                >
                  <p className="flex items-center gap-2 text-sm font-bold text-navy-900">
                    {activeOffice.city}
                    {activeOffice.primary && (
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-600">
                        HQ
                      </span>
                    )}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-navy-500">
                    {activeOffice.address ?? 'Regional office — Australia'}
                  </p>
                  {(activeOffice.phone || activeOffice.primary) && (
                    <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                      <a
                        href={`tel:${(activeOffice.phone ?? BRAND.phonePrimary).replace(/\s/g, '')}`}
                        className="inline-flex items-center gap-2 font-semibold text-navy-700 transition-colors duration-200 hover:text-emerald-600"
                      >
                        <Phone className="h-4 w-4 text-emerald-500" aria-hidden="true" />
                        {activeOffice.phone ?? BRAND.phonePrimary}
                      </a>
                      <a
                        href={`mailto:${activeOffice.email ?? BRAND.email}`}
                        className="inline-flex items-center gap-2 font-semibold text-navy-700 transition-colors duration-200 hover:text-emerald-600"
                      >
                        <Mail className="h-4 w-4 text-emerald-500" aria-hidden="true" />
                        {activeOffice.email ?? BRAND.email}
                      </a>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* ── Form ── */}
          <motion.div
            variants={staggerParent(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            className="lg:col-span-6 lg:self-center"
          >
            {status === 'sent' ? (
              <div role="status" className="flex flex-col items-start py-6">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-600 shadow-glow-emerald">
                  <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-2xl font-bold text-navy-900">
                  Thank you{form.name ? `, ${form.name.split(' ')[0]}` : ''}
                </h3>
                <p className="mt-2 max-w-md text-body-fluid text-navy-500">
                  Your message has been routed to our nearest team. We'll respond within one business
                  day.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                <motion.h3 variants={fadeUp} className="text-xl font-bold text-navy-900 sm:text-2xl">
                  Send a message
                </motion.h3>
                <motion.p variants={fadeUp} className="mt-2 text-body-fluid text-navy-500">
                  Prefer email? Reach us directly at{' '}
                  <a
                    href={`mailto:${BRAND.email}`}
                    className="font-semibold text-emerald-600 hover:text-emerald-700"
                  >
                    {BRAND.email}
                  </a>
                  .
                </motion.p>
                <motion.div variants={fadeUp} className="mt-7 grid gap-4 sm:grid-cols-2">
                  <div>
                    <input
                      aria-label="Your name"
                      value={form.name}
                      onChange={update('name')}
                      autoComplete="name"
                      placeholder="Your name"
                      className={inputClasses}
                    />
                    {errors.name && <p className="mt-2 text-xs font-medium text-red-600">{errors.name}</p>}
                  </div>
                  <div>
                    <input
                      type="email"
                      aria-label="Your email"
                      value={form.email}
                      onChange={update('email')}
                      autoComplete="email"
                      placeholder="Your email"
                      className={inputClasses}
                    />
                    {errors.email && <p className="mt-2 text-xs font-medium text-red-600">{errors.email}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <textarea
                      aria-label="Your message"
                      rows={5}
                      value={form.message}
                      onChange={update('message')}
                      placeholder="How can we help?"
                      className={cn(inputClasses, 'resize-none leading-relaxed')}
                    />
                    {errors.message && (
                      <p className="mt-2 text-xs font-medium text-red-600">{errors.message}</p>
                    )}
                  </div>
                </motion.div>
                <motion.div
                  variants={fadeUp}
                  className="mt-6 flex flex-wrap items-center justify-between gap-4"
                >
                  <p className="max-w-xs text-xs leading-relaxed text-navy-400">{CONTACT.consent}</p>
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="group inline-flex min-h-[52px] cursor-pointer items-center justify-center gap-2 rounded-full bg-emerald-400 px-8 py-3.5 text-base font-semibold text-navy-900 shadow-glow-emerald transition-all duration-300 ease-premium hover:bg-emerald-300 active:scale-[0.99] disabled:cursor-wait disabled:opacity-70"
                  >
                    {status === 'sending' ? (
                      <>
                        Sending
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      </>
                    ) : (
                      <>
                        {CONTACT.submitLabel}
                        <Send
                          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </>
                    )}
                  </button>
                </motion.div>
              </form>
            )}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
