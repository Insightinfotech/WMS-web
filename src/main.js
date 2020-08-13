import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "normalize.css"
import "./assets/css/global.scss"
import "./plugins/element.js"
import VueParticles from 'vue-particles'
import networkPlugin from "plugins/NetworkPlugin"
Vue.use(networkPlugin)
Vue.use(VueParticles)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
