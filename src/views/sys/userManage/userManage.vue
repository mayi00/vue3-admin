<script setup>
import api from '@/api'
import { useElementHeight } from '@/hooks/useElement'
import { getDictList, getDictLabel } from '@/tools/tools'

defineOptions({ name: 'UserManage' })

const searchFormRef = ref(null)
const searchForm = ref({ name: '', account: '', status: '', roleName: '', orgCodes: [] })

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
    { label: '序号', type: 'index', minWidth: 60, slot: 'index' },
    { prop: 'avatar', label: '头像', slot: 'avatar' },
    { prop: 'account', label: '账户', minWidth: 80 },
    { prop: 'name', label: '用户名', minWidth: 100 },
    { prop: 'gender', label: '性别', minWidth: 60 },
    { prop: 'status', label: '状态', minWidth: 60, slot: 'status' },
    { prop: 'email', label: '电子邮箱', minWidth: 100 },
    { prop: 'phone', label: '电话', minWidth: 110 },
    { prop: 'mobile', label: '手机', minWidth: 110 },
    { prop: 'address', label: '地址', minWidth: 100, showOverflowTooltip: true }
  ]
})

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

handleSearch()
</script>

<template>
  <div class="g-container">
    <el-card shadow="never" body-style="padding-bottom: 20">
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
            <el-form-item label="角色名称" prop="roleName">
              <el-input v-model="searchForm.roleName" placeholder="请输入角色名称" clearable></el-input>
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
          <el-col :span="6" style="padding-left: 10px">
            <el-button type="primary" @click="handleSearch">查询</el-button>
            <el-button @click="handleReset">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
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
        @update:currentPage="handleUpdateCurrentPage"
        @update:pageSize="handleUpdatePageSize"
      >
        <template #index="{ index }">{{ getIndex(index) }}</template>
        <template #avatar="{ row }">
          <el-avatar :src="row.avatar" style="width: 32px; height: 32px"></el-avatar>
        </template>
        <template #status="{ row }">
          {{ getDictLabel('USER_STATUS', row.status) || row.status }}
        </template>
      </BaseTable>
    </el-card>
  </div>
</template>

<style lang="less" scoped></style>
