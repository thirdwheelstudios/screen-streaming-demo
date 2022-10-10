<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { useSocketsStore, useWebRTCStore } from '../store'

const socketsStore = useSocketsStore()
const webRTCStore = useWebRTCStore()

const socketId = computed(() => socketsStore.id)
const senderId = computed(() => socketsStore.senderId)
const track = computed(() => webRTCStore.track)
const stream = computed(() => {
  if (!track.value) return

  const mediaStream = new MediaStream()

  mediaStream.addTrack(track.value)

  return mediaStream
})

onMounted(() => {
  webRTCStore.startListening()
})

watch(
  () => socketsStore.sdp,
  async (value) => {
    if (!value) return

    await webRTCStore.setRemoteDescription(value)
  }
)

watch(
  () => socketsStore.candidate,
  async (value) => {
    if (!value) return

    await webRTCStore.setIceCandidate(value)
  }
)
</script>

<template>
  <h1>Viewer</h1>
  <div>Socket Id: {{ socketId }}</div>
  <div>Sender Id: {{ senderId ?? 'N/A' }}</div>
  <video v-if="track" :srcObject="stream" autoplay></video>
</template>

<style scoped>
video {
  max-width: 100%;
}
</style>
