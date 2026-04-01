import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { label: 'ACCUEIL', href: '#top' },
  { label: 'DESTINATIONS', href: '#destinations' },
  { label: 'CHRONOS', action: 'chat' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <motion.nav
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 var(--space-8)',
        background: scrolled ? 'rgba(8,8,7,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
        transition: 'background 300ms ease, border-bottom 300ms ease, backdrop-filter 300ms ease',
      }}
    >
      <a
        href="#"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-lg)',
          fontWeight: 400,
          color: 'var(--color-gold)',
          letterSpacing: '0.02em',
          textDecoration: 'none',
        }}
      >
        TimeTravel Agency
      </a>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-8)',
        }}
        className="nav-desktop"
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href || '#'}
            onClick={(e) => {
              if (link.action) {
                e.preventDefault()
                const chatBtn = document.querySelector('[data-chat-toggle]')
                if (chatBtn) chatBtn.click()
              }
            }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              fontWeight: 500,
              letterSpacing: '0.06em',
              color: 'var(--color-muted)',
              textDecoration: 'none',
              transition: 'color 200ms',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => (e.target.style.color = 'var(--color-text)')}
            onMouseLeave={(e) => (e.target.style.color = 'var(--color-muted)')}
          >
            {link.label}
          </a>
        ))}
      </div>

      <button
        className="nav-mobile-toggle"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Menu"
        style={{
          display: 'none',
          flexDirection: 'column',
          gap: '5px',
          padding: '4px',
        }}
      >
        <span style={{
          display: 'block', width: '20px', height: '1px',
          background: 'var(--color-text)',
          transition: 'transform 300ms ease, opacity 300ms ease',
          transform: mobileOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none',
        }} />
        <span style={{
          display: 'block', width: '20px', height: '1px',
          background: 'var(--color-text)',
          transition: 'opacity 300ms ease',
          opacity: mobileOpen ? 0 : 1,
        }} />
        <span style={{
          display: 'block', width: '20px', height: '1px',
          background: 'var(--color-text)',
          transition: 'transform 300ms ease, opacity 300ms ease',
          transform: mobileOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none',
        }} />
      </button>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99,
              background: 'rgba(8,8,7,0.97)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--space-10)',
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href || '#'}
                onClick={(e) => {
                  setMobileOpen(false)
                  if (link.action) {
                    e.preventDefault()
                    setTimeout(() => {
                      const chatBtn = document.querySelector('[data-chat-toggle]')
                      if (chatBtn) chatBtn.click()
                    }, 400)
                  }
                }}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2rem, 5vw, 3rem)',
                  fontWeight: 300,
                  color: 'var(--color-text)',
                  textDecoration: 'none',
                  letterSpacing: '0.02em',
                }}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
