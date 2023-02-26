const shallowClone = param => {
  if (typeof param !== 'object') {
    return param
  }
  let cloneObj
  if (typeof param === 'object') {
    cloneObj = {}
  }
  if (typeof param === 'array') {
    cloneObj = []
  }
  for (const item in param) {
    if (param.hasOwnProperty(item)) {
      cloneObj[item] = param[item]
    }
  }
  return cloneObj
}

// 两种写法 一种是递归调用浅拷贝
const deepClone = param => {
  if (typeof param !== 'object') {
    return param
  }
  let cloneObj
  if (typeof param === 'object') {
    cloneObj = {}
  }
  if (typeof param === 'array') {
    cloneObj = []
  }
  for (const item in param) {
    // 保证key不是从原型取得的对象
    if (param.hasOwnProperty.call(param, item)) {
      cloneObj[item] = shallowClone(param[item])
    }
  }
  return cloneObj
}