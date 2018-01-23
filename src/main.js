// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import AyncComputed from 'vue-async-computed'
import VeeValidate from 'vee-validate'
import App from './App'
import router from './router'
import store from './store'
import Config from 'framework/config'
// import './scripts/sockets'

Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(AyncComputed)
Vue.use(VeeValidate)

// initialize config
Config.default({
  isLocal: false,
  isProduction: true
}).environment(/ryandev/, {
  isProduction: false
}).environment(/localhost/, {
  isLocal: true,
  isProduction: false
}).detect()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})

if (Config.get('isLocal')) {
  // make the global store available on the window for local development
  window.STORE = store
}
