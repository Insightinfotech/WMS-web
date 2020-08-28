import request from "../../index"
import store from "@/store"
export default class Product {
  static productTypeList({
    pageNum,
    size,
    name
  }) {
    return request({
      url: "/skuType/list",
      method: "GET",
      params: {
        pageNum,
        size,
        name
      }
    }, {
      token: store.getters.userToken
    })
  }
  static productTypeAdd({
    name
  }) {
    return request({
      url: "/skuType/create",
      method: "POST",
      data: {
        name
      }
    }, {
      token: store.getters.userToken
    })
  }
  static productTypeAddUpdate({
    id,
    name
  }) {
    return request({
      url: "/skuType/update",
      method: "PUT",
      data: {
        id,
        name
      }
    }, {
      token: store.getters.userToken
    })
  }
  static productTypeDelete(
    id
  ) {
    return request({
      url: `/skuType/delete/${id}`,
      method: "DELETE"
    }, {
      token: store.getters.userToken
    })
  }
  static productTypeEdit(
    id
  ) {
    return request({
      url: `/skuType/getSkuTypeById/${id}`,
      method: "GET"
    }, {
      token: store.getters.userToken
    })
  }

  // ====================
  static productList({
    pageNum,
    size,
    code,
    name,
    skuType,
    supplier
  }) {
    return request({
      url: "/sku/list",
      method: "GET",
      params: {
        pageNum,
        size,
        code,
        name,
        skuType,
        supplier
      }
    }, {
      token: store.getters.userToken
    })
  }
  static productAdd({
    code,
    name,
    skuTypeId,
    categoryId,
    remark,
    skuInfos
  }) {
    return request({
      url: "/sku/create",
      method: "POST",
      data: {
        code,
        name,
        skuTypeId,
        categoryId,
        remark,
        skuInfos
      }
    }, {
      token: store.getters.userToken
    })
  }
  static productAddUpdate({
    id,
    code,
    name,
    skuTypeId,
    categoryId,
    remark,
    skuInfos
  }) {
    return request({
      url: "/sku/update",
      method: "PUT",
      data: {
        id,
        code,
        name,
        skuTypeId,
        categoryId,
        remark,
        skuInfos
      }
    }, {
      token: store.getters.userToken
    })
  }
  static productDelete(
    id
  ) {
    return request({
      url: `/sku/delete/${id}`,
      method: "DELETE"
    }, {
      token: store.getters.userToken
    })
  }
  static productId(sid) {
    return request({
      url: `/sku/getSkuById/${sid}`,
      method: "GET"
    }, {
      token: store.getters.userToken
    })
  }
}
