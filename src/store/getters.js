import { getBaseTransformPreset } from '@vue/compiler-core'

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
  historys: (state) => state.search.historys
}
