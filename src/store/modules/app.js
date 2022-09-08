
import { ALL_CATEGORY } from '@/constant'

export default {
  namespaced: true,
  state: () => ({
    curCategory: ALL_CATEGORY,
    // 搜索文本
    searchText: '',
    // 路由类型 后退和前进
    routerType: 'none'
  }),
  mutations: {
    // curCategory
    changeCateGory (state, newCategory) {
      state.curCategory = newCategory
    },
    // 修改搜索文本
    changeSearchText (state, newSeachText) {
      state.searchText = newSeachText
    },
    changeRouterType (state, newRouterType) {
      state.routerType = newRouterType
    }
  }
}