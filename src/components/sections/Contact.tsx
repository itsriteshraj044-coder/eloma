import { useState } from 'react';
import type { FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Building2, CheckCircle2, Mail, MapPin, Phone, Send } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CONTACT, INQUIRY_TYPES, OFFICES } from '@/data/content';
import { fadeUp, scaleIn, staggerParent, VIEWPORT_ONCE } from '@/lib/motion';
import type { ContactFormState } from '@/types';

const EMPTY_FORM: ContactFormState = {
  fullName: '',
  workEmail: '',
  company: '',
  phone: '',
  inquiryType: '',
  message: '',
};

const inputClasses =
  'w-full rounded-xl border border-navy-200/70 bg-white/80 px-4 py-3 text-sm text-navy-900 shadow-sm outline-none transition-all duration-200 placeholder:text-navy-300 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30 3xl:rounded-2xl 3xl:px-5 3xl:py-4 3xl:text-base 4xl:px-6 4xl:py-4 4xl:text-base';

const labelClasses = 'mb-1.5 block text-sm font-medium text-navy-700 3xl:text-base 4xl:text-base';

export function Contact() {
  const [form, setForm] = useState<ContactFormState>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);

  const update =
    (field: keyof ContactFormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Front-end only demo — wire to your endpoint here.
    setSubmitted(true);
  };

  const primaryOffice = OFFICES.find((o) => o.primary);
  const otherOffices = OFFICES.filter((o) => !o.primary);

  return (
    <section
      id="contact"
      aria-label="Contact"
      className="section-py bg-white"
    >
      {/* careers nav target */}
      <span id="careers" className="absolute -top-24" aria-hidden="true" />

      <Container className="relative">
        <SectionHeading eyebrow="Contact Us" title={CONTACT.heading} description={CONTACT.description} />

        <div className="mt-14 grid gap-8 xl:grid-cols-12 3xl:gap-10 4xl:gap-12">
          {/* Offices */}
          <motion.div
            variants={staggerParent(0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            className="flex flex-col gap-6 xl:col-span-5"
          >
            {primaryOffice && (
              <motion.div
                variants={fadeUp}
                className="relative overflow-hidden rounded-[2rem] bg-navy-900 p-6 text-white shadow-premium sm:p-8 3xl:rounded-[3rem] 3xl:p-10 4xl:p-12"
              >
                <span className="eyebrow-dark">
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                  Headquarters
                </span>
                <h3 className="relative mt-5 text-xl font-bold sm:text-2xl 3xl:text-2xl 4xl:text-3xl">{primaryOffice.city}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-100/80 sm:text-base 3xl:text-base 4xl:text-lg">{primaryOffice.address}</p>

                <dl className="mt-6 space-y-3 text-sm 3xl:text-sm 4xl:text-base">
                  <div className="flex items-center gap-3 3xl:gap-4">
                    <Phone className="h-4 w-4 text-emerald-400 3xl:h-5 3xl:w-5 4xl:h-6 4xl:w-6" aria-hidden="true" />
                    <a href={`tel:${primaryOffice.phone?.replace(/\s/g, '')}`} className="hover:text-emerald-300">
                      {primaryOffice.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 3xl:gap-4">
                    <Mail className="h-4 w-4 text-emerald-400 3xl:h-5 3xl:w-5 4xl:h-6 4xl:w-6" aria-hidden="true" />
                    <a href={`mailto:${primaryOffice.email}`} className="hover:text-emerald-300">
                      {primaryOffice.email}
                    </a>
                  </div>
                </dl>
              </motion.div>
            )}

            <motion.div
              variants={fadeUp}
              className="rounded-[2rem] border border-navy-100 bg-white p-7 shadow-glass 3xl:rounded-[3rem] 3xl:p-9 4xl:p-10"
            >
              <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-navy-500">
                <Building2 className="h-4 w-4 text-emerald-500" aria-hidden="true" />
                Other Offices
              </p>
              <ul className="mt-4 grid grid-cols-2 gap-3 3xl:gap-4 4xl:gap-5">
                {otherOffices.map((office) => (
                  <li
                    key={office.city}
                    className="flex items-center gap-2 rounded-xl border border-navy-100 bg-white px-3 py-2.5 text-sm font-medium text-navy-800 sm:px-4 sm:py-3 sm:text-base 3xl:rounded-2xl 3xl:px-5 3xl:py-4 4xl:px-6 4xl:py-4 4xl:text-lg"
                  >
                    <MapPin className="h-4 w-4 text-emerald-500 3xl:h-5 3xl:w-5 4xl:h-6 4xl:w-6" aria-hidden="true" />
                    {office.city}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            className="xl:col-span-7"
          >
            <div className="rounded-[2rem] border border-navy-100 bg-white p-5 shadow-glass-lg sm:p-9 3xl:rounded-[3rem] 3xl:p-12 4xl:p-14">
              {submitted ? (
                <div className="flex min-h-[clamp(220px,30vw,420px)] flex-col items-center justify-center text-center">
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-600">
                    <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 text-2xl font-bold text-navy-900">Thank you</h3>
                  <p className="mt-2 max-w-sm text-navy-500">
                    Your inquiry has been received. Our executive team will respond within one
                    business day.
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="fullName" className={labelClasses}>
                      Full name <span className="text-emerald-600">*</span>
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      required
                      autoComplete="name"
                      value={form.fullName}
                      onChange={update('fullName')}
                      className={inputClasses}
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="workEmail" className={labelClasses}>
                      Work email <span className="text-emerald-600">*</span>
                    </label>
                    <input
                      id="workEmail"
                      type="email"
                      required
                      autoComplete="email"
                      value={form.workEmail}
                      onChange={update('workEmail')}
                      className={inputClasses}
                      placeholder="jane@company.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className={labelClasses}>
                      Company
                    </label>
                    <input
                      id="company"
                      type="text"
                      autoComplete="organization"
                      value={form.company}
                      onChange={update('company')}
                      className={inputClasses}
                      placeholder="Company name"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className={labelClasses}>
                      Phone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={update('phone')}
                      className={inputClasses}
                      placeholder="+61 ..."
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="inquiryType" className={labelClasses}>
                      Inquiry type
                    </label>
                    <select
                      id="inquiryType"
                      value={form.inquiryType}
                      onChange={update('inquiryType')}
                      className={inputClasses}
                    >
                      <option value="" disabled>
                        Select an option
                      </option>
                      {INQUIRY_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="message" className={labelClasses}>
                      Tell us about your requirements <span className="text-emerald-600">*</span>
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      value={form.message}
                      onChange={update('message')}
                      className={`${inputClasses} resize-none`}
                      placeholder="Share a few details about what you're looking for..."
                    />
                  </div>

                  <p className="text-body-fluid text-navy-400 sm:col-span-2">
                    {CONTACT.consent}
                  </p>

                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-400 px-7 py-3.5 text-base font-semibold text-navy-900 shadow-glow-emerald transition-all duration-300 ease-premium hover:bg-emerald-300 hover:shadow-[0_18px_50px_-8px_rgba(60,185,140,0.55)] active:scale-[0.99] sm:w-auto 3xl:px-9 3xl:py-4 3xl:text-lg 4xl:px-10 4xl:py-5 4xl:text-lg"
                    >
                      {CONTACT.submitLabel}
                      <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
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
