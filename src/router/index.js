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
        path: "/home/system/about",
        component: () => import("../views/system/Message")
      },
      {
        path: "/home/system/warning",
        component: () => import("../views/system/Warning")
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
      },
      {
        path: "/home/putwarehouse/picking",
        component: () => import("../views/putwarehouse/Picking")
      },
      {
        path: "/home/putwarehouse/shifting",
        component: () => import("../views/putwarehouse/Shifting")
      },
      {
        path: "/home/putwarehouse/check",
        component: () => import("../views/putwarehouse/Check")
      },
      {
        path: "/home/logit/log",
        component: () => import("../views/logit/Log")
      },
      {
        path: "/home/putwarehouse/records",
        component: () => import("../views/putwarehouse/Records")
      },
      {
        path: "/home/putwarehouse/delivery",
        component: () => import("../views/putwarehouse/Delivery")
      },
      {
        path: "/home/system/personage",
        component: () => import("../views/system/Personage")
      },
      {
        path: "/home/statement/statementlist",
        component: () => import("../views/statement/Statementlist")
      },
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue")
  },
  {
    path: "/register",
    component: () => import('../views/Register')
  },
  {
    path: "/enterpriselogin",
    component: () => import("../views/RegisterUser.vue")
  },
  {
    path: "/adminlogin",
    component: () => import("../views/Admin.vue")
  },
  {
    path: "/adminlist",
    component: () => import("../views/admin/AdminList")
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if (to.path == "/login" || to.path == "/register" || to.path == "/enterpriselogin" || to.path == "/adminlogin" || to.path == "/adminlist") {
    return next()
  }


  let token = sessionStorage.getItem("token")

  if (!token) {
    return next("/login")
  }

  next()
})
export default router
