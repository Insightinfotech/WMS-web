import {
  userLogin
} from "api/helpers/login/login"
import {
  addUser,
  getUserList,
  getRolesList,
  addUserRoles,
  getUserRolesList,
  removeRolesId,
  removeUserId,
  editUser
} from "api/helpers/home/roles"
import {
  getCaterogyList,
  unitUserDelete,
  unitTypeList,
  unitTypeadd,
  unitTypeDelete,
  addUserUnit,
  unitSearchName,
  unitTypeEdit,
  unitUserAddEdit
} from "api/helpers/home/unit"
import {
  getManagementList,
  managementAdd,
  managementDelete,
  managementAddEdit,
  managementAddEditPut,
  showReservoirs,
  optionReservoirsAdd,
  optionReservoirsDelete
} from "api/helpers/warehouse/management"
import {
  getReservoirList,
  reservoirAdd,
  reservoirIdDelete,
  reservoirAddEdit,
  getReservoirById,
  showShelves,
  optionShelves,
  optionShelvesDelete
} from "api/helpers/warehouse/reservoir"
import {
  parcelList,
  parcelUserAdd,
  parcelUserEdit,
  getShelvesById,
  shelvesDelete
} from "api/helpers/warehouse/parcel"
import {
  partnerList,
  partnerAdd,
  partnerAddUpdate,
  partnerSearch,
  partnerDelete,
  partnerShowSkus,
  partnerOptionSku,
  partneroptionSkuDelete,
  partnerupdateSkuPrice
} from "api/helpers/basic/partner"
import {
  productTypeList,
  productTypeAdd,
  productTypeAddUpdate,
  productTypeDelete,
  productTypeEdit,
  productList,
  productAdd,
  productAddUpdate,
  productDelete,
  productId
} from "api/helpers/basic/product"
import {
  inventoryList
} from "api/helpers/putwarehouse/inventory"
import {
  procurementList,
  procurementAdd,
  procurementEditId,
  procurementEdit,
  procurementDelete,
  procurementKuQuList,
  procurementSkuAdd,
  procurementDeleteSku,
  procurementDeleteSkuEditId,
  procurementSkuAddUpdate,
  procurementUpdateStatus
} from "api/helpers/putwarehouse/procurement"
import {
  gostorageList,
  gostorageAddList,
  gostorageUpdateStatus,
  gostorageDelete,
  gostorageEditId,
  gostorageAddListEdit,
  gostoragekinId,
  stockInDetailAdd,
  gostorageDetailDelete,
  gostorageDetailEditId,
  stockInDetailAddEdit
} from "api/helpers/putwarehouse/gostorage"
import {
  OutboundList,
  OutboundAdd,
  OutboundListDelete,
  OutboundListEdit,
  OutboundAddDeit,
  stockOutDetailList,
  stockOutDetailCreate,
  stockOutDetailUpdate,
  stockOutDetailListId,
  stockOutDetailListIdDelete,
  OutboundupdateStatus
} from "api/helpers/putwarehouse/outbound"
class NetworkPlugin {
  install(Vue) {
    Vue.prototype.$network = {
      userLogin,
      home: {
        roles: {
          addUser,
          getUserList,
          getRolesList,
          addUserRoles,
          getUserRolesList,
          removeRolesId,
          removeUserId,
          editUser
        },
        unit: {
          getCaterogyList,
          unitUserDelete,
          unitTypeList,
          unitTypeadd,
          unitTypeDelete,
          addUserUnit,
          unitSearchName,
          unitTypeEdit,
          unitUserAddEdit
        }
      },
      warehouse: {
        management: {
          getManagementList,
          managementAdd,
          managementDelete,
          managementAddEdit,
          managementAddEditPut,
          showReservoirs,
          optionReservoirsAdd,
          optionReservoirsDelete
        },
        reservoir: {
          getReservoirList,
          reservoirAdd,
          reservoirIdDelete,
          reservoirAddEdit,
          getReservoirById,
          showShelves,
          optionShelves,
          optionShelvesDelete
        },
        Parcel: {
          parcelList,
          parcelUserAdd,
          parcelUserEdit,
          getShelvesById,
          shelvesDelete
        }
      },
      basic: {
        partner: {
          partnerList,
          partnerAdd,
          partnerAddUpdate,
          partnerSearch,
          partnerDelete,
          partnerShowSkus,
          partnerOptionSku,
          partneroptionSkuDelete,
          partnerupdateSkuPrice
        },
        product: {
          productTypeList,
          productTypeAdd,
          productTypeAddUpdate,
          productTypeDelete,
          productTypeEdit,
          productList,
          productAdd,
          productAddUpdate,
          productDelete,
          productId
        }
      },
      putwarehouse: {
        inventory: {
          inventoryList
        },
        procurement: {
          procurementList,
          procurementAdd,
          procurementEditId,
          procurementEdit,
          procurementDelete,
          procurementKuQuList,
          procurementSkuAdd,
          procurementDeleteSku,
          procurementDeleteSkuEditId,
          procurementSkuAddUpdate,
          procurementUpdateStatus
        },
        gostorage: {
          gostorageList,
          gostorageAddList,
          gostorageUpdateStatus,
          gostorageDelete,
          gostorageEditId,
          gostorageAddListEdit,
          gostoragekinId,
          stockInDetailAdd,
          gostorageDetailDelete,
          gostorageDetailEditId,
          stockInDetailAddEdit
        },
        outbound: {
          OutboundList,
          OutboundAdd,
          OutboundListDelete,
          OutboundListEdit,
          OutboundAddDeit,
          stockOutDetailList,
          stockOutDetailCreate,
          stockOutDetailUpdate,
          stockOutDetailListId,
          stockOutDetailListIdDelete,
          OutboundupdateStatus
        }
      }
    }
  }
}
export default new NetworkPlugin();
