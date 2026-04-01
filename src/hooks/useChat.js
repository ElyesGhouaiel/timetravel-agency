import { useState } from 'react'

export function useChat() {
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  return { messages, isLoading }
}
