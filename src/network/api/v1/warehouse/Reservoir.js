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
  static reservoirIdDelete(rid) {
    return request({
      url: `/reservoir/delete/${rid}`,
      method: "DELETE"
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
  static getReservoirById(rid) {
    return request({
      url: `/reservoir/getReservoirById/${rid}`,
      method: "GET"
    }, {
      token: store.getters.userToken
    })
  }
  static showShelves(rid) {
    return request({
      url: `/reservoir/showShelves/${rid}`,
      method: "GET"
    }, {
      token: store.getters.userToken
    })
  }
  static optionShelves(wid, rid) {
    return request({
      url: `/reservoir/optionShelves/add/${wid}/${rid}`,
      method: "PUT"
    }, {
      token: store.getters.userToken
    })
  }
  static optionShelvesDelete(wid, rid) {
    return request({
      url: `/reservoir/optionShelves/delete/${wid}/${rid}`,
      method: "DELETE"
    }, {
      token: store.getters.userToken
    })
  }
}
