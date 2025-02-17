<script setup>
import { isExternalLink } from '@/utils/utils.js'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { Icon } from '@iconify/vue'

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

// 根据图标名称获取图标组件
function getIcon4Menu(iconName) {
  return ElementPlusIconsVue[iconName] || ElementPlusIconsVue.Document
}

// 根据图标名称获取图标组件
function getIcon4Sub(iconName) {
  return ElementPlusIconsVue[iconName] || ElementPlusIconsVue.Folder
}
</script>

<template>
  <div v-if="!item.meta.hidden">
    <el-menu-item
      v-if="!item.children || item.children.length === 0"
      :index="resolveRoutePath(item.path)"
      @click="menuItem => handleClickMenuItem(menuItem, item)"
    >
      <Icon :icon="item.meta.icon || 'mdi:auto-awesome-outline'" class="iconify-icon" />
      <!-- <el-icon>
        <component :is="getIcon4Menu(item.meta.icon)" />
      </el-icon> -->
      <template #title>
        <span>{{ item.meta.title }}</span>
      </template>
    </el-menu-item>

    <el-sub-menu v-else :index="resolveRoutePath(item.path)">
      <template #title>
        <Icon :icon="item.meta.icon || 'flowbite:grid-outline'" class="iconify-icon" />
        <!-- <el-icon>
          <component :is="getIcon4Sub(item.meta.icon)" />
        </el-icon> -->
        <span>{{ item.meta.title }}</span>
      </template>

      <template v-for="child in item.children" :key="child.path">
        <SidebarMenuItem :item="child" :basePath="resolveRoutePath(item.path)" />
      </template>
    </el-sub-menu>
  </div>
</template>

<style lang="less" scoped>
.iconify-icon {
  font-size: 16px;
  margin: 0 4px;
}
</style>
