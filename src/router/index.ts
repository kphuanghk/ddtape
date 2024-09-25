import { createWebHashHistory, createRouter } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import NotFound from '@/views/NotFound.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/users', component: () => import('@/views/UserManagement.vue') },
  { path: '/signal', component: () => import('@/views/Signal.vue') },
  { path: '/scan', component: () => import('@/views/Scan.vue') },
  { path: '/localpdf', component: () => import('@/views/LocalPdf.vue') },
  { path: '/notfound', component: NotFound },
  { path: '/:catchAll(.*)', redirect: '/notfound' }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})
