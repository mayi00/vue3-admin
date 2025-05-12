<script setup name="App">
import { eleLocale } from '@/plugins/i18n.js'
</script>

<template>
  <el-config-provider :locale="eleLocale">
    <RouterView />
  </el-config-provider>
</template>
