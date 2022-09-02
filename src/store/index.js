import { createStore } from 'vuex'
import getters from './getters'
import category from './modules/category'
import createPersistedState from 'vuex-persistedstate'
import theme from './modules/theme.js'
import app from './modules/app'
import search from './modules/search'
import user from './modules/user'

const store = createStore({
  getters,
  modules: {
    category,
    theme,
    app,
    search,
    user
  },
  plugins: [
    createPersistedState({
      key: 'front-solutions',
      paths: ['category', 'theme', 'search', 'user']
    })
  ]
})

export default store
