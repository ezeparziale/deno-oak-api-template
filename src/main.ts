import { Application } from './deps.ts'
import { PORT } from './configs/general.config.ts'
import routerUser from './routes/user.router.ts'
import routerPost from './routes/post.router.ts'
import routerAuth from './routes/auth.router.ts'

import initDb from './db/init.db.ts'

const app = new Application()

// Logger
app.use(async (ctx, next) => {
  await next()
  const rt = ctx.response.headers.get('X-Response-Time')
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`)
})

// Timing
app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  ctx.response.headers.set('X-Response-Time', `${ms}ms`)
})

// Routes
app.use(routerUser.routes())
app.use(routerPost.routes())
app.use(routerAuth.routes())

// app.use(router.allowedMethods())

// Database
await initDb()

console.log(`Server running on port: ${PORT}`)
app.listen({ port: PORT })
