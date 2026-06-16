import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  Loader2,
  Mail,
  Phone,
  Search,
  Send,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { BRAND, CONTACT, INQUIRY_TYPES, OFFICES } from '@/data/content';
import { COUNTRIES, flagEmoji } from '@/data/countries';
import type { Country } from '@/data/countries';
import { cn } from '@/lib/cn';
import { EASE_PREMIUM, fadeUp, staggerParent, VIEWPORT_ONCE } from '@/lib/motion';
import { sendContact } from '@/lib/sendContact';
import type { ContactFormState, InquiryType, Office } from '@/types';

/**
 * "Contact Signal" — a second, intentionally distinct contact experience.
 * Unlike the concierge (left rail + multi-step boxed wizard), this is a
 * centered editorial block → a horizontal direct-line bar → one wide,
 * single-screen form built from minimalist underline inputs and inquiry
 * chips → an office strip with live local clocks. Same content, new shape.
 * Light theme, white + navy + a single emerald accent.
 */

const EMPTY_FORM: ContactFormState = {
  fullName: '',
  workEmail: '',
  company: '',
  phone: '',
  inquiryType: '',
  message: '',
};

type FieldErrors = Partial<Record<keyof ContactFormState, string>>;
type Status = 'idle' | 'sending' | 'sent' | 'error';

const EMAIL_RE = /^\S+@\S+\.\S+$/;

/** Each office's IANA time zone — drives the live local clocks. */
const OFFICE_TZ: Record<string, string> = {
  'Melbourne, Australia': 'Australia/Melbourne',
  Sydney: 'Australia/Sydney',
  Brisbane: 'Australia/Brisbane',
  Adelaide: 'Australia/Adelaide',
  Perth: 'Australia/Perth',
};

function validateField(field: keyof ContactFormState, value: string): string | undefined {
  if (field === 'fullName' && !value.trim()) return 'Please enter your full name.';
  if (field === 'workEmail') {
    if (!value.trim()) return 'Please enter your work email.';
    if (!EMAIL_RE.test(value.trim())) return 'Enter a valid email address.';
  }
  if (field === 'message' && !value.trim())
    return 'Please share a few details about your requirements.';
  return undefined;
}

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

