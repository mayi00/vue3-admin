<script setup>
import { ElMessage } from 'element-plus'
import { debounce } from 'lodash-es'
import api from '@/api'
import { useElementHeight } from '@/hooks/useElement'
import { getDictList, getDictLabel } from '@/tools/tools'

import DictTypeFormDialog from './dictTypeFormDialog.vue'

defineOptions({ name: 'DictType' })

const searchFormRef = ref(null)
const searchForm = ref({ dictLabel: '', dictValue: '', status: '' })
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
const hyTableRef = ref(null)
const table = ref({
  loading: false,
  currentPage: 1,
  pageSize: 10,
  total: 0,
  data: [],
  columns: [
    { type: 'index', label: '序号', minWidth: 60, slot: 'index' },
    { prop: 'dictLabel', label: '字典类型名称', minWidth: 150 },
    { prop: 'dictValue', label: '字典类型值', minWidth: 150 },
    { prop: 'status', label: '状态', minWidth: 70, slot: 'status' },
    { prop: 'operation', label: '操作', width: 120, align: 'center', fixed: 'right', slot: 'operation' }
  ]
})

// 获取表格序号
function getIndex(index) {
  return table.value.pageSize * (table.value.currentPage - 1) + index + 1
}

// 获取列表数据
function getList() {
  const params = { currentPage: table.value.currentPage, pageSize: table.value.pageSize }
  const data = { ...searchForm.value }
  table.value.loading = true
  api.sys.dict
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
const dictTypeFormVisible = ref(false)
const isEditForm = ref(false)
const currentDictTypeData = ref({})

// 显示新增表单
function handleAdd() {
  isEditForm.value = false
  currentDictTypeData.value = {}
  dictTypeFormVisible.value = true
}

// 显示编辑表单
function handleEdit(row) {
  isEditForm.value = true
  currentDictTypeData.value = { ...row }
  dictTypeFormVisible.value = true
}

// 新增/编辑提交成功
function handleDictTypeFormSuccess() {
  dictTypeFormVisible.value = false
  currentDictTypeData.value = {}
  getList()
}

// 删除
async function handleDeleteConfirm({ dictValue }) {
  await api.sys.dict.delete({ dictValue })
  ElMessage({ type: 'success', message: '删除成功' })
  getList()
}

getList()
</script>

<template>
  <div class="g-container">
    <el-card shadow="hover" body-style="padding-bottom: 0">
      <el-form ref="searchFormRef" :model="searchForm" label-width="100px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="字典类型名称" prop="dictLabel">
              <el-input v-model="searchForm.dictLabel" placeholder="请输入字典类型名称" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="字典类型值" prop="dictValue">
              <el-input v-model="searchForm.dictValue" placeholder="请输入字典类型值" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="状态" prop="status">
              <el-select v-model="searchForm.status" placeholder="请选择状态" clearable>
                <el-option
                  v-for="item in getDictList('SYS_ENABLED_STATUS')"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
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
        <el-button type="primary" @click="handleAdd">新增</el-button>
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
        <template #status="{ row }">
          <el-tag :type="row.status === 'ENABLED' ? 'success' : 'danger'" effect="dark">
            {{ getDictLabel('SYS_ENABLED_STATUS', row.status) }}
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

    <DictTypeFormDialog
      v-model:visible="dictTypeFormVisible"
      :is-edit="isEditForm"
      :dict-type-data="currentDictTypeData"
      @success="handleDictTypeFormSuccess"
    />
  </div>
</template>

<style lang="less" scoped></style>
