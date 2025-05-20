<script setup>
import { useAppStore } from '../../store'

const { tags } = storeToRefs(useAppStore())

const scrollContainer = ref(null)
const showLeftArrow = ref(false)
const showRightArrow = ref(false)
const router = useRouter()

// 滚动处理
const handleScroll = direction => {
  const container = scrollContainer.value
  const scrollAmount = 200 // 每次滚动量
  container.scrollLeft += direction === 'left' ? -scrollAmount : scrollAmount
  updateArrowVisibility()
}

// 更新箭头显示状态
const updateArrowVisibility = () => {
  const container = scrollContainer.value
  showLeftArrow.value = container.scrollLeft > 0
  showRightArrow.value = container.scrollLeft < container.scrollWidth - container.clientWidth
}
const closeTag = tagItem => {
  tags.value = tags.value.filter(item => item.path !== tagItem.path)
}
// 标签操作
const closeAll = () => {
  tags.value = []
  router.push('/')
}
const closeOthers = () => {
  const currentPath = router.currentRoute.value.path
  tags.value = tags.value.filter(item => item.path === currentPath)
}
</script>

<template>
  <div class="tags-bar">
    <div class="arrow left" @click="handleScroll('left')">&lt;</div>

    <div class="tags-wrapper">
      <ul ref="scrollContainer" class="tags-container" @scroll="updateArrowVisibility">
        <li class="tag-item" v-for="tagItem in tags" :key="tagItem.path">
          {{ tagItem.title }}
          <span class="close-icon" @click="closeTag(tagItem)">×</span>
        </li>
      </ul>
    </div>

    <div class="arrow right" @click="handleScroll('right')">&gt;</div>

    <el-dropdown class="dropdown-menu">
      <span class="el-dropdown-link"> × </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="closeAll">关闭所有</el-dropdown-item>
          <el-dropdown-item @click="closeOthers">关闭其他</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style lang="less" scoped>
.tags-bar {
  display: flex;
  align-items: center;
  width: 100%;
  height: 36px;
  background-color: var(--gray-2);
  border: 1px solid var(--gray-4);
  position: relative;
  background-color: #fff;

  .arrow {
    cursor: pointer;
    padding: 0 8px;
    user-select: none;
    width: 20px;
    flex-shrink: 0;
    &:hover {
      background-color: var(--gray-3);
    }
  }
  .tags-wrapper {
    flex: 1;
    overflow: hidden;
    position: relative;
  }

  .tags-container {
    width: 100%;
    overflow-x: auto;
    white-space: nowrap;
    scroll-behavior: smooth;
    &::-webkit-scrollbar {
      display: none;
    }

    .tag-item {
      display: inline-block;
      padding: 2px 12px;
      margin: 0 4px;
      background-color: var(--gray-3);
      border-radius: 3px;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        background-color: var(--gray-4);
      }

      .close-icon {
        margin-left: 6px;
        &:hover {
          color: var(--el-color-danger);
        }
      }
    }
  }

  .dropdown-menu {
    margin-left: 12px;
    cursor: pointer;
    padding: 0 8px;
    width: 20px;
    flex-shrink: 0;
    &:hover {
      background-color: var(--gray-3);
    }
  }
}
</style>
