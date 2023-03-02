function convert(amount) {
  // return money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
  // return money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
  // 将金额转为字符串
  amount = amount.toString();
  // 将金额按小数点分隔
  var parts = amount.split('.');
  // 取出整数部分
  var integerPart = parts[0];
  // 取出小数部分，如果没有小数部分，就设置为空字符串
  var decimalPart = parts.length > 1 ? '.' + parts[1] : '';
  // 使用正则表达式匹配整数部分中的数字，每三位插入一个逗号
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  // 返回格式化后的金额字符串
  return integerPart + decimalPart;
}
let num = 123456
console.log(convert(num))

console.log(num.toString().split('.')[0])