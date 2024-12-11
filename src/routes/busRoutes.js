import { Router } from 'express'
import createBus from '../controllers/bus/createBus.js'
import protectAuth from '../middlewares/protectAuth.js'
import { adminAuth } from '../middlewares/adminAuth.js'
import getAllBuses from '../controllers/bus/getAllBuses.js'
import deleteBus from '../controllers/bus/deleteBus.js'
import updateBus from '../controllers/bus/updateBus.js'

const router = Router()

router.route('/').post(protectAuth, adminAuth, createBus).get(getAllBuses)
router
  .route('/:id')
  .put(protectAuth, adminAuth, updateBus)
  .delete(protectAuth, adminAuth, deleteBus)

export default router
