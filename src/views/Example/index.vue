<script setup>
defineOptions({ name: 'Example' })
const router = useRouter()

function goBack() {
  router.go(-1)
}
</script>

<template>
  <div class="g-main example-container">
    <el-button @click="goBack">-1</el-button>
    <el-card>
      <p v-for="i in 100" :key="i">Example{{ i }}</p>
    </el-card>
  </div>
</template>

<style lang="less" scoped>
.example-container {
  padding: 16px;
}
</style>
