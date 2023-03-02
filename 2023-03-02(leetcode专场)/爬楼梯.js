// https://leetcode.cn/problems/climbing-stairs/

/**
 * @param {number} n
 * @return {number}
 */
// 要用递归 超时
var climbStairs = function (n) {
  // if (n === 1) return 1
  // if (n === 2) return 2
  // if (n === 3) return 3
  // return climbStairs(n - 2) + climbStairs(n - 1)
  let arr = []
  const climbStairsMemo = (n, memo = []) => {
    if (memo[n] > 0) {
      return memo[n]
    }
    if (n === 1) {
      memo[n] = 1
    } else if (n === 2) {
      memo[n] = 2
    } else {
      memo[n] = climbStairsMemo(n - 2, memo) + climbStairsMemo(n - 1, memo)
    }
    return memo[n]
  }
  return climbStairsMemo(n, arr)
};
const res = climbStairs(73)
console.log(res)

var climbStairs2 = function (n) {
  // 斐波那契数列
  if (n === 1) {
    return 1
  }
  let first = 1,
    second = 2,
    third = 3
  for (let i = 3; i <= n; i++) {
    third = first + second
    first = second
    second = third
  }
  return second
};
const res2 = climbStairs2(73)
console.log(res2)