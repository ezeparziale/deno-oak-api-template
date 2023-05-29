import { Router } from '../deps.ts'

import userController from '../controllers/user.controller.ts'

const router = new Router()

router
  .get('/users', userController.getUsers)
  .get('/users/:userId', userController.getUser)
  .post('/users', userController.createUser)
  .put('/users/:userId', userController.updateUser)
  .delete('/users/:userId', userController.deleteUser)

export default router
