import Product from "../../v1/basic/Product"
export function productTypeList({
  pageNum,
  size,
  name
}) {
  return new Promise((resolve, reject) => {
    Product.productTypeList({
      pageNum,
      size,
      name
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function productTypeAdd({
  name
}) {
  return new Promise((resolve, reject) => {
    Product.productTypeAdd({
      name
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function productTypeAddUpdate({
  id,
  name
}) {
  return new Promise((resolve, reject) => {
    Product.productTypeAddUpdate({
      id,
      name
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function productTypeDelete(
  id
) {
  return new Promise((resolve, reject) => {
    Product.productTypeDelete(
      id
    ).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function productTypeEdit(
  id
) {
  return new Promise((resolve, reject) => {
    Product.productTypeEdit(
      id
    ).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
// ====================
export function productList({
  pageNum,
  size,
  code,
  name,
  skuType,
  supplier
}) {
  return new Promise((resolve, reject) => {
    Product.productList({
      pageNum,
      size,
      code,
      name,
      skuType,
      supplier
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function productAdd({
  code,
  name,
  skuTypeId,
  categoryId,
  remark,
  skuInfos
}) {
  return new Promise((resolve, reject) => {
    Product.productAdd({
      code,
      name,
      skuTypeId,
      categoryId,
      remark,
      skuInfos
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function productAddUpdate({
  id,
  code,
  name,
  skuTypeId,
  categoryId,
  remark,
  skuInfos
}) {
  return new Promise((resolve, reject) => {
    Product.productAddUpdate({
      id,
      code,
      name,
      skuTypeId,
      categoryId,
      remark,
      skuInfos
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function productDelete(
  id
) {
  return new Promise((resolve, reject) => {
    Product.productDelete(
      id
    ).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function productId(
  id
) {
  return new Promise((resolve, reject) => {
    Product.productId(
      id
    ).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function productTypeListDy(
  skuId
) {
  return new Promise((resolve, reject) => {
    Product.productTypeListDy(
      skuId
    ).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function productTypeListIdDy(
  skuId
) {
  return new Promise((resolve, reject) => {
    Product.productTypeListIdDy(
      skuId
    ).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function productTypeListIdBingDy(
  id,
  cid
) {
  return new Promise((resolve, reject) => {
    Product.productTypeListIdBingDy(
      id,
      cid
    ).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
