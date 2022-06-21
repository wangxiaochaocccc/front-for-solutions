import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import './styles/index.scss'
import { useRem } from '@/utils/flexble'
import MyLibs from './libs/index'

useRem() //动态计算fontsize
createApp(App).use(router).use(MyLibs).mount('#app')
