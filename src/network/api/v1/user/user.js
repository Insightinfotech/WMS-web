 import request from "../../index"

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
     })
   }
 }
