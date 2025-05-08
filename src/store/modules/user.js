import { defineStore } from 'pinia'
import dayjs from 'dayjs'
import { getRandomString } from '@/utils/utils'
import { encryptCBC, decryptCBC } from '@/utils/aesUtils'

export const useUserStore = defineStore('user', {
  persist: {
    key: 'user',
    storage: window.sessionStorage,
  },
  state: () => ({
    userInfo: {},
    token: '',
  }),
  actions: {
    // 设置用户信息
    setUserInfo(userInfo) {
      this.userInfo = userInfo
    },
    // 生成token
    generateToken(username, expirationHours = 12) {
      const randomStr = getRandomString()
      const expirationTime = dayjs().add(expirationHours, 'hour').valueOf()
      const tempToken = `${username}-${randomStr}-${expirationTime}`
      return encryptCBC(tempToken, process.env.VITE_AES_SECRET_KEY, process.env.VITE_AES_SECRET_IV)
    },
    // 验证token
    validateToken() {
      const plaintext = decryptCBC(this.token, process.env.VITE_AES_SECRET_KEY, process.env.VITE_AES_SECRET_IV)
      const currentTime = new Date().getTime()
      const expirationTime = plaintext.split('-')[2]
      if (currentTime > expirationTime) {
        this.logout()
        return false
      } else {
        // 在过期时间剩余10分钟内时刷新token
        if (expirationTime - currentTime <= 10 * 60 * 1000) {
          this.token = this.generateToken(this.userInfo.username)
        }
        return true
      }
    },

    // 退出登录
    logout() {
      this.$reset()
    },
  },
})
