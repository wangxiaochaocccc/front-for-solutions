<template>
  <div class="w-full">
    <m-search v-model="inputValue" @search="onSearchHandle">
      <template #dropdown>
        <div>
          <!-- 搜索提示 -->
          <hint-vue
            :searchText="inputValue"
            v-show="inputValue"
            @handleClick="handleClick"
          />
          <!-- 搜索历史 -->
          <history-vue v-show="!inputValue" @itemClick="handleClick" />
        </div>
      </template>
    </m-search>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import HintVue from './hint.vue'
import historyVue from './history.vue'
import { useStore } from 'vuex'

const store = useStore()
const inputValue = ref('')

// 搜索
const onSearchHandle = (val) => {
  console.log(val)
  inputValue.value = val
}
// 点击搜索项回调
const handleClick = (val) => {
  inputValue.value = val
  store.commit('search/addHistory', val)
}
</script>
<style lang="scss"></style>