/** Compact international phone field — searchable country / dial-code dropdown. */
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
    <div ref={ref} className="relative w-full">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={`Country code: ${country.name} ${country.dial}`}
          className="flex shrink-0 cursor-pointer items-center gap-1.5 py-2.5 text-base font-semibold text-navy-700 outline-none transition-colors duration-200 hover:text-emerald-700"
        >
          <span className="text-base leading-none" aria-hidden="true">
            {flagEmoji(country.iso)}
          </span>
          <span>{country.dial}</span>
          <ChevronDown
            className={cn('h-3.5 w-3.5 text-navy-400 transition-transform duration-200', open && 'rotate-180')}
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
          className="w-full bg-transparent py-2.5 text-base text-navy-900 outline-none placeholder:text-navy-300"
        />
      </div>

      {open && (
        <div
          role="listbox"
          className="absolute left-0 top-[calc(100%+0.6rem)] z-30 w-72 max-w-[calc(100vw-3rem)] overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-glass-lg"
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
          <ul className="max-h-56 overflow-y-auto p-1.5">
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
                    <span className="text-base leading-none" aria-hidden="true">
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

/** One office in the bottom strip — shows its city + a live local clock. */
function OfficeTile({ office }: { office: Office }) {
  const time = useLocalTime(OFFICE_TZ[office.city]);
  return (
    <div className="flex shrink-0 items-center gap-3 rounded-full border border-navy-100 bg-white/80 px-5 py-2.5 shadow-glass">
      <span className="text-sm font-bold text-navy-900">{office.city.split(',')[0]}</span>
      {office.primary && (
        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-600">
          HQ
        </span>
      )}
      {time && (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy-400">
          <Clock className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" />
          {time}
        </span>
      )}
    </div>
  );
}

/* ── Minimalist underline field ───────────────────────────────────────────── */
const lineField =
  'w-full border-0 border-b border-navy-200 bg-transparent px-0 py-2.5 text-base text-navy-900 outline-none transition-colors duration-200 placeholder:text-navy-300 hover:border-navy-300 focus:border-emerald-400';
const lineLabel = 'mb-1 block text-[11px] font-bold uppercase tracking-[0.16em] text-navy-400';

export function ContactSignal() {
  const reduceMotion = useReducedMotion();
  const [form, setForm] = useState<ContactFormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [country, setCountry] = useState<Country>(
    () => COUNTRIES.find((c) => c.iso === 'AU') ?? COUNTRIES[0],
  );
  const [botcheck, setBotcheck] = useState('');

  const formRef = useRef<HTMLFormElement>(null);
  const primaryOffice = OFFICES.find((o) => o.primary);

  const update =
    (field: keyof ContactFormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const blurValidate = (field: keyof ContactFormState) => () =>
    setErrors((prev) => ({ ...prev, [field]: validateField(field, form[field]) }));

  const selectTopic = (type: InquiryType) =>
    setForm((prev) => ({ ...prev, inquiryType: prev.inquiryType === type ? '' : type }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const next: FieldErrors = {
      fullName: validateField('fullName', form.fullName),
      workEmail: validateField('workEmail', form.workEmail),
      message: validateField('message', form.message),
    };
    setErrors(next);
    if (next.fullName || next.workEmail || next.message) {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setStatus('sending');
    try {
      await sendContact({
        fullName: form.fullName.trim(),
        workEmail: form.workEmail.trim(),
        company: form.company.trim(),
        phone: form.phone.trim() ? `${country.dial} ${form.phone.trim()}` : '',
        inquiryType: form.inquiryType || undefined,
        message: form.message.trim(),
        botcheck,
      });
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section
      id="contact"
      aria-label="Contact — signal"
      className="section-py relative overflow-hidden bg-navy-50/40"
    >
      {/* Faint backdrop grid, fading at the edges */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid-faint bg-grid-32 opacity-30 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_30%,black_20%,transparent_75%)]"
      />

      <Container className="relative">
        {/* ── Centered editorial heading ── */}
        <motion.div
          variants={staggerParent(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.span variants={fadeUp} className="eyebrow mx-auto">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Contact Us
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-5 text-[clamp(1.9rem,4.5vw,3rem)] font-normal normal-case leading-[1.12] tracking-[-0.01em] text-navy-900 text-balance"
          >
            Let&apos;s start a <span className="text-emerald-500">conversation</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-5 max-w-xl text-body-fluid text-navy-500 text-pretty">
            {CONTACT.description}
          </motion.p>
        </motion.div>

        {/* ── Horizontal direct-line bar ── */}
        {primaryOffice && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.6, ease: EASE_PREMIUM }}
            className="mx-auto mt-10 flex max-w-4xl flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-1 sm:gap-y-2"
          >
            <a
              href={`tel:${primaryOffice.phone?.replace(/\s/g, '')}`}
              className="group flex items-center justify-center gap-3 whitespace-nowrap px-4 py-3"
            >
              <Phone className="h-[18px] w-[18px] shrink-0 text-emerald-500" aria-hidden="true" />
              <span className="text-base font-semibold text-navy-900 transition-colors duration-200 group-hover:text-emerald-700">
                {primaryOffice.phone}
              </span>
            </a>
            <span aria-hidden="true" className="hidden h-8 w-px bg-navy-200 sm:block" />
            <a
              href={`mailto:${primaryOffice.email}`}
              className="group flex items-center justify-center gap-3 whitespace-nowrap px-4 py-3"
            >
              <Mail className="h-[18px] w-[18px] shrink-0 text-emerald-500" aria-hidden="true" />
              <span className="text-base font-semibold text-navy-900 transition-colors duration-200 group-hover:text-emerald-700">
                {primaryOffice.email}
              </span>
            </a>
            <span aria-hidden="true" className="hidden h-8 w-px bg-navy-200 sm:block" />
            <span className="flex items-center justify-center gap-2.5 whitespace-nowrap px-4 py-3 text-sm font-medium text-navy-500">
              <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70 [animation-duration:2.4s]" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              Reply within <span className="font-bold text-navy-800">2 hours</span>
            </span>
          </motion.div>
        )}

        {/* ── Wide single-screen form ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.7, ease: EASE_PREMIUM }}
          className="mx-auto mt-12 max-w-3xl rounded-[1.75rem] border border-navy-100 bg-white/90 p-6 shadow-glass sm:p-9 3xl:p-10"
        >
          <AnimatePresence mode="wait">
            {status === 'sent' ? (
              <motion.div
                key="sent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                role="status"
                className="flex min-h-[420px] flex-col items-center justify-center text-center"
              >
                <motion.span
                  initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: EASE_PREMIUM }}
                  className="grid h-20 w-20 place-items-center rounded-full bg-emerald-100 text-emerald-600 shadow-glow-emerald"
                >
                  <CheckCircle2 className="h-10 w-10" aria-hidden="true" />
                </motion.span>
                <h3 className="mt-8 text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl">
                  Thank you{form.fullName ? `, ${form.fullName.split(' ')[0]}` : ''}
                </h3>
                <p className="mt-3 max-w-md text-body-fluid text-navy-500">
                  Your {form.inquiryType ? form.inquiryType.toLowerCase() : 'inquiry'} has been received.
                  Our executive team will respond within one business day.
                </p>
                {primaryOffice && (
                  <p className="mt-6 text-sm text-navy-400">
                    Need something urgent?{' '}
                    <a
                      href={`mailto:${primaryOffice.email}`}
                      className="font-semibold text-emerald-600 transition-colors duration-200 hover:text-emerald-700"
                    >
                      Email us directly
                    </a>
                  </p>
                )}
              </motion.div>
            ) : (
              <motion.form
                key="form"
                ref={formRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={onSubmit}
                noValidate
              >
                {/* Honeypot */}
                <input
                  type="text"
                  name="botcheck"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={botcheck}
                  onChange={(e) => setBotcheck(e.target.value)}
                  className="absolute left-[-9999px] h-0 w-0 opacity-0"
                />

                {/* Inquiry chips */}
                <fieldset>
                  <legend className={lineLabel}>What can we help with?</legend>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {INQUIRY_TYPES.map((type) => {
                      const active = form.inquiryType === type;
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => selectTopic(type)}
                          aria-pressed={active}
                          className={cn(
                            'min-h-[40px] cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200',
                            active
                              ? 'border-emerald-400 bg-emerald-50 text-emerald-700 shadow-glow-emerald'
                              : 'border-navy-100 bg-white text-navy-500 hover:border-emerald-300 hover:text-navy-800',
                          )}
                        >
                          {type}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                {/* Field grid — underline inputs */}
                <div className="mt-9 grid gap-x-8 gap-y-7 sm:grid-cols-2">
                  <div>
                    <label htmlFor="cs-fullName" className={lineLabel}>
                      Full name <span className="text-emerald-600">*</span>
                    </label>
                    <input
                      id="cs-fullName"
                      autoComplete="name"
                      placeholder="Jane Doe"
                      value={form.fullName}
                      onChange={update('fullName')}
                      onBlur={blurValidate('fullName')}
                      aria-invalid={Boolean(errors.fullName)}
                      className={lineField}
                    />
                    {errors.fullName && (
                      <p role="alert" className="mt-1.5 text-xs font-medium text-red-600">
                        {errors.fullName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="cs-workEmail" className={lineLabel}>
                      Work email <span className="text-emerald-600">*</span>
                    </label>
                    <input
                      id="cs-workEmail"
                      type="email"
                      autoComplete="email"
                      placeholder="jane@company.com"
                      value={form.workEmail}
                      onChange={update('workEmail')}
                      onBlur={blurValidate('workEmail')}
                      aria-invalid={Boolean(errors.workEmail)}
                      className={lineField}
                    />
                    {errors.workEmail && (
                      <p role="alert" className="mt-1.5 text-xs font-medium text-red-600">
                        {errors.workEmail}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="cs-company" className={lineLabel}>
                      Company
                    </label>
                    <input
                      id="cs-company"
                      autoComplete="organization"
                      placeholder="Company name"
                      value={form.company}
                      onChange={update('company')}
                      className={lineField}
                    />
                  </div>
                  <div>
                    <span className={lineLabel}>Phone</span>
                    <div className="border-b border-navy-200 transition-colors duration-200 focus-within:border-emerald-400">
                      <PhoneField
                        country={country}
                        onCountry={setCountry}
                        value={form.phone}
                        onChange={update('phone')}
                      />
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="mt-7">
                  <label htmlFor="cs-message" className={lineLabel}>
                    Your requirements <span className="text-emerald-600">*</span>
                  </label>
                  <textarea
                    id="cs-message"
                    rows={4}
                    placeholder="Share a few details about what you're looking for..."
                    value={form.message}
                    onChange={update('message')}
                    onBlur={blurValidate('message')}
                    aria-invalid={Boolean(errors.message)}
                    className={cn(lineField, 'resize-none leading-relaxed')}
                  />
                  {errors.message && (
                    <p role="alert" className="mt-1.5 text-xs font-medium text-red-600">
                      {errors.message}
                    </p>
                  )}
                </div>

                {status === 'error' && (
                  <p
                    role="alert"
                    className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
                  >
                    Something went wrong sending your message. Please try again, or email us directly at{' '}
                    <a href={`mailto:${BRAND.email}`} className="font-semibold underline">
                      {BRAND.email}
                    </a>
                    .
                  </p>
                )}

                {/* Consent + submit */}
                <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-sm text-xs leading-relaxed text-navy-400">{CONTACT.consent}</p>
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="group inline-flex min-h-[52px] shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full bg-emerald-400 px-8 py-3.5 text-base font-semibold text-navy-900 shadow-glow-emerald transition-all duration-300 ease-premium hover:bg-emerald-300 hover:shadow-[0_18px_50px_-8px_rgba(60,185,140,0.55)] active:scale-[0.99] disabled:cursor-wait disabled:opacity-70"
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
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── Office strip with live local clocks ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.6, ease: EASE_PREMIUM, delay: 0.1 }}
          className="mt-12"
        >
          <p className="text-center text-[11px] font-bold uppercase tracking-[0.18em] text-navy-400">
            Our Offices
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            {OFFICES.map((office) => (
              <OfficeTile key={office.city} office={office} />
            ))}
          </div>
        </motion.div>

      </Container>
    </section>
  );
}
