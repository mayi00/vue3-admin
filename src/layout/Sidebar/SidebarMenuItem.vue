<script setup>
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

defineOptions({ name: 'SidebarMenuItem' })

const props = defineProps({
  sidebarMenu: { type: Object, required: true }
})
const router = useRouter()

function handleClickMenuItem(menuInfo) {
  if (menuInfo.menuType === 'MENU') {
    router.push(menuInfo.path)
  } else if (menuInfo.menuType === 'EXT_LINK') {
    // 外部链接：使用 window.open 打开新页面
    window.open(menuInfo.path, '_blank')
  } else if (menuInfo.menuType === 'IFRAME_LINK') {
    // iframe 内嵌链接：使用 iframe 嵌入页面
    router.push({ path: menuInfo.path })
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
  <el-menu-item
    v-if="!sidebarMenu.children || sidebarMenu.children.length === 0"
    :index="sidebarMenu.path"
    :route="sidebarMenu"
    @click.stop="() => handleClickMenuItem(sidebarMenu)"
  >
    <el-icon>
      <component :is="getIcon4MenuItem(sidebarMenu.meta.icon)" />
    </el-icon>
    <template #title>{{ sidebarMenu.meta.title }} </template>
  </el-menu-item>

  <el-sub-menu v-else :index="sidebarMenu.path">
    <template #title>
      <el-icon>
        <component :is="getIcon4SubMenu(sidebarMenu.meta.icon)" />
      </el-icon>
      <span>{{ sidebarMenu.meta.title }}</span>
    </template>

    <template v-for="childItem in sidebarMenu.children" :key="childItem.path">
      <SidebarMenuItem v-if="childItem.visible" :sidebarMenu="childItem" />
    </template>
  </el-sub-menu>
</template>

<style lang="less" scoped></style>
