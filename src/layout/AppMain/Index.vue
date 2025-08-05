<script setup>
defineOptions({ name: 'AppMain' })

const router = useRouter()
const allRoutes = router.getRoutes()
const keepAliveRoutes = computed(() => {
  return allRoutes.filter(route => route.meta?.keepAlive).map(route => route.name)
})
</script>

<template>
  <main class="app-main">
    <router-view v-slot="{ Component, route }">
      <Transition name="el-fade-in-linear" mode="out-in">
        <keep-alive :include="keepAliveRoutes">
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </Transition>
    </router-view>
  </main>
</template>

<style lang="less" scoped>
.app-main {
  flex: 1;
  overflow: hidden;
}
</style>
