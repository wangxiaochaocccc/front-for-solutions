<template>
  <!-- 蒙层 -->
  <trasition name="fade">
    <div
      v-if="isVisible"
      class="w-screen h-screen fixed top-0 left-0 z-40 bg-zinc-800/80"
      @click="close"
    ></div>
  </trasition>
  <!-- 主体 -->
  <trasition name="up">
    <div
      v-if="isVisible"
      class="w-[80%] p-2 bg-white dark:bg-zinc-800 fixed top-1/3 left-[50%] z-50 translate-x-[-50%] rounded xl:w-[35%]"
    >
      <!-- title -->
      <div class="text-lg font-bold text-zinc-900 dark:text-zinc-200 mb-2">
        {{ title }}
      </div>
      <!-- content -->
      <div class="text-base text-zinc-900 dark:text-zinc-200 mb-2">
        {{ content }}
      </div>
      <!-- button -->
      <div class="flex justify-end">
        <m-button type="info" class="mr-2" @click="cancelHandleClick">
          {{ cancelText }}
        </m-button>
        <m-button type="primary" @click="sureHandleClick">
          {{ sureText }}
        </m-button>
      </div>
    </div>
  </trasition>
</template>

<script setup>
import MButton from '@/libs/button/index.vue'
import { onMounted, ref } from 'vue'
// 接收数据
const props = defineProps({
  // 标题
  title: {
    type: String
  },
  // 内容
  content: {
    type: String
  },
  // 取消按钮文案
  cancelText: {
    type: String,
    default: '取消'
  },
  // 确认按钮文案
  sureText: {
    type: String,
    default: '确定'
  },
  // 关闭事件
  close: {
    type: Function
  },
  // 确认事件
  confirmHandle: {
    type: Function
  },
  // 取消事件
  cancelHandle: {
    type: Function
  }
})

// 控制显示与否
const isVisible = ref(false)
// 展示
const show = () => {
  isVisible.value = true
}
// 关闭动画执行事件
const duration = '0.5s'
// 关闭
const close = () => {
  isVisible.value = false
  setTimeout(() => {
    props?.close?.()
  }, parseInt(duration.replace('0.', '').replace('s', '') * 100))
}
// 确定按钮点击事件
const sureHandleClick = () => {
  props?.confirmHandle?.()
  close()
}
// 取消按钮点击事件
const cancelHandleClick = () => {
  props?.cancelHandle?.()
  close()
}
// 页面构建完成之后执行，这样才会有动画
onMounted(() => {
  show()
})
</script>
<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: all v-bind(duration);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.up-enter-active,
.up-leave-active {
  transition: all v-bind(duration);
}

.up-enter-from,
.up-leave-to {
  opacity: 0;
  transform: translate3d(-50%, 100px, 0);
}
</style>
