import request from "../../index"
import store from "@/store"
export default class Warning {
  /**
   *产品预警列表
   *
   * @static
   * @param {*} {
   *     pageNum,
   *     size,
   *     skuName
   *   }
   * @returns
   * @memberof Warning
   */
  static getListData({
    pageNum,
    size,
    skuName
  }) {
    return request({
      url: "/alert/list",
      method: "GET",
      params: {
        pageNum,
        size,
        skuName
      }
    }, {
      token: store.getters.userToken
    })
  }
  static getSkuListData() {
    return request({
      url: "/skuType/getTypeAndSku",
      method: "GET"
    }, {
      token: store.getters.userToken
    })
  }
  static createSkuList({
    skuId,
    alertNum
  }) {
    return request({
      url: "/alert/create",
      method: "POST",
      data: {
        skuId,
        alertNum
      }
    }, {
      token: store.getters.userToken
    })
  }
  static deleteSkuListId(id) {
    return request({
      url: `/alert/delete/${id}`,
      method: "DELETE",
    }, {
      token: store.getters.userToken
    })
  }
  static createSkuListEchoId(id) {
    return request({
      url: `/alert/selectById/${id}`,
      method: "GET",

    }, {
      token: store.getters.userToken
    })
  }
  static createSkuListEchoAdd({
    id,
    alertNum
  }) {
    return request({
      url: "/alert/update",
      method: "PUT",
      data: {
        id,
        alertNum
      }
    }, {
      token: store.getters.userToken
    })
  }
  static getAdminListData() {
    return request({
      url: "/role/list",
      method: "GET",
    }, {
      token: store.getters.userToken
    })
  }
  static getAdminListDataRoles({
    roleIds
  }) {

    return request({
      url: "/role/operationAlertRoles",
      method: "POST",
      params: {
        roleIds
      }
    }, {
      token: store.getters.userToken,
      "Content-Type": "x-www-form-urlencoded"
    })
  }
}
