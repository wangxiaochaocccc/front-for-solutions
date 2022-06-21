<template>
  <div class="">我是移动端navigation</div>
</template>

<script setup>
import { getCategory } from '@/api/category'

// 获取分类
const getCategoryData = async () => {
  const res = await getCategory()
  console.log(res)
}
getCategoryData()
</script>
<style lang="scss"></style>
