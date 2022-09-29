<template>
  <div class="h-screen">
    <header-vue class="h-header" v-if="!isMobileTerinal"></header-vue>
    <div class="h-main">
      <main-vue></main-vue>
    </div>
    <floating-vue></floating-vue>
    <footer-vue/>
  </div>
</template>

<script setup>
import HeaderVue from './components/header/index.vue'
import FooterVue from './components/footer.vue'
import MainVue from './components/main.vue'
import FloatingVue from './components/floating.vue'
import { isMobileTerinal } from '@/utils/flexble'
</script>
<style lang="scss"></style>
