<script setup>
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { versionCheck } from '@/plugins/refreshPlugin'
import { useStore } from './store'

const { userInfo } = storeToRefs(useStore().userStore)

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
    <el-watermark class="app-watermark" :font="{ color: '#efefef' }" :content="userInfo.account">
      <router-view />
    </el-watermark>
  </el-config-provider>
</template>

<style lang="less" scoped>
.app-watermark {
  width: 100%;
  height: 100%;
  min-width: 1000px;
}
</style>
