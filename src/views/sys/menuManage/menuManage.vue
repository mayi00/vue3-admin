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
// 搜索表单引用
const searchFormRef = ref(null)
// 搜索表单数据
const searchForm = ref({ menuName: '', menuType: '', visible: '' })

// 原始菜单数据
const originalMenuList = ref([])
// 过滤后的菜单数据
const menuList = computed(() => {
  return filterMenus(originalMenuList.value, searchForm.value)
})
// 对话框可见性
const dialogVisible = ref(false)
// 当前操作的菜单
const currentMenu = ref({})
// 是否编辑模式
const isEditForm = ref(false)

// 扁平化菜单列表（用于选择父菜单）
const flatMenuList = ref([])

// 表格配置
const table = ref({
  loading: false,
  data: [],
  columns: [
    { prop: 'meta.title', label: '菜单名称', minWidth: 180, align: 'left' },
    { prop: 'menuType', label: '菜单类型', width: 120, align: 'center', slot: 'menuType' },
    { prop: 'path', label: '路径', minWidth: 150, align: 'left' },
    { prop: 'component', label: '组件路径', minWidth: 200, align: 'left' },
    { prop: 'meta.icon', label: '图标', width: 120, align: 'center' },
    { prop: 'sort', label: '排序', width: 80, align: 'center' },
    { prop: 'visible', label: '可见性', width: 100, align: 'center', slot: 'visible' },
    { prop: 'meta.keepAlive', label: '缓存', width: 80, align: 'center', slot: 'meta.keepAlive' },
    { prop: 'operation', label: '操作', width: 180, align: 'center', fixed: 'right', slot: 'operation' }
  ]
})

// 树形表格配置
const treeProps = {
  children: 'children',
  hasChildren: 'hasChildren'
}

// 防抖搜索
const handleSearch = debounce(() => {
  // 搜索逻辑已通过computed属性实现
  table.value.data = menuList.value
}, 300)

// 重置搜索表单
const handleReset = () => {
  if (searchFormRef.value) {
    searchFormRef.value.resetFields()
  }
  handleSearch()
}

// 递归扁平化菜单
const flattenMenus = (menuArray, parentId = '') => {
  menuArray.forEach(menu => {
    flatMenuList.value.push({
      id: menu.id,
      title: menu.meta.title,
      parentId
    })
    if (menu.children) {
      flattenMenus(menu.children, menu.id)
    }
  })
}

// 监听菜单列表变化，更新扁平化列表
const updateFlatMenuList = () => {
  flatMenuList.value = []
  flattenMenus(originalMenuList.value)
}

// 初始化时更新扁平化列表
onMounted(async () => {
  table.value.loading = true
  try {
    // 直接获取所有菜单列表
    const menuRes = await api.sys.menu.list()
    if (menuRes.code === 0) {
      originalMenuList.value = menuRes.data || []
      table.value.data = menuList.value
      updateFlatMenuList()
    } else {
      ElMessage.error('获取菜单列表失败')
    }
  } catch (error) {
    console.error('获取菜单数据失败:', error)
    ElMessage.error('获取菜单数据失败')
  } finally {
    table.value.loading = false
  }
})

// 递归过滤菜单
const filterMenus = (menuArray, searchForm) => {
  return menuArray.reduce((result, menu) => {
    // 检查是否匹配搜索条件
    const matchesMenuName =
      !searchForm.menuName || menu.meta.title.includes(searchForm.menuName) || menu.name.includes(searchForm.menuName)
    const matchesMenuType = !searchForm.menuType || menu.menuType === searchForm.menuType
    const matchesVisible = !searchForm.visible || String(menu.visible) === searchForm.visible

    const hasMatch = matchesMenuName && matchesMenuType && matchesVisible
    const filteredChildren = menu.children ? filterMenus(menu.children, searchForm) : []

    if (hasMatch || filteredChildren.length > 0) {
      result.push({
        ...menu,
        children: filteredChildren
      })
    }

    return result
  }, [])
}

