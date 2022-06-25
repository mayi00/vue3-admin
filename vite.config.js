import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    // 配置路径别名
    alias: {
      "@": path.join(__dirname, "./src")
    }
  },
  server: {
    // 指定开发服务器端口
    port: 3000,
    // 设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口
    strictPort: false,
    // 在开发服务器启动时自动打开
    open: true,
    // 开发代理
    proxy: {
      '/api': {
        target: 'http://xxxxxxx',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  },
})
