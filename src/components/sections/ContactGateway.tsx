import { useState } from 'react';
import type { FormEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Check,
  CheckCircle2,
  Handshake,
  LineChart,
  Loader2,
  Mail,
  MessageSquare,
  MonitorSmartphone,
  Newspaper,
  Phone,
  Send,
  Truck,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CONTACT, INQUIRY_TYPES, OFFICES } from '@/data/content';
import { cn } from '@/lib/cn';
import { EASE_PREMIUM, fadeUp, staggerParent, VIEWPORT_ONCE } from '@/lib/motion';
import type { ContactFormState, InquiryType } from '@/types';

/**
 * "Contact Gateway" — guided three-step inquiry experience modeled on the
 * enterprise-gateway pattern used by premium B2B sites: path selection first
 * ("What would you like to discuss?"), then identity, then the message — one
 * focused question per step with a progress rail, instead of a wall of
 * fields. Split layout: typographic intro + direct lines on the left, the
 * guided form floating on the light gradient on the right. White + navy +
 * single emerald accent.
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

const STEPS = ['Inquiry', 'Details', 'Message'] as const;

const INQUIRY_ICONS: Record<string, LucideIcon> = {
  'Partnership opportunity': Handshake,
  'Logistics services': Truck,
  'Digital solutions': MonitorSmartphone,
  'Investor relations': LineChart,
  'Media inquiry': Newspaper,
  Careers: Briefcase,
  Other: MessageSquare,
};

const filledInputClasses =
  'w-full rounded-2xl border border-transparent bg-navy-50/70 px-5 py-3.5 text-base text-navy-900 outline-none transition-all duration-200 placeholder:text-navy-300 hover:bg-navy-50 focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-400/25 3xl:px-6 3xl:py-4';

const labelClasses = 'mb-2 block text-sm font-semibold text-navy-700';

function validateField(field: keyof ContactFormState, value: string): string | undefined {
  if (field === 'fullName' && !value.trim()) return 'Please enter your full name.';
  if (field === 'workEmail') {
    if (!value.trim()) return 'Please enter your work email.';
    if (!EMAIL_RE.test(value.trim())) return 'Enter a valid email address.';
  }
  if (field === 'message' && !value.trim()) return 'Please share a few details about your requirements.';
  return undefined;
}

function FieldError({ id, children }: { id: string; children: string }) {
  return (
    <p id={id} role="alert" className="mt-2 text-xs font-medium text-red-600">
      {children}
    </p>
  );
}

export function ContactGateway() {
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<ContactFormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>('idle');

  const update =
    (field: keyof ContactFormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const blurValidate = (field: keyof ContactFormState) => () =>
    setErrors((prev) => ({ ...prev, [field]: validateField(field, form[field]) }));

  const chooseInquiry = (type: InquiryType) => {
    setForm((prev) => ({ ...prev, inquiryType: type }));
    // Brief pause so the selection state is visible before advancing.
    window.setTimeout(() => setStep(1), reduceMotion ? 0 : 260);
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

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const msg = validateField('message', form.message);
    setErrors((prev) => ({ ...prev, message: msg }));
    if (msg) return;
    // Front-end only demo — wire to your endpoint here.
    setStatus('sending');
    window.setTimeout(() => setStatus('sent'), 900);
  };

  const primaryOffice = OFFICES.find((o) => o.primary);
  const otherOffices = OFFICES.filter((o) => !o.primary);

  const stepMotion = {
    initial: { opacity: 0, x: reduceMotion ? 0 : 36 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: reduceMotion ? 0 : -36 },
    transition: { duration: 0.45, ease: EASE_PREMIUM },
  };

  return (
    <section
      id="contact-gateway"
      aria-label="Contact — guided inquiry"
      className="section-py relative overflow-hidden bg-white"
    >
      {/* Soft brand gradient wash */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-mesh-light" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-1/4 h-[480px] w-[480px] rounded-full bg-emerald-100/40 blur-3xl"
      />

      <Container className="relative">
        <div className="grid gap-14 xl:grid-cols-12 xl:gap-16 3xl:gap-20">
          {/* ── Intro + direct lines ── */}
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
                  <span className="text-emerald">Connect with</span>{' '}
                  <span className="text-navy">the Eloma Group</span>
                </>
              }
              titleClassName="normal-case !font-normal"
              description={CONTACT.description}
            />

            <motion.div variants={fadeUp} className="mt-10 space-y-3 3xl:mt-12">
              {primaryOffice && (
                <>
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
                </>
              )}
            </motion.div>

            {primaryOffice && (
              <motion.div variants={fadeUp} className="mt-10 border-t border-navy-100 pt-7">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-navy-400">
                  Headquarters
                </p>
                <p className="mt-2.5 max-w-xs text-sm leading-relaxed text-navy-600">
                  {primaryOffice.address}
                </p>
                <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-navy-400">
                  Also in
                </p>
                <p className="mt-2.5 text-sm font-medium text-navy-600">
                  {otherOffices.map((o) => o.city).join(' · ')}
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* ── Guided inquiry ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.7, ease: EASE_PREMIUM }}
            className="xl:col-span-7"
          >
            {status === 'sent' ? (
              <div
                role="status"
                className="flex min-h-[480px] flex-col items-center justify-center text-center"
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
              </div>
            ) : (
              <>
                {/* Progress rail */}
                <ol className="flex items-center gap-3 sm:gap-4" aria-label="Inquiry progress">
                  {STEPS.map((label, i) => {
                    const isDone = i < step;
                    const isCurrent = i === step;
                    return (
                      <li key={label} className={cn('flex items-center gap-3 sm:gap-4', i > 0 && 'flex-1')}>
                        {i > 0 && (
                          <span aria-hidden="true" className="relative h-px flex-1 overflow-hidden bg-navy-100">
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
                            'flex min-h-[44px] items-center gap-2.5 rounded-full py-1 pr-1 transition-colors duration-200',
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

                {/* Step content — fixed min-height so the page never jumps */}
                <form onSubmit={onSubmit} noValidate className="mt-10 min-h-[440px] sm:min-h-[420px]">
                  <AnimatePresence mode="wait" initial={false}>
                    {step === 0 && (
                      <motion.div key="step-inquiry" {...stepMotion}>
                        <h3 className="text-2xl font-normal tracking-tight text-navy-900 sm:text-3xl">
                          What would you like to discuss?
                        </h3>
                        <p className="mt-2 text-body-fluid text-navy-500">
                          Choose a path and we'll route you to the right team.
                        </p>
                        <div className="mt-8 grid gap-3 sm:grid-cols-2">
                          {INQUIRY_TYPES.map((type) => {
                            const Icon = INQUIRY_ICONS[type] ?? MessageSquare;
                            const active = form.inquiryType === type;
                            return (
                              <button
                                key={type}
                                type="button"
                                onClick={() => chooseInquiry(type)}
                                aria-pressed={active}
                                className={cn(
                                  'group flex min-h-[64px] cursor-pointer items-center gap-4 rounded-2xl border px-5 py-4 text-left transition-all duration-200',
                                  active
                                    ? 'border-emerald-400 bg-emerald-50/80 shadow-glow-emerald'
                                    : 'border-navy-100 bg-white/80 hover:border-emerald-300 hover:bg-white hover:shadow-glass',
                                )}
                              >
                                <span
                                  className={cn(
                                    'grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-colors duration-200',
                                    active
                                      ? 'bg-emerald-400 text-navy-900'
                                      : 'bg-navy-50 text-navy-500 group-hover:bg-emerald-50 group-hover:text-emerald-600',
                                  )}
                                >
                                  <Icon className="h-5 w-5" aria-hidden="true" />
                                </span>
                                <span className="flex-1 text-base font-semibold text-navy-800">
                                  {type}
                                </span>
                                <ArrowRight
                                  className={cn(
                                    'h-4 w-4 shrink-0 transition-all duration-300 ease-premium',
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
                        <h3 className="text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl">
                          Tell us who you are
                        </h3>
                        <p className="mt-2 text-body-fluid text-navy-500">
                          {form.inquiryType
                            ? `${form.inquiryType} — a few details so the right people reach out.`
                            : 'A few details so the right people reach out.'}
                        </p>
                        <div className="mt-8 grid gap-5 sm:grid-cols-2">
                          <div>
                            <label htmlFor="gw-fullName" className={labelClasses}>
                              Full name <span className="text-emerald-600">*</span>
                            </label>
                            <input
                              id="gw-fullName"
                              type="text"
                              required
                              autoComplete="name"
                              value={form.fullName}
                              onChange={update('fullName')}
                              onBlur={blurValidate('fullName')}
                              aria-invalid={Boolean(errors.fullName)}
                              aria-describedby={errors.fullName ? 'gw-fullName-error' : undefined}
                              className={filledInputClasses}
                              placeholder="Jane Doe"
                            />
                            {errors.fullName && (
                              <FieldError id="gw-fullName-error">{errors.fullName}</FieldError>
                            )}
                          </div>
                          <div>
                            <label htmlFor="gw-workEmail" className={labelClasses}>
                              Work email <span className="text-emerald-600">*</span>
                            </label>
                            <input
                              id="gw-workEmail"
                              type="email"
                              required
                              autoComplete="email"
                              value={form.workEmail}
                              onChange={update('workEmail')}
                              onBlur={blurValidate('workEmail')}
                              aria-invalid={Boolean(errors.workEmail)}
                              aria-describedby={errors.workEmail ? 'gw-workEmail-error' : undefined}
                              className={filledInputClasses}
                              placeholder="jane@company.com"
                            />
                            {errors.workEmail && (
                              <FieldError id="gw-workEmail-error">{errors.workEmail}</FieldError>
                            )}
                          </div>
                          <div>
                            <label htmlFor="gw-company" className={labelClasses}>
                              Company
                            </label>
                            <input
                              id="gw-company"
                              type="text"
                              autoComplete="organization"
                              value={form.company}
                              onChange={update('company')}
                              className={filledInputClasses}
                              placeholder="Company name"
                            />
                          </div>
                          <div>
                            <label htmlFor="gw-phone" className={labelClasses}>
                              Phone
                            </label>
                            <input
                              id="gw-phone"
                              type="tel"
                              autoComplete="tel"
                              value={form.phone}
                              onChange={update('phone')}
                              className={filledInputClasses}
                              placeholder="+61 ..."
                            />
                          </div>
                        </div>
                        <div className="mt-9 flex items-center justify-between gap-4">
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
                        <h3 className="text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl">
                          What can we help with?
                        </h3>
                        <p className="mt-2 text-body-fluid text-navy-500">
                          Share a few details and our executive team will take it from here.
                        </p>
                        <div className="mt-8">
                          <label htmlFor="gw-message" className={labelClasses}>
                            Your requirements <span className="text-emerald-600">*</span>
                          </label>
                          <textarea
                            id="gw-message"
                            required
                            rows={6}
                            value={form.message}
                            onChange={update('message')}
                            onBlur={blurValidate('message')}
                            aria-invalid={Boolean(errors.message)}
                            aria-describedby={errors.message ? 'gw-message-error' : undefined}
                            className={cn(filledInputClasses, 'resize-none leading-relaxed')}
                            placeholder="Share a few details about what you're looking for..."
                          />
                          {errors.message && (
                            <FieldError id="gw-message-error">{errors.message}</FieldError>
                          )}
                        </div>
                        <p className="mt-5 text-xs leading-relaxed text-navy-400">
                          {CONTACT.consent}
                        </p>
                        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
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
                </form>
              </>
            )}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
