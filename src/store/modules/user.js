import { defineStore } from 'pinia'
import dayjs from 'dayjs'
import { getRandomString } from '@/utils/utils'
import { encryptCBC, decryptCBC } from '@/utils/aesUtils'
import { lo } from 'element-plus/es/locale/index.mjs'

export const useUserStore = defineStore('user', {
  persist: {
    key: 'user',
    storage: window.sessionStorage,
  },
  state: () => ({
    userInfo: {},
  }),
  actions: {
    // 设置用户信息
    setUserInfo(userInfo) {
      this.userInfo = userInfo
    },
    /**
     * 生成token
     * @param {String} username
     * @param {Number} effectiveDuration
     * @returns
     */
    generateToken(username, effectiveDuration = 12) {
      const randomStr = getRandomString()
      const expirationTime = dayjs().add(effectiveDuration, 'hour').valueOf()
      const tempToken = `${username}-${randomStr}-${expirationTime}`
      return encryptCBC(tempToken, process.env.VITE_AES_SECRET_KEY, process.env.VITE_AES_SECRET_IV)
    },
    // 验证token
    validateToken(token) {
      const plaintext = decryptCBC(token, process.env.VITE_AES_SECRET_KEY, process.env.VITE_AES_SECRET_IV)
      const currentTime = new Date().getTime()
      const expirationTime = plaintext.split('-')[2]
      if (currentTime > expirationTime) {
        return false
      } else {
        // 在过期时间剩余10分钟内时刷新token
        if (expirationTime - currentTime <= 10 * 60 * 1000) {
          this.generateToken(this.userInfo.username)
        }
        return true
      }
    },
    // 退出登录
    logout() {
      localStorage.removeItem('token')
      this.$reset()
    },
  },
})
