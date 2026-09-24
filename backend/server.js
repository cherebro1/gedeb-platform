import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import registerRoutes from './routes/register.js'
import chatRoutes from './routes/chat.js'
import servicesRoutes from './routes/services.js'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/api/health', (_req, res) => res.json({ ok: true }))

app.use('/api/register', registerRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/services', servicesRoutes)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Gedeb API listening on http://localhost:${PORT}`)
})
