<template>
  <div class="relative" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
    <!-- 具名插槽：主题区 -->
    <div ref="referenceRef">
      <slot name="reference"></slot>
    </div>
    <transition name="slide">
      <div
        ref="contentRef"
        v-show="isShow"
        class="bg-white rounded-md absolute p-1 z-20 border"
        :style="placementStyle"
      >
        <!-- 匿名插槽：鼠标悬浮展示区域 -->
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
const PROP_BOTTOM_LEFT = 'bottom-left'
const PROP_BOOTOM_RIGHT = 'bottom-right'
const PROP_TOP_LEFT = 'top-left'
const PROP_TOP_RIGHT = 'top-right'
const placementEnum = [
  PROP_TOP_RIGHT,
  PROP_TOP_LEFT,
  PROP_BOOTOM_RIGHT,
  PROP_BOTTOM_LEFT
]
</script>
<script setup>
import { ref, watch, nextTick } from 'vue'

const props = defineProps({
  placement: {
    type: String,
    default: 'PROP_BOOTOM_LEFT',
    validator(value) {
      const res = placementEnum.includes(value)
      if (!res) {
        throw new Error(
          `你的placement必须是${placementEnum.join('、')}中的一个`
        )
      }
      return res
    }
  }
})
// 是否展示内容区
const isShow = ref(false)

// 鼠标悬浮
const onMouseEnter = () => {
  isShow.value = true
}
// 鼠标离开
const onMouseLeave = () => {
  isShow.value = false
}
// 获取元素的宽高
const contentRef = ref(null)
const referenceRef = ref(null)
const getElementSize = (target) => {
  if (!target) return {}
  return {
    width: target.offsetWidth,
    height: target.offsetHeight
  }
}
// 位置的样式
const placementStyle = ref({
  top: 0,
  left: 0
})
// 计算位置
watch(isShow, (val) => {
  if (!val) return
  nextTick(() => {
    switch (props.placement) {
      case PROP_BOTTOM_LEFT:
        placementStyle.value.top =
          getElementSize(referenceRef.value).height + 'px'
        placementStyle.value.left =
          -getElementSize(contentRef.value).width + 'px'
        break
      case PROP_BOOTOM_RIGHT:
        placementStyle.value.top =
          getElementSize(referenceRef.value).height + 'px'
        placementStyle.value.left =
          getElementSize(referenceRef.value).width + 'px'
        break
      case PROP_TOP_LEFT:
        placementStyle.value.top = 0
        placementStyle.value.left =
          -getElementSize(contentRef.value).width + 'px'
        break
      case PROP_TOP_RIGHT:
        placementStyle.value.top = 0
        placementStyle.value.left =
          getElementSize(referenceRef.value).width + 'px'
        break
    }
  })
})
</script>
<style lang="scss">
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateY(20px);
}
</style>
