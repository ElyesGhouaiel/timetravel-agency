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

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.MISTRAL_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' })
  }

  try {
    const { messages } = req.body

    const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'mistral-small-latest',
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return res.status(response.status).json({ error: data.message || 'Mistral API error' })
    }

    return res.status(200).json({
      content: data.choices[0].message.content,
    })
  } catch {
    return res.status(500).json({ error: 'Failed to reach Mistral API' })
  }
}
