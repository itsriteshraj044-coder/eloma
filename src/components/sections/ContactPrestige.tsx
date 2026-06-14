import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Search,
  User,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { BRAND, CONTACT, INQUIRY_TYPES, OFFICES } from '@/data/content';
import { COUNTRIES, flagEmoji } from '@/data/countries';
import type { Country } from '@/data/countries';
import { cn } from '@/lib/cn';
import { EASE_PREMIUM, fadeUp, staggerParent, VIEWPORT_ONCE } from '@/lib/motion';
import type { InquiryType } from '@/types';

/**
 * "Contact Prestige" — an elevated split card: a refined contact-details panel
 * beside an elegant inquiry form (animated segmented selector + international
 * phone field). Layered depth, a single emerald accent, generous whitespace —
 * the most premium of the contact treatments. White + navy + emerald.
 */

const EMAIL_RE = /^\S+@\S+\.\S+$/;

const inputClasses =
  'w-full rounded-xl border border-navy-100 bg-navy-50/40 px-4 py-3.5 text-base text-navy-900 outline-none transition-all duration-200 placeholder:text-navy-300 hover:border-navy-200 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-400/15';
const labelClasses = 'mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-navy-400';

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
      <div className="flex items-stretch overflow-hidden rounded-xl border border-navy-100 bg-navy-50/40 transition-all duration-200 hover:border-navy-200 focus-within:border-emerald-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-emerald-400/15">
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

/** A single contact detail row in the left panel. */
function DetailRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
  href?: string;
}) {
  const body = (
    <>
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-600 transition-colors duration-200 group-hover:bg-emerald-100">
        <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="block text-[11px] font-bold uppercase tracking-[0.16em] text-navy-400">
          {label}
        </span>
        <span className="mt-0.5 block text-base font-semibold leading-snug text-navy-900 transition-colors duration-200 group-hover:text-emerald-700">
          {value}
        </span>
      </span>
    </>
  );
  return href ? (
    <a href={href} className="group flex items-center gap-4">
      {body}
    </a>
  ) : (
    <div className="group flex items-start gap-4">{body}</div>
  );
}

