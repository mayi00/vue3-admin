<script setup>
import * as XLSX from 'xlsx'

defineOptions({
  name: 'Upload'
})

const accept = '.xls,.xlsx'

// 学生的课时数据所在的行
const rowList = [
  3, 4, 5, 6, 7, 8, 11, 12, 13, 14, 15, 16, 19, 20, 21, 22, 23, 24, 27, 28, 29, 30, 31, 32, 35, 36, 37, 38, 39, 40, 43,
  44, 45, 46, 47, 48
]

async function getExcelData(file) {
  const excelData = await readExcel(file)
  console.log(excelData)

  const arr = []

  // 从原始数据中把学生姓名和课时过滤出来
  excelData.forEach(item => {
    if (rowList.includes(item.__rowNum__)) {
      for (const key in item) {
        if (key.includes('EMPTY')) {
          arr.push(item[key])
        }
      }
    }
  })

  console.log(arr)

  const resultList = []

  arr.forEach((item, i) => {
    if (i % 2 === 0) {
      const hasCurrent = resultList.find(resultItem => {
        if (resultItem.name === item) {
          resultItem.time.push(arr[i + 1])
        }
        return resultItem.name === item
      })
      if (!hasCurrent) {
        const info = {
          name: item,
          time: [arr[i + 1]],
          totol: 0
        }
        resultList.push(info)
      }
    }
  })

  console.log(resultList)

  let count = 0
  resultList.forEach(item => {
    item.time.forEach(timeItem => {
      item.totol += timeItem
    })
    count += item.totol
  })
  console.log(count)

  const downloadData = []
  resultList.forEach((item, i) => {
    const obj = {
      序号: String(i + 1),
      姓名: item.name,
      总计: item.totol
    }
    item.time.forEach((timeItem, j) => {
      obj[`第${j + 1}节`] = timeItem
    })
    downloadData.push(obj)
  })
  const obj = {
    序号: '',
    姓名: '',
    总计: count
  }
  downloadData.push(obj)
  toExcel(downloadData)
}

// 读取excel
function readExcel(file) {
  return new Promise(resolve => {
    const fileReader = new FileReader()
    fileReader.onload = event => {
      const binaryStr = event.target.result
      const workbook = XLSX.read(binaryStr, { type: 'binary' })
      console.log(workbook)

      // 解析第一个工作表
      const worksheet = workbook.Sheets[workbook.SheetNames[0]]
      const data = XLSX.utils.sheet_to_json(worksheet)

      resolve(data)
    }
    fileReader.readAsBinaryString(file)
  })
}

// 下载excel
function toExcel(val) {
  const fileName = '下载.xlsx'
  const sheetName = 'Sheet 1'

  const excel = XLSX.utils.book_new()
  const data = XLSX.utils.json_to_sheet(val)

  XLSX.utils.book_append_sheet(excel, data, sheetName)
  XLSX.writeFile(excel, fileName)
}

const dialogVisible = ref(false)

// 打开上传弹框
function handelUploadDialogOpen() {
  dialogVisible.value = true
}
// 关闭弹框
function handleUploadDialogClose() {
  dialogVisible.value = false
}
// 确认上传
function handleUploadConfirm(file) {
  getExcelData(file)
  dialogVisible.value = false
}
</script>

<template>
  <div class="container">
    <el-card>
      <el-button type="primary" @click="handelUploadDialogOpen">上传文件</el-button>
    </el-card>

    <UploadDialog
      :dialogVisible="dialogVisible"
      :accept="accept"
      @on-confirm="handleUploadConfirm"
      @on-cancel="handleUploadDialogClose"
    />
  </div>
</template>

<style lang="less" scoped>
.container {
  padding: 16px;
  width: 100%;
  height: 100%;
}
</style>
