import { Mail, Phone } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Logo } from '@/components/ui/Logo';
import { BRAND, FOOTER_COLUMNS, LEGAL, SOCIAL_LINKS } from '@/data/content';

export function Footer() {
  return (
    <footer className="border-t border-navy-100 bg-white">
      <Container>
        {/* Top: brand + columns */}
        <div className="grid gap-10 py-12 sm:gap-12 sm:py-14 xl:grid-cols-[1.4fr_3fr] xl:py-16 3xl:py-20 3xl:gap-14 4xl:py-24 4xl:gap-16">
          <div>
            <Logo />
            <p className="mt-6 text-sm leading-relaxed text-navy-500 3xl:text-base 4xl:text-base">{BRAND.tagline}</p>

            <div className="mt-8 flex flex-col gap-3 text-sm 3xl:gap-4 3xl:text-base 4xl:text-base">
              <a
                href={`tel:${BRAND.phoneFooter.replace(/\s/g, '')}`}
                className="inline-flex items-center gap-2.5 text-navy-700 transition-colors hover:text-emerald-600 3xl:gap-3"
              >
                <Phone className="h-4 w-4 text-emerald-500 3xl:h-5 3xl:w-5 4xl:h-6 4xl:w-6" aria-hidden="true" />
                {BRAND.phoneFooter}
              </a>
              <a
                href={`mailto:${BRAND.email}`}
                className="inline-flex items-center gap-2.5 text-navy-700 transition-colors hover:text-emerald-600 3xl:gap-3"
              >
                <Mail className="h-4 w-4 text-emerald-500 3xl:h-5 3xl:w-5 4xl:h-6 4xl:w-6" aria-hidden="true" />
                {BRAND.email}
              </a>
            </div>

            {/* Social */}
            <ul className="mt-8 flex flex-wrap gap-2.5">
              {SOCIAL_LINKS.map((s) => {
                const Icon = s.icon;
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      aria-label={s.label}
                      style={{ backgroundColor: s.color }}
                      className="group grid h-10 w-10 place-items-center rounded-xl text-white transition-all duration-300 hover:-translate-y-1 hover:opacity-90 3xl:h-12 3xl:w-12 3xl:rounded-2xl 4xl:h-14 4xl:w-14 5xl:h-16 5xl:w-16"
                    >
                      <Icon className="h-[18px] w-[18px] 3xl:h-5 3xl:w-5 4xl:h-6 4xl:w-6 5xl:h-7 5xl:w-7" aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Link columns */}
          <nav aria-label="Footer" className="grid grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-8 md:grid-cols-4 xl:grid-cols-5 3xl:gap-10 4xl:gap-14 5xl:gap-16">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.heading}>
                <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-navy-900 3xl:text-base 4xl:text-lg">
                  {col.heading}
                </h3>
                <ul className="mt-5 flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-navy-500 transition-colors hover:text-navy-900 3xl:text-base 4xl:text-base"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom: legal */}
        <div className="flex flex-col gap-4 border-t border-navy-100 py-6 text-sm text-navy-400 md:flex-row md:items-center md:justify-between sm:text-base 3xl:py-8 4xl:py-10">
          <span>{LEGAL.copyright}</span>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {LEGAL.links.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="transition-colors hover:text-emerald-600">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
