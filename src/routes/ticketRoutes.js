import { Router } from 'express'
import protectAuth from '../middlewares/protectAuth.js'
import { adminAuth } from '../middlewares/adminAuth.js'
import createTicket from '../controllers/ticket/createTicket.js'
import deleteTicket from '../controllers/ticket/deleteTicket.js'
import updateTicket from '../controllers/ticket/updateTicket.js'
import getAvailableTickets from '../controllers/ticket/getAvailableTickets.js'
import purchaseTicket from '../controllers/ticket/purchaseTicket.js'

const router = Router()

router
  .route('/')
  .post(protectAuth, adminAuth, createTicket)
  .get(getAvailableTickets)

router
  .route('/:id')
  .put(protectAuth, adminAuth, updateTicket)
  .delete(protectAuth, adminAuth, deleteTicket)

router.route('/purchase').post(protectAuth, purchaseTicket)

export default router
