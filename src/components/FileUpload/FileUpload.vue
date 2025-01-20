<script setup>
import { ElMessage } from 'element-plus'

defineOptions({ name: 'FileUpload' })

const props = defineProps({
  // 控制弹框显示/隐藏
  dialogVisible: { type: Boolean, default: false },
  // 对话框的宽度
  width: { type: [String, Number], default: '500' },
  // 弹框title
  title: { type: String, default: '上传' },
  // 是否需要遮罩层
  modal: { type: Boolean, default: true },
  // 为 Dialog 启用可拖拽功能
  draggable: { type: Boolean, default: true },
  // 是否支持多选文件
  multiple: { type: Boolean, default: true },
  // 允许上传文件的最大数量
  limit: { type: Number, default: 3 },
  // 接受上传的文件类型
  accept: { type: [String, Array], default: '.xls,.xlsx' },
  // 上传时的按钮loading
  loading: { type: Boolean, default: false },
})
const emits = defineEmits(['on-confirm', 'on-cancel'])

// 控制弹框显示/隐藏
const dialogVisible = ref(false)
// 上传的文件列表
const fileList = ref([])
// 是否禁用上传
const disabled = ref(false)

watch(
  () => props.dialogVisible,
  newVal => {
    dialogVisible.value = newVal
  },
  { immediate: true }
)

// 上传之前
function handleBeforeUpload(file) {
  if (fileList.value.length < props.limit) {
    fileList.value.push(file)
  } else {
    ElMessage.warning(`最多允许上传${props.limit}个文件`)
  }
  return false
}
// 删除已选择的文件
function handleDelFile(file) {
  const i = fileList.value.findIndex(item => item.uid === file.uid)
  if (i !== -1) {
    fileList.value.splice(i, 1)
  }
}
// 取消
function handleCancel() {
  emits('on-cancel')
  fileList.value = []
}
// 确定
function handleConfirm() {
  if (fileList.value.length === 0) {
    ElMessage.error('请选择要上传的文件')
  } else {
    emits('on-confirm', fileList.value)
  }
}
</script>

<template>
  <ElDialog
    v-model="dialogVisible"
    :title="title"
    :width="width"
    :modal="modal"
    :draggable="draggable"
    :before-close="handleCancel"
  >
    <ElUpload
      :multiple="multiple"
      :limit="limit"
      drag
      action=""
      :accept="accept"
      :before-upload="handleBeforeUpload"
      :disabled="disabled"
    >
      <ElIcon class="el-icon--upload"><upload-filled /></ElIcon>
      <p>将文件拖到此处或点击上传</p>
    </ElUpload>
    <ul v-if="fileList.length > 0" class="file-list">
      <li v-for="item in fileList" :key="item.uid" class="file-box">
        <span>{{ item.name }}</span>
        <ElIcon class="icon-del" size="16px" @click="handleDelFile(item)"><CircleClose /></ElIcon>
      </li>
    </ul>
    <template #footer>
      <div class="dialog-footer">
        <ElButton @click="handleCancel">取消</ElButton>
        <ElButton type="primary" :loading="loading" @click="handleConfirm">确定</ElButton>
      </div>
    </template>
  </ElDialog>
</template>

<style lang="less" scoped>
.file-list {
  margin-top: 8px;

  .file-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 24px;

    .icon-del {
      cursor: pointer;
      &:hover {
        color: #f60;
      }
    }
  }
}
</style>
