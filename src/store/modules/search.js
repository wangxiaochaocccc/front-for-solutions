export default {
  namespaced: true,
  state: () => {
    return {
      historys: []
    }
  },
  mutations: {
    //添加搜索历史
    addHistory (state, newHistory) {
      // 查看是否重复
      const isFindIndex = state.historys.findIndex(item => item === newHistory)
      // 如果有重复项删除掉
      if (isFindIndex !== -1) {
        state.historys.splice(isFindIndex, 1)
      }
      // 增加在最前
      state.historys.unshift(newHistory)
    },
    // 删除单个
    delHistory (state, index) {
      state.historys.splice(index, 1)
    },
    // 删除全部
    delHistoryAll (state) {
      state.historys = []
    }
  }
}