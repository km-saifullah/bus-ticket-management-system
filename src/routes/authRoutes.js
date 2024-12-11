import { Router } from 'express'
import registrationValidation from '../validation/registrationValidation.js'
import register from '../controllers/auth/register.js'
import login from '../controllers/auth/login.js'
import protectAuth from '../middlewares/protectAuth.js'
import logout from '../controllers/auth/logout.js'

const router = Router()

router.route('/register').post(registrationValidation, register)
router.route('/login').post(login)
router.route('/logout').post(protectAuth, logout)

export default router
