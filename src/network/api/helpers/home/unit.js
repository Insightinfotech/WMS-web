import Unit from "../../v1/home/unit"
export function getCaterogyList({
  pageNum,
  size

}) {
  return new Promise((resolve, reject) => {
    Unit.getCaterogyList({
      pageNum,
      size
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function unitUserDelete(cid) {
  return new Promise((resolve, reject) => {
    Unit.unitUserDelete(cid).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function addUserUnit({
  name,
  categoryTypeId,
  remark
}) {
  return new Promise((resolve, reject) => {
    Unit.addUserUnit({
      name,
      categoryTypeId,
      remark
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function unitTypeList({
  pageNum,
  size
}) {
  return new Promise((resolve, reject) => {
    Unit.unitTypeList({
      pageNum,
      size
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function unitTypeadd({
  name
}) {
  return new Promise((resolve, reject) => {
    Unit.unitTypeadd({
      name
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function unitTypeDelete(cid) {
  return new Promise((resolve, reject) => {
    Unit.unitTypeDelete(cid).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export function unitSearchName({
  pageNum,
  size,
  categoryTypeId,
  name

}) {
  return new Promise((resolve, reject) => {
    Unit.unitSearchName({
      pageNum,
      size,
      categoryTypeId,
      name
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function unitTypeEdit({
  id,
  name
}) {
  return new Promise((resolve, reject) => {
    Unit.unitTypeEdit({
      id,
      name
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function unitUserAddEdit({
  id,
  name,
  categoryTypeId,
  remark
}) {
  return new Promise((resolve, reject) => {
    Unit.unitUserAddEdit({
      id,
      name,
      categoryTypeId,
      remark
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
