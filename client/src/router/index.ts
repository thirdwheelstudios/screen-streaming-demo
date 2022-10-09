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
    path: '/broadcast',
    name: 'broadcast',
    component: StreamBroadcast,
  },
] as RouteRecordRaw[]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'is-active',
})

export default router
