import { loginUser, getProfile, registerUser } from '@/api/sys'
import md5 from 'md5'
import { message } from '@/libs'
import { LOGIN_TYPE_OAUTH_NO_REGISTER_CODE } from '@/constant'

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
        // 扫码登录未注册时
        if (res.code === LOGIN_TYPE_OAUTH_NO_REGISTER_CODE) {
          return res.code
        }
        context.commit('setToken', res.token)
        context.dispatch('profile')
      })
    },
    // 获取用户信息
    async profile (context) {
      await getProfile().then(res => {
        context.commit('setUserinfo', res)
        message('success', `欢迎您 ${res.vipLevel ?
          '尊贵的VIP' + res.vipLevel + '用户' + res.nickname : res.nickname}`, 6000)
      })
    },
    logout (context) {
      context.commit('setToken', '')
      context.commit('setUserinfo', {})
      location.reload()
    },
    // 注册行为
    async register (context, payload) {
      const { password } = payload
      return await registerUser({
        ...payload,
        password: password ? md5(password) : ''
      })
    },
  }
}