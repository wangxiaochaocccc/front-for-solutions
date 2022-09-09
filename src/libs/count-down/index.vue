<template>
  <div>
    <slot>
      <p class="text-sm">{{ showTime }}</p>
    </slot>
  </div>
</template>

<script>
const DURATION = 1000
const EMITS_FINISHED = 'finished'
const EMITS_CHANGE = 'change'
</script>
<script setup>
import dayjs from './utils'
import { onUnmounted, watch, computed, ref } from 'vue'

const props = defineProps({
  time: {
    type: String,
    required: true
  },
  format: {
    type: String,
    default: 'HH:mm:ss'
  }
})

const emits = defineEmits([EMITS_CHANGE, EMITS_FINISHED])

let duration = ref(0) //总时间
// 开始
let interval = null
const start = () => {
  close()
  interval = setInterval(() => {
    countDownTime()
  }, DURATION)
}
// 倒计时行为
const countDownTime = () => {
  duration.value -= DURATION
  emits(EMITS_CHANGE)
  if (duration.value < 0) {
    duration.value = 0
    emits(EMITS_FINISHED)
    close()
  }
}
// 结束
const close = () => {
  if (interval) {
    clearTimeout(interval)
  }
}

// 监听time
watch(
  () => props.time,
  (val) => {
    duration.value = val
    start()
  },
  { immediate: true }
)

// 显示
const showTime = computed(() => {
  return dayjs.duration(duration.value).format(props.format)
})
// 组件销毁
onUnmounted(() => {
  close()
})
</script>
<style lang="scss"></style>
