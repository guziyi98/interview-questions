Function.prototype.myNew = function (param) {
  const obj = Object.create(param.prototype)
  const res = param.apply(obj, arguments)
  return res instanceof Object ? res : obj
}

// 函数柯里化

function curry(fn, ...args) {
  let len = fn.length
  return function (...params) {
    let _args = [...args, ...params]
    if (_args.length >= len) {
      return fn.apply(this, _args)
    } else {
      // 否则就继续柯里化
      return curry.call(this, fn, ..._args)
    }
  }
}

// 函数柯里化2
const curry2 = (fn, ...param) => {
  if (param.length >= fn.length) {
    return fn.call(this, ...param)
  }
  return function (...params) {
    return curry2.call(this, fn, ...param, ...params)
  }
}

function add(a, b, c) {
  return a + b + c
}
const res = curry2(add)
const res2 = res(1)(2)(3)
const res22 = res(1, 2)(3)
const res222 = res(1, 2, 3)
// const res = curry2(add(1))
// const res = curry2(add(1))
console.log(res2)
console.log(res22)
console.log(res222)