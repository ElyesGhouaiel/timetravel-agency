import { useState } from 'react'

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

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updated }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Erreur serveur')
      }

      setMessages([...updated, {
        role: 'assistant',
        content: data.content,
      }])
    } catch (err) {
      setError(err.message || 'Impossible de joindre Chronos pour le moment.')
    } finally {
      setIsLoading(false)
    }
  }

  return { messages, isLoading, error, sendMessage }
}
