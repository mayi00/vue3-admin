<script setup name="Layout">
import Sidebar from './Sidebar/Sidebar.vue'
import NavBar from './NavBar/NavBar.vue'
import TagsBar from './TagsBar/TagsBar.vue'
import Breadcrumb from './Breadcrumb/Breadcrumb.vue'
import AppMain from './AppMain/AppMain.vue'

defineOptions({ name: 'Layout' })
</script>

<template>
  <div class="layout">
    <aside class="layout-sidebar">
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
  background-color: var(--gray-3);
  border: 1px solid var(--gray-5);
}

.layout-sidebar {
  width: 220px;
  flex-shrink: 0;
}

.layout-main {
  position: relative;
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
