import { ALL_CATEGORY } from '@/constant'

export default {
  namespaced: true,
  state: () => ({
    curCategory: ALL_CATEGORY
  }),
  mutations: {
    // curCategory
    changeCateGory (state, newCategory) {
      state.curCategory = newCategory
    }
  }
}