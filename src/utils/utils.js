/**
 * @description  : 判断是否为外部链接
 * @param         {String} path
 * @return        {Boolean}
 * @Author       : hzf
 */
export function isExternalLink(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
