<template>
  <mobile-navigation v-if="isMobileTerinal" />
</template>

<script setup>
import { isMobileTerinal } from '@/utils/flexble'
import mobileNavigation from './mobile/index.vue'
</script>
<style lang="scss"></style>
