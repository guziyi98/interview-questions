// new 操作符做了这些事
// 1. 他创建了一个全新的对象
// 2. 让子对象继承构造函数的原型对象
// 3. 调用构造函数
// 4. 返回新对象的地址，保存到=左边的变量里

function myNew(ctx) {
  if (typeof ctx !== 'function') {
    throw new TypeError('the first parameter of newObj must be function')
  }
  // 1.创建一个新对象 2.让子对象继承构造函数的原型对象
  const o = Object.create(ctx.prototype)
  const args = [].slice.call(arguments, 1) // 将arguments转为arr并去除第一个元素
  const objRes = ctx.call(o, ...args) // 3. 改变this指向 将构造函数中的this => new 创建的新对象
  const isObj = typeof objRes === 'object' && objRes !== null
  const isFun = typeof objRes === 'function'
  return (isObj || isFun) ? objRes : o
}

const s = new String('1')
console.log(s)
const s2 = myNew('2')
console.log(s2)