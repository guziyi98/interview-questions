// 防抖： 一定时间连续触发的事件，只在最后执行一次 输入框查询
// 节流： 一段时间内只执行一次,一段时间内重复触发，按一定频率执行  浏览器滚动

// https://juejin.cn/post/6959094874264043533
// 可以立即执行的防抖函数
function debounce(fn, wait = 800, immediate = false) {
  let timer = null
  return function () {
    let self = this
    const argu = arguments
    // 事件触发，如果之前有等待的事件，则清空计时，重新进行事件等待执行
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(function () {
      fn.apply(self, argu)
    }, wait);
  }
}
const fn2 = () => console.log(111)
debounce(fn2, 300)
// setTimeout(() => {
//   console.log(22)
// }, 2000);

// 节流
function throttle(fn, wait) {
  let timer = null
  let flag = true
  return function (...args) {
    if (flag) {
      // 关闭通道，等待定时器执行完后再开启
      flag = false
      timer = setTimeout(function () {
        fn.apply(this, args)
        flag = true
      }, wait);
    }
  }
}