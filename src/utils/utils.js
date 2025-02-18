/**
 * @description : 获取随机字符串
 *                传入的 length 为空时，则返回 ''
 *                若 uppercase , lowercase, num 均不传，则默认全部包含
 * @param         {Number|String} length 字符串长度，如不传则默认生成32位
 * @param         {Boolean} uppercase  是否包含大写字母
 * @param         {Boolean} lowercase 是否包含小写字母
 * @param         {Boolean} num 是否包含数字
 * @return        {String} 生成的字符串
 * @Author      : MDT
 */
export function getRandomString(obj) {
  const { length = 32, uppercase = true, lowercase = true, num = true } = obj || {}
  const lengthNo = Number(length)
  if (!lengthNo || lengthNo < 1 || (!uppercase && !lowercase && !num)) {
    return ''
  }

  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz'
  const numChars = '0123456789'
  let chars = ''
  if (uppercase) chars += uppercaseChars
  if (lowercase) chars += lowercaseChars
  if (num) chars += numChars

  const maxLength = chars.length
  const array = new Uint32Array(lengthNo)
  crypto.getRandomValues(array)

  let str = ''
  for (let i = 0; i < lengthNo; i++) {
    const randomIndex = Math.floor((array[i] / 4294967296) * maxLength)
    str += chars.charAt(randomIndex)
    // str += chars.charAt(array[i] % maxLength)
    // str = str + chars.charAt(Math.floor(Math.random() * maxLength))
  }

  return str
}

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
    91: '国外',
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

/**
 * 将 base64 字符串转换为 Blob 对象
 * @param {string} base64Content - 要转换的 base64 字符串
 * @returns {Blob} - 转换后的 Blob 对象
 * @throws {Error} - 如果输入不是有效的 base64 字符串，将抛出错误
 */
export function base64ToBlob(base64Content) {
  // 检查输入是否为有效的字符串
  if (typeof base64Content !== 'string') {
    throw new Error('输入必须是有效的 base64 字符串')
  }
  // 分割 base64 字符串以获取内容类型和实际数据
  const parts = base64Content.split(';base64,')
  if (parts.length !== 2) {
    throw new Error('输入不是有效的 base64 字符串')
  }
  const contentType = parts[0].split(':')[1]
  const base64Data = parts[1]
  try {
    // 解码 base64 数据
    const binaryData = window.atob(base64Data)
    const arrayBuffer = new ArrayBuffer(binaryData.length)
    const uint8Array = new Uint8Array(arrayBuffer)
    // 将解码后的数据复制到 Uint8Array 中
    for (let i = 0; i < binaryData.length; i++) {
      uint8Array[i] = binaryData.charCodeAt(i)
    }
    // 创建并返回 Blob 对象
    return new Blob([uint8Array], { type: contentType })
  } catch (error) {
    // 处理解码过程中可能出现的错误
    throw new Error('无法解码 base64 数据: ' + error.message)
  }
}

/**
 * 创建并触发文件下载
 * @param {Blob} blob - 要下载的 Blob 对象
 * @param {string} fileName - 下载文件的名称
 * @throws {Error} - 如果输入的参数类型不正确，将抛出错误
 */
export function createAndTriggerDownload(blob, fileName) {
  // 检查输入参数的类型
  if (!(blob instanceof Blob) || typeof fileName !== 'string') {
    throw new Error('Invalid input: blob must be a Blob object and fileName must be a string')
  }
  // 创建一个 <a> 元素用于触发下载
  const aLink = document.createElement('a')
  aLink.href = URL.createObjectURL(blob)
  aLink.download = fileName
  aLink.style.display = 'none'
  // 将 <a> 元素添加到文档中并触发点击事件
  document.body.appendChild(aLink)
  aLink.click()
  // 异步移除 <a> 元素并释放 URL 对象
  setTimeout(() => {
    document.body.removeChild(aLink)
    URL.revokeObjectURL(aLink.href)
  }, 0)
}

/**
 * 根据 base64 字符串下载图片
 * @param {string} base64Content - 图片的 base64 字符串
 * @param {string} fileName - 下载图片的文件名
 * @throws {Error} - 如果输入的参数类型不正确，将抛出错误
 */
export function downloadImageByBase64(base64Content, fileName) {
  // 检查输入参数的类型
  if (typeof base64Content !== 'string' || typeof fileName !== 'string') {
    throw new Error('Invalid input: base64Content and fileName must be strings')
  }
  try {
    // 将 base64 字符串转换为 Blob 对象
    const blob = base64ToBlob(base64Content)
    // 创建并触发下载
    createAndTriggerDownload(blob, fileName)
  } catch (error) {
    // 处理转换或下载过程中可能出现的错误
    console.error('下载图片时出错:', error)
  }
}
