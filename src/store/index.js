import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import user from './modules/user'

// 创建一个新的 store 实例
const store = createStore({
  modules: {
    user
  },
  // vuex 本地持久化配置
  plugins: [
    // 默认存储在 localStorage
    createPersistedState({
      // 本地存储 key
      key: 'vue3-vite-pc',
      // 指定需要存储的模块
      paths: ['user']
    })
  ]
})

export default store
