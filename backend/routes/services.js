import { Router } from 'express'

const router = Router()

// Static for now — move to a Supabase table once offices start managing
// their own listings independently.
const services = [
  { name: 'Birth & death registration', office: 'Civil Registration Office' },
  { name: 'Business license application', office: 'Trade & Industry Office' },
  { name: 'Land use certificate', office: 'Land Administration Office' },
  { name: 'Kebele ID verification', office: 'Civil Registration Office' },
  { name: 'Tax payment receipts', office: 'Revenue Office' },
  { name: 'Building permit status', office: 'Construction & Urban Development' },
]

router.get('/', (_req, res) => {
  res.json({ services })
})

export default router
