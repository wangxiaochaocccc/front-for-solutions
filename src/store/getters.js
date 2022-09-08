import { isMobileTerinal } from '@/utils/flexble'

export default {
  categorys: (state) => state.category.categorys,
  themeType: (state) => state.theme.themeType,
  // 当前选中的分类
  curCategory: (state) => state.app.curCategory,
  // 当前选中分类的下标
  curCategoryIndex: (state, getters) => {
    return getters.categorys.findIndex(item => {
      return getters.curCategory.id === item.id
    })
  },
  // 搜索历史
  historys: (state) => state.search.historys,
  // 搜索文本
  searchText: (state) => state.app.searchText,
  // token
  token: (state) => state.user.token,
  // 用户信息
  userInfo: (state) => state.user.userInfo,
  // 路由类型
  routerType: (state) => {
    if (!isMobileTerinal.value) {
      return 'none'
    }
    return state.app.routerType
  }
}
