<template>
  <div>
    <div
      v-for="(item, index) in hintData"
      :key="index"
      class="py-1 pl-1 text-base font-bold cursor-pointer rounded text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-800"
      v-html="highLightText(item)"
      @click="itemClick(item)"
    ></div>
  </div>
</template>
<script>
const EMITS_ITEM_CLICK = 'handleClick'
</script>
<script setup>
import { watch, ref } from 'vue'
import { getHint } from '@/api/pexels'
import { watchDebounced } from '@vueuse/core'
//接收数据
const props = defineProps({
  searchText: {
    type: String
  }
})

// 获取搜索数据
const hintData = ref([])
const getData = async () => {
  if (!props.searchText) return
  const { result } = await getHint(props.searchText)
  hintData.value = result
}
// 监听seachText
watchDebounced(() => props.searchText, getData, {
  immediate: true,
  debounce: 500
})

const emits = defineEmits([EMITS_ITEM_CLICK])
// 点击搜索结果
const itemClick = (item) => {
  emits(EMITS_ITEM_CLICK, item)
}

// 文本高亮处理
const highLightText = (text) => {
  const hilightStr = `<span class="text-zinc-900 dark:text-zinc-200">${props.searchText}</span>`
  const reg = new RegExp(props.searchText, 'gi')
  return text.replace(reg, hilightStr)
}
</script>
<style lang="scss"></style>
