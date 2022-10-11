import { createServer } from 'http'
import { Server } from 'socket.io'

const port = process.env.port ?? '8080'

const corsOrigins =
  process.env.corsOrigins ?? 'http://localhost:5173,http://127.0.0.1:5173'

const httpServer = createServer()
const io = new Server(httpServer, {
  cors: {
    origin: corsOrigins.split(','),
  },
})

httpServer.listen(Number(port))

io.on('connect', (socket) => {
  console.log(`connect ${socket.id}`)

  socket.on('ping', (cb) => {
    console.log('ping')
    cb()
  })

  socket.on('connectToReceiver', (receiverId: string) => {
    io.to(receiverId).emit('senderConnected', socket.id)
  })

  socket.on(
    'iceCandidate',
    (receiverId: string, candidate: RTCIceCandidate) => {
      io.to(receiverId).emit('iceCandidate', candidate)
    }
  )

  socket.on('sdp', (receiverId: string, sdp: RTCSessionDescription | null) => {
    io.to(receiverId).emit('sdp', sdp)
  })

  socket.on('disconnect', () => {
    console.log(`disconnect ${socket.id}`)
  })
})
