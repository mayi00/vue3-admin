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
  const currentPath = router.currentRoute.value.path
  const isActive = tagItem.path === currentPath

  // 过滤掉要关闭的标签
  tags.value = tags.value.filter(item => item.path !== tagItem.path)

  if (isActive) {
    // 寻找下一个或上一个标签
    const remainingTags = tags.value
    const currentIndex = remainingTags.findIndex(t => t.path === currentPath)

    let targetTag
    if (currentIndex === -1) {
      // 当前标签被关闭的情况
      const closedIndex = tags.value.findIndex(t => t === tagItem)
      targetTag = remainingTags[closedIndex] || remainingTags[closedIndex - 1]
    } else {
      targetTag = remainingTags[currentIndex] || remainingTags[currentIndex - 1]
    }

    if (targetTag) {
      router.push(targetTag.path)
    } else {
      router.push('/') // 没有剩余标签时回到首页
    }
  }
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
      <BaseIcon name="mingcute:left-fill" />
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
            <BaseIcon name="mingcute:close-fill" />
          </em>
        </li>
      </ul>
    </div>

    <em class="arrow right" @click.stop="handleScroll('right')">
      <BaseIcon name="mingcute:right-fill" />
    </em>

    <el-dropdown class="close-wrapper">
      <BaseIcon name="mingcute:close-fill" />
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
  background-color: #fff;
  border: 1px solid var(--gray-4);
}

.tags-container {
  position: absolute;
  top: 0;
  left: 30px;
  width: calc(100% - 90px);
  height: 100%;
  padding: 0 4px;
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
      display: flex;
      justify-content: center;
      align-items: center;
      height: 24px;
      margin: 0 4px;
      padding: 0 120px;
      background-color: var(--gray-3);
      border-radius: 4px;
      transition: all 0.3s;
      cursor: pointer;

      &:hover {
        background-color: var(--gray-4);
      }

      &.tag-item-active {
        color: #fff;
        background-color: var(--color-primary);
      }

      .close-icon {
        display: inline-block;
        width: 20px;
        height: 20px;
        margin-left: 6px;
        padding: 4px;
        color: var(--gray-12);
        border-radius: 50%;
        font-size: 12px;
        line-height: 20px;
        text-align: center;
        cursor: pointer;

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
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 100%;
  color: var(--gray-9);
  background-color: #fff;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: var(--gray-4);
  }

  &.left {
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
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 100%;
  color: var(--gray-9);
  background-color: #fff;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: var(--gray-4);
  }
}
</style>
