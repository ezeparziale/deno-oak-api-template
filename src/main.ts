import { Application, Router } from './deps.ts'

const router = new Router()
router.get('/', (ctx) => {
  ctx.response.body = `<!DOCTYPE html>
    <html>
      <head><title>Hello oak!</title><head>
      <body>
        <h1>Hello oak!</h1>
      </body>
    </html>
  `
})

const app = new Application()
app.use(router.routes())
app.use(router.allowedMethods())

const PORT = 3000
console.log(`Server running on port: ${PORT}`)
app.listen({ port: PORT })
