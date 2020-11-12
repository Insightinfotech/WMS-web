import Warning from "../../v1/home/Warning"
export function getListData({
  pageNum,
  size,
  skuName
}) {
  return new Promise((resolve, reject) => {
    Warning.getListData({
      pageNum,
      size,
      skuName
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function getSkuListData() {
  return new Promise((resolve, reject) => {
    Warning.getSkuListData().then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function createSkuList({
  skuId,
  alertNum
}) {
  return new Promise((resolve, reject) => {
    Warning.createSkuList({
      skuId,
      alertNum
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function deleteSkuListId(id) {
  return new Promise((resolve, reject) => {
    Warning.deleteSkuListId(id).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function createSkuListEchoId(id) {
  return new Promise((resolve, reject) => {
    Warning.createSkuListEchoId(id).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function createSkuListEchoAdd({
  id,
  alertNum
}) {
  return new Promise((resolve, reject) => {
    Warning.createSkuListEchoAdd({
      id,
      alertNum
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function getAdminListData() {
  return new Promise((resolve, reject) => {
    Warning.getAdminListData().then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function getAdminListDataRoles({
  roleIds
}) {
  return new Promise((resolve, reject) => {
    Warning.getAdminListDataRoles({
      roleIds
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
