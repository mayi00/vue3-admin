<script setup>
import { ElMessage } from 'element-plus'
import api from '@/api'

const props = defineProps({
  visible: { type: Boolean, default: false },
  roleData: { type: Object, required: true, default: () => ({}) }
})

const emit = defineEmits(['update:visible', 'success'])

const loading = ref(false)
const submitLoading = ref(false)
const menuTreeRef = ref(null)
const menuTreeData = ref([])
const menuSearchKey = ref('')

const loadMenuTree = async () => {
  loading.value = true
  try {
    Promise.all([
      // 获取菜单树数据
      api.sys.menu.list(),
      // 获取角色已分配的菜单权限
      api.sys.role.getRolePermissions({ roleId: props.roleData.id })
    ]).then(([menuRes, permissionRes]) => {
      menuTreeData.value = menuRes.data || []
      // const selectedMenuIds = permissionRes.data || []
      const selectedMenuIds = ['2-1-1', '2-1-1-1', '1-2']
      nextTick(() => {
        // 设置默认选中
        menuTreeRef.value?.setCheckedKeys(selectedMenuIds)
      })
    })
  } catch (error) {
    ElMessage.error('获取菜单权限失败')
    console.error('获取菜单权限失败:', error)
  } finally {
    loading.value = false
  }
}
// 过滤菜单树节点
const filterNodeMethod = (value, data) => {
  if (!value) return true
  return data.meta.title.toLowerCase().includes(value.toLowerCase())
}

const handleMenuSearch = () => {
  menuTreeRef.value?.filter(menuSearchKey.value)
}

const handleSubmit = async () => {
  if (!props.roleData.id) return

  submitLoading.value = true
  try {
    // 获取所有选中的菜单节点
    const checkedNodes = menuTreeRef.value.getCheckedNodes()
    const menuIds = checkedNodes.map(node => node.id)

    await api.sys.role.assignPermissions({
      roleId: props.roleData.id,
      menuIds: menuIds
    })

    ElMessage.success('权限分配成功')
    emit('success')
    emit('update:visible', false)
  } catch (error) {
    ElMessage.error('权限分配失败')
    console.error('权限分配失败:', error)
  } finally {
    submitLoading.value = false
  }
}
const handleClose = () => {
  menuSearchKey.value = ''
  emit('update:visible', false)
}
</script>

<template>
  <el-drawer
    :model-value="visible"
    :title="`分配菜单权限 【${props.roleData.roleName}】`"
    size="60%"
    class="role-permission-drawer"
    @open="loadMenuTree"
    @close="handleClose"
  >
    <div class="permission-wrapper">
      <el-input
        v-model.trim="menuSearchKey"
        placeholder="搜索菜单"
        clearable
        style="width: 100%"
        @input="handleMenuSearch"
      >
        <template #prefix>
          <el-icon><Search /></el-icon>
        </template>
      </el-input>
      <div class="menu-tree-wrapper">
        <el-tree
          ref="menuTreeRef"
          :data="menuTreeData"
          :filter-node-method="filterNodeMethod"
          show-checkbox
          node-key="id"
          class="h-full"
        >
          <template #default="{ node, data }">
            {{ data.meta.title }}
          </template>
        </el-tree>
      </div>
    </div>
    <template #footer>
      <el-button type="primary" @click="handleSubmit" :loading="submitLoading">确定</el-button>
      <el-button @click="handleClose">取消</el-button>
    </template>
  </el-drawer>
</template>

<style lang="less">
:deep(.el-drawer) {
  .el-drawer__header {
    padding: 15px 20px;
    margin: 0;
  }
}
</style>

<style lang="less" scoped>
.permission-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;

  .menu-tree-wrapper {
    flex: 1;
    min-height: 0;
  }
}
</style>
