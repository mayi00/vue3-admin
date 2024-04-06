import { defineConfig, loadEnv } from 'vite'
import createVitePlugins from './vite'
import * as path from 'path'

export default ({ mode }) => {
  // 获取当前环境变量
  const env = loadEnv(mode, process.cwd())
  console.log('>>> 当前环境==>', mode)
  console.log('>>> 环境变量==>', env)

  return defineConfig({
    // 公共基础路径
    base: '/vue3-admin/',
    define: {
      'process.env': env
    },
    // 环境配置
    mode,
    // 需要用到的插件
    plugins: [...createVitePlugins(env)],
    // 静态资源服务文件夹
    publicDir: 'public',
    resolve: {
      // 配置路径别名
      alias: {
        '@': path.join(__dirname, './src')
      }
    },
    css: {
      // 配置 CSS modules 的行为。选项将被传递给 postcss-modules
      modules: {},
      // 内联的 PostCSS 配置（格式同 postcss.config.js）
      postcss: {},
      // 指定传递给 CSS 预处理器的选项，文件扩展名用作选项的键
      preprocessorOptions: {
        less: {
          math: 'always',
          avascriptEnabled: true
        }
      },
      // 在开发过程中是否启用 sourcemap
      devSourcemap: true
    },
    // 设为 false 可以避免 Vite 清屏而错过在终端中打印某些关键信息
    clearScreen: false,
    server: {
      host: '0.0.0.0',
      // 指定开发服务器端口
      port: 920,
      // 在开发服务器启动时自动打开
      open: true,
      // 反向代理
      proxy: {
        // 极速数据API
        '/proxy-jisuapi': {
          target: env.VITE_BASE_URL_JISUAPI,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/proxy-jisuapi/, '')
        }
      }
    },
    build: {
      // 启用/禁用 CSS 代码拆分
      cssCodeSplit: true,
      // Rollup 打包配置，打包文件按照类型分文件夹显示
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          // 打包文件拆分
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString()
            }
          }
        }
      },
      minify: 'terser',
      terserOptions: {
        // 生产环境构建移除 console debugger
        compress: {
          /* eslint-disable */
          drop_console: env.VITE_NODE_ENV === 'production',
          drop_debugger: env.VITE_NODE_ENV === 'production'
          /* eslint-enable */
        }
      },
      // 启用/禁用 gzip 压缩大小报告
      reportCompressedSize: true,
      // chunk 大小警告的限制（以 kbs 为单位）
      chunkSizeWarningLimit: 500
    }
  })
}
