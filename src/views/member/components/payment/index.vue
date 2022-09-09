<template>
  <div>
    <pc-payment v-if="!isMobileTerinal"></pc-payment>
    <mobile-payment v-else></mobile-payment>
  </div>
</template>

<script setup>
import PcPayment from './pc-payment/index.vue'
import MobilePayment from './mobile-payment/index.vue'
import { isMobileTerinal } from '@/utils/flexble'
</script>
<style lang="scss"></style>
