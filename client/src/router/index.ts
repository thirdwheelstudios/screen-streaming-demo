import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const StreamViewer = () => import('../views/StreamViewerView.vue')
const StreamBroadcast = () => import('../views/StreamBroadcastView.vue')

const routes = [
  {
    path: '/',
    name: 'viewer',
    component: StreamViewer,
  },
  {
    path: '/broadcast/:receiverId',
    name: 'broadcast',
    component: StreamBroadcast,
    props: true,
  },
] as RouteRecordRaw[]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'is-active',
})

export default router
