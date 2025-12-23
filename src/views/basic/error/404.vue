<script setup>
defineOptions({ name: '404' })

const router = useRouter()

const goHome = () => {
  router.replace('/')
}

const goBack = () => {
  router.back()
}
</script>

<template>
  <div class="g-container error-container">
    <el-card class="error-404">
      <div class="error-404__title">404</div>
      <div class="error-404__desc">页面不存在</div>
      <div class="error-404__actions">
        <el-button type="primary" @click="goHome">返回首页</el-button>
        <el-button type="default" @click="goBack">返回上一页</el-button>
      </div>
    </el-card>
  </div>
</template>

<style lang="less" scoped>
.error-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.error-404 {
  text-align: center;
  padding: 40px;
}

.error-404__title {
  font-size: 72px;
  font-weight: bold;
  color: #409eff;
  margin-bottom: 16px;
}

.error-404__desc {
  font-size: 18px;
  color: #606266;
  margin-bottom: 30px;
}

.error-404__actions {
  display: flex;
  justify-content: center;
  gap: 20px;
}
</style>
