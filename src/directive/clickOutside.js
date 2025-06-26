export function setupClickOutside(app) {
  /**
   * 定义 'click-outside' 指令
   * 用于在点击元素及其子元素之外的区域时触发回调函数
   */
  app.directive('click-outside', {
    /**
     * 元素挂载前绑定事件监听器
     * @param {HTMLElement} el - 绑定指令的DOM元素
     * @param {Object} binding - 指令绑定信息对象
     */
    beforeMount(el, binding) {
      el.clickOutsideEvent = function (event) {
        // 判断点击目标是否在元素外部
        if (!(el === event.target || el.contains(event.target))) {
          binding.value(event)
        }
      }
      document.addEventListener('click', el.clickOutsideEvent)
    },
    unmounted(el) {
      document.removeEventListener('click', el.clickOutsideEvent)
    },
  })
}
