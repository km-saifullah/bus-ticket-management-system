import { Router } from 'express'
import createBus from '../controllers/bus/createBus.js'
import protectAuth from '../middlewares/protectAuth.js'
import { adminAuth } from '../middlewares/adminAuth.js'
import getAllBuses from '../controllers/bus/getAllBuses.js'

const router = Router()

router.route('/').post(protectAuth, adminAuth, createBus).get(getAllBuses)

export default router
