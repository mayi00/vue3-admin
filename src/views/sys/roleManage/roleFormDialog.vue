<script setup>
import { ElMessage } from 'element-plus'
import { cloneDeep } from 'lodash-es'
import { getDictList } from '@/tools/tools'
import api from '@/api'

const props = defineProps({
  visible: { type: Boolean, required: true },
  isEdit: { type: Boolean, default: false },
  roleData: { type: Object, default: () => ({}) }
})

const emit = defineEmits(['update:visible', 'success'])

// 表单
const roleFormRef = ref(null)
const submitLoading = ref(false)
const roleForm = ref({
  id: '',
  roleCode: '',
  roleName: '',
  remark: '',
  status: 'ENABLED'
})
const formRules = {
  roleCode: [{ required: true, message: '请输入角色编码', trigger: 'blur' }],
  roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
  status: [{ required: true, message: '请选择状态', trigger: 'change' }]
}

// 监听角色数据变化
watch(
  () => props.roleData,
  newVal => {
    if (props.isEdit) {
      roleForm.value = cloneDeep(newVal)
    }
  },
  { deep: true, immediate: true }
)

// 关闭对话框
function handleClose() {
  roleFormRef.value?.resetFields()
  emit('update:visible', false)
}

// 提交表单
async function handleSubmit() {
  roleFormRef.value.validate(async valid => {
    if (valid) {
      try {
        const data = { ...roleForm.value }
        submitLoading.value = true
        if (props.isEdit) {
          await api.sys.role.edit(data)
        } else {
          await api.sys.role.add(data)
        }
        ElMessage.success(`${props.isEdit ? '编辑' : '新增'}成功`)
        handleClose()
        emit('success')
      } catch (error) {
        console.error(error)
        ElMessage.error(`${props.isEdit ? '编辑' : '新增'}失败：${error.message || '未知错误'}`)
      } finally {
        submitLoading.value = false
      }
    }
  })
}
</script>

<template>
  <el-dialog :model-value="visible" :title="isEdit ? '编辑角色' : '新增角色'" width="480px" @close="handleClose">
    <el-form ref="roleFormRef" :model="roleForm" label-width="80px" :rules="formRules">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="roleForm.roleName" placeholder="请输入角色名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="角色编码" prop="roleCode">
        <el-input v-model="roleForm.roleCode" placeholder="请输入角色编码" :disabled="isEdit" clearable></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="roleForm.status" >
          <el-radio-button v-for="item in getDictList('SYS_ENABLED_STATUS')" :key="item.dictValue" :label="item.dictLabel" :value="item.dictValue" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input
          v-model="roleForm.remark"
          placeholder="请输入备注"
          type="textarea"
          :rows="3"
          maxlength="50"
          clearable
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" :loading="submitLoading" @click="handleSubmit">确认</el-button>
      <el-button @click="handleClose">取消</el-button>
    </template>
  </el-dialog>
</template>

<style lang="less" scoped></style>
