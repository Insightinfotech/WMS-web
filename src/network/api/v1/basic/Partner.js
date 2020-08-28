import request from "../../index"
import store from "@/store"
export default class Partner {
  static partnerList({
    pageNum,
    size,
    code,
    name,
    type
  }) {
    return request({
      url: "/company/list",
      method: "GET",
      params: {
        pageNum,
        size,
        code,
        name,
        type
      }
    }, {
      token: store.getters.userToken
    })
  }
  static partnerAdd({
    code,
    name,
    type,
    province,
    city,
    district,
    addressLine,
    contactName,
    phone,
    email,
    remark
  }) {
    return request({
      url: "/company/create",
      method: "POST",
      data: {
        code,
        name,
        type,
        province,
        city,
        district,
        addressLine,
        contactName,
        phone,
        email,
        remark
      }
    }, {
      token: store.getters.userToken
    })
  }
  static partnerAddUpdate({
    id,
    code,
    name,
    type,
    province,
    city,
    district,
    addressLine,
    contactName,
    phone,
    email,
    remark
  }) {
    return request({
      url: "/company/update",
      method: "PUT",
      data: {
        id,
        code,
        name,
        type,
        province,
        city,
        district,
        addressLine,
        contactName,
        phone,
        email,
        remark
      }
    }, {
      token: store.getters.userToken
    })
  }
  static partnerSearch(cid) {
    return request({
      url: `/company/getCompanyById/${cid}`,
      method: "GET"
    }, {
      token: store.getters.userToken
    })
  }
  static partnerDelete(id) {
    return request({
      url: `/company/delete/${id}`,
      method: "DELETE"
    }, {
      token: store.getters.userToken
    })
  }
  static partnerShowSkus(id) {
    return request({
      url: `/company/showSkus/${id}`,
      method: "GET"
    }, {
      token: store.getters.userToken
    })
  }
  static partnerOptionSku({
    supplierId,
    skuId,
    price,
    remark
  }) {
    return request({
      url: `/company/optionSku/add`,
      method: "PUT",
      data: {
        supplierId,
        skuId,
        price,
        remark
      }
    }, {
      token: store.getters.userToken
    })
  }
  static partneroptionSkuDelete({
    supplierId,
    skuId
  }) {
    return request({
      url: `/company/optionSku/delete`,
      method: "DELETE",
      data: {
        supplierId,
        skuId
      }
    }, {
      token: store.getters.userToken
    })
  }
  static partnerupdateSkuPrice({
    supplierId,
    skuId,
    price
  }) {
    return request({
      url: `/company/updateSkuPrice`,
      method: "PUT",
      data: {
        supplierId,
        skuId,
        price
      }
    }, {
      token: store.getters.userToken
    })
  }
}
