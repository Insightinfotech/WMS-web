import Gostorage from "../../v1/putwarehouse/Gostorage"
export function gostorageList({
  pageNum,
  size,
  code,
  type,
  status
}) {
  return new Promise((resolve, reject) => {
    Gostorage.gostorageList({
      pageNum,
      size,
      code,
      type,
      status
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function gostorageAddList({
  purchaseCode,
  code,
  type,
  gestore,
  remark
}) {
  return new Promise((resolve, reject) => {
    Gostorage.gostorageAddList({
      purchaseCode,
      code,
      type,
      gestore,
      remark
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function gostorageUpdateStatus({
  id,
  status,
  overruledRemark
}) {
  return new Promise((resolve, reject) => {
    Gostorage.gostorageUpdateStatus({
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
export function gostorageDelete(
  id
) {
  return new Promise((resolve, reject) => {
    Gostorage.gostorageDelete(
      id
    ).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function gostorageEditId(
  id
) {
  return new Promise((resolve, reject) => {
    Gostorage.gostorageEditId(
      id
    ).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function gostorageAddListEdit({
  id,
  purchaseCode,
  code,
  type,
  gestore,
  remark
}) {
  return new Promise((resolve, reject) => {
    Gostorage.gostorageAddListEdit({
      id,
      purchaseCode,
      code,
      type,
      gestore,
      remark
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function gostoragekinId(
  id
) {
  return new Promise((resolve, reject) => {
    Gostorage.gostoragekinId(
      id
    ).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function stockInDetailAdd({
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
  return new Promise((resolve, reject) => {
    Gostorage.stockInDetailAdd({
      stockInId,
      skuId,
      companyId,
      categoryId,
      warehouseId,
      reservoirId,
      shelvesId,
      layer,
      quantity
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function gostorageDetailDelete(
  id
) {
  return new Promise((resolve, reject) => {
    Gostorage.gostorageDetailDelete(
      id
    ).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function gostorageDetailEditId(
  id
) {
  return new Promise((resolve, reject) => {
    Gostorage.gostorageDetailEditId(
      id
    ).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function stockInDetailAddEdit({
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
  return new Promise((resolve, reject) => {
    Gostorage.stockInDetailAddEdit({
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
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function gostorageListstockInLog({
  pageNum,
  size,
  stockInCode,
  purchaseCode,
  stockInType,
  sku,
  gestore,
  startTime,
  endTime
}) {
  return new Promise((resolve, reject) => {
    Gostorage.gostorageListstockInLog({
      pageNum,
      size,
      stockInCode,
      purchaseCode,
      stockInType,
      sku,
      gestore,
      startTime,
      endTime
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function gostorageDetailEditIdSm({
  code
}) {
  return new Promise((resolve, reject) => {
    Gostorage.gostorageDetailEditIdSm({
      code
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
