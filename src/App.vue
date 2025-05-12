<script setup name="App">
import { elLocale } from '@/plugins/i18n.js'
import { useUserStore } from '@/store'

const { userInfo } = storeToRefs(useUserStore())
</script>

<template>
  <el-config-provider :locale="elLocale">
    <el-watermark :content="userInfo.username">
      <RouterView />
    </el-watermark>
  </el-config-provider>
</template>
