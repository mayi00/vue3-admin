<script setup>
import api from '@/api/apifox/apifox.js'
import { useElementHeight } from '@/hooks/useElement'

defineOptions({ name: 'UserManage' })

const searchFormRef = ref(null)
const searchForm = ref({
  name: '',
  account: '',
  status: ''
})

// 动态设置表格高度
const { elementHeight: tableHeight } = useElementHeight({
  offsetTop: 193
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
    { label: '序号', type: 'index', minWidth: 60, slot: 'index' },
    { prop: 'avatar', label: '头像', slot: 'avatar' },
    { prop: 'account', label: '账户', minWidth: 80 },
    { prop: 'name', label: '用户名', minWidth: 100 },
    { prop: 'gender', label: '性别', minWidth: 60 },
    { prop: 'status', label: '状态', minWidth: 60 },
    { prop: 'email', label: '电子邮箱', minWidth: 100 },
    { prop: 'phone', label: '电话', minWidth: 110 },
    { prop: 'mobile', label: '手机', minWidth: 110 },
    { prop: 'address', label: '地址', minWidth: 100, showOverflowTooltip: true }
  ]
})

handleSearch()
function handleSearch() {
  table.value.currentPage = 1
  getList()
}
// 获取列表数据
function getList() {
  const params = { currentPage: table.value.currentPage, pageSize: table.value.pageSize }
  const data = { ...searchForm.value }
  table.value.loading = true
  api.user
    .list(params, data)
    .then(res => {
      table.value.data = res.data.list
      table.value.total = res.data.total
    })
    .finally(() => {
      table.value.loading = false
    })
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

const selectedRows = ref([])
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
function handleDownload() {
  const rows = baseTableRef.value?.getSelectionRows()
  console.log('tableRef.value?.getSelectionRows()', baseTableRef.value?.getSelectionRows())
  console.log('handleDownload', selectedRows.value)
}
</script>

<template>
  <div class="g-container">
    <!-- <el-card> </el-card> -->
    <el-card style="margin-top: 10px">
      <div>
        <el-button type="primary" @click="handleDownload">下载</el-button>
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
        @update:currentPage="handlePageChange"
        @update:pageSize="handlePageSizeChange"
      >
        <template #index="{ index }">{{ getIndex(index) }}</template>
        <template #avatar="{ row }">
          <el-avatar :src="row.avatar" style="width: 32px; height: 32px"></el-avatar>
        </template>
      </BaseTable>
    </el-card>
  </div>
</template>

<style lang="less" scoped></style>
