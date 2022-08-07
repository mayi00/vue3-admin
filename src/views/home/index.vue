<script setup name="Home">
import { ref } from 'vue'

const date = ref(null)
</script>

<template>
  <div class="home-container container">
    <p class="home">home</p>
    <el-date-picker v-model="date" type="date" placeholder="请选择日期" />
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
    <el-button>中文</el-button>
  </div>
</template>

<style lang="less" scoped>
.home {
  font-size: 32px;
}
</style>
