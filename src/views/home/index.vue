<template>
  <img src="@/assets/logo.png" alt="">
  <p class="home">home</p>
  {{ count }}
  <el-button class="home" @click="count++">+1</el-button>
  <el-date-picker v-model="date" type="date" placeholder="Pick a day" />
</template>

<script setup name="Home">
import { ref } from 'vue'

const count = ref(0)
const date = ref(null)
</script>

<style lang="less" scoped>
.home {
  font-size: 32px;
}
</style>
