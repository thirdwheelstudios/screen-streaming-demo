<script setup lang="ts">
import { computed } from 'vue'
import { useSocketsStore } from '../store'

interface Props {
  receiverId: string
}

defineProps<Props>()

const socketsStore = useSocketsStore()

const socketId = computed(() => socketsStore.id)
</script>

<template>
  <h1>Broadcast</h1>
  <div>Socket Id: {{ socketId }}</div>
  <div>Receiver Id: {{ receiverId }}</div>
</template>
