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
      }
    }
  }
}
export default new NetworkPlugin();
