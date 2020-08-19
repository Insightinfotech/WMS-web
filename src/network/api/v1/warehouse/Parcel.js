import request from "../../index"
import store from "@/store"
export default class Parcel {
  static parcelList({
    pageNum,
    size,
    code,
    name,
    warehouseId,
    reservoirId
  }) {
    return request({
      url: "/shelves/list",
      method: "GET",
      params: {
        pageNum,
        size,
        code,
        name,
        warehouseId,
        reservoirId
      }
    }, {
      token: store.getters.userToken
    })
  }
  static parcelUserAdd({
    code,
    name,
    layer,
    remark,
    warehouseId,
    reservoirId
  }) {
    return request({
      url: "/shelves/create",
      method: "POST",
      data: {
        code,
        name,
        layer,
        remark,
        warehouseId,
        reservoirId
      }
    }, {
      token: store.getters.userToken
    })
  }
  static parcelUserEdit({
    id,
    code,
    name,
    layer,
    remark,
    warehouseId,
    reservoirId
  }) {
    return request({
      url: "/shelves/update",
      method: "PUT",
      data: {
        id,
        code,
        name,
        layer,
        remark,
        warehouseId,
        reservoirId
      }
    }, {
      token: store.getters.userToken
    })
  }
  static getShelvesById(sid) {
    return request({
      url: `/shelves/getShelvesById/${sid}`,
      method: "GET"
    }, {
      token: store.getters.userToken
    })
  }
  static shelvesDelete(sid) {
    return request({
      url: `/shelves/delete/${sid}`,
      method: "DELETE"
    }, {
      token: store.getters.userToken
    })
  }
}
