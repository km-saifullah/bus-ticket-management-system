import { Router } from 'express'
import registrationValidation from '../validation/registrationValidation.js'
import register from '../controllers/auth/register.js'
import login from '../controllers/auth/login.js'

const router = Router()

router.route('/register').post(registrationValidation, register)
router.route('/login').post(login)

export default router
