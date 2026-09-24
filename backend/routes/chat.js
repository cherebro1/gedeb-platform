import { Router } from 'express'

const router = Router()

const SYSTEM_PROMPT = `You are the AI assistant for the Gedeb Woreda Innovation & Technology
Office in Ethiopia. You answer citizen questions about: digitizing government
services, the e-government services already online, and how to register a tech
startup with the office. Keep answers short (2-4 sentences), practical, and
friendly. If you don't know something specific to Gedeb, say so and suggest the
person contact the office directly rather than guessing.`

// Simple keyword-matched fallback so the chat still works with zero setup
// (no API key required). Swap this out once ANTHROPIC_API_KEY is set below.
const FAQ = [
  { keys: ['digitiz', 'online service', 'bring my service'], reply: "To digitize a service, scroll to 'Bring your service online' and submit the form with your office name and the service involved. Our team reviews requests weekly." },
  { keys: ['startup', 'register my business', 'founder'], reply: "You can register your startup in the 'Starting a tech business in Gedeb' section. It only takes your name, phone number, and a short description of what you're building." },
  { keys: ['egov', 'e-government', 'services online', 'birth', 'land', 'license'], reply: "Several services are already online — birth/death registration, business licenses, land use certificates, and more. Check the 'Services available online' section for the full list." },
  { keys: ['hour', 'open', 'contact', 'phone', 'address'], reply: "For office hours or to speak with someone directly, please contact the Gedeb Innovation & Technology Office through your local kebele or woreda administration office." },
  { keys: ['hello', 'hi', 'selam', 'hey'], reply: "Selam! Ask me about digitizing a government service, services already online, or registering a tech startup." },
]

function fallbackReply(message) {
  const lower = message.toLowerCase()
  const hit = FAQ.find((f) => f.keys.some((k) => lower.includes(k)))
  if (hit) return hit.reply
  return "I can help with digitizing government services, e-government access, or startup registration. Could you rephrase your question around one of those topics?"
}

router.post('/', async (req, res) => {
  const { message } = req.body || {}
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required.' })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return res.json({ reply: fallbackReply(message) })
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 300,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: message }],
      }),
    })

    if (!response.ok) throw new Error(`Anthropic API error: ${response.status}`)

    const data = await response.json()
    const text = data.content?.find((b) => b.type === 'text')?.text
    res.json({ reply: text || fallbackReply(message) })
  } catch (err) {
    console.error('[chat] Anthropic API call failed, using fallback:', err.message)
    res.json({ reply: fallbackReply(message) })
  }
})

export default router
