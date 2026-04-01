import { motion } from 'framer-motion'
import { destinations } from '../data/destinations'
import DestinationCard from './DestinationCard'

const featured = destinations.find((d) => d.featured)
const others = destinations.filter((d) => !d.featured)

export default function DestinationsGrid() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ marginBottom: 'var(--space-4)' }}
      >
        <div className="section-divider" />
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-2xl)',
          fontWeight: 300,
          color: 'var(--color-text)',
          textAlign: 'left',
        }}>
          Nos destinations
        </h2>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-sm)',
          color: 'var(--color-muted)',
          letterSpacing: '0.05em',
          marginTop: 'var(--space-3)',
          textAlign: 'left',
        }}>
          Trois époques. Trois expériences. Une seule agence.
        </p>
      </motion.div>

      <div className="bento-grid" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'var(--space-4)',
        marginTop: 'var(--space-8)',
      }}>
        {/* Featured — pleine largeur */}
        <motion.div
          style={{ gridColumn: 'span 2' }}
          className="bento-featured"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <DestinationCard destination={featured} featured />
        </motion.div>

        {/* Les 2 autres cote a cote */}
        {others.map((dest, i) => (
          <motion.div
            key={dest.id}
            className="bento-item"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.7, delay: 0.1 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <DestinationCard destination={dest} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
