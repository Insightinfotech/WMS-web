import Vue from 'vue'
import Vuex from 'vuex'
import {
  Loading
} from 'element-ui'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 定义加载值
    apiCount: 0,
    //实例
    loadingInstance: null,
    // 用户token
    token: JSON.parse(sessionStorage.getItem("token")),
    username: JSON.parse(sessionStorage.getItem("username")),
    qiyeToken: JSON.parse(sessionStorage.getItem("qiyeToken")),
    admintoken:JSON.parse(sessionStorage.getItem("admintoken"))
  },
  mutations: {
    // 用户token
    startuserToken(state, token) {
      state.token = token
      sessionStorage.setItem("token", JSON.stringify(token))
    },
    getuser(state, username) {
      state.username = username
      sessionStorage.setItem("username", JSON.stringify(username))

    },
    // 企业token
    startuserqiyeToken(state, token) {
      state.qiyeToken = token
      sessionStorage.setItem("qiyeToken", JSON.stringify(token))
    },
    // admin token
    startuserqiyeadminToken(state, token) {
      state.admintoken = token
      sessionStorage.setItem("admintoken", JSON.stringify(token))
    },
    clearToken(state) {
      state.token = ""
      state.username = ""
    },
    // 打开loading
    startLoading(state, msg) {
      state.loadingInstance = Loading.service({
        lock: true,
        text: msg ? msg : "请求中...",
        background: "rgba(0,0,0,0.7)"
      })
    },
    // 关闭loading
    closeLoading(state) {
      state.loadingInstance.close()
    },
    // 跟新loading
    updateApiCount(state, handle) {
      if (handle == "add") {
        state.apiCount++
        this.commit("startLoading", )
      } else {
        state.apiCount--
        if (state.apiCount <= 0) {
          this.commit("closeLoading")
        }
      }
    }
  },
  actions: {},
  modules: {},
  getters: {
    userToken(state) {
      return state.token
    },
    qiyeToken(state) {
      return state.qiyeToken
    },
    adminToken(state) {
      return state.admintoken
    }
  }
})
