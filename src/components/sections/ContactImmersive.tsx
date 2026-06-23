import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import type { Application } from '@splinetool/runtime';
import { Check, CheckCircle2, ChevronDown, Loader2, Search, Send } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SplineScene } from '@/components/ui/splite';
import { CONTACT, INQUIRY_TYPES } from '@/data/content';
import { COUNTRIES, flagEmoji } from '@/data/countries';
import type { Country } from '@/data/countries';
import { sendContact } from '@/lib/sendContact';
import { cn } from '@/lib/cn';
import { EASE_PREMIUM } from '@/lib/motion';
import type { InquiryType } from '@/types';

/**
 * "Contact Immersive" — a second, distinct contact experience beneath the
 * primary one. A full-bleed Spline 3D model fills the section while a glass
 * contact form floats over it on the right, so the form overlaps the model.
 *
 * Same form fields as the primary contact section (inquiry chips, name, email,
 * company, phone w/ country, message). The model mounts once and stays mounted
 * (no reload on scroll back) and loops continuously — it never pauses.
 * `renderOnDemand={false}` keeps its animation playing; pixelRatio 2 keeps it
 * crystal-clear on retina.
 */

type Status = 'idle' | 'sending' | 'sent' | 'error';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fieldCls =
  'w-full border-0 border-b border-navy-200 bg-transparent px-0 py-2.5 text-base text-navy-900 outline-none transition-colors duration-200 placeholder:text-navy-300 hover:border-navy-300 focus:border-emerald-400';
const labelCls = 'mb-1 block text-[11px] font-bold uppercase tracking-[0.16em] text-navy-400';

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

