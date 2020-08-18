import request from "../../index"
import store from "@/store"
export default class Management {
  static getManagementList({
    pageNum,
    size,
    code,
    name,
    manager
  }) {
    return request({
      url: "/warehouse/list",
      method: "GET",
      params: {
        pageNum,
        size,
        code,
        name,
        manager
      }
    }, {
      token: store.getters.userToken
    })
  }
  static managementAdd({
    code,
    name,
    acreage,
    manager,
    phone,
    address,
    remark,
    categoryId
  }) {
    return request({
      url: "/warehouse/create",
      method: "POST",
      data: {
        code,
        name,
        acreage,
        manager,
        phone,
        address,
        remark,
        categoryId
      }
    }, {
      token: store.getters.userToken
    })
  }
  static managementDelete(wid) {
    return request({
      url: `/warehouse/delete/${wid}`,
      method: "DELETE"
    }, {
      token: store.getters.userToken
    })
  }
  static managementAddEdit(id) {
    return request({
      url: `/warehouse/getWarehouseById/${id}`,
      method: "GET"
    }, {
      token: store.getters.userToken
    })
  }
  static managementAddEditPut({
    id,
    code,
    name,
    acreage,
    manager,
    phone,
    address,
    remark,
    categoryId
  }) {
    return request({
      url: "/warehouse/update",
      method: "PUT",
      data: {
        id,
        code,
        name,
        acreage,
        manager,
        phone,
        address,
        remark,
        categoryId
      }
    }, {
      token: store.getters.userToken
    })
  }
  static showReservoirs(wid) {
    return request({
      url: `/warehouse/showReservoirs/${wid}`,
      method: "GET"
    }, {
      token: store.getters.userToken
    })
  }
  static optionReservoirsAdd(wid, rid) {
    return request({
      url: `/warehouse/optionReservoirs/add/${wid}/${rid}`,
      method: "PUT"
    }, {
      token: store.getters.userToken
    })
  }
  static optionReservoirsDelete(wid, rid) {
    return request({
      url: `/warehouse/optionReservoirs/delete/${wid}/${rid}`,
      method: "DELETE"
    }, {
      token: store.getters.userToken
    })
  }
}
