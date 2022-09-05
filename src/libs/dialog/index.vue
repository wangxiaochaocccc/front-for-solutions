<template>
  <transition name="fade">
    <div
      v-if="isVisible"
      class="w-screen h-screen fixed top-0 left-0 bg-zinc-900/80"
      @click="close"
    ></div>
  </transition>
  <transition name="up">
    <div
      v-if="isVisible"
      class="max-w-[80%] max-h-[80%] fixed top-[10%] left-[50%] translate-x-[-50%] z-50 px-2 py-1.5 rounded bg-white dark:bg-zinc-600 xl:min-w-[35%] overflow-auto"
    >
      <!-- 标题 -->
      <div
        v-if="title"
        class="font-bold text-sm text-zinc-900 dark:text-zinc-300 mb-2"
      >
        {{ title }}
      </div>
      <!-- 内容 -->
      <div class="text-base text-zinc-900 dark:text-zinc-300 mb-2">
        <slot></slot>
      </div>
      <!-- 按钮 -->
      <div class="flex justify-end" v-if="confirmHandle || cancelHandle">
        <m-button type="info" @click="onCancelHandle" class="mr-2">
          {{ cancelText }}
        </m-button>
        <m-button type="primary" @clcik="onConfirmHandle">
          {{ confimText }}
        </m-button>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { useVModel } from '@vueuse/core'

const props = defineProps({
  // 是否显示
  modelValue: {
    type: Boolean,
    required: true
  },
  // 标题
  title: {
    type: String
  },
  // 确认按钮文案
  confimText: {
    type: String,
    default: '确认'
  },
  // 取消按钮文案
  cancelText: {
    type: String,
    default: '取消'
  },
  // 确认回调
  confirmHandle: {
    type: Function
  },
  // 取消回调
  cancelHandle: {
    type: Function
  },
  // 关闭
  close: {
    type: Function
  }
})

const isVisible = useVModel(props)

// 确认事件回调
const onConfirmHandle = () => {
  props?.confirmHandle?.()
  close()
}
// 取消事件回调
const onCancelHandle = () => {
  props?.cancelHandle?.()
  close()
}
// 关闭
const close = () => {
  isVisible.value = false
  props?.close?.()
}
</script>
<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.up-enter-active,
.up-leave-active {
  transition: all 0.3s;
}

.up-enter-from,
.up-leave-to {
  opacity: 0;
  transform: translate3d(-50%, 100px, 0);
}
</style>
