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
// import {} from "ap1/helpers/putwarehouse/inventory"
import {
  procurementList,
  procurementAdd,
  procurementEditId,
  procurementEdit,
  procurementDelete,
  procurementKuQuList,
  procurementSkuAdd,
  procurementDeleteSku,
  procurementDeleteSkuEditId
} from "api/helpers/putwarehouse/procurement"

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
          procurementDeleteSkuEditId
        }
      }
    }
  }
}
export default new NetworkPlugin();
