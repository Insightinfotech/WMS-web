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
      },
      {
        path: "/home/system/unit",
        component: () => import("../views/system/Unit")
      },
      {
        path: "/home/warehouse/management",
        component: () => import("../views/warehouse/Management")
      },
      {
        path: "/home/warehouse/reservoir",
        component: () => import("../views/warehouse/Reservoir")
      },
      {
        path: "/home/warehouse/parcel",
        component: () => import("../views/warehouse/Parcel")
      },
      {
        path: "/home/basic/material",
        component: () => import("../views/basic/Material")
      },
      {
        path: "/home/basic/product",
        component: () => import("../views/basic/Product")
      },
      {
        path: "/home/basic/partner",
        component: () => import("../views/basic/Partner")
      },
      {
        path: "/home/putwarehouse/inventory",
        component: () => import("../views/putwarehouse/Inventory")
      },
      {
        path: "/home/putwarehouse/orderlist",
        component: () => import("../views/putwarehouse/Orderlist")
      },
      {
        path: "/home/putwarehouse/procurement",
        component: () => import("../views/putwarehouse/Procurement")
      },
      {
        path: "/home/putwarehouse/gostorage",
        component: () => import("../views/putwarehouse/Gostorage")
      },
      {
        path: "/home/putwarehouse/outbound",
        component: () => import("../views/putwarehouse/Outbound")
      }
    ]
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
// router.beforeEach((to, from, next) => {
//   if (to.path == "/login") return next()
//   let token = sessionStorage.getItem("token")
//   if (!token) return next("/login")
//   next()
// })
export default router
