import { Router } from 'express'
import createBus from '../controllers/bus/createBus.js'
import protectAuth from '../middlewares/protectAuth.js'
import { adminAuth } from '../middlewares/adminAuth.js'

const router = Router()

router.route('/').post(protectAuth, adminAuth, createBus)

export default router
