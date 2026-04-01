import { motion } from 'framer-motion'
import { destinations } from '../data/destinations'
import DestinationCard from './DestinationCard'
import { useState } from 'react'

const featured = destinations.find((d) => d.featured)
const others = destinations.filter((d) => !d.featured)

export default function DestinationsGrid() {
    const [sortOrder, setSortOrder] = useState('default')
 const sortedOthers = [...others].sort((a, b) => {
    if (sortOrder === 'asc') return a.prix - b.prix
    if (sortOrder === 'desc') return b.prix - a.prix
    return 0
  })
 





    const [selectedDestination, setSelectedDestination] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)



  const openModal = (destination) => {
    setSelectedDestination(destination)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedDestination(null)
  }

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
      
                <div style={{
          marginTop: 'var(--space-4)',
          display: 'flex',
          gap: 'var(--space-2)',
          alignItems: 'center',
        }}>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-xs)',
            color: 'var(--color-muted)',
          }}>
            Trier par prix :
          </span>
          <button
            type="button"
            onClick={() => setSortOrder('default')}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              border: sortOrder === 'default' ? '1px solid var(--color-gold)' : '1px solid rgba(255,255,255,0.08)',
              background: 'transparent',
              color: 'var(--color-text)',
              cursor: 'pointer',
            }}
          >
            Par défaut
          </button>
          <button
            type="button"
            onClick={() => setSortOrder('asc')}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              border: sortOrder === 'asc' ? '1px solid var(--color-gold)' : '1px solid rgba(255,255,255,0.08)',
              background: 'transparent',
              color: 'var(--color-text)',
              cursor: 'pointer',
            }}
          >
            Prix croissant
          </button>
          <button
            type="button"
            onClick={() => setSortOrder('desc')}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              border: sortOrder === 'desc' ? '1px solid var(--color-gold)' : '1px solid rgba(255,255,255,0.08)',
              background: 'transparent',
              color: 'var(--color-text)',
              cursor: 'pointer',
            }}
          >
            Prix décroissant
          </button>
        </div>
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
          <DestinationCard
            destination={featured}
            featured
            onClick={() => openModal(featured)}
          />          
        </motion.div>

        {/* Les 2 autres cote a cote */}
        {sortedOthers.map((dest, i) => (
          <motion.div
            key={dest.id}
            className="bento-item"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.7, delay: 0.1 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <DestinationCard
              destination={dest}
              onClick={() => openModal(dest)}
            />          </motion.div>
        ))}
      </div>


            {isModalOpen && selectedDestination && (
        <div
          onClick={closeModal}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 50,
          }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: 'min(640px, 100% - 32px)',
              maxHeight: '80vh',
              background: 'var(--color-bg)',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              boxShadow: '0 24px 80px rgba(0,0,0,0.75)',
              border: '1px solid rgba(255,255,255,0.12)',
            }}
          >
            <div style={{ position: 'relative', height: '220px' }}>
              <img
                src={selectedDestination.image}
                alt={selectedDestination.nom}
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
                background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)',
              }} />
              <button
                type="button"
                onClick={closeModal}
                style={{
                  position: 'absolute',
                  top: 'var(--space-4)',
                  right: 'var(--space-4)',
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(0,0,0,0.6)',
                  color: 'var(--color-text)',
                  fontSize: 'var(--text-sm)',
                  cursor: 'pointer',
                }}
              >
                ×
              </button>
              <div style={{
                position: 'absolute',
                left: 'var(--space-6)',
                bottom: 'var(--space-5)',
              }}>
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-xs)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--color-gold)',
                }}>
                  {selectedDestination.badge} · {selectedDestination.periode}
                </span>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-2xl)',
                  fontWeight: 400,
                  color: 'var(--color-text)',
                  marginTop: '4px',
                }}>
                  {selectedDestination.nom}
                </h3>
              </div>
            </div>

            <div style={{
              padding: 'var(--space-6)',
            }}>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm)',
                color: 'var(--color-muted)',
              }}>
                {selectedDestination.longDesc}
              </p>

              <ul style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'var(--space-2)',
                marginTop: 'var(--space-4)',
                listStyle: 'none',
                padding: 0,
              }}>
                {selectedDestination.highlights?.map((h) => (
                  <li
                    key={h}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--color-text)',
                      background: 'rgba(255,255,255,0.04)',
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-full)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    {h}
                  </li>
                ))}
              </ul>

              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm)',
                color: 'var(--color-muted)',
                marginTop: 'var(--space-4)',
              }}>
                À partir de {selectedDestination.prix.toLocaleString('fr-FR')} €
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
