// 通俗地讲，深拷贝与浅拷贝正好相反，它会复制对象中属性的值而不是引用地址。

// 实现对象的浅拷贝：
Object.assign({}, {
  a: 1
})
// 实现数组的浅拷贝
const arr2 = [1].concat()
const arr = [1].slice()

// 展开运算符也算浅拷贝
// {...obj} [...arr]

// 手写浅拷贝
function shallowClone(obj) {
  if (typeof obj !== 'object') {
    return obj
  }
  if (obj instanceof Object) {
    return Object.assign({}, obj)
  }
  if (obj instanceof Array) {
    return [].concat(obj)
  }
}
// 也可以用for in 实现浅拷贝
function shallowClone(obj) {
  if (typeof obj !== 'object') {
    return obj
  }
  let newObj
  if (obj instanceof Object) {
    newObj = {}
  }
  if (obj instanceof Array) {
    newObj = []
  }
  for (let item in obj) {
    if (obj.hasOwnProperty(item)) {
      newObj[item] = obj[item]
    }
  }
  return newObj
}


// 手写深拷贝
JSON.parse(JSON.stringify)
postMessage()

function deepClone(obj) {
  if (typeof obj !== 'object') {
    return obj
  }
  let cloneObj
  if (obj instanceof Object) {
    cloneObj = {}
  } else {
    cloneObj = []
  }
  for (let item in obj) {
    if (Object.hasOwnProperty.call(obj, item)) {
      cloneObj[item] = deepClone(obj[item])
    }
  }
  return cloneObj
}