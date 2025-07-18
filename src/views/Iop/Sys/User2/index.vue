<script setup>
import ioplifeAPI from '@/api/ioplife'
import { downloadBlob } from '@/utils/download.js'

defineOptions({ name: 'User2' })

const searchFormRef = ref(null)
const searchForm = ref({ name: '', loginId: '', status: '', roleName: '', orgCodes: [] })
const baseTableRef = ref(null)
const table = ref({
  data: [],
  loading: false,
  currentPage: 1,
  pageSize: 20,
  pageCount: 0,
  total: 0,
})
const columns = ref([
  { type: 'selection', width: 50 },
  { label: '序号', type: 'index', width: 100, slot: 'index' },
  { label: '用户名', prop: 'name', minWidth: 100 },
  { label: '登录账号', prop: 'loginId', minWidth: 100 },
  { label: '角色名称', prop: 'roleNameInfos', minWidth: 100 },
  { label: '机构名称', prop: 'orgName', minWidth: 100 },
  { label: '渠道', prop: 'channelName', minWidth: 100 },
  { label: '用户状态', prop: 'status', minWidth: 100 },
  { label: '创建时间', prop: 'createTime', minWidth: 100 },
])

handleSearch()
function handleSearch() {
  table.value.currentPage = 1
  getList()
}
function handleReset() {
  searchFormRef.value.resetFields()
}

function handleSelect(select) {
  console.log('handleSelect', select)
}
function handleSelectAll(selects) {
  console.log('handleSelectAll', selects)
}
function handleSelectionChange(selections) {
  console.log('handleSelectionChange', selections)
}
function toggleAllSelection() {
  baseTableRef.value.toggleAllSelection()
}
function getColumns() {
  console.log(baseTableRef.value.getColumns())
}

function handlePageChange(page) {
  table.value.currentPage = page
  getList()
}
function handlePageSizeChange(size) {
  table.value.pageSize = size
  getList()
}

function getList() {
  const params = {
    pageNo: table.value.currentPage,
    pageSize: table.value.pageSize,
  }
  table.value.loading = true
  ioplifeAPI.sys.user
    .queryPage(params, searchForm.value)
    .then(res => {
      table.value.data = res.list
      table.value.pageCount = res.totalPage
      table.value.total = res.total
    })
    .finally(() => {
      table.value.loading = false
    })
}

// 获取表格序号
function getIndex(index) {
  return table.value.pageSize * (table.value.currentPage - 1) + index + 1
}

// 模板下载
function handleDownloadTemplate() {
  ioplifeAPI.sys.user
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
    <el-card shadow="never" body-style="padding-bottom: 0">
      <el-form ref="searchFormRef" :model="searchForm" label-width="80px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="用户名称" prop="name">
              <el-input v-model="searchForm.name" clearable placeholder="请输入用户名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="登录账号" prop="loginId">
              <el-input v-model="searchForm.loginId" clearable placeholder="请输入登录账号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="角色名称" prop="roleName">
              <el-input v-model="searchForm.roleName" clearable placeholder="请输入角色名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="分公司" prop="orgCodes">
              <el-input v-model="searchForm.orgCodes" clearable placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="中支" prop="orgCodes">
              <el-input v-model="searchForm.orgCodes" clearable placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="用户状态" prop="status">
              <el-input v-model="searchForm.status" clearable placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="padding-left: 10px">
            <el-button type="primary" @click="handleSearch">查询</el-button>
            <el-button @click="handleReset">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card shadow="never" style="margin-top: 10px">
      <el-button @click="handleDownloadTemplate">模板下载</el-button>
      <el-button @click="toggleAllSelection">toggleAllSelection</el-button>
      <el-button @click="getColumns">getColumns</el-button>
      <BaseTable
        ref="baseTableRef"
        :height="table.height"
        :loading="table.loading"
        :data="table.data"
        :columns="columns"
        :defaultPageSize="20"
        :total="table.total"
        :page-count="table.pageCount"
        @select="handleSelect"
        @select-all="handleSelectAll"
        @selection-change="handleSelectionChange"
        @update:currentPage="handlePageChange"
        @update:pageSize="handlePageSizeChange"
      >
        <template #index="{ index }">{{ getIndex(index) }}</template>
      </BaseTable>
    </el-card>
  </div>
</template>

<style lang="less" scoped></style>
