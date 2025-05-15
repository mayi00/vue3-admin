<script setup name="App">
import { elLocale } from '@/plugins/i18n.js'
import { useUserStore } from '@/store'

const { userInfo } = storeToRefs(useUserStore())

const waterContent = computed(() => {
  return userInfo.value.name || ''
})
</script>

<template>
  <el-config-provider :locale="elLocale">
    <!-- <el-watermark :content="waterContent"> -->
    <RouterView />
    <!-- </el-watermark> -->
  </el-config-provider>
</template>
