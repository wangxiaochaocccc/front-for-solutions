<template>
  <mobile-navigation v-if="isMobileTerinal" :data="categoryData" />
</template>

<script setup>
import { ref } from 'vue'
import { isMobileTerinal } from '@/utils/flexble'
import mobileNavigation from './mobile/index.vue'
import { getCategory } from '@/api/category'
import { ALL_CATEGORY } from '@/constant/index'

// 数据源
const categoryData = ref([])
// 获取分类
const getCategoryData = async () => {
  const { categorys } = await getCategory()
  categoryData.value = categorys
  categoryData.value.unshift(ALL_CATEGORY)
}
getCategoryData()
</script>
<style lang="scss"></style>