export function ContactPrestige() {
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
  const otherOffices = OFFICES.filter((o) => !o.primary);

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
      id="contact-prestige"
      aria-label="Contact — prestige"
      className="section-py relative overflow-hidden bg-white"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid-faint bg-grid-32 opacity-20 [mask-image:radial-gradient(ellipse_75%_55%_at_50%_25%,black_20%,transparent_75%)]" />
      </div>

      <Container className="relative">
        <SectionHeading
          eyebrow="Contact Us"
          title={
            <>
              <span className="text-navy">Let's build the</span>{' '}
              <span className="text-emerald">next chapter.</span>
            </>
          }
          titleClassName="normal-case !font-normal"
          description={CONTACT.description}
        />

        {/* Elevated split card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.8, ease: EASE_PREMIUM }}
          className="mx-auto mt-12 max-w-6xl overflow-hidden rounded-[2rem] border border-navy-100 bg-white shadow-[0_40px_120px_-40px_rgba(8,33,60,0.30)] lg:mt-16"
        >
          {/* Thin emerald accent */}
          <div aria-hidden="true" className="h-1 w-full bg-emerald-400" />

          <div className="grid lg:grid-cols-5">
            {/* ── Left: contact details ── */}
            <motion.div
              variants={staggerParent(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              className="relative border-b border-navy-100 p-7 sm:p-9 lg:col-span-2 lg:border-b-0 lg:border-r lg:p-10"
            >
              <motion.p
                variants={fadeUp}
                className="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-600"
              >
                Reach us directly
              </motion.p>
              <motion.h3
                variants={fadeUp}
                className="mt-3 text-[clamp(1.35rem,2vw,1.7rem)] font-normal leading-tight text-navy-900"
              >
                A direct line to the executive office.
              </motion.h3>

              <motion.div variants={fadeUp} className="mt-8 space-y-6">
                {primaryOffice && (
                  <>
                    <DetailRow
                      icon={Phone}
                      label="Call us"
                      value={primaryOffice.phone ?? BRAND.phonePrimary}
                      href={`tel:${(primaryOffice.phone ?? BRAND.phonePrimary).replace(/\s/g, '')}`}
                    />
                    <DetailRow
                      icon={Mail}
                      label="Email us"
                      value={BRAND.email}
                      href={`mailto:${BRAND.email}`}
                    />
                    <DetailRow
                      icon={MapPin}
                      label="Headquarters"
                      value={primaryOffice.address ?? 'Melbourne, Australia'}
                    />
                  </>
                )}
              </motion.div>

              <motion.div variants={fadeUp} className="mt-8 border-t border-navy-100 pt-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-navy-400">
                  Also in
                </p>
                <p className="mt-2 text-sm font-medium text-navy-600">
                  {otherOffices.map((o) => o.city).join(' · ')}
                </p>
                <p className="mt-6 inline-flex items-center gap-2.5 text-sm font-medium text-navy-500">
                  <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70 [animation-duration:2.4s]" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  </span>
                  Replies within <span className="font-bold text-navy-800">1 business day</span>
                </p>
              </motion.div>
            </motion.div>

            {/* ── Right: form ── */}
            <div className="p-7 sm:p-9 lg:col-span-3 lg:p-10">
              {status === 'sent' ? (
                <div
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
                  <h3 className="mt-7 text-2xl font-bold text-navy-900 sm:text-3xl">
                    Thank you{form.name ? `, ${form.name.split(' ')[0]}` : ''}
                  </h3>
                  <p className="mt-3 max-w-md text-body-fluid text-navy-500">
                    Your {form.inquiry ? form.inquiry.toLowerCase() : 'inquiry'} is on its way — our
                    executive team will reply within one business day.
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
                                layoutId={reduceMotion ? undefined : 'prestige-inquiry-pill'}
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
                    <div>
                      <label htmlFor="pr-name" className={labelClasses}>
                        Full name <span className="text-emerald-600">*</span>
                      </label>
                      <div className="relative">
                        <User
                          className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-navy-300"
                          aria-hidden="true"
                        />
                        <input
                          id="pr-name"
                          value={form.name}
                          onChange={set('name')}
                          autoComplete="name"
                          placeholder="Jane Doe"
                          className={cn(inputClasses, 'pl-11')}
                        />
                      </div>
                      {errors.name && (
                        <p className="mt-2 text-xs font-medium text-red-600">{errors.name}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="pr-email" className={labelClasses}>
                        Work email <span className="text-emerald-600">*</span>
                      </label>
                      <div className="relative">
                        <Mail
                          className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-navy-300"
                          aria-hidden="true"
                        />
                        <input
                          id="pr-email"
                          type="email"
                          value={form.email}
                          onChange={set('email')}
                          autoComplete="email"
                          placeholder="jane@company.com"
                          className={cn(inputClasses, 'pl-11')}
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-2 text-xs font-medium text-red-600">{errors.email}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="pr-company" className={labelClasses}>
                        Company
                      </label>
                      <div className="relative">
                        <Building2
                          className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-navy-300"
                          aria-hidden="true"
                        />
                        <input
                          id="pr-company"
                          value={form.company}
                          onChange={set('company')}
                          autoComplete="organization"
                          placeholder="Company name"
                          className={cn(inputClasses, 'pl-11')}
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="pr-phone" className={labelClasses}>
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
                      <label htmlFor="pr-message" className={labelClasses}>
                        Message <span className="text-emerald-600">*</span>
                      </label>
                      <textarea
                        id="pr-message"
                        rows={4}
                        value={form.message}
                        onChange={set('message')}
                        placeholder="Share a few details about what you're looking for..."
                        className={cn(inputClasses, 'resize-none leading-relaxed')}
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
                    className="group mt-6 inline-flex min-h-[54px] w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-emerald-400 px-8 py-3.5 text-base font-semibold text-navy-900 shadow-glow-emerald transition-all duration-300 ease-premium hover:bg-emerald-300 hover:shadow-[0_18px_50px_-8px_rgba(60,185,140,0.55)] active:scale-[0.99] disabled:cursor-wait disabled:opacity-70"
                  >
                    {status === 'sending' ? (
                      <>
                        Sending
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      </>
                    ) : (
                      <>
                        {CONTACT.submitLabel}
                        <ArrowRight
                          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
