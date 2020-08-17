import Management from "../../v1/warehouse/Management"
export function getManagementList({
  pageNum,
  size,
  code,
  name,
  manager
}) {
  return new Promise((resolve, reject) => {
    Management.getManagementList({
      pageNum,
      size,
      code,
      name,
      manager
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function managementAdd({
  code,
  name,
  acreage,
  manager,
  phone,
  address,
  remark,
  categoryId
}) {
  return new Promise((resolve, reject) => {
    Management.managementAdd({
      code,
      name,
      acreage,
      manager,
      phone,
      address,
      remark,
      categoryId
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function managementDelete(wid) {
  return new Promise((resolve, reject) => {
    Management.managementDelete(wid).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function managementAddEdit(id) {
  return new Promise((resolve, reject) => {
    Management.managementAddEdit(id).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function managementAddEditPut({
  id,
  code,
  name,
  acreage,
  manager,
  phone,
  address,
  remark,
  categoryId
}) {
  return new Promise((resolve, reject) => {
    Management.managementAddEditPut({
      id,
      code,
      name,
      acreage,
      manager,
      phone,
      address,
      remark,
      categoryId
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}