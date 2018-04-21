import * as express from 'express'
import * as path from 'path'

const server = express()

server.use('/static', express.static('static'))

server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'static/index.html'))
})

server.listen(process.env.PORT, (err: Error) => {
  if (err) { throw err }
})
