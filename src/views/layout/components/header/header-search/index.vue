<template>
  <div class="guide-search w-full">
    <m-search v-model="inputValue" @search="handleClick">
      <template #dropdown>
        <div>
          <!-- 搜索提示 -->
          <hint-vue
            :searchText="inputValue"
            v-show="inputValue"
            @handleClick="handleClick"
          />
          <!-- 搜索历史 -->
          <history-vue v-show="!inputValue" @handleClick="handleClick" />
          <!-- 推荐主题 -->
          <ThemeVue v-show="!inputValue" />
        </div>
      </template>
    </m-search>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import HintVue from './hint.vue'
import historyVue from './history.vue'
import ThemeVue from './theme.vue'
import { useStore } from 'vuex'

const store = useStore()
const inputValue = ref('')

// 点击搜索项回调
const handleClick = (val) => {
  if (!val) return
  inputValue.value = val
  store.commit('search/addHistory', val)
  store.commit('app/changeSearchText', val)
}
</script>
<style lang="scss"></style>
