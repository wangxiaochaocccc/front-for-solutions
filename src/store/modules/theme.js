import { THEME_LIGHT } from '@/constant'

export default {
  namespaced: true,
  state: () => ({
    themeType: THEME_LIGHT
  }),
  mutations: {
    changeThemeType (state, newType) {
      state.themeType = newType
    }
  }
}