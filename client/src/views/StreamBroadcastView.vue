<script setup lang="ts">
import { computed, watch } from 'vue'
import { useSocketsStore, useWebRTCStore } from '../store'

interface Props {
  receiverId: string
}

const props = defineProps<Props>()

const socketsStore = useSocketsStore()
const webRTCStore = useWebRTCStore()

const socketId = computed(() => socketsStore.id)

const connect = () => {
  socketsStore.connectToReceiver(props.receiverId)
  webRTCStore.startBroadcasting(props.receiverId)
}

watch(
  () => socketsStore.sdp,
  async (value) => {
    if (!value) return

    await webRTCStore.setRemoteDescription(value)
  }
)
</script>

<template>
  <h1>Broadcast</h1>
  <div>Socket Id: {{ socketId }}</div>
  <div>Receiver Id: {{ receiverId }}</div>
  <button v-if="receiverId" @click="connect">Connect</button>
</template>
