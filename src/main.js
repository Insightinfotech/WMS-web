import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Print from "vue-print-nb"
import echarts from "echarts"
import "normalize.css"
import "./assets/css/global.scss"
import "./plugins/element.js"

import VueParticles from 'vue-particles'
import networkPlugin from "plugins/NetworkPlugin"
Vue.use(networkPlugin)
Vue.use(VueParticles)
Vue.use(Print)
Vue.prototype.$echarts = echarts
// 全局时间过滤器
Vue.filter('dateTimeFormat', (val) => {
  const date = new Date(val)
  return date.toLocaleString() || "非法日期"
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
