export function convertKey(arr, key) {
  let newArr = [];
  arr.forEach((item, index) => {
    let newObj = {};
    for (var i = 0; i < key.length; i++) {
      newObj[key[i]] = item[Object.keys(item)[i]]
    }
    newArr.push(newObj);
  })
  return newArr;
}
export function randomNumberKH() {
  let arr = 'KH-'
  let b = (Date.parse(new Date()) / 1000)
  let c = (100 + Math.floor(Math.random() * 100))
  return arr + b + c;
}
export function randomNumberGYS() {
  let arr = 'GYS-'
  let b = (Date.parse(new Date()) / 1000)
  let c = (100 + Math.floor(Math.random() * 100))
  return arr + b + c;
}
export function randomNumberCP() {
  let arr = 'CP-'
  let b = (Date.parse(new Date()) / 1000)
  let c = (100 + Math.floor(Math.random() * 100))
  return arr + b + c;
}
export function randomNumberHJ() {
  let arr = 'HJ-'
  let b = (Date.parse(new Date()) / 1000)
  let c = (100 + Math.floor(Math.random() * 100))
  return arr + b + c;
}
export function randomNumberCK() {
  let arr = 'CK-'
  let b = (Date.parse(new Date()) / 1000)
  let c = (100 + Math.floor(Math.random() * 100))
  return arr + b + c;
}
export function randomNumberKQ() {
  let arr = 'KQ-'
  let b = (Date.parse(new Date()) / 1000)
  let c = (100 + Math.floor(Math.random() * 100))
  return arr + b + c;
}
export function randomNumber() {
  let arr = 'TS-'
  let b = (Date.parse(new Date()) / 1000)
  let c = (100 + Math.floor(Math.random() * 100))
  return arr + b + c;
}
export function randomNumberCase() {
  let arr = 'RK-'
  let b = (Date.parse(new Date()) / 1000)
  let c = (100 + Math.floor(Math.random() * 100))
  return arr + b + c;
}
export function randomNumberCaseChuku() {
  let arr = 'CK-'
  let b = (Date.parse(new Date()) / 1000)
  let c = (100 + Math.floor(Math.random() * 100))
  return arr + b + c;
}
export function randomNumberCaseJH() {
  let arr = 'JH-'
  let b = (Date.parse(new Date()) / 1000)
  let c = (100 + Math.floor(Math.random() * 100))
  return arr + b + c;
}
export function randomNumberCaseYK() {
  let arr = 'YK-'
  let b = (Date.parse(new Date()) / 1000)
  let c = (100 + Math.floor(Math.random() * 100))
  return arr + b + c;
}
export function randomNumberCasePD() {
  let arr = 'PD-'
  let b = (Date.parse(new Date()) / 1000)
  let c = (100 + Math.floor(Math.random() * 100))
  return arr + b + c;
}
export function typeList(val) {
  switch (val) {
    case "采购入库":
      return 1
      break;
    case "退货入库":
      return 2
      break;
    case "其他入库":
      return 3
      break;

  }
}
export function typeListAsd(val) {
  switch (val) {
    case 1:
      return "采购入库"
      break;
    case 2:
      return "退货入库"
      break;
    case 3:
      return "其他入库"
      break;

  }
}
