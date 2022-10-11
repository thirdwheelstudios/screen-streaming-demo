import { onMounted } from 'vue'
import { useSocketsStore } from '../../store'

export function webSockets() {
  const socketsStore = useSocketsStore()

  onMounted(() => {
    socketsStore.connect()
  })

  return {}
}
