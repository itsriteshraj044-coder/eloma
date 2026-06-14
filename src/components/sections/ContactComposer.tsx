import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check, CheckCircle2, ChevronDown, Loader2, Mail, Phone } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { BRAND, CONTACT, INQUIRY_TYPES, OFFICES } from '@/data/content';
import { cn } from '@/lib/cn';
import { EASE_PREMIUM, fadeUp, staggerParent, VIEWPORT_ONCE } from '@/lib/motion';
import type { InquiryType } from '@/types';

/**
 * "Contact Composer" — a conversational, fill-in-the-sentence inquiry. Instead
 * of a grid of boxes, the visitor completes one natural paragraph with inline,
 * auto-sizing fields and an inline inquiry picker — a distinctive editorial
 * composer that still captures everything a form would. White + navy + a
 * single emerald accent.
 */

const EMAIL_RE = /^\S+@\S+\.\S+$/;

/** Inline input width that grows with content (in ch units). */
const widthFor = (value: string, placeholder: string) =>
  `${Math.min(Math.max(placeholder.length, value.length) + 1, 34)}ch`;

function InlineInput({
  id,
  value,
  placeholder,
  onChange,
  type = 'text',
  invalid,
  autoComplete,
}: {
  id: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  invalid?: boolean;
  autoComplete?: string;
}) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      autoComplete={autoComplete}
      aria-label={placeholder}
      style={{ width: widthFor(value, placeholder) }}
      className={cn(
        'mx-1 inline-block max-w-full border-b-2 bg-transparent pb-0.5 text-center font-bold text-navy-900 outline-none transition-colors duration-200 placeholder:font-semibold placeholder:text-navy-300',
        invalid ? 'border-red-300' : 'border-navy-200 focus:border-emerald-400 hover:border-navy-300',
      )}
    />
  );
}

