import { useStore } from '@/store'

// 检查按钮权限
export const hasBtnPermission = permission => {
  const buttonCodes = useStore().userStore.userInfo.buttonCodes || []
  return buttonCodes.includes(permission)
}

// 注册权限指令
export const setupPermissionDirective = app => {
  app.directive('permission', {
    mounted(el, binding) {
      const permission = binding.value
      if (permission && !hasBtnPermission(permission)) {
        el.parentNode?.removeChild(el)
      }
    },
    updated(el, binding) {
      const permission = binding.value
      if (permission && !hasBtnPermission(permission)) {
        el.parentNode?.removeChild(el)
      }
    }
  })
}
