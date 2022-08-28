import { watch } from 'vue'
import store from '../store'
import { THEME_LIGHT, THEME_DARK } from '@/constant'

export default () => {
  // 监听主题
  watch(() => store.getters.themeType, (val) => {
    let calssName = ''
    switch (val) {
      case THEME_DARK:
        calssName = 'dark'
        break
      case THEME_LIGHT:
        calssName = 'light'
        break
    }
    document.querySelector('html').className = calssName
  }, {
    immediate: true
  })
}