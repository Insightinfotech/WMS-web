import Outbound from "../../v1/putwarehouse/Outbound"
export function OutboundList({
  pageNum,
  size,
  code,
  type,
  status,
  companyId
}) {
  return new Promise((resolve, reject) => {
    Outbound.OutboundList({
      pageNum,
      size,
      code,
      type,
      status,
      companyId
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })

  })
}
export function OutboundAdd({
  code,
  type,
  companyId,
  gestore,
  remark,
}) {
  return new Promise((resolve, reject) => {
    Outbound.OutboundAdd({
      code,
      type,
      companyId,
      gestore,
      remark,
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })

  })
}
export function OutboundListDelete(
  id
) {
  return new Promise((resolve, reject) => {
    Outbound.OutboundListDelete(
      id
    ).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })

  })
}
export function OutboundListEdit(
  id
) {
  return new Promise((resolve, reject) => {
    Outbound.OutboundListEdit(
      id
    ).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })

  })
}
export function OutboundAddDeit({
  id,
  code,
  type,
  companyId,
  gestore,
  remark,
}) {
  return new Promise((resolve, reject) => {
    Outbound.OutboundAddDeit({
      id,
      code,
      type,
      companyId,
      gestore,
      remark,
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })

  })
}
export function OutboundupdateStatus({
  id,
  status,
  overruledRemark
}) {
  return new Promise((resolve, reject) => {
    Outbound.OutboundupdateStatus({
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
// ========================================
export function stockOutDetailList(
  id,
) {
  return new Promise((resolve, reject) => {
    Outbound.stockOutDetailList(
      id).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function stockOutDetailCreate({
  stockOutId,
  skuId,
  estimatedQuantity,
  categoryId
}) {
  return new Promise((resolve, reject) => {
    Outbound.stockOutDetailCreate({
      stockOutId,
      skuId,
      estimatedQuantity,
      categoryId
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function stockOutDetailUpdate({
  id,
  stockOutId,
  skuId,
  estimatedQuantity,
  categoryId
}) {
  return new Promise((resolve, reject) => {
    Outbound.stockOutDetailUpdate({
      id,
      stockOutId,
      skuId,
      estimatedQuantity,
      categoryId
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function stockOutDetailListId(
  id,
) {
  return new Promise((resolve, reject) => {
    Outbound.stockOutDetailListId(
      id).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function stockOutDetailListIdDelete(
  id,
) {
  return new Promise((resolve, reject) => {
    Outbound.stockOutDetailListIdDelete(
      id).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
