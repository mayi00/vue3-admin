<script setup>
import { ElMessage } from 'element-plus'
import { debounce } from 'lodash-es'
import { Search } from '@element-plus/icons-vue'
import api from '@/api'
import { useElementHeight } from '@/hooks/useElement'
import { getDictList, getDictLabel } from '@/tools/tools'
import DictDataFormDialog from './dictDataFormDialog.vue'

defineOptions({ name: 'DictData' })

// 字典类型
const dictTypeLoading = ref(false)
const dictTypeList = ref([])
const selectedDictType = ref({})
const dictTypeSearch = ref('')
// 过滤后的字典类型
const filteredDictTypeList = ref([])

// 字典数据列表
const { elementHeight: tableHeight } = useElementHeight({ offset: 227 })
const table = ref({
  loading: false,
  currentPage: 1,
  pageSize: 10,
  total: 0,
  data: [],
  columns: [
    { type: 'index', label: '序号', minWidth: 60, slot: 'index' },
    { prop: 'dictLabel', label: '字典名称', minWidth: 100 },
    { prop: 'dictValue', label: '字典值', minWidth: 100 },
    { prop: 'sort', label: '排序', minWidth: 80 },
    { prop: 'status', label: '状态', minWidth: 80, slot: 'status' },
    { prop: 'remark', label: '备注', minWidth: 100 },
    { prop: 'operation', label: '操作', width: 120, align: 'center', fixed: 'right', slot: 'operation' }
  ]
})

// 字典数据表单对话框
const dictDataFormVisible = ref(false)
const isEditForm = ref(false)
const currentDictData = ref({})

// 获取字典类型列表
const getDictTypeList = async () => {
  dictTypeLoading.value = true
  try {
    const res = await api.sys.dict.list()
    dictTypeLoading.value = false
    dictTypeList.value = res.data.list || []
    filteredDictTypeList.value = [...dictTypeList.value]
    // 默认选择第一个字典类型
    if (dictTypeList.value.length > 0) {
      selectedDictType.value = dictTypeList.value[0]
      getDictDataList()
    }
  } catch (error) {
    console.error('获取字典类型列表失败:', error)
    dictTypeLoading.value = false
    dictTypeList.value = []
    filteredDictTypeList.value = []
  }
}
// 字典类型搜索
const handleDictTypeSearch = debounce(searchKey => {
  if (!searchKey) {
    filteredDictTypeList.value = [...dictTypeList.value]
    return
  }
  filteredDictTypeList.value = dictTypeList.value.filter(
    item => item.dictLabel.includes(searchKey) || item.dictValue.includes(searchKey)
  )
}, 300)
// 选择字典类型
const handleDictTypeSelect = dictType => {
  selectedDictType.value = dictType
  table.value.currentPage = 1
  getDictDataList()
}

// 获取字典数据列表
const getDictDataList = async () => {
  if (!selectedDictType.value.dictValue) {
    table.value.data = []
    table.value.total = 0
    return
  }
  try {
    table.value.loading = true
    const res = await api.sys.dict.dataList({
      dictType: selectedDictType.value.dictValue,
      currentPage: table.value.currentPage,
      pageSize: table.value.pageSize
    })
    table.value.data = res.data.list || []
    table.value.total = res.data.total || 0
  } catch (error) {
    console.error('获取字典数据列表失败:', error)
    table.value.data = []
    table.value.total = 0
  } finally {
    table.value.loading = false
  }
}
// 切换页码
const handleUpdateCurrentPage = page => {
  table.value.currentPage = page
  getDictDataList()
}
// 切换每页数量
const handleUpdatePageSize = size => {
  table.value.pageSize = size
  getDictDataList()
}
// 获取表格序号
const getIndex = index => {
  return table.value.pageSize * (table.value.currentPage - 1) + index + 1
}

// 新增字典数据
const handleCreate = () => {
  isEditForm.value = false
  currentDictData.value = {}
  dictDataFormVisible.value = true
}
// 编辑字典数据
const handleEdit = row => {
  isEditForm.value = true
  currentDictData.value = { ...row }
  dictDataFormVisible.value = true
}
// 字典数据表单提交成功
const handleDictDataFormSuccess = () => {
  dictDataFormVisible.value = false
  currentDictData.value = {}
  getDictTypeList()
}
// 删除字典数据
const handleDelete = async ({ id }) => {
  try {
    await api.sys.dict.deleteDictData({ id })
    ElMessage.success('删除成功')
    getDictDataList()
  } catch (error) {
    console.error('删除字典数据失败:', error)
    ElMessage.error('删除失败')
  }
}

onMounted(() => {
  getDictTypeList()
})
</script>

<template>
  <div class="g-container dict-data-container">
    <!-- 字典类型 -->
    <el-card shadow="hover" class="dict-type-card g-children-thin-scrollbar">
      <template #header>
        <el-input
          v-model.trim="dictTypeSearch"
          placeholder="搜索字典类型"
          clearable
          style="width: 100%"
          @keyup.enter="handleDictTypeSearch"
          @change="handleDictTypeSearch"
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
      </template>

      <div v-loading="dictTypeLoading" class="w-full h-full">
        <el-tree
          v-if="filteredDictTypeList.length"
          :data="filteredDictTypeList"
          :props="{ label: 'dictLabel', value: 'dictValue' }"
          :highlight-current="true"
          node-key="dictValue"
          :current-node-key="selectedDictType.dictValue"
          @node-click="handleDictTypeSelect"
        />
        <el-empty v-else description="暂无数据" />
      </div>
    </el-card>

    <!-- 字典数据列表 -->
    <el-card shadow="hover" class="dict-data-card">
      <template #header>
        <div class="card-header">
          <span>字典类型：{{ selectedDictType.dictLabel || '--' }}</span>
          <el-button type="primary" :disabled="!selectedDictType.dictValue" @click="handleCreate">新增字典</el-button>
        </div>
      </template>

      <HyTable
        v-if="selectedDictType.dictValue"
        :height="tableHeight"
        :loading="table.loading"
        :data="table.data"
        :columns="table.columns"
        :total="table.total"
        @update:currentPage="handleUpdateCurrentPage"
        @update:pageSize="handleUpdatePageSize"
      >
        <template #index="{ index }">{{ getIndex(index) }} </template>
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
            @confirm="handleDelete(row)"
          >
            <template #reference>
              <el-button type="danger" link size="small">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </HyTable>
      <el-empty v-else description="请选择字典类型" />
    </el-card>

    <DictDataFormDialog
      ref="dictDataFormRef"
      v-model:visible="dictDataFormVisible"
      :isEdit="isEditForm"
      :dictType="selectedDictType"
      :dictData="currentDictData"
      @success="handleDictDataFormSuccess"
    />
  </div>
</template>

<style lang="less" scoped>
.dict-data-container {
  display: flex;
  gap: 16px;

  .dict-type-card {
    flex-shrink: 0;
    width: 300px;
    height: 100%;
  }

  .dict-data-card {
    flex: 1;
    min-width: 0;

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>
