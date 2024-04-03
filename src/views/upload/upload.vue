<script setup>
import { ref } from 'vue'
// import XLSX from 'xlsx'

defineOptions({
  name: 'Upload'
})

const accept = ref('.xls,.xlsx')

function handleBeforeUpload(val) {
  console.log('上传文件', val)
  readFile(val).then(res => {
    console.log(res)
  })
  // let formData = new FormData()
  // formData.append('file', val)
  // console.log(val, formData)
  // var wb = XLSX.read(formData, { type: 'binary', cellDates: true })
  // console.log(wb)
  return false
}

function readFile(file) {
  return new Promise(resolve => {
    let reader = new FileReader()
    reader.readAsBinaryString(file)
    reader.onload = ev => {
      resolve(ev.target.result)
    }
  })
}
</script>

<template>
  <div class="container">
    <el-upload drag action="" :accept="accept" :before-upload="handleBeforeUpload">
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        Drop file here or
        <em>click to upload</em>
      </div>
    </el-upload>
  </div>
</template>

<style lang="less" scoped></style>
