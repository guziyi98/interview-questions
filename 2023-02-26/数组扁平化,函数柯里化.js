let arr = [
  [2, 3, 1],
  [4, 3, 6, 5],
  [6, 2, 4, 9, [4, 11, 12, [12, 13, [10], 15]]], 20
]

function flatten(arr) {
  return arr.reduce((total, item) => {
    return total.concat(Array.isArray(item) ? flatten(item) : item)
  }, [])
}
const res = flatten(arr)
// console.log(res)
// console.log(arr)

// 函数柯里化
function init(a, b, c) {
  console.log('最终的结果：', a * b * c)
}

function curry(fn, params) {
  // 获取函数参数长度
  const len = fn.length
  params = params || []
  // console.log(params)
  return function (...args) {
    // 收集fn函数的参数
    let newArgs = params.concat(Array.prototype.slice.call(arguments))
    // let newArgs = params.concat(args)
    // console.log(newArgs)
    if (newArgs.length < len) {
      return curry.call(this, fn, newArgs)
    } else {
      return fn.apply(this, newArgs)
    }
  }
}
const curryFn = curry(init)
// const res2 = curryFn(2)(3, 4)
// res2()
// console.log(res2())
// console.log(curryFn(2)(3, 4))
// console.log(curryFn(2, 3)(4))
// console.log(curryFn(2, 3, 4))
// console.log(curryFn(2)(3)(4))



// 多写几遍

function init2(a, b, c) {
  console.log('result:', a * b * c)
}

function curry2(fn, params) {
  // body
  let len = fn.length
  params = params || []
  return function (...args) {
    // body
    let newArgs = params.concat(Array.prototype.slice.call(arguments))
    if (newArgs.length < len) {
      return curry2.call(this, fn, newArgs)
    } else {
      return fn.apply(this, newArgs)
    }
  }
}
const curryFn2 = curry2(init2)
console.log(curryFn2(2)(3, 4))
console.log(curryFn2(2, 3)(4))
console.log(curryFn2(2, 3, 4))
console.log(curryFn2(2)(3)(4))