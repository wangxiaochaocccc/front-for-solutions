<!--
 * @Author: wangchao
 * @Date: 2022-08-28 22:38:03
 * @LastEditors: wangchao
 * @LastEditTime: 2022-08-31 10:54:28
 * @Description: 
-->
<template>
  <div class="h-screen">
    <header-vue class="h-header" v-if="!isMobileTerinal"></header-vue>
    <div class="h-main">
      <main-vue></main-vue>
    </div>
    <floating-vue></floating-vue>
  </div>
</template>

<script setup>
import HeaderVue from './components/header/index.vue'
import MainVue from './components/main.vue'
import FloatingVue from './components/floating.vue'
import { isMobileTerinal } from '@/utils/flexble'
</script>
<style lang="scss"></style>
