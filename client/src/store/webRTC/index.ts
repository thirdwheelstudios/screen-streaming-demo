import { defineStore } from 'pinia'
import { useSocketsStore } from '../sockets'

export const useWebRTCStore = defineStore('webRTC', {
  state: () => {
    let _peerConnection: RTCPeerConnection | undefined

    return { _peerConnection }
  },
  getters: {
    peerConnection(state) {
      return state._peerConnection
    },
  },
  actions: {
    async startBroadcasting(receiverId: string) {
      const socketsStore = useSocketsStore()

      const rtcConfig = {
        iceServers: [
          {
            urls: 'stun:stun.l.google.com:19302', // Google's public STUN server
          },
        ],
      } as RTCConfiguration

      const pc = new RTCPeerConnection(rtcConfig)

      pc.onicecandidate = (event) => {
        if (!event.candidate) return
        socketsStore.iceCandidate(receiverId, event.candidate)
      }

      const localDesc = await pc.createOffer()
      await pc.setLocalDescription(localDesc)
      socketsStore.sdp(receiverId, pc.localDescription)

      const displayMedia = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      })

      displayMedia.getTracks().forEach((track) => {
        pc.addTrack(track)
      })

      this._peerConnection = pc
    },
  },
})
