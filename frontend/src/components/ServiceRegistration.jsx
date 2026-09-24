import { useState } from 'react'

const API_BASE = import.meta.env.VITE_API_BASE_URL || ''

export default function ServiceRegistration() {
  const [form, setForm] = useState({
    office_name: '',
    contact_name: '',
    contact_phone: '',
    service_name: '',
    description: '',
  })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(`${API_BASE}/api/register/service`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('sent')
      setForm({ office_name: '', contact_name: '', contact_phone: '', service_name: '', description: '' })
    } catch (err) {
      setStatus('error')
    }
  }

  return (
    <section id="digitize" className="digitize">
      <div className="container digitize__row">
        <div className="digitize__intro">
          <p className="eyebrow-note">For government offices</p>
          <h2>Bring your service online</h2>
          <p>
            Tell us which service your office wants digitized. Our team reviews
            requests weekly and reaches out to plan the transition — no technical
            work is required on your side to start.
          </p>
          <ol className="digitize__steps">
            <li>Submit the request below</li>
            <li>Our team assesses the service and current process</li>
            <li>We build and pilot the digital version with your office</li>
          </ol>
        </div>

        <form className="digitize__form" onSubmit={handleSubmit}>
          <label>
            Office name
            <input required value={form.office_name} onChange={update('office_name')} placeholder="e.g. Gedeb Land Administration Office" />
          </label>
          <label>
            Contact person
            <input required value={form.contact_name} onChange={update('contact_name')} placeholder="Full name" />
          </label>
          <label>
            Phone number
            <input required value={form.contact_phone} onChange={update('contact_phone')} placeholder="09xx xxx xxx" />
          </label>
          <label>
            Service to digitize
            <input required value={form.service_name} onChange={update('service_name')} placeholder="e.g. Business license renewal" />
          </label>
          <label>
            Current process
            <textarea rows={4} value={form.description} onChange={update('description')} placeholder="Briefly describe how the service works today" />
          </label>

          <button className="btn btn--primary" type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Submit request'}
          </button>

          {status === 'sent' && <p className="digitize__status digitize__status--ok">Request received. Our team will contact you.</p>}
          {status === 'error' && <p className="digitize__status digitize__status--err">Something went wrong. Please try again or call the office directly.</p>}
        </form>
      </div>
    </section>
  )
}
