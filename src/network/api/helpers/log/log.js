import Log from "../../v1/log/Log"
export function logList({
  pageNum,
  size,
  username,
  keyWork,
  startTime,
  endTime
}) {
  return new Promise((resolve, reject) => {
    Log.logList({
      pageNum,
      size,
      username,
      keyWork,
      startTime,
      endTime
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
