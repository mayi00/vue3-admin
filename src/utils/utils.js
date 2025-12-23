/**
 * 判断是否为外部链接（http:// 或 https:// 开头）
 * @param {any} path 路径
 * @returns {boolean}
 */
export function isExternalLink(path) {
  if (typeof path !== 'string') return false
  return /^https?:\/\//.test(path)
}

/**
 * @description : 获取随机字符串
 *                - 传入的 length 为空时，则返回 ''
 *                - 若 uppercase , lowercase, num 均不传，则默认全部包含
 * @param         {Number|String} length 字符串长度，默认32位
 * @param         {Boolean} uppercase  是否包含大写字母（默认true）
 * @param         {Boolean} lowercase 是否包含小写字母（默认true）
 * @param         {Boolean} num 是否包含数字（默认true）
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
  const symbols = '!@#$%^&*()_+[]{}|;:,.<>?'
  let chars = ''
  if (uppercase) chars += uppercaseChars
  if (lowercase) chars += lowercaseChars
  if (num) chars += numChars

  const maxLength = chars.length
  const array = new Uint32Array(lengthNo)
  crypto.getRandomValues(array)

  const arr = []
  for (let i = 0; i < lengthNo; i++) {
    const randomIndex = Math.floor((array[i] / 4294967296) * maxLength)
    arr.push(chars.charAt(randomIndex))
  }

  return arr.join('')
}

/**
 * 生成指定范围内的随机整数
 * @param {number} min 最小值（包含）
 * @param {number} max 最大值（包含）
 * @returns {number} 返回一个介于min和max之间的随机整数
 * @throws {TypeError} 当min或max参数类型不为数字时抛出异常
 */
export function getRandomInt(min, max) {
  // 参数类型检查
  if (typeof min !== 'number' || typeof max !== 'number') {
    throw new TypeError('参数必须为数字')
  }

  if (min === max) return min

  // 交换 min 和 max
  if (min > max) [min, max] = [max, min]

  const range = max - min + 1
  return Math.floor(Math.random() * range) + min
}

/**
 * 生成指定范围和小数位数的随机浮点数
 * @param {number} min 最小值（包含）
 * @param {number} max 最大值（包含）
 * @param {number} [decimalPlaces=0] 小数位数，取值范围0-20
 * @returns {number} 生成的随机浮点数，保留指定小数位数
 * @throws {TypeError} 当 min 或 max 参数类型不为数字时抛出异常
 * @throws {RangeError} 当 decimalPlaces 不是 0-20 的整数时抛出异常
 */
export function getRandomFloat(min, max, decimalPlaces = 0) {
  // 参数类型检查
  if (typeof min !== 'number' || typeof max !== 'number') {
    throw new TypeError('参数必须为数字')
  }

  // 参数范围校验
  if (!Number.isInteger(decimalPlaces) || decimalPlaces > 20) {
    throw new RangeError('decimalPlaces必须是0~20之间的整数')
  }

  // 如果小数位数小于0，则默认为0
  if (decimalPlaces < 0) decimalPlaces = 0

  if (min === max) return min

  // 交换 min 和 max
  if (min > max) [min, max] = [max, min]

  // 生成基础浮点数
  let random = Math.random() * (max - min) + min

  // 处理小数位数
  const factor = Math.pow(10, decimalPlaces)
  random = Math.round(random * factor) / factor

  return random
}

/**
 * @description : 校验身份证号是否合法
 * @param        {String|Number} value
 * @return       {Boolean} 如果身份证号合法，返回true；否则返回false
 * @Author      : huazf
 */
export function checkIDCardNo(value) {
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
    const year = Number(arrSplit[2].charAt(0)) > 0 ? `19${arrSplit[2]}` : `20${arrSplit[2]}`
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
    throw new Error(`无法解码 base64 数据: ${error.message}`)
  }
}

/**
 * @description : 检测浏览器类型
 * @return       {String} 返回浏览器标识（Chrome/Firefox/Safari/Edge/Opera/IE/Other）
 * @example     :
 *               detectBrowser() => 'Chrome' // 谷歌浏览器
 *               detectBrowser() => 'Firefox' // 火狐浏览器
 *               detectBrowser() => 'Safari' // 苹果浏览器
 *               detectBrowser() => 'Edge' // 微软Edge浏览器
 *               detectBrowser() => 'Opera' // Opera浏览器
 *               detectBrowser() => 'IE' // IE浏览器
 * @Author      : MDT
 */
