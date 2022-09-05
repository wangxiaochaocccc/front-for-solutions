<template>
  <transition name="down" @after-leave="destroy">
    <div
      v-if="isVisible"
      class="flex items-center py-1 px-3 text-sm w-[80%] xl:max-w-[420px] fixed top-[20px] left-[50%] translate-x-[-50%] z-50 rounded"
      :class="styles[type].containerClass"
    >
      <m-svg-icon
        class="w-1.5 h-1.5 mr-1.5"
        :name="styles[type].icon"
        :fillClass="styles[type].fillClass"
      ></m-svg-icon>
      <span :class="styles[type].textClass">{{ content }}</span>
    </div>
  </transition>
</template>

<script>
const SUCCESS = 'success'
const WARN = 'warn'
const ERROR = 'error'

const typeEnum = [SUCCESS, WARN, ERROR]
// 样式
const styles = {
  // 成功
  success: {
    icon: 'success',
    fillClass: 'fill-success-300',
    textClass: 'text-success-300',
    containerClass:
      'bg-success-100 border-success-200 hover:shadow-lg hover:shadow-success-100'
  },
  // 错误
  error: {
    icon: 'error',
    fillClass: 'fill-error-300',
    textClass: 'text-error-300',
    containerClass:
      'bg-error-100 border-error-200 hover:shadow-lg hover:shadow-error-100'
  },
  // 警告
  warn: {
    icon: 'warn',
    fillClass: 'fill-warn-300',
    textClass: 'text-warn-300',
    containerClass:
      'bg-warn-100 border-warn-200 hover:shadow-lg hover:shadow-warn-100'
  }
}
</script>
<script setup>
import mSvgIcon from '../svg-icon/index.vue'
import { onMounted, ref } from 'vue'

const props = defineProps({
  // 类型
  type: {
    type: String,
    required: true,
    validator(val) {
      const res = typeEnum.includes(val)
      if (!res) {
        throw new Error(`你的type必须是${typeEnum.join('、')}中的一个`)
      }
      return res
    }
  },
  // 内容
  content: {
    type: String,
    required: true
  },
  // 关闭时回调
  destroy: {
    type: Function
  },
  // 持续时长
  duration: {
    type: Number
  }
})
// 显示与否
const isVisible = ref(false)

// 在onMounted中显示，有动画
onMounted(() => {
  isVisible.value = true
  setTimeout(() => {
    isVisible.value = false
  }, props.duration)
})
</script>
<style lang="scss" scoped>
.down-enter-active,
.down-leave-active {
  transition: all 0.5s;
}

.down-enter-from,
.down-leave-to {
  opacity: 0;
  transform: translate3d(-50%, -100px, 0);
}
</style>
