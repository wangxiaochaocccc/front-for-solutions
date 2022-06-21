import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import './styles/index.scss'
import { useRem } from '@/utils/flexble'

useRem()
createApp(App).use(router).mount('#app')
