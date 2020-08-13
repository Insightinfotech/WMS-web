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
