<script setup>
import { ElMessage } from 'element-plus'
import { cloneDeep } from 'lodash-es'
import api from '@/api'
import { getDictList } from '@/tools/tools'

const props = defineProps({
  visible: { type: Boolean, required: true },
  isEdit: { type: Boolean, default: false },
  userData: { type: Object, default: () => ({}) }
})

const emit = defineEmits(['update:visible', 'success'])

// 字典数据
const genderOptions = getDictList('GENDER')
const statusOptions = getDictList('SYS_ENABLED_STATUS')

const formRef = ref()
const formData = ref({
  id: '',
  avatar: '',
  account: '',
  name: '',
  gender: '',
  mobile: '',
  email: '',
  status: 'ENABLED',
  remark: ''
})
const formRules = {
  account: [
    { required: true, message: '请输入登录帐号', trigger: 'blur' },
    { min: 4, max: 20, message: '请输入4-20位登录帐号', trigger: 'blur' }
  ],
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { min: 2, max: 20, message: '2-20个字符', trigger: 'blur' }
  ],
  mobile: [{ pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }],
  email: [{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }]
}

// 提交加载状态
const submitLoading = ref(false)

// 监听传入的用户数据变化
watch(
  () => props.userData,
  newVal => {
    if (props.isEdit && newVal) {
      formData.value = cloneDeep(newVal)
    }
  },
  { immediate: true, deep: true }
)

// 关闭对话框
const handleClose = () => {
  formRef.value?.resetFields()
  emit('update:visible', false)
}

// 提交表单
const handleSubmit = async () => {
  try {
    await formRef.value.validate()
    const data = { ...formData.value }
    submitLoading.value = true
    if (props.isEdit) {
      await api.sys.user.edit(data)
    } else {
      await api.sys.user.add(data)
    }
    ElMessage.success(`${props.isEdit ? '操作' : '新增'}成功`)
    handleClose()
    emit('success')
  } catch (error) {
    console.error(error)
  } finally {
    submitLoading.value = false
  }
}
</script>

<template>
  <el-dialog :model-value="visible" :title="isEdit ? '编辑' : '新增'" :width="500" @close="handleClose">
    <el-form ref="formRef" :model="formData" :rules="formRules" label-width="100px">
      <el-form-item label="登录帐号" prop="account">
        <el-input v-model.trim="formData.account" :disabled="isEdit" placeholder="请输入登录帐号" maxlength="20" />
      </el-form-item>

      <el-form-item label="姓名" prop="name">
        <el-input v-model.trim="formData.name" placeholder="请输入姓名" maxlength="20" />
      </el-form-item>

      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="formData.gender">
          <el-radio v-for="item in genderOptions" :key="item.value" :value="item.value" :label="item.label"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="手机号" prop="mobile">
        <el-input v-model.trim="formData.mobile" placeholder="请输入手机号" maxlength="11" />
      </el-form-item>

      <el-form-item label="邮箱" prop="email">
        <el-input v-model="formData.email" placeholder="请输入邮箱" />
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="formData.status">
          <el-radio
            v-for="item in statusOptions"
            :key="item.dictValue"
            :value="item.dictValue"
            :label="item.dictLabel"
          ></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="备注" prop="remark">
        <el-input
          v-model="formData.remark"
          type="textarea"
          :rows="{ minRows: 2, maxRows: 5 }"
          placeholder="请输入备注"
          maxlength="200"
          clearable
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button type="primary" :loading="submitLoading" @click="handleSubmit">确定</el-button>
      <el-button @click="handleClose">取消</el-button>
    </template>
  </el-dialog>
</template>

<style scoped>
.avatar-uploader .avatar {
  width: 100px;
  height: 100px;
  display: block;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  text-align: center;
}
</style>
