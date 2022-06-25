<template>
  <img src="@/assets/logo.png" alt="">
  <p class="home">home</p>
  {{ count }}
  <el-button class="home" @click="count++">+1</el-button>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<style lang="less" scoped>
.home {
  font-size: 32px;
}
</style>
