import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  Handshake,
  LineChart,
  Loader2,
  Mail,
  MapPin,
  MessageSquare,
  MonitorSmartphone,
  Newspaper,
  Phone,
  Search,
  Send,
  Truck,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { BRAND, CONTACT, INQUIRY_TYPES, OFFICES } from '@/data/content';
import { COUNTRIES, flagEmoji } from '@/data/countries';
import type { Country } from '@/data/countries';
import { cn } from '@/lib/cn';
import { EASE_PREMIUM, fadeUp, staggerParent, VIEWPORT_ONCE } from '@/lib/motion';
import { sendContact } from '@/lib/sendContact';
import type { ContactFormState, InquiryType, Office } from '@/types';

/**
 * "Contact Concierge" — a premium, single-screen contact experience modeled on
 * the executive-concierge pattern: an editorial left rail (direct lines + an
 * interactive office selector with a live local-time clock and a live
 * response-time signal) paired with one refined floating-label form card on
 * the right. No multi-step wizard, no wall of fields — clarity, generous white
 * space, white + navy + a single emerald accent.
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

const INQUIRY_ICONS: Record<string, LucideIcon> = {
  'Partnership opportunity': Handshake,
  'Logistics services': Truck,
  'Digital solutions': MonitorSmartphone,
  'Investor relations': LineChart,
  'Media inquiry': Newspaper,
  Careers: Briefcase,
  Other: MessageSquare,
};

/** Each office's IANA time zone — drives the live local clock. */
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

/** Live HH:MM clock for a given time zone, refreshed each minute. */
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
    <div ref={ref} className="relative w-full">
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={`Country code: ${country.name} ${country.dial}`}
          className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-navy-100 bg-white px-2.5 py-1.5 text-sm font-semibold text-navy-700 outline-none transition-colors duration-200 hover:border-emerald-300"
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
          className="w-full bg-transparent text-base text-navy-900 outline-none placeholder:text-navy-300"
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

