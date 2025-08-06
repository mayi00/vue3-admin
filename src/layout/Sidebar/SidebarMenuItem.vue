<script setup>
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { isExternalLink } from '@/utils/utils'

defineOptions({ name: 'SidebarMenuItem' })

const props = defineProps({
  item: { type: Object, required: true }
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
// 根据图标名称获取图标组件
function getIcon4MenuItem(iconName) {
  return ElementPlusIconsVue[iconName] || ElementPlusIconsVue.Menu
}
// 根据图标名称获取图标组件
function getIcon4SubMenu(iconName) {
  return ElementPlusIconsVue[iconName] || ElementPlusIconsVue.Grid
}
</script>

<template>
  <el-menu-item v-if="!item.children || item.children.length === 0" :index="item.path" @click="handleClickMenuItem">
    <el-icon>
      <component :is="getIcon4MenuItem(item.meta.icon)" />
    </el-icon>
    <template #title>{{ item.meta.title }}</template>
  </el-menu-item>

  <el-sub-menu v-else :index="item.path">
    <template #title>
      <el-icon>
        <component :is="getIcon4SubMenu(item.meta.icon)" />
      </el-icon>
      <span>{{ item.meta.title }}</span>
    </template>

    <template v-for="childItem in item.children" :key="childItem.path">
      <SidebarMenuItem v-if="childItem.visible" :item="childItem" />
    </template>
  </el-sub-menu>
</template>

<style lang="less" scoped></style>
