<script setup>
import { useElementHeight } from '@/hooks/useElement.js'

defineOptions({ name: 'Dashboard' })

const { elementHeight: cardHeight } = useElementHeight({ offset: 67 })
</script>

<template>
  <div class="g-container">
    <el-card shadow="hover" :style="{ height: cardHeight + 'px' }">Dashboard</el-card>
  </div>
</template>

<style lang="less" scoped></style>
