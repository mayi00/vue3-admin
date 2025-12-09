<script setup>
defineOptions({ name: 'AppMain' })

const router = useRouter()
const keepAliveRoutes = computed(() => {
  const allDynamicRoutes = router
    .getRoutes()
    .filter(route => route.meta?.keepAlive)
    .map(route => route.name)

  return [...allDynamicRoutes, 'Dashboard']
})
</script>

<template>
  <main class="app-main">
    <router-view v-slot="{ Component, route }">
      <transition name="el-fade-in-linear" mode="out-in">
        <keep-alive :include="keepAliveRoutes">
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </transition>
    </router-view>
  </main>
</template>

<style lang="less" scoped>
.app-main {
  flex: 1;
  overflow: hidden;
  background-color: #f3f4f5;
}
</style>
