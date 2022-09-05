import router from '@/router'
import store from '@/store'

router.beforeEach((to, form) => {
  // 无需登录直接进入
  if (!to.meta.user) {
    return
  }
  // 已登录，直接进入
  if (store.getters.token) {
    return true
  }
  // 未登录，警告
  message('warn', '登录失效，请重新登录')
  return '/'
})