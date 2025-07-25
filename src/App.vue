<script setup name="App">
import { elLocale } from '@/plugins/i18n.js'
import { useUserStore, usePermissionStore } from '@/store'

const { userInfo } = storeToRefs(useUserStore())

const waterContent = computed(() => {
  return userInfo.value.name || ''
})

usePermissionStore().initProject()
</script>

<template>
  <el-config-provider :locale="elLocale">
    <el-watermark :content="waterContent" class="app-watermark">
      <RouterView />
    </el-watermark>
  </el-config-provider>
</template>

<style lang="less" scoped>
.app-watermark {
  width: 100%;
  height: 100%;
}
</style>
