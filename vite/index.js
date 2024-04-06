import vue from '@vitejs/plugin-vue'
import createAutoImport from './plugins/auto-import'
import createComponents from './plugins/components'
import createEslintPlugin from './plugins/eslint-plugin'
import createLegacy from './plugins/legacy'
// import createVueDevTools from './plugins/vue-devtools'

export default function createVitePlugins(env) {
  const plugins = [
    vue(),
    createAutoImport(),
    createComponents(),
    createEslintPlugin(),
    createLegacy()
    // createVueDevTools()
  ]
  return plugins
}
