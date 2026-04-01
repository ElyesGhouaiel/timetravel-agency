import { useState } from 'react'
import { destinations } from '../data/destinations'

const questions = [
  {
    id: 'q1',
    label: "Quel type d'expérience recherchez-vous ?",
    options: [
      { value: 'strategie', label: 'Stratégie et pouvoir' },       // +1 Chine
      { value: 'serenite', label: 'Sérénité et discipline' },      // +1 Japon
      { value: 'aventure', label: 'Aventure et exploration' },     // +1 Carthage
    ],
  },
  {
    id: 'q2',
    label: "Qu'est-ce qui vous fascine le plus dans l'Histoire ?",
    options: [
      { value: 'batailles', label: 'Les grandes batailles et la politique' }, // +1 Chine
      { value: 'art_vivre', label: "L'art de vivre et la philosophie" },      // +1 Japon
      { value: 'commerce', label: 'Le commerce et les voyages maritimes' },   // +1 Carthage
    ],
  },
  {
    id: 'q3',
    label: 'Votre activité idéale en voyage ?',
    options: [
      { value: 'tournoi', label: 'Assister à un tournoi militaire' },          // +1 Chine
      { value: 'ceremonie', label: 'Participer à une cérémonie traditionnelle' }, // +1 Japon
      { value: 'marche', label: 'Explorer un marché exotique' },               // +1 Carthage
    ],
  },
  {
    id: 'q4',
    label: 'Quel paysage vous attire le plus ?',
    options: [
      { value: 'palais', label: 'Palais impériaux et murailles' },           // +1 Chine
      { value: 'chateaux', label: 'Châteaux et cerisiers en fleur' },        // +1 Japon
      { value: 'port', label: 'Port méditerranéen et galères' },             // +1 Carthage
    ],
  },
]
export default function PersonalityQuiz() {
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)

  const handleChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    // Vérifier que toutes les questions ont une réponse
    const allAnswered = questions.every((q) => answers[q.id])
    if (!allAnswered) {
      alert('Merci de répondre à toutes les questions.')
      return
    }

    // Calculer la destination recommandée
    const recommended = computeRecommendation(answers)
    setResult(recommended)
  }

  return (
    <div
      style={{
        borderRadius: 'var(--radius-xl)',
        border: '1px solid rgba(255,255,255,0.1)',
        padding: 'var(--space-6)',
        background:
          'radial-gradient(circle at top left, rgba(255,255,255,0.06), transparent), rgba(5,5,10,0.9)',
      }}
    >
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-xl)',
          fontWeight: 400,
          color: 'var(--color-text)',
          marginBottom: 'var(--space-4)',
        }}
      >
        Quiz de recommandation
      </h2>

      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-sm)',
          color: 'var(--color-muted)',
          marginBottom: 'var(--space-6)',
        }}
      >
        Répondez à ces quelques questions et nous vous proposerons l&apos;époque idéale
        pour votre prochain voyage temporel.
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 'var(--space-6)' }}>
        {questions.map((question) => (
          <div key={question.id}>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm)',
                color: 'var(--color-text)',
                marginBottom: 'var(--space-3)',
              }}
            >
              {question.label}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {question.options.map((option) => (
                <label
                  key={option.value}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-2)',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-lg)',
                    border:
                      answers[question.id] === option.value
                        ? '1px solid var(--color-gold)'
                        : '1px solid rgba(255,255,255,0.12)',
                    cursor: 'pointer',
                    background:
                      answers[question.id] === option.value
                        ? 'rgba(255,215,0,0.08)'
                        : 'rgba(0,0,0,0.4)',
                  }}
                >
                  <input
                    type="radio"
                    name={question.id}
                    value={option.value}
                    checked={answers[question.id] === option.value}
                    onChange={(e) => handleChange(question.id, e.target.value)}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--color-text)',
                    }}
                  >
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <button
          type="submit"
          style={{
            marginTop: 'var(--space-2)',
            alignSelf: 'flex-start',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-sm)',
            padding: '10px 18px',
            borderRadius: 'var(--radius-full)',
            border: 'none',
            background: 'var(--color-gold)',
            color: '#000',
            cursor: 'pointer',
          }}
        >
          Voir ma destination idéale
        </button>
      </form>

      {result && (
        <div
          style={{
            marginTop: 'var(--space-6)',
            paddingTop: 'var(--space-5)',
            borderTop: '1px solid rgba(255,255,255,0.12)',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--color-muted)',
              marginBottom: 'var(--space-2)',
            }}
          >
            Votre recommandation
          </p>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-lg)',
              color: 'var(--color-text)',
            }}
          >
            {result.nom}
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              color: 'var(--color-muted)',
              marginTop: 'var(--space-2)',
            }}
          >
            {result.shortDesc}
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              color: 'var(--color-muted)',
              marginTop: 'var(--space-3)',
            }}
          >
            À partir de {result.prix.toLocaleString('fr-FR')} € · {result.periode}
          </p>
        </div>
      )}
    </div>
  )
}

// Algo simple de recommandation
function computeRecommendation(answers) {
  const CHINE = destinations.find((d) => d.id === 'chine-3-royaumes')
  const JAPON = destinations.find((d) => d.id === 'japon-feodal')
  const CARTHAGE = destinations.find((d) => d.id === 'carthage')

  let scoreChine = 0
  let scoreJapon = 0
  let scoreCarthage = 0

  // Q1 : type d'expérience
  if (answers.q1 === 'strategie') scoreChine += 1
  if (answers.q1 === 'serenite') scoreJapon += 1
  if (answers.q1 === 'aventure') scoreCarthage += 1

  // Q2 : ce qui fascine le plus
  if (answers.q2 === 'batailles') scoreChine += 1
  if (answers.q2 === 'art_vivre') scoreJapon += 1
  if (answers.q2 === 'commerce') scoreCarthage += 1

  // Q3 : activité idéale
  if (answers.q3 === 'tournoi') scoreChine += 1
  if (answers.q3 === 'ceremonie') scoreJapon += 1
  if (answers.q3 === 'marche') scoreCarthage += 1

  // Q4 : paysage préféré
  if (answers.q4 === 'palais') scoreChine += 1
  if (answers.q4 === 'chateaux') scoreJapon += 1
  if (answers.q4 === 'port') scoreCarthage += 1

  // Cas simple : un score strictement supérieur aux deux autres
  if (scoreChine > scoreJapon && scoreChine > scoreCarthage) return CHINE
  if (scoreJapon > scoreChine && scoreJapon > scoreCarthage) return JAPON
  if (scoreCarthage > scoreChine && scoreCarthage > scoreJapon) return CARTHAGE

  // Cas d’égalité 2-2-0 : on départage avec Q4
  if (
    scoreChine === scoreJapon &&
    scoreChine > scoreCarthage
  ) {
    if (answers.q4 === 'palais') return CHINE
    if (answers.q4 === 'chateaux') return JAPON
  }

  if (
    scoreChine === scoreCarthage &&
    scoreChine > scoreJapon
  ) {
    if (answers.q4 === 'palais') return CHINE
    if (answers.q4 === 'port') return CARTHAGE
  }

  if (
    scoreJapon === scoreCarthage &&
    scoreJapon > scoreChine
  ) {
    if (answers.q4 === 'chateaux') return JAPON
    if (answers.q4 === 'port') return CARTHAGE
  }

  // Fallback : si vraiment égalité parfaite, on retourne la Chine par défaut
  return CHINE || destinations[0]
}