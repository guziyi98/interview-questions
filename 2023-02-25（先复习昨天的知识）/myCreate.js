const myCreate = (obj) => {
  // 创建一个构造函数
  // 将这个构造函数的原型指向这个对象
  // 返回这个构造函数的实例
  function Fn() {}
  Fn.prototype = obj
  return new Fn()
}

// 升级版， 接收参数

const myCreate2 = obj => {
  const args = [].slice.call(arguments, 1)
  for (const item of args) {
    Object.assign(obj, item)
  }

  function Fn() {}
  Fn.prototype = obj
  return new Fn()
}