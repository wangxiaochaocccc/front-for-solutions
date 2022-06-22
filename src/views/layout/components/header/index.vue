<template>
  <div class="w-full px-2 py-1 border-b border-b-zinc-200">
    <div class="flex items-center">
      <img
        class="h-4 cursor-pointer mr-2"
        src="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png"
        alt=""
      />
      <header-search class="mr-1.5"></header-search>
      <header-theme class="mr-1.5"></header-theme>
      <header-my></header-my>
    </div>
  </div>
</template>

<script setup>
import HeaderSearch from './header-search/index.vue'
import HeaderTheme from './header-theme.vue'
import HeaderMy from './header-my.vue'
</script>
<style lang="scss"></style>
