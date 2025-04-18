import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  // 状态
  const isCollapse = ref(false)
  const activeModule = ref('')

  // 持久化配置
  const persist = {
    key: 'app',
    storage: window.localStorage,
    paths: ['isCollapse', 'activeModule']
  }

  return {
    isCollapse,
    activeModule,
    persist
  }
})
