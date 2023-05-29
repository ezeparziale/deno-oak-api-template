import { Response } from '../deps.ts'

const getUsers = ({ response }: { response: Response }) => {
  console.log('GetUsers')
  response.status = 200
  response.body = 'List of users'
  return
}

const getUser = () => {}
const createUser = () => {}
const updateUser = () => {}
const deleteUser = () => {}

const userController = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
}

export default userController
