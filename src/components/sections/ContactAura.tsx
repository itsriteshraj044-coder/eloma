import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Check, ChevronDown, Loader2, Search, Send } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { CONTACT, INQUIRY_TYPES } from '@/data/content';
import { COUNTRIES, flagEmoji } from '@/data/countries';
import type { Country } from '@/data/countries';
import { cn } from '@/lib/cn';
import { EASE_PREMIUM, VIEWPORT_ONCE } from '@/lib/motion';
import type { InquiryType } from '@/types';

/**
 * "Contact Aura" — an animation-forward, professional contact experience built
 * around 2026 micro-interaction trends: kinetic heading, a live completion
 * progress bar, floating labels with a sweeping focus underline, inline live
 * validation checks, and an animated SVG checkmark on success. White + navy +
 * a single emerald accent.
 */

const EMAIL_RE = /^\S+@\S+\.\S+$/;
const HEADING_WORDS = ["Let's", 'create', 'something', 'exceptional.'];

/** Floating-label field with animated focus underline + live validity check. */
function Field({
  id,
  label,
  value,
  onChange,
  onBlur,
  valid,
  error,
  type = 'text',
  autoComplete,
  textarea,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: () => void;
  valid?: boolean;
  error?: string;
  type?: string;
  autoComplete?: string;
  textarea?: boolean;
}) {
  const base = cn(
    'peer w-full rounded-t-xl border-b-2 bg-navy-50/40 px-4 pb-2 pt-6 text-base text-navy-900 outline-none transition-colors duration-200 placeholder-transparent hover:bg-navy-50/70 focus:bg-white',
    error ? 'border-red-300' : 'border-navy-200',
    textarea ? 'pr-4' : 'pr-10',
  );
  return (
    <div>
      <div className="relative">
        {textarea ? (
          <textarea
            id={id}
            rows={4}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={label}
            aria-invalid={Boolean(error)}
            className={cn(base, 'resize-none leading-relaxed')}
          />
        ) : (
          <input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            autoComplete={autoComplete}
            placeholder={label}
            aria-invalid={Boolean(error)}
            className={base}
          />
        )}
        <label
          htmlFor={id}
          className={cn(
            'pointer-events-none absolute left-4 top-2 text-xs font-semibold text-navy-400 transition-all duration-200',
            'peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:font-medium peer-placeholder-shown:text-navy-300',
            'peer-focus:top-2 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-emerald-600',
          )}
        >
          {label}
        </label>
        {/* Animated focus underline */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-emerald-400 transition-transform duration-300 ease-premium peer-focus:scale-x-100"
        />
        {/* Live validity check */}
        {!textarea && (
          <AnimatePresence>
            {valid && (
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.25, ease: EASE_PREMIUM }}
                className="absolute right-3 top-1/2 grid h-5 w-5 -translate-y-1/2 place-items-center rounded-full bg-emerald-400 text-white"
              >
                <Check className="h-3 w-3" aria-hidden="true" strokeWidth={3} />
              </motion.span>
            )}
          </AnimatePresence>
        )}
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            role="alert"
            className="mt-1.5 text-xs font-medium text-red-600"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/** International phone field with a searchable country / dial-code dropdown. */
function PhoneField({
  country,
  onCountry,
  value,
  onChange,
}: {
  country: Country;
  onCountry: (c: Country) => void;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const q = query.trim().toLowerCase();
  const filtered = q
    ? COUNTRIES.filter((c) => c.name.toLowerCase().includes(q) || c.dial.includes(q))
    : COUNTRIES;

  return (
    <div ref={ref} className="relative">
      <div className="flex items-stretch overflow-hidden rounded-t-xl border-b-2 border-navy-200 bg-navy-50/40 transition-colors duration-200 hover:bg-navy-50/70 focus-within:border-emerald-400 focus-within:bg-white">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={`Country code: ${country.name} ${country.dial}`}
          className="flex shrink-0 cursor-pointer items-center gap-2 border-r border-navy-100 px-4 text-base font-semibold text-navy-700 outline-none transition-colors duration-200 hover:bg-navy-100/40"
        >
          <span className="text-lg leading-none" aria-hidden="true">
            {flagEmoji(country.iso)}
          </span>
          <span>{country.dial}</span>
          <ChevronDown
            className={cn('h-4 w-4 text-navy-400 transition-transform duration-200', open && 'rotate-180')}
            aria-hidden="true"
          />
        </button>
        <input
          type="tel"
          value={value}
          onChange={onChange}
          autoComplete="tel"
          placeholder="Phone number"
          aria-label="Phone number"
          className="w-full bg-transparent px-4 py-3.5 text-base text-navy-900 outline-none placeholder:text-navy-300"
        />
      </div>

      {open && (
        <div
          role="listbox"
          className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-30 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-glass-lg"
        >
          <div className="border-b border-navy-100 p-2">
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-300"
                aria-hidden="true"
              />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search country or code"
                aria-label="Search country"
                className="w-full rounded-xl bg-navy-50/70 py-2.5 pl-9 pr-3 text-sm text-navy-900 outline-none placeholder:text-navy-300 focus:bg-white focus:ring-2 focus:ring-emerald-400/25"
              />
            </div>
          </div>
          <ul className="max-h-60 overflow-y-auto p-1.5">
            {filtered.map((c) => {
              const active = c.iso === country.iso;
              return (
                <li key={c.iso}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => {
                      onCountry(c);
                      setOpen(false);
                      setQuery('');
                    }}
                    className={cn(
                      'flex min-h-[44px] w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors duration-150',
                      active ? 'bg-emerald-50 text-emerald-700' : 'text-navy-600 hover:bg-navy-50',
                    )}
                  >
                    <span className="text-lg leading-none" aria-hidden="true">
                      {flagEmoji(c.iso)}
                    </span>
                    <span className="flex-1 truncate font-medium">{c.name}</span>
                    <span className="text-navy-400">{c.dial}</span>
                    {active && <Check className="h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />}
                  </button>
                </li>
              );
            })}
            {filtered.length === 0 && (
              <li className="px-3 py-6 text-center text-sm text-navy-400">No matches</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export function ContactAura() {
  const reduceMotion = useReducedMotion();
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    inquiry: '' as InquiryType | '',
    message: '',
  });
  const [touched, setTouched] = useState({ name: false, email: false, message: false });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [country, setCountry] = useState<Country>(
    () => COUNTRIES.find((c) => c.iso === 'AU') ?? COUNTRIES[0],
  );

  const nameValid = form.name.trim().length > 0;
  const emailValid = EMAIL_RE.test(form.email.trim());
  const messageValid = form.message.trim().length > 0;
  const progress = [nameValid, emailValid, messageValid].filter(Boolean).length / 3;

  const set = (field: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((p) => ({ ...p, [field]: e.target.value }));

  const touch = (field: keyof typeof touched) => () =>
    setTouched((p) => ({ ...p, [field]: true }));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (!nameValid || !emailValid || !messageValid) return;
    setStatus('sending');
    window.setTimeout(() => setStatus('sent'), 1100);
  };

  return (
    <section
      id="contact-aura"
      aria-label="Contact — aura"
      className="section-py relative overflow-hidden bg-white"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid-faint bg-grid-32 opacity-20 [mask-image:radial-gradient(ellipse_70%_55%_at_50%_25%,black_20%,transparent_75%)]" />
      </div>

      <Container className="relative">
        {/* Kinetic heading */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.5, ease: EASE_PREMIUM }}
            className="eyebrow mx-auto w-fit"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Contact Us
          </motion.span>
          <h2 className="mt-5 flex flex-wrap justify-center gap-x-[0.3em] text-[clamp(1.75rem,5vw,2.5rem)] font-normal normal-case leading-[1.15] text-navy-900">
            {HEADING_WORDS.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: 0.55, delay: i * 0.08, ease: EASE_PREMIUM }}
                className={cn('inline-block', i === HEADING_WORDS.length - 1 && 'text-emerald-500')}
              >
                {word}
              </motion.span>
            ))}
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mx-auto mt-4 max-w-xl text-body-fluid text-navy-500"
          >
            {CONTACT.description}
          </motion.p>
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.7, ease: EASE_PREMIUM }}
          className="mx-auto mt-12 max-w-2xl overflow-hidden rounded-[1.75rem] border border-navy-100 bg-white shadow-[0_40px_120px_-40px_rgba(8,33,60,0.30)] lg:mt-14"
        >
          {/* Live completion progress */}
          <div className="h-1 w-full bg-navy-100">
            <motion.div
              className="h-full origin-left bg-emerald-400"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: progress }}
              transition={{ duration: 0.4, ease: EASE_PREMIUM }}
            />
          </div>

          <div className="p-6 sm:p-9">
            <AnimatePresence mode="wait">
              {status === 'sent' ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  role="status"
                  className="flex min-h-[440px] flex-col items-center justify-center text-center"
                >
                  {/* Animated SVG checkmark draw */}
                  <motion.svg
                    viewBox="0 0 52 52"
                    className="h-20 w-20 text-emerald-500"
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.circle
                      cx="26"
                      cy="26"
                      r="24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1 } }}
                      transition={{ duration: 0.6, ease: EASE_PREMIUM }}
                    />
                    <motion.path
                      d="M15 27 l7 7 l15 -16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1 } }}
                      transition={{ duration: 0.5, delay: 0.45, ease: EASE_PREMIUM }}
                    />
                  </motion.svg>
                  <motion.h3
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-7 text-2xl font-bold text-navy-900 sm:text-3xl"
                  >
                    Thank you{form.name ? `, ${form.name.split(' ')[0]}` : ''}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.72 }}
                    className="mt-3 max-w-md text-body-fluid text-navy-500"
                  >
                    Your {form.inquiry ? form.inquiry.toLowerCase() : 'message'} is on its way — our
                    executive team will reply within one business day.
                  </motion.p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={onSubmit}
                  noValidate
                >
                  {/* Inquiry chips */}
                  <fieldset>
                    <legend className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-navy-400">
                      What's it about?
                    </legend>
                    <div className="flex flex-wrap gap-2">
                      {INQUIRY_TYPES.map((type) => {
                        const active = form.inquiry === type;
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setForm((p) => ({ ...p, inquiry: type }))}
                            aria-pressed={active}
                            className={cn(
                              'relative min-h-[40px] cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-200',
                              active
                                ? 'border-emerald-400 text-navy-900'
                                : 'border-navy-100 text-navy-500 hover:border-emerald-300 hover:text-navy-800',
                            )}
                          >
                            {active && (
                              <motion.span
                                layoutId={reduceMotion ? undefined : 'aura-inquiry-pill'}
                                transition={{ duration: 0.3, ease: EASE_PREMIUM }}
                                className="absolute inset-0 -z-0 rounded-full bg-emerald-50"
                                aria-hidden="true"
                              />
                            )}
                            <span className="relative z-10">{type}</span>
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>

                  {/* Fields */}
                  <div className="mt-7 grid gap-5 sm:grid-cols-2">
                    <Field
                      id="au-name"
                      label="Full name"
                      value={form.name}
                      onChange={set('name')}
                      onBlur={touch('name')}
                      valid={nameValid}
                      autoComplete="name"
                      error={touched.name && !nameValid ? 'Please enter your name.' : undefined}
                    />
                    <Field
                      id="au-email"
                      label="Work email"
                      type="email"
                      value={form.email}
                      onChange={set('email')}
                      onBlur={touch('email')}
                      valid={emailValid}
                      autoComplete="email"
                      error={
                        touched.email && !emailValid ? 'Enter a valid email address.' : undefined
                      }
                    />
                    <Field
                      id="au-company"
                      label="Company"
                      value={form.company}
                      onChange={set('company')}
                      autoComplete="organization"
                    />
                    <div>
                      <PhoneField
                        country={country}
                        onCountry={setCountry}
                        value={form.phone}
                        onChange={set('phone')}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Field
                        id="au-message"
                        label="Message"
                        textarea
                        value={form.message}
                        onChange={set('message')}
                        onBlur={touch('message')}
                        error={
                          touched.message && !messageValid
                            ? 'Please add a short message.'
                            : undefined
                        }
                      />
                    </div>
                  </div>

                  <p className="mt-5 text-xs leading-relaxed text-navy-400">{CONTACT.consent}</p>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="group relative mt-6 inline-flex min-h-[54px] w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full bg-emerald-400 px-8 py-3.5 text-base font-semibold text-navy-900 shadow-glow-emerald transition-all duration-300 ease-premium hover:bg-emerald-300 hover:shadow-[0_18px_50px_-8px_rgba(60,185,140,0.55)] active:scale-[0.99] disabled:cursor-wait"
                  >
                    {/* Shimmer sweep on hover */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-premium group-hover:translate-x-full"
                    />
                    <span className="relative inline-flex items-center gap-2">
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
                    </span>
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
