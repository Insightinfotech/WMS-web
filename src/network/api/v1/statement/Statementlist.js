import request from "../../index"
import store from "@/store"
export default class Statementlist {
  static getStatementlist({
    year
  }) {
    return request({
      url: "/report/purchaseAmount",
      method: "GET",
      params: {
        year
      }
    }, {
      token: store.getters.userToken
    })
  }
}
