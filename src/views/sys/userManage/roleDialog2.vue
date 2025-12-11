<script setup>
import { ElMessage } from 'element-plus'
import api from '@/api'

const props = defineProps({
  visible: { type: Boolean, default: false },
  userData: { type: Object, default: () => {}, required: true }
})

const emit = defineEmits(['update:visible', 'success'])

const innerVisible = ref(false)
const loading = ref(false)
const assignedRoles = ref([])
const allRoles = ref([])
const title = computed(() => `为 ${props.userData.name} 分配角色`)

watch(
  () => props.visible,
  val => {
    assignedRoles.value = []
    allRoles.value = []
    innerVisible.value = val
    if (val) {
      initRoleData()
    }
  }
)

watch(innerVisible, val => {
  emit('update:innerVisible', val)
})

// 初始化角色数据
async function initRoleData() {
  try {
    loading.value = true

    Promise.all([api.sys.user.getUserRoles(props.userData.id), api.sys.role.allList()]).then(res => {
      // 用户当前角色
      assignedRoles.value = res[0].data.map(role => role.code)
      // 所有角色列表
      allRoles.value = res[1].data.map(role => ({
        key: role.code,
        label: role.label,
        disabled: false
      }))
    })
  } catch (error) {
    ElMessage.error('获取角色数据失败')
    console.error(error)
  } finally {
    loading.value = false
  }
}

// 保存角色分配
async function saveRoleAssignment() {
  try {
    loading.value = true
    await api.sys.user.saveRoles({
      userId: props.userId,
      roles: assignedRoles.value
    })

    ElMessage.success('角色分配成功')
    emit('success')
  } catch (error) {
    ElMessage.error('角色分配失败')
    console.error(error)
  } finally {
    loading.value = false
  }
}

// 关闭对话框
function handleClose() {
  assignedRoles.value = []
  allRoles.value = []
  emit('update:visible', false)
}
</script>

<template>
  <el-dialog v-model="innerVisible" :title="title" width="600px" @close="handleClose">
    <el-transfer
      v-model="assignedRoles"
      :data="allRoles"
      :titles="['可用角色', '已选择角色']"
      filterable
      :filter-placeholder="'请输入角色名称'"
    />
    <template #footer>
      <el-button type="primary" :loading="loading" @click="saveRoleAssignment">保存</el-button>
      <el-button @click="handleClose">取消</el-button>
    </template>
  </el-dialog>
</template>

<style scoped></style>
