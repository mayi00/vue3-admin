/*
 * @Description  : AES 加解密
 * @Author       : MDT
 * @Date         : 2024-01-17
 * @LastEditors : MDT
 * @LastEditTime: 2025-04-16
 */
import CryptoJS from 'crypto-js'

// 有效密钥长度集合（单位：字节）
const VALID_KEY_LENGTHS = [16, 24, 32]
// IV 长度（CBC模式需要16字节）
const IV_LENGTH = 16

/**
 * 校验密钥和IV的合法性
 * @param {CryptoJS.lib.WordArray} key
 * @param {CryptoJS.lib.WordArray} iv
 * @throws {Error} 密钥或IV不合法时抛出错误
 */
function validateKeyAndIV(key, iv = null) {
  if (!VALID_KEY_LENGTHS.includes(key.sigBytes)) {
    throw new Error(`Invalid key length: ${key.sigBytes} bytes. Valid lengths are 16, 24, 32 bytes.`)
  }
  if (iv && iv.sigBytes !== IV_LENGTH) {
    throw new Error(`Invalid IV length: ${iv.sigBytes} bytes. Must be 16 bytes for CBC mode.`)
  }
}

/**
 * @description  : AES-CBC加密
 * @param         {String|Object} word 明文，支持字符串或可JSON序列化的对象
 * @param         {String} secretKey 密钥（16/24/32字节）
 * @param         {String} secretIv  偏移量（16字节）
 * @return        {String} Base64格式密文
 * @throws        {Error} 参数不合法时抛出错误
 */
export function encryptCBC(word, secretKey, secretIv) {
  try {
    const key = CryptoJS.enc.Utf8.parse(secretKey)
    const iv = CryptoJS.enc.Utf8.parse(secretIv)
    validateKeyAndIV(key, iv)

    // 统一处理输入为字符串
    const plaintext = typeof word === 'string' ? word : JSON.stringify(word)
    const encrypted = CryptoJS.AES.encrypt(plaintext, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    })

    // 返回纯密文的Base64字符串
    return encrypted.ciphertext.toString(CryptoJS.enc.Base64)
  } catch (error) {
    console.error('Encryption Error:', error)
    throw error
  }
}

/**
 * @description  : AES-CBC解密
 * @param         {String} ciphertext Base64格式密文
 * @param         {String} secretKey 密钥（需与加密时一致）
 * @param         {String} secretIv  偏移量（需与加密时一致）
 * @return        {String} 解密后的明文
 * @throws        {Error} 解密失败或参数错误时抛出
 */
export function decryptCBC(ciphertext, secretKey, secretIv) {
  try {
    const key = CryptoJS.enc.Utf8.parse(secretKey)
    const iv = CryptoJS.enc.Utf8.parse(secretIv)
    validateKeyAndIV(key, iv)

    const decrypted = CryptoJS.AES.decrypt(ciphertext, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    })

    const result = decrypted.toString(CryptoJS.enc.Utf8)
    if (!result) throw new Error('Decryption failed: possibly invalid key/iv')
    return result
  } catch (error) {
    console.error('Decryption Error:', error)
    throw error
  }
}

/**
 * @description  : AES-ECB加密
 * @warning       ECB模式缺乏安全性
 * @param         {String|Object} word 明文，支持字符串或可JSON序列化的对象
 * @param         {String} secretKey 密钥
 * @return        {String} Base64格式密文
 */
export function encryptECB(word, secretKey) {
  try {
    const key = CryptoJS.enc.Utf8.parse(secretKey)
    validateKeyAndIV(key)

    const plaintext = typeof word === 'string' ? word : JSON.stringify(word)
    const encrypted = CryptoJS.AES.encrypt(plaintext, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    })

    return encrypted.ciphertext.toString(CryptoJS.enc.Base64)
  } catch (error) {
    console.error('ECB Encryption Error:', error)
    throw error
  }
}

/**
 * @description  : AES-ECB解密
 * @param         {String} ciphertext Base64格式密文
 * @param         {String} secretKey 密钥
 * @return        {String} 解密后的明文
 */
export function decryptECB(ciphertext, secretKey) {
  try {
    const key = CryptoJS.enc.Utf8.parse(secretKey)
    validateKeyAndIV(key)

    const decrypted = CryptoJS.AES.decrypt(ciphertext, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    })

    const result = decrypted.toString(CryptoJS.enc.Utf8)
    if (!result) throw new Error('ECB decryption failed')
    return result
  } catch (error) {
    console.error('ECB Decryption Error:', error)
    throw error
  }
}
