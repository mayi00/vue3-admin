<script setup>
import ioplifeAPI from '@/api/ioplife'
import { downloadBlob } from '@/utils/download.js'

defineOptions({ name: 'User' })

// 模板下载
function handleDownloadTemplate() {
  ioplifeAPI.iopsys
    .download()
    .then(res => {
      downloadBlob(res, '用户信息模板.xlsx')
    })
    .catch(err => {
      console.log(err)
    })
}
</script>

<template>
  <div class="g-container">
    <el-card>
      <el-button @click="handleDownloadTemplate">模板下载</el-button>
    </el-card>
  </div>
</template>

<style lang="less" scoped></style>
