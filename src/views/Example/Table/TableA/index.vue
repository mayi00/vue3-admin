<script setup>
import jisuAPI from '@/api/jisuapi'

defineOptions({ name: 'TableA' })

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
})

getRange()

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
  console.log('handleSearch', searchForm.value)
  getList()
}
function handleReset() {
  searchFormRef.value.resetFields()
}

async function getList() {
  const params = {
    ...appKeyParam,
    num: 20,
    page: 1,
    classid: searchForm.value.classid,
    authorid: searchForm.value.authorid,
  }
  try {
    table.value.loading = true
    const res = await jisuAPI.yiju.query(params)
    console.log(res)
    table.value.data = res
    table.value.loading = false
  } catch (err) {
    console.error(err)
    ElMessage.error(err.msg || '请求失败')
    throw err
  }
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
      <el-table :data="table.data" :loading="table.loading" border stripe>
        <el-table-column prop="content" label="名言"></el-table-column>
        <el-table-column prop="author" label="作者" width="180"></el-table-column>
      </el-table>
      <el-pagination background layout="prev, pager, next" :total="1000" />
    </el-card>
  </div>
</template>
