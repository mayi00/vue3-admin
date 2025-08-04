<script setup>
defineOptions({ name: 'SidebarMenuItem' })
const props = defineProps({
  item: { type: Object, required: true },
  basePath: { type: String, default: '' },
})
const emit = defineEmits([])
const router = useRouter()

function handleClickMenuItem(menuItem) {
  router.push(menuItem.index)
}
</script>

<template>
  <el-menu-item v-if="!item.children || item.children.length === 0" :index="item.path" @click="handleClickMenuItem">
    <template #title>{{ item.meta.title }}</template>
  </el-menu-item>

  <el-sub-menu v-else :index="item.path">
    <template #title>
      <span>{{ item.meta.title }}</span>
    </template>

    <template v-for="child in item.children" :key="child.path">
      <SidebarMenuItem v-if="child.visible" :item="child" />
    </template>
  </el-sub-menu>
</template>

<style lang="less" scoped></style>
