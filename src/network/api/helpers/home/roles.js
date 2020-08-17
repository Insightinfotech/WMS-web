import Roles from "../../v1/home/roles"
/**
 *用户登录
 *
 * @export
 * @param {*} {
 *   username,
 *   password
 * }
 * @returns
 */
export function addUser({
  username,
  password
}) {
  return new Promise((resolve, reject) => {
    Roles.addUser({
      username,
      password
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
/**
 *获取用户列表
 *
 * @export
 * @param {*} {
 *   pageNum,
 *   size
 * }
 * @returns
 */
export function getUserList({
  pageNum,
  size
}) {
  return new Promise((resolve, reject) => {
    Roles.getUserList({
      pageNum,
      size
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
/**
 *获取角色列表
 *
 * @export
 * @returns
 */
export function getRolesList() {
  return new Promise((resolve, reject) => {
    Roles.getRolesList().then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
/**
 *添加用户角色
 *
 * @export
 * @param {*} uid
 * @param {*} rid
 * @returns
 */
export function addUserRoles(uid, rid) {
  return new Promise((resolve, reject) => {
    Roles.addUserRoles(uid, rid).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
/**
 *获取单个用户角色
 *
 * @export
 * @param {*} uid
 * @returns
 */
export function getUserRolesList(uid) {
  return new Promise((resolve, reject) => {
    Roles.getUserRolesList(uid).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
/**
 *删除单个用户角色
 *
 * @export
 * @param {*} uid
 * @param {*} rid
 * @returns
 */
export function removeRolesId(uid, rid) {
  return new Promise((resolve, reject) => {
    Roles.removeRolesId(uid, rid).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
/**
 *删除用户
 *
 * @export
 * @param {*} uid
 * @returns
 */
export function removeUserId(uid) {
  return new Promise((resolve, reject) => {
    Roles.removeUserId(uid).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function editUser(id,username,roleIds) {
  return new Promise((resolve, reject) => {
    Roles.editUser(id,username,roleIds).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
