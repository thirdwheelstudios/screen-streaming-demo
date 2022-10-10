import { defineStore } from 'pinia'
import { io, Socket } from 'socket.io-client'

export const useSocketsStore = defineStore('sockets', {
  state: () => {
    let _socket: Socket | undefined
    let _connected: boolean = false
    let _senderId: string | undefined
    let _sdp: RTCSessionDescription | null | undefined
    let _candidate: RTCIceCandidate | null | undefined

    return { _socket, _connected, _senderId, _sdp, _candidate }
  },
  getters: {
    id(state) {
      return state._socket?.id
    },
    isConnected(state) {
      return state._connected
    },
    senderId(state) {
      return state._senderId
    },
    sdp(state) {
      return state._sdp
    },
    candidate(state) {
      return state._candidate
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

      socket.on('senderConnected', (senderId: string) => {
        console.log(`sender connected: ${senderId}`)
        this._senderId = senderId
      })

      socket.on('iceCandidate', (candidate: RTCIceCandidate) => {
        console.log('candidate', candidate)
        this._candidate = candidate
      })

      socket.on('sdp', (sdp: RTCSessionDescription | null) => {
        console.log('sdp', sdp)
        this._sdp = sdp
      })

      this._socket = socket
    },
    ping(callback: () => void) {
      this._socket?.emit('ping', callback)
    },
    connectToReceiver(receiverId: string) {
      this._socket?.emit('connectToReceiver', receiverId)
    },
    sendIceCandidate(receiverId: string, candidate: RTCIceCandidate) {
      this._socket?.emit('iceCandidate', receiverId, candidate)
    },
    sendSdp(receiverId: string, sdp: RTCSessionDescription | null) {
      this._socket?.emit('sdp', receiverId, sdp)
    },
  },
})
