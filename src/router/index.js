import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
    path: "/",
    redirect: "/login"
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [{
      path: "/home/system/roles",
      component: () => import("../views/system/Roles")
    }]
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue")
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if (to.path == "/login") return next()
  let token = sessionStorage.getItem("token")
  if (!token) return next("/login")
  next()
})
export default router
