import { createStore } from 'vuex'
import getters from './getters'
import category from './modules/category'
import createPersistedState from 'vuex-persistedstate'
import theme from './modules/theme.js'
import app from './modules/app'

const store = createStore({
  getters,
  modules: {
    category,
    theme,
    app
  },
  plugins: [
    createPersistedState({
      key: 'front-solutions',
      paths: ['category', 'theme']
    })
  ]
})

export default store
