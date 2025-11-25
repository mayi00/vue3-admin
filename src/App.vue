<script setup>
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { versionCheck } from '@/plugins/refreshPlugin'
import { onUnmounted } from 'vue'

onMounted(() => {
  setInterval(
    () => {
      versionCheck()
    },
    1000 * 60 * 5
  )
})
onUnmounted(() => {
  clearInterval()
})
</script>

<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>

<style scoped></style>