export function detectBrowser() {
  const userAgent = navigator.userAgent
  if (userAgent.includes('Edg') || userAgent.includes('Edge')) {
    return 'Edge'
  } else if (userAgent.includes('OPR')) {
    return 'Opera'
  } else if (userAgent.includes('Firefox')) {
    return 'Firefox'
  } else if (userAgent.includes('Trident') || userAgent.includes('MSIE')) {
    return 'IE'
  } else if (userAgent.includes('Chrome') && !userAgent.includes('Chromium')) {
    return 'Chrome'
  } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
    return 'Safari'
  }
  return 'Other'
}

/**
 * @description : 检测是否为移动端设备
 * @return       {Boolean} 移动端返回true，否则返回false
 * @Author      : MDT
 */
export function isMobile() {
  const userAgent = navigator.userAgent
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i
  return mobileRegex.test(userAgent)
}

/**
 * @description : 检测是否为平板设备
 * @return       {Boolean} 平板设备返回true，否则返回false
 * @Author      : MDT
 */
export function isTablet() {
  const userAgent = navigator.userAgent
  const tabletRegex =
    /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/i
  return tabletRegex.test(userAgent)
}

/**
 * @description : 检测是否为 PC 端设备
 * @return       {Boolean} PC端返回true，否则返回false
 * @Author      : MDT
 */
export function isPC() {
  const userAgent = navigator.userAgent
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i
  return !mobileRegex.test(userAgent)
}

/**
 * @description : 检测是否为 iOS 设备
 * @return       {Boolean} iOS设备返回true，否则返回false
 * @Author      : MDT
 */
export function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
}

/**
 * @description : 检测Android设备
 * @return       {Boolean} Android设备返回true，否则返回false
 * @Author      : MDT
 */
export function isAndroid() {
  return /Android/.test(navigator.userAgent) && !window.MSStream
}

/**
 * @description : 获取操作系统类型
 * @return       {String} 操作系统标识（Windows/Mac/Linux/Android/iOS/Other）
 * @Author      : MDT
 */
export function getOS() {
  const ua = navigator.userAgent
  if (isIOS()) return 'iOS'
  if (isAndroid()) return 'Android'
  if (ua.includes('Win')) return 'Windows'
  if (ua.includes('Mac')) return 'Mac'
  if (ua.includes('Linux')) return 'Linux'
  return 'Other'
}

/**
 * @description : 解析URL参数为对象
 * @return       {Object} 参数键值对对象
 * @example     : getUrlParams() => { id: '123' }
 * @Author      : MDT
 */
export function getUrlParams() {
  return Object.fromEntries(new URLSearchParams(window.location.search))
}

/**
 * @description : 对象转URL查询字符串
 * @param        {Object} params - 需要转换的对象
 * @return       {String} 查询字符串
 * @example     : objectToQuery({a:1}) => 'a=1'
 * @Author      : MDT
 */
export function objectToQuery(params) {
  return new URLSearchParams(params).toString()
}

/**
 * @description : 深拷贝对象
 * @param        {Any} source - 需要拷贝的数据
 * @return       {Any} 拷贝后的数据
 * @example     :
 *               deepClone({a: new Date()}) => 拷贝后的日期对象
 *               deepClone([{b: new Set([1])}]) => 拷贝后的集合对象
 * @Author      : MDT
 */
export function deepClone(source, hash = new WeakMap()) {
  // 处理非对象类型
  if (source === null || typeof source !== 'object') return source

  // 处理循环引用
  if (hash.has(source)) return hash.get(source)

  // 处理特殊对象类型
  const Constructor = source.constructor
  switch (Constructor) {
    case Date:
      return new Constructor(source.getTime())
    case RegExp:
      return new Constructor(source)
    case Map:
      return new Map(Array.from(source, ([k, v]) => [deepClone(k), deepClone(v)]))
    case Set:
      return new Set(Array.from(source, v => deepClone(v)))
  }

  // 处理普通对象/数组
  const cloneObj = new Constructor()
  hash.set(source, cloneObj)

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      cloneObj[key] = deepClone(source[key], hash)
    }
  }

  // 处理Symbol类型属性
  const symbolKeys = Object.getOwnPropertySymbols(source)
  for (const symKey of symbolKeys) {
    cloneObj[symKey] = deepClone(source[symKey], hash)
  }

  return cloneObj
}

