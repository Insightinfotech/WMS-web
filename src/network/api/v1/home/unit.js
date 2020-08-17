import request from "../../index"
import store from "@/store"
export default class Unit {
  static getCaterogyList({
    pageNum,
    size
  }) {
    return request({
      url: "/category/list",
      method: "GET",
      params: {
        pageNum,
        size
      }
    }, {
      token: store.getters.userToken
    })
  }
  static unitUserDelete(cid) {
    return request({
      url: `/category/delete/${cid}`,
      method: "DELETE"
    }, {
      token: store.getters.userToken
    })
  }
  static addUserUnit({
    name,
    categoryTypeId,
    remark

  }) {
    return request({
      url: "/category/create",
      method: "POST",
      data: {
        name,
        categoryTypeId,
        remark
      }
    }, {
      token: store.getters.userToken
    })
  }
  static unitTypeList({
    pageNum,
    size
  }) {
    return request({
      url: "/categoryType/list",
      method: "GET",
      params: {
        pageNum,
        size
      }
    }, {
      token: store.getters.userToken
    })
  }
  static unitTypeadd({
    name
  }) {
    return request({
      url: "/categoryType/create",
      method: "POST",
      data: {
        name
      }
    }, {
      token: store.getters.userToken
    })
  }
  static unitTypeDelete(cid) {
    return request({
      url: `/categoryType/delete/${cid}`,
      method: "DELETE"
    }, {
      token: store.getters.userToken
    })
  }
  static unitSearchName({
    pageNum,
    size,
    categoryTypeId,
    name
  }) {
    return request({
      url: "/category/list",
      method: "GET",
      params: {
        pageNum,
        size,
        categoryTypeId,
        name
      }
    }, {
      token: store.getters.userToken
    })
  }

  static unitTypeEdit({
    id,
    name
  }) {
    return request({
      url: "/categoryType/update",
      method: "PUT",
      data: {
        id,
        name
      }
    }, {
      token: store.getters.userToken
    })
  }
  static unitUserAddEdit({
    id,
    name,
    categoryTypeId,
    remark
  }) {
    return request({
      url: "/category/update",
      method: "PUT",
      data: {
        id,
        name,
        categoryTypeId,
        remark
      }
    }, {
      token: store.getters.userToken
    })
  }
}
