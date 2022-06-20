import { computed } from 'vue'
import { PC_DEVICE_WIDTH } from '../constant'

// 判断是否是移动端设备，依据是看屏幕宽度是否小于指定值
export const isMobileTerinal = computed(() => {
  return document.documentElement.clientWidth < PC_DEVICE_WIDTH
})
