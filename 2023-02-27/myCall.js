Function.prototype.myCall = function (target) {
  target = target || window
  const symbolKey = Symbol()
  target[symbolKey] = this
  const res = target[symbolKey](...arguments)
  delete target[symbolKey]
  return res
}

// 冒泡排序
function bubbleSort(arr) {
  let len = arr.length
  if (!len) return []
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (arr[j] < arr[j + 1]) { // 大于是升序，小于是降序
        let temp = arr[j + 1]
        arr[j + 1] = arr[j]
        arr[j] = temp
      }
    }
  }
  return arr
}
// const arr = [5, 10, 40, 1, 2]
// console.log(bubbleSort(arr))

// 柯里化函数
function multiFn(a, b, c) {
  return a * b * c
}

function curry(fn, args) {
  const len = fn.length
  args = args || []
  return function () {
    let newArgs = args.concat(Array.prototype.slice.call(arguments))
    if (newArgs.length < len) {
      return curry.call(this, fn, newArgs)
    } else {
      return fn.apply(this, newArgs)
    }
  }
}
const multi = curry(multiFn)
// console.log(multi(2)(3)(4))
// console.log(multi(2, 3)(4))
// console.log(multi(2, 3, 4))
// console.log(multi(2)(3, 4))

// 求字符中字母出现的此时
const str = 'abcabcabcddddd'
const res = str.split('').reduce((total, item) => {
  total[item] ? total[item]++ : total[item] = 1
  return total
}, {})
// console.log(res)

// 版本号排序
const arr = ['0.1.1', '2.3.3', '0.302.1', '4.2', '4.3.5', '4.3.4.5']
arr.sort((a, b) => {
  // console.log(a)
  console.log(b)
})


// 转化为驼峰命名
const s1 = 'get-element-by-id'

function f(s1) {
  return s1.replace(/-\w/g, function (x) {
    return x.slice(1).toUpperCase()
  })
}