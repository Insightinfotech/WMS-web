import request from "../../index"
import store from "@/store"
export default class Log {
  static logList({
    pageNum,
    size,
    username,
    keyWork,
    startTime,
    endTime
  }) {
    return request({
      url: "/operateLog/list",
      method: "GET",
      params: {
        pageNum,
        size,
        username,
        keyWork,
        startTime,
        endTime
      }
    }, {
      token: store.getters.userToken
    })
  }
}
