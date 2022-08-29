<template>
  <div class="h-screen">
    <header-vue class="h-header"></header-vue>
    <div class="h-main">
      <main-vue></main-vue>
    </div>
    <floating-vue class="fixed bottom-10 right-2"></floating-vue>
  </div>
</template>

<script setup>
import HeaderVue from './components/header/index.vue'
import MainVue from './components/main.vue'
import FloatingVue from './components/floating.vue'
</script>
<style lang="scss"></style>
