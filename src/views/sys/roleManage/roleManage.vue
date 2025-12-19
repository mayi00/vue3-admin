<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { debounce } from 'lodash-es'
import api from '@/api'
import { getDictList, getDictLabel } from '@/tools/tools'
import { useElementHeight } from '@/hooks/useElement'
import RoleFormDialog from './roleFormDialog.vue'

const searchFormRef = ref(null)
const searchForm = ref({ roleName: '', status: '' })
const handleSearch = debounce(() => {
  table.value.currentPage = 1
  getList()
}, 300)
function handleReset() {
  searchFormRef.value.resetFields()
  handleSearch()
}

// 动态设置表格高度
const { elementHeight: tableHeight } = useElementHeight({ offset: 275 })
const baseTableRef = ref(null)
const table = ref({
  loading: false,
  currentPage: 1,
  pageSize: 5,
  total: 0,
  data: [],
  columns: [
    { type: 'selection', width: 50 },
    { type: 'index', label: '序号', minWidth: 60, slot: 'index' },
    { prop: 'roleName', label: '角色名称', minWidth: 150 },
    { prop: 'roleCode', label: '角色编码', minWidth: 150 },
    { prop: 'description', label: '角色描述', minWidth: 200, slot: 'description' },
    { prop: 'status', label: '状态', minWidth: 70, slot: 'status' },
    { prop: 'operation', label: '操作', width: 100, align: 'center', fixed: 'right', slot: 'operation' }
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
  api.sys.role
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

// 删除相关
const deleteInfo = ref({
  ids: [],
  title: '删除',
  visible: false,
  loading: false
})
// 批量删除
function handleBatchDelete() {
  const rows = baseTableRef.value?.getSelectionRows()
  if (!rows.length) return ElMessage.warning('请选择数据')
  deleteInfo.value.ids = rows.map(item => item.id)
  deleteInfo.value.title = '批量删除'
  deleteInfo.value.visible = true
}
// 单个删除确认
async function handleDeleteConfirm(row) {
  await api.sys.role.delete({ ids: [row.id] })
  ElMessage({ type: 'success', message: '删除成功' })
  getList()
}
// 批量删除确认
async function handleBatchDeleteConfirm() {
  deleteInfo.value.loading = true
  try {
    await api.sys.role.delete({ ids: deleteInfo.value.ids })
    ElMessage({ type: 'success', message: '删除成功' })
    deleteInfo.value.visible = false
    deleteInfo.value.loading = false
    getList()
  } finally {
    deleteInfo.value.loading = false
  }
}
// 取消删除
function handleDeleteCancel() {
  deleteInfo.value.visible = false
  deleteInfo.value.ids = []
}

// 角色表单对话框
const roleForm = ref({})
const roleDialog = ref({
  visible: false,
  isEdit: false
})

// 打开新增角色对话框
function handleAddRole() {
  roleDialog.value.isEdit = false
  roleForm.value = {}
  roleDialog.value.visible = true
}

// 打开编辑角色对话框
function handleEditRole(row) {
  roleDialog.value.isEdit = true
  roleForm.value = { ...row }
  roleDialog.value.visible = true
}

// 角色表单提交成功
function handleRoleFormSuccess() {
  roleDialog.value.visible = false
  getList()
}

// 初始化获取列表数据
getList()
</script>

<template>
  <div class="g-container">
    <el-card shadow="hover" body-style="padding-bottom: 0">
      <el-form ref="searchFormRef" :model="searchForm" label-width="80px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="角色名称" prop="roleName">
              <el-input v-model="searchForm.roleName" placeholder="请输入角色名称" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="状态" prop="status">
              <el-select v-model="searchForm.status" placeholder="请选择状态" clearable>
                <el-option
                  v-for="item in getDictList('ROLE_STATUS')"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
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
        <el-button type="primary" @click="handleAddRole">新增角色</el-button>
        <el-button type="danger" @click="handleBatchDelete">批量删除</el-button>
      </div>
      <BaseTable
        ref="baseTableRef"
        :height="tableHeight"
        :loading="table.loading"
        :data="table.data"
        :columns="table.columns"
        :defaultPageSize="5"
        :pageSizes="[5, 10, 20, 50, 100]"
        :total="table.total"
        @select="handleSelect"
        @select-all="handleSelectAll"
        @update:currentPage="handleUpdateCurrentPage"
        @update:pageSize="handleUpdatePageSize"
      >
        <template #index="{ index }">{{ getIndex(index) }}</template>
        <template #description="{ row }">
          <el-popover placement="top" :title="'角色描述'" :content="row.description" trigger="hover">
            <template #reference>
              <div class="g-multi-ellipsis">{{ row.description }}</div>
            </template>
          </el-popover>
        </template>
        <template #status="{ row }">
          <el-tag :type="row.status === '1' ? 'success' : 'danger'" effect="dark">
            {{ getDictLabel('ROLE_STATUS', row.status) || row.status }}
          </el-tag>
        </template>
        <template #operation="{ row }">
          <el-button type="primary" link size="small" @click="handleEditRole(row)">编辑</el-button>
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

    <BaseConfirmDialog
      :visible="deleteInfo.visible"
      :title="deleteInfo.title"
      :loading="deleteInfo.loading"
      confirmBtnType="danger"
      @confirm="handleBatchDeleteConfirm"
      @cancel="handleDeleteCancel"
    />

    <!-- 角色表单对话框 -->
    <RoleFormDialog
      v-model:visible="roleDialog.visible"
      :is-edit="roleDialog.isEdit"
      :role-data="roleForm"
      @success="handleRoleFormSuccess"
    />
  </div>
</template>

<style lang="less" scoped></style>
