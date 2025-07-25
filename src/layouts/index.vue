<script setup>
import AppMain from './AppMain/index.vue'
import TopBar from './TopBar/index.vue'
import { useAppStore } from '@/store'

defineOptions({ name: 'Layout' })

const { sidebarCollapsed } = storeToRefs(useAppStore())
</script>

<template>
  <div class="layout">
    <aside class="layout-aside" :style="{ width: sidebarCollapsed ? '64px' : '240px' }"></aside>
    <section class="layout-section">
      <TopBar />
      <AppMain />
    </section>
  </div>
</template>

<style lang="less" scoped>
.layout {
  display: flex;
  width: 100%;
  height: 100%;
  border: 1px solid var(--gray-5);
}

.layout-aside {
  flex-shrink: 0;
  background-color: var(--white);
  transition: width 0.3s ease;
}

.layout-section {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}
</style>
