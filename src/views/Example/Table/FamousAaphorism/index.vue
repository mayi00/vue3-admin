<script setup>
import jisuAPI from '@/api/jisuapi'

defineOptions({ name: 'FamousAaphorism' })

const appKeyParam = { appkey: import.meta.env.VITE_JISUAPI_APPKEY }
const searchFormRef = ref(null)
const searchForm = ref({
  classid: '',
  authorid: '',
})
// 名言类型值域
const classRange = ref([])
// 作者值域
const authorRange = ref([])
const table = ref({
  data: [],
  loading: false,
  currentPage: 1,
  pageSize: 20,
  pageCount: 0,
})

getRange()

// 获取名言类型和作者的值域
function getRange() {
  Promise.all([jisuAPI.yiju.class(appKeyParam), jisuAPI.yiju.author(appKeyParam)])
    .then(res => {
      classRange.value = res[0]
      authorRange.value = res[1]
    })
    .catch(err => {
      console.error('Error fetching ranges:', err)
    })
}

function handleSearch() {
  table.value.currentPage = 1
  table.value.pageCount = table.value.currentPage
  getList()
}
function handleReset() {
  searchFormRef.value.resetFields()
}

async function getList() {
  const params = {
    ...appKeyParam,
    ...searchForm.value,
    page: table.value.currentPage,
    num: table.value.pageSize,
  }

  table.value.loading = true
  console.log(params)

  // return
  jisuAPI.yiju
    .query(params)
    .then(res => {
      if (res.length === 0) {
        ElMessage.warning('没有查询到数据')
        table.value.currentPage = 1
        getList()
      } else if (res.length === table.value.pageSize) {
        table.value.pageCount = Math.max(table.value.currentPage + 1, table.value.pageCount)
      } else {
        table.value.pageCount = table.value.currentPage
      }
      table.value.data = res
    })
    .catch(err => {
      console.error(err)
      ElMessage.error(err.msg || '请求失败')
    })
    .finally(() => {
      table.value.loading = false
    })
}

// 获取表格序号
function getIndex(index) {
  return table.value.pageSize * (table.value.currentPage - 1) + index + 1
}

function handlePageChange({ currentPage, pageSize }) {
  console.log('currentPage:', currentPage)
  console.log('pageSize:', pageSize)

  getList()
}
</script>

<template>
  <div class="g-container">
    <el-card shadow="never" body-style="padding-bottom: 0">
      <el-form ref="searchFormRef" :model="searchForm" label-width="80px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="名言类型" prop="classid">
              <el-select v-model="searchForm.classid" filterable placeholder="请选择名言类型" clearable>
                <el-option v-for="item in classRange" :key="item.classid" :label="item.class" :value="item.classid" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="作者" prop="authorid">
              <el-select v-model="searchForm.authorid" filterable placeholder="请选择作者" clearable>
                <el-option
                  v-for="item in authorRange"
                  :key="item.authorid"
                  :label="item.author"
                  :value="item.authorid"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" style="padding-left: 10px">
            <el-button type="primary" @click="handleSearch">查询</el-button>
            <el-button @click="handleReset">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card shadow="never" style="margin-top: 10px">
      <el-table :data="table.data" :loading="table.loading" stripe>
        <el-table-column type="index" label="序号" :index="getIndex" width="80" />
        <el-table-column prop="content" label="名言" min-width="300"></el-table-column>
        <el-table-column prop="author" label="作者" width="180"></el-table-column>
        <el-table-column prop="classid" label="名言类型" width="180">
          <template #default="scope">
            <span>{{ classRange.find(item => item.classid === scope.row.classid)?.class }}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="table.currentPage"
        :page-size="table.pageSize"
        :page-count="table.pageCount"
        background
        layout="prev, pager, next"
        @change="handlePageChange"
      />
    </el-card>
  </div>
</template>
