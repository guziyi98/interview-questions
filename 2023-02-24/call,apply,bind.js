// 通过原型链得到调用call的一定是函数
// 执行当前的函数
// 改变this指向
const obj = {
  name: 'gzy',
  say(prefix, age) {
    console.log(`${prefix},my name is ${this.name},i am ${age} years old`)
  }
}
const a = {
  name: 'peter'
}
// obj.say.call(a, 'hello', 25)
// a中没有重新定义say方法，并且say方法的this指向了a

// 手撕call
Function.prototype.myCall = function (target, ...args) {
  target = target || window
  const symbolKey = Symbol()
  target[symbolKey] = this // this就是执行的函数 say
  const res = target[symbolKey](...args)
  delete target[symbolKey] // 调用完删除拓展属性
  return res
}
// obj.say('hello', 35)
obj.say.myCall(a, 'hello2', 45)

//手撕apply
Function.prototype.myApply = function (target, arr) { // 和call的区别是这里是个数组
  target = target || window
  const symbolKey = Symbol()
  target[symbolKey] = this
  const res = target[symbolKey](...arr)
  delete target[symbolKey]
  return res
}


const mbs = {
  name: '麻不烧',
  say(prefix, age) {
    console.log(`${prefix},my name is ${this.name},i am ${age} year old`)
  }
}

// mbs.say('hello', 12) // 'hello,my name is 麻不烧,i am 12 year old'

const B = {
  name: '小丁2丁'
}

const sayB = mbs.say.bind(B, 'hello')

// sayB(3) // 'hello,my name is 小丁丁,i am 3 year old''// 

// 手撕bind
Function.prototype.myBind = function (target, ...args) {
  // 返回的是一个函数,所以需要执行下返回的fn
  target = target || {}
  const symbolKey = Symbol()
  target[symbolKey] = this
  return function (...params) {
    return res = target[symbolKey](...args, ...params)
  }
}
const myBind = mbs.say.myBind(B, 'hello', 33)
myBind()