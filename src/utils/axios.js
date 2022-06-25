import axios from 'axios'

const env = import.meta.env
console.log('当前环境==>', env.VITE_NODE_ENV, '环境变量==>', env);

// 创建 axios 实例
const service = axios.create({
  baseURL: env.VITE_APP_BASE_API,
  timeout: 5000
})

export default service
