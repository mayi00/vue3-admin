import { defineStore } from 'pinia'
import api from '@/api'
import { initSystemInfo } from '@/tools/login'

export const useUserStore = defineStore(
  'USER',
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
            localStorage.setItem('TOKEN', res.data)
            saveUserInfo({ account: arg.account })
            await initSystemInfo()
            resolve(res)
          })
          .catch(err => {
            console.log('登录失败', err)
            reject(err)
          })
      })
    }

    // 退出登录
    function logout() {
      localStorage.removeItem('TOKEN')
      localStorage.removeItem('DICT_TYPE')
      localStorage.removeItem('ALL_DYNAMIC_ROUTES')
      userInfo.value = {}
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
      key: 'USER',
      storage: window.localStorage
    }
  }
)
