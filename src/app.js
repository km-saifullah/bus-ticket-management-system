import express from 'express'
import authRouter from './routes/authRoutes.js'
import userRouter from './routes/userRoutes.js'

const app = express()

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)

export default app
