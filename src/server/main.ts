import * as express from 'express'

const server = express()

server.listen(process.env.PORT, (err: Error) => {
  if (err) { throw err }
})
