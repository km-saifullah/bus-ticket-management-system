import express from 'express'
import authRouter from './routes/authRoutes.js'
import busRouter from './routes/busRoutes.js'
import ticketRouter from './routes/ticketRoutes.js'

const app = express()

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/buses', busRouter)
app.use('/api/v1/tickets', ticketRouter)

export default app
