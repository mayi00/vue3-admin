/**
 * @description  : 判断是否为外部链接
 * @param         {String} path
 * @return        {Boolean}
 * @Author       : hzf
 */
export function isExternalLink(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @description : 校验身份证号是否合法
 * @param        {String|Number} value
 * @return       {Boolean} 如果身份证号合法，返回true；否则返回false
 * @Author      : huazf
 */
export function checkPsidno(value) {
  const psidno = String(value)
  // 1.校验身份证号格式和长度
  const regPsidno =
    /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[X])$)$/
  if (!regPsidno.test(psidno)) {
    return false
  }
  // 2.校验前两位的省份编码是否正确
  const province = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江 ',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北 ',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏 ',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外'
  }
  if (!province[Number(psidno.slice(0, 2))]) {
    return false
  }
  // 3.校验出生日期
  if (psidno.length === 15) {
    // 15位 省（2位）市（2位）县（2位）年（2位）月（2位）日（2位）校验码（3位）
    const reg = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/)
    const arrSplit = psidno.match(reg)
    // 15位号码在年份前补 19 或 20
    const year = Number(arrSplit[2].charAt(0)) > 0 ? '19' + arrSplit[2] : '20' + arrSplit[2]
    const month = arrSplit[3]
    const day = arrSplit[4]
    if (!validateBirthday(year, month, day)) {
      return false
    }
  } else if (psidno.length === 18) {
    // 18位 省（2位）市（2位）县（2位）年（4位）月（2位）日（2位）校验码（4位）
    const reg = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/)
    const arrSplit = psidno.match(reg)
    const year = arrSplit[2]
    const month = arrSplit[3]
    const day = arrSplit[4]
    if (!validateBirthday(year, month, day)) {
      return false
    }
  } else {
    return false
  }
  // 校验出生日期是否合理
  function validateBirthday(year, month, day) {
    year = Number(year) // 年
    month = Number(month) // 月
    day = Number(day) // 日
    const nowTime = new Date().getTime() // 当前时间戳
    const birthTime = new Date(`${year}-${month}-${day}`).getTime() // 获取出生日期的时间戳
    // 一般人活不到150岁吧
    const nowYear = new Date().getFullYear()
    if (nowYear - year > 150) {
      return false
    }
    // 不能是明天出生的吧
    if (birthTime > nowTime) {
      return false
    }
    // 不能是13月出生的吧
    if (month < 1 || month > 12) {
      return false
    }
    // 不能是2月30号、4月31号、5月32号出生的吧
    const date = new Date(year, month, 0) // 获取当月的最后一天
    if (day < 1 || day > date.getDate()) {
      return false
    }
    return true
  }
  // 4.18位号码时校验生成的校验码
  if (psidno.length === 18) {
    const Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2] // 加权因子
    const parity = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'] // 校验码
    let sum = 0
    for (let i = 0; i < 17; i++) {
      sum += Number(psidno.charAt(i)) * Wi[i]
    }
    if (parity[sum % 11] !== psidno[17]) {
      return false
    }
  }
  return true
}
