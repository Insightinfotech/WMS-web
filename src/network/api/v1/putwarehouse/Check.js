import request from "../../index"
import store from "@/store"
export default class Check {
  static checkList({
    pageNum,
    size,
    code,
    status,
    startTime,
    endTime
  }) {
    return request({
      url: "/stockTaking/list",
      method: "GET",
      params: {
        pageNum,
        size,
        code,
        status,
        startTime,
        endTime
      }
    }, {
      token: store.getters.userToken
    })
  }
  static checkstockTakingAdd({
    code,
    remark,
    stockTakingRegions
  }) {
    return request({
      url: "/stockTaking/create",
      method: "POST",
      data: {
        code,
        remark,
        stockTakingRegions
      }
    }, {
      token: store.getters.userToken
    })
  }
  static checkstockTakingAddDelete(id) {
    return request({
      url: `/stockTaking/delete/${id}`,
      method: "DELETE"
    }, {
      token: store.getters.userToken
    })
  }
  static checkstockTakingAddEdit({
    id,
    code,
    remark,
    stockTakingRegions
  }) {
    return request({
      url: "/stockTaking/update",
      method: "PUT",
      data: {
        id,
        code,
        remark,
        stockTakingRegions
      }
    }, {
      token: store.getters.userToken
    })
  }
  static checkstockTakingAddId(id) {
    return request({
      url: `/stockTaking/selectById/${id}`,
      method: "GET"
    }, {
      token: store.getters.userToken
    })
  }
  static checkstockupdateStatus({
    id,
    status,
    overruledRemark
  }) {
    return request({
      url: `/stockTaking/updateStatus`,
      method: "PUT",
      params: {
        id,
        status,
        overruledRemark
      }
    }, {
      token: store.getters.userToken,
      "Content-Type": "x-www-form-urlencoded"
    })
  }
  static checkstockDescId(id) {
    return request({
      url: `/stockTakingObject/selectByStockTaking/${id}`,
      method: "GET"
    }, {
      token: store.getters.userToken
    })
  }
  static checkstockDescsave({
    stockTakingRegionVOS
  }) {
    return request({
      url: `/stockTakingObject/save`,
      method: "PUT",
      data: {
        stockTakingRegionVOS
      }
    }, {
      token: store.getters.userToken
    })
  }
}
