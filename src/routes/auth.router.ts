import { Router } from '../deps.ts'

import authController from '../controllers/auth.controller.ts'

const router = new Router()

router
  .post('/login', authController.loginUser)
  .post('/register', authController.registerUser)

export default router
