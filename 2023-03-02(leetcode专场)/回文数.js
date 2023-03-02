// https://leetcode.cn/problems/palindrome-number/
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
  // 121 
  // -121
  // 还有带-号怎么处理
  // 先考虑正数吧
  const res = x.toString().split('').reverse().join('')
  // console.log(res)
  return x.toString() === res ? true : false
};
console.log(isPalindrome(-121))