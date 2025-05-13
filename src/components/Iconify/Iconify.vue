<script setup>
import { Icon } from '@iconify/vue'

defineOptions({ name: 'Iconify' })

const props = defineProps({
  icon: { type: String, default: '' }, // 必传图标名称（如 "carbon:settings"）
  size: { type: Number, default: 16 }, // 图标尺寸（单位px）
  color: { type: String, default: '' }, // 图标颜色（支持hex/rgb/颜色名）
})
</script>

<template>
  <Icon
    :icon="icon"
    :inline="true"
    :style="{
      fontSize: `${size}px`,
      color: color || 'currentColor',
      verticalAlign: 'middle',
    }"
  />
</template>

<style lang="less" scoped></style>
