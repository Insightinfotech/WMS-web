import request from "../../index"
import store from "@/store"
export default class Roles {
  /**
   *用户登录
   *
   * @static
   * @param {*} {
   *     username,
   *     password
   *   }
   * @returns
   * @memberof Roles
   */
  static addUser({
    username,
    password
  }) {
    return request({
      url: "/user/create",
      method: "POST",
      data: {
        username,
        password
      }
    }, {
      token: store.getters.userToken
    })
  }
  /**
   *获取用户列表
   *
   * @static
   * @param {*} {
   *     pageNum,
   *     size
   *   }
   * @returns
   * @memberof Roles
   */
  static getUserList({
    pageNum,
    size
  }) {
    return request({
      url: "/user/list",
      method: "GET",
      params: {
        pageNum,
        size
      }
    }, {
      token: store.getters.userToken

    })
  }
  /**
   *获取角色列表
   *
   * @static
   * @returns
   * @memberof Roles
   */
  static getRolesList() {
    return request({
      url: "/role/list",
      method: "GET",
    }, {
      token: store.getters.userToken
    })
  }
  /**
   *添加用户角色
   *
   * @static
   * @param {*} uid
   * @param {*} rid
   * @returns
   * @memberof Roles
   */
  static addUserRoles(uid, rid) {
    return request({
      url: `/user/addUserRole/${uid}/${rid}`,
      method: "POST",
    }, {
      token: store.getters.userToken
    })
  }
  /**
   *获取单个用户角色
   *
   * @static
   * @param {*} uid
   * @returns
   * @memberof Roles
   */
  static getUserRolesList(uid) {
    return request({
      url: "/role/getUserRoles",
      method: "GET",
      params: {
        uid
      }
    }, {
      token: store.getters.userToken
    })
  }
  /**
   *删除单个用户角色
   *
   * @static
   * @param {*} uid
   * @param {*} rid
   * @returns
   * @memberof Roles
   */
  static removeRolesId(uid, rid) {
    return request({
      url: `/user/deleteUserRole/${uid}/${rid}`,
      method: "DELETE"
    }, {
      token: store.getters.userToken
    })
  }
  /**
   *删除用户(包括他的所属的角色  等于数据全部删除)
   *
   * @static
   * @param {*} uid
   * @returns
   * @memberof Roles
   */
  static removeUserId(uid) {
    return request({
      url: `/user/delete/${uid}`,
      method: "DELETE"
    }, {
      token: store.getters.userToken
    })
  }
  static editUser(id,datasd,roleIds) {
    return request({
      url: "/user/update",
      method: "PUT",
      data: {
        id,
        datasd,
        roleIds
      }
    }, {
      token: store.getters.userToken
    })
  }
}
