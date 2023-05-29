import { Application } from './deps.ts'
import { PORT } from './configs/general.config.ts'
import router from './routes/user.router.ts'
import initDb from './db/init.db.ts'

const app = new Application()

// Routes
app.use(router.routes())

app.use(router.allowedMethods())

// Database
await initDb()

console.log(`Server running on port: ${PORT}`)
app.listen({ port: PORT })
