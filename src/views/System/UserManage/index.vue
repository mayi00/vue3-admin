<script setup>
defineOptions({ name: 'UserManage' })

import { ref, onMounted } from 'vue'

// 表格数据
const tableData = ref([])
// 总条数
const total = ref(0)
// 查询参数
const queryParams = ref({
  pageNum: 1,
  pageSize: 10,
  userName: undefined,
  phone: undefined,
  status: undefined,
})

// 获取用户列表
const getList = async () => {
  // 这里调用API接口，暂时用mock数据代替
  const mockData = {
    rows: [
      { id: 1, userName: 'Admin', nickName: '管理员', phone: '13800000000', status: 0 },
      { id: 2, userName: 'test', nickName: '测试账号', phone: '13800000001', status: 1 },
    ],
    total: 2,
  }
  tableData.value = mockData.rows
  total.value = mockData.total
}

// 搜索按钮
const handleQuery = () => {
  queryParams.value.pageNum = 1
  getList()
}

// 重置按钮
const resetQuery = () => {
  queryParams.value = {
    pageNum: 1,
    pageSize: 10,
    userName: undefined,
    phone: undefined,
    status: undefined,
  }
  getList()
}

// 分页切换
const handleCurrentChange = val => {
  queryParams.value.pageNum = val
  getList()
}

// 每页条数变化
const handleSizeChange = val => {
  queryParams.value.pageSize = val
  getList()
}

onMounted(() => {
  getList()
})
</script>

<template>
  <div class="g-container">
    <el-card>
      <el-form :inline="true" class="search-form">
        <el-form-item label="用户名称">
          <el-input v-model="queryParams.userName" placeholder="请输入用户名称" clearable />
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="queryParams.phone" placeholder="请输入手机号码" clearable />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="queryParams.status" placeholder="请选择状态" clearable>
            <el-option label="正常" :value="0" />
            <el-option label="停用" :value="1" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">搜索</el-button>
          <el-button @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="userName" label="用户名" width="180" />
        <el-table-column prop="nickName" label="昵称" width="180" />
        <el-table-column prop="phone" label="手机号" />
        <el-table-column prop="status" label="状态">
          <template #default="{ row }">
            <el-tag :type="row.status === 0 ? 'success' : 'danger'">
              {{ row.status === 0 ? '正常' : '停用' }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination
          v-model:current-page="queryParams.pageNum"
          v-model:page-size="queryParams.pageSize"
          :page-sizes="[10, 20, 30, 50]"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </div>
</template>

<style lang="less" scoped>
.search-form {
  margin-bottom: 20px;

  :deep(.el-form-item) {
    margin-right: 20px;
    margin-bottom: 0;
  }
}

.pagination-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>
