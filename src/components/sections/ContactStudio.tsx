import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  Loader2,
  Mail,
  MessageSquarePlus,
  Phone,
  Route,
  Search,
  Send,
  Sparkles,
  User,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { BRAND, CONTACT, INQUIRY_TYPES, OFFICES } from '@/data/content';
import { COUNTRIES, flagEmoji } from '@/data/countries';
import type { Country } from '@/data/countries';
import { cn } from '@/lib/cn';
import { EASE_PREMIUM, fadeUp, staggerParent, VIEWPORT_ONCE } from '@/lib/motion';
import type { InquiryType } from '@/types';

/**
 * "Contact Studio" — a process-led, confidence-building contact experience: a
 * centered "how it works" trust strip over one elegant wide form with an
 * animated segmented inquiry selector. White + navy + a single emerald accent.
 */

type Step = { icon: LucideIcon; title: string; desc: string };

const STEPS: Step[] = [
  { icon: MessageSquarePlus, title: 'You send', desc: 'Tell us what you need — one short message.' },
  { icon: Route, title: 'We route it', desc: 'Your inquiry reaches the right division instantly.' },
  { icon: Sparkles, title: 'You hear back', desc: 'An executive replies within one business day.' },
];

const EMAIL_RE = /^\S+@\S+\.\S+$/;

// Minimal, editorial line fields — transparent with an animated underline.
const inputClasses =
  'w-full border-b-2 border-navy-100 bg-transparent px-1 py-2.5 text-base text-navy-900 outline-none transition-colors duration-200 placeholder:text-navy-300 hover:border-navy-200 focus:border-emerald-400';
const labelClasses = 'mb-1.5 block text-xs font-bold uppercase tracking-[0.14em] text-navy-400';

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
      <div className="flex items-stretch border-b-2 border-navy-100 transition-colors duration-200 focus-within:border-emerald-400">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={`Country code: ${country.name} ${country.dial}`}
          className="flex shrink-0 cursor-pointer items-center gap-2 border-r border-navy-100 py-2.5 pr-3 text-base font-semibold text-navy-700 outline-none transition-colors duration-200 hover:text-emerald-600"
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
          className="w-full bg-transparent px-3 py-2.5 text-base text-navy-900 outline-none placeholder:text-navy-300"
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

