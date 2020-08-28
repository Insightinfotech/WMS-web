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
export function randomNumber() {
  let arr = 'TS'
  let b = (Date.parse(new Date()) / 1000)
  let c = (100 + Math.floor(Math.random() * 100))
  return arr + b + c;
}
