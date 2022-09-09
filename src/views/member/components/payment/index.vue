<template>
  <div>
    <pc-payment v-if="!isMobileTerinal" :payData="payData"></pc-payment>
    <mobile-payment v-else :payData="payData"></mobile-payment>
  </div>
</template>

<script setup>
import PcPayment from './pc-payment/index.vue'
import MobilePayment from './mobile-payment/index.vue'
import { isMobileTerinal } from '@/utils/flexble'

defineProps({
  payData: {
    type: Object,
    required: true
  }
})
</script>
<style lang="scss"></style>
