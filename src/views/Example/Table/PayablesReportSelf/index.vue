<script setup>
import ExcelJS from 'exceljs'
import { sortByFields } from '@/utils/utils.js'
import { downloadBlob } from '@/utils/download.js'
import data from './data.json'

defineOptions({ name: 'PayablesReportSelf' })

const REPORT_TYPE_MAP = {
  estimate: '预估',
  difference: '调整',
  real: '调整',
}
// 下载
function handleDownload() {
  let tHead = [
    { title: '账期', key: 'billMonth' },
    { title: '结算商', key: 'settlementSupplier' },
    { title: '出账租户', key: 'tenantName' },
    { title: '应用基线', key: 'appBaseline' },
    { title: '是否含税', key: 'isTaxIncludedStr' },
    { title: '税率', key: 'taxRate' },
    { title: '当月应付', key: 'currentPayable' },
    { title: '预付转回', key: 'prepaymentReversed' },
    { title: '应付总计', key: 'totalReceivable' },
    { title: '应付总计(不含税)', key: 'payableWithoutTax' },
    { title: '当月预付', key: 'currentPrepaid' },
  ]

  const listData = formatListdata(data)
  const wsList = generateSheet(listData, tHead)
  generateExcel(wsList)
}
// 调整原始数据
function formatListdata(row) {
  return row.map(item => {
    const prices = ['currentPayable', 'prepaymentReversed', 'totalReceivable', 'payableWithoutTax', 'currentPrepaid']
    prices.forEach(key => {
      item[key] = item[key].toFixed(2)
    })

    item.isTaxIncludedStr = item.isTaxIncluded ? '含税' : '不含税'
    item.taxRate = item.taxRate ? `${item.taxRate}%` : `${item.taxRate}`
    return item
  })
}
// 生成表格所需要的 Sheet 数据
function generateSheet(listData, tHead) {
  const tempObj = {
    estimate: listData.filter(item => item.reportType === 'estimate'),
    difference: listData.filter(item => item.reportType === 'difference' || item.reportType === 'real'),
  }

  const wsList = []

  for (const key in tempObj) {
    const tempList = sortByFields(tempObj[key], [
      { field: 'billMonth' },
      { field: 'settlementSupplier' },
      { field: 'tenantName' },
    ])
    const sheetData = getSheetData(tempList, tHead)
    const colsStyle = getColsStyle(tempList, tHead)
    const mergeRanges = calculateMergeRanges(tempList, tHead)

    wsList.push({
      reportType: key,
      sheetData,
      colsStyle,
      mergeRanges,
    })
  }
  return wsList
}

/**
 * 将原始数据列表转换为符合表格展示的二维数组结构
 * @param {Array} list - 原始数据列表
 * @param {Array} tHead - 表格列配置
 * @returns {Array} 二维数组结构，第一行为表头，后续每行为数据行
 */
function getSheetData(list, tHead) {
  const sheetData = []
  const tableHead = tHead.map(item => item.title)
  sheetData.push(tableHead)
  list.forEach(item => {
    const row = []
    tHead.forEach(headItem => {
      row.push(item[headItem.key])
    })
    sheetData.push(row)
  })
  return sheetData
}

/**
 * 计算表格各列的样式配置（主要用于动态宽度计算）
 * @param {Array} list 数据列表
 * @param {Array} tHead 表头配置数组
 * @returns {Array} colsStyle 返回各列的样式配置数组，每个元素包含列样式属性（如宽度）
 */
function getColsStyle(list, tHead) {
  const colsStyle = []
  list.forEach(item => {
    const tempObj = {}
    tHead.forEach((headItem, i) => {
      const { title, key } = headItem
      tempObj[title] = item[key] || ''
      // 此处计算当前列的合适宽度
      colsStyle[i] = computeColumnWidth(title, tempObj[title], colsStyle, i)
    })
  })
  return colsStyle
}

/**
 * 计算纵向合并单元格范围（settlementSupplier 和 tenantName 联动合并）
 * @param list - 数据列表
 * @param tHead - 表头配置
 * @returns {Array} 合并范围数组
 */
