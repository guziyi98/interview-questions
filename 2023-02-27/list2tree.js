const arr = [{
    id: 1,
    text: '节点1',
    parentId: 0 //这里用0表示为顶级节点
  },
  {
    id: 2,
    text: '节点1_1',
    parentId: 1 //通过这个字段来确定子父级
  }
]

// 转成
// [
//   {
//       id: 1,
//       text: '节点1',
//       parentId: 0,
//       children: [
//           {
//               id:2,
//               text: '节点1_1',
//               parentId:1
//           }
//       ]
//   }
// ]
function listToTree(data) {
  let obj = {}
  let treeData = []
  for (let i = 0; i < data.length; i++) {
    obj[data[i].id] = data[i]
  }

  for (let i in obj) {
    if (+obj[i].parentId !== 0) {
      if (!obj[obj[i].parentId].children) {
        obj[obj[i].parentId].children = []
      }
      obj[obj[i].parentId].children.push(obj[i])
    } else {
      treeData.push(obj[i])
    }
  }
  return treeData
}
console.log(listToTree(arr))