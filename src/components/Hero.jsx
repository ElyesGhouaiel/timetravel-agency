import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { destinations } from '../data/destinations'

const IMAGES = destinations.map((d) => d.image)
const MARQUEE_TEXT = 'Chine des 3 Royaumes  ·  Japon Féodal  ·  Carthage Antique  ·  '

const ease = [0.16, 1, 0.3, 1]

export default function Hero() {
  const [activeImg, setActiveImg] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImg((prev) => (prev + 1) % IMAGES.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="hero-clip" style={{
      position: 'relative',
      overflow: 'hidden',
      background: 'var(--color-bg)',
      paddingBottom: 'var(--space-16)',
    }}>
      <div style={{
        position: 'absolute',
        top: '-20%',
        left: '-10%',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(196,152,62,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: 'var(--space-16) var(--space-8) var(--space-8)',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-12)',
      }} className="hero-grid">
        {/* Colonne gauche */}
        <div style={{ flex: '0 0 60%', minWidth: 0 }} className="hero-left">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6, ease }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: 'var(--space-6)',
            }}
          >
            <span style={{
              display: 'block',
              width: '1px',
              height: '32px',
              background: 'var(--color-gold)',
            }} />
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--color-gold)',
              opacity: 0.8,
            }}>
              Agence de voyages temporels — Fondée en 2024
            </span>
          </motion.div>

          {/* Titre */}
          <h1 style={{ marginBottom: 'var(--space-6)' }}>
            {[
              { text: 'Voyagez', style: {
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-hero)',
                fontWeight: 300,
                color: 'var(--color-text)',
                display: 'block',
              }},
              { text: 'à travers', style: {
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-hero)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: 'var(--color-gold)',
                display: 'block',
              }},
              { text: 'le temps.', style: {
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-hero)',
                fontWeight: 300,
                color: 'var(--color-muted)',
                display: 'block',
              }},
            ].map((line, i) => (
              <motion.span
                key={line.text}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.2, duration: 0.7, ease }}
                style={line.style}
              >
                {line.text}
              </motion.span>
            ))}
          </h1>

          {/* Sous-titre */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.7, ease }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-base)',
              color: 'var(--color-muted)',
              maxWidth: '42ch',
              marginBottom: 'var(--space-8)',
            }}
          >
            L'unique agence qui vous emmène là où l'histoire s'est jouée.
          </motion.p>

          {/* Boutons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.7, ease }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)' }}
          >
            <motion.a
              href="#destinations"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-block',
                background: 'var(--color-gold)',
                color: '#0a0a0a',
                padding: '14px 28px',
                borderRadius: 'var(--radius-full)',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm)',
                fontWeight: 600,
                letterSpacing: '0.04em',
                textDecoration: 'none',
                transition: 'background 200ms',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-gold-light)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--color-gold)')}
            >
              Explorer les destinations
            </motion.a>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                const chatBtn = document.querySelector('[data-chat-toggle]')
                if (chatBtn) chatBtn.click()
              }}
              style={{
                padding: '14px 28px',
                borderRadius: 'var(--radius-full)',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm)',
                fontWeight: 600,
                letterSpacing: '0.04em',
                color: 'var(--color-text)',
                border: '1px solid var(--color-border-strong)',
                background: 'transparent',
                cursor: 'pointer',
                transition: 'border-color 200ms, color 200ms',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-gold-border)'
                e.currentTarget.style.color = 'var(--color-gold)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border-strong)'
                e.currentTarget.style.color = 'var(--color-text)'
              }}
            >
              Parler à Chronos
            </motion.button>
          </motion.div>
        </div>

        {/* Colonne droite — carousel images */}
        <div style={{ flex: '0 0 40%', minWidth: 0 }} className="hero-right">
          <div style={{
            border: '1px solid var(--color-gold-border)',
            borderRadius: 'var(--radius-2xl)',
            height: '420px',
            overflow: 'hidden',
            position: 'relative',
          }}>
            {IMAGES.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={destinations[i].nom}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: activeImg === i ? 1 : 0,
                  transition: 'opacity 1.2s ease',
                }}
              />
            ))}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(8,8,7,0.7) 0%, transparent 50%)',
              pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute',
              bottom: 'var(--space-4)',
              left: 'var(--space-4)',
              right: 'var(--space-4)',
            }}>
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--color-gold)',
              }}>
                {destinations[activeImg].badge}
              </span>
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-xl)',
                fontWeight: 400,
                color: 'var(--color-text)',
                marginTop: '2px',
              }}>
                {destinations[activeImg].nom}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div style={{
        overflow: 'hidden',
        borderTop: '1px solid var(--color-border)',
        paddingTop: 'var(--space-4)',
        marginTop: 'var(--space-8)',
      }}>
        <div style={{
          display: 'flex',
          width: 'max-content',
          animation: 'marquee 20s linear infinite',
        }}>
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--color-faint)',
                whiteSpace: 'nowrap',
                paddingRight: '2rem',
              }}
            >
              {MARQUEE_TEXT}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
