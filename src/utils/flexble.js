import { computed } from 'vue'
import { PC_DEVICE_WIDTH } from '@/constant'
import { useWindowSize } from '@vueuse/core'

// 获取响应式宽度
const { width } = useWindowSize()

// 判断是否是移动端设备，依据是看屏幕宽度是否小于指定值
export const isMobileTerinal = computed(() => {
  return width.value < PC_DEVICE_WIDTH
})
