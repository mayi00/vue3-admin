/**
 * 动态计算元素高度
 * @param {Object} options 配置选项
 * @param {number} options.offsetTop 上方偏移量
 * @param {number} options.offsetBottom 下方偏移量
 * @param {number} options.minHeight 最小高度
 * @returns {Object} 包含计算高度的响应式对象
 */
export function useElementHeight(options = {}) {
  // 默认配置
  const defaultOptions = {
    offsetTop: 0,
    offsetBottom: 0,
    minHeight: 100
  }

  // 合并配置
  const config = { ...defaultOptions, ...options }

  // 元素高度
  const elementHeight = ref(null)

  /**
   * 计算元素高度
   */
  const calculateHeight = () => {
    // 获取可视区域高度
    const windowHeight = window.innerHeight

    // 计算高度: 窗口高度 - 上偏移 - 下偏移
    const height = windowHeight - config.offsetTop - config.offsetBottom

    // 设置最小高度防止过小
    elementHeight.value = Math.max(height, config.minHeight)
  }

  /**
   * 处理窗口大小变化
   */
  const handleResize = () => {
    // 使用nextTick确保DOM更新后再计算高度
    nextTick(() => {
      calculateHeight()
    })
  }

  // 挂载时添加事件监听器
  onMounted(() => {
    calculateHeight()
    window.addEventListener('resize', handleResize)
  })

  // 卸载时移除事件监听器
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })

  // 返回表格高度和手动计算方法
  return {
    elementHeight,
    calculateHeight
  }
}
