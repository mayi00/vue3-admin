<script setup>
import { ElMessage } from 'element-plus'
import dayjs from 'dayjs'
import api from '@/api'
import { getDictList } from '@/tools/tools'

const props = defineProps({
  visible: { type: Boolean, default: false },
  isEdit: { type: Boolean, default: false },
  noticeData: { type: Object, default: () => ({}) }
})

const emit = defineEmits(['update:visible', 'success'])
const noticeTypeOptions = getDictList('NOTICE_TYPE')

const noticeFormRef = ref(null)
const noticeForm = ref({
  id: '',
  title: '',
  noticeType: '',
  startTime: '',
  endTime: '',
  content: ''
})
const noticeRules = {
  title: [{ required: true, message: '请输入通知标题', trigger: 'blur' }],
  noticeType: [{ required: true, message: '请选择通知类型', trigger: 'change' }],
  startTime: [{ required: true, message: '请选择开始时间', trigger: 'change' }],
  endTime: [
    // { required: true, message: '请选择结束时间', trigger: 'change' }
    {
      validator: (rule, value, callback) => {
        console.log(noticeForm.value.startTime, value, '-----')
        if (noticeForm.value.startTime && value) {
          if (dayjs(value).isBefore(dayjs(noticeForm.value.startTime))) {
            callback('结束时间不能早于开始时间')
          } else {
            callback()
          }
        } else {
          callback()
        }
      },
      trigger: 'change'
    }
  ],
  content: [{ required: true, message: '请输入通知内容', trigger: 'blur' }],
  status: [{ required: true, message: '请选择状态', trigger: 'change' }]
}

// 监听noticeData变化，更新表单数据
watch(
  () => props.noticeData,
  newVal => {
    if (newVal && props.isEdit) {
      Object.assign(noticeForm.value, newVal)
    }
  },
  { deep: true, immediate: true }
)

const loading = ref(false)
// 提交表单
function submitForm() {
  noticeFormRef.value.validate(async valid => {
    if (valid) {
      try {
        loading.value = true
        if (props.isEdit) {
          await api.sys.notice.edit(noticeForm.value)
          ElMessage.success('编辑成功')
        } else {
          await api.sys.notice.add(noticeForm.value)
          ElMessage.success('新增成功')
        }
        emit('success')
        emit('update:visible', false)
      } catch (error) {
        ElMessage.error(error.message || '操作失败，请重试')
      } finally {
        loading.value = false
      }
    }
  })
}
function handleClose() {
  noticeFormRef.value?.resetFields()
  emit('update:visible', false)
}
</script>

<template>
  <el-dialog :model-value="visible" :title="isEdit ? '编辑' : '新增'" width="500px" @close="handleClose">
    <el-form ref="noticeFormRef" :model="noticeForm" :rules="noticeRules" label-width="110px">
      <el-form-item label="通知标题" prop="title">
        <el-input v-model="noticeForm.title" placeholder="请输入通知标题" maxlength="50" clearable></el-input>
      </el-form-item>

      <el-form-item label="通知开始时间" prop="startTime">
        <el-date-picker
          v-model="noticeForm.startTime"
          type="datetime"
          value-format="YYYY-MM-DD HH:mm:ss"
          placeholder="请选择开始时间"
          clearable
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="通知结束时间" prop="endTime">
        <el-date-picker
          v-model="noticeForm.endTime"
          type="datetime"
          value-format="YYYY-MM-DD HH:mm:ss"
          placeholder="请选择结束时间"
          clearable
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="通知类型" prop="noticeType">
        <el-select v-model="noticeForm.noticeType" :disabled="isEdit" placeholder="请选择通知类型" clearable>
          <el-option
            v-for="item in noticeTypeOptions"
            :key="item.dictValue"
            :label="item.dictLabel"
            :value="item.dictValue"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="通知内容" prop="content">
        <HyTinymce v-model:value="noticeForm.content" placeholder="请输入通知内容" />
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button type="primary" :loading="loading" @click="submitForm">
        {{ isEdit ? '保存' : '提交' }}
      </el-button>
      <el-button @click="handleClose">取消</el-button>
    </template>
  </el-dialog>
</template>

<style lang="less" scoped></style>
