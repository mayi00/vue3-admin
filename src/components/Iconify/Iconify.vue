<script setup>
import { Icon } from '@iconify/vue'

defineOptions({ name: 'Iconify' })

const props = defineProps({
  icon: { type: String, default: '' },
  size: { type: Number, default: 16 },
  color: { type: String, default: '' },
})
const emit = defineEmits([])
</script>

<template>
  <Icon icon="carbon:settings" :inline="true" style="color: #f00; font-size: 24px" />
</template>

<style lang="less" scoped></style>
