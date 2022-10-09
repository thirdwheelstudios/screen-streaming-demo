<script setup lang="ts">
import { computed } from 'vue'
import { useSocketsStore } from '../store'

interface Props {
  receiverId: string
}

const props = defineProps<Props>()

const socketsStore = useSocketsStore()

const socketId = computed(() => socketsStore.id)

const connect = () => {
  socketsStore.connectToReceiver(props.receiverId)
}
</script>

<template>
  <h1>Broadcast</h1>
  <div>Socket Id: {{ socketId }}</div>
  <div>Receiver Id: {{ receiverId }}</div>
  <button v-if="receiverId" @click="connect">Connect</button>
</template>
