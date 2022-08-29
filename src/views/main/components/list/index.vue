<template>
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
</template>

<script setup>
import { ref } from 'vue'
import itemVue from './item.vue'
import { getPexels } from '@/api/pexels'
import { isMobileTerinal } from '@/utils/flexble'

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
