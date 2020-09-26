import Check from "../../v1/putwarehouse/Check"
export function checkList({
  pageNum,
  size,
  code,
  status,
  startTime,
  endTime
}) {
  return new Promise((resolve, reject) => {
    Check.checkList({
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
export function checkstockTakingAdd({
  code,
  remark,
  stockTakingRegions
}) {
  return new Promise((resolve, reject) => {
    Check.checkstockTakingAdd({
      code,
      remark,
      stockTakingRegions
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function checkstockTakingAddDelete(id) {
  return new Promise((resolve, reject) => {
    Check.checkstockTakingAddDelete(id).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function checkstockTakingAddEdit({
  id,
  code,
  remark,
  stockTakingRegions
}) {
  return new Promise((resolve, reject) => {
    Check.checkstockTakingAddEdit({
      id,
      code,
      remark,
      stockTakingRegions
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function checkstockTakingAddId(id) {
  return new Promise((resolve, reject) => {
    Check.checkstockTakingAddId(id).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function checkstockupdateStatus({
  id,
  status,
  overruledRemark
}) {
  return new Promise((resolve, reject) => {
    Check.checkstockupdateStatus({
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
export function checkstockDescId(id) {
  return new Promise((resolve, reject) => {
    Check.checkstockDescId(id).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function checkstockDescsave({
  stockTakingRegionVOS
}) {
  return new Promise((resolve, reject) => {
    Check.checkstockDescsave({
      stockTakingRegionVOS
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
