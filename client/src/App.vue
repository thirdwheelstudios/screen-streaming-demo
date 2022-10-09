<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { io } from 'socket.io-client'
import HelloWorld from './components/HelloWorld.vue'

const socket = io('ws://localhost:8080/', {})

socket.on('connect', () => {
  console.log(`connect: ${socket.id}`)
})

socket.on('disconnect', () => {
  console.log(`disconnect: ${socket.id}`)
})

setInterval(() => {
  const start = Date.now()
  socket.emit('ping', () => {
    console.log(`pong (latency: ${Date.now() - start} ms)`)
  })
}, 1000)
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
