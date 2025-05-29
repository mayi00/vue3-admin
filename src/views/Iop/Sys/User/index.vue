<script setup>
import ioplifeAPI from '@/api/ioplife'
import { downloadBlob } from '@/utils/download.js'

defineOptions({ name: 'User' })

const searchFormRef = ref(null)
const searchForm = ref({ name: '', loginId: '', status: '', roleName: '', orgCodes: [] })
const table = ref({
  data: [],
  loading: false,
  currentPage: 1,
  pageSize: 10,
  pageCount: 0,
  total: 0,
})

function handleSearch() {
  table.value.currentPage = 1
  getList()
}
function handleReset() {
  searchFormRef.value.resetFields()
}
function handlePageChange() {
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
      <el-table :data="table.data" v-loading="table.loading" stripe>
        <el-table-column type="index" label="序号" :index="getIndex" width="80" />
        <el-table-column prop="name" label="用户姓名" min-width="100"></el-table-column>
        <el-table-column prop="loginId" label="登录账号" min-width="100"></el-table-column>
        <el-table-column prop="roleNameInfos" label="角色名称" min-width="100"></el-table-column>
        <el-table-column prop="orgName" label="机构名称" min-width="100"></el-table-column>
        <el-table-column prop="channelName" label="渠道" min-width="100"></el-table-column>
        <el-table-column prop="status" label="用户状态" min-width="100"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" min-width="100"></el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="table.currentPage"
        v-model:page-size="table.pageSize"
        :page-size="table.pageSize"
        :page-count="table.pageCount"
        :page-sizes="[10, 20, 50, 100]"
        :total="table.total"
        background
        layout="prev, pager, next, jumper,  total, sizes"
        @change="handlePageChange"
      />
    </el-card>
  </div>
</template>

<style lang="less" scoped></style>
