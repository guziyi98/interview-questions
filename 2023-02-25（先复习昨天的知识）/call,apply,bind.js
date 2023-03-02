const myCall = (target, ...args) => {
  // 1. 改变this指向
  // 2. 接收参数
  target = target || window
  const symbolKey = Symbol()
  target[symbolKey] = this
  const res = target[symbolKey](...args)
  delete target[symbolKey]
  return res
}
// Function.prototype.myCall
// Function.prototype.myApply
// Function.prototype.myBind


const myApply = (target, arr) => { // 参数就是数组
  // 1. 改变this指向
  // 2. 接收参数
  target = target || window
  const symbolKey = Symbol()
  target[symbolKey] = this
  const res = target[symbolKey](...arr)
  // delete target[symbolKey]
  return res
}

const myBind = (target, ...args) => { // 返回的是一个函数
  target = target || {}
  const symbolKey = Symbol()
  target[symbolKey] = this
  return function (...params) {
    const res = target[symbolKey](...args, ...params)
    return res
  }
}

const myCall2 = function (target, args) {
  target = target || window
  const symbolKey = Symbol()
  target[symbolKey] = this
  const res = target[symbolKey](...args)
  delete target[symbolKey]
  return res
}