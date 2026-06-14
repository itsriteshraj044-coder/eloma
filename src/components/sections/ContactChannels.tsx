import { useState } from 'react';
import type { FormEvent } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Briefcase,
  CheckCircle2,
  Handshake,
  LineChart,
  Loader2,
  MonitorSmartphone,
  Newspaper,
  Send,
  Truck,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { BRAND, CONTACT } from '@/data/content';
import { cn } from '@/lib/cn';
import { EASE_PREMIUM, fadeUp, staggerParent, VIEWPORT_ONCE } from '@/lib/motion';

/**
 * "Contact Channels" — intent-based routing first. A grid of department
 * channels (the pattern premium B2B sites use to cut friction) each with a
 * direct, subject-prefilled mailto, followed by one compact catch-all message
 * form. White + navy + a single emerald accent.
 */

type Channel = { title: string; desc: string; icon: LucideIcon };

const CHANNELS: Channel[] = [
  { title: 'Partnerships', desc: 'Joint ventures and strategic alliances.', icon: Handshake },
  { title: 'Logistics services', desc: 'Freight, transport and supply chain.', icon: Truck },
  { title: 'Digital solutions', desc: 'Technology, platforms and product.', icon: MonitorSmartphone },
  { title: 'Investor relations', desc: 'Group performance and opportunities.', icon: LineChart },
  { title: 'Media & press', desc: 'Interviews, assets and statements.', icon: Newspaper },
  { title: 'Careers', desc: 'Join a team across five verticals.', icon: Briefcase },
];

const EMAIL_RE = /^\S+@\S+\.\S+$/;
const mailtoFor = (subject: string) =>
  `mailto:${BRAND.email}?subject=${encodeURIComponent(`${subject} — Eloma Group`)}`;

const inputClasses =
  'w-full rounded-2xl border border-transparent bg-navy-50/60 px-5 py-3.5 text-base text-navy-900 outline-none transition-all duration-200 placeholder:text-navy-300 hover:bg-navy-50 focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-400/25';

export function ContactChannels() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const update = (field: 'name' | 'email' | 'message') => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((p) => ({ ...p, [field]: e.target.value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: undefined }));
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
      id="contact-channels"
      aria-label="Contact — channels"
      className="section-py relative overflow-hidden bg-white"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid-faint bg-grid-32 opacity-30 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]" />
      </div>

      <Container className="relative">
        <SectionHeading
          eyebrow="Contact Us"
          title={
            <>
              <span className="text-navy">Reach the right</span>{' '}
              <span className="text-emerald">team faster</span>
            </>
          }
          titleClassName="normal-case !font-normal"
          description="Pick the channel that fits — or send a general message and we'll route it for you."
        />

        {/* Channel routing grid */}
        <motion.div
          variants={staggerParent(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:mt-16"
        >
          {CHANNELS.map((channel) => {
            const Icon = channel.icon;
            return (
              <motion.a
                key={channel.title}
                variants={fadeUp}
                href={mailtoFor(channel.title)}
                className="group flex flex-col rounded-[1.5rem] border border-navy-100 bg-white/80 p-6 transition-all duration-300 ease-premium hover:-translate-y-1 hover:border-emerald-200 hover:shadow-glass"
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-50 text-emerald-600 transition-colors duration-300 group-hover:bg-emerald-100">
                    <Icon className="h-[22px] w-[22px]" aria-hidden="true" />
                  </span>
                  <ArrowUpRight
                    className="h-5 w-5 text-navy-200 transition-all duration-300 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-emerald-500"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-navy-900">{channel.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-navy-500">{channel.desc}</p>
                <span className="mt-4 truncate text-sm font-semibold text-emerald-600">
                  {BRAND.email}
                </span>
              </motion.a>
            );
          })}
        </motion.div>

        {/* Compact catch-all form */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.7, ease: EASE_PREMIUM }}
          className="mx-auto mt-10 max-w-3xl rounded-[1.75rem] border border-navy-100 bg-white/90 p-6 shadow-glass sm:p-8 lg:mt-14"
        >
          {status === 'sent' ? (
            <div role="status" className="flex flex-col items-center py-6 text-center">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-600 shadow-glow-emerald">
                <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-2xl font-bold text-navy-900">Message sent</h3>
              <p className="mt-2 max-w-md text-body-fluid text-navy-500">
                Thanks{form.name ? `, ${form.name.split(' ')[0]}` : ''} — our team will respond
                within one business day.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate>
              <h3 className="text-xl font-bold text-navy-900">Or send a general message</h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <input
                    aria-label="Your name"
                    value={form.name}
                    onChange={update('name')}
                    placeholder="Your name"
                    className={inputClasses}
                  />
                  {errors.name && <p className="mt-2 text-xs font-medium text-red-600">{errors.name}</p>}
                </div>
                <div>
                  <input
                    type="email"
                    aria-label="Your email"
                    value={form.email}
                    onChange={update('email')}
                    placeholder="Your email"
                    className={inputClasses}
                  />
                  {errors.email && <p className="mt-2 text-xs font-medium text-red-600">{errors.email}</p>}
                </div>
                <div className="sm:col-span-2">
                  <textarea
                    aria-label="Your message"
                    rows={4}
                    value={form.message}
                    onChange={update('message')}
                    placeholder="How can we help?"
                    className={cn(inputClasses, 'resize-none leading-relaxed')}
                  />
                  {errors.message && (
                    <p className="mt-2 text-xs font-medium text-red-600">{errors.message}</p>
                  )}
                </div>
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <p className="text-xs leading-relaxed text-navy-400">{CONTACT.consent}</p>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="group inline-flex min-h-[52px] cursor-pointer items-center justify-center gap-2 rounded-full bg-emerald-400 px-8 py-3.5 text-base font-semibold text-navy-900 shadow-glow-emerald transition-all duration-300 ease-premium hover:bg-emerald-300 active:scale-[0.99] disabled:cursor-wait disabled:opacity-70"
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
            </form>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
