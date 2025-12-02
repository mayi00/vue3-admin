import { defineStore } from 'pinia'
import { usePermissionStore } from '@/store'
import api from '@/api'

export const useUserStore = defineStore(
  'user',
  () => {
    // 用户信息
    const userInfo = ref({})

    // 设置用户信息
    function saveUserInfo(val) {
      userInfo.value = val
    }
    // 登录
    function login(arg) {
      return new Promise((resolve, reject) => {
        api.sys.auth
          .login(arg)
          .then(async res => {
            localStorage.setItem('token', res.data)
            const userInfo = await api.sys.auth.getUserInfo()
            saveUserInfo({ ...userInfo })
            resolve()
          })
          .catch(err => {
            console.log('登录失败', err)
            reject(err)
          })
      })
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
      login,
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
