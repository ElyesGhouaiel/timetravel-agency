export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--color-border)',
      padding: 'var(--space-16) var(--space-8) var(--space-8)',
      background: 'var(--color-bg)',
    }}>
      <div className="footer-grid" style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr',
        gap: 'var(--space-12)',
      }}>
        {/* Colonne principale */}
        <div>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-xl)',
            fontWeight: 300,
            color: 'var(--color-text)',
          }}>
            TimeTravel Agency
          </p>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-sm)',
            color: 'var(--color-muted)',
            maxWidth: '36ch',
            marginTop: 'var(--space-3)',
          }}>
            Chaque voyage est un aller-retour dans votre mémoire.
          </p>
        </div>

        {/* Destinations */}
        <div>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-xs)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--color-faint)',
            marginBottom: 'var(--space-4)',
          }}>
            Destinations
          </p>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            {['Chine des 3 Royaumes', 'Japon Féodal', 'Carthage Antique'].map((name) => (
              <a
                key={name}
                href="#destinations"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-muted)',
                  textDecoration: 'none',
                  transition: 'color 200ms',
                }}
                onMouseEnter={(e) => (e.target.style.color = 'var(--color-text)')}
                onMouseLeave={(e) => (e.target.style.color = 'var(--color-muted)')}
              >
                {name}
              </a>
            ))}
          </nav>
        </div>

        {/* Contact */}
        <div>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-xs)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--color-faint)',
            marginBottom: 'var(--space-4)',
          }}>
            Contact
          </p>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-2)',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-sm)',
            color: 'var(--color-muted)',
          }}>
            <span>12 Rue du Paradoxe, Paris</span>
            <span>contact@timetravel.agency</span>
            <span>+33 1 23 45 67 89</span>
          </div>
        </div>
      </div>

      {/* Bas de page */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        borderTop: '1px solid var(--color-border)',
        marginTop: 'var(--space-12)',
        paddingTop: 'var(--space-6)',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 'var(--space-4)',
      }}>
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-xs)',
          color: 'var(--color-faint)',
        }}>
          &copy; 2026 TimeTravel Agency
        </span>
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-xs)',
          color: 'var(--color-faint)',
        }}>
          Projet pédagogique — M1/M2 Ynov
        </span>
      </div>
    </footer>
  )
}