/**
 * 按指定字段配置对对象数组进行排序
 * @param {Array} array 待排序的对象数组
 * @param {Array} fields 排序字段配置数组，每个配置包含：
 * - field: 需要排序的字段名
 * - order?: 排序方向（'asc'升序/'desc'降序，默认为'asc'）
 * @returns {Array} 返回排序后的新数组（原数组不会被修改）
 */
export function sortByFields(array, fields) {
  return array.sort((a, b) => {
    for (const { field, order = 'asc' } of fields) {
      const valA = a[field]
      const valB = b[field]

      // 自动处理数字/字符串比较
      const compareResult = typeof valA === 'number' ? valA - valB : String(valA).localeCompare(String(valB))

      // 调整排序方向
      const adjustedResult = order === 'desc' ? -compareResult : compareResult

      if (adjustedResult !== 0) return adjustedResult
    }
    return 0
  })
}

/**
 *
 */
export function uniqueByField(arr, field) {
  const seen = new Set()
  return arr.filter(item => {
    const value = item[field]
    if (seen.has(value)) {
      return false
    } else {
      seen.add(value)
      return true
    }
  })
}

/**
 * 休眠
 * @param {Number} ms
 * @returns
 */
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * 节流函数
 * @param {Function} func 要执行的函数
 * @param {Number} delay 延迟时间（毫秒）
 * @returns {Function} 节流后的函数
 */
export function throttle(func, delay = 200) {
  let lastCall = 0
  let timeoutId

  return function (...args) {
    const now = Date.now()
    const remaining = delay - (now - lastCall)

    clearTimeout(timeoutId)

    if (remaining <= 0) {
      lastCall = now
      func.apply(this, args)
    } else {
      timeoutId = setTimeout(() => {
        lastCall = Date.now()
        func.apply(this, args)
      }, remaining)
    }
  }
}

/**
 * 防抖函数
 * @param {Function} func 要执行的函数
 * @param {Number} delay 延迟时间（毫秒）
 * @returns {Function} 防抖后的函数
 */
export function debounce(func, delay = 200) {
  let timeoutId

  return function (...args) {
    clearTimeout(timeoutId)

    timeoutId = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

/**
 * 生成一个 UUID (通用唯一识别码)
 *
 * 生成符合 RFC 4122 标准的 UUID v4：
 * 1. 首先尝试使用现代浏览器提供的 crypto.randomUUID()
 * 2. 如果不可用，则使用 crypto.getRandomValues() 手动生成
 * 3. 如果仍不可用，最后基于时间戳和随机数的兼容生成
 *
 * @returns {string} 格式为 xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx 的 UUID 字符串
 */
export function generateUUID() {
  // 优先使用现代浏览器原生的 UUID 生成方法
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  // 如果支持 crypto.getRandomValues，则使用它来生成符合规范的 UUID
  if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
    const bytes = new Uint8Array(16)
    crypto.getRandomValues(bytes)

    // 设置版本位：第 7 字节的高 4 位设为 0100（表示 UUID v4）
    bytes[7] = (bytes[7] & 0x0f) | 0x40
    // 设置变体位：第 8 字节的高 2 位设为 10（表示 RFC 4122 变体）
    bytes[8] = (bytes[8] & 0x3f) | 0x80

    // 将字节数组转换为十六进制字符串并按 UUID 格式分段
    let hex = Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('')

    return [hex.slice(0, 8), hex.slice(8, 12), hex.slice(12, 16), hex.slice(16, 20), hex.slice(20)].join('-')
  }

  // 最后的兼容方案：基于时间戳和随机数生成 UUID
  let d = new Date().getTime()
  let d2 = (typeof performance !== 'undefined' && performance.now && performance.now() * 1000) || 0
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = Math.random() * 16
    if (d > 0) {
      r = ((d + r) % 16) | 0
      d = Math.floor(d / 16)
    } else {
      r = ((d2 + r) % 16) | 0
      d2 = Math.floor(d2 / 16)
    }
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
}
