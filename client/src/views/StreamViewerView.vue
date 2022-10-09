<script setup lang="ts">
import { computed } from 'vue'
import { useSocketsStore } from '../store'

const socketsStore = useSocketsStore()

const socketId = computed(() => socketsStore.id)
</script>

<template>
  <h1>Viewer</h1>
  <div>Socket Id: {{ socketId }}</div>
</template>
