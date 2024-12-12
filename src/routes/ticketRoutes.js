import { Router } from 'express'
import protectAuth from '../middlewares/protectAuth.js'
import { adminAuth } from '../middlewares/adminAuth.js'
import createTicket from '../controllers/ticket/createTicket.js'
import deleteTicket from '../controllers/ticket/deleteTicket.js'

const router = Router()

router.route('/').post(protectAuth, adminAuth, createTicket)
router.route('/:id').delete(protectAuth, adminAuth, deleteTicket)

export default router
