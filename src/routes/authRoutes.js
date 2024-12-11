import { Router } from 'express'
import registrationValidation from '../validation/registrationValidation.js'
import register from '../controllers/auth/register.js'

const router = Router()

router.route('/register').post(registrationValidation, register)

export default router
