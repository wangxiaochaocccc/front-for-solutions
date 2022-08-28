import { watch } from 'vue'
import store from '../store'
import { THEME_LIGHT, THEME_DARK, THEME_SYSTEM } from '@/constant'

/**
 * 跟随主题
 */
let matchMedia
const watchThemeChange = () => {
  // 仅需一次初始化
  if (matchMedia) return
  matchMedia = window.matchMedia('(prefers-color-scheme:dark)')
  // 监听变更
  matchMedia.onchange = () => {
    changeTheme(THEME_SYSTEM)
  }
}
/**
 * 主题变更方法
*/
const changeTheme = (theme) => {
  let calssName = ''
  switch (theme) {
    case THEME_DARK:
      calssName = 'dark'
      break
    case THEME_LIGHT:
      calssName = 'light'
      break
    case THEME_SYSTEM:
      // 监听系统主题变化
      watchThemeChange()
      calssName = matchMedia.matches ? 'dark' : 'light'
      break
  }
  document.querySelector('html').className = calssName
}
export default () => {
  // 监听主题
  watch(() => store.getters.themeType, changeTheme, {
    immediate: true
  })
}