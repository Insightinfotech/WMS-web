import request from "../../index"
import store from "@/store"
export default class Procurement {
  static procurementList({
    pageNum,
    size,
    code,
    status
  }) {
    return request({
      url: "/purchase/list",
      method: "GET",
      params: {
        pageNum,
        size,
        code,
        status
      }
    }, {
      token: store.getters.userToken
    })
  }
  static procurementAdd({
    code,
    gestore,
    remark
  }) {
    return request({
      url: "/purchase/create",
      method: "POST",
      data: {
        code,
        gestore,
        remark
      }
    }, {
      token: store.getters.userToken
    })
  }
  static procurementEditId(id) {
    return request({
      url: `/purchase/selectPurchaseById/${id}`,
      method: "GET"
    }, {
      token: store.getters.userToken
    })
  }
  static procurementEdit({
    id,
    code,
    gestore,
    remark
  }) {
    return request({
      url: "/purchase/update",
      method: "PUT",
      data: {
        id,
        code,
        gestore,
        remark
      }
    }, {
      token: store.getters.userToken
    })
  }
  static procurementDelete(id) {
    return request({
      url: `/purchase/delete/${id}`,
      method: "DELETE"
    }, {
      token: store.getters.userToken
    })
  }
  static procurementKuQuList(purchaseId) {
    return request({
      url: `/purchaseDetail/selectByPurchase/${purchaseId}`,
      method: "GET"
    }, {
      token: store.getters.userToken
    })
  }
  static procurementSkuAdd({
    purchaseId,
    skuId,
    companyId,
    price,
    estimatedQuantity,
    categoryId
  }) {
    return request({
      url: "/purchaseDetail/create",
      method: "POST",
      data: {
        purchaseId,
        skuId,
        companyId,
        price,
        estimatedQuantity,
        categoryId
      }
    }, {
      token: store.getters.userToken
    })
  }
  static procurementDeleteSku(id) {
    return request({
      url: `/purchaseDetail/delete/${id}`,
      method: "DELETE"
    }, {
      token: store.getters.userToken
    })
  }
  static procurementDeleteSkuEditId(id) {
    return request({
      url: `/purchaseDetail/selectPurchaseDetailById/${id}`,
      method: "GET"
    }, {
      token: store.getters.userToken
    })
  }
  static procurementSkuAddUpdate({
    id,
    purchaseId,
    skuId,
    companyId,
    price,
    estimatedQuantity,
    categoryId
  }) {
    return request({
      url: "/purchaseDetail/update",
      method: "PUT",
      data: {
        id,
        purchaseId,
        skuId,
        companyId,
        price,
        estimatedQuantity,
        categoryId
      }
    }, {
      token: store.getters.userToken
    })
  }
  static procurementUpdateStatus({
    id,
    status,
    overruledRemark
  }) {
    return request({
      url: "/purchase/updateStatus",
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
}
