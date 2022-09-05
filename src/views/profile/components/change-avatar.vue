<template>
  <div class="flex flex-col p-1 items-center overflow-auto" @click="close">
    <m-svg-icon
      v-if="isMobileTerinal"
      name="close"
      class="w-3 h-3 p-0.5 ml-auto mb-1"
      fillClass="fill-zinc-900 dark:fill-zinc-200"
    ></m-svg-icon>
    <img :src="blob" alt="" />
    <m-button class="mt-4 w-[80%] xl:w-1/2 mx-auto">确定</m-button>
  </div>
</template>

<script>
const EMITS_CLOSE = 'close'
</script>
<script setup>
import { isMobileTerinal } from '@/utils/flexble'

defineProps({
  blob: {
    type: String,
    required: true
  }
})

const emits = defineEmits([EMITS_CLOSE])
// 关闭
const close = () => {
  emits(EMITS_CLOSE)
}
</script>
<style lang="scss"></style>
