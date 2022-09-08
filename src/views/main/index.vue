<template>
  <div
    class="h-full overflow-auto bg-white dark:bg-zinc-800 duration-300 scrollbar-thin scrollbar-thumb-transparent xl:scrollbar-thumb-zinc-200 xl:dark:scrollbar-thumb-zinc-900 scrollbar-track-transparent"
  >
    <navigation-page />
    <div class="max-w-screen-xl mx-auto mt-1 xl:mt-4">
      <list-vue />
    </div>
    <m-trigger-menu
      v-if="isMobileTerinal"
      class="fixed bottom-6 left-0 right-0 w-[210px]"
    >
      <m-trigger-menu-item
        icon="home"
        iconClass="fill-zinc-900 dark:fill-zinc-500"
      >
        首页
      </m-trigger-menu-item>
      <m-trigger-menu-item
        v-if="$store.getters.token"
        icon="vip"
        iconClass="fill-zinc-400 dark:fill-zinc-500"
        textClass="text-zinc-400 dark:text-zinc-500"
        @click="onVipClcik"
      >
        vip
      </m-trigger-menu-item>
      <m-trigger-menu-item
        icon="profile"
        iconClass="fill-zinc-400 dark:fill-zinc-500"
        textClass="text-zinc-400 dark:text-zinc-500"
        @click="onMyClick"
      >
        {{ $store.getters.token ? '我的' : '去登录' }}
      </m-trigger-menu-item>
    </m-trigger-menu>
  </div>
</template>
<script>
export default {
  name: 'home'
}
</script>
<script setup>
import navigationPage from './components/navigation/index.vue'
import listVue from './components/list/index.vue'
import { isMobileTerinal } from '@/utils/flexble'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const onMyClick = () => {
  store.commit('app/changeRouterType', 'push')
  store.getters.token ? router.push('/profile') : router.push('/login')
}
const onVipClcik = () => {}
</script>
<style lang="scss"></style>
