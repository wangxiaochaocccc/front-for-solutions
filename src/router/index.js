import { createRouter, createWebHistory } from 'vue-router'
import { isMobileTerinal } from '@/utils/flexble'
import mobileRoutes from './modules/mobile-routes'
import pcRoutes from './modules/pc-routes'

const router = createRouter({
  history: createWebHistory(),
  routes: isMobileTerinal.value ? mobileRoutes : pcRoutes
})

export default router
