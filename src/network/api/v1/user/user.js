 import request from "../../index"
 import store from "@/store"
 export default class user {
   /**
    *登录
    *
    * @static
    * @param {*} {
    *      username,
    *      password
    *    }
    * @returns
    * @memberof user
    */
   static login({
     username,
     password
   }) {
     return request({
       url: "/auth/login",
       method: "POST",
       data: {
         username,
         password
       }
     }, {
       token: store.getters.qiyeToken == null ? "" : store.getters.qiyeToken
     })
   }
   static businessRegistration({
     name,
     password,
     phone,
     content,
     code
   }) {
     return request({
       url: "/organization/create",
       method: "POST",
       params: {
         name,
         password,
         phone,
         content,
         code
       }
     }, {
       "Content-Type": "x-www-form-urlencoded"
     })
   }
   static enterpriseLogin({
     name,
     password
   }) {
     return request({
       url: "/auth/organizationLogin",
       method: "POST",
       params: {
         name,
         password
       }
     }, {
       "Content-Type": "x-www-form-urlencoded"
     })
   }
   static adminLogin({
     username,
     password
   }) {
     return request({
       url: "/auth/manageLogin",
       method: "POST",
       params: {
         username,
         password
       }
     }, {
       "Content-Type": "x-www-form-urlencoded"
     })
   }

   static adminLoginToken() {
     return request({
       url: "/auth/check",
       method: "POST",

     }, {
       admintoken: store.getters.adminToken
     })
   }
   static adminGetList({
     pageNum,
     size,
     name,
     isCheck
   }) {
     return request({
       url: "/organization/list",
       method: "GET",
       params: {
         pageNum,
         size,
         name,
         isCheck
       }
     }, {
       admintoken: store.getters.adminToken
     })
   }
   static adminIsCheck({
     id,
     isCheck
   }) {
     return request({
       url: "/organization/updateCheck",
       method: "PUT",
       params: {
         id,
         isCheck
       }
     }, {
       "Content-Type": "x-www-form-urlencoded",
       admintoken: store.getters.adminToken
     })
   }
   static businessRegistrationPhone({
     phone
   }) {
     return request({
       url: "/organization/verifyCode",
       method: "GET",
       params: {
         phone
       }
     })
   }
 }
