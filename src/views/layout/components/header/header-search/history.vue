<template>
  <div>
    <div class="text-xs text-zinc-300 flex items-center cursor-pointer mb-1">
      <span>最近搜索</span>
      <m-svg-icon
        class="w-2.5 h-2.5 ml-1 p-0.5 rounded-sm duration-300 hover:bg-zinc-100"
        name="delete"
        fillClass="fill-zinc-300"
        @click="delHistoryAll"
      ></m-svg-icon>
    </div>
    <div class="flex flex-wrap">
      <div
        class="flex items-center px-1 py-0.5 text-sm font-bold rounded-sm bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 text-zinc-900 hover:bg-zinc-400 mr-2 mb-1 cursor-pointer"
        v-for="(item, index) in $store.getters.historys"
        :key="item"
        @click="itemClick(item)"
      >
        <span>{{ item }}</span>
        <m-svg-icon
          class="w-2.5 h-2.5 ml-1 p-0.5 rounded-sm duration-300"
          name="input-delete"
          fillClass="fill-zinc-900"
          @click.stop="delHistory(index)"
        ></m-svg-icon>
      </div>
    </div>
  </div>
</template>
<script>
const EMITS_ITEM_CLICK = 'handleClick'
</script>
<script setup>
import { useStore } from 'vuex'
import { confirm } from '@/libs'

const store = useStore()
const emits = defineEmits([EMITS_ITEM_CLICK])

// 点击搜索历史item
const itemClick = (item) => {
  emits(EMITS_ITEM_CLICK, item)
}
// 删除单个
const delHistory = (index) => {
  store.commit('search/delHistory', index)
}
// 删除单个
const delHistoryAll = () => {
  confirm('要删除所有历史记录么？')
    .then(() => {
      store.commit('search/delHistoryAll')
    })
    .catch(() => {
      console.log('点击了取消')
    })
}
</script>
<style lang="scss"></style>
