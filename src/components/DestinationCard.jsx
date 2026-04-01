import { motion } from 'framer-motion'
import { useState } from 'react'
export default function DestinationCard({ destination, featured ,onClick}) {
    const [showDetails, setShowDetails] = useState(false)

  return (
    <motion.div
          onClick={onClick}

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
        <ul style={{
  display: 'flex',
  flexWrap: 'wrap',
  gap: 'var(--space-2)',
  marginTop: 'var(--space-3)',
  listStyle: 'none',
  padding: 0,
}}>
  {destination.highlights?.map((item) => (
    <li
      key={item}
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-xs)',
        color: 'var(--color-text)',
        background: 'rgba(0,0,0,0.5)',
        padding: '4px 8px',
        borderRadius: 'var(--radius-full)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {item}
    </li>
  ))}
</ul>
<button
  type="button"
  onClick={(e) => {
    e.stopPropagation()
    setShowDetails((prev) => !prev)
  }}
  style={{
    marginTop: 'var(--space-3)',
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--text-xs)',
    color: 'var(--color-gold)',
    background: 'transparent',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    textDecoration: 'underline',
  }}
>
  {showDetails ? 'Masquer les détails' : 'Voir la description complète'}
</button>
{showDetails && (
  <motion.p
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.25 }}
    style={{
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      color: 'var(--color-text)',
      marginTop: 'var(--space-3)',
      maxWidth: '55ch',
    }}
  >
    {destination.longDesc}
  </motion.p>
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
