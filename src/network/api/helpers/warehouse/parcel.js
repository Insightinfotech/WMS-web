import Parcel from "../../v1/warehouse/Parcel"
export function parcelList({
  pageNum,
  size,
  code,
  name,
  warehouseId,
  reservoirId
}) {
  return new Promise((resolve, reject) => {
    Parcel.parcelList({
      pageNum,
      size,
      code,
      name,
      warehouseId,
      reservoirId
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function parcelUserAdd({
  code,
  name,
  layer,
  remark,
  warehouseId,
  reservoirId
}) {
  return new Promise((resolve, reject) => {
    Parcel.parcelUserAdd({
      code,
      name,
      layer,
      remark,
      warehouseId,
      reservoirId
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function parcelUserEdit({
  id,
  code,
  name,
  layer,
  remark,
  warehouseId,
  reservoirId
}) {
  return new Promise((resolve, reject) => {
    Parcel.parcelUserEdit({
      id,
      code,
      name,
      layer,
      remark,
      warehouseId,
      reservoirId
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function getShelvesById(sid) {
  return new Promise((resolve, reject) => {
    Parcel.getShelvesById(sid).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function shelvesDelete(sid) {
  return new Promise((resolve, reject) => {
    Parcel.shelvesDelete(sid).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
