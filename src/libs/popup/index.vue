<template>
  <teleport to="body">
    <!-- 蒙层 -->
    <transition name="fade">
      <div
        v-if="isVisible"
        class="w-screen h-screen bg-zinc-900/80 fixed top-0 left-0 z-30"
        @click="isVisible = false"
      ></div>
    </transition>

    <!-- 内容 -->
    <transition name="popup">
      <div
        v-if="isVisible"
        class="fixed bottom-0 w-screen z-40 bg-white dark:bg-zinc-800 rounded"
        v-bind="$attrs"
      >
        <slot></slot>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import { useScrollLock, useVModel } from '@vueuse/core'
import { watch } from 'vue'
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

// defineEmits(['update:modelValue', false])

// 滚动锁定
const isLocked = useScrollLock(document.body)

// 使用useVModel

const isVisible = useVModel(props)
watch(
  isVisible,
  (val) => {
    isLocked.value = val
  },
  {
    immediate: true
  }
)
</script>
<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.popup-enter-active,
.popup-leave-active {
  transition: all 0.3s;
}
.popup-enter-from,
.popup-leave-to {
  transform: translateY(100%);
}
</style>
