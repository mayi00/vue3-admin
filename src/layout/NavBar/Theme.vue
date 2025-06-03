<script setup>
import { useAppStore } from '@/store'

defineOptions({ name: 'Theme' })
const { theme } = storeToRefs(useAppStore())

const isDark = ref(false)

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  if (theme.value === 'light') {
    document.documentElement.removeAttribute('data-theme')
  } else {
    document.documentElement.setAttribute('data-theme', 'dark')
  }
}

// 切换主题
function toggleTheme1(event) {
  // 检查浏览器是否支持 View Transition API
  if (!document.startViewTransition) {
    // 不支持则直接切换主题
    // isDark.value = !isDark.value
    document.documentElement[isDark.value ? 'setAttribute' : 'removeAttribute']('data-theme', 'dark')
    return
  }

  // 创建视图过渡
  const transition = document.startViewTransition(async () => {
    // 同步更新Vue状态和DOM属性
    // isDark.value = !isDark.value
    document.documentElement[isDark.value ? 'setAttribute' : 'removeAttribute']('data-theme', 'dark')
    await nextTick() // 等待DOM更新
  })

  transition.ready.then(() => {
    // 获取点击位置坐标
    const { clientX, clientY } = event || { clientX: innerWidth / 2, clientY: innerHeight / 2 }

    // 计算动画参数
    const endRadius = Math.hypot(Math.max(clientX, innerWidth - clientX), Math.max(clientY, innerHeight - clientY))

    // 创建圆形裁剪动画
    document.documentElement.animate(
      {
        clipPath: [`circle(0px at ${clientX}px ${clientY}px)`, `circle(${endRadius}px at ${clientX}px ${clientY}px)`],
      },
      {
        duration: 450,
        easing: 'ease-in',
        pseudoElement: isDark.value ? '::view-transition-old(root)' : '::view-transition-new(root)',
      }
    )
  })
}
</script>

<template>
  <div class="collapse" @click.stop="toggleTheme">
    <el-icon :size="20">
      <Moon v-if="theme === 'light'" />
      <Sunny v-else />
    </el-icon>
  </div>
</template>

<style lang="less" scoped>
.collapse {
  display: flex;
  align-items: center;
  padding: 8px;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: var(--gray-4);
  }
}
</style>
