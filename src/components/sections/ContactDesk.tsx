import { useEffect, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, Loader2, Mail, Phone, Send } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CONTACT, INQUIRY_TYPES, OFFICES } from '@/data/content';
import { cn } from '@/lib/cn';
import { EASE_PREMIUM, fadeUp, staggerParent, VIEWPORT_ONCE } from '@/lib/motion';
import type { ContactFormState } from '@/types';

/**
 * "Contact Desk" — the inquiry form reimagined as an official group document.
 * Same family as the schematic/transit survivors: corner-ticked sheet, mono
 * numbered field labels, underline-only inputs whose rule lights up emerald
 * on focus, a live Melbourne HQ clock in the document header, direct lines
 * rendered as ledger rows, offices as a route line, and a stamped RECEIVED
 * state on submit. White + navy + single emerald accent — no dark panels,
 * no boxed cards.
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
type Status = 'idle' | 'sending' | 'sent';

const EMAIL_RE = /^\S+@\S+\.\S+$/;

function validateField(field: keyof ContactFormState, value: string): string | undefined {
  if (field === 'fullName' && !value.trim()) return 'Please enter your full name.';
  if (field === 'workEmail') {
    if (!value.trim()) return 'Please enter your work email.';
    if (!EMAIL_RE.test(value.trim())) return 'Enter a valid email address.';
  }
  if (field === 'message' && !value.trim()) return 'Please share a few details about your requirements.';
  return undefined;
}

const REQUIRED_FIELDS: (keyof ContactFormState)[] = ['fullName', 'workEmail', 'message'];

/** Mono document label: "01 / FULL NAME *" */
function FieldLabel({
  htmlFor,
  index,
  children,
  required,
}: {
  htmlFor: string;
  index: string;
  children: string;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="flex items-baseline gap-2 font-mono text-eyebrow-fluid font-bold uppercase text-navy-400"
    >
      <span className="text-emerald-500">{index}</span>
      <span className="tracking-[0.18em]">{children}</span>
      {required && (
        <span className="text-emerald-600" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
}

/** Underline-only input wrapper — the rule lights up emerald on focus. */
function UnderlineField({ error, children }: { error?: string; children: ReactNode }) {
  return (
    <div className="relative">
      {children}
      <span
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute bottom-0 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-emerald-400 transition-transform duration-300 ease-premium',
          error ? 'scale-x-100 bg-red-500' : 'peer-focus:scale-x-100',
        )}
      />
    </div>
  );
}

const underlineInputClasses =
  'peer w-full border-0 border-b border-navy-200/80 bg-transparent px-0 py-3 text-base text-navy-900 outline-none transition-colors duration-200 placeholder:text-navy-300 focus:border-navy-200/80 3xl:py-4';

function useMelbourneTime() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-AU', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Australia/Melbourne',
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

export function ContactDesk() {
  const reduceMotion = useReducedMotion();
  const [form, setForm] = useState<ContactFormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [reference] = useState(
    () => `ELG-${new Date().getFullYear()}-${String(Math.floor(1000 + Math.random() * 9000))}`,
  );
  const melbourneTime = useMelbourneTime();

  const update =
    (field: keyof ContactFormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const blurValidate = (field: keyof ContactFormState) => () =>
    setErrors((prev) => ({ ...prev, [field]: validateField(field, form[field]) }));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next: FieldErrors = {};
    for (const field of REQUIRED_FIELDS) {
      const msg = validateField(field, form[field]);
      if (msg) next[field] = msg;
    }
    setErrors(next);
    if (Object.values(next).some(Boolean)) return;
    // Front-end only demo — wire to your endpoint here.
    setStatus('sending');
    window.setTimeout(() => setStatus('sent'), 900);
  };

  const primaryOffice = OFFICES.find((o) => o.primary);
  const otherOffices = OFFICES.filter((o) => !o.primary);

  return (
    <section
      id="contact-desk"
      aria-label="Contact — inquiry desk"
      className="section-py relative overflow-hidden bg-white"
    >
      {/* Faint drafting grid, fading toward the edges */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid-faint bg-grid-32 opacity-30 [mask-image:radial-gradient(ellipse_85%_75%_at_50%_40%,black_25%,transparent_80%)]"
      />

      <Container className="relative">
        <SectionHeading
          eyebrow="Contact Us"
          title={CONTACT.heading}
          description={CONTACT.description}
        />

        <div className="mt-14 grid gap-14 xl:grid-cols-12 xl:gap-10 3xl:mt-16 4xl:mt-20">
          {/* ── Direct lines + route ── */}
          <motion.div
            variants={staggerParent(0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            className="flex flex-col xl:col-span-5 3xl:col-span-4"
          >
            <motion.p
              variants={fadeUp}
              className="font-mono text-eyebrow-fluid font-bold uppercase tracking-[0.22em] text-navy-400"
            >
              Direct lines
            </motion.p>

            {/* Ledger rows — phone / email */}
            {primaryOffice && (
              <div className="mt-4 border-t border-navy-100">
                <motion.a
                  variants={fadeUp}
                  href={`tel:${primaryOffice.phone?.replace(/\s/g, '')}`}
                  className="group flex min-h-[64px] items-center justify-between gap-4 border-b border-navy-100 py-5 transition-colors duration-200 hover:border-emerald-300 3xl:min-h-[72px] 3xl:py-6"
                >
                  <span className="flex items-center gap-4">
                    <Phone className="h-4 w-4 shrink-0 text-emerald-500 3xl:h-5 3xl:w-5" aria-hidden="true" />
                    <span className="text-lg font-semibold tracking-tight text-navy-900 transition-colors duration-200 group-hover:text-emerald-600 sm:text-xl">
                      {primaryOffice.phone}
                    </span>
                  </span>
                  <ArrowUpRight
                    className="h-4 w-4 shrink-0 text-navy-300 transition-all duration-300 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-emerald-500"
                    aria-hidden="true"
                  />
                </motion.a>
                <motion.a
                  variants={fadeUp}
                  href={`mailto:${primaryOffice.email}`}
                  className="group flex min-h-[64px] items-center justify-between gap-4 border-b border-navy-100 py-5 transition-colors duration-200 hover:border-emerald-300 3xl:min-h-[72px] 3xl:py-6"
                >
                  <span className="flex min-w-0 items-center gap-4">
                    <Mail className="h-4 w-4 shrink-0 text-emerald-500 3xl:h-5 3xl:w-5" aria-hidden="true" />
                    <span className="truncate text-lg font-semibold tracking-tight text-navy-900 transition-colors duration-200 group-hover:text-emerald-600 sm:text-xl">
                      {primaryOffice.email}
                    </span>
                  </span>
                  <ArrowUpRight
                    className="h-4 w-4 shrink-0 text-navy-300 transition-all duration-300 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-emerald-500"
                    aria-hidden="true"
                  />
                </motion.a>
              </div>
            )}

            {/* Office route line */}
            <motion.p
              variants={fadeUp}
              className="mt-12 font-mono text-eyebrow-fluid font-bold uppercase tracking-[0.22em] text-navy-400"
            >
              Offices · Australia
            </motion.p>

            <div className="relative mt-5 pl-7">
              {/* Route rule — draws in on view */}
              <motion.span
                aria-hidden="true"
                className="absolute bottom-3 left-[5px] top-2 w-px origin-top bg-navy-200 will-change-transform"
                initial={{ scaleY: reduceMotion ? 1 : 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: 1, ease: EASE_PREMIUM }}
              />

              {/* HQ stop */}
              {primaryOffice && (
                <motion.div variants={fadeUp} className="relative pb-7">
                  <span
                    aria-hidden="true"
                    className="absolute -left-7 top-1.5 grid h-[11px] w-[11px] place-items-center rounded-full bg-emerald-400 ring-4 ring-emerald-100"
                  />
                  <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="text-lg font-bold tracking-tight text-navy-900">
                      {primaryOffice.city.split(',')[0]}
                    </span>
                    <span className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-emerald-600">
                      Headquarters
                    </span>
                  </p>
                  <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-navy-500">
                    {primaryOffice.address}
                  </p>
                </motion.div>
              )}

              {/* Other stops */}
              {otherOffices.map((office) => (
                <motion.div key={office.city} variants={fadeUp} className="relative pb-5 last:pb-0">
                  <span
                    aria-hidden="true"
                    className="absolute -left-7 top-[7px] h-[9px] w-[9px] rounded-full border-2 border-navy-300 bg-white"
                  />
                  <p className="text-base font-medium text-navy-700">{office.city}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Document sheet ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.7, ease: EASE_PREMIUM }}
            className="relative xl:col-span-7 3xl:col-span-8"
          >
            {/* Corner ticks — drawing-office frame instead of a boxed card */}
            {(
              [
                'left-0 top-0 border-l-2 border-t-2',
                'right-0 top-0 border-r-2 border-t-2',
                'left-0 bottom-0 border-l-2 border-b-2',
                'right-0 bottom-0 border-r-2 border-b-2',
              ] as const
            ).map((corner) => (
              <span
                key={corner}
                aria-hidden="true"
                className={cn('pointer-events-none absolute z-10 h-5 w-5 border-navy-200', corner)}
              />
            ))}

            <div className="px-5 py-6 sm:px-9 sm:py-8 3xl:px-12 3xl:py-10">
              {/* Document header */}
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-navy-900/90 pb-4">
                <p className="font-mono text-eyebrow-fluid font-bold uppercase tracking-[0.22em] text-navy-900">
                  Eloma Group — Inquiry Form
                </p>
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-navy-400">
                  Ref {reference}
                  {melbourneTime && (
                    <>
                      <span aria-hidden="true" className="mx-2 text-navy-200">
                        ·
                      </span>
                      Melbourne HQ {melbourneTime} AEST
                    </>
                  )}
                </p>
              </div>

              {status === 'sent' ? (
                /* ── Stamped RECEIVED state ── */
                <div
                  className="flex min-h-[clamp(320px,34vw,460px)] flex-col items-center justify-center py-12 text-center"
                  role="status"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: reduceMotion ? 1 : 1.4, rotate: -8 }}
                    animate={{ opacity: 1, scale: 1, rotate: -8 }}
                    transition={{ duration: 0.45, ease: EASE_PREMIUM }}
                    className="rounded-lg border-[3px] border-emerald-500/80 px-7 py-3"
                  >
                    <p className="flex items-center gap-2.5 font-mono text-xl font-bold uppercase tracking-[0.3em] text-emerald-600 sm:text-2xl">
                      <CheckCircle2 className="h-6 w-6 shrink-0" aria-hidden="true" />
                      Received
                    </p>
                  </motion.div>
                  <p className="mt-8 font-mono text-xs uppercase tracking-[0.18em] text-navy-400">
                    Ref {reference}
                  </p>
                  <h3 className="mt-3 text-2xl font-bold tracking-tight text-navy-900">
                    Thank you, {form.fullName.split(' ')[0]}
                  </h3>
                  <p className="mt-3 max-w-sm text-body-fluid text-navy-500">
                    Your inquiry has been logged. Our executive team will respond within one
                    business day.
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
                  <div>
                    <FieldLabel htmlFor="desk-fullName" index="01" required>
                      Full name
                    </FieldLabel>
                    <UnderlineField error={errors.fullName}>
                      <input
                        id="desk-fullName"
                        type="text"
                        required
                        autoComplete="name"
                        value={form.fullName}
                        onChange={update('fullName')}
                        onBlur={blurValidate('fullName')}
                        aria-invalid={Boolean(errors.fullName)}
                        aria-describedby={errors.fullName ? 'desk-fullName-error' : undefined}
                        className={underlineInputClasses}
                        placeholder="Jane Doe"
                      />
                    </UnderlineField>
                    {errors.fullName && (
                      <p id="desk-fullName-error" role="alert" className="mt-2 text-xs font-medium text-red-600">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <FieldLabel htmlFor="desk-workEmail" index="02" required>
                      Work email
                    </FieldLabel>
                    <UnderlineField error={errors.workEmail}>
                      <input
                        id="desk-workEmail"
                        type="email"
                        required
                        autoComplete="email"
                        value={form.workEmail}
                        onChange={update('workEmail')}
                        onBlur={blurValidate('workEmail')}
                        aria-invalid={Boolean(errors.workEmail)}
                        aria-describedby={errors.workEmail ? 'desk-workEmail-error' : undefined}
                        className={underlineInputClasses}
                        placeholder="jane@company.com"
                      />
                    </UnderlineField>
                    {errors.workEmail && (
                      <p id="desk-workEmail-error" role="alert" className="mt-2 text-xs font-medium text-red-600">
                        {errors.workEmail}
                      </p>
                    )}
                  </div>

                  <div>
                    <FieldLabel htmlFor="desk-company" index="03">
                      Company
                    </FieldLabel>
                    <UnderlineField>
                      <input
                        id="desk-company"
                        type="text"
                        autoComplete="organization"
                        value={form.company}
                        onChange={update('company')}
                        className={underlineInputClasses}
                        placeholder="Company name"
                      />
                    </UnderlineField>
                  </div>

                  <div>
                    <FieldLabel htmlFor="desk-phone" index="04">
                      Phone
                    </FieldLabel>
                    <UnderlineField>
                      <input
                        id="desk-phone"
                        type="tel"
                        autoComplete="tel"
                        value={form.phone}
                        onChange={update('phone')}
                        className={underlineInputClasses}
                        placeholder="+61 ..."
                      />
                    </UnderlineField>
                  </div>

                  {/* Inquiry type — segmented chips instead of a native select */}
                  <fieldset className="sm:col-span-2">
                    <legend className="flex items-baseline gap-2 font-mono text-eyebrow-fluid font-bold uppercase text-navy-400">
                      <span className="text-emerald-500">05</span>
                      <span className="tracking-[0.18em]">Inquiry type</span>
                    </legend>
                    <div className="mt-3.5 flex flex-wrap gap-2.5">
                      {INQUIRY_TYPES.map((type) => {
                        const active = form.inquiryType === type;
                        return (
                          <button
                            key={type}
                            type="button"
                            aria-pressed={active}
                            onClick={() =>
                              setForm((prev) => ({ ...prev, inquiryType: active ? '' : type }))
                            }
                            className={cn(
                              'min-h-[44px] cursor-pointer rounded-full border px-5 py-2.5 text-sm font-medium transition-colors duration-200',
                              active
                                ? 'border-emerald-400 bg-emerald-50 text-emerald-700'
                                : 'border-navy-200/80 bg-white text-navy-600 hover:border-navy-300 hover:text-navy-900',
                            )}
                          >
                            {type}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>

                  <div className="sm:col-span-2">
                    <FieldLabel htmlFor="desk-message" index="06" required>
                      Tell us about your requirements
                    </FieldLabel>
                    <UnderlineField error={errors.message}>
                      <textarea
                        id="desk-message"
                        required
                        rows={4}
                        value={form.message}
                        onChange={update('message')}
                        onBlur={blurValidate('message')}
                        aria-invalid={Boolean(errors.message)}
                        aria-describedby={errors.message ? 'desk-message-error' : undefined}
                        className={cn(underlineInputClasses, 'resize-none leading-relaxed')}
                        placeholder="Share a few details about what you're looking for..."
                      />
                    </UnderlineField>
                    {errors.message && (
                      <p id="desk-message-error" role="alert" className="mt-2 text-xs font-medium text-red-600">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <p className="text-xs leading-relaxed text-navy-400 sm:col-span-2">
                    {CONTACT.consent}
                  </p>

                  <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="group inline-flex min-h-[52px] cursor-pointer items-center justify-center gap-2 rounded-full bg-emerald-400 px-8 py-3.5 text-base font-semibold text-navy-900 shadow-glow-emerald transition-all duration-300 ease-premium hover:bg-emerald-300 hover:shadow-[0_18px_50px_-8px_rgba(60,185,140,0.55)] active:scale-[0.99] disabled:cursor-wait disabled:opacity-70 3xl:px-10 3xl:py-4"
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
                    <p className="font-mono text-xs uppercase tracking-[0.16em] text-navy-400">
                      Response within one business day
                    </p>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
