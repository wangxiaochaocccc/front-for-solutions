<template>
  <div class="bg-white dark:bg-zinc-800 sticky top-0 left-0 w-full z-10">
    <ul
      class="w-[800px] relative mx-auto flex flex-wrap justify-center text-sm font-bold py-1 overflow-hidden duration-300"
      :class="isOpened ? 'h-[206px]' : 'h-[56px]'"
    >
      <li
        class="shrink-0 cursor-pointer rounded hover:bg-zinc-200 dark:bg-zinc-800 px-1.5 py-0 h-4 leading-4 text-zinc-900 dark:text-zinc-500 mr-1 mb-1 text-base"
        v-for="(item, index) in $store.getters.categorys"
        @click="handleSelected(item)"
        :class="{
          'bg-zinc-200 dark:bg-zinc-700':
            $store.getters.curCategoryIndex === index
        }"
      >
        {{ item.name }}
      </li>
      <!-- 伸缩图标 -->
      <div
        class="absolute bottom-2 right-0 rounded duration-200 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700"
      >
        <m-svg-icon
          class="w-1 h-1 dark:fill-zinc-300"
          :name="isOpened ? 'fold' : 'unfold'"
          @click="triggerOpened"
        ></m-svg-icon>
      </div>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
/**
 * 切换状态处理
 */
const isOpened = ref(false)
const triggerOpened = () => {
  isOpened.value = !isOpened.value
}
/**
 * 选中状态
 */
const handleSelected = (item) => {
  store.commit('app/changeCateGory', item)
}
</script>
<style lang="scss"></style>
