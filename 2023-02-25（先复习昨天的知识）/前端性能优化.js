// A.浏览器
// 1. 减少http请求
// 2. 使用http2 .0
// 3. 设置浏览器缓存策略
// 4. 白屏时间做加载动画（ 增强用户体验） 点击button加loading

// B.资源
// 1. 静态资源cdn
// 2. 静态资源单独域名
// 3. gzip压缩
// 4. 服务端渲染SSR
// 5. css文件放头部， js文件放尾部， 单线程js可能会阻碍文档加载

// C.图片
// 1. 图片懒加载
// 2. 图片预加载

// D.代码
// 1. 慎用全局变量
// 2. 减少重绘回流
// 3. 使用防抖， 节流进行优化代码
// 4. 少用闭包， 减少内存泄漏
// 5. 减少数据读取次数 如for循环， 需要提前把len声明出来