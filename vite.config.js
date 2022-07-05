import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'

export default ({ mode }) => {
  // 获取当前环境变量
  const env = loadEnv(mode, process.cwd())
  console.log('>>> 当前环境==>', mode)
  console.log('>>> 环境变量==>', env)

  return defineConfig({
    // 项目根目录
    root: process.cwd(),
    // 公共基础路径
    base: env.VITE_NODE_ENV === 'dev' ? '/' : '/vue3-vite-pc/',
    // 环境配置
    mode: mode,
    // 需要用到的插件数组
    plugins: [
      vue(),
      // 使用 vite-plugin-vue-setup-extend 插件可以在 script setup 标签中添加 name 属性，如 <script setup name="Home"></script>
      VueSetupExtend()
    ],
    // 静态资源服务文件夹
    publicDir: 'public',
    resolve: {
      // 配置路径别名
      alias: {
        "@": path.join(__dirname, "./src")
      },
      // 导入时想要省略的扩展名列表
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
    },
    css: {
      // 配置 CSS modules 的行为。选项将被传递给 postcss-modules
      modules: {},
      // 内联的 PostCSS 配置（格式同 postcss.config.js）
      postcss: {},
      // 指定传递给 CSS 预处理器的选项，文件扩展名用作选项的键
      preprocessorOptions: {
        less: {
          avascriptEnabled: true,
          // 全局引入 less 变量 --方式 1
          additionalData: `@import "${path.resolve(__dirname, 'src/styles/variables.less')}"; `,
          // 全局引入 less 变量 --方式 2
          // modifyVars: {
          //   hack: `true; @import (reference) "${path.resolve('src/styles/variables.less')}";`,
          // },
        }
      },
      // 在开发过程中是否启用 sourcemap
      devSourcemap: false
    },
    json: {
      // 是否支持从 .json 文件中进行按名导入
      namedExports: true,
      // 若设置为 true，导入的 JSON 会被转换为 export default JSON.parse("...")，这样会比转译成对象字面量性能更好，尤其是当 JSON 文件较大的时候。开启此项，则会禁用按名导入
      stringify: false
    },
    // 调整控制台输出的级别 'info' | 'warn' | 'error' | 'silent'
    logLevel: 'info',
    // 设为 false 可以避免 Vite 清屏而错过在终端中打印某些关键信息
    clearScreen: false,
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
          target: env.VITE_APP_BASE_API,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        }
      }
    },
    build: {
      // 浏览器兼容性 'modules' | 'esnext'
      target: 'modules',
      // 指定输出路径（相对于项目根目录)
      outDir: 'dist',
      // 指定生成静态资源的存放路径（相对于 build.outDir）
      assetsDir: 'assets',
      // 小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项。
      assetsInlineLimit: 4096,
      // 启用/禁用 CSS 代码拆分
      cssCodeSplit: true,
      // 构建后是否生成 source map 文件 boolean | 'inline' | 'hidden'
      sourcemap: false,
      // Rollup 打包配置，打包文件按照类型分文件夹显示
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
        }
      },
      minify: 'terser',
      terserOptions: {
        // 打包移除 console.log，debugger
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
      // 启用/禁用 gzip 压缩大小报告
      reportCompressedSize: true,
      // chunk 大小警告的限制（以 kbs 为单位）
      chunkSizeWarningLimit: 500
    }
  })
}
