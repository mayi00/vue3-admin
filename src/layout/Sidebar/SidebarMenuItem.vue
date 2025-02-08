<script setup>
import { isExternalLink } from '@/utils/utils.js'

defineOptions({ name: 'SidebarMenuItem' })

const props = defineProps({
  item: { type: Object, required: true },
  basePath: { type: String, default: '' },
})
const emit = defineEmits([])
const router = useRouter()

// 解析完整的路由路径
function resolveRoutePath(routePath) {
  return `${props.basePath}/${routePath}`
}

/**
 * 点击菜单项跳转菜单
 * @param {Object} menuItem 菜单项
 * @param {Object} item 路由对象
 */
function handleClickMenuItem(menuItem, item) {
  // 如果是外链且设置为不是内嵌访问，则直接打开新窗口
  if (isExternalLink(item.meta.link) && !item.meta.embeddedAccess) {
    window.open(item.meta.link, '_blank')
  } else {
    router.push(menuItem.index)
  }
}
</script>

<template v-if="!item.meta.hidden">
  <el-menu-item
    v-if="!item.children || item.children.length === 0"
    :index="resolveRoutePath(item.path)"
    @click="menuItem => handleClickMenuItem(menuItem, item)"
  >
    <!-- TODO 图标需要解决 -->
    <el-icon><setting /></el-icon>
    <template #title>{{ item.meta.title }}</template>
  </el-menu-item>

  <el-sub-menu v-else :index="resolveRoutePath(item.path)">
    <template #title>
      <el-icon><location /></el-icon>
      <span>{{ item.meta.title }}</span>
    </template>

    <template v-for="child in item.children" :key="child.path">
      <SidebarMenuItem :item="child" :basePath="resolveRoutePath(item.path)" />
    </template>
  </el-sub-menu>
</template>

<style lang="less" scoped></style>
