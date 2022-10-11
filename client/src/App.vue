<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { onMounted } from 'vue'
import { useSocketsStore } from './store'

const socketsStore = useSocketsStore()

onMounted(() => {
  socketsStore.connect()
})
</script>

<template>
  <router-view />
</template>

<style scoped></style>
