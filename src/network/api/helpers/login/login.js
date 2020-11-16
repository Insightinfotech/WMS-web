import user from "../../v1/user/user"
export function userLogin({
  username,
  password
}) {
  return new Promise((resolve, reject) => {
    user.login({
      username,
      password
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function businessRegistration({
  name,
  password,
  phone,
  content,
  code
}) {
  return new Promise((resolve, reject) => {
    user.businessRegistration({
      name,
      password,
      phone,
      content,
      code
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function enterpriseLogin({
  name,
  password
}) {
  return new Promise((resolve, reject) => {
    user.enterpriseLogin({
      name,
      password
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function adminLogin({
  username,
  password
}) {
  return new Promise((resolve, reject) => {
    user.adminLogin({
      username,
      password
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function adminLoginToken() {
  return new Promise((resolve, reject) => {
    user.adminLoginToken().then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function adminGetList({
  pageNum,
  size,
  name,
  isCheck
}) {
  return new Promise((resolve, reject) => {
    user.adminGetList({
      pageNum,
      size,
      name,
      isCheck
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function adminIsCheck({
  id,
  isCheck
}) {
  return new Promise((resolve, reject) => {
    user.adminIsCheck({
      id,
      isCheck
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function businessRegistrationPhone({
  phone
}) {
  return new Promise((resolve, reject) => {
    user.businessRegistrationPhone({
      phone
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
