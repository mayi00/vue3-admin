<script setup>
import { ElMessage } from 'element-plus'
import api from '@/api'

const props = defineProps({
  visible: { type: Boolean, default: false },
  isEdit: { type: Boolean, default: false },
  noticeData: { type: Object, default: () => ({}) }
})

const emit = defineEmits(['update:visible', 'success'])
const statusOptions = getDictList('SYS_ENABLED_STATUS')

const noticeFormRef = ref(null)
const noticeForm = reactive({
  id: '',
  title: '',
  noticeType: '1',
  startTime: '',
  endTime: '',
  content: '',
  status: '1'
})
const noticeRules = {
  title: [{ required: true, message: '请输入通知标题', trigger: 'blur' }],
  noticeType: [{ required: true, message: '请选择通知类型', trigger: 'change' }],
  startTime: [{ required: true, message: '请选择开始时间', trigger: 'change' }],
  endTime: [{ required: true, message: '请选择结束时间', trigger: 'change' }],
  content: [{ required: true, message: '请输入通知内容', trigger: 'blur' }],
  status: [{ required: true, message: '请选择状态', trigger: 'change' }]
}

const loading = ref(false)

// 监听noticeData变化，更新表单数据
watch(
  () => props.noticeData,
  newVal => {
    if (newVal && props.isEdit) {
      Object.assign(noticeForm, newVal)
    }
  },
  { deep: true, immediate: true }
)

// 监听visible变化，重置表单
watch(
  () => props.visible,
  newVal => {
    if (newVal && !props.isEdit) {
      resetForm()
    }
  }
)

// 重置表单
function resetForm() {
  noticeFormRef.value?.resetFields()
}

// 提交表单
async function submitForm() {
  if (!noticeFormRef.value) return

  try {
    await noticeFormRef.value.validate()

    loading.value = true

    if (props.isEdit) {
      // 编辑
      await api.sys.notice.edit(noticeForm)
      ElMessage.success('编辑成功')
    } else {
      // 新增
      await api.sys.notice.add(noticeForm)
      ElMessage.success('新增成功')
    }

    emit('success')
    emit('update:visible', false)
  } catch (error) {
    if (error.message !== 'cancel') {
      ElMessage.error('操作失败，请重试')
    }
  } finally {
    loading.value = false
  }
}

// 取消
function handleClose() {
  emit('update:visible', false)
}
</script>

<template>
  <el-dialog v-model="visible" :title="isEdit ? '编辑' : '新增'" width="600px" @close="handleClose">
    <el-form ref="noticeFormRef" :model="noticeForm" :rules="noticeRules" label-width="100px">
      <el-form-item label="通知标题" prop="title">
        <el-input v-model="noticeForm.title" placeholder="请输入通知标题" maxlength="100" clearable></el-input>
      </el-form-item>

      <el-form-item label="开始时间" prop="startTime">
        <el-date-picker
          v-model="noticeForm.startTime"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="请选择开始时间"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="结束时间" prop="endTime">
        <el-date-picker
          v-model="noticeForm.endTime"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="请选择结束时间"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="通知类型" prop="noticeType">
        <el-select v-model="noticeForm.noticeType" :disabled="isEdit" placeholder="请选择通知类型">
          <el-option label="通知" value="1"></el-option>
          <el-option label="公告" value="2"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="通知内容" prop="content">
        <el-input
          v-model="noticeForm.content"
          type="textarea"
          :rows="6"
          placeholder="请输入通知内容"
          maxlength="2000"
          clearable
        ></el-input>
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-select v-model="noticeForm.status" placeholder="请选择状态">
          <el-option
            v-for="item in statusOptions"
            :key="item.dictValue"
            :label="item.dictLabel"
            :value="item.dictValue"
          ></el-option>
        </el-select>
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
