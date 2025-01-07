<!--
 * @Description : layout 布局容器
 * @Author      : huazf
 * @Date        : 2022-06-25
 * @LastEditors : huazf
 * @LastEditTime: 2022-07-05
 * @FilePath    : \vue3-admin\src\layout\index.vue
-->

<script setup name="Layout">
import Sidebar from './components/Sidebar/index.vue'

defineOptions({
  name: 'Layout'
})

const router = useRouter()
const allRoutes = router.getRoutes()
const keepAliveRoutes = computed(() => {
  return allRoutes.filter(route => route.meta?.keepAlive).map(route => route.name)
})
</script>

<template>
  <div class="layout-container">
    <div class="sidebar-box">
      <Sidebar />
    </div>
    <div class="main-box">
      <div class="navbar">顶部</div>
      <section class="main">
        <router-view v-slot="{ Component, route }">
          <transition name="fade" mode="out-in" appear>
            <keep-alive :include="keepAliveRoutes">
              <component :is="Component" :key="route.path" />
            </keep-alive>
          </transition>
        </router-view>
      </section>
    </div>
  </div>
</template>

<style lang="less" scoped>
.layout-container {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
}

.sidebar-box {
  width: 220px;
  flex-shrink: 0;
  background-color: #efefef;
}

.main-box {
  display: flex;
  flex-direction: column;
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
