import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path, { join } from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // 正定symbolID格式
      symbolId: 'icon-[name]'
    })
  ],
  resolve: {
    alias: {
      '@': join(__dirname, '/src')
    }
  },
  server: {
    // 配置代理
    proxy: {
      '/api': {
        target: 'https://api.imooc-front.lgdsunday.club', //目标地址
        changeOrigin: true //语设置跨域
      }
    }
  }
})