// 新增菜单
const handleAddMenu = () => {
  isEditForm.value = false
  currentMenu.value = {}
  dialogVisible.value = true
}

// 编辑菜单
const handleEditMenu = menu => {
  isEditForm.value = true
  currentMenu.value = JSON.parse(JSON.stringify(menu))
  dialogVisible.value = true
}

// 检查是否有子菜单
const hasChildren = menu => {
  return menu.children && menu.children.length > 0
}

// 删除菜单
const handleDeleteMenu = async menu => {
  let confirmMessage = '确定要删除该菜单吗？'
  if (hasChildren(menu)) {
    confirmMessage = '该菜单包含子菜单，确定要一并删除吗？'
  }

  ElMessageBox.confirm(confirmMessage, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      table.value.loading = true
      try {
        const res = await api.sys.menu.delete({ id: menu.id })
        if (res.code === 0) {
          ElMessage.success('删除成功')
          // 重新获取菜单列表
          const menuRes = await api.sys.menu.list()
          if (menuRes.code === 0) {
            originalMenuList.value = menuRes.data || []
            table.value.data = menuList.value
            updateFlatMenuList()
          }
        } else {
          ElMessage.error(res.message || '删除失败')
        }
      } catch (error) {
        console.error('删除菜单失败:', error)
        ElMessage.error('删除菜单失败')
      } finally {
        table.value.loading = false
      }
    })
    .catch(() => {
      // 取消删除
    })
}

// 处理菜单表单成功
const handleMenuFormSuccess = async menu => {
  table.value.loading = true
  try {
    if (isEditForm.value) {
      // 编辑菜单
      const res = await api.sys.menu.update(menu)
      if (res.code === 0) {
        ElMessage.success('编辑菜单成功')
      } else {
        ElMessage.error(res.message || '编辑菜单失败')
      }
    } else {
      // 新增菜单
      const res = await api.sys.menu.add(menu)
      if (res.code === 0) {
        ElMessage.success('新增菜单成功')
      } else {
        ElMessage.error(res.message || '新增菜单失败')
      }
    }

    // 重新获取菜单列表
    const menuRes = await api.sys.menu.list()
    if (menuRes.code === 0) {
      originalMenuList.value = menuRes.data || []
      table.value.data = menuList.value
      updateFlatMenuList()
    }
  } catch (error) {
    console.error('操作菜单失败:', error)
    ElMessage.error('操作菜单失败')
  } finally {
    table.value.loading = false
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
          <el-col :span="6" style="padding-left: 10px">
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
          :tree-props="treeProps"
          :showPagination="false"
        >
          <template #operation="{ row }">
            <el-button type="text" size="small" @click="handleEditMenu(row)">
              <el-icon><Edit /></el-icon> 编辑
            </el-button>
            <el-popconfirm
              title="确定要删除该菜单吗？"
              confirm-button-text="确定"
              cancel-button-text="取消"
              @confirm="handleDeleteMenu(row)"
            >
              <template #reference>
                <el-button type="text" size="small" text-color="#ff4d4f">
                  <el-icon><Delete /></el-icon> 删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
          <template #menuType="{ row }">
            <span>{{ menuTypeMap[row.menuType] }}</span>
          </template>
          <template #visible="{ row }">
            <el-tag :type="row.visible ? 'success' : 'danger'">
              {{ row.visible ? '显示' : '隐藏' }}
            </el-tag>
          </template>
          <template #meta.keepAlive="{ row }">
            <el-tag :type="row.meta.keepAlive ? 'success' : 'info'">
              {{ row.meta.keepAlive ? '开启' : '关闭' }}
            </el-tag>
          </template>
        </HyTable>
      </div>

      <!-- 新增/编辑对话框组件 -->
      <MenuFormDialog
        v-model:visible="dialogVisible"
        :is-edit="isEditForm"
        :menu-data="currentMenu"
        :flat-menu-list="flatMenuList"
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
