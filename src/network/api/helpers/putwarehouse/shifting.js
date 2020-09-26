import Shifting from "../../v1/putwarehouse/Shifting"
export function shiftingList({
  pageNum,
  size,
  code,
  status,
  startTime,
  endTime
}) {
  return new Promise((resolve, reject) => {
    Shifting.shiftingList({
      pageNum,
      pageNum,
      size,
      code,
      status,
      startTime,
      endTime
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })

  })
}

export function shiftingupdateStatus({
  id,
  status,
  overruledRemark
}) {
  return new Promise((resolve, reject) => {
    Shifting.shiftingupdateStatus({
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

export function shiftingAdd({
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
  return new Promise((resolve, reject) => {
    Shifting.shiftingAdd({
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
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })

  })
}
export function shiftingDeleteId(
  id
) {
  return new Promise((resolve, reject) => {
    Shifting.shiftingDeleteId(
      id
    ).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })

  })
}
export function shiftingselectById(
  id
) {
  return new Promise((resolve, reject) => {
    Shifting.shiftingselectById(
      id
    ).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })

  })
}
export function shiftingAddUpdate({
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
  return new Promise((resolve, reject) => {
    Shifting.shiftingAddUpdate({
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
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })

  })
}
export function shiftingselectUsableInventory(
  id
) {
  return new Promise((resolve, reject) => {
    Shifting.shiftingselectUsableInventory(
      id
    ).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })

  })
}
export function shiftingselectByMove(
  id
) {
  return new Promise((resolve, reject) => {
    Shifting.shiftingselectByMove(
      id
    ).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })

  })
}
export function shiftingSkuAdd({
  moveId,
  skuId,
  quantity,
  categoryId
}) {
  return new Promise((resolve, reject) => {
    Shifting.shiftingSkuAdd({
      moveId,
      skuId,
      quantity,
      categoryId
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })

  })
}
export function shiftingDeleteSkuId(
  id
) {
  return new Promise((resolve, reject) => {
    Shifting.shiftingDeleteSkuId(
      id
    ).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })

  })
}