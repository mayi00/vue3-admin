<script setup>
import { ElMessage } from 'element-plus'
import { debounce } from 'lodash-es'
import api from '@/api'
import { getDictList, getDictLabel } from '@/tools/tools'
import { useElementHeight } from '@/hooks/useElement'
import { exportToExcel } from '@/utils/tableUtils'
import { hasBtnPermission } from '@/directives/permission'
import { useStore } from '@/store'

import UserFormDialog from './userFormDialog.vue'
import UserRoleDialog from './userRoleDialog.vue'

defineOptions({ name: 'UserManage' })

const { userInfo } = storeToRefs(useStore().userStore)
const searchFormRef = ref(null)
const searchForm = ref({ name: '', account: '', gender: '', status: '', roleName: '' })
const handleSearch = debounce(() => {
  table.value.currentPage = 1
  getList()
}, 300)
function handleReset() {
  searchFormRef.value.resetFields()
  handleSearch()
}

// 动态设置表格高度
const { elementHeight: tableHeight } = useElementHeight({ offset: 325 })
const hyTableRef = ref(null)
const table = ref({
  loading: false,
  currentPage: 1,
  pageSize: 10,
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
    { prop: 'operation', label: '操作', width: 180, align: 'center', fixed: 'right', slot: 'operation' }
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
// 切换页码
function handleUpdateCurrentPage(page) {
  table.value.currentPage = page
  getList()
}
// 切换每页数量
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
// 新增/编辑提交成功
function handleUserFormSuccess() {
  userFormVisible.value = false
  currentUserData.value = {}
  getList()
}

const roleDialogVisible = ref(false)
function handleRole(row) {
  currentUserData.value = { ...row }
  roleDialogVisible.value = true
}
function handleRoleDialogSuccess() {
  roleDialogVisible.value = false
  currentUserData.value = {}
  getList()
}

// 下载
function handleDownload() {
  const rows = hyTableRef.value?.getSelectionRows()
  if (!rows.length) return ElMessage.warning('请选择数据')

  // 调用导出函数
  exportToExcel({
    data: generateExportData(rows),
    filename: '用户数据',
    sheetName: '用户数据'
  })
}

// 生成导出数据
function generateExportData(rows) {
  return rows.map((row, i) => ({
    序号: i + 1,
    帐号: row.account,
    姓名: row.name,
    角色: row.roleName.join('，'),
    性别: getDictLabel('GENDER', row.gender),
    状态: getDictLabel('SYS_ENABLED_STATUS', row.status),
    手机: row.mobile,
    电子邮箱: row.email
  }))
}

const downloadAllLoading = ref(false)
function handleDownloadAll() {
  const params = { currentPage: 1, pageSize: table.value.total }
  const data = { ...searchForm.value }
  downloadAllLoading.value = true
  api.sys.user
    .list(params, data)
    .then(res => {
      // 调用导出函数
      exportToExcel({
        data: generateExportData(res.data.list),
        filename: '全部用户数据',
        sheetName: '用户数据'
      })
    })
    .catch(() => {})
    .finally(() => {
      downloadAllLoading.value = false
    })
}

// 批量导入
const uploadInfo = ref({
  visible: false,
  loading: false
})
function handleBatchImport() {
  uploadInfo.value.visible = true
}
function handleBatchImportConfirm(fileList) {
  const fileData = new FormData()
  fileData.append('file', fileList[0])
  uploadInfo.value.loading = true
  api.sys.user.batchImport(fileData).then(res => {
    uploadInfo.value.loading = false
    uploadInfo.value.visible = false
    ElMessage.success('导入成功')
    getList()
  })
}
function handleDownloadTemplate() {
  ElMessage.info('下载模板')
}

// 删除相关
const deleteInfo = ref({
  ids: [],
  title: '删除',
  visible: false,
  loading: false
})
// 批量删除
function handleBatchDelete() {
  const rows = hyTableRef.value?.getSelectionRows()
  if (!rows.length) return ElMessage.warning('请选择数据')
  deleteInfo.value.ids = rows.map(item => item.id)
  deleteInfo.value.title = '批量删除'
  deleteInfo.value.visible = true
}
// 删除
async function handleDeleteConfirm({ id }) {
  await api.sys.user.delete({ ids: [id] })
  ElMessage({ type: 'success', message: '删除成功' })
  getList()
}
async function handleBatchDeleteConfirm() {
  deleteInfo.value.loading = true
  try {
    await api.sys.user.delete({ ids: deleteInfo.value.ids })
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

getList()
</script>

<template>
  <div class="g-container">
    <el-card shadow="hover" body-style="padding-bottom: 0">
      <el-form ref="searchFormRef" :model="searchForm" label-width="80px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="帐号" prop="account">
              <el-input v-model="searchForm.account" placeholder="请输入帐号" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="searchForm.name" placeholder="请输入姓名" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="性别" prop="gender">
              <el-select v-model="searchForm.gender" placeholder="请选择性别" clearable>
                <el-option
                  v-for="item in getDictList('GENDER')"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="用户状态" prop="status">
              <el-select v-model="searchForm.status" placeholder="请选择用户状态" clearable>
                <el-option
                  v-for="item in getDictList('SYS_ENABLED_STATUS')"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                ></el-option>
              </el-select>
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
      <div class="mb-[10px]">
        <el-button v-permission="'sys:user:add'" type="primary" @click="handleAdd">新增</el-button>
        <el-button v-permission="'sys:user:download'" type="primary" @click="handleDownload">批量下载</el-button>
        <el-button
          v-if="hasBtnPermission('sys:user:downloadAll') && userInfo.roleCodes.includes('superAdmin')"
          type="primary"
          @click="handleDownloadAll"
        >
          全部下载
        </el-button>
        <el-button v-permission="'sys:user:batchImport'" type="default" @click="handleBatchImport">
          批量导入
        </el-button>
        <el-button v-permission="'sys:user:downloadTemplate'" type="default" @click="handleDownloadTemplate">
          下载模板
        </el-button>
        <el-button v-permission="'sys:user:batchDelete'" type="danger" @click="handleBatchDelete">批量删除</el-button>
      </div>
      <HyTable
        ref="hyTableRef"
        :height="tableHeight"
        :loading="table.loading"
        :data="table.data"
        :columns="table.columns"
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
          <el-popover :title="column.label" :content="row.roleName.join('，')" placement="top">
            <template #reference>
              <div class="g-multi-ellipsis">{{ row.roleName.join('，') || '--' }}</div>
            </template>
          </el-popover>
        </template>
        <template #status="{ row }">
          <el-tag :type="row.status === 'ENABLED' ? 'success' : 'danger'" effect="dark">
            {{ getDictLabel('SYS_ENABLED_STATUS', row.status) || row.status }}
          </el-tag>
        </template>
        <template #gender="{ row }">
          {{ getDictLabel('GENDER', row.gender) || row.gender }}
        </template>
        <template #operation="{ row }">
          <el-button v-permission="'sys:user:edit'" type="primary" link size="small" @click="handleEdit(row)">
            编辑
          </el-button>
          <el-button v-permission="'sys:user:role'" type="primary" link size="small" @click="handleRole(row)">
            分配角色
          </el-button>
          <el-popconfirm
            title="请确认是否删除？"
            width="160"
            placement="top"
            confirm-button-type="danger"
            @confirm="handleDeleteConfirm(row)"
          >
            <template #reference>
              <el-button v-permission="'sys:user:delete'" type="danger" link size="small">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </HyTable>
    </el-card>

    <UserFormDialog
      v-model:visible="userFormVisible"
      :is-edit="isEditForm"
      :user-data="currentUserData"
      @success="handleUserFormSuccess"
    />

    <UserRoleDialog
      v-model:visible="roleDialogVisible"
      :user-data="currentUserData"
      @success="handleRoleDialogSuccess"
    />

    <HyUploadDialog
      v-model:visible="uploadInfo.visible"
      title="批量导入"
      :loading="uploadInfo.loading"
      limit="1"
      @confirm="handleBatchImportConfirm"
    />

    <HyConfirmDialog
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
