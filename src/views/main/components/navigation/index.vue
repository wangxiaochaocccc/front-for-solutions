<template>
  <mobile-navigation v-if="isMobileTerinal" />
</template>

<script setup>
import { isMobileTerinal } from '@/utils/flexble'
import mobileNavigation from './mobile/index.vue'
import { useStore } from 'vuex'

const store = useStore()

store.dispatch('category/useSetCategory')
</script>
<style lang="scss"></style>
