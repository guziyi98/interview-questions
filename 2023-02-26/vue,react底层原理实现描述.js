// vue的核心定位并不是一个框架， 设计上也没有完全遵循mvvm模式， vue核心功能强调的是数据到页面的映射， 所以这也是为什么vue开发者把其命名读成view的原因


// vue的数据双向绑定是由数据劫持 + 发布者 - 订阅者模式实现的
// vue2是通过Object.defineProperty实现的

// 具体是如何实现数据双向绑定的？
// 总结： 在Observer中通过Object.defineProperty进行数据劫持， 代理所有数据的getter和setter属性， 在每次触发setter的时候， 都会通过Dep(收集订阅器) 来通知Watcher， Watcher作为Observer数据监听器与Compile模板解析器之间的桥梁， 当Observer监听到数据发生改变的时候， 通过Updater来通知Compile更新视图， 而Compile通过watcher订阅数据， 绑定更新函数， 通过dep添加订阅者， 达到双向绑定

// react和vue都适用：
// 在传统的diff算法中时间复杂度会达到O(n3), react（ vue） 中定义了三种策略， 在对比时， 根据策略只需要遍历一次树， 就将时间复杂度降到了O（ n）
// 1. tree diff： 在两个树对比时， 只会比较同一层级的节点， 会忽略跨层级的操作
// 2. component diff: 在对比两个组件时， 首先会判断他们两个的类型是否相同， 如果不是， 则会将该组件判断为dirty component， 从而替换掉整个组件下的所有子节点
// 3. element diff: 对于同一层级的节点， 会用具有唯一性的key来区分是否需要创建， 删除or移动。