<script setup>
import { ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { cloneDeep } from 'lodash-es'
import api from '@/api'
import { getDictList } from '@/tools/tools'

const props = defineProps({
  visible: { type: Boolean, required: true },
  isEdit: { type: Boolean, default: false },
  dictType: { type: Object, default: () => ({}) },
  dictData: { type: Object, default: () => ({}) }
})

const emit = defineEmits(['update:visible', 'success'])

const formRef = ref()
const formData = ref({
  dictLabel: '',
  dictValue: '',
  sort: 0,
  status: 'ENABLED',
  remark: ''
})

const formRules = {
  dictLabel: [
    { required: true, message: '请输入字典标签', trigger: 'blur' },
    { min: 2, max: 20, message: '请输入2-20位字典标签', trigger: 'blur' }
  ],
  dictValue: [
    { required: true, message: '请输入字典值', trigger: 'blur' },
    { min: 1, max: 50, message: '请输入1-50位字典值', trigger: 'blur' }
  ],
  sort: [
    { required: true, message: '请输入排序值', trigger: 'blur' },
    { type: 'number', message: '请输入数字', trigger: 'blur' }
  ]
}

// 提交加载状态
const submitLoading = ref(false)

// 监听传入的字典数据变化
watch(
  () => props.dictData,
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
    const data = { ...formData.value, dictType: props.dictType.dictValue }
    submitLoading.value = true

    if (props.isEdit) {
      await api.sys.dict.editDictData(data)
    } else {
      await api.sys.dict.addDictData(data)
    }

    ElMessage.success(`${props.isEdit ? '编辑' : '新增'}成功`)
    handleClose()
    emit('success')
  } catch (error) {
    console.error('提交表单失败:', error)
    ElMessage.error(`${props.isEdit ? '编辑' : '新增'}失败`)
  } finally {
    submitLoading.value = false
  }
}
</script>

<template>
  <el-dialog :model-value="visible" :title="isEdit ? '编辑字典数据' : '新增字典数据'" :width="500" @close="handleClose">
    <el-form ref="formRef" :model="formData" :rules="formRules" label-width="100px">
      <el-form-item label="字典标签" prop="dictLabel">
        <el-input v-model.trim="formData.dictLabel" placeholder="请输入字典名称" maxlength="20" clearable />
      </el-form-item>

      <el-form-item label="字典值" prop="dictValue">
        <el-input v-model.trim="formData.dictValue" placeholder="请输入字典值" maxlength="50" clearable />
      </el-form-item>

      <el-form-item label="排序" prop="sort">
        <el-input-number v-model="formData.sort" :min="1" :max="9999" :precision="1" placeholder="请输入排序值" />
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="formData.status">
          <el-radio v-for="item in getDictList('SYS_ENABLED_STATUS')" :key="item.dictValue" :label="item.dictValue">
            {{ item.dictLabel }}
          </el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="备注" prop="remark">
        <el-input
          v-model.trim="formData.remark"
          type="textarea"
          :rows="3"
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

<style lang="less" scoped></style>
