<script setup>
defineOptions({ name: 'Breadcrumb' })
</script>

<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>表格</el-breadcrumb-item>
      <el-breadcrumb-item>tableA</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<style lang="less" scoped>
.breadcrumb {
  padding: 0 16px;
  height: 30px;
  display: flex;
  align-items: center;
}
</style>
