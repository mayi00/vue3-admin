import { defineStore } from 'pinia'
import { usePermissionStore } from '@/store'

export const useUserStore = defineStore(
  'user',
  () => {
    // 用户信息
    const userInfo = ref({})

    // 设置用户信息
    function saveUserInfo(val) {
      userInfo.value = val
    }

    // 退出登录
    function logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('localAllDynamicRoutes')
      userInfo.value = {}
      usePermissionStore().$reset()
    }

    return {
      userInfo,
      saveUserInfo,
      logout
    }
  },
  {
    persist: {
      key: 'user',
      storage: window.localStorage
    }
  }
)
