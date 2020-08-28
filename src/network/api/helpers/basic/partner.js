import Partner from "../../v1/basic/Partner"
export function partnerList({
  pageNum,
  size,
  code,
  name,
  type
}) {
  return new Promise((resolve, reject) => {
    Partner.partnerList({
      pageNum,
      size,
      code,
      name,
      type
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function partnerAdd({
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
  return new Promise((resolve, reject) => {
    Partner.partnerAdd({
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
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function partnerAddUpdate({

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
  return new Promise((resolve, reject) => {
    Partner.partnerAddUpdate({
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
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function partnerSearch(cid) {
  return new Promise((resolve, reject) => {
    Partner.partnerSearch(cid).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function partnerDelete(cid) {
  return new Promise((resolve, reject) => {
    Partner.partnerDelete(cid).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function partnerShowSkus(cid) {
  return new Promise((resolve, reject) => {
    Partner.partnerShowSkus(cid).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function partnerOptionSku({
  supplierId,
  skuId,
  price,
  remark
}) {
  return new Promise((resolve, reject) => {
    Partner.partnerOptionSku({
      supplierId,
      skuId,
      price,
      remark
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function partneroptionSkuDelete({
  supplierId,
  skuId
}) {
  return new Promise((resolve, reject) => {
    Partner.partneroptionSkuDelete({
      supplierId,
      skuId
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function partnerupdateSkuPrice({
  supplierId,
  skuId,
  price
}) {
  return new Promise((resolve, reject) => {
    Partner.partnerupdateSkuPrice({
      supplierId,
      skuId,
      price
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
