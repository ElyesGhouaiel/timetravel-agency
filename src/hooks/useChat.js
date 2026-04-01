import { useState } from 'react'

const SYSTEM_PROMPT = `Tu es Chronos, l'assistant virtuel de TimeTravel Agency,
une agence de voyage temporel de luxe.
Ton rôle : conseiller les clients sur les 3 destinations disponibles.
Ton ton : professionnel, passionné d'histoire, chaleureux mais jamais familier.
Tu connais parfaitement :
- Chine des 3 Royaumes (220-280 ap. J.-C.) : guerre, honneur, cour impériale,
  cavalerie. A partir de 5400 euros.
- Japon Féodal (1185-1600 apr. J.-C.) : samouraïs, châteaux, sakura, cérémonie
  du thé. A partir de 4900 euros.
- Carthage Antique (264-146 av. J.-C.) : port méditerranéen, commerce phénicien,
  Hannibal. A partir de 3800 euros.
Réponds toujours en français. Sois concis (3 phrases max).
Si l'utilisateur hésite, pose une question pour identifier ses goûts
et recommande la destination adaptée.`

export function useChat() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Bonjour. Je suis Chronos, votre conseiller en voyages temporels. Quelle époque vous attire ?'
    }
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  async function sendMessage(userText) {
    const updated = [...messages, { role: 'user', content: userText }]
    setMessages(updated)
    setIsLoading(true)
    setError(null)

    const apiKey = import.meta.env.VITE_MISTRAL_API_KEY
    if (!apiKey) {
      setMessages([...updated, {
        role: 'assistant',
        content: 'Mode démonstration — clé API non configurée.'
      }])
      setIsLoading(false)
      return
    }

    try {
      const res = await fetch('https://api.mistral.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'mistral-small-latest',
          messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...updated]
        })
      })
      const data = await res.json()
      setMessages([...updated, {
        role: 'assistant',
        content: data.choices[0].message.content
      }])
    } catch {
      setError('Impossible de joindre Chronos pour le moment.')
    } finally {
      setIsLoading(false)
    }
  }

  return { messages, isLoading, error, sendMessage }
}
