import { useIntersectionObserver } from '@vueuse/core'

export default {
  mounted (el) {
    // 临时存储src
    const curSrc = el.src
    // 清空src
    el.src = ''
    // 监听是否可见
    const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        el.src = curSrc
        stop()
      }
    })
  }
}