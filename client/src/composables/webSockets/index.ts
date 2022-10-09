import { onMounted } from 'vue'
import { useSocketsStore } from '../../store'

export function webSockets() {
  const socketsStore = useSocketsStore()

  onMounted(() => {
    socketsStore.connect()

    setInterval(() => {
      const start = Date.now()

      socketsStore.ping(() => {
        console.log(`pong (latency: ${Date.now() - start} ms)`)
      })
    }, 1000)
  })

  return {}
}
