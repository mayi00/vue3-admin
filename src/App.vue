<script setup name="App">
import { elLocale } from '@/plugins/i18n.js'
</script>

<template>
  <el-config-provider :locale="elLocale">
    <RouterView />
  </el-config-provider>
</template>
