import { defineAsyncComponent } from 'vue'
export { confirm } from './confirm'

export default {
  install (app) {
    // 获取当前路径下任意文件夹的index.vue
    const components = import.meta.glob('./*/index.vue')
    // 遍历所有组件模块
    for (let comp of Object.entries(components)) {
      // 注册组件
      let fullPathName = 'm-' + comp[0].replace('./', '').split('/')[0]
      console.log(fullPathName)
      app.component(fullPathName, defineAsyncComponent(comp[1]))
    }
  }
}
