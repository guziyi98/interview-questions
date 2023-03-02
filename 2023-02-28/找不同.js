// https://leetcode.cn/problems/find-the-difference/


/**
 * @param {string} s
 * @param {string} t
 * @return {character}
 */
var findTheDifference = function (s, t) {
  let tlen = t.length
  let res = ''
  for (let i = 0; i < tlen; i++) {
    if (s.includes[t[i]]) {
      continue
    } else {
      res = t[i]
    }
  }
  return res
};
const s = 'abcabc'
const t = 'abceabc'
console.log(findTheDifference(s, t))