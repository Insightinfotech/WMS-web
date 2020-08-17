import request from "../../index"
import store from "@/store"
export default class Reservoir {
  static getReservoirList({
    pageNum,
    size,
    code,
    name,
    warehouseId
  }) {
    return request({
      url: "/reservoir/list",
      method: "GET",
      params: {
        pageNum,
        size,
        code,
        name,
        warehouseId
      }
    }, {
      token: store.getters.userToken
    })
  }
  static reservoirAdd({
    code,
    name,
    acreage,
    remark,
    warehouseId,
    categoryId
  }) {
    return request({
      url: "/reservoir/create",
      method: "POST",
      data: {
        code,
        name,
        acreage,
        remark,
        warehouseId,
        categoryId
      }
    }, {
      token: store.getters.userToken
    })
  }
  static reservoirIdDelete(id) {
    return request({
      url: ``,
      methid: "DELETE"
    }, {
      token: store.getters.userToken
    })
  }
  static reservoirAddEdit({
    id,
    code,
    name,
    acreage,
    remark,
    warehouseId,
    categoryId
  }) {
    return request({
      url: "/reservoir/update",
      method: "PUT",
      data: {
        id,
        code,
        name,
        acreage,
        remark,
        warehouseId,
        categoryId
      }
    }, {
      token: store.getters.userToken
    })
  }
}
