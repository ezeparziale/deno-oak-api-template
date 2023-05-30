import db from './database.db.ts'
import User from '../models/user.model.ts'
import Post from '../models/post.model.ts'

const initDb = async () => {
  console.log('Checking connection...')
  try {
    await db.ping()
    await db.link([User, Post])
    await db.sync()
    console.log('Database connection successful!')
  } catch (error) {
    console.error('Error connecting to the database:', error)
  } finally {
    await db.close()
  }
}

export default initDb
