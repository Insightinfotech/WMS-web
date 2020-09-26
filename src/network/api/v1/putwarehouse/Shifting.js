import request from "../../index"
import store from "@/store"
export default class Shifting {
  static shiftingList({
    pageNum,
    size,
    code,
    status,
    startTime,
    endTime
  }) {
    return request({
      url: "/move/list",
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
  static shiftingupdateStatus({
    id,
    status,
    overruledRemark
  }) {
    return request({
      url: "/move/updateStatus",
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
  static shiftingAdd({
    code,
    sourceWarehouseId,
    sourceReservoirId,
    sourceShelvesId,
    sourceLayer,
    targetWarehouseId,
    targetReservoirId,
    targetShelvesId,
    targetLayer,
    remark
  }) {
    return request({
      url: "/move/create",
      method: "POST",
      data: {
        code,
        sourceWarehouseId,
        sourceReservoirId,
        sourceShelvesId,
        sourceLayer,
        targetWarehouseId,
        targetReservoirId,
        targetShelvesId,
        targetLayer,
        remark
      }
    }, {
      token: store.getters.userToken,
    })
  }
  static shiftingDeleteId(id) {
    return request({
      url: `/move/delete/${id}`,
      method: "DELETE",
    }, {
      token: store.getters.userToken,
    })
  }
  static shiftingselectById(id) {
    return request({
      url: `/move/selectById/${id}`,
      method: "GET",
    }, {
      token: store.getters.userToken,
    })
  }
  static shiftingAddUpdate({
    id,
    code,
    sourceWarehouseId,
    sourceReservoirId,
    sourceShelvesId,
    sourceLayer,
    targetWarehouseId,
    targetReservoirId,
    targetShelvesId,
    targetLayer,
    remark
  }) {
    return request({
      url: "/move/update",
      method: "PUT",
      data: {
        id,
        code,
        sourceWarehouseId,
        sourceReservoirId,
        sourceShelvesId,
        sourceLayer,
        targetWarehouseId,
        targetReservoirId,
        targetShelvesId,
        targetLayer,
        remark
      }
    }, {
      token: store.getters.userToken,
    })
  }
  static shiftingselectUsableInventory(id) {
    return request({
      url: `/moveDetail/selectUsableInventory/${id}`,
      method: "GET",
    }, {
      token: store.getters.userToken,
    })
  }
  static shiftingselectByMove(id) {
    return request({
      url: `/moveDetail/selectByMove/${id}`,
      method: "GET",
    }, {
      token: store.getters.userToken,
    })
  }
  static shiftingSkuAdd({
    moveId,
    skuId,
    quantity,
    categoryId
  }) {
    return request({
      url: "/moveDetail/create",
      method: "POST",
      data: {
        moveId,
        skuId,
        quantity,
        categoryId
      }
    }, {
      token: store.getters.userToken,
    })
  }
  static shiftingDeleteSkuId(id) {
    return request({
      url: `/moveDetail/delete/${id}`,
      method: "DELETE",
    }, {
      token: store.getters.userToken,
    })
  }
}
