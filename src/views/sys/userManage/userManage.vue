<script setup>
import api from '@/api/apifox/apifox.js'

defineOptions({ name: 'UserManage' })

const searchFormRef = ref(null)
const searchForm = ref({
  name: '',
  account: '',
  status: ''
})
const baseTableRef = ref(null)
const table = ref({
  height: 300,
  loading: false,
  currentPage: 1,
  pageSize: 10,
  // pageCount: 0,
  total: 0,
  data: [],
  columns: [
    { type: 'selection', width: 50 },
    { label: '序号', type: 'index', width: 100, slot: 'index' },
    { prop: 'account', label: '账户', minWidth: '120' },
    { prop: 'name', label: '用户名', minWidth: '120' },
    { prop: 'gender', label: '性别', minWidth: '120' },
    { prop: 'status', label: '状态', minWidth: '120' }
  ]
})

handleSearch()
function handleSearch() {
  table.value.currentPage = 1
  getList()
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
// 获取表格序号
function getIndex(index) {
  return table.value.pageSize * (table.value.currentPage - 1) + index + 1
}

function getList() {
  const params = { currentPage: table.value.currentPage, pageSize: table.value.pageSize }
  api.user.list(params, { ...searchForm.value }).then(res => {
    table.value.data = res.data.list
    table.value.total = res.data.total
  })
}
</script>

<template>
  <div class="g-container">
    <el-card> </el-card>
    <el-card style="margin-top: 10px">
      <BaseTable
        ref="baseTableRef"
        :height="table.height"
        :loading="table.loading"
        :data="table.data"
        :columns="table.columns"
        :defaultPageSize="20"
        :total="table.total"
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
