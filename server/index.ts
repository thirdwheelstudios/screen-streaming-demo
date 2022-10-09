import { createServer } from 'http'
import { Server } from 'socket.io'

const port = 8080

const httpServer = createServer()
const io = new Server(httpServer, {
  cors: {
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  },
})

httpServer.listen(port)

io.on('connect', (socket) => {
  console.log(`connect ${socket.id}`)

  socket.on('ping', (cb) => {
    console.log('ping')
    cb()
  })

  socket.on('disconnect', () => {
    console.log(`disconnect ${socket.id}`)
  })
})
