<template>
  <div
    ref="containerTarget"
    class="group relative p-0.5 border rounded-xl border-white dark:border-zinc-300 duration-500 hover:bg-red-100/40"
  >
    <div>
      <m-svg-icon
        name="search"
        color="#707070"
        class="w-1.5 h-1.5 absolute translate-y-[-50%] top-[50%] left-2"
      ></m-svg-icon>
      <input
        type="text"
        class="block w-full text-sm text-zinc-900 pl-4 h-[44px] rounded-xl outline-none bg-zinc-100 group-hover:bg-white dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-700 dark:group-hover:bg-zinc-900 dark:group-hover:border-zinc-700"
        placeholder="搜索"
        v-model="inputValue"
        @keyup.enter="onSearchHandle"
        @focus="onFocusHandle"
      />
      <m-svg-icon
        v-show="inputValue"
        name="input-delete"
        color="#707070"
        class="w-1.5 h-1.5 absolute translate-y-[-50%] top-[50%] right-9 duration cursor-pointer"
        @click="onDeteteHandle"
        @blur="onBlureHandle"
      ></m-svg-icon>
      <!-- 分隔线 -->
      <div
        class="w-[1px] bg-zinc-200 h-1.5 duration-500 absolute translate-y-[-50%] top-[50%] right-[62px] opacity-0 group-hover:opacity-100"
      ></div>
      <!-- 下拉区域-->
      <transition name="slide">
        <div
          v-if="$slots.dropdown"
          v-show="isFocus"
          class="max-h-[368px] w-full rounded absolute top-[56px] left-0 z-20 bg-white dark:bg-zinc-900 dark:border-zinc-600 overflow-auto text-base p-2 border border-zinc-200 hover:shadow-3xl duration-200"
        >
          <slot name="fropdown" />
        </div>
      </transition>
      <!-- 搜索按钮 -->
      <m-button
        icon="search"
        iconColor="#ffffff"
        class="absolute translate-y-[-50%] top-[50%] right-1 rounded-full opacity-0 group-hover:opacity-100 duration-500 cursor-pointer"
        @click="onSearchHandle"
      >
      </m-button>
    </div>
  </div>
</template>

<script>
const EMIT_UPDATE_VALUE = 'update:modelValue'
// 搜索事件
const EMIT_SEARCH = 'search'
// 删除文本事件
const EMIT_CLEAR = 'clear'
// 输入事件
const EMIT_INPUT = 'input'
// 获取焦点事件
const EMIT_FOCUE = 'focus'
// 失去焦点事件
const EMIT_BLUR = 'blur'
</script>
<script setup>
import { ref, watch } from 'vue'
import { useVModel, onClickOutside } from '@vueuse/core'

// 定义触发事件常量
const props = defineProps({
  modelValue: {
    required: true,
    type: String
  }
})
// 定义触发事件
const emits = defineEmits([
  EMIT_UPDATE_VALUE,
  EMIT_SEARCH,
  EMIT_BLUR,
  EMIT_FOCUE,
  EMIT_INPUT,
  EMIT_CLEAR
])
// 实现双向绑定
const inputValue = useVModel(props)

// 清除文本
const onDeteteHandle = () => {
  inputValue.value = ''
  emits(EMIT_CLEAR, '')
}
// 搜索
const onSearchHandle = () => {
  emits('EMIT_SEARCH', inputValue.value)
  console.log('search')
}
// 获取焦点
const isFocus = ref(false)
const onFocusHandle = () => {
  isFocus.value = true
  emits(EMIT_FOCUE)
}
// 点击区域外隐藏
const containerTarget = ref(null)
onClickOutside(containerTarget, () => {
  isFocus.value = false
})
// 监听输入行为
watch(inputValue, () => {
  emits(EMIT_INPUT, '')
})
// 失去焦点
const onBlureHandle = () => {
  emits(EMIT_BLUR)
}
</script>
<style lang="scss">
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(40px);
  opacity: 0;
}
</style>
