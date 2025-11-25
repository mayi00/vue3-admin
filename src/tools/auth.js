import dayjs from 'dayjs'
import { getRandomString, getRandomInt, sleep } from '@/utils/utils'
import { encryptCBC, decryptCBC } from '@/utils/aesUtils'
import { userInfo } from '@/constant/user/user.js'

/**
 * 登录生成用户信息和token
 * 模拟登录接口
 * @param {*} loginForm
 * @returns
 */
export function login(loginForm) {
  return new Promise((resolve, reject) => {
    sleep(getRandomInt(10, 1000))
    const token = generateToken(loginForm.account)
    resolve({ ...userInfo, token })
  })
}
/**
 * 生成token
 * @param {String} account
 * @param {Number} effectiveDuration
 * @returns
 */
export function generateToken(account, effectiveDuration = 12) {
  const randomStr = getRandomString()
  const expirationTime = dayjs().add(effectiveDuration, 'hour').valueOf()
  const tempToken = `${account}-${randomStr}-${expirationTime}`
  return encryptCBC(tempToken, process.env.VITE_AES_SECRET_KEY, process.env.VITE_AES_SECRET_IV)
}

// 验证token
export function validateToken(token) {
  const plaintext = decryptCBC(token, process.env.VITE_AES_SECRET_KEY, process.env.VITE_AES_SECRET_IV)
  const currentTime = new Date().getTime()
  const expirationTime = plaintext.split('-')[2]
  if (currentTime > expirationTime) {
    return false
  } else {
    // 在过期时间剩余10分钟内时刷新token
    if (expirationTime - currentTime <= 10 * 60 * 1000) {
      generateToken(userInfo.value.account)
    }
    return true
  }
}
