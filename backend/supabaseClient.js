import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'

const url = process.env.SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_KEY

if (!url || !key) {
  console.warn(
    '[supabase] SUPABASE_URL or SUPABASE_SERVICE_KEY is not set. ' +
    'Registration endpoints will fail until backend/.env is configured.'
  )
}

export const supabase = url && key ? createClient(url, key) : null
