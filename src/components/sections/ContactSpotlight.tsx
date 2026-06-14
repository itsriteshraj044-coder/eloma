import { useState } from 'react';
import type { FormEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CheckCircle2, Clock, Globe2, Loader2, Mail, Phone, Send, ShieldCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { BRAND, CONTACT, INQUIRY_TYPES, OFFICES } from '@/data/content';
import { cn } from '@/lib/cn';
import { EASE_PREMIUM, fadeUp, staggerParent, VIEWPORT_ONCE } from '@/lib/motion';

/**
 * "Contact Spotlight" — a single, centered, elevated inquiry card floating on a
 * soft brand gradient, fronted by three trust stats. Maximum focus, generous
 * whitespace, one clear call to action. White + navy + a single emerald accent.
 */

type Stat = { icon: LucideIcon; value: string; label: string };

const STATS: Stat[] = [
  { icon: Clock, value: '< 1 day', label: 'Avg. response' },
  { icon: Globe2, value: `${OFFICES.length} offices`, label: 'Across Australia' },
  { icon: ShieldCheck, value: 'Direct', label: 'Executive team' },
];

const EMAIL_RE = /^\S+@\S+\.\S+$/;

const inputClasses =
  'w-full rounded-2xl border border-transparent bg-navy-50/60 px-5 py-3.5 text-base text-navy-900 outline-none transition-all duration-200 placeholder:text-navy-300 hover:bg-navy-50 focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-400/25';
const labelClasses = 'mb-2 block text-sm font-semibold text-navy-700';

export function ContactSpotlight() {
  const reduceMotion = useReducedMotion();
  const [form, setForm] = useState({ name: '', email: '', inquiry: '', message: '' });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const primaryOffice = OFFICES.find((o) => o.primary);

  const update = (field: 'name' | 'email' | 'inquiry' | 'message') => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setForm((p) => ({ ...p, [field]: e.target.value }));
    if (field !== 'inquiry' && errors[field]) setErrors((p) => ({ ...p, [field]: undefined }));
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
      id="contact-spotlight"
      aria-label="Contact — spotlight"
      className="section-py relative overflow-hidden bg-white"
    >
      <Container className="relative">
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
            <span className="text-navy-900">Let's talk about</span>{' '}
            <span className="text-emerald-500">what's next.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-xl text-body-fluid text-navy-500">
            {CONTACT.description}
          </motion.p>

          {/* Trust stats */}
          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-stretch justify-center gap-3">
            {STATS.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="flex items-center gap-3 rounded-2xl border border-navy-100 bg-white/80 px-5 py-3 shadow-glass"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                    <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                  </span>
                  <span className="text-left">
                    <span className="block text-base font-bold leading-tight text-navy-900">
                      {stat.value}
                    </span>
                    <span className="block text-xs font-medium text-navy-400">{stat.label}</span>
                  </span>
                </div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Elevated card */}
        <motion.div
          initial={{ opacity: 0, y: 32, scale: reduceMotion ? 1 : 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.7, ease: EASE_PREMIUM }}
          className="mx-auto mt-10 max-w-2xl rounded-[1.75rem] border border-navy-100 bg-white/90 p-6 shadow-[0_30px_80px_-30px_rgba(16,42,67,0.25)] sm:p-9 lg:mt-12"
        >
          {status === 'sent' ? (
            <div role="status" className="flex flex-col items-center py-8 text-center">
              <span className="grid h-18 w-18 place-items-center rounded-full bg-emerald-100 p-4 text-emerald-600 shadow-glow-emerald">
                <CheckCircle2 className="h-9 w-9" aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-2xl font-bold text-navy-900">
                Thank you{form.name ? `, ${form.name.split(' ')[0]}` : ''}
              </h3>
              <p className="mt-2 max-w-md text-body-fluid text-navy-500">
                Your message has reached our executive team. Expect a reply within one business day.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="sp-name" className={labelClasses}>
                    Full name <span className="text-emerald-600">*</span>
                  </label>
                  <input
                    id="sp-name"
                    value={form.name}
                    onChange={update('name')}
                    autoComplete="name"
                    placeholder="Jane Doe"
                    className={inputClasses}
                  />
                  {errors.name && <p className="mt-2 text-xs font-medium text-red-600">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="sp-email" className={labelClasses}>
                    Work email <span className="text-emerald-600">*</span>
                  </label>
                  <input
                    id="sp-email"
                    type="email"
                    value={form.email}
                    onChange={update('email')}
                    autoComplete="email"
                    placeholder="jane@company.com"
                    className={inputClasses}
                  />
                  {errors.email && <p className="mt-2 text-xs font-medium text-red-600">{errors.email}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="sp-inquiry" className={labelClasses}>
                    Reason for contact
                  </label>
                  <select
                    id="sp-inquiry"
                    value={form.inquiry}
                    onChange={update('inquiry')}
                    className={cn(inputClasses, 'cursor-pointer appearance-none bg-[length:18px] bg-[right_1.25rem_center] bg-no-repeat pr-12')}
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2389a' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")",
                    }}
                  >
                    <option value="">Select a topic (optional)</option>
                    {INQUIRY_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="sp-message" className={labelClasses}>
                    Message <span className="text-emerald-600">*</span>
                  </label>
                  <textarea
                    id="sp-message"
                    rows={5}
                    value={form.message}
                    onChange={update('message')}
                    placeholder="Share a few details about what you're looking for..."
                    className={cn(inputClasses, 'resize-none leading-relaxed')}
                  />
                  {errors.message && (
                    <p className="mt-2 text-xs font-medium text-red-600">{errors.message}</p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="group mt-7 inline-flex min-h-[52px] w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-emerald-400 px-8 py-3.5 text-base font-semibold text-navy-900 shadow-glow-emerald transition-all duration-300 ease-premium hover:bg-emerald-300 active:scale-[0.99] disabled:cursor-wait disabled:opacity-70"
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

              {/* Direct lines under the card */}
              {primaryOffice && (
                <div className="mt-7 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 border-t border-navy-100 pt-6 text-sm">
                  <a
                    href={`tel:${primaryOffice.phone?.replace(/\s/g, '')}`}
                    className="group inline-flex items-center gap-2 font-semibold text-navy-700 transition-colors duration-200 hover:text-emerald-600"
                  >
                    <Phone className="h-4 w-4 text-emerald-500" aria-hidden="true" />
                    {primaryOffice.phone}
                  </a>
                  <a
                    href={`mailto:${BRAND.email}`}
                    className="group inline-flex items-center gap-2 font-semibold text-navy-700 transition-colors duration-200 hover:text-emerald-600"
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
