<script setup>
defineOptions({ name: 'ConfirmDialog' })

const props = defineProps({
  // 弹框显示/隐藏
  visible: { type: Boolean, default: false },
  // 弹框title
  title: { type: String, default: '提示' },
  // 对话框的宽度
  width: { type: [String, Number], default: '300' },
  // 弹框title
  title: { type: String, default: '请确认' },
  // 是否需要遮罩层
  modal: { type: Boolean, default: true },
  // Dialog 自身是否插入至 body 元素上。 嵌套的 Dialog 必须指定该属性并赋值为 true
  appendToBody: { type: Boolean, default: true },
  // 是否可以通过点击 modal 关闭 Dialog
  closeOnClickModal: { type: Boolean, default: true },
  // 是否可以通过按下 ESC 关闭 Dialog
  closeOnPressEscape: { type: Boolean, default: true },
  // 是否显示关闭按钮
  showClose: { type: Boolean, default: true },
  // 为 Dialog 启用可拖拽功能
  draggable: { type: Boolean, default: false },
  // 拖动范围可以超出可视区
  overflow: { type: Boolean, default: false },
  text: { type: String, default: '请确认是否删除？' },
  confirmText: { type: String, default: '确定' },
  cancelText: { type: String, default: '取消' },
  loading: { type: Boolean, default: false },
})
const emits = defineEmits(['on-confirm', 'on-cancel'])

const dialogVisible = ref(false)

watch(
  () => props.visible,
  newVal => {
    dialogVisible.value = newVal
  },
  { immediate: true }
)

function handleConfirm() {
  emits('on-confirm')
}
function handleCancel() {
  emits('on-cancel')
}
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :title="title"
    :width="width"
    :modal="modal"
    :append-to-body="appendToBody"
    :close-on-click-modal="closeOnClickModal"
    :close-on-press-escape="closeOnPressEscape"
    :show-close="showClose"
    :draggable="draggable"
    :overflow="overflow"
    @close="handleCancel"
  >
    <slot>
      <p class="text">{{ text }}</p>
    </slot>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" :loading="loading" @click="handleConfirm">{{ confirmText }}</el-button>
        <el-button @click="handleCancel">{{ cancelText }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="less" scoped></style>
