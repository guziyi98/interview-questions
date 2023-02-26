// 发布-订阅模式其实是一种对象间一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都会收到通知。

// 实现思路：
// 1.创建一个对象
// 2.在该对象上创建一个缓存列表（调度中心）
// 3.on方法用来把函数fn都加到缓存列表中（订阅者注册事件到调度中心）
// 4.emit方法取到arguments里第一个当做event，根据event值去执行对应缓存列表中的函数
// 5.off方法可以根据event值取消订阅
// 6.once方法只监听一次，调用完毕后删除缓存函数
class EventEmitter {
  constructor() {
    // 存放订阅的名字和事件
    this.events = {}
  }
  // 订阅事件
  on(eventName, fn) {
    if (this.events[eventName]) {
      this.events[eventName].push(fn)
    } else {
      this.events[eventName] = [fn]
    }
  }
  // 触发事件
  emit(eventName) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(cb => cb())
    }
  }
  // 移除订阅者
  removeListener(eventName, fn) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(item => item !== fn)
    }
  }
  // 执行一次的订阅事件
  once(eventName, callback) {
    // 绑定的是fn，执行的时候会触发fn
    const fn = () => {
      callback()
      this.removeListener(eventName, fn) // 从缓存列表中删除
    }
    this.on(eventName, fn)
  }
}
let em = new EventEmitter();
let workday = 0;
em.on("work", function () {
  workday++;
  console.log("work everyday");
});

em.once("love", function () {
  console.log("just love you");
});

function makeMoney() {
  console.log("make one million money");
}
em.on("money", makeMoney)

let time = setInterval(() => {
  em.emit("work");
  em.removeListener("money", makeMoney);
  em.emit("money");
  em.emit("love");
  if (workday === 5) {
    console.log("have a rest")
    clearInterval(time);
  }
}, 1);
// work everyday
// just love you
// work everyday
// work everyday
// work everyday
// work everyday
// have a rest