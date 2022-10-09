import { defineStore } from 'pinia'
import { io, Socket } from 'socket.io-client'

export const useSocketsStore = defineStore('sockets', {
  state: () => {
    let _socket: Socket | undefined
    let _connected: boolean = false

    return { _socket, _connected }
  },
  getters: {
    id(state) {
      return state._socket?.id
    },
    isConnected(state) {
      return state._connected
    },
  },
  actions: {
    connect() {
      const socket = io('ws://localhost:8080/', {})

      socket.on('connect', () => {
        console.log(`connect: ${socket.id}`)
        this._connected = true
      })

      socket.on('disconnect', () => {
        console.log(`disconnect: ${socket.id}`)
        this._connected = false
      })

      this._socket = socket
    },
    ping(callback: () => void) {
      this._socket?.emit('ping', callback)
    },
  },
})
