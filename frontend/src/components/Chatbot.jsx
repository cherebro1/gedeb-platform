import { useState, useRef, useEffect } from 'react'

const API_BASE = import.meta.env.VITE_API_BASE_URL || ''

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Selam! I'm the Gedeb Innovation Office assistant. Ask me about digitizing a service, e-government, or starting a tech business." },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, open])

  async function send(e) {
    e.preventDefault()
    const text = input.trim()
    if (!text || loading) return
    const next = [...messages, { role: 'user', text }]
    setMessages(next)
    setInput('')
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      })
      const data = await res.json()
      setMessages((m) => [...m, { role: 'assistant', text: data.reply || "Sorry, I couldn't find an answer to that." }])
    } catch {
      setMessages((m) => [...m, { role: 'assistant', text: "I'm having trouble reaching the server. Please try again shortly." }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="chatbot">
      {open && (
        <div className="chatbot__panel">
          <div className="chatbot__header">
            <span>Gedeb Assistant</span>
            <button aria-label="Close chat" onClick={() => setOpen(false)}>×</button>
          </div>
          <div className="chatbot__messages" ref={scrollRef}>
            {messages.map((m, i) => (
              <div key={i} className={`chatbot__bubble chatbot__bubble--${m.role}`}>{m.text}</div>
            ))}
            {loading && <div className="chatbot__bubble chatbot__bubble--assistant chatbot__bubble--typing">…</div>}
          </div>
          <form className="chatbot__input" onSubmit={send}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a question…"
              aria-label="Message"
            />
            <button className="btn btn--primary" type="submit" disabled={loading}>Send</button>
          </form>
        </div>
      )}
      <button className="chatbot__toggle" onClick={() => setOpen((o) => !o)} aria-label="Open chat assistant">
        {open ? '×' : '💬'}
      </button>
    </div>
  )
}
