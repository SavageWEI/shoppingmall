import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

Vue.use(ElementUI)

new Vue({
  router,
  store,
  // ElementUI,
  render: h => h(App)
}).$mount('#app')
