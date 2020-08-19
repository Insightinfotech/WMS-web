import Reservoir from "../../v1/warehouse/Reservoir"
export function getReservoirList({
  pageNum,
  size,
  code,
  name,
  warehouseId
}) {
  return new Promise((resolve, reject) => {
    Reservoir.getReservoirList({
      pageNum,
      size,
      code,
      name,
      warehouseId
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function reservoirAdd({
  code,
  name,
  acreage,
  remark,
  warehouseId,
  categoryId
}) {
  return new Promise((resolve, reject) => {
    Reservoir.reservoirAdd({
      code,
      name,
      acreage,
      remark,
      warehouseId,
      categoryId
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function reservoirIdDelete(id) {
  return new Promise((resolve, reject) => {
    Reservoir.reservoirIdDelete(id).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function reservoirAddEdit({
  id,
  code,
  name,
  acreage,
  remark,
  warehouseId,
  categoryId
}) {
  return new Promise((resolve, reject) => {
    Reservoir.reservoirAddEdit({
      id,
      code,
      name,
      acreage,
      remark,
      warehouseId,
      categoryId
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function getReservoirById(rid) {
  return new Promise((resolve, reject) => {
    Reservoir.getReservoirById(rid).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function showShelves(rid) {
  return new Promise((resolve, reject) => {
    Reservoir.showShelves(rid).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function optionShelves(wid, rid) {
  return new Promise((resolve, reject) => {
    Reservoir.optionShelves(wid, rid).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function optionShelvesDelete(wid, rid) {
  return new Promise((resolve, reject) => {
    Reservoir.optionShelvesDelete(wid, rid).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
