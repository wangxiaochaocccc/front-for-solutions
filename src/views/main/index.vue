<template>
  <div
    class="h-full overflow-auto bg-white dark:bg-zinc-800 duration-300 scrollbar-thin scrollbar-thumb-transparent xl:scrollbar-thumb-zinc-200 xl:dark:scrollbar-thumb-zinc-900 scrollbar-track-transparent"
  >
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
