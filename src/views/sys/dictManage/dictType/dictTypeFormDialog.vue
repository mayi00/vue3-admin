<script setup>
import { ElMessage } from 'element-plus'
import { cloneDeep } from 'lodash-es'
import api from '@/api'
import { getDictList } from '@/tools/tools'

const props = defineProps({
  visible: { type: Boolean, required: true },
  isEdit: { type: Boolean, default: false },
  dictTypeData: { type: Object, default: () => ({}) }
})

const emit = defineEmits(['update:visible', 'success'])

const formRef = ref()
const formData = ref({
  id: '',
  dictLabel: '',
  dictValue: '',
  status: '',
  remark: ''
})
const formRules = {
  dictLabel: [
    { required: true, message: '请输入字典类型名称', trigger: 'blur' },
    { min: 2, max: 20, message: '请输入2-20位字典类型名称', trigger: 'blur' }
  ],
  dictValue: [
    { required: true, message: '请输入字典类型值', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9_]+$/, message: '请输入字母、数字和下划线组成的字典类型值', trigger: 'blur' }
  ]
}

// 提交加载状态
const submitLoading = ref(false)

// 监听传入的字典类型数据变化
watch(
  () => props.dictTypeData,
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
  formRef.value.validate(async valid => {
    if (valid) {
      try {
        const data = { ...formData.value }
        submitLoading.value = true
        if (props.isEdit) {
          await api.sys.dict.edit(data)
        } else {
          await api.sys.dict.add(data)
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
  <el-dialog :model-value="visible" :title="isEdit ? '编辑' : '新增'" :width="500" @close="handleClose">
    <el-form ref="formRef" :model="formData" :rules="formRules" label-width="120px">
      <el-form-item label="字典类型名称" prop="dictLabel">
        <el-input v-model.trim="formData.dictLabel" placeholder="请输入字典类型名称" maxlength="20" clearable />
      </el-form-item>

      <el-form-item label="字典类型值" prop="dictValue">
        <el-input
          v-model.trim="formData.dictValue"
          :disabled="isEdit"
          placeholder="请输入字典类型值"
          maxlength="50"
          clearable
        />
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="formData.status">
          <el-radio
            v-for="item in getDictList('SYS_ENABLED_STATUS')"
            :key="item.dictValue"
            :label="item.dictLabel"
            :value="item.dictValue"
          ></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="备注" prop="remark">
        <el-input
          v-model.trim="formData.remark"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 5 }"
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
