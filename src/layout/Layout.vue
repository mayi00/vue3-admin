<script setup>
import Sidebar from './Sidebar/Sidebar.vue'
import NavBar from './NavBar/NavBar.vue'
import TagsBar from './TagsBar/TagsBar.vue'
import Breadcrumb from './Breadcrumb/Breadcrumb.vue'
import AppMain from './AppMain/AppMain.vue'
import { useAppStore } from '@/store'

defineOptions({ name: 'Layout' })

const { sidebarIsCollapse } = storeToRefs(useAppStore())
</script>

<template>
  <div class="layout">
    <aside class="layout-sidebar" :style="{ width: sidebarIsCollapse ? '64px' : '220px' }">
      <Sidebar />
    </aside>
    <article class="layout-main">
      <NavBar />
      <TagsBar />
      <Breadcrumb />
      <AppMain />
    </article>
  </div>
</template>

<style lang="less" scoped>
.layout {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  border: 1px solid var(--gray-5);
}

.layout-sidebar {
  flex-shrink: 0;
  background-color: var(--white);
  transition: width 0.3s ease;
}

.layout-main {
  position: relative;
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
