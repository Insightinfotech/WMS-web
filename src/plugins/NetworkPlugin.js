import {
  userLogin,
  businessRegistration,
  enterpriseLogin,
  adminLogin,
  adminLoginToken,
  adminGetList,
  adminIsCheck,
  businessRegistrationPhone
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
  getListData,
  getSkuListData,
  createSkuList,
  deleteSkuListId,
  createSkuListEchoId,
  createSkuListEchoAdd,
  getAdminListData,
  getAdminListDataRoles
} from "api/helpers/home/warning"
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
  productId,
  productTypeListDy,
  productTypeListIdDy,
  productTypeListIdBingDy
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
  stockInDetailAddEdit,
  gostorageListstockInLog,
  gostorageDetailEditIdSm
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
  OutboundupdateStatus,
  OutboundstockOutLogList
} from "api/helpers/putwarehouse/outbound"
import {
  PickingList,
  PickingListCreate,
  PickingupdateStatus,
  PickingListDelete,
  PickingselectStockOutCodes,
  PickingselectStockOutCodesId
} from "api/helpers/putwarehouse/picking"
import {
  shiftingList,
  shiftingupdateStatus,
  shiftingAdd,
  shiftingDeleteId,
  shiftingselectById,
  shiftingAddUpdate,
  shiftingselectUsableInventory,
  shiftingselectByMove,
  shiftingSkuAdd,
  shiftingDeleteSkuId
} from "api/helpers/putwarehouse/shifting"
import {
  checkList,
  checkstockTakingAdd,
  checkstockTakingAddDelete,
  checkstockTakingAddEdit,
  checkstockTakingAddId,
  checkstockupdateStatus,
  checkstockDescId,
  checkstockDescsave
} from "api/helpers/putwarehouse/check"
import {
  logList,
  userUpdatePassword
} from "api/helpers/log/log"
import {
  getStatementlist
} from "api/helpers/statement/statementlist"
class NetworkPlugin {
  install(Vue) {
    Vue.prototype.$network = {
      userLogin,
      businessRegistration,
      enterpriseLogin,
      adminLogin,
      adminLoginToken,
      adminGetList,
      adminIsCheck,
      businessRegistrationPhone,
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
        },
        warning: {
          getListData,
          getSkuListData,
          createSkuList,
          deleteSkuListId,
          createSkuListEchoId,
          createSkuListEchoAdd,
          getAdminListData,
          getAdminListDataRoles
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
          productId,
          productTypeListDy,
          productTypeListIdDy,
          productTypeListIdBingDy
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
          stockInDetailAddEdit,
          gostorageListstockInLog,
          gostorageDetailEditIdSm
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
          OutboundupdateStatus,
          OutboundstockOutLogList
        },
        picking: {
          PickingList,
          PickingListCreate,
          PickingupdateStatus,
          PickingListDelete,
          PickingselectStockOutCodes,
          PickingselectStockOutCodesId
        },
        shifting: {
          shiftingList,
          shiftingupdateStatus,
          shiftingAdd,
          shiftingDeleteId,
          shiftingselectById,
          shiftingAddUpdate,
          shiftingselectUsableInventory,
          shiftingselectByMove,
          shiftingSkuAdd,
          shiftingDeleteSkuId
        },
        check: {
          checkList,
          checkstockTakingAdd,
          checkstockTakingAddDelete,
          checkstockTakingAddEdit,
          checkstockTakingAddId,
          checkstockupdateStatus,
          checkstockDescId,
          checkstockDescsave
        }
      },
      log: {
        log: {
          logList,
          userUpdatePassword
        }
      },
      statement: {
        Statementlist: {
          getStatementlist
        }
      }
    }
  }
}
export default new NetworkPlugin();
