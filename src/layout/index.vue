<script setup name="Layout">
import Sidebar from './Sidebar/Sidebar.vue'
import NavBar from './NavBar/NavBar.vue'
import AppMain from './AppMain/AppMain.vue'

defineOptions({
  name: 'Layout',
})

const router = useRouter()
const allRoutes = router.getRoutes()
const keepAliveRoutes = computed(() => {
  return allRoutes.filter(route => route.meta?.keepAlive).map(route => route.name)
})
</script>

<template>
  <div class="layout-container">
    <aside class="layout-sidebar">
      <Sidebar />
    </aside>
    <article class="layout-main">
      <NavBar />
      <AppMain />
      <!-- <nav class="navbar">顶部</nav> -->
      <!-- <section class="main"> -->
      <!-- <RouterView v-slot="{ Component, route }">
          <transition name="fade" mode="out-in" appear>
            <KeepAlive :include="keepAliveRoutes">
              <component :is="Component" :key="route.path" />
            </KeepAlive>
          </transition>
        </RouterView> -->
      <!-- </section> -->
    </article>
  </div>
</template>

<style lang="less" scoped>
.layout-container {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  background-color: var(--gray-3);
}

.layout-sidebar {
  width: 220px;
  flex-shrink: 0;
}

.layout-main {
  position: relative;
  height: 100%;
  flex: 1;

  .navbar {
    height: 50px;
    background-color: #f0f0f0;
  }

  .main {
    position: relative;
    flex: 1;
    overflow-y: auto;
  }
}
</style>
