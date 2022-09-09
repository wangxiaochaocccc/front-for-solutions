<template>
  <div>
    <pc-payment v-if="!isMobileTerinal"></pc-payment>
  </div>
</template>

<script setup>
import PcPayment from './pc-payment/index.vue'
import { isMobileTerinal } from '@/utils/flexble'
</script>
<style lang="scss"></style>
