<script setup>
defineOptions({ name: 'Error404' })

const router = useRouter()
const countdown = ref(6)
let interval = null

onMounted(() => {
  interval = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(interval)
      goHome()
    }
  }, 1000)
})
onBeforeUnmount(() => {
  clearInterval(interval)
})

function goHome() {
  router.push({ path: '/home', name: 'Home' })
}
</script>

<template>
  <div class="g-container error-container">
    <div class="left-section">
      <img src="@/assets/images/404.png" alt="404 Not Found" class="error-image" />
    </div>
    <div class="right-section">
      <p>抱歉，您访问的页面不存在。</p>
      <el-button @click="goHome">返回首页</el-button>
      <p style="font-size: 14px; color: #999; margin-top: 10px">{{ countdown }} 秒后将自动返回首页</p>
    </div>
  </div>
</template>

<style lang="less" scoped>
.error-container {
  display: flex;
  align-items: center;
  justify-content: center;

  .left-section {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    .error-image {
      max-width: 100%;
      max-height: 80vh;
      object-fit: contain;
    }
  }

  .right-section {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 20px;
    p {
      font-size: 18px;
      color: #666;
      margin: 20px 0;
    }
  }
}
</style>
