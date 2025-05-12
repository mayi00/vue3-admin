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
    flex: 1; /* 占据左侧空间 */
    display: flex;
    justify-content: flex-end; /* 图片靠右对齐 */
    .error-image {
      max-width: 100%;
      max-height: 80vh; /* 限制图片最大高度为视口的 80% */
      object-fit: contain; /* 保持图片比例 */
    }
  }
  .right-section {
    flex: 1; /* 占据右侧空间 */
    display: flex;
    flex-direction: column;
    align-items: flex-start; /* 内容左对齐 */
    padding-left: 20px; /* 内容与左侧图片的间距 */
    p {
      font-size: 18px;
      color: #666;
      margin: 20px 0;
    }
  }
}
</style>
