function useDebounce(fn, wait = 5000) {
  // const [fn, setFn] = useState()
  const debounce = (fn, wait) => {
    let timer = null
    return function () {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        fn.apply(this, arguments)
      }, wait)
    }
  }
  return [, debounce(fn, wait)]
}
// node.evn.process.args
function throttle(fn, wait) {
  let timer = null
  let flag = true
  return function () {
    if (flag) {
      let flag = false
      timer = setTimeout(() => {
        fn.apply(this, arguments)
        flag = true
      }, wait)
    }
  }
}