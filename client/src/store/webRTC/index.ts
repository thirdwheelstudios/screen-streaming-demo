import { defineStore } from 'pinia'
import { useSocketsStore } from '../sockets'

const rtcConfig = {
  iceServers: [
    {
      urls: 'stun:stun.l.google.com:19302', // Google's public STUN server
    },
  ],
} as RTCConfiguration

export const useWebRTCStore = defineStore('webRTC', {
  state: () => {
    let _peerConnection: RTCPeerConnection | undefined
    let _track: MediaStreamTrack | undefined
    let _streams: MediaStream[] | undefined

    return { _peerConnection, _track, _streams }
  },
  getters: {
    peerConnection(state) {
      return state._peerConnection
    },
    track(state) {
      return state._track
    },
    streams(state) {
      return state._streams
    },
  },
  actions: {
    async startBroadcasting(receiverId: string) {
      const socketsStore = useSocketsStore()

      const displayMedia = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      })

      const pc = new RTCPeerConnection(rtcConfig)

      pc.onicecandidate = (event) => {
        if (!event.candidate) return
        socketsStore.sendIceCandidate(receiverId, event.candidate)
      }

      displayMedia.getTracks().forEach((track) => {
        pc.addTrack(track)
      })

      const localDesc = await pc.createOffer()
      await pc.setLocalDescription(localDesc)
      socketsStore.sendSdp(receiverId, pc.localDescription)

      this._peerConnection = pc
    },
    async startListening() {
      const pc = new RTCPeerConnection(rtcConfig)

      pc.onicecandidate = (event) => {
        if (!event.candidate) return
        const socketsStore = useSocketsStore()
        socketsStore.sendIceCandidate(socketsStore.senderId!, event.candidate)
      }

      pc.ontrack = (event) => {
        this._track = event.track
        this._streams = [...event.streams]
      }

      this._peerConnection = pc
    },
    async setRemoteDescription(remoteDesc: RTCSessionDescription) {
      await this._peerConnection?.setRemoteDescription(remoteDesc)

      if (remoteDesc.type === 'offer') {
        const socketsStore = useSocketsStore()

        const localDesc = await this._peerConnection?.createAnswer()
        await this._peerConnection?.setLocalDescription(localDesc)
        socketsStore.sendSdp(
          socketsStore.senderId!,
          this._peerConnection?.localDescription!
        )
      }
    },
    async setIceCandidate(candidate: RTCIceCandidate) {
      await this._peerConnection?.addIceCandidate(candidate)
    },
  },
})
