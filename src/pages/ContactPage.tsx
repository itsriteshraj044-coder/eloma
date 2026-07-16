import React, { useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, CheckCircle, ChevronDown, Phone, Mail, MapPin, Clock } from 'lucide-react'
import { Header } from '../components/Header/Header'
import { FlyFooter } from '../components/FlyFooter'
import { NAVY, GREEN, MUTED, EASE } from '../components/PageKit'

const SERVICES = [
  'Digital & Technology', 'Imports & Trade', 'Transport & Logistics',
  'Travel Solutions', 'Call Center / BPO', 'IT Infrastructure',
  'Supply Chain', 'Partnerships', 'General Enquiry',
]

const WEB3FORMS_KEY = 'c294a0b8-fd39-4e5c-99ef-7096b8f0be34'

const MAPS = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`

/* ────────────────────────────────────────────────────────────────────
   LOCATIONS
   Each branch carries an IANA timezone so we can render a live local
   clock + an open/closed pill. Add more Australian branches by dropping
   another object into AU_BRANCHES (keep the same shape).
   ──────────────────────────────────────────────────────────────────── */
type Branch = { city: string; region: string; role: string; addr: string; tz: string; flag: string }

const AU_BRANCHES: Branch[] = [
  { city: 'Melbourne', region: 'Australia', role: 'Head Office', addr: '71 Gipps Street, Collingwood, VIC 3066', tz: 'Australia/Melbourne', flag: '🇦🇺' },
  { city: 'Sydney', region: 'Australia', role: 'Branch', addr: 'Sydney, NSW, Australia', tz: 'Australia/Sydney', flag: '🇦🇺' },
  { city: 'Brisbane', region: 'Australia', role: 'Branch', addr: 'Brisbane, QLD, Australia', tz: 'Australia/Brisbane', flag: '🇦🇺' },
  { city: 'Perth', region: 'Australia', role: 'Branch', addr: 'Perth, WA, Australia', tz: 'Australia/Perth', flag: '🇦🇺' },
  { city: 'Adelaide', region: 'Australia', role: 'Branch', addr: 'Adelaide, SA, Australia', tz: 'Australia/Adelaide', flag: '🇦🇺' },
]

const GLOBAL_BRANCHES: Branch[] = [
  { city: 'Gurugram', region: 'India', role: 'Operations', addr: 'Gurugram, Haryana, India', tz: 'Asia/Kolkata', flag: '🇮🇳' },
  { city: 'Washington', region: 'United States', role: 'Operations', addr: 'Washington, DC, USA', tz: 'America/New_York', flag: '🇺🇸' },
  { city: 'London', region: 'United Kingdom', role: 'Operations', addr: 'London, United Kingdom', tz: 'Europe/London', flag: '🇬🇧' },
  { city: 'Dubai', region: 'UAE', role: 'Operations', addr: 'Downtown Dubai, Dubai', tz: 'Asia/Dubai', flag: '🇦🇪' },
  { city: 'Singapore', region: 'Singapore', role: 'Operations', addr: 'One Raffles Place, Singapore', tz: 'Asia/Singapore', flag: '🇸🇬' },
]

const HQ = AU_BRANCHES[0]

const LINES = [
  { Icon: Phone, t: '1800 054 555', s: 'Mon–Fri · 9–6 AEST', href: 'tel:1800054555' },
  { Icon: Mail, t: 'connect@elomagroup.com.au', s: 'Reply within 1 business day', href: 'mailto:connect@elomagroup.com.au' },
  { Icon: MapPin, t: '71 Gipps Street, Collingwood', s: 'Melbourne, VIC 3066', href: MAPS('71 Gipps Street Collingwood Melbourne VIC 3066') },
]

/* ── live-time helpers ── */
function useNow() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return now
}

function localInfo(now: Date, tz: string) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: tz, weekday: 'short', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23',
  }).formatToParts(now)
  const get = (t: string) => parts.find(p => p.type === t)?.value ?? ''
  const weekday = get('weekday')
  const h = parseInt(get('hour'), 10)
  const time = new Intl.DateTimeFormat('en-US', { timeZone: tz, hour: 'numeric', minute: '2-digit', hour12: true }).format(now)
  const secs = get('second')
  const weekend = weekday === 'Sat' || weekday === 'Sun'
  const open = !weekend && h >= 9 && h < 18
  return { time, secs, weekday, open }
}

function Kicker({ no, label, light }: { no: string; label: string; light?: boolean }) {
  return (
    <div className={`ctx-kicker${light ? ' lt' : ''}`}>
      <span className="ctx-kicker-no">{no}</span>
      <span className="ctx-kicker-rule" />
      <span className="ctx-kicker-lb">{label}</span>
    </div>
  )
}

/* ── Custom service dropdown ── */
function ServiceField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const h = (e: MouseEvent) => { if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])
  return (
    <div ref={wrapRef} className="ctx-field" style={{ position: 'relative' }}>
      <label className="ctx-label" htmlFor="ctx-service">Area of interest</label>
      <button type="button" id="ctx-service" className={`ctx-select${open || value ? ' active' : ''}`} aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen(o => !o)}>
        <span style={{ color: value ? NAVY : 'rgba(26,43,60,0.4)' }}>{value || 'What can we help with?'}</span>
        <ChevronDown size={16} color={open ? GREEN : 'rgba(26,43,60,0.4)'} style={{ transition: 'transform 0.22s ease', transform: open ? 'rotate(180deg)' : 'rotate(0)' }} />
      </button>
      {open && (
        <div className="ctx-menu" role="listbox">
          {SERVICES.map(opt => {
            const sel = value === opt
            return (
              <div key={opt} role="option" aria-selected={sel} onClick={() => { onChange(opt); setOpen(false) }} className="ct-opt"
                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', cursor: 'pointer', borderRadius: 9, background: sel ? 'rgba(60,185,140,0.1)' : 'transparent' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', flexShrink: 0, background: sel ? GREEN : 'transparent', border: `1.5px solid ${sel ? GREEN : 'rgba(26,43,60,0.25)'}` }} />
                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, fontWeight: sel ? 700 : 500, color: sel ? GREEN : NAVY }}>{opt}</span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function Field({ id, label, placeholder, value, onChange, type = 'text', tag = 'input' as 'input' | 'textarea' }: {
  id: string; label: string; placeholder: string; value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  type?: string; tag?: 'input' | 'textarea'
}) {
  const [focused, setFocused] = useState(false)
  const shared: React.CSSProperties = { border: 'none', outline: 'none', background: 'transparent', fontFamily: "'Inter',sans-serif", fontSize: 'clamp(15px,1.1vw,17px)', fontWeight: 500, color: NAVY, width: '100%' }
  return (
    <div className={`ctx-field${focused ? ' focus' : ''}`}>
      <label className="ctx-label" htmlFor={id}>{label}</label>
      {tag === 'textarea' ? (
        <textarea id={id} value={value} onChange={onChange as React.ChangeEventHandler<HTMLTextAreaElement>} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} placeholder={placeholder} rows={3} style={{ ...shared, resize: 'none' }} />
      ) : (
        <input id={id} type={type} value={value} onChange={onChange as React.ChangeEventHandler<HTMLInputElement>} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} placeholder={placeholder} style={shared} />
      )}
    </div>
  )
}

/* ── a single live location card ── */
function LocationCard({ b, now, i, feature }: { b: Branch; now: Date; i: number; feature?: boolean }) {
  const reduce = useReducedMotion()
  const { time, secs, weekday, open } = localInfo(now, b.tz)
  return (
    <motion.a
      href={MAPS(b.addr)} target="_blank" rel="noopener noreferrer"
      className={`cx-loc${feature ? ' feat' : ''}`}
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: (i % 3) * 0.06, ease: EASE }}
    >
      <div className="cx-loc-top">
        <span className="cx-loc-flag" aria-hidden>{b.flag}</span>
        <span className={`cx-loc-status${open ? ' on' : ''}`}>{open ? 'Open' : 'Closed'}</span>
      </div>

      <div className="cx-loc-clock">
        <span className="cx-loc-time">{time}</span>
        <span className="cx-loc-secs">:{secs}</span>
      </div>
      <span className="cx-loc-day">{weekday} · local time</span>

      <div className="cx-loc-body">
        <span className="cx-loc-role">{b.role}</span>
        <h3 className="cx-loc-city">{b.city}</h3>
        <p className="cx-loc-country">{b.region}</p>
        <p className="cx-loc-addr">{b.addr}</p>
      </div>

      <span className="cx-loc-link">View on map <ArrowUpRight size={15} strokeWidth={2.4} /></span>
    </motion.a>
  )
}

export function ContactPage() {
  const reduce = useReducedMotion()
  const location = useLocation()
  const now = useNow()

  /* Deep-link from page CTAs (Apply Now / Get in Touch …) → smooth-scroll to form */
  useEffect(() => {
    if (location.hash !== '#contact-form') return
    const el = document.getElementById('contact-form')
    if (!el) return
    const t = setTimeout(() => {
      const lenis = (window as unknown as { __lenis?: { scrollTo: (t: Element, o?: object) => void } }).__lenis
      if (lenis?.scrollTo) lenis.scrollTo(el, { offset: -72, duration: 1.2 })
      else el.scrollIntoView({ behavior: 'smooth' })
    }, 240)
    return () => clearTimeout(t)
  }, [location])

  const [form, setForm] = useState({ name: '', email: '', company: '', service: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const set = (key: keyof typeof form) => ({
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm(f => ({ ...f, [key]: e.target.value })),
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim()) return
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New enquiry - ${form.service || 'General Enquiry'} · ${form.name}`,
          from_name: 'Eloma Group Website',
          name: form.name,
          email: form.email,
          company: form.company || '-',
          'Area of interest': form.service || '-',
          message: form.message || '-',
        }),
      })
      const data = await res.json()
      if (data.success) {
        setSubmitted(true)
      } else {
        setError(data.message || 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const rise = (d = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.7, delay: d, ease: EASE },
  })

  const hq = localInfo(now, HQ.tz)

  return (
    <div style={{ overflowX: 'clip', background: '#fff' }}>
      <Header />

      {/* ── 1 · Hero ── */}
      <section className="cx-hero">
        <div className="cx-hero-orb" aria-hidden />
        <div className="cx-hero-in">
          <motion.p className="ctx-eyebrow" initial={reduce ? false : { opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}>
            <span className="ctx-eyebrow-dot" />Contact Eloma Group
          </motion.p>

          <motion.h1 className="cx-hero-h1" initial={reduce ? false : { opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.08 }}>
            Let's build<br />something <span className="g">real.</span>
          </motion.h1>

          <motion.div className="cx-hero-meta" initial={reduce ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}>
            <a className="cx-hero-hq" href={MAPS(HQ.addr)} target="_blank" rel="noopener noreferrer">
              <span className="cx-hero-hq-lbl"><span className={`cx-dot${hq.open ? ' on' : ''}`} /> {HQ.city} HQ · live</span>
              <span className="cx-hero-hq-time">{hq.time}<i>:{hq.secs}</i></span>
              <span className="cx-hero-hq-sub">{hq.weekday} · {hq.open ? 'Team is online' : 'Back at 9am AEST'}</span>
            </a>
            <a href="#contact-form" className="cx-hero-cta"><span>Start a conversation</span><ArrowRight size={17} strokeWidth={2.4} /></a>
          </motion.div>
        </div>
      </section>

      {/* ── 2 · Form ── */}
      <section id="contact-form" className="ctx-form-sec" style={{ scrollMarginTop: 72 }}>
        <motion.div className="ctx-panel" {...rise()}>
          {/* info rail */}
          <aside className="ctx-aside">
            <span className="ctx-aside-glow" aria-hidden />
            <div className="ctx-aside-in">
              <Kicker no="/ 01" label="Direct lines" light />
              <h2 className="ctx-aside-h">Straight to the <span className="g">right desk.</span></h2>
              <p className="ctx-aside-p">Skip the switchboard — reach us on the channel that suits you and we'll route your message to the team that owns it.</p>
              <div className="ctx-aside-lines">
                {LINES.map((c, i) => (
                  <a key={i} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="ctx-aside-line">
                    <span className="ctx-aside-line-ic"><c.Icon size={17} /></span>
                    <span>
                      <span className="ctx-aside-line-t">{c.t}</span>
                      <span className="ctx-aside-line-s">{c.s}</span>
                    </span>
                  </a>
                ))}
              </div>
              <div className="ctx-aside-foot"><Clock size={13} /> {HQ.city} · {hq.time} local</div>
            </div>
          </aside>

          {/* form */}
          <div className="ctx-form">
            <Kicker no="/ 02" label="Send a message" />
            <h2 className="ctx-form-h">Tell us <span className="g">what's next.</span></h2>
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div key="ok" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease: EASE }} className="ctx-ok">
                  <CheckCircle size={52} color={GREEN} strokeWidth={1.5} />
                  <h3 className="ctx-ok-h">Message ready!</h3>
                  <p className="ctx-ok-p">Thanks, {form.name || 'there'} - your details are captured. Our team will be in touch shortly.</p>
                  <button className="pk-cta-btn" onClick={() => { setSubmitted(false); setError(''); setForm({ name: '', email: '', company: '', service: '', message: '' }) }}><span>Send another</span></button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} initial={{ opacity: 1 }} exit={{ opacity: 0 }} className="ctx-fields">
                  <Field id="ctx-name" label="Name" placeholder="Jane Doe" {...set('name')} />
                  <Field id="ctx-email" label="Email address" placeholder="jane@company.com" type="email" {...set('email')} />
                  <Field id="ctx-company" label="Company (optional)" placeholder="Company name" {...set('company')} />
                  <ServiceField value={form.service} onChange={v => setForm(f => ({ ...f, service: v }))} />
                  <Field id="ctx-message" label="Message" placeholder="Tell us a little more…" tag="textarea" {...set('message')} />
                  {error && <p className="ctx-err" role="alert">{error}</p>}
                  <div style={{ marginTop: 'clamp(28px,3vw,40px)' }}>
                    <button type="submit" disabled={submitting} className="pk-cta-btn" style={{ opacity: submitting ? 0.7 : 1, cursor: submitting ? 'not-allowed' : 'pointer' }}>
                      <span>{submitting ? 'Sending…' : 'Send message'}</span>
                      <ArrowRight size={17} strokeWidth={2.4} />
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </section>

      {/* ── 3 · Live locations ── */}
      <section className="cx-loc-sec">
        <div className="cx-loc-wrap">
          <motion.div className="cx-loc-head" {...rise()}>
            <Kicker no="/ 03" label="Where we are — live" light />
            <h2 className="cx-loc-h2">Six offices.<br /><span className="g">One time zone that never sleeps.</span></h2>
            <p className="cx-loc-lead">Across Australia and five global markets, someone from Eloma Group is always within working hours. Here's exactly what the clock reads at every desk, right now.</p>
          </motion.div>

          {/* Australia */}
          <motion.div className="cx-loc-groove" {...rise(0.04)}>
            <span className="cx-loc-groove-t">Australia</span>
            <span className="cx-loc-groove-c">{AU_BRANCHES.length} {AU_BRANCHES.length === 1 ? 'office' : 'offices'}</span>
          </motion.div>
          <div className={`cx-loc-grid${AU_BRANCHES.length === 1 ? ' single' : ''}`}>
            {AU_BRANCHES.map((b, i) => (
              <LocationCard key={b.city} b={b} now={now} i={i} feature={i === 0} />
            ))}
          </div>

          {/* Global */}
          <motion.div className="cx-loc-groove" style={{ marginTop: 'clamp(30px,4vw,52px)' }} {...rise(0.04)}>
            <span className="cx-loc-groove-t">Global markets</span>
            <span className="cx-loc-groove-c">{GLOBAL_BRANCHES.length} offices</span>
          </motion.div>
          <div className="cx-loc-grid">
            {GLOBAL_BRANCHES.map((b, i) => (
              <LocationCard key={b.city} b={b} now={now} i={i} />
            ))}
          </div>
        </div>
      </section>

      <FlyFooter />

      <style>{`
        .g { color:${GREEN}; }
        .ctx-eyebrow { display:inline-flex; align-items:center; gap:10px; margin:0; font-family:'Inter',sans-serif; font-weight:700; font-size:clamp(10px,0.8vw,12px); letter-spacing:2.5px; text-transform:uppercase; color:${GREEN}; }
        .ctx-eyebrow-dot { width:7px; height:7px; border-radius:50%; background:${GREEN}; box-shadow:0 0 0 4px rgba(60,185,140,0.16); }
        .ctx-kicker { display:flex; align-items:center; gap:12px; }
        .ctx-kicker-no { font-family:'Poppins',sans-serif; font-weight:700; font-size:13px; color:${GREEN}; letter-spacing:1px; }
        .ctx-kicker-rule { width:clamp(24px,3vw,44px); height:1px; background:rgba(26,43,60,0.22); }
        .ctx-kicker-lb { font-family:'Inter',sans-serif; font-weight:700; font-size:clamp(10px,0.8vw,12px); letter-spacing:2.5px; text-transform:uppercase; color:${MUTED}; }
        .ctx-kicker.lt .ctx-kicker-rule { background:rgba(255,255,255,0.22); }
        .ctx-kicker.lt .ctx-kicker-lb { color:rgba(255,255,255,0.55); }
        .ctx-kicker.lt .ctx-kicker-no { color:${GREEN}; }

        /* shared live pill / dot */
        .cx-dot { width:8px; height:8px; border-radius:50%; background:rgba(255,255,255,0.35); box-shadow:0 0 0 4px rgba(255,255,255,0.06); flex-shrink:0; }
        .cx-dot.on { background:${GREEN}; box-shadow:0 0 0 4px rgba(60,185,140,0.18); animation:cx-pulse 2s ease-in-out infinite; }
        @keyframes cx-pulse { 0%,100%{ box-shadow:0 0 0 4px rgba(60,185,140,0.18); } 50%{ box-shadow:0 0 0 7px rgba(60,185,140,0.05); } }

        /* ── 1 · Hero ── */
        .cx-hero { position:relative; overflow:hidden; background:linear-gradient(165deg,#0c2135 0%, ${NAVY} 46%, #14324a 100%);
          padding: clamp(128px,15vw,210px) clamp(24px,5vw,80px) clamp(70px,8vw,120px); }
        .cx-hero-orb { position:absolute; top:-20%; right:-8%; width:56%; height:150%; border-radius:50%; pointer-events:none;
          background:radial-gradient(circle, rgba(60,185,140,0.22), transparent 62%); }
        .cx-hero::after { content:''; position:absolute; inset:0; pointer-events:none; background-image:radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px); background-size:26px 26px; opacity:0.5; }
        .cx-hero-in { position:relative; z-index:1; max-width:1760px; margin:0 auto; }
        .cx-hero-h1 { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(46px,8vw,128px); line-height:0.98; letter-spacing:-0.04em; color:#fff; margin:clamp(20px,2.6vw,32px) 0 0; }
        .cx-hero-meta { display:flex; flex-wrap:wrap; align-items:center; gap:clamp(16px,2vw,26px); margin-top:clamp(34px,4vw,54px); }
        .cx-hero-hq { display:flex; flex-direction:column; gap:5px; text-decoration:none; padding:clamp(16px,1.6vw,20px) clamp(20px,2vw,28px); border-radius:18px;
          background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.12); backdrop-filter:blur(8px); transition:border-color 0.3s ease, transform 0.3s ease, background 0.3s ease; }
        .cx-hero-hq:hover { transform:translateY(-3px); border-color:rgba(60,185,140,0.5); background:rgba(255,255,255,0.08); }
        .cx-hero-hq-lbl { display:inline-flex; align-items:center; gap:8px; font-family:'Inter',sans-serif; font-size:11px; font-weight:700; letter-spacing:2px; text-transform:uppercase; color:rgba(255,255,255,0.6); }
        .cx-hero-hq-time { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(28px,3.4vw,44px); color:#fff; letter-spacing:-0.02em; line-height:1; font-variant-numeric:tabular-nums; }
        .cx-hero-hq-time i { color:${GREEN}; font-style:normal; font-size:0.5em; font-weight:600; vertical-align:middle; margin-left:2px; }
        .cx-hero-hq-sub { font-family:'Inter',sans-serif; font-size:12.5px; color:rgba(255,255,255,0.5); }
        .cx-hero-cta { position:relative; overflow:hidden; display:inline-flex; align-items:center; gap:10px; text-decoration:none; background:${GREEN}; color:#fff; border-radius:14px; padding:16px clamp(24px,2.4vw,34px);
          font-family:'Poppins',sans-serif; font-size:clamp(15px,1.1vw,17px); font-weight:500; box-shadow:0 20px 40px -16px rgba(60,185,140,0.8); transition:transform 0.25s cubic-bezier(0.16,1,0.3,1), background 0.25s ease; }
        .cx-hero-cta span { position:relative; z-index:1; }
        .cx-hero-cta::after { content:''; position:absolute; top:0; left:-120%; width:55%; height:100%; background:linear-gradient(110deg, transparent, rgba(255,255,255,0.45), transparent); transform:skewX(-18deg); transition:left 0.7s cubic-bezier(0.16,1,0.3,1); }
        .cx-hero-cta:hover { transform:translateY(-2px); background:#34ab80; }
        .cx-hero-cta:hover::after { left:135%; }

        /* ── 2 · Live locations ── */
        .cx-loc-sec { position:relative; background:linear-gradient(180deg, ${NAVY} 0%, #0f2942 100%); padding: clamp(64px,8vw,130px) clamp(24px,5vw,80px); }
        .cx-loc-wrap { max-width:1760px; margin:0 auto; }
        .cx-loc-head { max-width:820px; margin-bottom:clamp(34px,4.4vw,60px); }
        .cx-loc-h2 { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(30px,4.4vw,62px); color:#fff; letter-spacing:-0.03em; line-height:1.06; margin:18px 0 18px; }
        .cx-loc-lead { font-family:'Inter',sans-serif; font-size:clamp(14px,1.15vw,17px); color:rgba(255,255,255,0.55); line-height:1.85; margin:0; max-width:60ch; }
        .cx-loc-groove { display:flex; align-items:center; gap:16px; margin:0 0 18px; }
        .cx-loc-groove-t { font-family:'Inter',sans-serif; font-weight:800; font-size:11px; letter-spacing:2.5px; text-transform:uppercase; color:${GREEN}; white-space:nowrap; }
        .cx-loc-groove-c { font-family:'Inter',sans-serif; font-size:11.5px; font-weight:600; color:rgba(255,255,255,0.4); white-space:nowrap; }
        .cx-loc-groove::after { content:''; flex:1; height:1px; background:linear-gradient(90deg, rgba(255,255,255,0.16), transparent); }

        .cx-loc-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
        .cx-loc-grid.single { grid-template-columns:repeat(3,1fr); }
        .cx-loc { position:relative; overflow:hidden; display:flex; flex-direction:column; text-decoration:none; border-radius:20px; padding:clamp(22px,2.2vw,30px);
          background:linear-gradient(160deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02)); border:1px solid rgba(255,255,255,0.1); backdrop-filter:blur(6px);
          transition:transform 0.45s cubic-bezier(0.16,1,0.3,1), border-color 0.45s ease, box-shadow 0.45s ease; }
        .cx-loc::after { content:''; position:absolute; top:-30%; right:-24%; width:52%; height:70%; border-radius:50%; background:radial-gradient(circle, rgba(60,185,140,0.18), transparent 70%); opacity:0; transition:opacity 0.45s ease; pointer-events:none; }
        .cx-loc:hover { transform:translateY(-8px); border-color:rgba(60,185,140,0.5); box-shadow:0 40px 80px -44px rgba(0,0,0,0.6); }
        .cx-loc:hover::after { opacity:1; }
        .cx-loc.feat { grid-column:span 1; background:linear-gradient(158deg, rgba(60,185,140,0.16), rgba(255,255,255,0.03)); border-color:rgba(60,185,140,0.35); }
        .cx-loc.feat .cx-loc-time { color:#fff; }

        .cx-loc-top { display:flex; align-items:center; justify-content:space-between; margin-bottom:clamp(16px,1.8vw,22px); }
        .cx-loc-flag { font-size:20px; line-height:1; font-weight:800; letter-spacing:1px; color:#fff; }
        .cx-loc-status { display:inline-flex; align-items:center; font-family:'Inter',sans-serif; font-size:10.5px; font-weight:800; letter-spacing:1.5px; text-transform:uppercase; padding:5px 11px; border-radius:100px; color:rgba(255,255,255,0.55); background:rgba(255,255,255,0.07); border:1px solid rgba(255,255,255,0.14); }
        .cx-loc-status.on { color:${GREEN}; background:rgba(60,185,140,0.14); border-color:rgba(60,185,140,0.4); }

        .cx-loc-clock { display:flex; align-items:baseline; gap:2px; color:#fff; }
        .cx-loc-time { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(30px,3.2vw,44px); letter-spacing:-0.02em; line-height:1; font-variant-numeric:tabular-nums; }
        .cx-loc-secs { font-family:'Poppins',sans-serif; font-weight:600; font-size:clamp(14px,1.4vw,18px); color:${GREEN}; font-variant-numeric:tabular-nums; }
        .cx-loc-day { display:block; margin-top:7px; font-family:'Inter',sans-serif; font-size:11.5px; font-weight:600; letter-spacing:0.4px; color:rgba(255,255,255,0.42); text-transform:capitalize; }

        .cx-loc-body { margin-top:clamp(18px,2vw,26px); padding-top:clamp(16px,1.8vw,22px); border-top:1px solid rgba(255,255,255,0.1); flex:1; }
        .cx-loc-role { font-family:'Inter',sans-serif; font-size:10px; font-weight:800; letter-spacing:2px; text-transform:uppercase; color:${GREEN}; }
        .cx-loc-city { font-family:'Poppins',sans-serif; font-weight:600; font-size:clamp(21px,2vw,28px); color:#fff; letter-spacing:-0.01em; margin:8px 0 4px; }
        .cx-loc-country { font-family:'Inter',sans-serif; font-size:13.5px; font-weight:700; color:#fff; margin:0 0 8px; letter-spacing:0.2px; }
        .cx-loc-addr { font-family:'Inter',sans-serif; font-size:13px; color:rgba(255,255,255,0.5); line-height:1.6; margin:0; }
        .cx-loc-link { display:inline-flex; align-items:center; gap:7px; margin-top:clamp(16px,1.8vw,22px); font-family:'Inter',sans-serif; font-size:11.5px; font-weight:700; letter-spacing:1.2px; text-transform:uppercase; color:rgba(255,255,255,0.7); transition:gap 0.3s ease, color 0.3s ease; }
        .cx-loc:hover .cx-loc-link { color:${GREEN}; gap:12px; }

        /* ── 3 · Form panel ── */
        .ctx-form-sec { background:#fff; padding: clamp(56px,7vw,110px) clamp(24px,5vw,80px); }
        .ctx-panel { max-width:1500px; margin:0 auto; display:grid; grid-template-columns:0.82fr 1.18fr; border-radius:28px; overflow:hidden; border:1px solid rgba(26,43,60,0.1); box-shadow:0 50px 100px -50px rgba(19,41,61,0.4); background:#fff; }
        .ctx-aside { position:relative; overflow:hidden; background:linear-gradient(165deg, ${NAVY} 0%, #1b3a52 100%); padding:clamp(36px,4vw,60px); }
        .ctx-aside::before { content:''; position:absolute; inset:0; pointer-events:none; background-image:radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px); background-size:24px 24px; }
        .ctx-aside-glow { position:absolute; bottom:-90px; left:-80px; width:320px; height:320px; border-radius:50%; background:radial-gradient(circle, rgba(60,185,140,0.2), transparent 64%); pointer-events:none; }
        .ctx-aside-in { position:relative; z-index:1; }
        .ctx-aside-h { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(26px,2.8vw,40px); color:#fff; letter-spacing:-0.02em; line-height:1.1; margin:18px 0 16px; }
        .ctx-aside-p { font-family:'Inter',sans-serif; font-size:14.5px; color:rgba(255,255,255,0.55); line-height:1.8; margin:0 0 clamp(24px,3vw,34px); }
        .ctx-aside-lines { display:flex; flex-direction:column; border-top:1px solid rgba(255,255,255,0.1); }
        .ctx-aside-line { display:flex; align-items:flex-start; gap:14px; text-decoration:none; padding:16px 0; border-bottom:1px solid rgba(255,255,255,0.1); transition:padding-left 0.35s cubic-bezier(0.16,1,0.3,1); }
        .ctx-aside-line:hover { padding-left:6px; }
        .ctx-aside-line-ic { color:${GREEN}; margin-top:1px; flex-shrink:0; }
        .ctx-aside-line-t { display:block; font-family:'Inter',sans-serif; font-size:14.5px; font-weight:600; color:#fff; }
        .ctx-aside-line-s { display:block; font-family:'Inter',sans-serif; font-size:12.5px; color:rgba(255,255,255,0.42); margin-top:3px; }
        .ctx-aside-foot { display:inline-flex; align-items:center; gap:8px; margin-top:clamp(22px,2.6vw,30px); font-family:'Inter',sans-serif; font-size:12px; font-weight:600; letter-spacing:0.5px; color:rgba(255,255,255,0.5); }
        .ctx-aside-foot svg { color:${GREEN}; }

        .ctx-form { padding:clamp(36px,4.4vw,68px); display:flex; flex-direction:column; }
        .ctx-form-h { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(30px,4vw,52px); color:${NAVY}; letter-spacing:-0.03em; line-height:1.1; padding-bottom:0.06em; margin:16px 0 clamp(20px,2.4vw,30px); }
        .ctx-fields { display:flex; flex-direction:column; }
        .ctx-field { border-bottom:1.5px solid rgba(26,43,60,0.14); padding:14px 0; transition:border-color 0.25s ease; }
        .ctx-field.focus, .ctx-field:focus-within { border-color:${GREEN}; }
        .ctx-label { display:block; font-family:'Inter',sans-serif; font-size:11px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; color:${MUTED}; margin-bottom:8px; }
        .ctx-field.focus .ctx-label, .ctx-field:focus-within .ctx-label { color:${GREEN}; }
        .ctx-select { width:100%; display:flex; align-items:center; justify-content:space-between; gap:12px; background:transparent; border:none; padding:0; cursor:pointer; font-family:'Inter',sans-serif; font-size:clamp(15px,1.1vw,17px); font-weight:500; }
        .ctx-menu { position:absolute; top:100%; left:0; right:0; z-index:50; margin-top:8px; background:#fff; border:1px solid rgba(26,43,60,0.1); border-radius:14px; box-shadow:0 24px 50px -16px rgba(19,41,61,0.22); max-height:280px; overflow-y:auto; padding:6px; }
        .ct-opt:hover { background:rgba(60,185,140,0.07) !important; }
        input::placeholder, textarea::placeholder { color:rgba(26,43,60,0.32); font-weight:500; }

        .ctx-err { font-family:'Inter',sans-serif; font-size:13.5px; font-weight:600; color:#c0392b; background:rgba(192,57,43,0.07); border:1px solid rgba(192,57,43,0.2); border-radius:10px; padding:12px 14px; margin:18px 0 0; line-height:1.5; }
        .ctx-ok { display:flex; flex-direction:column; gap:16px; align-items:flex-start; padding:24px 0; }
        .ctx-ok-h { font-family:'Poppins',sans-serif; font-size:26px; font-weight:700; color:${NAVY}; margin:0; letter-spacing:-0.02em; }
        .ctx-ok-p { font-family:'Inter',sans-serif; font-size:15px; color:${MUTED}; line-height:1.7; margin:0; max-width:380px; }

        .pk-cta-btn { position:relative; overflow:hidden; display:inline-flex; align-items:center; gap:10px; background:${GREEN}; color:#fff; border:none; border-radius:14px; padding:15px 36px; font-family:'Poppins',sans-serif; font-size:16px; font-weight:500; box-shadow:0 16px 34px -14px rgba(60,185,140,0.75); transition:transform 0.25s cubic-bezier(0.16,1,0.3,1), background 0.25s ease, box-shadow 0.25s ease; cursor:pointer; }
        .pk-cta-btn span { position:relative; z-index:1; }
        .pk-cta-btn::after { content:''; position:absolute; top:0; left:-120%; width:55%; height:100%; background:linear-gradient(110deg, transparent, rgba(255,255,255,0.45), transparent); transform:skewX(-18deg); transition:left 0.7s cubic-bezier(0.16,1,0.3,1); }
        .pk-cta-btn:hover { transform:translateY(-2px); background:#34ab80; }
        .pk-cta-btn:hover::after { left:135%; }

        /* ── responsive ── */
        @media (max-width:980px){
          .cx-loc-grid, .cx-loc-grid.single { grid-template-columns:1fr 1fr; }
          .ctx-panel { grid-template-columns:1fr; }
        }
        @media (max-width:600px){
          .cx-loc-grid, .cx-loc-grid.single { grid-template-columns:1fr; }
          .cx-hero-meta { flex-direction:column; align-items:stretch; }
          .cx-hero-cta { justify-content:center; }
        }
        @media (min-width:1920px){
          .cx-hero-in, .cx-loc-wrap { max-width:1900px; } .ctx-panel { max-width:1640px; }
          .cx-hero-h1 { font-size:150px; }
          .cx-loc-h2 { font-size:70px; }
          .cx-loc-time { font-size:50px; }
          .ctx-aside-h { font-size:48px; }
          .ctx-form-h { font-size:62px; }
        }
        @media (min-width:2560px){
          .cx-hero-in, .cx-loc-wrap { max-width:2400px; } .ctx-panel { max-width:2000px; }
          .cx-hero-h1 { font-size:208px; }
          .cx-loc-h2 { font-size:92px; }
          .cx-loc-time { font-size:58px; }
          .cx-loc-city { font-size:34px; }
          .ctx-aside-h { font-size:60px; }
          .ctx-form-h { font-size:78px; }
        }
      `}</style>
    </div>
  )
}
