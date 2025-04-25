/**
 * 存储单位转换器
 * @param {number} value - 需要转换的数值
 * @param {string} fromUnit - 原始单位 (KB/MB/GB)
 * @param {string} toUnit - 目标单位 (KB/MB/GB)
 * @param {number} [precision=2] - 保留小数位数
 * @returns {Object} 包含转换后数值和单位的对象
 */
export function convertStorageUnits(value, fromUnit, toUnit, precision = 2) {
  const units = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB', 'BB']
  const unitMap = {
    KB: 1,
    MB: 2,
    GB: 3,
    TB: 4,
    PB: 5,
    EB: 6,
    ZB: 7,
    YB: 8,
    BB: 9,
  }

  // 参数校验
  if (!units.includes(fromUnit) || !units.includes(toUnit)) {
    throw new Error('Invalid unit, supported units: KB, MB, GB')
  }

  // 计算单位指数差
  const exponent = unitMap[fromUnit] - unitMap[toUnit]

  // 执行转换计算
  const result = value * Math.pow(1024, exponent)

  return {
    value: Number(result.toFixed(precision)),
    unit: toUnit,
  }
}

/**
 * 存储单位转换器，自动选择相匹配的单位
 * @param {number} value - 需要转换的数值
 * @param {string} fromUnit - 原始单位 (KB/MB/GB)
 * @param {number} [precision=2] - 保留小数位数
 * @returns
 */
export function autoConvertUnits(value, fromUnit, precision = 2) {
  const units = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB', 'BB']
  const initialIndex = units.indexOf(fromUnit)

  // 无效单位直接返回原始值
  if (initialIndex === -1) {
    const safePrecision = Math.max(0, Math.min(precision, 20))
    return {
      value: Number(value.toFixed(safePrecision)),
      unit: fromUnit,
    }
  }

  let currentValue = value
  let currentIndex = initialIndex
  const safePrecision = Math.max(0, Math.min(precision, 20))

  // 通过索引增量替代重复查找单位
  while (currentValue >= 1024 && currentIndex < units.length - 1) {
    currentValue /= 1024
    currentIndex++
  }

  return {
    value: Number(currentValue.toFixed(safePrecision)),
    unit: units[currentIndex],
  }
}
