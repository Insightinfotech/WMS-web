import request from "../../index"
import store from "@/store"
export default class Outbound {
  static OutboundList({
    pageNum,
    size,
    code,
    type,
    status,
    companyId
  }) {
    return request({
      url: "/stockOut/list",
      method: "GET",
      params: {
        pageNum,
        size,
        code,
        type,
        status,
        companyId
      }
    }, {
      token: store.getters.userToken
    })
  }
  static OutboundAdd({
    code,
    type,
    companyId,
    gestore,
    remark,
  }) {
    return request({
      url: "/stockOut/create",
      method: "POST",
      data: {
        code,
        type,
        companyId,
        gestore,
        remark,
      }
    }, {
      token: store.getters.userToken
    })
  }
  static OutboundListDelete(
    id
  ) {
    return request({
      url: `/stockOut/delete/${id}`,
      method: "DELETE",
    }, {
      token: store.getters.userToken
    })
  }
  static OutboundListEdit(
    id
  ) {
    return request({
      url: `/stockOut/selectStockOutById/${id}`,
      method: "GET",
    }, {
      token: store.getters.userToken
    })
  }
  static OutboundAddDeit({
    id,
    code,
    type,
    companyId,
    gestore,
    remark,
  }) {
    return request({
      url: "/stockOut/update",
      method: "PUT",
      data: {
        id,
        code,
        type,
        companyId,
        gestore,
        remark,
      }
    }, {
      token: store.getters.userToken
    })
  }
  static OutboundupdateStatus({
    id,
    status,
    overruledRemark,
    logisticsName,
    logisticsNumber
  }) {
    return request({
      url: "/stockOut/updateStatus",
      method: "PUT",
      params: {
        id,
        status,
        overruledRemark,
        logisticsName,
        logisticsNumber
      }
    }, {
      token: store.getters.userToken,
      "Content-Type": "x-www-form-urlencoded"
    })
  }
  // ===========================
  static stockOutDetailList(
    id
  ) {
    return request({
      url: `/stockOutDetail/selectByStockOut/${id}`,
      method: "GET",
    }, {
      token: store.getters.userToken
    })
  }
  static stockOutDetailCreate({
    stockOutId,
    skuId,
    estimatedQuantity,
    categoryId
  }) {
    return request({
      url: "/stockOutDetail/create",
      method: "POST",
      data: {
        stockOutId,
        skuId,
        estimatedQuantity,
        categoryId
      }
    }, {
      token: store.getters.userToken
    })
  }
  static stockOutDetailUpdate({
    id,
    stockOutId,
    skuId,
    estimatedQuantity,
    categoryId
  }) {
    return request({
      url: "/stockOutDetail/update",
      method: "PUT",
      data: {
        id,
        stockOutId,
        skuId,
        estimatedQuantity,
        categoryId
      }
    }, {
      token: store.getters.userToken
    })
  }
  static stockOutDetailListId(
    id
  ) {
    return request({
      url: `/stockOutDetail/selectStockOutDetailById/${id}`,
      method: "GET",
    }, {
      token: store.getters.userToken
    })
  }
  static stockOutDetailListIdDelete(
    id
  ) {
    return request({
      url: `/stockOutDetail/delete/${id}`,
      method: "DELETE",
    }, {
      token: store.getters.userToken
    })
  }
  static OutboundstockOutLogList({
    pageNum,
    size,
    stockOutCode,
    stockOutType,
    sku,
    gestore,
    startTime,
    endTime
  }) {
    return request({
      url: "/stockOut/stockOutLog",
      method: "GET",
      params: {
        pageNum,
        size,
        stockOutCode,
        stockOutType,
        sku,
        gestore,
        startTime,
        endTime
      }
    }, {
      token: store.getters.userToken
    })
  }
}
