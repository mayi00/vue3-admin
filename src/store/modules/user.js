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
    generateToken(username) {
      const randomStr = getRandomString()
      const currentTime = dayjs().valueOf()
      const expirationTime = dayjs(currentTime).add(1, 'day').valueOf()
      this.token = encryptCBC(
        `${username}-${randomStr}-${expirationTime}`,
        process.env.VITE_AES_SECRET_KEY,
        process.env.VITE_AES_SECRET_IV
      )
    },
    // 验证token
    validateToken() {
      const plaintext = decryptCBC(this.token, process.env.VITE_AES_SECRET_KEY, process.env.VITE_AES_SECRET_IV)
      const currentTime = new Date().getTime()
      const expirationTime = plaintext.split('-')[3]
      if (currentTime > expirationTime) {
        this.logout()
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
      this.$reset()
    },
  },
})
