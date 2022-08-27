/**
 * 处理navigationBar中的数据categorys
 */
import { ALL_CATEGORY, CATEGORYS_NORMAL } from '@/constant/index'
import { getCategory } from '@/api/category'

export default {
  // 独立的作用域
  namespaced: true,
  state: () => {
    return {
      categorys: [CATEGORYS_NORMAL]
    }
  },
  mutations: {
    setCategory(state, newData) {
      state.categorys = [ALL_CATEGORY, ...newData]
    }
  },
  actions: {
    async useSetCategory(context) {
      const { categorys } = await getCategory()
      context.commit('setCategory', categorys)
    }
  }
}
