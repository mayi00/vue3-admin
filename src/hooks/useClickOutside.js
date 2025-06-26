/**
 * 监听点击事件，当点击发生在目标元素外部时执行回调函数。
 * @param {Ref<HTMLElement>} targetElement - 需要监听的DOM元素引用
 * @param {Function} callback - 点击外部时执行的回调函数
 * @returns {Object} 包含目标元素引用的对象
 */
export const useClickOutside = (targetElement, callback) => {
  const handleClickOutside = event => {
    // 判断点击是否发生在目标元素外部，如果是则执行回调
    if (targetElement.value && !targetElement.value.contains(event.target)) {
      callback()
    }
  }

  onMounted(() => {
    document.addEventListener('click', handleClickOutside)
  })

  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })

  return {
    element: targetElement,
  }
}
