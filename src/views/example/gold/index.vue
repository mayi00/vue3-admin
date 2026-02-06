<script setup>
import ShGold from './shGold.vue'
import LondonGold from './londonGold.vue'

defineOptions({ name: 'Gold' })
</script>

<template>
  <div class="g-container">
    <el-card shadow="hover" style="margin-top: 10px">
      <ShGold />
    </el-card>
    <el-card shadow="hover" style="margin-top: 10px">
      <LondonGold />
    </el-card>
  </div>
</template>

<style lang="less" scoped></style>
