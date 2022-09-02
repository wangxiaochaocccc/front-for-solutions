import { loginUser } from '@/api/sys'
import md5 from 'md5'

export default {
  namespaced: true,
  state: () => ({
    token: ''
  }),
  mutations: {
    setToken (state, newToken) {
      state.token = newToken
    }
  },
  actions: {
    async login (context, payload) {
      const { password } = payload
      await loginUser({
        ...payload,
        password: password ? md5(password) : ''
      }).then((res) => {
        context.commit('setToken', res.token)
      })
    }
  }
}