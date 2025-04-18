import { defineStore } from 'pinia'
import dayjs from 'dayjs'
import { getRandomString } from '@/utils/utils'
import { encryptCBC } from '@/utils/aesUtils'

export const useUserStore = defineStore('user', {
  persist: {
    key: 'user',
    storage: window.localStorage,
  },
  state: () => ({
    userInfo: {},
    token: '',
  }),
  actions: {
    setUserInfo(userInfo) {
      this.userInfo = userInfo
    },
    // 新增token生成方法
    generateToken(username) {
      const randomStr = getRandomString()
      const currentTime = dayjs().valueOf()
      const expirationTime = dayjs(currentTime).add(1, 'day').valueOf()
      this.token = encryptCBC(
        `${username}-${randomStr}-${currentTime}-${expirationTime}`,
        process.env.VITE_AES_SECRET_KEY,
        process.env.VITE_AES_SECRET_IV
      )
    },
    logout() {
      this.$reset()
    },
  },
})
