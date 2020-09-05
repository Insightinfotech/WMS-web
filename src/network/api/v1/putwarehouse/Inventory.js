import request from "../../index"
import store from "@/store"
export default class Inventory {
  static inventoryList({
    pageNum,
    size,
    skuName,
    warehouseId,
    reservoirId,
    shelvesId
  }) {
    return request({
      url: "/inventory/list",
      method: "GET",
      params: {
        pageNum,
        size,
        skuName,
        warehouseId,
        reservoirId,
        shelvesId
      }
    }, {
      token: store.getters.userToken
    })
  }
}