export function ContactImmersive() {
  const sectionRef = useRef<HTMLElement>(null);
  const seen = useInView(sectionRef, { once: true, margin: '300px' });
  const visible = useInView(sectionRef, { margin: '0px 0px -10% 0px' });
  const appRef = useRef<Application | null>(null);
  const visibleRef = useRef(visible);
  visibleRef.current = visible;

  const [fullName, setFullName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [inquiryType, setInquiryType] = useState<InquiryType | ''>('');
  const [country, setCountry] = useState<Country>(
    () => COUNTRIES.find((c) => c.iso === 'AU') ?? COUNTRIES[0],
  );
  const [botcheck, setBotcheck] = useState('');
  const [errors, setErrors] = useState<{ fullName?: string; workEmail?: string; message?: string }>(
    {},
  );
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  // Keep the model mounted (no reload) but pause its WebGL loop while it's off
  // screen so it never competes with scrolling elsewhere; resume on return.
  useEffect(() => {
    const app = appRef.current;
    if (!app) return;
    if (visible) app.play();
    else app.stop();
  }, [visible]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const next = {
      fullName: fullName.trim() ? undefined : 'Please enter your name.',
      workEmail: EMAIL_RE.test(workEmail.trim()) ? undefined : 'Enter a valid email.',
      message: message.trim() ? undefined : 'Tell us a little about your needs.',
    };
    setErrors(next);
    if (next.fullName || next.workEmail || next.message) return;

    setStatus('sending');
    try {
      await sendContact({
        fullName: fullName.trim(),
        workEmail: workEmail.trim(),
        company: company.trim(),
        phone: phone.trim() ? `${country.dial} ${phone.trim()}` : '',
        inquiryType: inquiryType || undefined,
        message: message.trim(),
        botcheck,
      });
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      aria-label="Contact — get in touch"
      className="relative overflow-hidden bg-gradient-to-b from-navy-50 to-white"
    >
      {/* ── Spline model — top banner on mobile, full background on desktop ── */}
      <div className="relative h-[42vh] w-full lg:absolute lg:inset-0 lg:h-full">
        {seen && (
          <SplineScene
            scene="https://prod.spline.design/JpTW85oG2Si4fDZ8/scene.splinecode?v=2"
            pixelRatio={2}
            renderOnDemand={false}
            onLoad={(app) => {
              appRef.current = app;
              if (visibleRef.current) app.play();
              else app.stop();
            }}
            className="absolute inset-0 h-full w-full"
          />
        )}
      </div>

      {/* ── Form overlaps the model on the right ── */}
      <Container className="relative">
        <div className="grid items-center gap-8 pb-10 pt-12 lg:min-h-[92vh] lg:grid-cols-2 lg:pb-16 lg:pt-24">
          {/* Left spacer keeps the model visible on desktop */}
          <div aria-hidden="true" className="hidden lg:block" />

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: EASE_PREMIUM }}
            className="relative w-full rounded-[1.75rem] border border-white/70 bg-white/90 p-6 shadow-[0_30px_80px_-20px_rgba(8,33,60,0.45)] backdrop-blur-md sm:p-9 lg:-mr-8 lg:-mt-12 lg:ml-auto lg:max-w-xl"
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
                  <span className="grid h-20 w-20 place-items-center rounded-full bg-emerald-100 text-emerald-600 shadow-glow-emerald">
                    <CheckCircle2 className="h-10 w-10" aria-hidden="true" />
                  </span>
                  <h3 className="mt-7 text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl">
                    Thank you{fullName ? `, ${fullName.split(' ')[0]}` : ''}
                  </h3>
                  <p className="mt-3 max-w-md text-body-fluid text-navy-500">
                    Your {inquiryType ? inquiryType.toLowerCase() : 'inquiry'} has been received. Our
                    executive team will respond within one business day.
                  </p>
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

                  <span className="eyebrow">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Contact Us
                  </span>
                  <h2 className="mt-4 text-[clamp(1.6rem,3vw,2.25rem)] font-normal normal-case leading-[1.12] tracking-[-0.01em] text-navy-900">
                    Let&apos;s start a <span className="text-emerald-500">conversation</span>
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-navy-500">{CONTACT.description}</p>

                  {/* Inquiry — dropdown */}
                  <div className="mt-7">
                    <label htmlFor="ci-inquiry" className={labelCls}>
                      What can we help with?
                    </label>
                    <div className="relative">
                      <select
                        id="ci-inquiry"
                        value={inquiryType}
                        onChange={(e) => setInquiryType(e.target.value as InquiryType | '')}
                        className={cn(
                          fieldCls,
                          'cursor-pointer appearance-none pr-8',
                          inquiryType === '' && 'text-navy-300',
                        )}
                      >
                        <option value="">Select an option</option>
                        {INQUIRY_TYPES.map((type) => (
                          <option key={type} value={type} className="text-navy-900">
                            {type}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        className="pointer-events-none absolute right-1 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400"
                        aria-hidden="true"
                      />
                    </div>
                  </div>

                  {/* Field grid */}
                  <div className="mt-7 grid gap-x-6 gap-y-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="ci-name" className={labelCls}>
                        Full name <span className="text-emerald-600">*</span>
                      </label>
                      <input
                        id="ci-name"
                        autoComplete="name"
                        placeholder="Jane Doe"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
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
                      <label htmlFor="ci-email" className={labelCls}>
                        Work email <span className="text-emerald-600">*</span>
                      </label>
                      <input
                        id="ci-email"
                        type="email"
                        autoComplete="email"
                        placeholder="jane@company.com"
                        value={workEmail}
                        onChange={(e) => setWorkEmail(e.target.value)}
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
                      <label htmlFor="ci-company" className={labelCls}>
                        Company
                      </label>
                      <input
                        id="ci-company"
                        autoComplete="organization"
                        placeholder="Company name"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className={fieldCls}
                      />
                    </div>
                    <div>
                      <span className={labelCls}>Phone</span>
                      <div className="border-b border-navy-200 transition-colors duration-200 focus-within:border-emerald-400">
                        <PhoneField
                          country={country}
                          onCountry={setCountry}
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="mt-6">
                    <label htmlFor="ci-message" className={labelCls}>
                      Your requirements <span className="text-emerald-600">*</span>
                    </label>
                    <textarea
                      id="ci-message"
                      rows={4}
                      placeholder="Share a few details about what you're looking for..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
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
                      className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
                    >
                      Something went wrong. Please try again, or email us directly.
                    </p>
                  )}

                  <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="max-w-xs text-xs leading-relaxed text-navy-400">{CONTACT.consent}</p>
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="group inline-flex min-h-[52px] shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full bg-emerald-400 px-7 py-3.5 text-base font-semibold text-navy-900 shadow-glow-emerald transition-all duration-300 ease-premium hover:bg-emerald-300 active:scale-[0.99] disabled:cursor-wait disabled:opacity-70"
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
        </div>
      </Container>
    </section>
  );
}
