<script setup>
import { isExternalLink } from '@/utils/utils'

defineOptions({ name: 'SidebarMenuItem' })

const props = defineProps({
  item: { type: Object, required: true },
})
const router = useRouter()

function handleClickMenuItem(menuItem) {
  if (isExternalLink(menuItem.index)) {
    // 外部链接：使用 window.open 打开新页面
    window.open(menuItem.index, '_blank')
  } else {
    router.push(menuItem.index)
  }
}
</script>

<template>
  <el-menu-item v-if="!item.children || item.children.length === 0" :index="item.path" @click="handleClickMenuItem">
    <el-icon><Menu /></el-icon>
    <template #title>{{ item.meta.title }}</template>
  </el-menu-item>

  <el-sub-menu v-else :index="item.path">
    <template #title>
      <el-icon><Grid /></el-icon>
      <span>{{ item.meta.title }}</span>
    </template>

    <template v-for="child in item.children" :key="child.path">
      <SidebarMenuItem v-if="child.visible" :item="child" />
    </template>
  </el-sub-menu>
</template>

<style lang="less" scoped></style>