function calculateMergeRanges(list, tHead) {
  if (!list || list.length === 0) return []
  const ranges = []
  const supplierCol = tHead.findIndex(item => item.key === 'settlementSupplier')
  // 获取 tenantName 列索引（可能不存在）
  const tenantCol = tHead.findIndex(item => item.key === 'tenantName')
  if (supplierCol === -1) return ranges

  // 按 settlementSupplier 分组
  const supplierGroups = []
  let currentGroup = { start: 0, end: 0, value: list[0][tHead[supplierCol].key] }

  // 生成 supplier 分组
  for (let i = 1; i < list.length; i++) {
    if (list[i][tHead[supplierCol].key] === currentGroup.value) {
      currentGroup.end = i
    } else {
      supplierGroups.push(currentGroup)
      currentGroup = { start: i, end: i, value: list[i][tHead[supplierCol].key] }
    }
  }
  supplierGroups.push(currentGroup)

  // 处理每个 supplier 组
  supplierGroups.forEach(group => {
    // 1. 处理 settlementSupplier 合并
    const supplierMergeLength = group.end - group.start + 1
    if (supplierMergeLength >= 2) {
      ranges.push({
        s: { r: group.start + 2, c: supplierCol + 1 }, // 表头占一行，数据从 +2 行开始
        e: { r: group.end + 2, c: supplierCol + 1 },
      })
    }

    // 2. 仅当 tenantName 列存在时，处理 tenantName 合并
    if (tenantCol !== -1) {
      const tenantGroups = []
      let currentTenantGroup = {
        start: group.start,
        end: group.start,
        value: list[group.start][tHead[tenantCol].key],
      }

      // 生成 tenant 分组
      for (let i = group.start + 1; i <= group.end; i++) {
        if (list[i][tHead[tenantCol].key] === currentTenantGroup.value) {
          currentTenantGroup.end = i
        } else {
          tenantGroups.push(currentTenantGroup)
          currentTenantGroup = {
            start: i,
            end: i,
            value: list[i][tHead[tenantCol].key],
          }
        }
      }
      tenantGroups.push(currentTenantGroup)

      // 添加 tenant 合并范围（仅当 supplier 有合并时）
      if (supplierMergeLength >= 2) {
        tenantGroups.forEach(tenantGroup => {
          const tenantMergeLength = tenantGroup.end - tenantGroup.start + 1
          if (tenantMergeLength >= 2) {
            ranges.push({
              s: { r: tenantGroup.start + 2, c: tenantCol + 1 },
              e: { r: tenantGroup.end + 2, c: tenantCol + 1 },
            })
          }
        })
      }
    }
  })

  return ranges
}

/**
 * 使用 ExcelJS 生成并下载 Excel 文件
 * @param wsList 工作表数据列表
 */
async function generateExcel(wsList) {
  // 创建工作簿
  const workbook = new ExcelJS.Workbook()

  // 定义样式
  const styles = {
    header: {
      font: { bold: true, size: 12 },
      fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'bfbfbf' } },
      alignment: { horizontal: 'left', vertical: 'middle' },
      border: {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      },
    },
    cell: {
      font: { size: 12 },
      alignment: { horizontal: 'left', vertical: 'middle', wrapText: false },
      border: {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      },
    },
  }

  // 处理每个工作表
  wsList.forEach(item => {
    const worksheet = workbook.addWorksheet(REPORT_TYPE_MAP[item.reportType])
    // 添加数据
    worksheet.addRows(item.sheetData)
    // 应用样式
    applyExcelJSStyles(worksheet, item, styles)
  })

  // 导出文件
  const buffer = await workbook.xlsx.writeBuffer()
  const blob = new Blob([buffer], { type: 'application/octet-stream' })
  downloadBlob(blob, '应付报表（自用）.xlsx')
}

/**
 * 应用 ExcelJS 样式
 * @param worksheet 工作表对象
 * @param item 工作表数据
 * @param styles 样式模板
 */
function applyExcelJSStyles(worksheet, item, styles) {
  // 设置列宽
  if (item.colsStyle.length) {
    item.colsStyle.forEach((item, index) => {
      worksheet.getColumn(index + 1).width = item.wch
    })
  }

  // 合并单元格
  if (item.mergeRanges.length) {
    item.mergeRanges.forEach(range => {
      // 使用ExcelJS内置方法转换行列索引为单元格地址
      const startCell = worksheet.getRow(range.s.r).getCell(range.s.c)
      const endCell = worksheet.getRow(range.e.r).getCell(range.e.c)
      // 合并单元格
      worksheet.mergeCells(`${startCell._address}:${endCell._address}`)
    })
  }

  // 应用全局样式
  worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
    row.eachCell({ includeEmpty: false }, (cell, colNumber) => {
      // 表头样式
      if (rowNumber === 1) {
        cell.style = styles.header
      } else {
        cell.style = styles.cell
      }
    })
  })
}

//列最小宽度 n 字符
const COLUMN_MIN_WIDTH = 12
//列最大宽度 n 字符
const COLUMN_MAX_WIDTH = 50

function computeColumnWidth(headStr, contentStr, colsStyle, index) {
  let defaultStyle = colsStyle[index]
  let wch = COLUMN_MIN_WIDTH

  if (defaultStyle) {
    wch = defaultStyle.wch
  }

  /**
   * 考虑中文的情况长度*2，为了性能不去区分中英文
   * 为了格式更好看，预留2位字符
   */
  const headerLength = headStr.length * 2 + 2
  const contentLength = contentStr.length * 2 + 2

  //1.取 头/内容 更大的值
  let width = getLargeNum(headerLength, contentLength)
  //2.取 width/旧值 更大的值
  width = getLargeNum(width, wch)
  //3.取 width/最大宽度 更小的值
  width = getLittleNum(width, COLUMN_MAX_WIDTH)

  return {
    wch: width,
  }
}

function getLargeNum(x, y) {
  if (x > y) {
    return x
  } else {
    return y
  }
}

function getLittleNum(x, y) {
  if (x > y) {
    return y
  } else {
    return x
  }
}
</script>

<template>
  <div class="g-container">
    <el-card>
      <el-button @click="handleDownload">下载</el-button>
    </el-card>
  </div>
</template>

<style lang="less" scoped></style>
