import Statementlist from "../../v1/statement/Statementlist"
export function getStatementlist({
  year
}) {
  return new Promise((resolve, reject) => {
    Statementlist.getStatementlist({
      year
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
