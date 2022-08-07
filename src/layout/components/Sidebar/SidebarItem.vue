<!--
 * @Description  : 
 * @Author       : hzf
 * @Date         : 2022-08-07
 * @LastEditors  : hzf
 * @LastEditTime : 2022-08-07
 * @FilePath     : \vue3-admin\src\layout\components\Sidebar\SidebarItem.vue
-->
<script setup name="SidebarItem">
import { computed } from 'vue'
import path from 'path-browserify'
import { isExternalLink } from '@/utils/utils.js'

const props = defineProps({
  route: { type: Object, required: true },
  basePath: { type: String, default: '' }
})

// 是否生成子菜单
const hasChildren = computed(() => {
  let flag = false
  if (props.route.children && props.route.children.length > 0) {
    if (props.route.children.length === 1 && !props.route.alwaysShow) {
      flag = false
    } else {
      flag = true
    }
  } else {
    flag = false
  }
  return flag
}) 
// 解析路由路径
function resolveRoutePath (routePath) {
  if (isExternalLink(routePath)) {
    return routePath
  }
  if (isExternalLink(props.basePath)) {
    return props.basePath
  }
  return props.basePath ? path.resolve(props.basePath, routePath) : routePath
}
</script>

<template>
  <div class="sidebar-item">
    <!-- 没有子菜单或只有1个子菜单 -->
    <router-link v-if="!hasChildren" v-slot="{ href, navigate, isActive, isExactActive }" custom :to="resolveRoutePath(route.path)">
      <a :href="isExternalLink(resolveRoutePath(route.path)) ? resolveRoutePath(route.path) : href" :class="[isActive && 'router-link-active', isExactActive && 'router-link-exact-active']" :target="isExternalLink(resolveRoutePath(route.path)) ? '_blank' : '_self'" @click="navigate">
        <el-menu-item :title="route.meta.title">
          <span>{{ route.meta.title }}</span>
        </el-menu-item>
      </a>
    </router-link>
    <el-sub-menu v-else :title="route.meta.title" :index="resolveRoutePath(route.path)">
      <template #title>
        <span>{{ route.meta.title }}</span>
      </template>
      <template v-for="item in route.children">
        <SidebarItem v-if="!item.hidden" :key="item.path" :route="item" :basePath="resolveRoutePath(route.path)" />
      </template>
    </el-sub-menu>
  </div>
</template>

<style lang="less" scoped>

</style>

