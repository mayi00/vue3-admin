<script setup>
import { ElMessage } from 'element-plus'
import api from '@/api'
import { useElementHeight } from '@/hooks/useElement'
import NoticeFormDialog from './noticeFormDialog.vue'

defineOptions({ name: 'NoticeManage' })

// 搜索表单
const searchFormRef = ref(null)
const searchForm = reactive({ title: '', noticeType: '' })

function handleSearch() {
  table.value.currentPage = 1
  getList()
}
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
    { prop: 'title', label: '通知标题', minWidth: 200 },
    { prop: 'noticeType', label: '通知类型', minWidth: 100, slot: 'type' },
    { prop: 'startTime', label: '通知开始时间', minWidth: 180 },
    { prop: 'endTime', label: '通知结束时间', minWidth: 180 },
    { prop: 'createUser', label: '创建人', minWidth: 100 },
    { prop: 'status', label: '状态', minWidth: 80, slot: 'status' },
    { prop: 'operation', label: '操作', width: 180, align: 'center', fixed: 'right', slot: 'operation' }
  ]
})

// 序号
function getIndex(index) {
  return table.value.pageSize * (table.value.currentPage - 1) + index + 1
}

// 获取列表数据
function getList() {
  const params = { currentPage: table.value.currentPage, pageSize: table.value.pageSize }
  const data = { ...searchForm }
  table.value.loading = true
  api.sys.notice
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

// 新增/编辑相关
const formVisible = ref(false)
const isEditForm = ref(false)
const currentNoticeData = ref({})

// 显示新增表单
function handleAdd() {
  isEditForm.value = false
  currentNoticeData.value = {}
  formVisible.value = true
}

// 显示编辑表单
function handleEdit(row) {
  isEditForm.value = true
  currentNoticeData.value = { ...row }
  formVisible.value = true
}

// 新增/编辑提交成功
function handleFormSuccess() {
  formVisible.value = false
  currentNoticeData.value = {}
  getList()
}

// 删除相关
const deleteInfo = ref({
  ids: [],
  visible: false,
  loading: false
})
// 批量删除
function handleBatchDelete() {
  const rows = hyTableRef.value?.getSelectionRows()
  if (!rows.length) return ElMessage.warning('请选择数据')
  deleteInfo.value.ids = rows.map(item => item.id)
  deleteInfo.value.visible = true
}
// 删除
async function handleDeleteConfirm(row) {
  await api.sys.notice.delete({ ids: [row.id] })
  ElMessage({ type: 'success', message: '删除成功' })
  getList()
}
// 批量删除确认
async function handleBatchDeleteConfirm() {
  deleteInfo.value.loading = true
  try {
    await api.sys.notice.delete({ ids: deleteInfo.value.ids })
    ElMessage({ type: 'success', message: '删除成功' })
    deleteInfo.value.visible = false
    deleteInfo.value.loading = false
    getList()
  } finally {
    deleteInfo.value.loading = false
  }
}
// 删除取消
function handleDeleteCancel() {
  deleteInfo.value.visible = false
  deleteInfo.value.ids = []
}

// 初始化加载数据
getList()
</script>

<template>
  <div class="g-container">
    <el-card shadow="hover" body-style="padding-bottom: 0">
      <el-form ref="searchFormRef" :model="searchForm" :label-width="100">
        <el-row>
          <el-col :span="8">
            <el-form-item label="通知标题" prop="title">
              <el-input v-model="searchForm.title" placeholder="请输入通知标题" maxlength="50" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="通知类型" prop="noticeType">
              <el-select v-model="searchForm.noticeType" placeholder="请选择通知类型" clearable>
                <el-option label="通知" value="1"></el-option>
                <el-option label="公告" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="pl-[10px]">
            <el-button type="primary" @click="handleSearch">查询</el-button>
            <el-button @click="handleReset">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <el-card shadow="hover" style="margin-top: 10px">
      <div class="mb-[10px]">
        <el-button type="primary" @click="handleAdd">新增</el-button>
        <el-button type="danger" @click="handleBatchDelete">批量删除</el-button>
      </div>

      <HyTable
        ref="hyTableRef"
        :height="tableHeight"
        :loading="table.loading"
        :data="table.data"
        :columns="table.columns"
        :total="table.total"
        @update:currentPage="handleUpdateCurrentPage"
        @update:pageSize="handleUpdatePageSize"
      >
        <template #index="{ index }">{{ getIndex(index) }}</template>
        <template #type="{ row }">
          {{ row.noticeType === '1' ? '通知' : '公告' }}
        </template>
        <template #status="{ row }">
          <el-tag :type="row.status === '1' ? 'success' : 'danger'" effect="dark">
            {{ row.status === '1' ? '启用' : '禁用' }}
          </el-tag>
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
      </HyTable>
    </el-card>

    <!-- 新增/编辑对话框 -->
    <NoticeFormDialog
      v-model:visible="formVisible"
      :is-edit="isEditForm"
      :notice-data="currentNoticeData"
      @success="handleFormSuccess"
    />

    <HyConfirmDialog
      :visible="deleteInfo.visible"
      title="批量删除"
      :loading="deleteInfo.loading"
      confirmBtnType="danger"
      @confirm="handleBatchDeleteConfirm"
      @cancel="handleDeleteCancel"
    />
  </div>
</template>

<style lang="less" scoped></style>
