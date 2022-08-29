<template>
  <div>
    <slot />
    <div class="h-6 py-4" ref="targetRef">
      <!-- 加载更多 -->
      <m-svg-icon
        v-show="isLoading"
        name="infinite-load"
        class="w-4 h-4 animate-spin"
      ></m-svg-icon>
      <!-- 没有数据了 -->
      <p class="text-base text-zinc-400 text-center" v-if="isFinished">
        已经到底了！
      </p>
    </div>
  </div>
</template>

<script setup>
import { useVModel, useIntersectionObserver } from '@vueuse/core'
import { ref, watch } from 'vue'

const props = defineProps({
  // 是否处于加载状态
  modelValue: {
    type: Boolean,
    require: true
  },
  // 是否加载完成
  isFinished: {
    type: Boolean,
    require: true
  }
})

const isLoading = useVModel(props)
const emits = defineEmits(['onLoad', 'update:modelValue'])
// 滚动
const targetRef = ref(null)
// 临时存储isIntersecting
const curIsIntersecting = ref(false)
useIntersectionObserver(targetRef, ([{ isIntersecting }], observerElement) => {
  curIsIntersecting.value = isIntersecting
  emitsLoad()
})

// 触发事件
const emitsLoad = () => {
  // 当加载更多的视图可见时，加载更多数据
  if (curIsIntersecting.value && !isLoading.value && !props.isFinished) {
    // 修改加载数据标记
    isLoading.value = true
    // 触发加载更多行为
    emits('onLoad')
  }
}
watch(isLoading, () => {
  setTimeout(() => {
    emitsLoad()
  }, 200)
})
</script>
<style lang="scss"></style>
