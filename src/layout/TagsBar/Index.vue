<script setup>
import { useAppStore } from '../../store'

const { tags } = storeToRefs(useAppStore())

const router = useRouter()
const tagsContainerRef = ref(null)
const tagsWrapperRef = ref(null)
const left = ref(0)

const currentPath = computed(() => router.currentRoute.value.path)

// 标签激活
function handleTagActive(tagItem) {
  console.log(tagItem)

  router.push(tagItem.path)
}

// 滚动处理
const handleScroll = scrollDirection => {
  // 获取容器尺寸、位置
  const containerWidth = tagsContainerRef.value.offsetWidth
  const wrapperWidth = tagsWrapperRef.value.offsetWidth
  const wrapperLeft = tagsWrapperRef.value.getBoundingClientRect().left

  // 计算目标位置
  let targetLeft = wrapperLeft
  const scrollStep = containerWidth

  if (scrollDirection === 'left') {
    targetLeft = Math.min(wrapperLeft + scrollStep, 0)
  } else if (scrollDirection === 'right') {
    targetLeft = Math.max(wrapperLeft - scrollStep, containerWidth - wrapperWidth)
  }

  // 边界限制
  left.value = Math.max(containerWidth - wrapperWidth, Math.min(targetLeft, 0))
}

const closeTag = tagItem => {
  tags.value = tags.value.filter(item => item.path !== tagItem.path)
}
const closeAll = () => {
  tags.value = []
  router.push('/')
}
const closeOthers = () => {
  tags.value = tags.value.filter(item => item.path === currentPath.value)
}
</script>

<template>
  <div class="tags-bar">
    <em class="arrow left" @click.stop="handleScroll('left')">
      <icon-mingcute:left-fill />
    </em>

    <div ref="tagsContainerRef" class="tags-container">
      <ul ref="tagsWrapperRef" class="tags-wrapper" :style="{ left: left + 'px' }">
        <li
          class="g-unselectable tag-item"
          :class="{ 'tag-item-active': tagItem.path === currentPath }"
          v-for="tagItem in tags"
          :key="tagItem.path"
          @click.stop="handleTagActive(tagItem)"
        >
          <span>{{ tagItem.title }}</span>
          <em class="close-icon" @click="closeTag(tagItem)">
            <icon-mingcute:close-fill />
          </em>
        </li>
      </ul>
    </div>

    <em class="arrow right" @click.stop="handleScroll('right')">
      <icon-mingcute:right-fill />
    </em>

    <el-dropdown class="close-wrapper">
      <icon-mingcute:close-fill />
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
  position: relative;
  width: 100%;
  height: 36px;
  border: 1px solid var(--gray-4);
  background-color: #fff;
}

.tags-container {
  position: absolute;
  top: 0;
  left: 30px;
  padding: 0 4px;
  width: calc(100% - 90px);
  height: 100%;
  overflow-x: scroll;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    display: none;
  }

  .tags-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    height: 100%;
    white-space: nowrap;
    scroll-behavior: smooth;
    &::-webkit-scrollbar {
      display: none;
    }

    .tag-item {
      display: inline-block;
      padding: 0 120px;
      margin: 0 4px;
      background-color: var(--gray-3);
      border-radius: 3px;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        background-color: var(--gray-4);
      }

      &.tag-item-active {
        background-color: var(--color-primary);
        color: #fff;
      }

      .close-icon {
        display: inline-block;
        width: 20px;
        height: 20px;
        padding: 4px;
        margin-left: 6px;
        font-size: 12px;
        color: var(--gray-5);
        line-height: 20px;
        text-align: center;
        cursor: pointer;
        border-radius: 50%;
        &:hover {
          color: #fff;
          background-color: var(--el-color-danger);
        }
      }
    }
  }
}

.arrow {
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 100%;
  color: var(--gray-9);
  font-size: 16px;
  background-color: #fff;
  cursor: pointer;
  &:hover {
    background-color: var(--gray-4);
  }

  &:left {
    left: 0;
  }
  &.right {
    right: 30px;
  }
}

.close-wrapper {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 100%;
  color: var(--gray-9);
  font-size: 14px;
  background-color: #fff;
  cursor: pointer;
  &:hover {
    background-color: var(--gray-4);
  }
}
</style>
