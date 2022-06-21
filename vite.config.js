import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { join } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
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
