<script setup>
import { useAppStore } from '../../store'

const { tags } = storeToRefs(useAppStore())

const router = useRouter()
const tagsContainerRef = ref(null)
const tagsWrapperRef = ref(null)
const left = ref(0)

// 滚动处理
const handleScroll = scrollDirection => {
  const currentLeft = tagsWrapperRef.value.getBoundingClientRect().left
  let tempLeft
  if (scrollDirection === 'left') {
    tempLeft = currentLeft + tagsContainerRef.value.offsetWidth
  } else if (scrollDirection === 'right') {
    tempLeft = currentLeft - tagsContainerRef.value.offsetWidth
  }

  if (tempLeft < 0) {
    if (tempLeft < tagsContainerRef.value.offsetWidth - tagsWrapperRef.value.offsetWidth) {
      left.value = tagsContainerRef.value.offsetWidth - tagsWrapperRef.value.offsetWidth
    } else {
      left.value = tempLeft
    }
  } else {
    left.value = 0
  }
}

const closeTag = tagItem => {
  tags.value = tags.value.filter(item => item.path !== tagItem.path)
}
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
    <em class="arrow left" @click.stop="handleScroll('left')">
      <icon-mingcute:left-fill />
    </em>

    <div ref="tagsContainerRef" class="tags-container">
      <ul ref="tagsWrapperRef" class="tags-wrapper" :style="{ left: left + 'px' }" @scroll="updateArrowVisibility">
        <li class="tag-item" v-for="tagItem in tags" :key="tagItem.path">
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

    <el-dropdown class="dropdown-menu">
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

  .arrow {
    position: absolute;
    top: 0;
    cursor: pointer;
    width: 30px;
    height: 100%;
    background-color: #999;

    &:left {
      left: 0;
    }
    &.right {
      right: 30px;
    }
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

  .dropdown-menu {
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    width: 30px;
    height: 100%;
    background-color: #555;
    &:hover {
      background-color: var(--gray-3);
    }
  }
}
</style>
