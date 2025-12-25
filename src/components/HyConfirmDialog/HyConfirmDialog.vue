<script setup>
defineOptions({ name: 'HyConfirmDialog' })

const props = defineProps({
  // 弹框显示/隐藏
  visible: { type: Boolean, default: false },
  // 弹框title
  title: { type: String, default: '提示' },
  // 对话框的宽度
  width: { type: [String, Number], default: '300' },
  text: { type: String, default: '请确认是否删除？' },
  confirmBtnType: { type: String, default: 'primary' },
  confirmText: { type: String, default: '确定' },
  cancelText: { type: String, default: '取消' },
  loading: { type: Boolean, default: false }
})
const emits = defineEmits(['confirm', 'cancel'])

const innerVisible = ref(false)

watch(
  () => props.visible,
  newVal => {
    innerVisible.value = newVal
  },
  { immediate: true }
)

function handleConfirm() {
  emits('confirm')
}
function handleCancel() {
  emits('cancel')
}
</script>

<template>
  <el-dialog v-model="innerVisible" :width="width" :title="title" v-bind="$attrs" @close="handleCancel">
    <slot>
      <p class="text">{{ text }}</p>
    </slot>
    <template #footer>
      <slot name="footer">
        <div>
          <el-button :type="confirmBtnType" :loading="loading" @click="handleConfirm">{{ confirmText }}</el-button>
          <el-button @click="handleCancel">{{ cancelText }}</el-button>
        </div>
      </slot>
    </template>
  </el-dialog>
</template>

<style lang="less" scoped></style>
