<template>
  <div
    class="fixed left-0 bottom-0 w-screen text-center bg-white dark:bg-zinc-800 xl:hidden"
  >
    <discount-vue></discount-vue>
    <!-- 支付 -->
    <div class="flex justify-between text-xs px-1 py-0.5">
      <div class="text-left text-zinc-900 dark:text-zinc-200">
        <p class="">
          券后合计：
          <span class="text-red-600 text-[16px] font-sans font-medium">￥</span>
          <span class="text-red-600 text-[22px] font-sans font-medium">9</span>
        </p>
        <p class="text-red-600">优惠券：限时立减 ￥10</p>
      </div>
      <m-button class="w-[120px]" :isActiveAnim="false" @click="onConfirmClick">
        立即开通
      </m-button>
    </div>
    <m-popup v-model="isOpen">
      <pay-select :payData="payData"></pay-select>
    </m-popup>
  </div>
</template>

<script setup>
import DiscountVue from '../discount.vue'
import PaySelect from './pay-select.vue'
import { ref } from 'vue'

defineProps({
  payData: {
    type: Object,
    required: true
  }
})

const isOpen = ref(false)
const onConfirmClick = () => {
  isOpen.value = true
}
</script>
<style lang="scss"></style>
