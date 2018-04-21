import * as express from 'express'

const server = express()

console.log('aaa')
server.listen(process.env.PORT, (err: Error) => {
  if (err) throw err
  console.log('> Ready on http://localhost: 3000')
})
