// 获取字典列表
export const getDictList = dictTypeKey => {
  if (!dictTypeKey) return []
  const DICT_TYPE_ALL = JSON.parse(localStorage.getItem('DICT_TYPE') || '[]')
  const dictType = DICT_TYPE_ALL.find(item => item.value === dictTypeKey)
  return dictType ? dictType.children : []
}
// 获取字典映射
export const getDictMap = dictTypeKey => {
  const dictList = getDictList(dictTypeKey)
  const dictMap = {}
  dictList.forEach(item => {
    dictMap[item.value] = item.label
  })
  return dictMap
}
// 获取字典标签
export const getDictLabel = (dictTypeKey, dictValue) => {
  const dictMap = getDictMap(dictTypeKey)
  return dictMap[dictValue] || ''
}
