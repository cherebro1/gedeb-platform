import { Router } from 'express'
import { supabase } from '../supabaseClient.js'

const router = Router()

router.post('/service', async (req, res) => {
  const { office_name, contact_name, contact_phone, service_name, description } = req.body || {}

  if (!office_name || !contact_name || !contact_phone || !service_name) {
    return res.status(400).json({ error: 'Missing required fields.' })
  }

  if (!supabase) {
    return res.status(503).json({ error: 'Database is not configured on the server yet.' })
  }

  const { error } = await supabase.from('service_registrations').insert({
    office_name,
    contact_name,
    contact_phone,
    service_name,
    description: description || null,
  })

  if (error) {
    console.error('[register/service]', error)
    return res.status(500).json({ error: 'Could not save your request. Please try again.' })
  }

  res.status(201).json({ ok: true })
})

router.post('/startup', async (req, res) => {
  const { founder_name, phone, business_idea, stage } = req.body || {}

  if (!founder_name || !phone || !business_idea) {
    return res.status(400).json({ error: 'Missing required fields.' })
  }

  if (!supabase) {
    return res.status(503).json({ error: 'Database is not configured on the server yet.' })
  }

  const { error } = await supabase.from('startup_registrations').insert({
    founder_name,
    phone,
    business_idea,
    stage: stage || 'idea',
  })

  if (error) {
    console.error('[register/startup]', error)
    return res.status(500).json({ error: 'Could not save your registration. Please try again.' })
  }

  res.status(201).json({ ok: true })
})

export default router
