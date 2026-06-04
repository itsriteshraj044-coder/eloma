import { useState, useRef, useEffect } from 'react'
import { Menu, X, ChevronDown, ChevronRight, Phone } from 'lucide-react'
import { navItems, loginItems } from '../../data/navItems'
import { DropdownMenu } from './DropdownMenu'
import { useScrollY } from '../../hooks/useScrollY'

export function Header() {
  const scrollY = useScrollY()

  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [loginOpen, setLoginOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const anyOpen = openDropdown !== null || loginOpen

  // Transparent while the first hero section (100vh) is still in view
  const overHero = scrollY < (typeof window !== 'undefined' ? window.innerHeight - 64 : 700)

  // Transparent when #services section occupies the header zone
  const [overServices, setOverServices] = useState(false)

  // Transparent when any of the other hero sections covers the header area
  const [overHeroSection, setOverHeroSection] = useState(false)

  useEffect(() => {
    const HERO_IDS = ['hero2-section', 'hero3-section', 'hero4-section']
    const HEADER_H = 64

    const check = () => {
      // services check
      const svc = document.getElementById('services')
      if (svc) {
        const r = svc.getBoundingClientRect()
        setOverServices(r.top < 80 && r.bottom > 0)
      }

      // other hero sections check — any section whose rect straddles the header
      const over = HERO_IDS.some(id => {
        const el = document.getElementById(id)
        if (!el) return false
        const r = el.getBoundingClientRect()
        return r.top <= HEADER_H && r.bottom > HEADER_H
      })
      setOverHeroSection(over)
    }

    window.addEventListener('scroll', check, { passive: true })
    check()
    return () => window.removeEventListener('scroll', check)
  }, [])

  const transparent = (overHero || overServices || overHeroSection) && !anyOpen && !mobileOpen
  const textColor = transparent ? '#ffffff' : '#08213C'

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }

  const scheduleClose = () => {
    cancelClose()
    closeTimer.current = setTimeout(() => {
      setOpenDropdown(null)
      setLoginOpen(false)
    }, 180)
  }

  const handleNavEnter = (label: string) => {
    cancelClose()
    setOpenDropdown(label)
    setLoginOpen(false)
  }

  const handleLoginEnter = () => {
    cancelClose()
    setLoginOpen(true)
    setOpenDropdown(null)
  }

  const closeAll = () => {
    setOpenDropdown(null)
    setLoginOpen(false)
  }

  return (
    <>
      <header
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
            ? 'linear-gradient(to bottom, rgba(8,33,60,0.55) 0%, transparent 100%)'
            : 'rgba(255,255,255,0.97)',
          backdropFilter: transparent ? 'none' : 'blur(12px)',
          transition: 'background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease',
        }}
        onMouseLeave={scheduleClose}
      >
        <div
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
          {/* Logo — icon + wordmark, both with transparent backgrounds */}
          <a href="/" style={{ flexShrink: 0, lineHeight: 0, display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
            <img
              src="/images/Final Eloma Group icon white.png"
              alt=""
              aria-hidden
              style={{ height: '44px', width: 'auto' }}
            />
            <img
              src="/images/eloma-wordmark-t.png"
              alt="Eloma Group"
              style={{
                height: '30px', width: 'auto',
                filter: transparent ? 'brightness(0) invert(1)' : 'none',
                transition: 'filter 0.3s ease',
              }}
            />
          </a>

          {/* Desktop Nav */}
          <nav
            className="bivry-desktop-nav"
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

            {/* Toll-free number — after Contact */}
            <a
              href="tel:1800054555"
              onMouseEnter={closeAll}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '0 14px',
                height: '64px',
                fontSize: '14px',
                fontWeight: 700,
                color: transparent ? 'rgba(255,255,255,0.9)' : '#3CB98C',
                letterSpacing: '0.2px',
                whiteSpace: 'nowrap',
                transition: 'color 0.25s ease',
                textDecoration: 'none',
              }}
            >
              <Phone size={13} strokeWidth={2} />
              1800 054 555
            </a>
          </nav>

          {/* Right side - Login + Hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Login dropdown - desktop */}
            <div
              className="bivry-desktop-nav"
              style={{ position: 'relative' }}
              onMouseEnter={handleLoginEnter}
            >
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '8px 18px',
                  fontSize: '14.5px',
                  fontWeight: 600,
                  color: '#ffffff',
                  background: '#08213C',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'background 0.25s ease, color 0.25s ease',
                  backdropFilter: 'blur(4px)',
                  whiteSpace: 'nowrap',
                }}
              >
                Login
                <ChevronDown
                  size={12}
                  style={{
                    transition: 'transform 0.2s ease',
                    transform: loginOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                />
              </button>

              {/* Small login dropdown (not full-width) */}
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  right: 0,
                  minWidth: '180px',
                  background: '#ffffff',
                  border: '1px solid #E5E5E5',
                  borderRadius: '10px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
                  padding: '8px 0',
                  opacity: loginOpen ? 1 : 0,
                  pointerEvents: loginOpen ? 'auto' : 'none',
                  transform: loginOpen ? 'translateY(0)' : 'translateY(-6px)',
                  transition: 'opacity 0.18s ease, transform 0.18s ease',
                  zIndex: 100,
                }}
              >
                {loginItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    style={{
                      display: 'block',
                      padding: '12px 20px',
                      fontSize: '14px',
                      fontWeight: 400,
                      color: '#111111',
                      transition: 'background 0.15s ease',
                    }}
                    onMouseEnter={(e) => {
                      ;(e.currentTarget as HTMLElement).style.background = '#F7F7F7'
                    }}
                    onMouseLeave={(e) => {
                      ;(e.currentTarget as HTMLElement).style.background = 'transparent'
                    }}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Hamburger - mobile */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="bivry-mobile-only"
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
                                if (child.serviceId) {
                                  e.preventDefault()
                                  if (window.location.pathname !== '/') {
                                    sessionStorage.setItem('pendingService', child.serviceId)
                                    window.location.href = '/'
                                  } else {
                                    window.dispatchEvent(new CustomEvent('bivry:service', { detail: { serviceId: child.serviceId } }))
                                  }
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

          <div
            style={{
              marginTop: '28px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {loginItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                style={{
                  display: 'block',
                  padding: '14px 0',
                  textAlign: 'center',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#ffffff',
                  background: '#08213C',
                  borderRadius: '8px',
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .bivry-desktop-nav { display: none !important; }
          .bivry-mobile-only { display: flex !important; }
        }
        @media (min-width: 901px) {
          .bivry-mobile-only { display: none !important; }
          .bivry-desktop-nav { display: flex !important; }
        }
      `}</style>
    </>
  )
}
