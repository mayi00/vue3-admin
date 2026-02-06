import dayjs from 'dayjs'
import { defineConfig, loadEnv } from 'vite'
import { createVitePlugins } from './vite/plugins.js'
import { generateVersionFile } from './src/plugins/refreshPlugin.js'
import { resolve } from 'path'
import { visualizer } from 'rollup-plugin-visualizer'

export default ({ mode }) => {
  // 获取当前环境变量
  const env = loadEnv(mode, process.cwd())
  console.log('>>> 当前环境==>', mode)
  console.log('>>> 环境变量==>', env)

  const now = new Date().getTime()
  const versionInfo = {
    version: now,
    buildTime: dayjs(now).format('YYYY-MM-DD HH:mm:ss')
  }

  return defineConfig({
    // 公共基础路径
    base: '/vue3-admin/',
    // 环境配置
    mode,
    define: {
      'process.env': env,
      __APP_VERSION__: now
    },
    // vite 插件，版本信息插件
    plugins: [...createVitePlugins(env), generateVersionFile(env, versionInfo)],
    resolve: {
      // 配置路径别名
      alias: {
        '@': resolve(__dirname, './src')
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
          javascriptEnabled: true
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
      port: 5173,
      // 在开发服务器启动时自动打开
      open: true,
      // 反向代理
      proxy: {
        // apifox API
        '/proxy-apifox': {
          target: env.VITE_BASE_URL,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/proxy-apifox/, '')
        },
        // jisuapi API
        '/proxy-jisuapi': {
          target: 'https://api.jisuapi.com',
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
        // 分析打包大小
        plugins: [
          visualizer({
            open: false,
            gzipSize: false,
            brotliSize: false
          })
        ],
        output: {
          chunkFileNames: `assets/js/[hash].js`,
          entryFileNames: `assets/js/[hash].js`,
          // assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          // 用于输出静态资源的命名，[ext]表示文件扩展名
          assetFileNames: assetInfo => {
            const info = assetInfo.names[0].split('.')
            let extType = info[info.length - 1]
            if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(assetInfo.names[0])) {
              extType = 'media'
            } else if (/\.(png|jpe?g|gif|svg)(\?.*)?$/.test(assetInfo.names[0])) {
              extType = 'img'
            } else if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(assetInfo.names[0])) {
              extType = 'fonts'
            }
            return `assets/${extType}/[hash].[ext]`
          },
          // 打包文件拆分
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString()
            }
          }
        }
      },
      // 生产环境构建启用压缩
      minify: env.VITE_NODE_ENV === 'production' ? 'terser' : false,
      terserOptions: {
        compress: {
          keep_infinity: true,
          // 生产环境构建移除 console debugger
          drop_console: false,
          drop_debugger: env.VITE_NODE_ENV === 'production',
          // 明确指定要移除的console方法
          pure_funcs: env.VITE_NODE_ENV === 'production' ? ['console.log'] : [],
          // 删除不可达代码
          dead_code: true,
          // 删除未使用的变量和函数
          unused: true
        },
        format: {
          // 删除注释
          comments: false
        }
      },
      // 启用/禁用 gzip 压缩大小报告
      reportCompressedSize: true,
      // chunk 大小警告的限制（以 kbs 为单位）
      chunkSizeWarningLimit: 1024,
      sourcemap: env.VITE_NODE_ENV !== 'production',
      css: {
        minify: env.VITE_NODE_ENV === 'production'
      }
    }
  })
}
