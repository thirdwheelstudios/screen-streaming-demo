import { defineStore } from 'pinia'
import { io, Socket } from 'socket.io-client'

export const useSocketsStore = defineStore('sockets', {
  state: () => {
    let _socket: Socket | undefined

    return { _socket }
  },
  getters: {
    id(state) {
      return state._socket?.id
    },
  },
  actions: {
    connect() {
      const socket = io('ws://localhost:8080/', {})

      socket.on('connect', () => {
        console.log(`connect: ${socket.id}`)
      })

      socket.on('disconnect', () => {
        console.log(`disconnect: ${socket.id}`)
      })

      this._socket = socket
    },
    ping(callback: () => void) {
      this._socket?.emit('ping', callback)
    },
  },
})