export function ContactStudio() {
  const reduceMotion = useReducedMotion();
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    inquiry: '' as InquiryType | '',
    message: '',
  });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [country, setCountry] = useState<Country>(
    () => COUNTRIES.find((c) => c.iso === 'AU') ?? COUNTRIES[0],
  );

  const primaryOffice = OFFICES.find((o) => o.primary);

  const set = (field: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((p) => ({ ...p, [field]: e.target.value }));
    if (field in errors) setErrors((p) => ({ ...p, [field]: undefined }));
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
      id="contact-studio"
      aria-label="Contact — studio"
      className="section-py relative overflow-hidden bg-white"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid-faint bg-grid-32 opacity-25 [mask-image:radial-gradient(ellipse_70%_55%_at_50%_30%,black_20%,transparent_75%)]" />
      </div>

      <Container className="relative">
        {/* Heading */}
        <motion.div
          variants={staggerParent(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.span variants={fadeUp} className="eyebrow mx-auto w-fit">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Contact Us
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-5 text-[clamp(1.75rem,5vw,2.5rem)] font-normal normal-case leading-[1.15] text-navy-900 text-balance"
          >
            <span className="text-navy-900">A simple path to</span>{' '}
            <span className="text-emerald-500">the right answer.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-xl text-body-fluid text-navy-500">
            {CONTACT.description}
          </motion.p>
        </motion.div>

        {/* How it works strip */}
        <motion.ol
          variants={staggerParent(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="relative mx-auto mt-12 grid max-w-4xl list-none gap-6 sm:grid-cols-3 sm:gap-4 lg:mt-16"
        >
          {/* Connecting line (desktop) */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-[16.66%] right-[16.66%] top-7 hidden h-px bg-navy-100 sm:block"
          />
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.li
                key={step.title}
                variants={fadeUp}
                className="relative flex flex-col items-center text-center"
              >
                <span className="relative grid h-14 w-14 place-items-center rounded-2xl border border-navy-100 bg-white text-emerald-600 shadow-glass">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                  <span className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-emerald-400 text-[11px] font-bold text-navy-900">
                    {i + 1}
                  </span>
                </span>
                <h3 className="mt-4 text-base font-bold text-navy-900">{step.title}</h3>
                <p className="mt-1 max-w-[15rem] text-sm leading-relaxed text-navy-500">
                  {step.desc}
                </p>
              </motion.li>
            );
          })}
        </motion.ol>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.7, ease: EASE_PREMIUM }}
          className="mx-auto mt-12 max-w-3xl rounded-[1.75rem] border border-navy-100 bg-white/90 p-6 shadow-glass sm:p-9 lg:mt-16"
        >
          {status === 'sent' ? (
            <div role="status" className="flex flex-col items-center py-8 text-center">
              <span className="grid h-20 w-20 place-items-center rounded-full bg-emerald-100 text-emerald-600 shadow-glow-emerald">
                <CheckCircle2 className="h-10 w-10" aria-hidden="true" />
              </span>
              <h3 className="mt-7 text-2xl font-bold text-navy-900 sm:text-3xl">
                Thank you{form.name ? `, ${form.name.split(' ')[0]}` : ''}
              </h3>
              <p className="mt-3 max-w-md text-body-fluid text-navy-500">
                Your {form.inquiry ? form.inquiry.toLowerCase() : 'inquiry'} is on its way — we'll
                reply within one business day.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate>
              {/* Animated segmented inquiry selector */}
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
                            layoutId={reduceMotion ? undefined : 'studio-inquiry-pill'}
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
              <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="st-name" className={labelClasses}>
                    Full name <span className="text-emerald-600">*</span>
                  </label>
                  <div className="relative">
                    <User
                      className="pointer-events-none absolute left-1 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-navy-300"
                      aria-hidden="true"
                    />
                    <input
                      id="st-name"
                      value={form.name}
                      onChange={set('name')}
                      autoComplete="name"
                      placeholder="Jane Doe"
                      className={cn(inputClasses, 'pl-8')}
                    />
                  </div>
                  {errors.name && <p className="mt-2 text-xs font-medium text-red-600">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="st-email" className={labelClasses}>
                    Work email <span className="text-emerald-600">*</span>
                  </label>
                  <div className="relative">
                    <Mail
                      className="pointer-events-none absolute left-1 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-navy-300"
                      aria-hidden="true"
                    />
                    <input
                      id="st-email"
                      type="email"
                      value={form.email}
                      onChange={set('email')}
                      autoComplete="email"
                      placeholder="jane@company.com"
                      className={cn(inputClasses, 'pl-8')}
                    />
                  </div>
                  {errors.email && <p className="mt-2 text-xs font-medium text-red-600">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="st-company" className={labelClasses}>
                    Company
                  </label>
                  <div className="relative">
                    <Building2
                      className="pointer-events-none absolute left-1 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-navy-300"
                      aria-hidden="true"
                    />
                    <input
                      id="st-company"
                      value={form.company}
                      onChange={set('company')}
                      autoComplete="organization"
                      placeholder="Company name"
                      className={cn(inputClasses, 'pl-8')}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="st-phone" className={labelClasses}>
                    Phone
                  </label>
                  <PhoneField
                    country={country}
                    onCountry={setCountry}
                    value={form.phone}
                    onChange={set('phone')}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="st-message" className={labelClasses}>
                    Message <span className="text-emerald-600">*</span>
                  </label>
                  <textarea
                    id="st-message"
                    rows={4}
                    value={form.message}
                    onChange={set('message')}
                    placeholder="Share a few details about what you're looking for..."
                    className="w-full resize-none rounded-xl border-2 border-navy-100 bg-transparent px-4 py-3 text-base leading-relaxed text-navy-900 outline-none transition-colors duration-200 placeholder:text-navy-300 hover:border-navy-200 focus:border-emerald-400"
                  />
                  {errors.message && (
                    <p className="mt-2 text-xs font-medium text-red-600">{errors.message}</p>
                  )}
                </div>
              </div>

              <p className="mt-5 text-xs leading-relaxed text-navy-400">{CONTACT.consent}</p>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="group mt-6 inline-flex min-h-[52px] w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-emerald-400 px-8 py-3.5 text-base font-semibold text-navy-900 shadow-glow-emerald transition-all duration-300 ease-premium hover:bg-emerald-300 active:scale-[0.99] disabled:cursor-wait disabled:opacity-70"
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

              {/* Direct lines */}
              {primaryOffice && (
                <div className="mt-7 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 border-t border-navy-100 pt-6 text-sm">
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
                </div>
              )}
            </form>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
