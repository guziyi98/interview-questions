const myNew = (param, ...args) => {
  // 创一个新对象
  // 将传进来的对象的实例指向新创建的对象
  if (typeof param !== 'function') {
    throw new TypeError('必须是函数')
  }
  // const o = Object.create(param.prototype)
  // const arr = [].slice.call(arguments, 1)
  // // 改变this指向，将构造函数中的this指向新创建的对象
  // const res = param.call(o, ...arr)
  // const isObj = typeof res === 'object' && res !== null
  // const isFun = typeof res === 'function'
  // return (isObj || isFun) ? res : o
  const obj = Object.create(param.prototype)
  const res = param.call(obj, ...args)
  return res instanceof Object ? res : obj

}