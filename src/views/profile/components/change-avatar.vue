<template>
  <div class="flex flex-col p-1 items-center overflow-auto h-screen">
    <m-svg-icon
      @click="close"
      v-if="isMobileTerinal"
      name="close"
      class="w-3 h-3 p-0.5 ml-auto mb-1"
      fillClass="fill-zinc-900 dark:fill-zinc-200"
    ></m-svg-icon>
    <img :src="blob" ref="imageTarget" />
    <m-button
      :isLoading="loading"
      class="mt-4 w-[80%] xl:w-1/2 mx-auto"
      @click="onHandleConfirm"
    >
      确定
    </m-button>
  </div>
</template>

<script>
const EMITS_CLOSE = 'close'
</script>
<script setup>
import { isMobileTerinal } from '@/utils/flexble'
import { ref, onMounted } from 'vue'

import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'

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
// 图片裁剪
const imageTarget = ref(null)
let cropper
onMounted(() => {
  /**
   * 接收两个参数：
   * 1. 需要裁剪的图片 DOM
   * 2. options 配置对象
   */
  cropper = new Cropper(
    imageTarget.value,
    isMobileTerinal.value ? mobileOptions : pcOptions
  )
})
// 移动端配置对象
const mobileOptions = {
  // 将裁剪框限制在画布的大小
  viewMode: 1,
  // 移动画布，裁剪框不动
  dragMode: 'move',
  // 裁剪框固定纵横比：1:1
  aspectRatio: 1,
  // 裁剪框不可移动
  cropBoxMovable: false,
  // 不可调整裁剪框大小
  cropBoxResizable: false
}

// PC 端配置对象
const pcOptions = {
  // 裁剪框固定纵横比：1:1
  aspectRatio: 1
}
// 确定
const loading = ref(false)
const onHandleConfirm = () => {
  loading.value = true
  // 获取裁剪后的图片
  cropper.getCroppedCanvas().toBlob((blob) => {
    // 裁剪后的 blob 地址
    console.log(URL.createObjectURL(blob))
  })
}
</script>
<style lang="scss"></style>