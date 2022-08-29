export default {
  install (app) {
    const directives = import.meta.globEager('./modules/*.js')
    for (let [key, value] of Object.entries(directives)) {
      const nameArr = key.split('/')
      const name = nameArr[nameArr.length - 1].replace('.js', '')
      app.directive(name, value.default)
    }
  }
}