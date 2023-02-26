// 通过调用原生的input chang 事件
// 可以拿到文件的file对象
// 调用file.slice(0, 100) // 0 - 99 个子节，可以得到Blob对象
// Blob {
//   size: 10 * 10 * 1024
// } // 可以直接通过ajax上传到服务器

// 切片 分片 速度快的原因：是因为没有读取他的数据，只是拿到的是提前定义好的一些信息

// FileReader: 读取文件

// 当停电了or网络中断了， 需要重新上传的时候， 让服务器告诉前端这个文件已经上传到哪一部分了， 这里就需要用到文件的hash值告诉服务器是哪个文件

function createChunks(file, chunkSize) {
  const result = []
  for (let i = 0; i < file.size; i += chunkSize) {
    result.push(file.slice(i, i + chunkSize))
  }
  return result
}


// web worker