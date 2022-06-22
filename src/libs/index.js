import SvgIcon from './SvgIcon/index.vue'
import popup from './popup/index.vue'
export default {
  install(app) {
    app.component('svg-icon', SvgIcon)
    app.component('m-popup', popup)
  }
}
