<script setup>
defineOptions({ name: 'AppMain' })

const router = useRouter()
const allRoutes = router.getRoutes()
const keepAliveRoutes = computed(() => {
  return allRoutes.filter(route => route.meta?.keepAlive).map(route => route.name)
})
</script>

<template>
  <div class="app-main">
    <RouterView v-slot="{ Component, route }">
      <Transition name="fade" mode="out-in" appear>
        <KeepAlive :include="keepAliveRoutes">
          <component :is="Component" :key="route.path" />
        </KeepAlive>
      </Transition>
    </RouterView>
  </div>
</template>

<style lang="less" scoped>
.app-main {
  flex: 1;
  overflow: hidden;
}
</style>
