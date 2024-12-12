import { Router } from 'express'
import protectAuth from '../middlewares/protectAuth.js'
import { adminAuth } from '../middlewares/adminAuth.js'
import createTicket from '../controllers/ticket/createTicket.js'
import deleteTicket from '../controllers/ticket/deleteTicket.js'
import updateTicket from '../controllers/ticket/updateTicket.js'

const router = Router()

router.route('/').post(protectAuth, adminAuth, createTicket)
router
  .route('/:id')
  .put(protectAuth, adminAuth, updateTicket)
  .delete(protectAuth, adminAuth, deleteTicket)

export default router
