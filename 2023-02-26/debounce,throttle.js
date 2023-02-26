const debounce = (fn, wait) => {
  let timer = null
  return function () {
    let self = this
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(self, arguments)
    }, wait);
  }
}

const throttle = (fn, wait) => {
  let timer = null
  let flag = true
  return function (arguments) {
    // body
    if (flag) {
      // 关闭通道，等待定时器执行完后再开启
      flag = false
      timer = setTimeout(() => {
        fn.apply(this, arguments)
        flag = true
      }, wait);
    }
  }
}