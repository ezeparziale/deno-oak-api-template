import { Context } from '../deps.ts'
import User from '../models/user.model.ts'
import { bcrypt } from '../deps.ts'

const loginUser = async (ctx: Context) => {
  const { username, password } = await ctx.request.body({ type: 'json' }).value

  try {
    const user = await User.select().where('email', username).first()
    if (user && await bcrypt.compare(password, user.password)) {
      ctx.response.status = 200
      ctx.response.body = 'token'
    } else {
      ctx.response.status = 401
      ctx.response.body = { message: 'Invalid credentials' }
    }
    return
  } catch (error) {
    console.error(error)
    ctx.response.status = 500
    ctx.response.body = {
      message: 'Error fetching posts',
      error: error.message,
    }
    return
  }
}

const registerUser = async (ctx: Context) => {
  const { username, password } = await ctx.request.body({ type: 'json' }).value

  try {
    if (!(username && password)) {
      ctx.response.status = 500
      ctx.response.body = { message: 'Email and password are required' }
      return
    }
    const userExists = await User.select().where('email', username).first()

    if (userExists) {
      ctx.response.status = 409
      ctx.response.body = { message: 'User already exists' }
      return
    }

    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)
    const newUser = await User.create({ 'email': username, 'password': passwordHash })
    ctx.response.status = 201
    ctx.response.body = { 'message': 'User created', 'userId': newUser.id }
    return
  } catch (error) {
    console.error(error)
    ctx.response.status = 500
    ctx.response.body = {
      message: 'Error fetching posts',
      error: error.message,
    }
    return
  }
}

const authController = {
  loginUser,
  registerUser,
}

export default authController
