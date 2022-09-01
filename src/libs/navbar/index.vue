<template>
  <div
    class="w-full h-5 flex justify-between bg-white dark:bg-zinc-800 border-b"
    :class="[sticky ? 'absolute top-0 left-0' : 'relative']"
  >
    <!-- 左 -->
    <div
      class="w-5 h-full absolute left-0 flex items-center justify-center"
      @click="onClickLeft"
    >
      <slot name="left">
        <m-svg-icon
          name="back"
          class="w-2 h-2"
          fillClass="fill-zinc-900 dark:fill-zinc-200"
        ></m-svg-icon>
      </slot>
    </div>
    <!-- 中 -->
    <div class="h-full flex items-center text-base font-bold mx-auto">
      <slot></slot>
    </div>
    <!-- 右 -->
    <div
      class="w-5 h-full absolute right-0 flex items-center justify-center"
      @click="onClickRight"
    >
      <slot name="right" />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  // 是否吸顶
  sticky: {
    type: Boolean,
    default: false
  },
  // 点击左侧事件
  clickLeft: {
    type: Function
  },
  // 点击右侧事件
  clickRight: {
    type: Function
  }
})

const onClickRight = () => {
  props?.clickRight?.()
}
const onClickLeft = () => {
  if (props.clickLeft) {
    props.clickLeft()
    return
  }
  router.back()
}
</script>
<style lang="scss"></style>
