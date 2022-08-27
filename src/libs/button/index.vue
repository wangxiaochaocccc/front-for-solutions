<template>
  <button
    class="text-sm rounded text-center flex justify-center items-center duration-150"
    :class="[
      typeStyle[type],
      sizeStyle[sizeKey]?.button,
      { 'active:scale-105': isActiveAnimation }
    ]"
    @click.stop="onBtnClick"
  >
    <!-- 加载状态 -->
    <m-svg-icon
      name="loading"
      v-if="isLoading"
      class="w-2 h-2 animate-spin mr-1"
    ></m-svg-icon>
    <!-- icon按钮 -->
    <m-svg-icon
      v-if="icon"
      :name="icon"
      :class="sizeStyle[sizeKey]?.icon"
      class="m-auto"
      :fillClass="iconClass"
      :color="iconColor"
    ></m-svg-icon>
    <!-- 文字按钮 -->
    <slot v-else />
  </button>
</template>

<script>
// 定义按钮风格
const typeStyle = {
  primary:
    'text-white bg-zinc-800 dark:bg-zinc-900 hover:bg-zinc-900 dark:hover:bg-zinc-700 active:bg-zinc-800 dark:active:bg-zinc-700',
  main: 'text-white bg-main dark:bg-zinc-900 hover:bg-hover-main active:bg-zinc-800 dark:active:bg-zinc-700 dark:hover:bg-zinc-700',
  info: 'text-zinc-800 bg-zinc-200 hover:bg-zinc-300 active:bg-zinc-200 dark:hover:bg-zinc-700 dark:active:bg-zinc-700 dark:bg-zinc-900 dark:text-zinc-300'
}
// 按钮大小 分为文字按钮和icon按钮
const sizeStyle = {
  default: {
    button: 'w-8 h-4 text-base',
    icon: ''
  },
  'icon-default': {
    button: 'w-4 h-4',
    icon: 'w-1.5 h-1.5'
  },
  small: {
    button: 'w-7 h-3 text-base',
    icon: ''
  },
  'icon-small': {
    button: 'w-3 h-3',
    icon: 'w-1.5 h-1.5'
  }
}
</script>
<script setup>
import { computed } from 'vue'

// 常量
const emits = defineEmits(['btnClick'])

const props = defineProps({
  // 按钮风格
  type: {
    type: String,
    default: 'main',
    validator(val) {
      // 检查是否在指定风格内
      const keys = Object.keys(typeStyle)
      const res = keys.includes(val)
      // 如果不在给出提示
      if (!res) {
        throw new Error(`你的type必须是${keys.join('、')}中的一个`)
      }
      // 返回校验结果
      return res
    }
  },
  // 按钮大小
  size: {
    type: String,
    default: 'default',
    validator(val) {
      // 检查是否在指定风格内 判断文字就可以
      const keys = Object.keys(sizeStyle).filter((val) => !val.includes('icon'))
      const res = keys.includes(val)
      // 如果不在给出提示
      if (!res) {
        throw new Error(`${keys.join('、')}中的一个`)
      }
      // 返回校验结果
      return res
    }
  },
  // icon名称
  icon: String,
  // icon颜色
  iconColor: String,
  // icon类名
  iconClass: String,
  // 是否显示动画
  isActiveAnimation: {
    type: Boolean,
    default: true
  },
  // 加载状态
  isLoading: {
    type: Boolean,
    default: false
  }
})
// 判断大小风格是否需要加icon前缀
const sizeKey = computed(() => {
  return props.icon ? 'icon-' + props.size : props.size
})

// 点击事件
const onBtnClick = () => {
  if (props.isLoading) return
  emits('btnClick')
}
</script>
<style lang="scss"></style>
