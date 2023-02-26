//手写promise包含一下知识点
// 1. Promise
// 2. Class类
// 3. 改变this指向（call, apply, bind）
// 4. 时间循环event loop


// promise代表一个异步操作， 有三种状态， pending, fulfilled, rejected, 状态不可逆
// 被创建的promise最终会以fulfilled or rejected结束， 并在完成时调用相应的函数传递给.then or.catch

// let myPromise1 = new Promise(() => {}); // 构造函数
// console.log('myPromise1 :>> ', myPromise1);
// let myPromise2 = new Promise((resolve, reject) => {
//   let a = 1;
//   for (let index = 0; index < 5; index++) {
//     a++;
//   }
// })
// console.log('myPromise2 :>> ', myPromise2)
// myPromise2.then((res) => {
//   console.log("myPromise2执行了then");
// })

// 上面这段话包含了三个知识点
// 1. promise的初始状态是pending
// 2. promise里面没有指向resolve, reject以及throw的话，这个promise的状态也是pending
// 3. 基于上一条，promise的状态不会执行回调函数then

// let promise = new Promise()
// console.log(promise) // 会报错，规定必须给promise传入一个执行函数，否则会报错

// 开始手写promise
class myPromise {
  static PENDING = 'pending'
  static FULFILLED = 'fulfilled'
  static REJECTED = 'rejected'
  constructor(fn) {
    this.promiseState = myPromise.PENDING
    this.promiseResult = null // 成功or失败的结果
    this.onFulfilledCallbacks = [] // 保存成功的回调
    this.onRejectedCallbacks = [] // 保存失败的回调
    // 加入try catch是为了捕获用户写入的throw错误
    try {
      fn(this.resolve.bind(this), this.reject.bind(this))
    } catch (err) {
      this.reject(err)
    }
  }
  // 我们回忆一下原生promise，在执行resolve or reject的时候可以传入一个参数
  // this指向问题
  resolve(result) {
    // 调用this.state的时候并没有调用constructor里面的state，也就是这里的this已经跟丢了
    if (this.promiseState === myPromise.PENDING) {
      this.promiseState = myPromise.FULFILLED
      this.promiseResult = result
      this.onFulfilledCallbacks.forEach(callback => {
        callback(result)
      })
    }
  }
  reject(reason) {
    if (this.promiseState === myPromise.PENDING) {
      this.promiseState = myPromise.REJECTED
      this.promiseResult = reason
      this.onRejectedCallbacks.forEach(callback => {
        callback(reason)
      })
    }
  }
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : reason => {
      throw reason
    }
    if (this.promiseState === myPromise.PENDING) {
      // 当宏任务里面包含resolve时，.then获取到的还是pending，
      // 为了保留then里面的函数，我们用数组来保存这些回调，因为一个promise有多个.then，也就是经典的链式调用，而且数组是陷入先出的顺序
      this.onFulfilledCallbacks.push(() => {
        setTimeout(() => {
          onFulfilled(this.promiseResult)
        });
      })
      this.onRejectedCallbacks.push(() => {
        setTimeout(() => {
          onRejected(this.promiseResult)
        });
      })
    }

    if (this.promiseState === myPromise.FULFILLED) {
      setTimeout(() => {
        onFulfilled(this.promiseResult)
      });
    }

    if (this.promiseState === myPromise.REJECTED) {
      setTimeout(() => {
        onRejected(this.promiseResult)
      });
    }
  }
  static resolve(value) {
    // 如果这个值是promise,则返回这个promise
    if (value instanceof myPromise) {
      return value
    } else if (value instanceof Object && 'then' in value) { // 如果这个值是thenable 及带有then方法，返回的promise会跟随这个thenable对象
      return new myPromise((resolve, reject) => {
        value.then(resolve, reject)
      })
    }
    return new myPromise((resolve, reject) => {
      resolve(value)
    })
  }
  static all(promises) {
    return new myPromise((resolve, reject) => {
      if (Array.isArray(promises)) {
        let count = 0
        let res = []
        if (promises.length === 0) {
          return resolve(promises)
        }
        promises.forEach((item, index) => {
          if (item instanceof myPromise) {
            myPromise.resolve(item).then(
              value => {
                count++
                res[index] = value
                count === promises.length && resolve(res)
              },
              reason => {
                // 如果有失败的，直接rejected
                reject(reason)
              }
            )
          } else {
            count++
            res[index] = item
            count === promises.length && resolve(res)
          }
        })
      } else {
        return reject(new TypeError('argument is not iterable'))
      }
    })
  }

  static allSettled(promises) {
    // allSettled相比于all 只是返回的结果是对象和都是用resolve返回的
    return new myPromise((resolve, reject) => {
      if (Array.isArray(promises)) {
        let count = 0
        let res = []
        if (promises.length === 0) resolve(promises)
        promises.forEach((item, index) => {
          // 不需要判断是否属于promise了，因为A+规范里面会把不是promise的转换成promise
          myPromise.resolve(item).then(
            value => {
              count++
              res[index] = {
                status: this.FULFILLED,
                value
              }
              promises.length === count && resolve(res)
              // q: 为什么这里需要判断promises.length等于count
            },
            reason => {
              res[index] = {
                status: this.REJECTED,
                reason
              }
              promises.length === count && resolve(res)
            }
          )
        })
      } else {
        return reject(new TypeError('argument is not iterable'))
      }
    })
  }
}
// 实现resolve和reject

const promise2 = new myPromise((resolve, reject) => {
  // resolve('这次一定')
  // reject('下次一定')
  // throw new Error('白嫖不成功')
})
// console.log(promise2.promiseResult)
// promise2.then(res => {
//   console.log(res)
// }, rej => {
//   console.log(rej)
// })

// 下面这一段是增加了.then 关于pending状态的代码 实现当resolve处于setTimeout里面时
// console.log(1);
// let promise11 = new myPromise((resolve, reject) => {
//   console.log(2);
//   setTimeout(() => {
//     resolve('这次一定');
//     console.log(4);
//   });
// })
// promise11.then(
//   result => {
//     console.log('fulfilled:', result);
//   },
//   reason => {
//     console.log('rejected:', reason)
//   }
// )
// console.log(3);



// 实现promise链式调用
// let p1 = new myPromise((resolve, reject) => {
//   resolve(10)
// })
// p1.then(res => {
//   console.log('fulfilled', res);
//   return 2 * res
// }).then(res => {
//   console.log('fulfilled', res)
// })

for (let i = 0; i < 10; i++) {
  console.log(i)
}