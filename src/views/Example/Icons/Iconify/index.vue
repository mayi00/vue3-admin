<script setup>
import { Icon } from '@iconify/vue'
import MdiHome from '~icons/mdi/home'

defineOptions({ name: 'Iconify' })
</script>

<template>
  <div class="g-container">
    <el-card>
      <div class="icon-box">
        字体
        <MdiHome />
        <Icon icon="mdi:home" />
      </div>

      <div class="icon-box">
        <MdiHome />
        <BaseIcon name="mdi:home" />
        <Icon icon="mdi:home" />
        <!-- <icon-mdi:home /> -->
        <!-- <mdi-home /> -->
      </div>

      <div class="icon-box">
        <BaseIcon name="mingcute:close-fill" />
        <Icon icon="mingcute:close-fill" />
      </div>

      <div class="icon-box">
        <BaseIcon name="carbon:settings" :size="24" />
        <Icon icon="carbon:settings" :inline="true" style="color: #f00; font-size: 24px" />
      </div>
    </el-card>
  </div>
</template>

<style lang="less" scoped>
.icon-box {
  border: 1px solid #000;
  margin: 10px;
}
</style>
