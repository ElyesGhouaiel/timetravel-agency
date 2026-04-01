import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send } from 'lucide-react'
import { useChat } from '../hooks/useChat'

const ease = [0.16, 1, 0.3, 1]

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const { messages, isLoading, error, sendMessage } = useChat()
  const [input, setInput] = useState('')
  const messagesEnd = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (messagesEnd.current) {
      messagesEnd.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isLoading])

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus()
    }
  }, [open])

  function handleSend() {
    const text = input.trim()
    if (!text || isLoading) return
    setInput('')
    sendMessage(text)
  }

  return (
    <>
      {/* Bouton flottant */}
      <motion.button
        data-chat-toggle
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: 'fixed',
          bottom: '28px',
          right: '28px',
          zIndex: 101,
          background: 'var(--color-gold)',
          color: '#0a0a0a',
          borderRadius: 'var(--radius-full)',
          padding: '14px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-sm)',
          fontWeight: 600,
          border: 'none',
          cursor: 'pointer',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <span style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: '#34d399',
          animation: 'pulse-dot 2s ease infinite',
        }} />
        Chronos
      </motion.button>

      {/* Fenetre de chat */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.35, ease }}
            style={{
              position: 'fixed',
              bottom: '90px',
              right: '28px',
              zIndex: 102,
              width: '360px',
              maxWidth: 'calc(100vw - 32px)',
              maxHeight: '520px',
              background: 'rgba(15, 15, 13, 0.85)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              border: '1px solid var(--color-border-strong)',
              borderRadius: 'var(--radius-xl)',
              boxShadow: 'var(--shadow-lg), 0 0 0 0.5px rgba(196,152,62,0.1) inset',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* En-tete */}
            <div style={{
              background: 'rgba(30, 30, 27, 0.6)',
              borderBottom: '1px solid var(--color-border)',
              padding: 'var(--space-4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'var(--color-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  color: '#0a0a0a',
                }}>
                  C
                </div>
                <div>
                  <div style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 500,
                    color: 'var(--color-text)',
                  }}>Chronos</div>
                  <div style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--color-muted)',
                  }}>Agent Temporel</div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                style={{
                  color: 'var(--color-muted)',
                  transition: 'color 200ms',
                  padding: '4px',
                  cursor: 'pointer',
                  background: 'none',
                  border: 'none',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-muted)')}
              >
                <X size={18} />
              </button>
            </div>

            {/* Zone messages */}
            <div className="chat-messages" style={{
              flex: 1,
              overflowY: 'auto',
              maxHeight: '320px',
              padding: 'var(--space-4)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-3)',
            }}>
              {messages.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    maxWidth: '85%',
                    padding: 'var(--space-3) var(--space-4)',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-sm)',
                    lineHeight: 1.5,
                    ...(msg.role === 'user'
                      ? {
                          marginLeft: 'auto',
                          background: 'var(--color-gold)',
                          color: '#0a0a0a',
                          borderRadius: 'var(--radius-lg) var(--radius-sm) var(--radius-sm) var(--radius-lg)',
                        }
                      : {
                          marginRight: 'auto',
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid var(--color-border)',
                          color: 'var(--color-text)',
                          borderRadius: 'var(--radius-sm) var(--radius-lg) var(--radius-lg) var(--radius-sm)',
                        }),
                  }}
                >
                  {msg.content}
                </div>
              ))}

              {isLoading && (
                <div style={{
                  display: 'flex',
                  gap: '4px',
                  padding: 'var(--space-3) var(--space-4)',
                  marginRight: 'auto',
                }}>
                  {[0, 1, 2].map((dot) => (
                    <span
                      key={dot}
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: 'var(--color-muted)',
                        animation: `bounce-dot 1.2s ease infinite ${dot * 0.2}s`,
                      }}
                    />
                  ))}
                </div>
              )}

              {error && (
                <div style={{
                  fontSize: 'var(--text-xs)',
                  color: '#e57373',
                  textAlign: 'center',
                  padding: 'var(--space-2)',
                }}>
                  {error}
                </div>
              )}

              <div ref={messagesEnd} />
            </div>

            {/* Zone saisie */}
            <div style={{
              borderTop: '1px solid var(--color-border)',
              padding: 'var(--space-3) var(--space-4)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              flexShrink: 0,
            }}>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Posez votre question..."
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text)',
                }}
              />
              <motion.button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                whileTap={{ scale: 0.9 }}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'var(--color-gold)',
                  color: '#0a0a0a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 'none',
                  cursor: 'pointer',
                  opacity: isLoading || !input.trim() ? 0.4 : 1,
                  transition: 'opacity 200ms',
                  flexShrink: 0,
                }}
              >
                <Send size={16} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
