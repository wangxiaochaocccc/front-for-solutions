/**
 * 处理navigationBar中的数据categorys
*/
import { ALL_CATEGORY } from '@/constant/index'
import { getCategory } from '@/api/category'

export default {
  // 独立的作用域
  namespaced: true,
  state: () => {
    return {
      categorys: [ALL_CATEGORY]
    }
  },
  mutations: {
    setCategory (state, newData) {
      state.categorys = [ALL_CATEGORY, ...newData]
    }
  },
  actions: {
    async useSetCategory (context) {
      const { categorys } = await getCategory()
      context.commit('setCategory', categorys)
    }
  }
}
