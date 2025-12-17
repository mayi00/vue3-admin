import * as XLSX from 'xlsx'

// 列宽配置常量
const COLUMN_MIN_WIDTH = 8
const COLUMN_MAX_WIDTH = 50

/**
 * 计算列宽
 * @param {Array} data - 导出数据
 * @param {Array} columnKeys - 列名数组
 * @returns {Array} 列宽配置数组
 */
function calculateColumnWidths(data, columnKeys) {
  if (!data || !data.length || !columnKeys || !columnKeys.length) {
    return []
  }

  // 初始化各列最大宽度为最小宽度
  const columnMaxWidths = columnKeys.map(() => COLUMN_MIN_WIDTH)

  // 计算每列的最大宽度
  data.forEach(row => {
    columnKeys.forEach((key, index) => {
      const content = row[key] !== undefined && row[key] !== null ? String(row[key]) : ''
      // 考虑中文显示需要，字符长度*2
      const contentWidth = content.length * 2 + 2 // 加2为了留边距
      columnMaxWidths[index] = Math.max(columnMaxWidths[index], contentWidth)
    })
  })

  // 确保不超过最大宽度
  return columnMaxWidths.map(width => ({
    wch: Math.min(width, COLUMN_MAX_WIDTH)
  }))
}

/**
 * 导出数据到Excel文件
 * @param {Object} options - 导出配置选项
 * @param {Array} options.data - 要导出的数据数组（已处理好的JSON格式）
 * @param {string} options.filename - 导出文件名，默认"导出数据"
 * @param {string} options.sheetName - 工作表名称，默认"数据"
 * @param {Array} options.columnWidths - 列宽配置数组，可选
 * @param {boolean} options.autoWidth - 是否自动计算列宽，默认 true
 * @param {Array} options.merges - 合并单元格配置，可选
 */
export function exportToExcel(options) {
  const { data, filename = '导出数据', sheetName = '数据', columnWidths = [], autoWidth = true, merges = [] } = options

  // 创建工作簿
  const workbook = XLSX.utils.book_new()

  // 将数据转换为工作表
  const worksheet = XLSX.utils.json_to_sheet(data)

  // 设置合并单元格
  if (merges && merges.length) {
    worksheet['!merges'] = merges
  }

  // 设置列宽
  if (autoWidth) {
    // 获取所有列名
    const columnKeys = Object.keys(data[0])
    worksheet['!cols'] = calculateColumnWidths(data, columnKeys)
  } else if (columnWidths && columnWidths.length) {
    worksheet['!cols'] = columnWidths
  }

  // 将工作表添加到工作簿
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName)

  // 导出文件
  XLSX.writeFile(workbook, `${filename}.xlsx`)

  return true
}
