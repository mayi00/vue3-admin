<script setup>
import ioplifeAPI from '@/api/ioplife'
import { downloadBlob } from '@/utils/download.js'

defineOptions({ name: 'AgentWhite' })

getAgentWhiteList()

// 代理人白名单列表
function getAgentWhiteList() {
  const params = { pageNo: 1, pageSize: 10 }
  const data = { agentCode: '', branchTypeNo: '', comCode: '', whiteListType: '' }
  ioplifeAPI.oprdiff.agentWhiteList
    .queryPage(params, data)
    .then(res => {
      console.log('代理人白名单列表', res)
    })
    .catch(err => {
      console.log(err)
    })
}

// 模板下载
function handleDownloadTemplate() {
  ioplifeAPI.oprdiff.agentWhiteList
    .agentWhiteListTemplate()
    .then(res => {
      downloadBlob(res, '代理人白名单清单模板.xlsx')
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
