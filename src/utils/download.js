import { base64ToBlob } from './utils'

/**
 * 创建并触发文件下载
 * @param {Blob} blob - 要下载的 Blob 对象
 * @param {string} fileName - 下载文件的名称
 * @throws {Error} - 如果输入的参数类型不正确，将抛出错误
 */
export function downloadBlob(blob, fileName) {
  // 检查输入参数的类型
  if (!(blob instanceof Blob) || typeof fileName !== 'string') {
    throw new Error('Invalid input: blob must be a Blob object and fileName must be a string')
  }
  // 创建一个 <a> 元素用于触发下载
  const aLink = document.createElement('a')
  aLink.href = URL.createObjectURL(blob)
  aLink.download = fileName
  aLink.style.display = 'none'
  // 将 <a> 元素添加到文档中并触发点击事件
  document.body.appendChild(aLink)
  aLink.click()
  // 异步移除 <a> 元素并释放 URL 对象
  setTimeout(() => {
    document.body.removeChild(aLink)
    URL.revokeObjectURL(aLink.href)
  }, 0)
}

/**
 * 根据 base64 字符串下载图片
 * @param {string} base64Content - 图片的 base64 字符串
 * @param {string} fileName - 下载图片的文件名
 * @throws {Error} - 如果输入的参数类型不正确，将抛出错误
 */
export function downloadImageByBase64(base64Content, fileName) {
  // 检查输入参数的类型
  if (typeof base64Content !== 'string' || typeof fileName !== 'string') {
    throw new Error('Invalid input: base64Content and fileName must be strings')
  }
  try {
    // 将 base64 字符串转换为 Blob 对象
    const blob = base64ToBlob(base64Content)
    // 创建并触发下载
    downloadBlob(blob, fileName)
  } catch (error) {
    // 处理转换或下载过程中可能出现的错误
    console.error('下载图片时出错:', error)
  }
}
