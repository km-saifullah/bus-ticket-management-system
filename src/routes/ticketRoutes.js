import { Router } from 'express'
import protectAuth from '../middlewares/protectAuth.js'
import { adminAuth } from '../middlewares/adminAuth.js'
import createTicket from '../controllers/ticket/createTicket.js'

const router = Router()

router.route('/').post(protectAuth, adminAuth, createTicket)

export default router
