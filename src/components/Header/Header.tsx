import { useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react'
import { navItems } from '../../data/navItems'
import { DropdownMenu } from './DropdownMenu'
import { useScrollY } from '../../hooks/useScrollY'
import { openSection } from '../../utils/sectionLink'

export function Header() {
  const scrollY = useScrollY()
  const { pathname } = useLocation()

  // The floating white fade overlay only belongs on the homepage hero video.
  // Every other route keeps a solid white sticky header.
  const isHome = pathname === '/'

  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const anyOpen = openDropdown !== null

  // Transparent while the first hero section (100vh) is still in view — homepage only
  const overHero = isHome && scrollY < (typeof window !== 'undefined' ? window.innerHeight - 64 : 700)

  // Transparent when #services section occupies the header zone
  const [overServices, setOverServices] = useState(false)

  // Transparent when any of the other hero sections covers the header area
  const [overHeroSection, setOverHeroSection] = useState(false)

  useEffect(() => {
    const HERO_IDS = ['hero2-section', 'hero3-section', 'hero4-section']
    const HEADER_H = 64

    const straddles = (id: string) => {
      const el = document.getElementById(id)
      if (!el) return false
      const r = el.getBoundingClientRect()
      return r.top <= HEADER_H && r.bottom > HEADER_H
    }

    const check = () => {
      // services check
      const svc = document.getElementById('services')
      if (svc) {
        const r = svc.getBoundingClientRect()
        setOverServices(r.top < 80 && r.bottom > 0)
      }

      // other hero sections check - any section whose rect straddles the header
      setOverHeroSection(HERO_IDS.some(straddles))
    }

    window.addEventListener('scroll', check, { passive: true })
    check()
    return () => window.removeEventListener('scroll', check)
  }, [])

  // The homepage hero is a dark full-bleed video, so the header floats transparent
  // over it (white wordmark) - same as the inner hero sections and dark sections.
  const transparent =
    (overHero || overServices || overHeroSection) && !anyOpen && !mobileOpen
  const textColor = '#08213C'

  // Always use the original full-colour Eloma Group wordmark.
  const logoSrc = '/images/Eloma Group Email Sign Logo -01.png'

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }

  const scheduleClose = () => {
    cancelClose()
    closeTimer.current = setTimeout(() => {
      setOpenDropdown(null)
    }, 180)
  }

  const handleNavEnter = (label: string) => {
    cancelClose()
    setOpenDropdown(label)
  }

  const closeAll = () => {
    setOpenDropdown(null)
  }

  return (
    <>
      <header
        className="eg-hd"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          background: transparent
            ? 'linear-gradient(to bottom, rgba(255,255,255,0.55) 0%, transparent 100%)'
            : '#ffffff',
          backdropFilter: transparent ? 'none' : 'blur(12px)',
          transition: 'background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease',
        }}
        onMouseLeave={scheduleClose}
      >
        <div
          className="eg-hd-inner"
          style={{
            maxWidth: '1280px',
            width: '100%',
            margin: '0 auto',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo - single Eloma Group email-sign logo */}
          <a href="/" style={{ flexShrink: 0, lineHeight: 0, display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img
              className="eg-hd-logo"
              src={logoSrc}
              alt="Eloma Group"
              decoding="async"
              style={{
                height: '34px',
                width: 'auto',
                display: 'block',
                // render the fine wordmark strokes crisp on its own GPU layer; on the
                // dark hero a soft white glow lifts the original colours so they read
                // clearly without changing the logo's colour
                transform: 'translateZ(0)',
                filter: transparent
                  ? 'drop-shadow(0 0 3px rgba(255,255,255,0.9)) drop-shadow(0 1px 8px rgba(255,255,255,0.6))'
                  : 'none',
                transition: 'filter 0.3s ease',
              }}
            />
          </a>

          {/* Desktop Nav */}
          <nav
            className="eg-desktop-nav"
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {navItems.map((item) => (
              <div
                key={item.label}
                style={{ position: 'relative' }}
                onMouseEnter={() =>
                  item.columns ? handleNavEnter(item.label) : closeAll()
                }
              >
                <a
                  href={item.href ?? '#'}
                  className="eg-hd-link"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3px',
                    padding: '0 14px',
                    height: '64px',
                    fontSize: '14.5px',
                    fontWeight: 600,
                    color: textColor,
                    letterSpacing: '0.1px',
                    transition: 'color 0.25s ease, opacity 0.15s ease',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    opacity: openDropdown && openDropdown !== item.label ? 0.55 : 1,
                  }}
                >
                  {item.label}
                  {item.columns && (
                    <ChevronDown
                      size={12}
                      style={{
                        transition: 'transform 0.2s ease',
                        transform:
                          openDropdown === item.label
                            ? 'rotate(180deg)'
                            : 'rotate(0deg)',
                      }}
                    />
                  )}
                </a>
              </div>
            ))}
          </nav>

          {/* Right side - Hamburger (mobile) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Hamburger - mobile */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="eg-mobile-only"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: textColor,
                padding: '4px',
                display: 'none',
                transition: 'color 0.25s ease',
              }}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-width dropdown panels */}
      {navItems.map((item) =>
        item.columns ? (
          <DropdownMenu
            key={item.label}
            columns={item.columns}
            isOpen={openDropdown === item.label}
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
          />
        ) : null
      )}

      {/* Mobile Drawer */}
      <div
        style={{
          position: 'fixed',
          top: '64px',
          left: 0,
          right: 0,
          bottom: 0,
          background: '#ffffff',
          zIndex: 49,
          overflowY: 'auto',
          transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div style={{ padding: '16px 24px 64px' }}>
          {navItems.map((item) => (
            <div
              key={item.label}
              style={{ borderBottom: '1px solid #F0F0F0' }}
            >
              {item.columns ? (
                <>
                  <button
                    onClick={() =>
                      setMobileExpanded(
                        mobileExpanded === item.label ? null : item.label
                      )
                    }
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '18px 0',
                      fontSize: '16px',
                      fontWeight: 500,
                      color: '#111111',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    {item.label}
                    <ChevronRight
                      size={16}
                      style={{
                        transform:
                          mobileExpanded === item.label
                            ? 'rotate(90deg)'
                            : 'rotate(0deg)',
                        transition: 'transform 0.2s ease',
                        color: '#6B6B6B',
                      }}
                    />
                  </button>
                  {mobileExpanded === item.label && (
                    <div style={{ paddingBottom: '12px' }}>
                      {item.columns.map((col) => (
                        <div key={col.heading} style={{ marginBottom: '20px' }}>
                          <p
                            style={{
                              fontSize: '10px',
                              fontWeight: 600,
                              letterSpacing: '2px',
                              textTransform: 'uppercase',
                              color: '#6B6B6B',
                              marginBottom: '10px',
                              paddingLeft: '16px',
                            }}
                          >
                            {col.heading}
                          </p>
                          {col.items.map((child) => (
                            <a
                              key={child.label}
                              href={child.href}
                              onClick={(e) => {
                                setMobileOpen(false)
                                if (child.companyId) {
                                  e.preventDefault()
                                  openSection('company', child.companyId)
                                } else if (child.businessId) {
                                  e.preventDefault()
                                  openSection('business', child.businessId)
                                }
                              }}
                              style={{
                                display: 'block',
                                padding: '9px 0 9px 16px',
                                fontSize: '14px',
                                color: '#111111',
                              }}
                            >
                              {child.label}
                            </a>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <a
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: 'block',
                    padding: '18px 0',
                    fontSize: '16px',
                    fontWeight: 500,
                    color: '#111111',
                  }}
                >
                  {item.label}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .eg-desktop-nav { display: none !important; }
          .eg-mobile-only { display: flex !important; }
        }
        @media (min-width: 901px) {
          .eg-mobile-only { display: none !important; }
          .eg-desktop-nav { display: flex !important; }
        }

        /* large screens: bigger logo + nav text + taller bar */
        @media (min-width: 1920px) {
          .eg-hd { height: 78px !important; }
          .eg-hd-inner { max-width: 1600px !important; }
          .eg-hd-logo { height: 36px !important; }
          .eg-hd-word { font-size: 24px !important; }
          .eg-hd-link { height: 78px !important; font-size: 16.5px !important; padding: 0 18px !important; }
          .eg-hd-dd   { font-size: 16.5px !important; }
        }
        @media (min-width: 2560px) {
          .eg-hd { height: 92px !important; }
          .eg-hd-inner { max-width: 2000px !important; }
          .eg-hd-logo { height: 44px !important; }
          .eg-hd-word { font-size: 30px !important; }
          .eg-hd-link { height: 92px !important; font-size: 20px !important; padding: 0 24px !important; }
          .eg-hd-dd   { font-size: 20px !important; }
        }
      `}</style>
    </>
  )
}
