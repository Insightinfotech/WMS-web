import request from "../../index"
import store from "@/store"
export default class Picking {
  static PickingList({
    pageNum,
    size,
    status,
    startTime,
    endTime

  }) {
    return request({
      url: "/picking/list",
      method: "GET",
      params: {
        pageNum,
        size,
        status,
        startTime,
        endTime
      }
    }, {
      token: store.getters.userToken
    })
  }
  static PickingListCreate({
    code,
    stockOutCodes
  }) {
    return request({
      url: "/picking/create",
      method: "POST",
      data: {
        code,
        stockOutCodes
      }
    }, {
      token: store.getters.userToken
    })
  }
  static PickingupdateStatus({
    id,
    status
  }) {
    return request({
      url: "/picking/updateStatus",
      method: "PUT",
      params: {
        id,
        status
      }
    }, {
      token: store.getters.userToken,
      "Content-Type": "x-www-form-urlencoded"
    })
  }
  static PickingListDelete(
    id
  ) {
    return request({
      url: `/picking/delete/${id}`,
      method: "DELETE",
    }, {
      token: store.getters.userToken
    })
  }
  static PickingselectStockOutCodes(
    id
  ) {
    return request({
      url: `/picking/selectStockOutCodes/${id}`,
      method: "GET",
    }, {
      token: store.getters.userToken
    })
  }
  static PickingselectStockOutCodesId(
    id
  ) {
    return request({
      url: `/picking/selectById/${id}`,
      method: "GET",
    }, {
      token: store.getters.userToken
    })
  }
}
