// Object.create
// 1.创建一个临时性的构造函数
// 2. 将这个对象指向这个构造函数的原型
// 3. 返回这个临时构造函数的实例

function myCreate(obj) {
  function Fn() {}
  Fn.prototype = obj
  return new Fn()
}

// 传入参数的create函数
function myCreate2(obj) {
  const args = [].slice.call(arguments, 1)
  // console.log(args)
  for (const item of args) {
    // console.log(item, 111)
    Object.assign(obj, item)
  }

  function Fn() {}
  Fn.prototype = obj
  return new Fn(args)
}
const Person = {
  age: 25
}
const res = myCreate2(Person, {
  sex: 'male'
})
// console.log(res)