<script setup name="App">
import { useAppStore } from '@/store'

const appStore = useAppStore()
</script>

<template>
  <el-config-provider :locale="appStore.locale">
    <RouterView />
  </el-config-provider>
</template>
