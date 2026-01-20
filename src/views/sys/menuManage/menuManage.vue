<script setup>
import api from '@/api'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search, Plus, Edit, Delete } from '@element-plus/icons-vue'
import { debounce } from 'lodash-es'
import { useElementHeight } from '@/hooks/useElement.js'
import { hasBtnPermission } from '@/directives/permission'
import { getDictList, getDictMap } from '@/tools/tools'
import MenuFormDialog from './menuFormDialog.vue'

defineOptions({ name: 'MenuManage' })

const { elementHeight: tableHeight } = useElementHeight({ offset: 233 })
const menuTypeMap = getDictMap('MENU_TYPE')

// 搜索表单
const searchFormRef = ref(null)
const searchForm = ref({ menuName: '', menuType: '', visible: '' })

// 表格配置
const table = ref({
  loading: false,
  // 树形表格配置
  treeProps: {
    children: 'children',
    hasChildren: 'hasChildren'
  },
  data: [],
  columns: [
    { type: 'index', label: '序号', minWidth: 60 },
    { prop: 'meta.title', label: '菜单名称', minWidth: 200 },
    { prop: 'menuType', label: '菜单类型', width: 100, slot: 'menuType' },
    { prop: 'path', label: '路由路径', minWidth: 200, slot: 'path' },
    { prop: 'component', label: '组件路径', minWidth: 200, slot: 'component' },
    { prop: 'meta.icon', label: '图标', width: 100 },
    { prop: 'visible', label: '是否隐藏', width: 80, slot: 'visible' },
    { prop: 'sort', label: '排序', width: 80 },
    { prop: 'operation', label: '操作', width: 180, align: 'center', fixed: 'right', slot: 'operation' }
  ]
})

// 检查是否有子菜单
const hasChildren = menu => {
  return menu.children && menu.children.length > 0
}
// 防抖搜索
const handleSearch = debounce(() => {
  getList()
}, 300)
const handleReset = () => {
  searchFormRef.value.resetFields()
  handleSearch()
}
// 获取菜单列表
const getList = async () => {
  table.value.loading = true
  try {
    const menuRes = await api.sys.menu.list()
    if (menuRes.code === 0) {
      table.value.data = menuRes.data
      console.log(table.value.data)
    } else {
      ElMessage.error('获取菜单列表失败')
    }
  } catch (error) {
    console.error('获取菜单数据失败:', error)
    ElMessage.error('获取菜单数据失败')
  } finally {
    table.value.loading = false
  }
}

onMounted(() => {
  handleSearch()
})

// 新增/编辑对话框
const dialogVisible = ref(false)
const currentMenu = ref({})
const isEdit = ref(false)
// 新增菜单
const handleAddMenu = () => {
  isEdit.value = false
  currentMenu.value = {}
  dialogVisible.value = true
}
// 编辑菜单
const handleEditMenu = menu => {
  isEdit.value = true
  // 编辑时，将菜单数据赋值给当前菜单，或者调用接口获取最新菜单数据
  currentMenu.value = JSON.parse(JSON.stringify(menu))
  dialogVisible.value = true
}
// 处理菜单表单成功
const handleMenuFormSuccess = () => {
  dialogVisible.value = false
  currentMenu.value = {}
  isEdit.value = false
  getList()
}

// 删除菜单
const handleDeleteMenu = menu => {
  if (hasChildren(menu)) {
    ElMessageBox.confirm('该菜单包含子菜单，确定要一并删除吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        onDeleteMenu(menu)
      })
      .catch(() => {
        // 取消删除
      })
  } else {
    onDeleteMenu(menu)
  }
}
const onDeleteMenu = async ({ id }) => {
  try {
    const res = await api.sys.menu.delete({ id })
    if (res.code === 0) {
      ElMessage.success('删除成功')
      getList()
    } else {
      ElMessage.error(res.message || '删除失败')
    }
  } catch (error) {
    console.error('删除菜单失败:', error)
    ElMessage.error('删除菜单失败')
  } finally {
  }
}
</script>

<template>
  <div class="g-container">
    <el-card shadow="hover" body-style="padding-bottom: 0">
      <el-form ref="searchFormRef" :model="searchForm" label-width="100px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="菜单名称" prop="menuName">
              <el-input
                v-model="searchForm.menuName"
                placeholder="请输入菜单名称"
                clearable
                @keyup.enter="handleSearch"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="菜单类型" prop="menuType">
              <el-select v-model="searchForm.menuType" placeholder="请选择菜单类型" clearable @change="handleSearch">
                <el-option
                  v-for="item in getDictList('MENU_TYPE')"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="pl-[10px]">
            <el-button type="primary" @click="handleSearch">查询</el-button>
            <el-button @click="handleReset">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <el-card shadow="hover" style="margin-top: 10px">
      <div class="mb-[10px]">
        <el-button type="primary" @click="handleAddMenu">
          <el-icon><Plus /></el-icon> 新增菜单
        </el-button>
      </div>
      <!-- 树形表格 -->
      <div class="g-table-area">
        <HyTable
          :height="tableHeight"
          :loading="table.loading"
          :data="table.data"
          :columns="table.columns"
          row-key="id"
          :tree-props="table.treeProps"
          :showPagination="false"
        >
          <template #menuType="{ row }">
            <span>{{ menuTypeMap.get(row.menuType) || '-' }}</span>
          </template>
          <template #path="{ row }">
            <span>{{ ['MENU', 'IFRAME_LINK'].includes(row.menuType) ? row.path : '-' }}</span>
          </template>
          <template #component="{ row }">
            <span>{{ ['MENU'].includes(row.menuType) ? row.component : '-' }}</span>
          </template>
          <template #visible="{ row }">
            <el-tag :type="row.visible ? 'success' : 'danger'">
              {{ row.visible ? '显示' : '隐藏' }}
            </el-tag>
          </template>
          <template #operation="{ row }">
            <el-button type="primary" link size="small" @click="handleEditMenu(row)">
              <el-icon><Edit /></el-icon>编辑
            </el-button>
            <el-popconfirm
              title="确定要删除该菜单吗？"
              width="160"
              placement="top"
              confirm-button-type="danger"
              @confirm="handleDeleteMenu(row)"
            >
              <template #reference>
                <el-button type="danger" link size="small">
                  <el-icon><Delete /></el-icon>删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </HyTable>
      </div>

      <!-- 新增/编辑对话框组件 -->
      <MenuFormDialog
        v-model:visible="dialogVisible"
        :is-edit="isEdit"
        :menu-data="currentMenu"
        @success="handleMenuFormSuccess"
      />
    </el-card>
  </div>
</template>

<style lang="less" scoped>
.g-table-area {
  height: calc(100% - 80px);
  overflow: auto;
}
</style>
