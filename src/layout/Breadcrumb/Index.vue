<script setup>
defineOptions({ name: 'Breadcrumb' })

const route = useRoute()
const router = useRouter()

const breadcrumbItems = computed(() => {
  const matched = route.matched.filter(item => item.meta?.title)

  return [
    ...matched.map(item => ({
      path: item.path,
      title: item.meta.title,
      isExternal: !!item.meta.link,
      link: item.meta.link || item.path, // 获取外链地址
    })),
  ]
})

// 点击事件处理
const handleClick = item => {
  if (item.isExternal) {
    window.open(item.link, '_blank')
  }
  // 移除非外链的路由跳转逻辑
}
</script>

<template>
  <div class="breadcrumb">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbItems"
        :key="item.path"
        :class="{ 'is-external': item.isExternal }"
        @click="item.isExternal ? handleClick(item) : null"
      >
        {{ item.title }}
        <el-icon v-if="item.isExternal" class="external-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M14 3v2h3.59l-9.83 9.83l1.41 1.41L19 6.41V10h2V3m-2 16H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2v7Z"
            />
          </svg>
        </el-icon>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<style lang="less" scoped>
.breadcrumb {
  display: flex;
  align-items: center;
  height: 30px;
  padding: 0 16px;
  background-color: #fff;
  border: 1px solid var(--el-border-color-light);
  box-shadow: 0 1px 1px var(--el-box-shadow-light);

  :deep(.el-breadcrumb) {
    font-size: 14px;

    .is-external {
      .el-breadcrumb__inner {
        cursor: pointer;
      }
    }

    .el-breadcrumb__inner {
      display: inline-flex;
      align-items: center;
      gap: 4px;

      &.is-link {
        color: var(--el-text-color-regular);
        font-weight: normal;

        &:hover {
          color: var(--el-color-primary);
        }
      }
    }

    .external-icon {
      margin-left: 2px;
      font-size: 0.8em;
    }
  }
}
</style>
