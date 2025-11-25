<script setup>
import AppMain from './AppMain/AppMain.vue'
import Sidebar from './Sidebar/Sidebar.vue'
import TopBar from './TopBar/TopBar.vue'
import { useAppStore } from '@/store'

defineOptions({ name: 'Layout' })

const appStore = useAppStore()
const { sidebarWidth } = storeToRefs(appStore)
</script>

<template>
  <div class="layout w-full h-full">
    <aside class="layout-aside" :style="{ width: sidebarWidth }">
      <Sidebar />
    </aside>
    <section class="layout-section">
      <TopBar />
      <AppMain />
    </section>
  </div>
</template>

<style lang="less" scoped>
.layout {
  display: flex;
  border: 1px solid #fefefe;
}

.layout-aside {
  flex-shrink: 0;
  background-color: #fff;
  transition: width 0.3s ease;
}

.layout-section {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}
</style>
