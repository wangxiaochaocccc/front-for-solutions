<template>
  <div
    class="w-full px-2 py-1 border-b dark:bg-zinc-800 dark:border-b-zinc-700 border-b-zinc-200"
  >
    <div class="flex items-center">
      <img
        class="guide-home h-4 cursor-pointer mr-2 rounded-sm"
        src="/images/logo.jpeg"
        @click="onToHome"
      />
      <header-search class="mr-1.5"></header-search>
      <header-theme class="mr-1.5"></header-theme>
      <header-my></header-my>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import HeaderSearch from './header-search/index.vue'
import HeaderTheme from './header-theme.vue'
import HeaderMy from './header-my.vue'

const router = useRouter()
// 返回首页
const onToHome = () => {
  router.push('/')
}
</script>
<style lang="scss"></style>
