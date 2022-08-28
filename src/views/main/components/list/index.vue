<template>
  <item-vue v-for="item in pexelsList" :key="item.id" :data="item" />
</template>

<script setup>
import { ref } from 'vue'
import itemVue from './item.vue'
import { getPexels } from '@/api/pexels'

// 参数
const query = {
  page: 1,
  size: 20
}
const pexelsList = ref([])
const getList = async () => {
  const { list } = await getPexels(query)
  pexelsList.value = list
}
getList()
</script>
<style lang="scss"></style>
