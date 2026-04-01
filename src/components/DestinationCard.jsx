import { motion } from 'framer-motion'

export default function DestinationCard({ destination, featured }) {
  return (
    <motion.div
      whileHover={{ scale: 1.015 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'relative',
        minHeight: featured ? '480px' : '400px',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        cursor: 'pointer',
      }}
    >
      <img
        src={destination.image}
        alt={destination.nom}
        loading="lazy"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 40%, transparent 100%)',
      }} />
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 'var(--space-6)',
      }}>
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-xs)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--color-gold)',
        }}>
          {destination.badge}
        </span>
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: featured ? 'var(--text-2xl)' : 'var(--text-xl)',
          fontWeight: 400,
          color: 'var(--color-text)',
          marginTop: '4px',
          lineHeight: 1.1,
        }}>
          {destination.nom}
        </p>
        {featured && (
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-sm)',
            color: 'var(--color-muted)',
            marginTop: 'var(--space-2)',
            maxWidth: '50ch',
          }}>
            {destination.shortDesc}
          </p>
        )}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-sm)',
          color: 'var(--color-muted)',
          marginTop: 'var(--space-3)',
        }}>
          À partir de {destination.prix.toLocaleString('fr-FR')} €
        </p>
      </div>
    </motion.div>
  )
}
