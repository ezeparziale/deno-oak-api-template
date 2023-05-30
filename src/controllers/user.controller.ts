import { Context, helpers } from '../deps.ts'
import User from '../models/user.model.ts'
import { bcrypt } from '../deps.ts'

const getUsers = async (ctx: Context) => {
  const queries = helpers.getQuery(ctx, { mergeParams: true })
  const page: number = Number(queries.page) || 1
  const limit: number = Number(queries.limit) || 20
  const offset: number = (page - 1) * limit

  try {
    const users = await User.select().offset(offset).limit(limit).all()
    ctx.response.status = 200
    ctx.response.body = users
    return
  } catch (error) {
    console.error(error)
    ctx.response.status = 500
    ctx.response.body = {
      message: 'Error fetching users',
      error: error.message,
    }
    return
  }
}

const getUser = async (ctx: Context) => {
  const { userId } = helpers.getQuery(ctx, { mergeParams: true })
  try {
    const user = await User.select().where('id', userId).first()
    if (!user) {
      ctx.response.status = 404
      return
    }
    ctx.response.status = 200
    ctx.response.body = user
    return
  } catch (error) {
    console.error(error)
    ctx.response.status = 500
    ctx.response.body = {
      message: 'An error occurred while retrieving the user',
      error: error.message,
    }
    return
  }
}

const createUser = async (ctx: Context) => {
  const { email, password } = await ctx.request.body({ type: 'json' }).value

  try {
    const userExists = await User.where('email', email).first()
    if (userExists) {
      ctx.response.status = 409
      ctx.response.body = { 'message': 'User already exists' }
      return
    }
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)
    const newUser = await User.create({ 'email': email, 'password': passwordHash })
    ctx.response.status = 201
    ctx.response.body = { 'message': 'User created', 'userId': newUser.id }
    return
  } catch (error) {
    console.error(error)
    ctx.response.status = 500
    ctx.response.body = {
      message: 'Error creating user',
      error: error.message,
    }
    return
  }
}

const updateUser = async (ctx: Context) => {
  const { userId } = helpers.getQuery(ctx, { mergeParams: true })
  const { email, password } = await ctx.request.body({ type: 'json' }).value

  try {
    const user = await User.find(userId)
    if (!user) {
      ctx.response.status = 404
      return
    }
    user.email = email
    user.password = password
    await user.update()

    ctx.response.status = 200
    ctx.response.body = { 'message': 'User updated' }
    return
  } catch (error) {
    console.error(error)
    ctx.response.status = 500
    ctx.response.body = {
      message: 'Error updating user',
      error: error.message,
    }
    return
  }
}

const deleteUser = async (ctx: Context) => {
  const { userId } = helpers.getQuery(ctx, { mergeParams: true })
  try {
    const user = await User.find(userId)
    if (!user) {
      ctx.response.status = 404
      return
    }
    await user.delete()
    ctx.response.status = 204
    return
  } catch (error) {
    console.error(error)
    ctx.response.status = 500
    ctx.response.body = {
      message: 'Error deleting user',
      error: error.message,
    }
    return
  }
}

const userController = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
}

export default userController
