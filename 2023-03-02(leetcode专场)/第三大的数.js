// https://leetcode.cn/problems/third-maximum-number/


/**
 * @param {number[]} nums
 * @return {number}
 */
var thirdMax = function (nums) {
  const arr = nums.sort((a, b) => a - b)
  if (nums.length < 3) {
    return arr[arr.length - 1]
  }
  // 如何把最大的数取出来, 把升序后的数组，每次取最后一个值放入新的arr中，每次放入前判断arr是否存在，如果存在，就不放入，并且原arr继续找下一个，shift和pop会改变原数组
  let res,
    targetArr = []
  while (targetArr.length < 3) {
    res = arr.pop()
    if (!targetArr.includes(res)) {
      targetArr.push(res)
    }
  }
  console.log(targetArr)
  return targetArr.pop()
};
// thirdMax([1, 2, 2, 3, 3, 3, 4, 4, 5, 5])
console.log(thirdMax([1, 1, 2]))
let arr = []
arr.push(3)
arr.push(2)
arr.push(1)
// console.log(arr.shift())
// console.log(arr)