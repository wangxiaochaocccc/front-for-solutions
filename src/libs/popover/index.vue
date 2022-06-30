<template>
  <div class="relative" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
    <!-- 具名插槽：主题区 -->
    <div>
      <slot name="reference"></slot>
    </div>
    <transition name="slide">
      <div v-show="isShow" class="bg-white rounded-md absolute p-1 z-20 border">
        <!-- 匿名插槽：鼠标悬浮展示区域 -->
        <slot />
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isShow = ref(false)

// 鼠标悬浮
const onMouseEnter = () => {
  isShow.value = true
}
// 鼠标离开
const onMouseLeave = () => {
  isShow.value = false
}
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