export function ContactConcierge() {
  const reduceMotion = useReducedMotion();
  const [form, setForm] = useState<ContactFormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [officeIndex, setOfficeIndex] = useState(
    Math.max(0, OFFICES.findIndex((o) => o.primary)),
  );
  const [country, setCountry] = useState<Country>(
    () => COUNTRIES.find((c) => c.iso === 'AU') ?? COUNTRIES[0],
  );
  const [step, setStep] = useState(0);
  const [botcheck, setBotcheck] = useState('');

  const formCardRef = useRef<HTMLDivElement>(null);

  const activeOffice: Office = OFFICES[officeIndex];
  const primaryOffice = OFFICES.find((o) => o.primary);
  const localTime = useLocalTime(OFFICE_TZ[activeOffice.city]);

  const update =
    (field: keyof ContactFormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const blurValidate = (field: keyof ContactFormState) => () =>
    setErrors((prev) => ({ ...prev, [field]: validateField(field, form[field]) }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const next: FieldErrors = {
      fullName: validateField('fullName', form.fullName),
      workEmail: validateField('workEmail', form.workEmail),
      message: validateField('message', form.message),
    };
    setErrors(next);
    if (next.fullName || next.workEmail || next.message) {
      formCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
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

  // ── Step-wise navigation ──
  const STEP_LABELS = ['Topic', 'Details', 'Message'];
  const stepMotion = {
    initial: { opacity: 0, x: reduceMotion ? 0 : 36 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: reduceMotion ? 0 : -36 },
    transition: { duration: 0.4, ease: EASE_PREMIUM },
  };
  const fieldCls =
    'w-full rounded-xl border border-navy-100 bg-navy-50/40 px-4 py-3 text-base text-navy-900 outline-none transition-all duration-200 placeholder:text-navy-300 hover:border-navy-200 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-400/15';
  const stepLabelCls = 'mb-1.5 block text-xs font-bold uppercase tracking-[0.14em] text-navy-500';

  const chooseTopic = (type: InquiryType) => {
    setForm((prev) => ({ ...prev, inquiryType: type }));
    window.setTimeout(() => setStep(1), reduceMotion ? 0 : 220);
  };

  const continueToMessage = () => {
    const next: FieldErrors = {
      fullName: validateField('fullName', form.fullName),
      workEmail: validateField('workEmail', form.workEmail),
    };
    setErrors(next);
    if (next.fullName || next.workEmail) return;
    setStep(2);
  };

  return (
    <section
      id="contact-concierge"
      aria-label="Contact — concierge"
      className="section-py relative overflow-hidden bg-white"
    >
      <Container className="relative">
        <div className="grid gap-12 xl:grid-cols-12 xl:gap-16 3xl:gap-20">
          {/* ── Editorial left rail ── */}
          <motion.div
            variants={staggerParent(0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            className="xl:col-span-5 xl:self-start xl:pt-2"
          >
            <SectionHeading
              align="left"
              eyebrow="Contact Us"
              title={
                <>
                  <span className="text-navy">Let's start a</span>{' '}
                  <span className="text-emerald">conversation</span>
                </>
              }
              titleClassName="normal-case !font-normal"
              description={CONTACT.description}
            />

            {/* Direct lines */}
            {primaryOffice && (
              <motion.div variants={fadeUp} className="mt-9 space-y-3">
                <a
                  href={`tel:${primaryOffice.phone?.replace(/\s/g, '')}`}
                  className="group flex min-h-[60px] items-center gap-4 rounded-2xl px-4 py-3.5 transition-colors duration-200 hover:bg-navy-50/70 sm:px-5"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-600 transition-colors duration-200 group-hover:bg-emerald-100">
                    <Phone className="h-[18px] w-[18px]" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-bold uppercase tracking-[0.16em] text-navy-400">
                      Call us
                    </span>
                    <span className="block truncate text-base font-semibold text-navy-900 transition-colors duration-200 group-hover:text-emerald-700 sm:text-lg">
                      {primaryOffice.phone}
                    </span>
                  </span>
                </a>
                <a
                  href={`mailto:${primaryOffice.email}`}
                  className="group flex min-h-[60px] items-center gap-4 rounded-2xl px-4 py-3.5 transition-colors duration-200 hover:bg-navy-50/70 sm:px-5"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-600 transition-colors duration-200 group-hover:bg-emerald-100">
                    <Mail className="h-[18px] w-[18px]" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-bold uppercase tracking-[0.16em] text-navy-400">
                      Email us
                    </span>
                    <span className="block truncate text-base font-semibold text-navy-900 transition-colors duration-200 group-hover:text-emerald-700 sm:text-lg">
                      {primaryOffice.email}
                    </span>
                  </span>
                </a>
              </motion.div>
            )}

            {/* Interactive office selector */}
            <motion.div variants={fadeUp} className="mt-8 border-t border-navy-100 pt-7">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-navy-400">
                Our Offices
              </p>
              <div className="mt-3.5 flex flex-wrap gap-2">
                {OFFICES.map((office, i) => {
                  const isActive = i === officeIndex;
                  return (
                    <button
                      key={office.city}
                      type="button"
                      onClick={() => setOfficeIndex(i)}
                      aria-pressed={isActive}
                      className={cn(
                        'min-h-[40px] cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200',
                        isActive
                          ? 'border-emerald-400 bg-emerald-50 text-emerald-700 shadow-glow-emerald'
                          : 'border-navy-100 bg-white/70 text-navy-500 hover:border-emerald-300 hover:text-navy-800',
                      )}
                    >
                      {office.city.split(',')[0]}
                    </button>
                  );
                })}
              </div>

              {/* Selected office detail */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeOffice.city}
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
                  transition={{ duration: 0.35, ease: EASE_PREMIUM }}
                  className="mt-5 rounded-2xl border border-navy-100 bg-white/80 p-5 shadow-glass"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-navy-50 text-emerald-600">
                      <MapPin className="h-[18px] w-[18px]" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
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
                      {localTime && (
                        <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-navy-400">
                          <Clock className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" />
                          Local time {localTime}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Live response-time signal */}
              <p className="mt-5 inline-flex items-center gap-2.5 text-sm font-medium text-navy-500">
                <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70 [animation-duration:2.4s]" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </span>
                Avg. response within <span className="font-bold text-navy-800">1 business day</span>
              </p>
            </motion.div>
          </motion.div>

          {/* ── Form card ── */}
          <motion.div
            ref={formCardRef}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.7, ease: EASE_PREMIUM }}
            className="xl:col-span-7"
          >
            <div className="relative overflow-hidden rounded-[1.75rem] border border-navy-100 bg-white/90 p-6 shadow-glass sm:p-9 3xl:p-10">
              <AnimatePresence mode="wait">
                {status === 'sent' ? (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    role="status"
                    className="flex min-h-[520px] flex-col items-center justify-center text-center"
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
                      Your {form.inquiryType ? form.inquiryType.toLowerCase() : 'inquiry'} has been
                      received. Our executive team will respond within one business day.
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
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={onSubmit}
                    noValidate
                  >
                    {/* Honeypot — hidden from people, catches bots */}
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

                    {/* Step progress rail */}
                    <ol className="flex items-center gap-3 sm:gap-4" aria-label="Inquiry progress">
                      {STEP_LABELS.map((label, i) => {
                        const isDone = i < step;
                        const isCurrent = i === step;
                        return (
                          <li
                            key={label}
                            className={cn('flex items-center gap-3 sm:gap-4', i > 0 && 'flex-1')}
                          >
                            {i > 0 && (
                              <span className="relative h-px flex-1 overflow-hidden bg-navy-100">
                                <motion.span
                                  className="absolute inset-0 origin-left bg-emerald-400"
                                  initial={false}
                                  animate={{ scaleX: i <= step ? 1 : 0 }}
                                  transition={{ duration: 0.45, ease: EASE_PREMIUM }}
                                />
                              </span>
                            )}
                            <button
                              type="button"
                              onClick={() => isDone && setStep(i)}
                              disabled={!isDone}
                              aria-current={isCurrent ? 'step' : undefined}
                              className={cn(
                                'flex min-h-[44px] items-center gap-2.5 rounded-full py-1 pr-1',
                                isDone && 'cursor-pointer',
                              )}
                            >
                              <span
                                className={cn(
                                  'grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-bold transition-colors duration-200',
                                  isDone && 'bg-emerald-400 text-navy-900',
                                  isCurrent && 'bg-navy-900 text-white',
                                  !isDone && !isCurrent && 'border border-navy-200 bg-white text-navy-400',
                                )}
                              >
                                {isDone ? <Check className="h-4 w-4" aria-hidden="true" /> : `0${i + 1}`}
                              </span>
                              <span
                                className={cn(
                                  'hidden text-sm font-semibold sm:block',
                                  isCurrent ? 'text-navy-900' : 'text-navy-400',
                                )}
                              >
                                {label}
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ol>

                    {/* Steps */}
                    <div className="mt-8 min-h-[340px]">
                      <AnimatePresence mode="wait" initial={false}>
                        {step === 0 && (
                          <motion.div key="step-topic" {...stepMotion}>
                            <h3 className="text-xl font-bold tracking-tight text-navy-900 sm:text-2xl">
                              What would you like to discuss?
                            </h3>
                            <p className="mt-2 text-body-fluid text-navy-500">
                              Choose a path and we'll route you to the right team.
                            </p>
                            <div className="mt-6 grid gap-3 sm:grid-cols-2">
                              {INQUIRY_TYPES.map((type) => {
                                const Icon = INQUIRY_ICONS[type] ?? MessageSquare;
                                const active = form.inquiryType === type;
                                return (
                                  <button
                                    key={type}
                                    type="button"
                                    onClick={() => chooseTopic(type)}
                                    aria-pressed={active}
                                    className={cn(
                                      'group flex min-h-[56px] cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-200',
                                      active
                                        ? 'border-emerald-400 bg-emerald-50 shadow-glow-emerald'
                                        : 'border-navy-100 bg-white hover:border-emerald-300 hover:bg-navy-50/40',
                                    )}
                                  >
                                    <span
                                      className={cn(
                                        'grid h-9 w-9 shrink-0 place-items-center rounded-lg transition-colors duration-200',
                                        active
                                          ? 'bg-emerald-400 text-navy-900'
                                          : 'bg-navy-50 text-navy-500 group-hover:text-emerald-600',
                                      )}
                                    >
                                      <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                                    </span>
                                    <span className="flex-1 text-sm font-semibold text-navy-800">{type}</span>
                                    <ArrowRight
                                      className={cn(
                                        'h-4 w-4 transition-all duration-300 ease-premium',
                                        active
                                          ? 'text-emerald-600'
                                          : 'text-navy-200 group-hover:translate-x-0.5 group-hover:text-emerald-500',
                                      )}
                                      aria-hidden="true"
                                    />
                                  </button>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}

                        {step === 1 && (
                          <motion.div key="step-details" {...stepMotion}>
                            <h3 className="text-xl font-bold tracking-tight text-navy-900 sm:text-2xl">
                              Tell us who you are
                            </h3>
                            <p className="mt-2 text-body-fluid text-navy-500">
                              {form.inquiryType
                                ? `${form.inquiryType} — a few details so the right people reach out.`
                                : 'A few details so the right people reach out.'}
                            </p>
                            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                              <div>
                                <label htmlFor="cc-fullName" className={stepLabelCls}>
                                  Full name <span className="text-emerald-600">*</span>
                                </label>
                                <input
                                  id="cc-fullName"
                                  autoComplete="name"
                                  placeholder="Jane Doe"
                                  value={form.fullName}
                                  onChange={update('fullName')}
                                  onBlur={blurValidate('fullName')}
                                  aria-invalid={Boolean(errors.fullName)}
                                  className={fieldCls}
                                />
                                {errors.fullName && (
                                  <p role="alert" className="mt-1.5 text-xs font-medium text-red-600">
                                    {errors.fullName}
                                  </p>
                                )}
                              </div>
                              <div>
                                <label htmlFor="cc-workEmail" className={stepLabelCls}>
                                  Work email <span className="text-emerald-600">*</span>
                                </label>
                                <input
                                  id="cc-workEmail"
                                  type="email"
                                  autoComplete="email"
                                  placeholder="jane@company.com"
                                  value={form.workEmail}
                                  onChange={update('workEmail')}
                                  onBlur={blurValidate('workEmail')}
                                  aria-invalid={Boolean(errors.workEmail)}
                                  className={fieldCls}
                                />
                                {errors.workEmail && (
                                  <p role="alert" className="mt-1.5 text-xs font-medium text-red-600">
                                    {errors.workEmail}
                                  </p>
                                )}
                              </div>
                              <div>
                                <label htmlFor="cc-company" className={stepLabelCls}>
                                  Company
                                </label>
                                <input
                                  id="cc-company"
                                  autoComplete="organization"
                                  placeholder="Company name"
                                  value={form.company}
                                  onChange={update('company')}
                                  className={fieldCls}
                                />
                              </div>
                              <div>
                                <label htmlFor="cc-phone" className={stepLabelCls}>
                                  Phone
                                </label>
                                <div className="rounded-xl border border-navy-100 bg-navy-50/40 px-3 py-2.5 transition-all duration-200 focus-within:border-emerald-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-emerald-400/15">
                                  <PhoneField
                                    country={country}
                                    onCountry={setCountry}
                                    value={form.phone}
                                    onChange={update('phone')}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="mt-7 flex items-center justify-between gap-4">
                              <button
                                type="button"
                                onClick={() => setStep(0)}
                                className="inline-flex min-h-[48px] cursor-pointer items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-navy-500 transition-colors duration-200 hover:bg-navy-50 hover:text-navy-800"
                              >
                                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                                Back
                              </button>
                              <button
                                type="button"
                                onClick={continueToMessage}
                                className="group inline-flex min-h-[48px] cursor-pointer items-center gap-2 rounded-full bg-navy-900 px-7 py-3 text-sm font-semibold text-white transition-all duration-300 ease-premium hover:bg-navy-700 active:scale-[0.99]"
                              >
                                Continue
                                <ArrowRight
                                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                                  aria-hidden="true"
                                />
                              </button>
                            </div>
                          </motion.div>
                        )}

                        {step === 2 && (
                          <motion.div key="step-message" {...stepMotion}>
                            <h3 className="text-xl font-bold tracking-tight text-navy-900 sm:text-2xl">
                              How can we help?
                            </h3>
                            <p className="mt-2 text-body-fluid text-navy-500">
                              Share a few details and our executive team will take it from here.
                            </p>
                            <div className="mt-6">
                              <label htmlFor="cc-message" className={stepLabelCls}>
                                Your requirements <span className="text-emerald-600">*</span>
                              </label>
                              <textarea
                                id="cc-message"
                                rows={6}
                                placeholder="Share a few details about what you're looking for..."
                                value={form.message}
                                onChange={update('message')}
                                onBlur={blurValidate('message')}
                                aria-invalid={Boolean(errors.message)}
                                className={cn(fieldCls, 'resize-none leading-relaxed')}
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
                                className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
                              >
                                Something went wrong sending your message. Please try again, or email
                                us directly at{' '}
                                <a href={`mailto:${BRAND.email}`} className="font-semibold underline">
                                  {BRAND.email}
                                </a>
                                .
                              </p>
                            )}
                            <p className="mt-4 text-xs leading-relaxed text-navy-400">{CONTACT.consent}</p>
                            <div className="mt-6 flex items-center justify-between gap-4">
                              <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="inline-flex min-h-[48px] cursor-pointer items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-navy-500 transition-colors duration-200 hover:bg-navy-50 hover:text-navy-800"
                              >
                                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                                Back
                              </button>
                              <button
                                type="submit"
                                disabled={status === 'sending'}
                                className="group inline-flex min-h-[52px] cursor-pointer items-center justify-center gap-2 rounded-full bg-emerald-400 px-8 py-3.5 text-base font-semibold text-navy-900 shadow-glow-emerald transition-all duration-300 ease-premium hover:bg-emerald-300 hover:shadow-[0_18px_50px_-8px_rgba(60,185,140,0.55)] active:scale-[0.99] disabled:cursor-wait disabled:opacity-70"
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
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>

              {/* Decorative corner flourish */}
              <ArrowUpRight
                aria-hidden="true"
                className="pointer-events-none absolute right-6 top-6 h-5 w-5 text-navy-100"
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
