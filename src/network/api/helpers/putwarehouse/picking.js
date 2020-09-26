import Picking from "../../v1/putwarehouse/Picking"
export function PickingList({
  pageNum,
  size,
  status,
  startTime,
  endTime
}) {
  return new Promise((resolve, reject) => {
    Picking.PickingList({
      pageNum,
      size,
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
export function PickingListCreate({
  code,
  stockOutCodes
}) {
  return new Promise((resolve, reject) => {
    Picking.PickingListCreate({
      code,
      stockOutCodes
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })

  })
}
export function PickingupdateStatus({
  id,
  status
}) {
  return new Promise((resolve, reject) => {
    Picking.PickingupdateStatus({
      id,
      status
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })

  })
}
export function PickingListDelete(
  id
) {
  return new Promise((resolve, reject) => {
    Picking.PickingListDelete(
      id).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })

  })
}
export function PickingselectStockOutCodes(
  id
) {
  return new Promise((resolve, reject) => {
    Picking.PickingselectStockOutCodes(
      id).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })

  })
}
export function PickingselectStockOutCodesId(
  id
) {
  return new Promise((resolve, reject) => {
    Picking.PickingselectStockOutCodesId(
      id).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })

  })
}