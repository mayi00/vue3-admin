<script setup>
import { Icon } from '@iconify/vue'

defineOptions({ name: 'Iconify' })
</script>

<template>
  <div class="g-container">
    <el-card>
      <Icon icon="mdi:home" />

      <Icon icon="line-md:account" />

      <Icon icon="carbon:settings" :inline="true" style="color: #f00; font-size: 24px" />

      <i-mdi-home />
      <i-carbon-settings />
      <i-logos-javascript style="color: #f00; font-size: 24px" />
    </el-card>
  </div>
</template>

<style lang="less" scoped></style>
