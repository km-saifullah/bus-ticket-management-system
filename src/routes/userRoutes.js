import { Router } from 'express'
import { createUser } from '../controllers/userController.js'

const router = Router()

// user routes
router.route('/').post(createUser)

export default router
