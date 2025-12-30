<script setup>
import { ref, onMounted, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { debounce } from 'lodash-es'
import { Search } from '@element-plus/icons-vue'
import api from '@/api'
import { useElementHeight } from '@/hooks/useElement'
import { getDictList, getDictLabel } from '@/tools/tools'
import DictDataFormDialog from './dictDataFormDialog.vue'

defineOptions({ name: 'DictData' })

// 左侧字典类型树形结构
const dictTypeList = ref([])
const selectedDictType = ref({})
const dictTypeSearch = ref('')
const filteredDictTypeList = ref([])

// 右侧字典数据列表
const { elementHeight: tableHeight } = useElementHeight({ offset: 275 })
const table = ref({
  loading: false,
  currentPage: 1,
  pageSize: 10,
  total: 0,
  data: []
})

// 字典数据表格列配置
const columns = ref([
  { type: 'index', label: '序号', minWidth: 60, slot: 'index' },
  { prop: 'dictLabel', label: '字典名称', minWidth: 150 },
  { prop: 'dictValue', label: '字典值', minWidth: 150 },
  { prop: 'sort', label: '排序', minWidth: 80 },
  { prop: 'status', label: '状态', minWidth: 80, slot: 'status' },
  { prop: 'remark', label: '备注', minWidth: 200 },
  { prop: 'operation', label: '操作', width: 120, align: 'center', fixed: 'right', slot: 'operation' }
])

// 字典数据表单对话框
const dictDataFormVisible = ref(false)
const isEditForm = ref(false)
const currentDictData = ref({})

// 新增字典数据
const handleAddDictData = () => {
  isEditForm.value = false
  currentDictData.value = {}
  dictDataFormVisible.value = true
}

// 编辑字典数据
const handleEditDictData = row => {
  isEditForm.value = true
  currentDictData.value = { ...row }
  dictDataFormVisible.value = true
}

// 删除字典数据
const handleDeleteDictData = async row => {
  try {
    await api.sys.dict.deleteDictData({ dictValue: row.dictValue, dictType: selectedDictType.value.dictValue })
    ElMessage.success('删除成功')
    getDictDataList()
  } catch (error) {
    console.error('删除字典数据失败:', error)
    ElMessage.error('删除失败')
  }
}

// 字典数据表单提交成功
const handleDictDataFormSuccess = () => {
  dictDataFormVisible.value = false
  currentDictData.value = {}
  // 刷新字典类型列表，以便获取最新的字典数据
  getDictTypeList()
}

// 获取字典类型列表
const getDictTypeList = async () => {
  try {
    const res = await api.sys.dict.list()
    dictTypeList.value = res.data.list || []
    filteredDictTypeList.value = [...dictTypeList.value]
    // 默认选择第一个字典类型
    if (dictTypeList.value.length > 0) {
      selectedDictType.value = dictTypeList.value[0]
      getDictDataList()
    }
  } catch (error) {
    console.error('获取字典类型列表失败:', error)
    dictTypeList.value = []
    filteredDictTypeList.value = []
  }
}

// 字典类型搜索
const handleDictTypeSearch = debounce(value => {
  if (!value) {
    filteredDictTypeList.value = [...dictTypeList.value]
    return
  }
  filteredDictTypeList.value = dictTypeList.value.filter(
    item => item.dictLabel.includes(value) || item.dictValue.includes(value)
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

// 页面挂载时获取字典类型列表
onMounted(() => {
  getDictTypeList()
})
</script>

<template>
  <div class="g-container">
    <div class="dict-data-container">
      <!-- 左侧字典类型树形结构 -->
      <div class="dict-type-tree">
        <el-card shadow="hover" class="dict-type-card">
          <template #header>
            <div class="search-header">
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
            </div>
          </template>

          <div class="dict-type-tree-content">
            <el-tree
              v-if="filteredDictTypeList.length > 0"
              :data="filteredDictTypeList"
              :props="{ label: 'dictLabel', value: 'dictValue' }"
              :highlight-current="true"
              node-key="dictValue"
              :default-expanded-keys="[selectedDictType.dictValue]"
              @node-click="handleDictTypeSelect"
            />
            <div v-else class="empty-tree">
              <el-empty description="暂无数据" />
            </div>
          </div>
        </el-card>
      </div>

      <!-- 右侧字典数据列表 -->
      <div class="dict-data-list">
        <el-card shadow="hover" class="dict-data-card">
          <template #header>
            <div class="card-header">
              <span>
                {{ selectedDictType.dictLabel ? `${selectedDictType.dictLabel}` : '字典数据' }}
              </span>
              <el-button type="primary" size="small" :disabled="!selectedDictType.dictValue" @click="handleAddDictData">
                新增字典
              </el-button>
            </div>
          </template>

          <div v-if="selectedDictType.dictValue" class="dict-data-table">
            <HyTable
              :height="tableHeight"
              :loading="table.loading"
              :data="table.data"
              :columns="columns"
              :total="table.total"
              @update:currentPage="handleUpdateCurrentPage"
              @update:pageSize="handleUpdatePageSize"
            >
              <template #index="{ index }">
                {{ getIndex(index) }}
              </template>
              <template #status="{ row }">
                <el-tag :type="row.status === 'ENABLED' ? 'success' : 'danger'" effect="dark">
                  {{ getDictLabel('SYS_ENABLED_STATUS', row.status) }}
                </el-tag>
              </template>
              <template #operation="{ row }">
                <el-button type="primary" link size="small" @click="handleEditDictData(row)">编辑</el-button>
                <el-popconfirm
                  title="请确认是否删除？"
                  width="160"
                  placement="top"
                  confirm-button-type="danger"
                  @confirm="handleDeleteDictData(row)"
                >
                  <template #reference>
                    <el-button type="danger" link size="small">删除</el-button>
                  </template>
                </el-popconfirm>
              </template>
            </HyTable>
          </div>
          <div v-else class="empty-data">
            <el-empty description="请选择字典类型" />
          </div>
        </el-card>
      </div>
    </div>

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
  height: 100%;

  .dict-type-tree {
    width: 300px;
    flex-shrink: 0;

    .dict-type-card {
      height: 100%;

      .search-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .dict-type-tree-content {
        height: calc(100% - 60px);
        overflow-y: auto;
      }

      .empty-tree {
        height: calc(100% - 60px);
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  .dict-data-list {
    flex: 1;

    .dict-data-card {
      height: 100%;

      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .empty-data {
        height: calc(100% - 60px);
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .dict-data-table {
        height: calc(100% - 60px);
      }
    }
  }
}
</style>
