import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from './store'
import './styles/index.scss'
import { useRem } from '@/utils/flexble'
import MyLibs from './libs/index'
import 'virtual:svg-icons-register'

useRem() //动态计算fontsize
createApp(App).use(router).use(store).use(MyLibs).mount('#app')
