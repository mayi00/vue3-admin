<script setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search, Plus, Edit, Delete } from '@element-plus/icons-vue'
import { debounce, isEmpty } from 'lodash-es'
import api from '@/api'
import { useElementHeight } from '@/hooks/useElement.js'
import { getDictMap } from '@/tools/tools'
import OrganizationFormDialog from './organizationFormDialog.vue'

defineOptions({ name: 'OrganizationManage' })

const { elementHeight: tableHeight } = useElementHeight({ offset: 233 })
const orgTypeMap = getDictMap('ORG_TYPE')

// 机构树
const orgTreeLoading = ref(false)
const orgTreeData = ref([])
const defaultExpandedKeys = ref([])
const selectedOrg = ref({})
const orgTreeSearch = ref('')
const filteredOrgTreeData = ref([])

// 获取机构树数据
const getTreeData = async () => {
  orgTreeLoading.value = true
  try {
    const orgRes = await api.sys.organization.list(searchForm.value)
    if (orgRes.code === 0) {
      orgTreeData.value = orgRes.data
      filteredOrgTreeData.value = [...orgTreeData.value]
      if (orgRes.data.length > 0) {
        defaultExpandedKeys.value = orgRes.data.map(org => org.id)
        // 默认选中第一个机构
        if (isEmpty(selectedOrg.value)) selectedOrg.value = orgRes.data[0]
        await getList()
      } else {
        selectedOrg.value = {}
        table.value.data = []
      }
    } else {
      ElMessage.error('获取机构列表失败')
    }
  } catch (error) {
    console.error('获取机构数据失败:', error)
    ElMessage.error('获取机构数据失败')
  } finally {
    orgTreeLoading.value = false
  }
}
// 选择机构树节点
const handleOrgTreeSelect = org => {
  selectedOrg.value = org
  getList()
}
// 机构树搜索
const handleOrgTreeSearch = debounce(searchKey => {
  if (!searchKey) {
    filteredOrgTreeData.value = [...orgTreeData.value]
    return
  }
  // 搜索过滤
  const filterFunc = nodes => {
    return nodes.filter(node => {
      const match = node.orgName.includes(searchKey)
      if (match) return true
      if (node.children && node.children.length) {
        node.children = filterFunc([...node.children])
        return node.children.length > 0
      }
      return false
    })
  }
  filteredOrgTreeData.value = filterFunc(JSON.parse(JSON.stringify(orgTreeData.value)))
}, 300)

onMounted(() => {
  getTreeData()
})

// 搜索表单
const searchFormRef = ref(null)
const searchForm = ref({ orgName: '' })
// 表格配置
const table = ref({
  loading: false,
  data: [],
  columns: [
    { type: 'index', label: '序号', minWidth: 60 },
    { prop: 'orgName', label: '机构名称', minWidth: 200 },
    { prop: 'orgType', label: '机构分类', width: 100, slot: 'orgType' },
    { prop: 'sort', label: '排序', width: 80 },
    { prop: 'orgCode', label: '机构码', minWidth: 150 },
    { prop: 'remark', label: '备注', minWidth: 200 },
    { prop: 'operation', label: '操作', width: 180, align: 'center', fixed: 'right', slot: 'operation' }
  ]
})

// 防抖搜索
const handleSearch = debounce(() => {
  getList()
}, 300)
const handleReset = () => {
  searchFormRef.value.resetFields()
  handleSearch()
}
// 更新右侧表格数据，仅展示选中节点的直接子级
const getList = async () => {
  if (isEmpty(selectedOrg.value)) {
    table.value.data = []
    return
  }

  table.value.loading = true
  try {
    const res = await api.sys.organization.getChildren({ parentId: selectedOrg.value.id, ...searchForm.value })
    if (res.code === 0) {
      table.value.data = res.data
    } else {
      ElMessage.error('获取子机构列表失败')
      table.value.data = []
    }
  } catch (error) {
    console.error('获取子机构数据失败:', error)
    ElMessage.error('获取子机构数据失败')
    table.value.data = []
  } finally {
    table.value.loading = false
  }
}

// 新增/编辑对话框
const dialogVisible = ref(false)
const currentOrg = ref({})
const isEdit = ref(false)
// 新增机构
const handleAddOrg = () => {
  isEdit.value = false
  currentOrg.value = { parentId: selectedOrg.value.id || '' }
  dialogVisible.value = true
}
// 编辑机构
const handleEditOrg = org => {
  isEdit.value = true
  currentOrg.value = JSON.parse(JSON.stringify(org))
  dialogVisible.value = true
}
// 处理机构表单成功
const handleOrgFormSuccess = () => {
  dialogVisible.value = false
  currentOrg.value = {}
  isEdit.value = false
  getTreeData()
}

