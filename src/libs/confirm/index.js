import { h, render } from 'vue'
import ConfirmComponent from './index.vue'
/**
 * @description: 展示confirm 如果用户值传递一个参数，那么这个参数作为content
 * @param {*} title 标题（如果没有传递内容，那么标题作为内容）
 * @param {*} content 内容(如果没有title,content会作为第一个参数被传入)
 * @param {*} cancelText 取消按钮文案
 * @param {*} sureText 确定按钮文案
 * @return {*}
 */
export const confirm = (title, content, cancelText, sureText) => {
  return new Promise((resolve, reject) => {
    // 参数处理
    if (title && !content) {
      content = title
      title = ''
    }
    // 关闭弹层
    const close = () => {
      render(null, document.body)
    }
    // 确认按钮时间
    const confirmHandle = () => {
      resolve()
    }
    // 取消按钮事件
    const cancelHandle = () => {
      reject(new Error('点击了取消按钮'))
    }
    // 生成vnode
    const vnode = h(ConfirmComponent, {
      title,
      content,
      cancelText,
      sureText,
      cancelHandle,
      confirmHandle,
      close,
    })
    // render
    render(vnode, document.body)
  })
}