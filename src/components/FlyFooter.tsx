import { Phone, Mail, MapPin, ArrowUp } from 'lucide-react'
import { openSection } from '../utils/sectionLink'

const NAVY  = '#08213C'
const GREEN = '#3CB98C'

const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent('71 Gipps Street, Collingwood, Melbourne, VIC 3066, Australia')

type FooterLinkItem = { label: string; href: string; companyId?: string; businessId?: string }
const COLS: { heading: string; accent?: boolean; links: FooterLinkItem[] }[] = [
  {
    heading: 'Our Businesses',
    links: [
      { label: 'Call Centre',       href: '/#our-businesses', businessId: 'call-centre'       },
      { label: 'Imports',           href: '/#our-businesses', businessId: 'imports'           },
      { label: 'IT Infrastructure', href: '/#our-businesses', businessId: 'it-infrastructure' },
      { label: 'Supply Chain',      href: '/#our-businesses', businessId: 'supply-chain'      },
      { label: 'Travel',            href: '/#our-businesses', businessId: 'travel'            },
    ],
  },
  {
    heading: 'Our Companies',
    accent: true,
    links: [
      { label: 'Eloma Group',          href: '/companies/eloma-group' },
      { label: 'EG Digital Australia', href: '/companies/eg-digital'  },
      { label: 'EG Imports',           href: '/companies/eg-imports' },
      { label: 'EG Transport - BIVRY', href: '/companies/bivry'      },
      { label: 'EG Travels',           href: '/companies/eg-travels' },
    ],
  },
  {
    heading: 'Quick Links',
    links: [
      { label: 'About Us', href: '/about'    },
      { label: 'Blog',     href: '/blog'     },
      { label: 'Newsroom', href: '/newsroom' },
      { label: 'Partners', href: '/partners' },
      { label: 'Careers',  href: '/careers'  },
    ],
  },
  {
    heading: 'Sustainability',
    links: [
      { label: 'Environment', href: '/sustainability' },
      { label: 'Initiatives', href: '/sustainability' },
      { label: 'Reports',     href: '/sustainability' },
      { label: 'Contact Us',  href: '/contact'        },
    ],
  },
]

/* ── Inline brand SVGs (lucide removed brand icons) ── */
function IconLinkedIn() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
    </svg>
  )
}
function IconTwitterX() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )
}
function IconFacebook() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  )
}
function IconInstagram() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  )
}
function IconTikTok() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  )
}
function IconYouTube() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14C4.5 20.45 12 20.45 12 20.45s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8zM9.55 15.57V8.43L15.82 12l-6.27 3.57z"/>
    </svg>
  )
}
function IconThreads() {
  return (
    <svg width="15" height="15" viewBox="0 0 192 192" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.723 128.946 98.4405 129.507Z"/>
    </svg>
  )
}

const socials = [
  { Icon: IconLinkedIn,  href: 'https://www.linkedin.com/company/elomagroup/',  label: 'LinkedIn',  bg: '#0A66C2', color: '#fff' },
  { Icon: IconTwitterX,  href: 'https://x.com/elomagroup2026',                  label: 'Twitter/X', bg: '#000000', color: '#fff' },
  { Icon: IconFacebook,  href: 'https://www.facebook.com/61572138328088/',      label: 'Facebook',  bg: '#1877F2', color: '#fff' },
  { Icon: IconInstagram, href: 'https://www.instagram.com/eloma_group/',        label: 'Instagram', bg: 'linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)', color: '#fff' },
  { Icon: IconYouTube,   href: 'https://www.youtube.com/@elomagroup',           label: 'YouTube',   bg: '#FF0000', color: '#fff' },
  { Icon: IconTikTok,    href: 'https://www.tiktok.com/@eloma_group_6',         label: 'TikTok',    bg: '#000000', color: '#fff' },
  { Icon: IconThreads,   href: 'https://www.threads.com/@eloma_group',          label: 'Threads',   bg: '#000000', color: '#fff' },
]

function SectionHeading({ label, accent }: { label: string; accent?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 20 }}>
      <div style={{ width: 3, height: 14, background: GREEN, borderRadius: 2, flexShrink: 0 }} />
      <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '1.8px', textTransform: 'uppercase', color: accent ? GREEN : '#fff' }}>
        {label}
      </span>
    </div>
  )
}

function FooterLink({ children, to, onClick }: { children: React.ReactNode; to: string; onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void }) {
  const style: React.CSSProperties = { fontSize: 13.5, color: 'rgba(255,255,255,0.5)', transition: 'all 0.18s ease', display: 'block', textDecoration: 'none' }
  const onEnter = (e: React.MouseEvent<HTMLElement>) => { const el = e.currentTarget; el.style.color = '#fff'; el.style.paddingLeft = '5px' }
  const onLeave = (e: React.MouseEvent<HTMLElement>) => { const el = e.currentTarget; el.style.color = 'rgba(255,255,255,0.5)'; el.style.paddingLeft = '0' }
  return <a href={to} onClick={onClick} style={style} onMouseEnter={onEnter} onMouseLeave={onLeave}>{children}</a>
}