// 检查是否有子机构
const hasChildren = org => {
  return org.children && org.children.length > 0
}
// 删除机构
const handleDeleteOrg = org => {
  if (hasChildren(org)) {
    ElMessageBox.confirm('该机构包含子机构，确定要一并删除吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        onDeleteOrg(org)
      })
      .catch(() => {
        // 取消删除
      })
  } else {
    onDeleteOrg(org)
  }
}
const onDeleteOrg = async ({ id }) => {
  try {
    const res = await api.sys.organization.delete({ id })
    if (res.code === 0) {
      ElMessage.success('删除成功')
      getTreeData()
    } else {
      ElMessage.error(res.message || '删除失败')
    }
  } catch (error) {
    console.error('删除机构失败:', error)
    ElMessage.error('删除机构失败')
  }
}
</script>

<template>
  <div class="g-container organization-container">
    <el-card shadow="hover" class="organization-tree-card g-children-thin-scrollbar">
      <template #header>
        <el-input
          v-model.trim="orgTreeSearch"
          placeholder="搜索机构"
          clearable
          style="width: 100%"
          @keyup.enter="handleOrgTreeSearch"
          @change="handleOrgTreeSearch"
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
      </template>

      <div v-loading="orgTreeLoading" class="w-full h-full">
        <el-tree
          v-if="filteredOrgTreeData.length"
          :data="filteredOrgTreeData"
          :props="{ label: 'orgName', value: 'id' }"
          :highlight-current="true"
          node-key="id"
          :current-node-key="selectedOrg.id"
          :default-expanded-keys="defaultExpandedKeys"
          @node-click="handleOrgTreeSelect"
        />
        <el-empty v-else description="暂无数据" />
      </div>
    </el-card>

    <el-card shadow="hover" class="organization-list-card">
      <template #header>
        <el-form ref="searchFormRef" :model="searchForm" label-width="80px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="机构名称" prop="orgName">
                <el-input
                  v-model="searchForm.orgName"
                  placeholder="请输入机构名称"
                  clearable
                  @keyup.enter="handleSearch"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" class="pl-[10px]">
              <el-button type="primary" @click="handleSearch">查询</el-button>
              <el-button @click="handleReset">重置</el-button>
            </el-col>
          </el-row>
        </el-form>
        <!-- <div class="card-header">
          <el-button type="primary" @click="handleAddOrg">
            <el-icon><Plus /></el-icon> 新增子机构
          </el-button>
        </div> -->
      </template>

      <div class="mb-[10px]">
        <el-button type="primary" @click="handleAddOrg">
          <el-icon><Plus /></el-icon> 新增子机构
        </el-button>
      </div>

      <!-- 搜索表单 -->
      <!-- <el-form ref="searchFormRef" :model="searchForm" label-width="80px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="机构名称" prop="orgName">
              <el-input
                v-model="searchForm.orgName"
                placeholder="请输入机构名称"
                clearable
                @keyup.enter="handleSearch"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="pl-[10px]">
            <el-button type="primary" @click="handleSearch">查询</el-button>
            <el-button @click="handleReset">重置</el-button>
          </el-col>
        </el-row>
      </el-form> -->

      <HyTable
        :height="tableHeight"
        :loading="table.loading"
        :data="table.data"
        :columns="table.columns"
        :showPagination="false"
      >
        <template #orgType="{ row }">
          <span>{{ orgTypeMap.get(row.orgType) || '' }}</span>
        </template>
        <template #operation="{ row }">
          <el-button type="primary" link size="small" @click="handleEditOrg(row)">
            <el-icon><Edit /></el-icon>编辑
          </el-button>
          <el-popconfirm
            title="确定要删除该机构吗？"
            width="160"
            placement="top"
            confirm-button-type="danger"
            @confirm="handleDeleteOrg(row)"
          >
            <template #reference>
              <el-button type="danger" link size="small">
                <el-icon><Delete /></el-icon>删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </HyTable>
    </el-card>

    <!-- 新增/编辑对话框组件 -->
    <OrganizationFormDialog
      v-model:visible="dialogVisible"
      :is-edit="isEdit"
      :org-data="currentOrg"
      @success="handleOrgFormSuccess"
    />
  </div>
</template>

<style lang="less" scoped>
.organization-container {
  display: flex;
  gap: 16px;

  .organization-tree-card {
    flex-shrink: 0;
    width: 300px;
    height: 100%;
  }

  .organization-list-card {
    flex: 1;
    min-width: 0;

    :deep(.el-card__header) {
      padding-bottom: 0;
    }
  }
}
</style>
