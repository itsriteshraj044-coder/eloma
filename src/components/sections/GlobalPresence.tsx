import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { CAPABILITIES, GLOBAL_PRESENCE } from '@/data/content';
import { fadeUp, scaleIn, staggerParent, VIEWPORT_ONCE } from '@/lib/motion';
import type { Capability } from '@/types';

/* ── Region groupings ────────────────────────────────────────────────── */
const REGIONS = [
  {
    name: 'Asia-Pacific',
    shortCode: 'APAC',
    countries: ['Australia', 'India', 'Singapore', 'China'],
    color: 'from-navy-800 to-navy-600',
    bgColor: 'bg-white',
    borderColor: 'border-navy-100',
    textColor: 'text-navy-500',
  },
  {
    name: 'Americas',
    shortCode: 'AMR',
    countries: ['USA', 'Canada'],
    color: 'from-navy-700 to-navy-500',
    bgColor: 'bg-white',
    borderColor: 'border-navy-100',
    textColor: 'text-navy-500',
  },
  {
    name: 'Europe',
    shortCode: 'EUR',
    countries: ['UK'],
    color: 'from-navy-700 to-navy-500',
    bgColor: 'bg-white',
    borderColor: 'border-navy-100',
    textColor: 'text-navy-500',
  },
  {
    name: 'Middle East',
    shortCode: 'MEA',
    countries: ['UAE'],
    color: 'from-navy-700 to-navy-500',
    bgColor: 'bg-white',
    borderColor: 'border-navy-100',
    textColor: 'text-navy-500',
  },
] as const;

function RegionCard({ region }: { region: (typeof REGIONS)[number] }) {
  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden rounded-3xl border p-6 transition-shadow duration-300 hover:shadow-glass-lg sm:p-7 3xl:rounded-[2rem] 3xl:p-9 ${region.borderColor} ${region.bgColor}`}
    >
      {/* Region header */}
      <div className="mb-4 flex items-center justify-between">
        <span
          className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br text-white text-xs font-black tracking-wider shadow-sm 3xl:h-12 3xl:w-12 3xl:rounded-2xl ${region.color}`}
        >
          {region.shortCode}
        </span>
        <span
          className={`text-[10px] font-bold uppercase tracking-[0.2em] 3xl:text-xs ${region.textColor}`}
        >
          {region.countries.length} {region.countries.length === 1 ? 'Market' : 'Markets'}
        </span>
      </div>

      {/* Region name */}
      <h3 className="text-lg font-bold text-navy-900 sm:text-xl 3xl:text-xl 4xl:text-2xl">
        {region.name}
      </h3>

      {/* Countries */}
      <ul className="mt-3 flex flex-col gap-1.5">
        {region.countries.map((country) => (
          <li
            key={country}
            className="flex items-center gap-2 text-base text-navy-600 3xl:text-lg"
          >
            <MapPin
              className="h-3.5 w-3.5 shrink-0 text-emerald-500 3xl:h-4 3xl:w-4"
              aria-hidden="true"
            />
            {country}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function CapabilityCard({ capability }: { capability: Capability }) {
  const Icon = capability.icon;
  return (
    <motion.div variants={scaleIn} className="h-full">
      <GlassCard className="group h-full">
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-emerald-50 text-emerald-600 transition-all duration-300 group-hover:bg-emerald-500 group-hover:text-white 3xl:h-16 3xl:w-16 3xl:rounded-3xl 4xl:h-20 4xl:w-20">
          <Icon className="h-7 w-7 3xl:h-8 3xl:w-8 4xl:h-10 4xl:w-10" aria-hidden="true" />
        </span>
        <h4 className="mt-5 text-lg font-bold text-navy-900 sm:text-xl 3xl:text-xl 4xl:text-2xl">
          {capability.title}
        </h4>
        <p className="mt-2 text-sm leading-relaxed text-navy-500 sm:text-base 3xl:text-base 4xl:text-lg">
          {capability.description}
        </p>
      </GlassCard>
    </motion.div>
  );
}

/** Global Presence — regional footprint + global capabilities. */
export function GlobalPresence() {
  return (
    <section
      id="global"
      aria-label="Global presence"
      className="section-py relative overflow-hidden bg-white"
    >
      {/* Ambient */}
      <div
        className="pointer-events-none absolute -top-24 right-0 h-[500px] w-[600px] rounded-full bg-navy-50/40 blur-[100px]"
        aria-hidden="true"
      />

      <Container className="relative">
        <SectionHeading
          eyebrow="Global Presence"
          description={GLOBAL_PRESENCE.body}
        />

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mx-auto mt-3 max-w-2xl text-center text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600 3xl:text-base"
        >
          {GLOBAL_PRESENCE.subheading}
        </motion.p>

        {/* ── Region cards ──────────────────────────────────────────── */}
        <motion.div
          variants={staggerParent(0.1, 0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4 3xl:gap-6 4xl:gap-8"
        >
          {REGIONS.map((region) => (
            <RegionCard key={region.name} region={region} />
          ))}
        </motion.div>

        {/* Total markets badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          className="mt-8 flex justify-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-5 py-2.5 text-sm font-semibold text-navy-800 shadow-glass 3xl:px-7 3xl:py-3 3xl:text-base">
            <span
              className="flex h-2 w-2 rounded-full bg-emerald-400 ring-4 ring-emerald-100"
              aria-hidden="true"
            />
            Operating across 8 global markets
          </span>
        </motion.div>

        {/* ── Capabilities ──────────────────────────────────────────── */}
        <div className="mt-20 3xl:mt-24">
          <SectionHeading title={GLOBAL_PRESENCE.capabilitiesHeading} />

          <motion.div
            variants={staggerParent(0.1, 0.05)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4 3xl:gap-8 4xl:gap-10"
          >
            {CAPABILITIES.map((capability) => (
              <CapabilityCard key={capability.index} capability={capability} />
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
