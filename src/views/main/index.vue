<template>
  <div class="h-full overflow-auto bg-white dark:bg-zinc-800 duration-300">
    <navigation-page />
    <div class="max-w-screen-xl mx-auto mt-1 xl:mt-4">
      <list-vue />
    </div>
  </div>
</template>

<script setup>
import navigationPage from './components/navigation/index.vue'
import listVue from './components/list/index.vue'
</script>
<style lang="scss"></style>
