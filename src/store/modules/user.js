import { loginUser, getProfile } from '@/api/sys'
import md5 from 'md5'
import { message } from '@/libs'

export default {
  namespaced: true,
  state: () => ({
    token: '',
    userInfo: {}
  }),
  mutations: {
    setToken (state, newToken) {
      state.token = newToken
    },
    setUserinfo (state, newUserInfo) {
      state.userInfo = newUserInfo
    }
  },
  actions: {
    // 登录
    async login (context, payload) {
      const { password } = payload
      await loginUser({
        ...payload,
        password: password ? md5(password) : ''
      }).then((res) => {
        context.commit('setToken', res.token)
        context.dispatch('profile')
      })
    },
    // 获取用户信息
    async profile (context) {
      await getProfile().then(res => {
        context.commit('setUserinfo', res)
        message('success', `欢迎您 ${res.vipLevel ? '尊贵的VIP' + res.vipLevel + '用户' + res.nickname : res.nickname}`, 6000)
      })
    }
  }
}