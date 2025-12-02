<script setup>
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { ElConfigProvider } from 'element-plus'
import { versionCheck } from '@/plugins/refreshPlugin'
import { useStore } from './store'
import { isPC, isTablet } from '@/utils/utils'

const { userInfo } = storeToRefs(useStore().userStore)
const isPCFlag = ref(true)
// 检测是否为PC设备
const checkDeviceType = () => {
  isPCFlag.value = isPC() || isTablet()
}

checkDeviceType()

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
    <el-watermark v-if="isPCFlag" class="app-watermark" :font="{ color: '#efefef' }" :content="userInfo.account || ''">
      <router-view />
    </el-watermark>
    <div v-else class="mobile-tip">
      <el-alert
        title="设备提示"
        description="当前系统仅支持PC端访问，请使用电脑浏览器打开以获得最佳体验！"
        type="warning"
        show-icon
        center
        :closable="false"
      />
    </div>
  </el-config-provider>
</template>

<style lang="less" scoped>
.app-watermark {
  width: 100%;
  height: 100%;
  min-width: 1000px;
}

.mobile-tip {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 20px;
  box-sizing: border-box;
}
</style>