function scrollToTop() {
  const w = window as unknown as {
    __lenis?: { scrollTo: (t: number, o?: object) => void }
    __egStopLock?: number
  }
  // Tell the step-locked sections (Businesses / Companies) to stand down so they
  // don't grab the scroll and snap us mid-way to the top.
  w.__egStopLock = performance.now() + 2200
  if (w.__lenis?.scrollTo) w.__lenis.scrollTo(0, { duration: 1.5, lock: true, force: true })
  else window.scrollTo({ top: 0, behavior: 'smooth' })
}

export function FlyFooter() {
  return (
    <footer style={{ background: NAVY, position: 'relative', overflow: 'hidden' }}>

      {/* Subtle inner glow top-center */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '60%', height: '320px',
        background: `radial-gradient(ellipse at top, ${GREEN}0C 0%, transparent 65%)`,
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Green top accent line */}
      <div style={{ height: 2, background: `linear-gradient(90deg, transparent, ${GREEN}, transparent)` }} />

      {/* ── Main grid ── */}
      <div style={{ padding: 'clamp(56px,7vw,96px) clamp(24px,5vw,80px) 0', position: 'relative', zIndex: 1 }}>
        <div className="ff-inner">
          <div
            className="ff-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1.8fr 1fr 1fr 1fr 1fr',
              gap: 'clamp(28px,3vw,52px)',
              paddingBottom: 'clamp(52px,6vw,88px)',
              alignItems: 'start',
            }}
          >

            {/* ── Brand column ── */}
            <div>
              <a href="/" style={{ display: 'inline-block', lineHeight: 0, marginTop: -48, marginBottom: -24 }}>
                <img src="/images/Eloma Group Trademark Logo-02.png" alt="Eloma Group" style={{ height: 220, width: 'auto' }} />
              </a>

              <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.42)', lineHeight: 1.9, maxWidth: 290, marginBottom: 28 }}>
                Australia's multi-industry holding company - building world-class enterprises
                across transport, technology, imports and travel.
              </p>

              {/* Contact details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
                <a href="tel:1800054555" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 13.5, color: 'rgba(255,255,255,0.55)', transition: 'color 0.16s ease', textDecoration: 'none' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = GREEN }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)' }}
                >
                  <Phone size={14} strokeWidth={1.5} style={{ flexShrink: 0, color: GREEN }} />
                  1800 054 555
                </a>
                <a href="mailto:connect@elomagroup.com.au" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 13.5, color: 'rgba(255,255,255,0.55)', transition: 'color 0.16s ease', textDecoration: 'none' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = GREEN }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)' }}
                >
                  <Mail size={14} strokeWidth={1.5} style={{ flexShrink: 0, color: GREEN }} />
                  connect@elomagroup.com.au
                </a>

                {/* Highlighted location */}
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ff-info-box ff-location-link"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 10,
                    background: 'rgba(60,185,140,0.12)',
                    border: '1px solid rgba(60,185,140,0.25)',
                    borderRadius: 8, padding: '8px 12px',
                    textDecoration: 'none',
                    transition: 'background 0.2s ease, border-color 0.2s ease',
                  }}
                >
                  <MapPin size={14} strokeWidth={1.5} style={{ flexShrink: 0, color: GREEN }} />
                  <span style={{ fontSize: 13, color: '#fff', fontWeight: 500, transition: 'color 0.2s ease' }}>
                    71 Gipps Street, Collingwood,<br />Melbourne, VIC 3066, Australia
                  </span>
                </a>

                {/* Highlighted ABN */}
                <div className="ff-info-box" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 8, padding: '11px 14px',
                }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: GREEN, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                    ABN
                  </span>
                  <div style={{ width: 1, height: 12, background: 'rgba(255,255,255,0.2)' }} />
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', fontWeight: 500, letterSpacing: '0.5px' }}>
                    69 683 543 713
                  </span>
                </div>

                {/* Company name */}
                <div className="ff-info-box" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  borderRadius: 8, padding: '11px 14px',
                }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: GREEN, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                    Co.
                  </span>
                  <div style={{ width: 1, height: 12, background: 'rgba(255,255,255,0.2)' }} />
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>
                    Eloma Group Of Companies Pty Ltd
                  </span>
                </div>
              </div>

              {/* Colorful social icons */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {socials.map(({ Icon, href, label, bg, color }) => (
                  <a key={label} href={href} aria-label={label} target="_blank" rel="noopener noreferrer" style={{
                    width: 38, height: 38, borderRadius: 9,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: bg, color,
                    textDecoration: 'none',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
                  }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-3px) scale(1.08)'; el.style.boxShadow = '0 8px 20px rgba(0,0,0,0.35)' }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(0) scale(1)'; el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.25)' }}
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>

            {/* ── Nav link columns ── */}
            {COLS.map(col => (
              <div key={col.heading}>
                <SectionHeading label={col.heading} accent={col.accent} />
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 13, margin: 0, padding: 0 }}>
                  {col.links.map(item => (
                    <li key={item.label}>
                      <FooterLink
                        to={item.href}
                        onClick={(item.companyId || item.businessId) ? (e) => {
                          e.preventDefault()
                          if (item.companyId) openSection('company', item.companyId)
                          else if (item.businessId) openSection('business', item.businessId)
                        } : undefined}
                      >
                        {item.label}
                      </FooterLink>
                    </li>
                  ))}
                </ul>

                {/* Back-to-top under the last (Sustainability) column */}
                {col.heading === 'Sustainability' && (
                  <button
                    type="button"
                    onClick={scrollToTop}
                    aria-label="Back to top"
                    className="ff-top-btn"
                    style={{
                      marginTop: 24,
                      display: 'inline-flex', alignItems: 'center', gap: 9,
                      background: 'rgba(60,185,140,0.10)',
                      border: '1px solid rgba(60,185,140,0.30)',
                      borderRadius: 10, padding: '10px 16px',
                      color: GREEN, cursor: 'pointer',
                      fontSize: 12, fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase',
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    <ArrowUp className="ff-top-arrow" size={15} strokeWidth={2.4} />
                    Back to Top
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Protected by - EG Digital shield (just above divider) */}
          <div className="ff-protected" style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end', gap: 0, paddingBottom: 18 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', paddingBottom: 16, marginRight: -14 }}>
              Protected by
            </span>
            <a href="https://egdigital.com.au/" target="_blank" rel="noopener noreferrer" aria-label="EG Digital"
              style={{ display: 'inline-block', lineHeight: 0, opacity: 0.9, transition: 'opacity 0.18s ease, transform 0.24s ease' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.opacity = '1'; el.style.transform = 'scale(1.05)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.opacity = '0.9'; el.style.transform = 'scale(1)' }}
            >
              <img src="/Shield Animation.gif" alt="EG Digital" style={{ height: 92, width: 'auto', display: 'block' }} />
            </a>
          </div>

          {/* ── Divider ── */}
          <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', position: 'relative' }}>
            <div style={{
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
              width: 8, height: 8, borderRadius: '50%',
              background: GREEN, boxShadow: `0 0 10px ${GREEN}70`,
            }} />
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div style={{ padding: '0 clamp(24px,5vw,80px)', position: 'relative', zIndex: 1 }}>
        <div className="ff-inner">
          <div style={{
            padding: 'clamp(18px,2.5vw,28px) 0 clamp(22px,3vw,32px)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            flexWrap: 'wrap', gap: 14,
            borderTop: '1px solid rgba(255,255,255,0.07)',
          }}>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.28)', margin: 0 }}>
              © {new Date().getFullYear()} Eloma Group Of Companies Pty Ltd. All rights reserved.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(10px,2vw,24px)', flexWrap: 'wrap' }}>
              {['Privacy Policy', 'Terms of Use'].map(link => (
                <a key={link} href="#" style={{ fontSize: 12, color: 'rgba(255,255,255,0.28)', transition: 'color 0.15s ease', textDecoration: 'none' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = GREEN }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.28)' }}
                >
                  {link}
                </a>
              ))}
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.22)' }}>
                Developed by{' '}
                <a href="https://egdigital.com.au/" target="_blank" rel="noopener noreferrer"
                  style={{ color: GREEN, fontWeight: 600, textDecoration: 'none' }}>
                  EG Digital
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .ff-inner { max-width: none; margin: 0 auto; }

        @media (max-width: 1100px) { .ff-grid { grid-template-columns: 1.5fr 1fr 1fr !important; } }
        @media (max-width: 640px)  { .ff-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 420px)  { .ff-grid { grid-template-columns: 1fr !important; } }

        /* protected-by centres on mobile (matches Bivry) */
        @media (max-width: 640px) { .ff-protected { justify-content: center !important; gap: 24px !important; } }


        .ff-info-box {
          transition: transform 0.24s cubic-bezier(0.34,1.56,0.64,1), border-color 0.22s ease, background 0.22s ease, box-shadow 0.22s ease;
          cursor: default;
        }
        .ff-location-link { cursor: pointer; }
        .ff-info-box:hover {
          transform: translateY(-4px);
          border-color: rgba(60,185,140,0.65) !important;
          background: rgba(60,185,140,0.18) !important;
          box-shadow: 0 10px 28px rgba(60,185,140,0.18);
        }

        .ff-top-btn {
          transition: transform 0.24s cubic-bezier(0.34,1.56,0.64,1), background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
          will-change: transform;
        }
        .ff-top-btn:hover {
          transform: translateY(-3px);
          background: rgba(60,185,140,0.20) !important;
          border-color: rgba(60,185,140,0.6) !important;
          box-shadow: 0 12px 26px -12px rgba(60,185,140,0.5);
        }
        .ff-top-arrow { transition: transform 0.24s cubic-bezier(0.16,1,0.3,1); }
        .ff-top-btn:hover .ff-top-arrow { transform: translateY(-3px); }
      `}</style>
    </footer>
  )
}
