import Procurement from "../../v1/putwarehouse/Procurement"
export function procurementList({
  pageNum,
  size,
  code,
  status
}) {
  return new Promise((resolve, reject) => {
    Procurement.procurementList({
      pageNum,
      size,
      code,
      status
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function procurementAdd({
  code,
  gestore,
  remark
}) {
  return new Promise((resolve, reject) => {
    Procurement.procurementAdd({
      code,
      gestore,
      remark
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function procurementEditId(id) {
  return new Promise((resolve, reject) => {
    Procurement.procurementEditId(
      id
    ).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function procurementEdit({
  id,
  code,
  gestore,
  remark
}) {
  return new Promise((resolve, reject) => {
    Procurement.procurementEdit({
      id,
      code,
      gestore,
      remark
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function procurementDelete(id) {
  return new Promise((resolve, reject) => {
    Procurement.procurementDelete(
      id
    ).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function procurementKuQuList(purchaseId) {
  return new Promise((resolve, reject) => {
    Procurement.procurementKuQuList(
      purchaseId
    ).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function procurementSkuAdd({
  purchaseId,
  skuId,
  companyId,
  price,
  estimatedQuantity,
  categoryId
}) {
  return new Promise((resolve, reject) => {
    Procurement.procurementSkuAdd({
      purchaseId,
      skuId,
      companyId,
      price,
      estimatedQuantity,
      categoryId
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function procurementDeleteSku(id) {
  return new Promise((resolve, reject) => {
    Procurement.procurementDeleteSku(
      id
    ).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function procurementDeleteSkuEditId(id) {
  return new Promise((resolve, reject) => {
    Procurement.procurementDeleteSkuEditId(
      id
    ).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function procurementSkuAddUpdate({
  id,
  purchaseId,
  skuId,
  companyId,
  price,
  estimatedQuantity,
  categoryId
}) {
  return new Promise((resolve, reject) => {
    Procurement.procurementSkuAddUpdate({
      id,
      purchaseId,
      skuId,
      companyId,
      price,
      estimatedQuantity,
      categoryId
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function procurementUpdateStatus({
  id,
  status,
  overruledRemark
}) {
  return new Promise((resolve, reject) => {
    Procurement.procurementUpdateStatus({
      id,
      status,
      overruledRemark
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
