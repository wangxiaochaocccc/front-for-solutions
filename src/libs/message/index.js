import { render, h } from 'vue'
import messageComponent from './index.vue'

/**
 * @description: 
 * @param {*} type success warn error
 * @param {*} content 描述文本
 * @param {*} duration 持续时长（ms） 默认3000
 * @return {*}
 */
export const message = (type, content, duration = 3000) => {

  // 关闭
  const onDestroy = () => {
    render(null, document.body)
  }
  // 生成vnode
  const vnode = h(messageComponent, {
    duration,
    content,
    type,
    destroy: onDestroy
  })
  // render
  render(vnode, document.body)
}