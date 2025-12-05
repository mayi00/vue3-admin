<script setup>
import { ElMessage } from 'element-plus'

import api from '@/api'
import { getRandomInt, sleep } from '@/utils/utils'
import { getDictList, getDictLabel } from '@/tools/tools'
import { useElementHeight } from '@/hooks/useElement'

import UserFormDialog from './userFormDialog.vue'

defineOptions({ name: 'UserManage' })

const searchFormRef = ref(null)
const searchForm = ref({ name: '', account: '', status: '1', roleName: '' })

function handleSearch() {
  table.value.currentPage = 1
  getList()
}
function handleReset() {
  searchFormRef.value.resetFields()
  handleSearch()
}

// 动态设置表格高度
const { elementHeight: tableHeight } = useElementHeight({
  offsetTop: 193 + 122
})
const baseTableRef = ref(null)
const table = ref({
  loading: false,
  currentPage: 1,
  pageSize: 20,
  total: 0,
  data: [],
  columns: [
    { type: 'selection', width: 50 },
    { type: 'index', label: '序号', minWidth: 60, slot: 'index' },
    { prop: 'avatar', label: '头像', slot: 'avatar' },
    { prop: 'account', label: '帐号', minWidth: 100 },
    { prop: 'name', label: '姓名', minWidth: 100 },
    { prop: 'roleName', label: '角色', minWidth: 120, slot: 'roleName' },
    { prop: 'gender', label: '性别', minWidth: 60, slot: 'gender' },
    { prop: 'status', label: '状态', minWidth: 70, slot: 'status' },
    { prop: 'mobile', label: '手机', minWidth: 120 },
    { prop: 'email', label: '电子邮箱', minWidth: 120 },
    { prop: 'operation', label: '操作', width: 120, align: 'center', fixed: 'right', slot: 'operation' }
  ]
})
const selectedRows = ref([])
// 获取表格序号
function getIndex(index) {
  return table.value.pageSize * (table.value.currentPage - 1) + index + 1
}
// 获取列表数据
function getList() {
  const params = { currentPage: table.value.currentPage, pageSize: table.value.pageSize }
  const data = { ...searchForm.value }
  table.value.loading = true
  api.sys.user
    .list(params, data)
    .then(res => {
      table.value.data = res.data.list
      table.value.total = res.data.total
    })
    .catch(() => {
      table.value.data = []
      table.value.total = 0
    })
    .finally(() => {
      table.value.loading = false
    })
}
function handleUpdateCurrentPage(page) {
  table.value.currentPage = page
  getList()
}
function handleUpdatePageSize(size) {
  table.value.pageSize = size
  getList()
}
// 选中单行
function handleSelect(selection) {
  selectedRows.value = selection
}
// 全选
function handleSelectAll(selection) {
  selectedRows.value = selection
}
function handleSelectionChange(selection) {
  console.log('handleSelectionChange', selection)
}

// 新增/编辑相关
const userFormVisible = ref(false)
const isEditForm = ref(false)
const currentUserData = ref({})
// 显示新增表单
function handleAdd() {
  isEditForm.value = false
  currentUserData.value = {}
  userFormVisible.value = true
}
// 显示编辑表单
function handleEdit(row) {
  isEditForm.value = true
  currentUserData.value = { ...row }
  userFormVisible.value = true
}
// 表单提交成功回调
function handleFormSuccess() {
  getList()
}
// 下载
function handleDownload() {
  const rows = baseTableRef.value?.getSelectionRows()
  if (!rows.length) return ElMessage.warning('请选择数据')
  console.log('handleDownload', rows)
  ElMessage.info('下载')
}
function handleBatchImport() {
  ElMessage.info('批量导入')
}
function handleDownloadTemplate() {
  ElMessage.info('下载模板')
}
// 批量删除
function handleBatchDelete() {
  const rows = baseTableRef.value?.getSelectionRows()
  if (!rows.length) return ElMessage.warning('请选择数据')
  deleteInfo.value.ids = rows.map(item => item.id)
  deleteInfo.value.title = '批量删除'
  deleteInfo.value.visible = true
}

