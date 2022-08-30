<template>
  <m-infinite v-model="loading" :isFinished="isFinished" @onLoad="getList">
    <m-waterfall
      class="px-1 w-full"
      :data="pexelsList"
      :colNum="isMobileTerinal ? 2 : 5"
      :picturePreReading="false"
      nodeKey="id"
    >
      <template v-slot="{ item, width }">
        <item-vue :data="item" :width="width"></item-vue>
      </template>
    </m-waterfall>
  </m-infinite>
</template>

<script setup>
import { ref, watch } from 'vue'
import itemVue from './item.vue'
import { getPexels } from '@/api/pexels'
import { isMobileTerinal } from '@/utils/flexble'
import { useStore } from 'vuex'

const store = useStore()
// 参数
let query = {
  page: 1,
  size: 20
}
// 是否处于加载中
const loading = ref(false)
// 是否全部加载完成
const isFinished = ref(false)
// 数据源
const pexelsList = ref([])
const getList = async () => {
  // 如果全部加载完成
  if (isFinished.value) return
  // 完成一次加载后 page自增
  if (pexelsList.value.length) {
    query.page += 1
  }
  // 触发请求
  const { list, total } = await getPexels(query)

  // 初始化数据
  if (query.page === 1) {
    pexelsList.value = list
  } else {
    pexelsList.value.push(...list)
  }
  // 判断是否全部加载完成
  if (pexelsList.value.length === total) {
    isFinished.value = true
  }
  // 修改loading标记
  loading.value = false
}

// 重置参数
const resetQuery = (newQuery) => {
  query = { ...query, ...newQuery }
  // 重置状态
  isFinished.value = false
  pexelsList.value = []
}
// 监听curCategory
watch(
  () => store.getters.curCategory,
  (curCategory) => {
    resetQuery({
      page: 1,
      categoryId: curCategory.id
    })
  }
)
// 监听搜索文本变化
watch(
  () => store.getters.searchText,
  (searchText) => {
    resetQuery({
      page: 1,
      searchText: searchText
    })
  }
)
</script>
<style lang="scss"></style>
