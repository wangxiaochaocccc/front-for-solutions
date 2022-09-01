<template>
  <div class="w-full h-full bg-zinc-200 dark:bg-zinc-800">
    <detail-vue :id="$route.params.id" />
  </div>
</template>

<script setup>
import detailVue from './components/detail.vue'
</script>
<style lang="scss"></style>
