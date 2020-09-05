import Inventory from "../../v1/putwarehouse/Inventory"
export function inventoryList({
  pageNum,
  size,
  skuName,
  warehouseId,
  reservoirId,
  shelvesId
}) {
  return new Promise((resolve, reject) => {
    Inventory.inventoryList({
      pageNum,
      size,
      skuName,
      warehouseId,
      reservoirId,
      shelvesId
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