const deleteInfo = ref({
  ids: [],
  title: '删除',
  visible: false,
  loading: false
})
// 删除
async function handleDeleteConfirm(row) {
  await api.sys.user.delete({ id: [row.id] })
  ElMessage({ type: 'success', message: '删除成功' })
  getList()
}
async function handleBatchDeleteConfirm() {
  deleteInfo.value.loading = true
  try {
    await api.sys.user.delete({ id: deleteInfo.value.ids })
    ElMessage({ type: 'success', message: '删除成功' })
    deleteInfo.value.visible = false
    deleteInfo.value.loading = false
    getList()
  } finally {
    deleteInfo.value.loading = false
  }
}
function handleDeleteCancel() {
  deleteInfo.value.visible = false
  deleteInfo.value.ids = []
}

handleSearch()
</script>

<template>
  <div class="g-container">
    <el-card shadow="hover" body-style="padding-bottom: 0">
      <el-form ref="searchFormRef" :model="searchForm" label-width="80px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="用户名称" prop="name">
              <el-input v-model="searchForm.name" placeholder="请输入用户名称" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="登录账号" prop="account">
              <el-input v-model="searchForm.account" placeholder="请输入登录账号" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="用户状态" prop="status">
              <el-select v-model="searchForm.status" placeholder="请选择用户状态" clearable>
                <el-option
                  v-for="item in getDictList('USER_STATUS')"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="角色名称" prop="roleName">
              <el-input v-model="searchForm.roleName" placeholder="请输入角色名称" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="角色名称" prop="roleName">
              <el-input v-model="searchForm.roleName" placeholder="请输入角色名称" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="padding-left: 10px">
            <el-button type="primary" @click="handleSearch">查询</el-button>
            <el-button @click="handleReset">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card shadow="hover" style="margin-top: 10px">
      <div>
        <el-button type="primary" @click="handleAdd">新增</el-button>
        <el-button type="primary" @click="handleDownload">下载</el-button>
        <el-button type="default" @click="handleBatchImport">批量导入</el-button>
        <el-button type="default" @click="handleDownloadTemplate">下载模板</el-button>
        <el-button type="danger" @click="handleBatchDelete">批量删除</el-button>
      </div>
      <BaseTable
        ref="baseTableRef"
        :height="tableHeight"
        :loading="table.loading"
        :data="table.data"
        :columns="table.columns"
        :defaultPageSize="20"
        :total="table.total"
        @select="handleSelect"
        @select-all="handleSelectAll"
        @selection-change="handleSelectionChange"
        @update:currentPage="handleUpdateCurrentPage"
        @update:pageSize="handleUpdatePageSize"
      >
        <template #index="{ index }">{{ getIndex(index) }}</template>
        <template #avatar="{ row }">
          <el-avatar :src="row.avatar" style="width: 32px; height: 32px"></el-avatar>
        </template>
        <template #roleName="{ row, column }">
          <el-popover :title="column.label" :content="row.roleName.join(',')" placement="top">
            <template #reference>
              <div class="g-multi-ellipsis">{{ row.roleName.join(',') || '-' }}</div>
            </template>
          </el-popover>
        </template>
        <template #status="{ row }">
          <el-tag :type="row.status === '1' ? 'success' : 'danger'" effect="dark">
            {{ getDictLabel('USER_STATUS', row.status) || row.status }}
          </el-tag>
        </template>
        <template #gender="{ row }">
          {{ getDictLabel('GENDER', row.gender) || row.gender }}
        </template>
        <template #operation="{ row }">
          <el-button type="primary" link size="small" @click="handleEdit(row)">编辑</el-button>
          <el-popconfirm
            title="请确认是否删除？"
            width="160"
            placement="top"
            confirm-button-type="danger"
            @confirm="handleDeleteConfirm(row)"
          >
            <template #reference>
              <el-button type="danger" link size="small">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </BaseTable>
    </el-card>

    <UserFormDialog
      v-model:visible="userFormVisible"
      :is-edit="isEditForm"
      :user-data="currentUserData"
      @success="handleFormSuccess"
    />

    <BaseConfirmDialog
      :visible="deleteInfo.visible"
      :title="deleteInfo.title"
      :loading="deleteInfo.loading"
      confirmBtnType="danger"
      @confirm="handleBatchDeleteConfirm"
      @cancel="handleDeleteCancel"
    />
  </div>
</template>

<style lang="less" scoped></style>
