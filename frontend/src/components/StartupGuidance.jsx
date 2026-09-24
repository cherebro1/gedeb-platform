import { useState } from 'react'

const API_BASE = import.meta.env.VITE_API_BASE_URL || ''

const guidance = [
  { title: 'Define your idea', body: 'Write one page on the problem you solve and who pays for it. Bring this to your first meeting with the office.' },
  { title: 'Choose a structure', body: 'Most early founders register as a sole proprietorship or small PLC. We can explain the difference for your case.' },
  { title: 'Register with us first', body: 'Submit the form below so the Innovation Office can guide you through woreda and federal registration steps in order.' },
  { title: 'Get connected', body: 'Registered founders get access to office mentorship hours and are introduced to other Gedeb tech builders.' },
]

export default function StartupGuidance() {
  const [form, setForm] = useState({ founder_name: '', phone: '', business_idea: '', stage: 'idea' })
  const [status, setStatus] = useState('idle')

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(`${API_BASE}/api/register/startup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('failed')
      setStatus('sent')
      setForm({ founder_name: '', phone: '', business_idea: '', stage: 'idea' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="startups" className="startups">
      <div className="container">
        <p className="eyebrow-note">For founders</p>
        <h2>Starting a tech business in Gedeb</h2>
        <p className="startups__lede">
          Whether you're building software, a coffee-tech idea, or a local service app,
          the office helps new founders through registration and their first steps.
        </p>

        <div className="startups__grid">
          {guidance.map((g, i) => (
            <div className="startups__step" key={g.title}>
              <span className="startups__num">{i + 1}</span>
              <div>
                <h3>{g.title}</h3>
                <p>{g.body}</p>
              </div>
            </div>
          ))}
        </div>

        <form className="startups__form" onSubmit={handleSubmit}>
          <h3>Register your startup with the office</h3>
          <div className="startups__form-grid">
            <label>
              Your name
              <input required value={form.founder_name} onChange={update('founder_name')} />
            </label>
            <label>
              Phone number
              <input required value={form.phone} onChange={update('phone')} />
            </label>
            <label>
              Stage
              <select value={form.stage} onChange={update('stage')}>
                <option value="idea">Just an idea</option>
                <option value="building">Building it</option>
                <option value="registered">Already registered elsewhere</option>
              </select>
            </label>
          </div>
          <label>
            What are you building?
            <textarea rows={3} required value={form.business_idea} onChange={update('business_idea')} />
          </label>
          <button className="btn btn--primary" type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Register'}
          </button>
          {status === 'sent' && <p className="digitize__status digitize__status--ok">Thanks — the office will reach out with next steps.</p>}
          {status === 'error' && <p className="digitize__status digitize__status--err">Something went wrong. Please try again.</p>}
        </form>
      </div>
    </section>
  )
}
