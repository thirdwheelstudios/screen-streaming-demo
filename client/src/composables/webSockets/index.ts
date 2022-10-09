import { onMounted, ref } from 'vue'
import { io, Socket } from 'socket.io-client'

export function webSockets() {
  const socket = ref<Socket>()

  onMounted(() => {
    const newSocket = io('ws://localhost:8080/', {})

    newSocket.on('connect', () => {
      console.log(`connect: ${newSocket.id}`)
    })

    newSocket.on('disconnect', () => {
      console.log(`disconnect: ${newSocket.id}`)
    })

    setInterval(() => {
      const start = Date.now()
      newSocket.emit('ping', () => {
        console.log(`pong (latency: ${Date.now() - start} ms)`)
      })
    }, 1000)

    socket.value = newSocket
  })

  return {}
}
