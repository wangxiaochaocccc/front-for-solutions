<template>
  <div class="w-full">
    <m-search v-model="inputValue" @search="onSearchHandle">
      <template #dropdown>
        <div>
          <hint-vue
            :searchText="inputValue"
            v-show="inputValue"
            @handleClick="handleClick"
          />
        </div>
      </template>
    </m-search>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import HintVue from './hint.vue'

const inputValue = ref('')

// 搜索
const onSearchHandle = (val) => {
  console.log(val)
  inputValue.value = val
}
// 点击搜索项回调
const handleClick = (val) => {
  inputValue.value = val
}
</script>
<style lang="scss"></style>
