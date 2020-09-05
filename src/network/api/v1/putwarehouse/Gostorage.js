import request from "../../index"
import store from "@/store"
export default class Gostorage {
  static gostorageList({
    pageNum,
    size,
    code,
    type,
    status
  }) {
    return request({
      url: "/stockIn/list",
      method: "GET",
      params: {
        pageNum,
        size,
        code,
        status,
        type
      }
    }, {
      token: store.getters.userToken
    })
  }
  static gostorageAddList({
    purchaseCode,
    code,
    type,
    gestore,
    remark
  }) {
    return request({
      url: "/stockIn/create",
      method: "POST",
      data: {
        purchaseCode,
        code,
        type,
        gestore,
        remark
      }
    }, {
      token: store.getters.userToken
    })
  }
  static gostorageUpdateStatus({
    id,
    status,
    overruledRemark
  }) {
    return request({
      url: "/stockIn/updateStatus",
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
  static gostorageDelete(id) {
    return request({
      url: `/stockIn/delete/${id}`,
      method: "DELETE"
    }, {
      token: store.getters.userToken
    })
  }
  static gostorageEditId(id) {
    return request({
      url: `/stockIn/selectStockInById/${id}`,
      method: "GET"
    }, {
      token: store.getters.userToken
    })
  }
  static gostorageAddListEdit({
    id,
    purchaseCode,
    code,
    type,
    gestore,
    remark
  }) {
    return request({
      url: "/stockIn/update",
      method: "PUT",
      data: {
        id,
        purchaseCode,
        code,
        type,
        gestore,
        remark
      }
    }, {
      token: store.getters.userToken
    })
  }
  static gostoragekinId(stockInId) {
    return request({
      url: `/stockInDetail/selectByStockIn/${stockInId}`,
      method: "GET"
    }, {
      token: store.getters.userToken
    })
  }
  static stockInDetailAdd({
    stockInId,
    skuId,
    companyId,
    categoryId,
    warehouseId,
    reservoirId,
    shelvesId,
    layer,
    quantity
  }) {
    return request({
      url: "/stockInDetail/create",
      method: "POST",
      data: {
        stockInId,
        skuId,
        companyId,
        categoryId,
        warehouseId,
        reservoirId,
        shelvesId,
        layer,
        quantity
      }
    }, {
      token: store.getters.userToken
    })
  }
  static gostorageDetailDelete(id) {
    return request({
      url: `/stockInDetail/delete/${id}`,
      method: "DELETE"
    }, {
      token: store.getters.userToken
    })
  }
  static gostorageDetailEditId(id) {
    return request({
      url: `/stockInDetail/selectById/${id}`,
      method: "GET"
    }, {
      token: store.getters.userToken
    })
  }
  static stockInDetailAddEdit({
    id,
    stockInId,
    skuId,
    companyId,
    categoryId,
    warehouseId,
    reservoirId,
    shelvesId,
    layer,
    quantity
  }) {
    return request({
      url: "/stockInDetail/update",
      method: "PUT",
      data: {
        id,
        stockInId,
        skuId,
        companyId,
        categoryId,
        warehouseId,
        reservoirId,
        shelvesId,
        layer,
        quantity
      }
    }, {
      token: store.getters.userToken
    })
  }
}
