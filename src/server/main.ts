import * as express from 'express'

const staticDir = 'static'

const server = express()

server.use(express.static(staticDir))

server.listen(3000, (err: Error) => {
  if (err) throw err
  console.log('> Ready on http://localhost: 3000')
})