export function ContactComposer() {
  const reduceMotion = useReducedMotion();
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    inquiry: '' as InquiryType | '',
    message: '',
  });
  const [errors, setErrors] = useState<{ name?: boolean; email?: boolean }>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const primaryOffice = OFFICES.find((o) => o.primary);

  // Close the inquiry menu on outside click / Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const set = (field: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((p) => ({ ...p, [field]: e.target.value }));
    if (field === 'name' || field === 'email')
      setErrors((p) => ({ ...p, [field]: undefined }));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next = {
      name: !form.name.trim(),
      email: !form.email.trim() || !EMAIL_RE.test(form.email.trim()),
    };
    setErrors(next);
    if (next.name || next.email) return;
    setStatus('sending');
    window.setTimeout(() => setStatus('sent'), 900);
  };

  return (
    <section
      id="contact-composer"
      aria-label="Contact — composer"
      className="section-py relative overflow-hidden bg-white"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid-faint bg-grid-32 opacity-25 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black_20%,transparent_75%)]" />
      </div>

      <Container className="relative">
        <motion.div
          variants={staggerParent(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.span variants={fadeUp} className="eyebrow mx-auto w-fit">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Contact Us
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-5 text-[clamp(1.75rem,5vw,2.5rem)] font-normal normal-case leading-[1.15] text-navy-900 text-balance"
          >
            <span className="text-navy-900">Let's write the</span>{' '}
            <span className="text-emerald-500">first line together.</span>
          </motion.h2>
        </motion.div>

        <AnimatePresence mode="wait">
          {status === 'sent' ? (
            <motion.div
              key="sent"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              role="status"
              className="mx-auto mt-12 flex max-w-2xl flex-col items-center text-center"
            >
              <span className="grid h-20 w-20 place-items-center rounded-full bg-emerald-100 text-emerald-600 shadow-glow-emerald">
                <CheckCircle2 className="h-10 w-10" aria-hidden="true" />
              </span>
              <h3 className="mt-8 text-2xl font-bold text-navy-900 sm:text-3xl">
                Thank you{form.name ? `, ${form.name.split(' ')[0]}` : ''}
              </h3>
              <p className="mt-3 max-w-md text-body-fluid text-navy-500">
                Your note{form.inquiry ? ` about ${form.inquiry.toLowerCase()}` : ''} is on its way.
                Our executive team will reply within one business day.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.7, ease: EASE_PREMIUM }}
              exit={{ opacity: 0 }}
              onSubmit={onSubmit}
              noValidate
              className="mx-auto mt-12 max-w-4xl"
            >
              {/* The conversational sentence */}
              <p className="text-center text-[clamp(1.25rem,2.6vw,2rem)] font-normal leading-[1.7] text-navy-400">
                Hi Eloma — I'm
                <InlineInput
                  id="cp-name"
                  value={form.name}
                  placeholder="your name"
                  onChange={set('name')}
                  invalid={errors.name}
                  autoComplete="name"
                />
                from
                <InlineInput
                  id="cp-company"
                  value={form.company}
                  placeholder="company"
                  onChange={set('company')}
                  autoComplete="organization"
                />
                . I'd like to discuss
                {/* Inline inquiry picker */}
                <span ref={menuRef} className="relative mx-1 inline-block align-baseline">
                  <button
                    type="button"
                    onClick={() => setMenuOpen((o) => !o)}
                    aria-haspopup="listbox"
                    aria-expanded={menuOpen}
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-full border-b-2 border-dashed px-1 pb-0.5 font-bold outline-none transition-colors duration-200',
                      form.inquiry
                        ? 'border-emerald-400 text-emerald-600'
                        : 'border-navy-200 text-navy-500 hover:border-navy-300',
                    )}
                  >
                    {form.inquiry || 'a topic'}
                    <ChevronDown
                      className={cn('h-4 w-4 transition-transform duration-200', menuOpen && 'rotate-180')}
                      aria-hidden="true"
                    />
                  </button>
                  <AnimatePresence>
                    {menuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: reduceMotion ? 0 : 8, scale: reduceMotion ? 1 : 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: reduceMotion ? 0 : 8, scale: reduceMotion ? 1 : 0.97 }}
                        transition={{ duration: 0.2, ease: EASE_PREMIUM }}
                        role="listbox"
                        className="absolute left-1/2 top-[calc(100%+0.6rem)] z-20 w-60 -translate-x-1/2 overflow-hidden rounded-2xl border border-navy-100 bg-white p-1.5 text-left text-base shadow-glass-lg"
                      >
                        {INQUIRY_TYPES.map((type) => {
                          const active = form.inquiry === type;
                          return (
                            <button
                              key={type}
                              type="button"
                              role="option"
                              aria-selected={active}
                              onClick={() => {
                                setForm((p) => ({ ...p, inquiry: type }));
                                setMenuOpen(false);
                              }}
                              className={cn(
                                'flex w-full min-h-[44px] cursor-pointer items-center justify-between gap-3 rounded-xl px-3.5 py-2 font-semibold transition-colors duration-150',
                                active
                                  ? 'bg-emerald-50 text-emerald-700'
                                  : 'text-navy-600 hover:bg-navy-50',
                              )}
                            >
                              {type}
                              {active && <Check className="h-4 w-4 shrink-0" aria-hidden="true" />}
                            </button>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </span>
                . You can reach me at
                <InlineInput
                  id="cp-email"
                  type="email"
                  value={form.email}
                  placeholder="email address"
                  onChange={set('email')}
                  invalid={errors.email}
                  autoComplete="email"
                />
                .
              </p>

              {(errors.name || errors.email) && (
                <p role="alert" className="mt-4 text-center text-sm font-medium text-red-600">
                  Please add your{errors.name ? ' name' : ''}
                  {errors.name && errors.email ? ' and a' : ''}
                  {errors.email ? ' valid email' : ''} so we can reply.
                </p>
              )}

              {/* Optional note */}
              <div className="mx-auto mt-10 max-w-2xl">
                <textarea
                  aria-label="Anything else"
                  rows={3}
                  value={form.message}
                  onChange={set('message')}
                  placeholder="Anything else you'd like us to know? (optional)"
                  className="w-full resize-none rounded-2xl border border-navy-100 bg-navy-50/40 px-5 py-4 text-base leading-relaxed text-navy-900 outline-none transition-all duration-200 placeholder:text-navy-300 hover:bg-navy-50 focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-400/25"
                />
              </div>

              {/* Submit + trust */}
              <div className="mx-auto mt-8 flex max-w-2xl flex-col items-center gap-5">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="group inline-flex min-h-[56px] cursor-pointer items-center justify-center gap-2.5 rounded-full bg-emerald-400 px-10 py-4 text-base font-semibold text-navy-900 shadow-glow-emerald transition-all duration-300 ease-premium hover:bg-emerald-300 hover:shadow-[0_18px_50px_-8px_rgba(60,185,140,0.55)] active:scale-[0.99] disabled:cursor-wait disabled:opacity-70"
                >
                  {status === 'sending' ? (
                    <>
                      Sending
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    </>
                  ) : (
                    <>
                      Send my message
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </>
                  )}
                </button>
                <p className="text-center text-xs leading-relaxed text-navy-400">{CONTACT.consent}</p>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Direct lines */}
        {primaryOffice && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-navy-100 pt-8 text-sm"
          >
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-navy-400">
              Prefer to reach out directly
            </span>
            <a
              href={`tel:${primaryOffice.phone?.replace(/\s/g, '')}`}
              className="inline-flex items-center gap-2 font-semibold text-navy-700 transition-colors duration-200 hover:text-emerald-600"
            >
              <Phone className="h-4 w-4 text-emerald-500" aria-hidden="true" />
              {primaryOffice.phone}
            </a>
            <a
              href={`mailto:${BRAND.email}`}
              className="inline-flex items-center gap-2 font-semibold text-navy-700 transition-colors duration-200 hover:text-emerald-600"
            >
              <Mail className="h-4 w-4 text-emerald-500" aria-hidden="true" />
              {BRAND.email}
            </a>
          </motion.div>
        )}
      </Container>
    </section>
  );
}
