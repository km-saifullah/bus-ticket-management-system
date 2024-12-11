import { Router } from 'express'
import createBus from '../controllers/bus/createBus.js'
import protectAuth from '../middlewares/protectAuth.js'
import { adminAuth } from '../middlewares/adminAuth.js'
import getAllBuses from '../controllers/bus/getAllBuses.js'
import deleteBus from '../controllers/bus/deleteBus.js'

const router = Router()

router.route('/').post(protectAuth, adminAuth, createBus).get(getAllBuses)
router.route('/:id').delete(protectAuth, adminAuth, deleteBus)

export default router
