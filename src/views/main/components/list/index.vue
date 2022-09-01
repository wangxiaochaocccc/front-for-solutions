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
        <item-vue :data="item" :width="width" @click="onToDetails"></item-vue>
      </template>
    </m-waterfall>
  </m-infinite>

  <transition
    :css="false"
    @before-enter="beforeEnter"
    @enter="Enter"
    @leave="Leave"
  >
    <details-vue :id="parseInt(curDetail.id)" v-if="isVisibleDetail" />
  </transition>
</template>

<script setup>
import { ref, watch } from 'vue'
import itemVue from './item.vue'
import { getPexels } from '@/api/pexels'
import { isMobileTerinal } from '@/utils/flexble'
import { useStore } from 'vuex'
import DetailsVue from '@/views/details/components/detail.vue'
import { useEventListener } from '@vueuse/core'
import gsap from 'gsap'

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
// 进入详情
const isVisibleDetail = ref(false)
const curDetail = ref(null)
const onToDetails = (val) => {
  // 主动接入浏览器堆栈管理，更新url(不跳转)
  history.pushState(null, null, `/details/${val.id}`)
  curDetail.value = val
  isVisibleDetail.value = true
}

const beforeEnter = (el) => {
  gsap.set(el, {
    scaleX: 0,
    scaleY: 0,
    transformOrigin: '0 0',
    translateX: curDetail.value.localtion?.translateX,
    translateY: curDetail.value.localtion?.translateY,
    opacity: 0
  })
}
const Enter = (el, down) => {
  gsap.to(el, {
    scaleX: 1,
    scaleY: 1,
    translateX: 0,
    translateY: 0,
    opacity: 1,
    duration: 0.5,
    onComplete: down
  })
}

const Leave = (el, done) => {
  gsap.to(el, {
    duration: 0.3,
    scaleX: 0,
    scaleY: 0,
    x: curDetail.value.localtion?.translateX,
    y: curDetail.value.localtion?.translateY,
    opacity: 0
  })
}

// 监听浏览器后退行为
useEventListener(window, 'popstate', () => {
  isVisibleDetail.value = false
})
</script>
<style lang="scss"></style>
