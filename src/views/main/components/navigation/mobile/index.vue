<template>
  <div class="bg-white dark:bg-zinc-900 top-0 left-0 z-10 sticky">
    <ul
      ref="ulRef"
      class="relative flex text-xs text-zinc-600 overflow-x-auto overflow-hidden p-1"
    >
      <!-- 滑块 -->
      <li
        ref="slideRef"
        class="absolute h-[22.5px] bg-zinc-900 dark:bg-zinc-800 rounded-lg duration-200 z-[-1]"
        :style="sliderStyle"
      ></li>
      <!-- 面包屑图标 -->
      <li
        class="fixed top-0 right-[-1px] h-4 z-20 px-1 flex items-center bg-white dark:bg-zinc-900 shadow-l-white dark:shadow-l-zinc"
        @click="isShowPopup = !isShowPopup"
      >
        <m-svg-icon name="hamburger" class="w-1.5 h-1.5"></m-svg-icon>
      </li>
      <li
        v-for="(item, index) in $store.getters.categorys"
        :key="item.id"
        class="shrink-0 px-1.5 py-0.5 duration-200 last:mr-4"
        :class="{
          ' text-zinc-100': index === $store.getters.curCategoryIndex
        }"
        :ref="setItem"
        @click="handleItemClick(item)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
  <m-popup v-model="isShowPopup">
    <menu-vue @setOnItem="handleItemClick"></menu-vue>
  </m-popup>
</template>
<script setup>
import { onBeforeUpdate, ref, watch } from 'vue'
import { useScroll } from '@vueuse/core'
import MenuVue from '@/views/main/components/menu/index.vue'
import { useStore } from 'vuex'

const store = useStore()
// 滑块
const sliderStyle = ref({
  transform: 'translateX(0px)',
  width: '52px'
})

// 获取所有item元素
let itemsAll = []
const setItem = (el) => {
  if (el) {
    itemsAll.push(el)
  }
}
// 数据变化后，dom更新前处理itemsAll
onBeforeUpdate(() => {
  itemsAll = []
})
// 获取ul滚动距离
const ulRef = ref(null)
const { x: scrollLeft } = useScroll(ulRef)
// 当store.getters.curCategoryIndex变化时 触发效果
watch(
  () => store.getters.curCategoryIndex,
  (val) => {
    const { left, width } = itemsAll[val].getBoundingClientRect()
    sliderStyle.value = {
      transform: `translateX(${scrollLeft.value + left - 10 + 'px'})`,
      width: width + 'px'
    }
  }
)
// item点击事件
const handleItemClick = (item) => {
  store.commit('app/changeCateGory', item)
  isShowPopup.value = false
}
// popup
const isShowPopup = ref(false)
</script>
