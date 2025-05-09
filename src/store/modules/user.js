import { defineStore } from 'pinia'
import dayjs from 'dayjs'
import { getRandomString } from '@/utils/utils'
import { encryptCBC, decryptCBC } from '@/utils/aesUtils'

export const useUserStore = defineStore(
  'user',
  () => {
    // 状态
    const userInfo = ref({})

    // 设置用户信息
    function setUserInfo(val) {
      userInfo.value = val
    }

    /**
     * 生成token
     * @param {String} username
     * @param {Number} effectiveDuration
     * @returns
     */
    function generateToken(username, effectiveDuration = 12) {
      const randomStr = getRandomString()
      const expirationTime = dayjs().add(effectiveDuration, 'hour').valueOf()
      const tempToken = `${username}-${randomStr}-${expirationTime}`
      return encryptCBC(tempToken, process.env.VITE_AES_SECRET_KEY, process.env.VITE_AES_SECRET_IV)
    }

    // 验证token
    function validateToken(token) {
      const plaintext = decryptCBC(token, process.env.VITE_AES_SECRET_KEY, process.env.VITE_AES_SECRET_IV)
      const currentTime = new Date().getTime()
      const expirationTime = plaintext.split('-')[2]
      if (currentTime > expirationTime) {
        return false
      } else {
        // 在过期时间剩余10分钟内时刷新token
        if (expirationTime - currentTime <= 10 * 60 * 1000) {
          generateToken(userInfo.value.username)
        }
        return true
      }
    }

    // 退出登录
    function logout() {
      localStorage.removeItem('token')
      reset()
    }

    // 重置状态
    function reset() {
      userInfo.value = {}
    }

    return {
      userInfo,
      setUserInfo,
      generateToken,
      validateToken,
      logout,
      reset,
    }
  },
  {
    persist: {
      key: 'user',
      storage: window.localStorage,
    },
  }
)
