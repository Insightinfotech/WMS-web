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
        }
      }
    }
  }
}
export default new NetworkPlugin();
