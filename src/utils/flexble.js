import { computed } from 'vue'
import { PC_DEVICE_WIDTH } from '@/constant'
import { useWindowSize } from '@vueuse/core'

// 获取响应式宽度
const { width } = useWindowSize()

// 判断是否是移动端设备，依据是看屏幕宽度是否小于指定值
export const isMobileTerinal = computed(() => {
  // return width.value < PC_DEVICE_WIDTH
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
})

// 动态指定rem值 最大为40px,根据屏幕宽度动态计算
export const useRem = () => {
  // 定义最大值
  const MAX_REM = 40
  // 在页面html加载完成时
  document.addEventListener('DOMContentLoaded', () => {
    // 获取html
    const html = document.querySelector('html')
    // 计算
    let fontSize = window.innerWidth / 10
    fontSize = fontSize > MAX_REM ? MAX_REM : fontSize
    // 赋值给html
    html.style.fontSize = fontSize + 'px'
  })
}
